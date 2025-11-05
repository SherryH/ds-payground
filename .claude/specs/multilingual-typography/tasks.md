# Implementation Tasks: Multilingual Typography

## Task Overview

Implement multilingual typography support (English, Japanese, Traditional Chinese) through a Context-based architecture with CSS custom properties for font switching. Tasks follow atomic principles with each task touching 1-3 files and completable in 15-30 minutes.

## Steering Document Compliance

- **Structure**: i18n code organized in `src/lib/i18n/` following existing patterns (`src/lib/utils.ts`)
- **Tech Stack**: Pure React Context API (existing pattern), CSS custom properties (existing `tokens.css` pattern), CVA pattern (existing in `Heading.tsx`, `Text.tsx`)
- **Build System**: Extends existing Vite config, maintains TypeScript type generation
- **Testing**: Follows project's testing patterns (to be established during implementation)

## Atomic Task Requirements

**Each task meets these criteria:**
- **File Scope**: Touches 1-3 related files maximum
- **Time Boxing**: Completable in 15-30 minutes
- **Single Purpose**: One testable outcome per task
- **Specific Files**: Exact files to create/modify specified
- **Agent-Friendly**: Clear input/output with minimal context switching

## Implementation Phases

### Phase 1: Core i18n Infrastructure (Tasks 1-6)
Foundation types, context, provider, and hook.

### Phase 2: Typography Component Integration (Tasks 7-9)
Modify existing typography components to support multilingual context.

### Phase 3: CSS & Font Configuration (Tasks 10-15)
CSS custom properties, font files, and build configuration.

### Phase 4: Storybook Demos (Tasks 16-21)
Comprehensive language demonstrations and interactive examples.

### Phase 5: Library Exports & Testing (Tasks 22-27)
Public API exports and comprehensive testing suite.

---

## Tasks

### Phase 1: Core i18n Infrastructure

- [x] **1. Create language types and constants**

  **Files**: `src/lib/i18n/types.ts` (create new)

  **Implementation**:
  - Create TypeScript type definitions file
  - Define `SUPPORTED_LANGUAGES` constant array: `['en', 'ja', 'zh-TW']` with `as const`
  - Export `Language` type derived from array: `typeof SUPPORTED_LANGUAGES[number]`
  - Define `LanguageContextValue` interface with `lang: Language` and `setLang: (lang: Language) => void`
  - Define `LanguageProviderProps` interface with `children: ReactNode`, `defaultLang?: Language`, `onChange?: (lang: Language) => void`
  - Add comprehensive JSDoc comments for each type

  **Purpose**: Establish type-safe foundation for i18n system with single source of truth for supported languages

  _Requirements: FR-1.2, NFR-6.1, NFR-6.2, NFR-7.2, NFR-7.4_
  _Leverage: TypeScript patterns from existing project_

- [x] **2. Create language context**

  **Files**: `src/lib/i18n/LanguageContext.tsx` (create new)

  **Implementation**:
  - Import React `createContext`, types from `./types.ts`
  - Create `LanguageContext` using `createContext<LanguageContextValue | undefined>(undefined)`
  - Export context with JSDoc comment explaining undefined default (enables provider detection)
  - Add usage example in JSDoc: context consumed by useLanguage hook

  **Purpose**: Define React Context for language state management with provider detection capability

  _Requirements: FR-1.1, FR-1.5, NFR-7.1_
  _Leverage: React Context API patterns_

- [x] **3. Implement useLanguage hook**

  **Files**: `src/lib/i18n/useLanguage.ts` (create new)

  **Implementation**:
  - Import `useContext` from React, `LanguageContext` from `./LanguageContext.tsx`, types from `./types.ts`
  - Create `useLanguage()` function returning `LanguageContextValue`
  - Call `useContext(LanguageContext)` and store result
  - Add conditional logic: if context is `undefined`
    - In development (`process.env.NODE_ENV !== 'production'`): throw Error with setup instructions and documentation link
    - In production: return fallback object `{ lang: 'en', setLang: () => console.warn('...') }`
  - If context exists, return it
  - Add comprehensive JSDoc with usage example

  **Purpose**: Provide type-safe hook with development warnings and production graceful degradation

  _Requirements: FR-1.3, FR-1.4, FR-1.5, FR-8.1, FR-8.2, FR-8.3, FR-8.4, NFR-6.2, NFR-6.3_
  _Leverage: Custom hooks pattern from existing project_

