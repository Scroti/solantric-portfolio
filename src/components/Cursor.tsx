'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const squareRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cursorRef.current
    const sq = squareRef.current
    if (!el || !sq) return

    let cx = -100, cy = -100

    const onMove = (e: MouseEvent) => {
      cx = e.clientX
      cy = e.clientY
      gsap.to(el, { x: cx, y: cy, duration: 0 })
      gsap.to(sq, { x: cx, y: cy, duration: 0.22, ease: 'power2.out' })
    }

    const onEnter = () => {
      gsap.to(el, { opacity: 0, duration: 0.15 })
      gsap.to(sq, {
        width: 28, height: 28, opacity: 1,
        borderColor: 'var(--accent)', duration: 0.25, ease: 'power2.out',
      })
    }
    const onLeave = () => {
      gsap.to(el, { opacity: 1, duration: 0.15 })
      gsap.to(sq, {
        width: 0, height: 0, opacity: 0,
        borderColor: 'rgba(255,255,255,0.3)', duration: 0.2,
      })
    }

    window.addEventListener('mousemove', onMove)
    const targets = document.querySelectorAll('a, button, [data-cursor]')
    targets.forEach(t => { t.addEventListener('mouseenter', onEnter); t.addEventListener('mouseleave', onLeave) })

    return () => {
      window.removeEventListener('mousemove', onMove)
      targets.forEach(t => { t.removeEventListener('mouseenter', onEnter); t.removeEventListener('mouseleave', onLeave) })
    }
  }, [])

  return (
    <>
      {/* crosshair */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        {/* vertical arm */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.7)' }} />
        {/* horizontal arm */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 12, height: 1, background: 'rgba(255,255,255,0.7)' }} />
        {/* center dot */}
        <div className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'var(--accent)' }} />
      </div>

      {/* hover square */}
      <div
        ref={squareRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-sm border"
        style={{ width: 0, height: 0, opacity: 0, borderColor: 'var(--accent)' }}
      />
    </>
  )
}
