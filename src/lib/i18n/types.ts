/**
 * Supported languages in the design system
 * Each language has a code (used internally) and a display name
 */
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh-tw', name: 'Traditional Chinese' }
] as const

/**
 * Union type of supported language codes
 * Derived from SUPPORTED_LANGUAGES array
 * @example 'en' | 'ja' | 'zh-tw'
 */
export type Language = typeof SUPPORTED_LANGUAGES[number]['code']

/**
 * Context value provided by the LanguageProvider
 * Contains the current language and a function to update it
 */
export interface LanguageContextValue {
  /** Current active language code */
  lang: Language
  /** Function to update the current language */
  setLang: (lang: Language) => void
}

/**
 * Props for the LanguageProvider component
 */
export interface LanguageProviderProps {
  /** Initial language to use. Defaults to 'en' if not provided */
  defaultLang?: Language
  /** Child components that will have access to the language context */
  children: React.ReactNode
}