- [x] **4. Create LanguageProvider component with base state management**

  **Files**: `src/lib/i18n/LanguageProvider.tsx` (create new)

  **Implementation**:
  - Import React `useState`, `useCallback`, `useMemo`, types from `./types.ts`, `LanguageContext` from `./LanguageContext.tsx`
  - Create functional component accepting `LanguageProviderProps`
  - Initialize state: `const [lang, setLangState] = useState<Language>(defaultLang || 'en')`
  - Create `setLang` with `useCallback`: calls `setLangState(newLang)` then `onChange?.(newLang)`, depends on `[onChange]`
  - Memoize context value: `useMemo(() => ({ lang, setLang }), [lang, setLang])`
  - Return JSX: `<LanguageContext.Provider value={value}><div lang={lang} className={`lang-${lang}`}>{children}</div></LanguageContext.Provider>`
  - Add JSDoc with props documentation and usage example

  **Purpose**: Create provider component with core state management and SSR-safe lang attribute

  _Requirements: FR-1.1, FR-2.1, FR-2.2, FR-2.3, FR-2.4, FR-2.5, NFR-2.1, NFR-2.2, NFR-2.3, NFR-2.4, NFR-3.1_
  _Leverage: React Context Provider pattern, `cn` utility from `@/lib/utils`_

- [x] **5. Add accessibility features to LanguageProvider**

  **Files**: `src/lib/i18n/LanguageProvider.tsx` (modify existing)

  **Implementation**:
  - Add `languageName` computation: map `lang` to human-readable name ("Japanese", "Traditional Chinese", "English")
  - Add ARIA live region inside wrapper div: `<div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{languageName}</div>`
  - Ensure ARIA live region is first child for proper screen reader announcement
  - Update JSDoc to document accessibility features
  - Test that language changes are announced by screen readers

  **Purpose**: Add screen reader support for language change announcements

  _Requirements: NFR-3.3, NFR-6.2_
  _Leverage: ARIA live regions, screen reader best practices_

- [x] **6. Create i18n module barrel export**

  **Files**: `src/lib/i18n/index.ts` (create new)

  **Implementation**:
  - Export all types from `./types.ts`: `SUPPORTED_LANGUAGES`, `Language`, `LanguageContextValue`, `LanguageProviderProps`
  - Export `LanguageProvider` from `./LanguageProvider.tsx`
  - Export `useLanguage` from `./useLanguage.ts`
  - Do NOT export `LanguageContext` (internal implementation detail)
  - Add file-level JSDoc comment describing the i18n module

  **Purpose**: Provide clean public API surface for i18n functionality

  _Requirements: FR-10.1, FR-10.2, FR-10.3, FR-10.4, FR-10.5, NFR-7.1_
  _Leverage: Barrel export pattern from existing `src/index.ts`_

---

### Phase 2: Typography Component Integration [DEFERRED - OUT OF SCOPE]

**Status**: Phase 2 deferred to future release per requirement updates (FR-6, US-4, OS-1).

**Rationale**: Typography components inherit language from `LanguageProvider` via CSS custom properties. Component-level language detection and `lang` attribute application are not needed for initial release. This simplifies implementation and reduces HTML redundancy while maintaining all functionality.

**Original Tasks** (for reference):
- ~~**7. Add multilingual support to Heading component**~~ [OUT OF SCOPE]
- ~~**8. Add multilingual support to Text component**~~ [OUT OF SCOPE]
- ~~**9. Add multilingual support to Paragraph component**~~ [OUT OF SCOPE]

