'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '@/data/cv'
import { useLanguage } from '@/i18n/LanguageProvider'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()
  const yearsExp = new Date().getFullYear() - 2021

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ab-item', {
        opacity: 0,
        y: 35,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative px-6 py-36 md:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)' }} />

      <div className="mx-auto max-w-6xl">
        <div className="ab-item mb-12 flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/20">{t.about.label}</span>
          <div className="h-px w-14" style={{ background: 'var(--accent)', opacity: 0.4 }} />
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="ab-item mb-8 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
              {t.about.title.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
            <div className="ab-item space-y-4 text-[15px] leading-[1.75] text-white/38">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>
            <div className="ab-item mt-8 flex flex-wrap gap-2.5">
              <a href={profile.github} target="_blank" rel="noopener noreferrer"
                className="rounded-full border border-white/8 px-4 py-2 text-xs text-white/35 transition-all hover:border-white/20 hover:text-white/70">
                GitHub ↗
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                className="rounded-full border border-white/8 px-4 py-2 text-xs text-white/35 transition-all hover:border-white/20 hover:text-white/70">
                LinkedIn ↗
              </a>
              <a href={profile.calCom} target="_blank" rel="noopener noreferrer"
                className="rounded-full px-4 py-2 text-xs font-medium transition-opacity hover:opacity-75"
                style={{ background: 'rgba(34,197,94,0.1)', color: 'var(--accent)' }}>
                {t.about.btnCall}
              </a>
            </div>
          </div>

          <div className="space-y-3">
            {t.about.services.map(({ title, desc }, i) => (
              <div key={title}
                className="ab-item rounded-2xl border p-6 transition-colors hover:border-white/10"
                style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <h3 className="text-sm font-semibold text-white">{title}</h3>
                  <span className="font-mono text-xs text-white/15">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="text-sm leading-relaxed text-white/35">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-12">
          {t.about.stats.map(({ n, label }, i) => (
            <div key={label} className="ab-item">
              <div className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>
                {i === 0 ? `${yearsExp}+` : n}
              </div>
              <div className="mt-1 text-xs text-white/30">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
