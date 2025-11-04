// Import styles
import './styles/globals.css'
import './styles/tokens.css'

// Export typography components
export { Heading, type HeadingProps } from './components/typography/Heading'
export { Text, type TextProps } from './components/typography/Text'
export { Paragraph, type ParagraphProps } from './components/typography/Paragraph'

// Export utilities
export { cn } from './lib/utils'

// Export i18n types and constants
export { SUPPORTED_LANGUAGES, type Language, type LanguageContextValue, type LanguageProviderProps } from './lib/i18n/types'

// Export i18n hooks
export { useLanguage } from './lib/i18n/useLanguage'
