import { profile } from '@/data/cv'

export default function Footer() {
  return (
    <footer className="px-6 py-8 md:px-10 lg:px-16" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-semibold" style={{ color: 'var(--accent)' }}>
            {profile.brand}
          </span>
          <span className="text-xs text-white/15">· © {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-6">
          {[
            { label: 'GitHub', href: profile.github },
            { label: 'LinkedIn', href: profile.linkedin },
            { label: 'Email', href: `mailto:${profile.email}` },
          ].map(({ label, href }) => (
            <a key={label} href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="text-xs text-white/20 transition-colors hover:text-white/60">
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
