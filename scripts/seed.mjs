// Seeds the current projects + testimonials into Sanity.
// Reads NEXT_PUBLIC_SANITY_* and SANITY_WRITE_TOKEN from .env.local.
// Run:  node scripts/seed.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// minimal .env.local parser
const env = {}
const envPath = path.join(root, '.env.local')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/)
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = env.SANITY_WRITE_TOKEN

if (!token) {
  console.error('\n✗ Missing SANITY_WRITE_TOKEN in .env.local')
  console.error('  Create an Editor token: sanity.io/manage -> your project -> API -> Tokens')
  console.error('  Then add a line:  SANITY_WRITE_TOKEN=your_token\n')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2025-01-01', token, useCdn: false })

const projects = [
  { slug: 'armonia2',   title: 'Armonia2',   descRo: 'Platformă web pentru servicii funerare',     descEn: 'Web platform for funeral services',     tags: ['Next.js', 'TypeScript', 'PostgreSQL'], link: 'https://armonia2.ro', accent: '#f59e0b', order: 1 },
  { slug: 'filo',       title: 'Filo',       descRo: 'Aplicație de gestionare task-uri',            descEn: 'Task management application',            tags: ['React', 'Node.js', 'MongoDB'],         link: 'https://github.com/Scroti/Filo', accent: '#6366f1', order: 2 },
  { slug: 'teamlatch',  title: 'Teamlatch',  descRo: 'Tool de colaborare pentru echipe dev',        descEn: 'Collaboration tool for dev teams',      tags: ['React', 'WebSocket', 'Express'],       link: 'https://github.com/Scroti/DevHacks-Project-Zbubble-Sort-', accent: '#0ea5e9', order: 3 },
  { slug: 'item-shop',  title: 'Item Shop',  descRo: 'Shop de iteme pentru servere de gaming',      descEn: 'Item shop for gaming servers',          tags: ['Next.js', 'Stripe', 'Tailwind'],       accent: '#7c3aed', order: 4 },
  { slug: 'bonusbot',   title: 'BonusBot',   descRo: 'Bot Telegram pentru cazinouri online',        descEn: 'Telegram bot for online casinos',       tags: ['Node.js', 'Telegram API'],             accent: '#2563eb', order: 5 },
  { slug: 'metin2-bot', title: 'Metin2 Bot', descRo: 'Bot de automatizare pentru jocul Metin2',     descEn: 'Automation bot for the game Metin2',    tags: ['Python', 'OpenCV'],                    accent: '#059669', order: 6 },
  { slug: 'scrotios',   title: 'ScrotiOS',   descRo: 'Proiect personal experimental',               descEn: 'Experimental personal project',         tags: ['C', 'Assembly'],                       accent: '#db2777', order: 7 },
]

const testimonials = [
  { id: 'andrei-popescu', name: 'Andrei Popescu', roleRo: 'Fondator, Startup', roleEn: 'Founder, Startup', order: 1,
    quoteRo: 'Cristian a livrat exact ce aveam nevoie, la timp și fără bătăi de cap. Comunicare excelentă pe tot parcursul proiectului.',
    quoteEn: 'Cristian delivered exactly what we needed, on time and without any hassle. Excellent communication throughout the project.' },
  { id: 'maria-ionescu', name: 'Maria Ionescu', roleRo: 'Marketing Manager', roleEn: 'Marketing Manager', order: 2,
    quoteRo: 'Un profesionist complet, a gândit atât designul, cât și partea tehnică. Site-ul nostru arată și funcționează impecabil.',
    quoteEn: 'A complete professional, he handled both the design and the technical side. Our site looks and works flawlessly.' },
  { id: 'alex-dumitru', name: 'Alex Dumitru', roleRo: 'CEO, Agenție', roleEn: 'CEO, Agency', order: 3,
    quoteRo: 'Rapid, atent la detalii și foarte ușor de lucrat cu el. Îl recomand cu încredere oricui caută un dezvoltator serios.',
    quoteEn: 'Fast, detail-oriented and very easy to work with. I highly recommend him to anyone looking for a reliable developer.' },
]

const tx = client.transaction()

for (const p of projects) {
  const doc = {
    _id: `project.${p.slug}`,
    _type: 'project',
    title: p.title,
    slug: { _type: 'slug', current: p.slug },
    descRo: p.descRo,
    descEn: p.descEn,
    tags: p.tags,
    accent: p.accent,
    featured: false,
    order: p.order,
  }
  if (p.link) doc.link = p.link
  tx.createOrReplace(doc)
}

for (const t of testimonials) {
  tx.createOrReplace({
    _id: `testimonial.${t.id}`,
    _type: 'testimonial',
    name: t.name,
    roleRo: t.roleRo,
    roleEn: t.roleEn,
    quoteRo: t.quoteRo,
    quoteEn: t.quoteEn,
    published: true,
    order: t.order,
  })
}

try {
  await tx.commit()
  console.log(`✓ Seeded ${projects.length} projects + ${testimonials.length} testimonials into "${dataset}".`)
} catch (e) {
  console.error('✗ Seed failed:', e.message)
  process.exit(1)
}