**Implementation Changes**:
- Typography components remain unchanged - no imports of `useLanguage` hook
- No `lang` prop added to component interfaces
- No `lang` attribute applied to rendered elements
- CSS inheritance from `LanguageProvider` wrapper handles all font switching

**When to Revisit**: If specific use cases emerge requiring:
- Mixed languages on the same page
- Component-level language overrides
- Individual component lang attributes

---

### Phase 3: CSS & Font Configuration

- [x] **10. Add language-specific font-family variables to tokens.css**

  **Files**: `src/styles/tokens.css` (modify existing)

  **Implementation**:
  - In `:root` selector, add comment section "=== Language-Specific Font Families ==="
  - Add `--font-en: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;`
  - Add `--font-ja: 'Hiragino Sans', 'Hiragino Kaku Gothic Pro', 'Yu Gothic', 'YuGothic', 'Noto Sans JP', sans-serif;`
  - Add `--font-zh-tw: 'Microsoft JhengHei', 'PingFang TC', 'Noto Sans TC', 'Noto Sans CJK TC', sans-serif;`
  - Update existing `--font-sans` to: `var(--font-en);` (maintain backward compatibility)
  - After `:root`, add language-specific selectors for font-family:
    - `[lang="en"] { --font-sans: var(--font-en); }`
    - `[lang="ja"] { --font-sans: var(--font-ja); }`
    - `[lang="zh-TW"] { --font-sans: var(--font-zh-tw); }`

  **Purpose**: Configure font-family CSS custom properties for automatic font switching based on lang attribute

  _Requirements: FR-3.1, FR-3.2, FR-3.3, FR-3.4, FR-3.5, US-5, TC-1.2, TC-4.1, NFR-7.3_
  _Leverage: Existing CSS custom properties pattern in `tokens.css`_

- [x] **11. Add language-specific line-height variables to tokens.css**

  **Files**: `src/styles/tokens.css` (modify existing)

  **Implementation**:
  - In `:root` selector, add comment section "=== Language-Specific Line Heights ==="
  - Add `--line-height-en: 1.5;`
  - Add `--line-height-ja: 1.8;`
  - Add `--line-height-zh-tw: 1.8;`
  - Add `--line-height-base: var(--line-height-en);`
  - Update existing language-specific selectors to include line-height:
    - `[lang="en"] { --font-sans: var(--font-en); --line-height-base: var(--line-height-en); }`
    - `[lang="ja"] { --font-sans: var(--font-ja); --line-height-base: var(--line-height-ja); }`
    - `[lang="zh-TW"] { --font-sans: var(--font-zh-tw); --line-height-base: var(--line-height-zh-tw); }`
  - Test that CJK text has increased line-height (1.8) compared to English (1.5)

  **Purpose**: Configure line-height adjustments for optimal CJK typography readability

  _Requirements: FR-7.1, FR-7.2, FR-7.3, US-8, NFR-7.3_
  _Leverage: Existing CSS custom properties pattern in `tokens.css`_

