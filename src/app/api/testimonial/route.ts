import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

const MAX_NAME = 80
const MAX_ROLE = 80
const MAX_QUOTE = 240

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const name = String(body.name ?? '').trim()
    const role = String(body.role ?? '').trim()
    const quote = String(body.quote ?? '').trim()
    const website = String(body.website ?? '') // honeypot

    if (website) return NextResponse.json({ ok: true }) // silently drop bots
    if (!name || !quote) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }
    if (name.length > MAX_NAME || role.length > MAX_ROLE || quote.length > MAX_QUOTE) {
      return NextResponse.json({ error: 'Too long' }, { status: 400 })
    }

    const token = process.env.SANITY_WRITE_TOKEN
    if (!projectId || !token) {
      return NextResponse.json({ error: 'Not configured' }, { status: 500 })
    }

    const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

    await client.create({
      _type: 'testimonial',
      name,
      roleRo: role,
      roleEn: role,
      quoteRo: quote,
      quoteEn: quote,
      published: false, // shows on the site only after you publish it in the Studio
      order: 999,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
