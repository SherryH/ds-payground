import { useContext } from 'react'
import { LanguageContext } from './LanguageContext'
import type { LanguageContextValue } from './types'

/**
 * Custom hook for type-safe access to the language context
 *
 * Must be used within a `LanguageProvider`. In development mode, throws an error
 * if used outside the provider. In production mode, gracefully falls back to English
 * and logs a warning.
 *
 * @returns The current language context value with `lang` and `setLang`
 * @throws {Error} In development mode if used outside LanguageProvider
 *
 * @example
 * ```tsx
 * import { useLanguage } from '@your-org/design-system'
 *
 * function MyComponent() {
 *   const { lang, setLang } = useLanguage()
 *
 *   return (
 *     <div>
 *       <p>Current language: {lang}</p>
 *       <button onClick={() => setLang('ja')}>
 *         Switch to Japanese
 *       </button>
 *     </div>
 *   )
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Using with typography components
 * import { useLanguage, Text } from '@your-org/design-system'
 *
 * function LanguageSwitcher() {
 *   const { lang, setLang } = useLanguage()
 *
 *   return (
 *     <div>
 *       <Text>Selected: {lang}</Text>
 *       <select value={lang} onChange={(e) => setLang(e.target.value)}>
 *         <option value="en">English</option>
 *         <option value="ja">Japanese</option>
 *         <option value="zh-tw">Traditional Chinese</option>
 *       </select>
 *     </div>
 *   )
 * }
 * ```
 */
export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)

  if (context === undefined) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        'useLanguage must be used within a LanguageProvider. ' +
        'Wrap your app with <LanguageProvider> to enable multilingual typography. ' +
        'Example:\n\n' +
        '  import { LanguageProvider } from \'@your-org/design-system\'\n\n' +
        '  <LanguageProvider defaultLang="en">\n' +
        '    <YourApp />\n' +
        '  </LanguageProvider>\n\n' +
        'See documentation: https://github.com/your-org/design-system#internationalization'
      )
    }

    // Production fallback: Return English default with warning
    return {
      lang: 'en',
      setLang: () => {
        console.warn('setLang called outside LanguageProvider. Language changes will have no effect.')
      }
    }
  }

  return context
}