- [x] **12. Create web font definitions file**

  **Files**: `src/styles/fonts.css` (create new)

  **Implementation**:
  - Add file-level comment: "Web Font Loading for Multilingual Typography - Uses font-display: swap for optimal performance"
  - Add section comment "=== Japanese Font (Noto Sans JP) ==="
  - Create `@font-face` for Noto Sans JP Regular: `font-family: 'Noto Sans JP'`, `src: url('../fonts/NotoSansJP-Regular-subset.woff2') format('woff2')`, `font-weight: 400`, `font-style: normal`, `font-display: swap`, `unicode-range: U+3000-303F, U+3040-309F, U+30A0-30FF, U+4E00-9FAF, U+FF00-FFEF;`
  - Create `@font-face` for Noto Sans JP Bold: same as above but `font-weight: 700` and `NotoSansJP-Bold-subset.woff2`
  - Add section comment "=== Traditional Chinese Font (Noto Sans TC) ==="
  - Create `@font-face` for Noto Sans TC Regular: `font-family: 'Noto Sans TC'`, `src: url('../fonts/NotoSansTC-Regular-subset.woff2') format('woff2')`, `font-weight: 400`, `font-style: normal`, `font-display: swap`, `unicode-range: U+3000-303F, U+4E00-9FFF, U+F900-FAFF, U+FF00-FFEF;`
  - Create `@font-face` for Noto Sans TC Bold: same as above but `font-weight: 700` and `NotoSansTC-Bold-subset.woff2`

  **Purpose**: Define web font faces with progressive loading and unicode-range optimization

  _Requirements: FR-5.1, FR-5.2, FR-5.3, FR-5.4, US-5, NFR-1.1, NFR-1.2, NFR-1.3, NFR-4.2, NFR-4.3, TC-2.1_
  _Leverage: CSS `@font-face` standard, font-display: swap for performance_

- [ ] **13. Import fonts.css in main entry point**

  **Files**: `src/index.ts` (modify existing)

  **Implementation**:
  - After existing style imports (`globals.css`, `tokens.css`), add: `import './styles/fonts.css'`
  - Add comment above import: "// Web font definitions for multilingual typography"
  - Maintain import order: globals → tokens → fonts

  **Purpose**: Ensure web font definitions are included in library bundle

  _Requirements: FR-5.3, TC-3.1_
  _Leverage: Existing style import pattern in `src/index.ts`_

- [ ] **14. Download and subset Noto Sans JP fonts**

  **Files**: `src/fonts/` directory (create), font files (download and process)

  **Implementation**:
  - Create `src/fonts/` directory if it doesn't exist
  - Download Noto Sans JP Regular and Bold from Google Fonts
  - Use pyftsubset (fonttools) to subset fonts:
    - Command: `pyftsubset NotoSansJP-Regular.otf --unicodes="U+0020-007E,U+3000-303F,U+3040-309F,U+30A0-30FF,U+4E00-9FAF,U+FF00-FFEF" --flavor=woff2 --output-file=NotoSansJP-Regular-subset.woff2`
    - Repeat for Bold weight
  - Place subsetted files in `src/fonts/`:
    - `NotoSansJP-Regular-subset.woff2` (target: ~100KB)
    - `NotoSansJP-Bold-subset.woff2` (target: ~100KB)
  - Verify file sizes are within budget (<= 100KB each)

  **Purpose**: Provide Japanese web font fallback with optimized file size

  _Requirements: FR-5.1, FR-5.4, US-5, NFR-1.3, TC-2.1_
  _Leverage: Google Fonts, pyftsubset tool, WOFF2 compression_

  **Note**: Manual subsetting process documented for MVP. Automation deferred to future enhancement.

- [ ] **15. Download and subset Noto Sans TC fonts**

  **Files**: `src/fonts/` directory, font files (download and process)

  **Implementation**:
  - Download Noto Sans TC Regular and Bold from Google Fonts
  - Use pyftsubset (fonttools) to subset fonts:
    - Command: `pyftsubset NotoSansTC-Regular.otf --unicodes="U+0020-007E,U+3000-303F,U+4E00-9FFF,U+F900-FAFF,U+FF00-FFEF" --flavor=woff2 --output-file=NotoSansTC-Regular-subset.woff2`
    - Repeat for Bold weight
  - Place subsetted files in `src/fonts/`:
    - `NotoSansTC-Regular-subset.woff2` (target: ~100KB)
    - `NotoSansTC-Bold-subset.woff2` (target: ~100KB)
  - Verify file sizes are within budget (<= 100KB each)
  - Verify total font bundle size: 4 files * 100KB = ~400KB (within 600KB budget ✅)

  **Purpose**: Provide Traditional Chinese web font fallback with optimized file size

  _Requirements: FR-5.2, FR-5.4, US-5, NFR-1.3, TC-2.1_
  _Leverage: Google Fonts, pyftsubset tool, WOFF2 compression_

