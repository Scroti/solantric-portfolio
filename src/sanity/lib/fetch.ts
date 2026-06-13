import { client } from './client'
import { PROJECTS_QUERY, TESTIMONIALS_QUERY } from './queries'

export type SanityProject = {
  slug: string
  title: string
  descRo?: string
  descEn?: string
  tags?: string[]
  link?: string
  accent?: string
  featured?: boolean
  imageUrl?: string
}

export type SanityTestimonial = {
  quoteRo?: string
  quoteEn?: string
  name: string
  roleRo?: string
  roleEn?: string
}

const REVALIDATE = 60 // seconds

export async function getSanityProjects(): Promise<SanityProject[] | null> {
  if (!client) return null
  try {
    return await client.fetch(PROJECTS_QUERY, {}, { next: { revalidate: REVALIDATE } })
  } catch {
    return null
  }
}

export async function getSanityTestimonials(): Promise<SanityTestimonial[] | null> {
  if (!client) return null
  try {
    return await client.fetch(TESTIMONIALS_QUERY, {}, { next: { revalidate: REVALIDATE } })
  } catch {
    return null
  }
}
