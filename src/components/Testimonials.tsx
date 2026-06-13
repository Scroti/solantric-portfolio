'use client'

import { useLanguage } from '@/i18n/LanguageProvider'

function initials(name: string) {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
}

export default function Testimonials() {
  const { t } = useLanguage()
  const items = t.testimonials.items
  // repeat enough that one half (the -50% travel) is wider than the viewport,
  // so the seamless loop never shows an empty gap on wide screens
  const loop = [...items, ...items, ...items, ...items]

  return (
    <section id="testimonials" className="relative py-20 md:py-24" style={{ overflow: 'hidden' }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)' }} />
      <div className="pointer-events-none absolute -left-48 top-1/3 rounded-full"
        style={{ width: '460px', height: '460px',
          background: 'radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)' }} />

      <div className="mx-auto mb-12 max-w-6xl px-6 md:px-10 lg:px-16">
        <div className="mb-8 flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/20">{t.testimonials.label}</span>
          <div className="h-px w-14" style={{ background: 'var(--accent)', opacity: 0.4 }} />
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          {t.testimonials.title}
        </h2>
      </div>

      {/* marquee */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28"
          style={{ background: 'linear-gradient(to right, #060606, transparent)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28"
          style={{ background: 'linear-gradient(to left, #060606, transparent)' }} />

        <div className="marquee-track">
          {loop.map((item, i) => (
            <figure key={i}
              className="mr-4 flex h-[210px] w-[300px] shrink-0 flex-col rounded-2xl border p-6 sm:w-[360px]"
              style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
              <span aria-hidden className="mb-2 font-serif text-4xl leading-none"
                style={{ color: 'var(--accent)', opacity: 0.5 }}>
                &ldquo;
              </span>
              <blockquote className="flex-1 overflow-hidden text-[15px] leading-[1.65] text-white/60"
                style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
                {item.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full font-mono text-xs font-semibold"
                  style={{ background: 'rgba(34,197,94,0.12)', color: 'var(--accent)' }}>
                  {initials(item.name)}
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold text-white">{item.name}</span>
                  <span className="block text-xs text-white/35">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