- [ ] **16. Configure Vite to bundle font files**

  **Files**: `vite.config.ts` (modify existing)

  **Implementation**:
  - In `build.rollupOptions.output`, add/modify `assetFileNames` function:
    ```typescript
    assetFileNames: (assetInfo) => {
      if (assetInfo.name?.endsWith('.woff2')) {
        return 'fonts/[name][extname]'
      }
      return 'assets/[name][extname]'
    }
    ```
  - Add `assetsInclude: ['**/*.woff2']` to Vite config root (if not already present)
  - Add comment: "// Ensure font files are copied to dist/fonts/"

  **Purpose**: Configure build system to copy font files to predictable location in dist

  _Requirements: FR-5.5, TC-3.1, TC-3.2_
  _Leverage: Existing Vite configuration, Rollup output configuration_

---

### Phase 4: Storybook Demos

- [ ] **17. Create Japanese typography demo story**

  **Files**: `src/components/typography/Multilingual/Japanese.stories.tsx` (create new, including directory)

  **Implementation**:
  - Create directory: `src/components/typography/Multilingual/`
  - Import Storybook types: `Meta`, `StoryObj` from `@storybook/react`
  - Import components: `LanguageProvider` from `@/lib/i18n`, `Heading`, `Text`, `Paragraph` from `@/components/typography`
  - Define meta: `title: 'Typography/Multilingual/Japanese'`, `parameters: { layout: 'padded' }`, `tags: ['autodocs']`
  - Create `AllComponents` story:
    - Wrap in `<LanguageProvider defaultLang="ja">`
    - Include sections:
      - Headings: h1, h2, h3 with Japanese text "見出し1 (Heading 1)", etc.
      - Hiragana: Full hiragana alphabet in Paragraph
      - Katakana: Full katakana alphabet in Paragraph
      - Kanji: Sample Japanese text about design system in Paragraph
      - Mixed Content: Name "John Smith", age "35歳", price "¥12,345", date "2025年11月3日", email in Paragraph
  - Add story description in parameters documenting the demonstration

  **Purpose**: Demonstrate Japanese typography rendering with comprehensive character coverage

  _Requirements: FR-9.1, FR-9.2, FR-9.3, US-7, NFR-6.4_
  _Leverage: Existing Storybook patterns from `Heading.stories.tsx`, `Text.stories.tsx`_

- [ ] **18. Create Traditional Chinese typography demo story**

  **Files**: `src/components/typography/Multilingual/TraditionalChinese.stories.tsx` (create new)

  **Implementation**:
  - Import Storybook types and components (same as Japanese story)
  - Define meta: `title: 'Typography/Multilingual/Traditional Chinese'`, `parameters: { layout: 'padded' }`, `tags: ['autodocs']`
  - Create `AllComponents` story:
    - Wrap in `<LanguageProvider defaultLang="zh-TW">`
    - Include sections:
      - Headings: h1, h2, h3 with Traditional Chinese text "標題一 (Heading 1)", etc.
      - Paragraph samples: Traditional Chinese welcome message, design system description
      - Mixed Content: English names, numbers, Traditional Chinese characters
  - Add story description documenting Traditional Chinese character rendering

  **Purpose**: Demonstrate Traditional Chinese typography rendering with proper font usage

  _Requirements: FR-9.1, FR-9.4, US-7, NFR-6.4_
  _Leverage: Japanese.stories.tsx structure, existing Storybook patterns_

- [ ] **19. Create English typography demo story**

  **Files**: `src/components/typography/Multilingual/English.stories.tsx` (create new)

  **Implementation**:
  - Import Storybook types and components (same as previous stories)
  - Define meta: `title: 'Typography/Multilingual/English'`, `parameters: { layout: 'padded' }`, `tags: ['autodocs']`
  - Create `AllComponents` story:
    - Wrap in `<LanguageProvider defaultLang="en">` (or no provider to demonstrate default)
    - Include sections:
      - Headings: h1, h2, h3 with English text
      - Paragraph samples: English welcome message, design system description
      - Typography scale demonstration: different sizes and weights
  - Add story description documenting baseline English typography

  **Purpose**: Demonstrate English typography as baseline and zero-config default behavior

  _Requirements: FR-9.1, FR-9.5, US-7, NFR-6.4, NFR-6.5_
  _Leverage: Previous Multilingual stories structure_

