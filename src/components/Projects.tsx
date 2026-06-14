'use client'

import { useEffect, useState } from 'react'
import type { ProjectCard } from '@/lib/content'
import { useLanguage } from '@/i18n/LanguageProvider'

const VISIBLE = 3
const ROTATE_MS = 4500

// bento spans for the 3 visible cards (big left, two small stacked right)
const SPAN3 = ['sm:row-span-2', '', '']

export default function Projects({ projects }: { projects: ProjectCard[] }) {
  const { t, locale } = useLanguage()
  const [open, setOpen] = useState(false)
  const [start, setStart] = useState(0)
  const [paused, setPaused] = useState(false)

  const total = projects.length
  const hasMore = total > VISIBLE

  const trio = hasMore
    ? Array.from({ length: VISIBLE }, (_, k) => projects[(start + k) % total])
    : projects

  useEffect(() => {
    if (!hasMore || paused || open) return
    const id = setInterval(() => setStart((s) => (s + 1) % total), ROTATE_MS)
    return () => clearInterval(id)
  }, [hasMore, paused, open, total])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const card = (p: ProjectCard, i: number, animClass = '', keyId?: string, span = '', big = false) => {
    const desc = locale === 'ro' ? p.descRo : p.descEn
    return (
      <a key={keyId ?? p.slug}
        href={p.link ?? '#'}
        target={p.link ? '_blank' : undefined}
        rel="noopener noreferrer"
        data-cursor
        className={`group relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 ${span} ${animClass}`}
        style={{
          borderColor: 'var(--border)',
          background: `radial-gradient(120% 80% at 25% 15%, ${p.accent}1f 0%, transparent 55%), linear-gradient(180deg, #0b0b0b 0%, #060606 100%)`,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${p.accent}55`)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}>

        {p.imageUrl && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${p.imageUrl}?w=900&h=700&fit=crop&auto=format`} alt={p.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(6,6,6,0.05) 0%, rgba(6,6,6,0.40) 55%, rgba(6,6,6,0.92) 100%)' }} />
          </>
        )}

        <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
          <span className="flex items-center gap-2 font-mono text-xs text-white/22">
            <span className="h-2 w-2 rounded-full" style={{ background: p.accent }} />
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-lg text-white/15 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/55">
            ↗
          </span>
        </div>

        <div className="relative">
          <h3 className={`font-semibold capitalize text-white ${big ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>{p.name}</h3>
          {desc && <p className={`mt-1 leading-relaxed text-white/65 ${big ? 'text-[15px]' : 'text-sm'}`}>{desc}</p>}
          {p.tags?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.tags.map((tag) => (
                <span key={tag}
                  className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] text-white/45"
                  style={{ borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.25)' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </a>
    )
  }

  return (
    <section id="projects" className="relative px-6 py-20 md:px-10 md:py-24 lg:px-16" style={{ overflow: 'hidden' }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)' }} />
      <div className="pointer-events-none absolute -right-48 top-1/2 -translate-y-1/2 rounded-full"
        style={{ width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)' }} />

      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/20">{t.projects.label}</span>
          <div className="h-px w-14" style={{ background: 'var(--accent)', opacity: 0.4 }} />
        </div>
        <h2 className="mb-10 text-4xl font-bold tracking-tight text-white md:text-5xl">
          {t.projects.title}
        </h2>

        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[188px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}>
          {trio.map((p, k) => card(p, k, 'card-rotate', `${start}-${k}-${p.slug}`, SPAN3[k] ?? '', k === 0))}
        </div>

        {hasMore && (
          <div className="mt-10 flex items-center justify-center gap-5">
            <button
              onClick={() => setOpen(true)}
              data-cursor
              className="group flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium text-white/55 transition-all hover:border-white/25 hover:text-white/90"
              style={{ borderColor: 'var(--border)' }}>
              {t.projects.more}
              <span className="text-white/30 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-white/70">
                →
              </span>
            </button>

            <div className="hidden items-center gap-1.5 sm:flex">
              {projects.map((p, i) => (
                <span key={p.slug}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === start ? 16 : 6,
                    background: i === start ? 'var(--accent)' : 'rgba(255,255,255,0.15)',
                  }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={() => setOpen(false)}>
          <div className="modal-fade absolute inset-0"
            style={{ background: 'rgba(3,3,3,0.82)', backdropFilter: 'blur(8px)' }} />

          <div onClick={(e) => e.stopPropagation()}
            className="modal-pop relative z-10 flex max-h-[86vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border"
            style={{ borderColor: 'var(--border)', background: '#0a0a0a' }}>

            <div className="flex items-center justify-between border-b px-6 py-4"
              style={{ borderColor: 'var(--border)' }}>
              <h3 className="text-base font-semibold text-white">
                {t.projects.title}{' '}
                <span className="font-mono text-sm font-normal text-white/30">({projects.length})</span>
              </h3>
              <button onClick={() => setOpen(false)} aria-label="Close" data-cursor
                className="flex h-8 w-8 items-center justify-center rounded-full border text-white/40 transition-all hover:border-white/25 hover:text-white/90"
                style={{ borderColor: 'var(--border)' }}>
                ✕
              </button>
            </div>

            <div className="overflow-y-auto p-6" data-lenis-prevent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((p, i) => card(p, i))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
