'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { translations, type Locale, type TranslationKeys } from './translations'

type Ctx = { locale: Locale; t: TranslationKeys; toggle: () => void }

const LangCtx = createContext<Ctx | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ro')

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale | null
    if (saved === 'ro' || saved === 'en') setLocale(saved)
  }, [])

  const toggle = () => {
    const next: Locale = locale === 'ro' ? 'en' : 'ro'
    setLocale(next)
    localStorage.setItem('locale', next)
  }

  return (
    <LangCtx.Provider value={{ locale, t: translations[locale] as TranslationKeys, toggle }}>
      {children}
    </LangCtx.Provider>
  )
}

export const useLanguage = () => {
  const ctx = useContext(LangCtx)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