- [ ] **20. Create Language Switcher interactive demo story**

  **Files**: `src/components/typography/Multilingual/LanguageSwitcher.stories.tsx` (create new)

  **Implementation**:
  - Import React `useState`, Storybook types, `LanguageProvider`, `useLanguage` from `@/lib/i18n`, typography components
  - Define meta: `title: 'Typography/Multilingual/Language Switcher'`, `parameters: { layout: 'padded' }`
  - Create internal `LanguageSwitcherDemo` component:
    - Call `const { lang, setLang } = useLanguage()`
    - Define content object with translations for 'en', 'ja', 'zh-TW': `{ title, description }` for each language
    - Render button group: 3 buttons for each language (English, 日本語, 繁體中文)
    - Apply highlight styling to active language button: `style={{ fontWeight: lang === 'en' ? 'bold' : 'normal', background: lang === 'en' ? '#e0f2fe' : 'transparent' }}`
    - Render content: `<Heading level="h1">{content[lang].title}</Heading>`, `<Paragraph>{content[lang].description}</Paragraph>`, `<Text size="sm" variant="muted">Current language: <strong>{lang}</strong></Text>`
  - Create `InteractiveSwitcher` story: wrap `<LanguageSwitcherDemo />` in `<LanguageProvider defaultLang="en">`
  - Add story description documenting runtime language switching capability

  **Purpose**: Demonstrate runtime language switching and useLanguage hook usage

  _Requirements: FR-9.1, FR-9.6, US-3, US-7, NFR-6.4_
  _Leverage: useLanguage hook, existing Storybook interactive story patterns_

  **Note**: Shadcn Dropdown (FR-9.7) deferred to P1 enhancement. Using simple button group for MVP.

- [ ] ~~**21. Create Component-Level Override demo story**~~ [OUT OF SCOPE]

  **Status**: Deferred to future release (component-level overrides not in scope)

  **Original Purpose**: Demonstrate component-level lang prop override for mixing multiple languages on same page

  _Original Requirements: US-4 (out of scope), NFR-6.4_

---

### Phase 5: Library Exports & Testing

- [ ] **22. Update main library exports**

  **Files**: `src/index.ts` (modify existing)

  **Implementation**:
  - After existing typography exports, add comment: "// Export i18n utilities for multilingual typography"
  - Add exports: `export { LanguageProvider, useLanguage, type Language, type LanguageContextValue, type LanguageProviderProps } from './lib/i18n'`
  - Verify no circular dependencies
  - Verify tree-shaking works: i18n code removable if not imported

  **Purpose**: Expose i18n API as part of library's public interface with proper tree-shaking

  _Requirements: FR-10.1, FR-10.2, FR-10.3, FR-10.4, FR-10.5, NFR-1.5, TC-2.3_
  _Leverage: Existing export pattern in `src/index.ts`_

- [ ] **23. Add optional Tailwind language variants plugin**

  **Files**: `tailwind.config.ts` (modify existing)

  **Implementation**:
  - In `plugins` array, add new plugin function:
    ```typescript
    function({ addVariant }) {
      addVariant('lang-en', '[lang="en"] &')
      addVariant('lang-ja', '[lang="ja"] &')
      addVariant('lang-zh-tw', '[lang="zh-TW"] &')
    }
    ```
  - Add comment above: "// Language variant plugin for multilingual typography (optional enhancement)"
  - Verify plugin works: test with `<div className="lang-ja:text-lg">` in Storybook

  **Purpose**: Provide optional Tailwind variants for language-specific styling

  _Requirements: FR-4.1, FR-4.2, FR-4.3, FR-4.4, TC-1.3_
  _Leverage: Existing Tailwind configuration and plugin system_

