'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/i18n/LanguageProvider'

const MAX_QUOTE = 240

export default function TestimonialPage() {
  const { t, locale, toggle } = useLanguage()
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [quote, setQuote] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const tr = t.submit
  const left = MAX_QUOTE - quote.length

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !quote.trim() || status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('/api/testimonial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, quote, website }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputCls =
    'w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-white/90 outline-none transition-colors placeholder:text-white/25 focus:border-white/30'

  return (
    <main className="relative flex min-h-svh items-center justify-center px-6 py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 rounded-full"
        style={{ width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)' }} />

      <div className="relative w-full max-w-lg">
        <div className="mb-8 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Image src="/logo-mark.png" alt="solantric" width={268} height={430} className="h-6 w-auto" />
            <span className="font-mono text-sm font-semibold tracking-wider" style={{ color: 'var(--accent)' }}>solantric</span>
          </a>
          <button onClick={toggle} aria-label="Switch language"
            className="rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-white/40 transition-colors hover:text-white/80"
            style={{ borderColor: 'var(--border)' }}>
            {locale === 'ro' ? 'EN' : 'RO'}
          </button>
        </div>

        {status === 'done' ? (
          <div className="rounded-2xl border p-8 text-center" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-xl"
              style={{ background: 'rgba(34,197,94,0.12)', color: 'var(--accent)' }}>✓</div>
            <h1 className="text-xl font-semibold text-white">{tr.okTitle}</h1>
            <p className="mt-2 text-sm text-white/45">{tr.okSub}</p>
            <a href="/" className="mt-6 inline-block text-sm text-white/40 underline underline-offset-4 transition-colors hover:text-white/80">
              ← solantric.space
            </a>
          </div>
        ) : (
          <div className="rounded-2xl border p-8" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
            <h1 className="text-2xl font-bold tracking-tight text-white">{tr.title}</h1>
            <p className="mt-2 text-sm text-white/45">{tr.sub}</p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <input
                aria-hidden tabIndex={-1} autoComplete="off"
                value={website} onChange={(e) => setWebsite(e.target.value)}
                className="hidden" name="website" />

              <input className={inputCls} style={{ borderColor: 'var(--border)' }}
                placeholder={tr.name} value={name} maxLength={80}
                onChange={(e) => setName(e.target.value)} required />

              <input className={inputCls} style={{ borderColor: 'var(--border)' }}
                placeholder={tr.role} value={role} maxLength={80}
                onChange={(e) => setRole(e.target.value)} />

              <div>
                <textarea className={`${inputCls} min-h-[120px] resize-none`} style={{ borderColor: 'var(--border)' }}
                  placeholder={tr.placeholder} value={quote} maxLength={MAX_QUOTE}
                  onChange={(e) => setQuote(e.target.value)} required />
                <div className="mt-1 text-right font-mono text-[11px] text-white/25">
                  {left} {tr.left}
                </div>
              </div>

              {status === 'error' && <p className="text-sm text-red-400/80">{tr.error}</p>}

              <button type="submit" disabled={status === 'sending' || !name.trim() || !quote.trim()}
                className="w-full rounded-full px-7 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-85 active:scale-[0.98] disabled:opacity-40"
                style={{ background: 'var(--accent)' }}>
                {status === 'sending' ? tr.sending : tr.send}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  )
}
