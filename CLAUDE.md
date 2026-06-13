# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio for Solantric (Dev + Design freelancer) targeting local Romanian and international clients. Full creative aesthetic — scroll animations, parallax, particles. Inspired by Teka Teki Studios.

## Commands

```bash
npm run dev      # dev server → localhost:3000
npm run build    # production build
npm run lint     # ESLint
npx prettier --write .  # format
```

## Stack

| Library | Purpose |
|---|---|
| Next.js 15 (App Router) | Routing, SSR, `next/image` |
| Tailwind CSS | Utility styling |
| GSAP + ScrollTrigger | Scroll-triggered animations |
| Lenis | Smooth scroll (configured in `src/lib/lenis.tsx`) |
| Framer Motion | Page transitions, component animations |
| React Three Fiber + Drei | WebGL / 3D / particles |
| Three.js | Underlies R3F |

## Architecture

```
src/
  app/
    layout.tsx       # root layout — wraps everything in <LenisProvider>
    page.tsx         # homepage
    globals.css      # Tailwind base + custom CSS variables
  lib/
    lenis.tsx        # Lenis smooth scroll provider + useLenis() hook
  components/        # UI components (to be created)
```

## Key conventions

- **Smooth scroll:** Lenis is initialized in `src/lib/lenis.tsx` via `<LenisProvider>`. Use `useLenis()` to access the instance if needed. GSAP ScrollTrigger should sync with Lenis via `lenis.on('scroll', ScrollTrigger.update)`.
- **Animations:** Prefer GSAP + ScrollTrigger for scroll-driven effects, Framer Motion for enter/exit transitions.
- **3D/WebGL:** Use `@react-three/fiber` + `@react-three/drei` — keep canvas isolated in its own component, positioned `fixed` behind content.
- **Images:** WebP format, always via `next/image`. Separate mobile/desktop assets where needed.
- **Font:** Geist via `next/font/google`, exposed as `--font-geist` CSS variable.

## Next.js version note

This project uses Next.js 15 which may have breaking changes vs older versions. Check `node_modules/next/dist/docs/` if an API behaves unexpectedly.
