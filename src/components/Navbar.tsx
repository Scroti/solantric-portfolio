'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { profile } from '@/data/cv'
import { useLanguage } from '@/i18n/LanguageProvider'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const { t, locale, toggle } = useLanguage()

  useEffect(() => {
    gsap.from(navRef.current, { y: -20, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2 })
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: t.nav.about,   href: '#about'    },
    { label: t.nav.work,    href: '#projects'  },
    { label: t.nav.contact, href: '#contact'   },
  ]

  return (
    <header
      ref={navRef}
      className="fixed left-0 right-0 top-0 z-50 px-6 py-5 transition-all duration-500 md:px-10 lg:px-16"
      style={scrolled ? {
        background: 'rgba(6,6,6,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      } : {}}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <a href="#hero" className="font-mono text-sm font-semibold tracking-wider" style={{ color: 'var(--accent)' }}>
          {profile.brand}
        </a>

        <nav className="flex items-center gap-6">
          {links.map(({ label, href }) => (
            <a key={href} href={href}
              className="hidden text-sm text-white/40 transition-colors hover:text-white/80 sm:block">
              {label}
            </a>
          ))}

          {/* EN / RO toggle */}
          <button
            onClick={toggle}
            aria-label="Switch language"
            className="relative flex items-center rounded-full border p-0.5 transition-all duration-300 hover:border-white/20"
            style={{ borderColor: 'var(--border)' }}
          >
            {(['ro', 'en'] as const).map((lang) => (
              <span
                key={lang}
                className="relative z-10 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest transition-colors duration-200"
                style={{
                  background: locale === lang ? 'var(--accent)' : 'transparent',
                  color: locale === lang ? '#000' : 'rgba(255,255,255,0.28)',
                }}
              >
                {lang}
              </span>
            ))}
          </button>

        </nav>
      </div>
    </header>
  )
}
