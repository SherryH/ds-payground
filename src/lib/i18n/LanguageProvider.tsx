import { useState, useCallback, useMemo } from 'react'
import { LanguageContext } from './LanguageContext'
import type { Language, LanguageProviderProps } from './types'

/**
 * Maps language codes to their full display names for accessibility
 * Used in ARIA live regions for screen reader announcements
 */
const LANGUAGE_NAMES: Record<Language, string> = {
  'en': 'English',
  'ja': 'Japanese',
  'zh-tw': 'Traditional Chinese'
}

/**
 * LanguageProvider component that manages language state and provides it to child components.
 *
 * This component:
 * - Manages the current language state
 * - Applies the `lang` attribute to the wrapper div for HTML semantics and CSS targeting
 * - Provides an ARIA live region for screen reader announcements
 * - Is SSR-safe with no hydration errors
 *
 * The `lang` attribute enables:
 * - Semantic HTML for screen readers
 * - CSS attribute selectors: `[lang="ja"] { ... }`
 * - Tailwind language variants: `lang-ja:text-lg` (when Tailwind plugin is configured)
 *
 * @example
 * ```tsx
 * import { LanguageProvider } from '@your-org/design-system'
 *
 * function App() {
 *   const handleLanguageChange = (lang) => {
 *     console.log('Language changed to:', lang)
 *   }
 *
 *   return (
 *     <LanguageProvider defaultLang="en" onChange={handleLanguageChange}>
 *       <YourApp />
 *     </LanguageProvider>
 *   )
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Without onChange callback
 * <LanguageProvider>
 *   <YourApp />
 * </LanguageProvider>
 * ```
 *
 * @param props - Component props
 * @param props.children - Child components that will have access to the language context
 * @param props.defaultLang - Initial language (defaults to 'en')
 * @param props.onChange - Optional callback invoked when language changes
 */
export function LanguageProvider({
  children,
  defaultLang = 'en',
  onChange
}: LanguageProviderProps) {
  const [lang, setLangState] = useState<Language>(defaultLang)

  // Stable function reference for setLang to prevent unnecessary re-renders
  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang)
    onChange?.(newLang)
  }, [onChange])

  // Memoized context value to prevent unnecessary re-renders of consumers
  const value = useMemo(() => ({ lang, setLang }), [lang, setLang])

  // Get language name for screen reader announcement
  const languageName = LANGUAGE_NAMES[lang]

  return (
    <LanguageContext.Provider value={value}>
      <div lang={lang}>
        {/* ARIA live region for screen reader language change announcements */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {languageName}
        </div>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}
