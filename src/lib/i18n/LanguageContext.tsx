import { createContext } from 'react'
import type { LanguageContextValue } from './types'

/**
 * React Context for language state management
 *
 * Default value is `undefined` to enable detection of missing LanguageProvider.
 * Always use the `useLanguage()` hook to access this context safely.
 *
 * @example
 * ```tsx
 * import { LanguageProvider } from '@your-org/design-system'
 *
 * function App() {
 *   return (
 *     <LanguageProvider defaultLang="en">
 *       <YourApp />
 *     </LanguageProvider>
 *   )
 * }
 * ```
 *
 * @see {@link useLanguage} for the recommended way to access this context
 */
export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)
