import { LenisProvider } from '@/lib/lenis'
import { LanguageProvider } from '@/i18n/LanguageProvider'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <LenisProvider>{children}</LenisProvider>
    </LanguageProvider>
  )
}
