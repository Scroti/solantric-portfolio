import { translations } from '@/i18n/translations'
import { projectsMeta } from '@/data/projects'
import { getSanityProjects, getSanityTestimonials } from '@/sanity/lib/fetch'

export type ProjectCard = {
  slug: string
  name: string
  descRo: string
  descEn: string
  tags: string[]
  link?: string
  accent: string
  imageUrl?: string
}

export type TestimonialCard = {
  quoteRo: string
  quoteEn: string
  name: string
  roleRo: string
  roleEn: string
}

// fallback tech tags for the bundled (pre-CMS) projects
const TAGS: Record<string, string[]> = {
  armonia2: ['Next.js', 'TypeScript', 'PostgreSQL'],
  filo: ['React', 'Node.js', 'MongoDB'],
  teamlatch: ['React', 'WebSocket', 'Express'],
  'item-shop': ['Next.js', 'Stripe', 'Tailwind'],
  bonusbot: ['Node.js', 'Telegram API'],
  'metin2-bot': ['Python', 'OpenCV'],
  scrotios: ['C', 'Assembly'],
}

function staticProjects(): ProjectCard[] {
  const ro = translations.ro.projects.items as Record<string, { desc: string }>
  const en = translations.en.projects.items as Record<string, { desc: string }>
  return projectsMeta.map((m) => ({
    slug: m.slug,
    name: m.slug.replace(/-/g, ' '),
    descRo: ro[m.slug]?.desc ?? '',
    descEn: en[m.slug]?.desc ?? '',
    tags: TAGS[m.slug] ?? [],
    link: m.link,
    accent: m.accent,
  }))
}

function staticTestimonials(): TestimonialCard[] {
  const ro = translations.ro.testimonials.items
  const en = translations.en.testimonials.items
  return ro.map((item, i) => ({
    quoteRo: item.quote,
    quoteEn: en[i]?.quote ?? item.quote,
    name: item.name,
    roleRo: item.role,
    roleEn: en[i]?.role ?? item.role,
  }))
}

/** Projects from Sanity if configured + populated, otherwise the bundled ones. */
export async function getProjects(): Promise<ProjectCard[]> {
  const s = await getSanityProjects()
  if (s && s.length) {
    return s.map((p) => ({
      slug: p.slug,
      name: p.title,
      descRo: p.descRo ?? '',
      descEn: p.descEn ?? '',
      tags: p.tags ?? [],
      link: p.link,
      accent: p.accent || '#22c55e',
      imageUrl: p.imageUrl,
    }))
  }
  return staticProjects()
}

/** Testimonials from Sanity if configured + populated, otherwise the bundled ones. */
export async function getTestimonials(): Promise<TestimonialCard[]> {
  const s = await getSanityTestimonials()
  if (s && s.length) {
    return s.map((t) => ({
      quoteRo: t.quoteRo ?? t.quoteEn ?? '',
      quoteEn: t.quoteEn ?? t.quoteRo ?? '',
      name: t.name,
      roleRo: t.roleRo ?? '',
      roleEn: t.roleEn ?? '',
    }))
  }
  return staticTestimonials()
}