- [ ] **24. Write unit tests for language context and hook**

  **Files**: `src/lib/i18n/__tests__/LanguageProvider.test.tsx` (create new, including directory)

  **Implementation**:
  - Setup: Import testing utilities (`@testing-library/react`), `LanguageProvider`, `useLanguage`, `renderHook`, `act`
  - Test: "provides default English language" - renderHook with LanguageProvider wrapper, expect `result.current.lang` to be 'en'
  - Test: "accepts defaultLang prop" - renderHook with `defaultLang="ja"`, expect 'ja'
  - Test: "changes language via setLang" - renderHook, act on `setLang('zh-TW')`, expect 'zh-TW'
  - Test: "invokes onChange callback" - mock onChange, renderHook with onChange, call setLang, expect callback called with new lang
  - Test: "renders wrapper div with lang attribute" - render component with LanguageProvider, query DOM, expect lang="ja" and className="lang-ja"
  - Test: "useLanguage throws in development without provider" - set NODE_ENV='development', expect hook to throw error with setup instructions
  - Test: "useLanguage returns fallback in production without provider" - set NODE_ENV='production', expect hook to return { lang: 'en', setLang: [function] }

  **Purpose**: Ensure context provider and hook work correctly with state management and error handling

  _Requirements: FR-1.1, FR-1.3, FR-1.4, FR-1.5, FR-2.1, FR-2.2, FR-2.3, FR-2.4, FR-8.1, FR-8.2, FR-8.4_
  _Leverage: React Testing Library, existing test patterns_

- [ ] **25. Write integration tests for CSS font inheritance**

  **Files**: `src/components/typography/__tests__/multilingual-integration.test.tsx` (create new)

  **Implementation**:
  - Setup: Import testing utilities, `LanguageProvider`, `Heading`, `Text`, `Paragraph`
  - Test: "Typography components inherit fonts from LanguageProvider (ja)" - render typography components in LanguageProvider with ja, verify wrapper has lang="ja", verify CSS inheritance
  - Test: "Typography components inherit fonts from LanguageProvider (zh-TW)" - similar test for Traditional Chinese
  - Test: "Typography components work without LanguageProvider" - render components standalone, expect default English fonts via CSS
  - Test: "No hydration errors with SSR" - use `renderToString` + `hydrateRoot`, expect no throw
  - Test: "LanguageProvider wrapper has correct lang attribute" - verify wrapper div has lang attribute matching current language

  **Purpose**: Verify typography components correctly inherit language-specific fonts via CSS from LanguageProvider wrapper

  _Requirements: FR-6.1, FR-6.2, FR-6.3, US-1, US-2, NFR-2.1, NFR-2.4, TC-4.1_
  _Leverage: React Testing Library, SSR testing utilities_

- [ ] **26. Write CSS font switching tests**

  **Files**: `src/styles/__tests__/font-switching.test.ts` (create new, including directory)

  **Implementation**:
  - Setup: Import JSDOM or similar, create test harness for CSS custom property evaluation
  - Test: "English lang attribute applies --font-en" - create element with lang="en", compute styles, expect font-family contains 'Inter'
  - Test: "Japanese lang attribute applies --font-ja" - create element with lang="ja", expect font-family contains 'Hiragino Sans' or 'Noto Sans JP'
  - Test: "Traditional Chinese lang attribute applies --font-zh-tw" - create element with lang="zh-TW", expect font-family contains 'Microsoft JhengHei' or 'Noto Sans TC'
  - Test: "Default font is English" - element without lang attribute, expect --font-en
  - Test: "Language-specific line-heights applied" - verify --line-height-base changes based on lang attribute
  - Test: "Nested lang overrides parent" - parent lang="ja", child lang="en", child gets English fonts

  **Purpose**: Verify CSS custom property system correctly switches fonts based on lang attribute

  _Requirements: FR-3.1, FR-3.2, FR-3.3, FR-3.4, FR-3.5, FR-7.1, FR-7.2, US-5, US-8_
  _Leverage: CSS custom property testing patterns, computed style verification_

