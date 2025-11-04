/**
 * Internationalization (i18n) module
 *
 * Provides multilingual typography support for English, Japanese, and Traditional Chinese.
 *
 * @example
 * ```tsx
 * import { LanguageProvider, useLanguage } from '@your-org/design-system'
 *
 * function App() {
 *   return (
 *     <LanguageProvider defaultLang="ja">
 *       <YourApp />
 *     </LanguageProvider>
 *   )
 * }
 * ```
 */

// Types
export type { Language, LanguageContextValue, LanguageProviderProps } from './types'
export { SUPPORTED_LANGUAGES } from './types'

// Hook
export { useLanguage } from './useLanguage'

// Provider
export { LanguageProvider } from './LanguageProvider'
