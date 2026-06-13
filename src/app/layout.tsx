import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { LenisProvider } from '@/lib/lenis'
import { LanguageProvider } from '@/i18n/LanguageProvider'
import './globals.css'

const geist = Geist({ variable: '--font-geist', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Solantric — Dev & Design',
  description: 'Portfolio creativ — web development & design',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full">
        <LanguageProvider>
          <LenisProvider>{children}</LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