- [ ] **27. Write Storybook accessibility tests**

  **Files**: `src/components/typography/Multilingual/__tests__/accessibility.test.tsx` (create new)

  **Implementation**:
  - Setup: Import Storybook testing utilities, axe-core for accessibility testing, story components
  - Test: "Language Switcher story has no accessibility violations" - render LanguageSwitcher story, run axe audit, expect 0 violations
  - Test: "Japanese story has correct lang attributes" - render Japanese story, query all typography elements, expect lang="ja" on each
  - Test: "ARIA live region announces language changes" - render LanguageSwitcher, change language, query `[role="status"]`, expect language name present
  - Test: "Keyboard navigation works in language switcher" - render LanguageSwitcher, simulate keyboard Tab and Enter, expect language changes
  - Test: "Screen reader compatibility" - verify lang attributes correctly set for screen reader language detection

  **Purpose**: Ensure accessibility compliance and proper screen reader support

  _Requirements: NFR-3.1, NFR-3.2, NFR-3.3, NFR-3.4, US-7_
  _Leverage: axe-core, Storybook testing utilities, existing accessibility test patterns_

---

## Post-Implementation Validation

After completing all tasks, verify:

1. **Functional Validation**
   - [ ] All Storybook stories render without errors
   - [ ] Language switching works smoothly in Language Switcher story
   - [ ] Component-level lang overrides function correctly
   - [ ] Typography components work both with and without LanguageProvider

2. **Performance Validation**
   - [ ] Total font bundle size <= 600KB (verify with `ls -lh src/fonts/`)
   - [ ] System fonts load instantly (0ms in DevTools Network tab)
   - [ ] Web fonts load progressively without blocking (font-display: swap working)
   - [ ] Language switching causes < 100ms reflow (measure with DevTools Performance)

3. **SSR Safety Validation**
   - [ ] No hydration errors in Next.js test app (if available)
   - [ ] Server and client HTML match exactly (inspect rendered output)

4. **Build Validation**
   - [ ] `npm run build` succeeds with no errors
   - [ ] Font files present in `dist/fonts/` directory
   - [ ] TypeScript types generated correctly in `dist/`
   - [ ] Tree-shaking works: build without importing i18n has no i18n code

5. **Test Coverage Validation**
   - [ ] All unit tests pass: `npm test`
   - [ ] Integration tests pass
   - [ ] Test coverage >= 80% for i18n code

---

## Task Execution Notes

**Recommended Order**: Follow tasks sequentially 1-27 for optimal dependency management.

**Parallel Opportunities**:
- Tasks 7-9 (Typography integration) can be done in parallel after tasks 1-6
- Tasks 14-15 (Font subsetting) can be done in parallel
- Tasks 17-21 (Storybook stories) can be done in parallel after task 16
- Tasks 24-27 (Testing) can be done in parallel after task 22

**Critical Path**: Tasks 1-6 → 10-11 → 12-13 → 16 → 22 are sequential and blocking.

**Font Subsetting Note**: Tasks 14-15 require pyftsubset tool. Install with: `pip install fonttools brotli`

**Validation Checkpoints**:
- After task 6: Verify i18n module compiles with no TypeScript errors
- After task 13: Verify styles compile and fonts.css is imported correctly
- After task 16: Verify `npm run build` includes fonts in dist
- After task 22: Verify library exports i18n APIs correctly
- After task 27: Run full test suite and ensure all tests pass

---

**Document Version**: 1.0
**Total Tasks**: 27 atomic tasks
**Estimated Total Time**: 6.5-13.5 hours (15-30 min per task)
**Status**: Ready for Implementation
**Next Phase**: Task Execution via `/spec-execute` or generated task commands
