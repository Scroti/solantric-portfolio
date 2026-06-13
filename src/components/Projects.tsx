'use client'

import { projectsMeta } from '@/data/projects'
import { useLanguage } from '@/i18n/LanguageProvider'

const TAGS: Record<string, string[]> = {
  armonia2:    ['Next.js', 'TypeScript', 'PostgreSQL'],
  filo:        ['React', 'Node.js', 'MongoDB'],
  teamlatch:   ['React', 'WebSocket', 'Express'],
  'item-shop': ['Next.js', 'Stripe', 'Tailwind'],
  bonusbot:    ['Node.js', 'Telegram API'],
}

const SHOWN = projectsMeta.slice(0, 5)

function ProjectThumb({ accent, slug, link }: { accent: string; slug: string; link?: string }) {
  return (
    <div
      className="hidden shrink-0 overflow-hidden rounded-lg border sm:block"
      style={{
        width: 88,
        height: 58,
        borderColor: 'rgba(255,255,255,0.07)',
        background: '#0a0a0a',
      }}
    >
      {/* chrome bar */}
      <div
        className="flex items-center gap-1 px-2 py-1.5"
        style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
        <span className="ml-1 truncate font-mono text-[7px] text-white/15">
          {link?.replace('https://', '') ?? slug}
        </span>
      </div>
      {/* body */}
      <div
        className="flex items-center justify-center"
        style={{
          height: 38,
          background: `radial-gradient(ellipse at 50% 60%, ${accent}28 0%, #060606 75%)`,
        }}
      >
        <span
          className="select-none font-mono text-[8px] font-semibold capitalize tracking-widest"
          style={{ color: accent, opacity: 0.6 }}
        >
          {slug.replace(/-/g, ' ')}
        </span>
      </div>
    </div>
  )
}

export default function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projects" className="relative px-6 py-36 md:px-10 lg:px-16" style={{ overflow: 'hidden' }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)' }} />
      <div className="pointer-events-none absolute -right-48 top-1/2 -translate-y-1/2 rounded-full"
        style={{ width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)' }} />

      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/20">{t.projects.label}</span>
          <div className="h-px w-14" style={{ background: 'var(--accent)', opacity: 0.4 }} />
        </div>
        <h2 className="mb-16 text-4xl font-bold tracking-tight text-white md:text-5xl">
          {t.projects.title}
        </h2>

        <div>
          {SHOWN.map((p, i) => {
            const desc = t.projects.items[p.slug as keyof typeof t.projects.items]?.desc
            const tags = TAGS[p.slug]
            return (
              <a key={p.slug}
                href={p.link ?? '#'}
                target={p.link ? '_blank' : undefined}
                rel="noopener noreferrer"
                data-cursor
                className="group flex items-center gap-5 border-t py-7 transition-all last:border-b"
                style={{ borderColor: 'var(--border)', transitionDuration: '250ms' }}
                onMouseEnter={e => (e.currentTarget.style.paddingLeft = '1rem')}
                onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0')}>

                <span className="w-7 shrink-0 font-mono text-xs text-white/18 transition-colors group-hover:text-white/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`h-2 w-2 shrink-0 rounded-full ${p.dot}`} />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="capitalize text-base font-semibold text-white md:text-lg">
                      {p.slug.replace(/-/g, ' ')}
                    </h3>
                    <span className="shrink-0 text-lg text-white/15 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/50">
                      ↗
                    </span>
                  </div>
                  {desc && <p className="mt-0.5 text-sm text-white/32">{desc}</p>}
                  {tags && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <span key={tag}
                          className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] text-white/22"
                          style={{ borderColor: 'var(--border)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <ProjectThumb accent={p.accent} slug={p.slug} link={p.link} />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
