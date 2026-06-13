'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '@/data/cv'
import { useLanguage } from '@/i18n/LanguageProvider'

gsap.registerPlugin(ScrollTrigger)

const inputBase = 'w-full rounded-xl border px-4 py-3.5 text-sm text-white outline-none transition-all bg-white/[0.025] placeholder:text-white/20'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [focused, setFocused] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ct-item', {
        opacity: 0, y: 35, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) { setStatus('error'); return }
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch { setStatus('error') }
  }

  const border = (field: string) => ({
    borderColor: focused === field ? 'rgba(34,197,94,0.45)' : 'var(--border)',
  })

  return (
    <section ref={sectionRef} id="contact" className="relative px-6 py-20 md:px-10 md:py-24 lg:px-16" style={{ overflow: 'hidden' }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)' }} />
      <div className="pointer-events-none absolute -left-48 top-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)',
        }} />

      <div className="mx-auto max-w-6xl">
        <div className="ct-item mb-12 flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/20">{t.contact.label}</span>
          <div className="h-px w-14" style={{ background: 'var(--accent)', opacity: 0.4 }} />
        </div>

        <div className="grid gap-20 lg:grid-cols-2 lg:gap-32">
          {/* left */}
          <div>
            <h2 className="ct-item mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
              {t.contact.title.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
            <p className="ct-item mb-10 max-w-sm text-[15px] leading-relaxed text-white/35">
              {t.contact.sub}
            </p>
            <div className="ct-item space-y-5">
              {[
                { label: 'email', value: profile.email, href: `mailto:${profile.email}`, accent: true },
                { label: 'github', value: 'github.com/Scroti', href: profile.github },
                { label: 'call', value: 'cal.com/scroti', href: profile.calCom },
              ].map(({ label, value, href, accent }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="w-14 shrink-0 font-mono text-xs text-white/20">{label}</span>
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="text-sm transition-colors hover:text-white/80"
                    style={{ color: accent ? 'var(--accent)' : 'rgba(255,255,255,0.35)' }}>
                    {value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* form */}
          <div className="ct-item">
            {status === 'sent' ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border p-12 text-center"
                style={{ borderColor: 'rgba(34,197,94,0.2)', background: 'rgba(34,197,94,0.04)' }}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: 'rgba(34,197,94,0.12)' }}>
                  <span style={{ color: 'var(--accent)', fontSize: '1.25rem' }}>✓</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{t.contact.sent}</h3>
                <p className="text-sm text-white/35">{t.contact.sentSub}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input type="text" required placeholder={t.contact.name} value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                    className={inputBase} style={border('name')} />
                  <input type="email" required placeholder={t.contact.email} value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                    className={inputBase} style={border('email')} />
                </div>
                <textarea required rows={6} placeholder={t.contact.message}
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                  className={`${inputBase} resize-none`} style={border('message')} />
                {status === 'error' && (
                  <p className="text-sm text-red-400/80">{t.contact.error}</p>
                )}
                <button type="submit" disabled={status === 'sending'}
                  className="rounded-xl px-8 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-85 disabled:opacity-50"
                  style={{ background: 'var(--accent)' }}>
                  {status === 'sending' ? t.contact.sending : t.contact.send}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
