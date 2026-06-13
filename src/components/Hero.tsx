'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { profile } from '@/data/cv'
import { useLanguage } from '@/i18n/LanguageProvider'

const ParticleField = dynamic(() => import('@/components/ParticleField'), { ssr: false })

const MARQUEE_ITEMS = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS',
  'Figma', 'Node.js', 'UI/UX Design', 'PostgreSQL',
  'GSAP', 'Three.js', 'REST API', 'Vercel',
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.h-line-inner', { yPercent: 110 })
      gsap.set(['.h-sub', '.h-btn', '.h-marquee', '.h-label'], { autoAlpha: 0, y: 12 })

      gsap.timeline({ delay: 0.2, defaults: { ease: 'power4.out' } })
        .to('.h-label',      { autoAlpha: 1, y: 0, duration: 0.6 })
        .to('.h-line-inner', { yPercent: 0,  duration: 1.1, stagger: 0.1 }, '-=0.35')
        .to('.h-sub',        { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.7')
        .to('.h-btn',        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09 }, '-=0.55')
        .to('.h-marquee',    { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.4')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <section ref={sectionRef} id="hero" className="relative flex min-h-svh flex-col" style={{ overflow: 'hidden' }}>
      <ParticleField />

      <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full"
        style={{ width: '50vw', height: '50vw', left: '-15vw',
          background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 65%)' }} />
      <div className="pointer-events-none absolute rounded-full"
        style={{ width: '30vw', height: '30vw', right: '-5vw', top: '20%',
          background: 'radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 65%)' }} />

      <div className="relative z-10 flex flex-1 items-center px-6 pt-24 pb-10 md:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-6xl">

          <p className="h-label mb-8 font-mono text-xs uppercase tracking-[0.3em] text-white/22">
            {t.hero.label}
          </p>

          <div className="mb-8 select-none">
            <div style={{ overflow: 'hidden' }}>
              <span className="h-line-inner block text-white"
                style={{ fontSize: 'clamp(4.5rem, 13vw, 11rem)', fontWeight: 700, lineHeight: 0.88, letterSpacing: '-0.02em' }}>
                We are
              </span>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <span className="h-line-inner block"
                style={{ fontSize: 'clamp(4.5rem, 13vw, 11rem)', fontWeight: 700, lineHeight: 0.88, letterSpacing: '-0.02em', color: 'var(--accent)' }}>
                Solantric.
              </span>
            </div>
          </div>

          <p className="h-sub mb-10 max-w-xl text-base text-white/45 md:text-lg">
            {t.hero.sub}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a href="#projects"
              className="h-btn rounded-full px-7 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-85 active:scale-95"
              style={{ background: 'var(--accent)' }}>
              {t.hero.btnProjects}
            </a>
            <a href="#contact"
              className="h-btn rounded-full border border-white/10 px-7 py-3 text-sm font-medium text-white/50 transition-all hover:border-white/20 hover:text-white/80 active:scale-95">
              {t.hero.btnContact}
            </a>
            <a href={profile.calCom} target="_blank" rel="noopener noreferrer"
              className="h-btn text-sm text-white/20 underline underline-offset-4 transition-colors hover:text-white/55">
              {t.hero.btnCall}
            </a>
          </div>
        </div>
      </div>

      <div className="h-marquee relative z-10 w-full border-t border-b py-4"
        style={{ borderColor: 'var(--border)', overflow: 'hidden' }}>
        <div className="marquee-track">
          {items.map((item, i) => (
            <span key={i} className="flex shrink-0 items-center gap-5 px-5 font-mono text-xs uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.18)' }}>
              {item}
              <span style={{ color: 'var(--accent)', opacity: 0.4 }}>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
