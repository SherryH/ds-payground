# Requirements: Multilingual Typography

## Overview

Enable the design system component library to support English, Japanese, and Traditional Chinese typography with proper font rendering, while maintaining SSR safety, zero-config defaults, and framework independence.

### Alignment with Product Vision

This multilingual typography feature represents a strategic investment in global market accessibility and positions the design system as a comprehensive solution for international product development.

**Strategic Value:**
- **Global Market Enablement**: Expands the design system's addressable market to Asia-Pacific regions where Japanese and Traditional Chinese are primary languages, supporting enterprise clients with international user bases
- **Competitive Differentiation**: Most design systems offer basic i18n support but lack proper CJK typography handling; this feature provides production-ready multilingual typography out-of-the-box
- **Foundation for Future i18n**: Establishes architectural patterns (Context API, CSS custom properties, SSR-safe implementation) that enable future expansion to Korean, Simplified Chinese, and RTL languages with minimal refactoring

**Design System Principles:**
- **Zero-Config Philosophy**: Typography components work immediately with sensible English defaults, while providing opt-in multilingual capabilities through `LanguageProvider`
- **Accessibility-First**: Proper `lang` attributes ensure screen readers correctly pronounce content in any supported language
- **Performance by Design**: System font fallbacks ensure instant rendering (0ms), with web fonts loaded progressively as enhancement
- **Framework Independence**: Pure React implementation works across Next.js, Remix, Vite, and any React 18+ environment without framework-specific code

This feature transforms the design system from English-only to genuinely international, enabling clients to build products for global audiences without typography compromises.

---

## 1. User Stories

### US-1: Language Provider Setup
**As a** design system consumer
**I want** to wrap my application with a `<LanguageProvider>`
**So that** all typography components automatically use language-appropriate fonts

**Acceptance Criteria:**
- WHEN consumer wraps app with `<LanguageProvider defaultLang="ja">`
- THEN all typography components (Heading, Text, Paragraph) render with Japanese fonts
- AND the provider is SSR-safe (no hydration errors in Next.js/Remix)
- AND the provider renders a wrapper div with `lang` attribute for accessibility

### US-2: Standalone Component Usage with Warnings
**As a** developer
**I want** typography components to work without `<LanguageProvider>`
**So that** I can use them immediately, but receive clear guidance to add the provider

**Acceptance Criteria:**
- WHEN typography components render without `<LanguageProvider>`
- THEN they fall back to English fonts (default behavior)
- AND in development mode, a console warning appears with setup instructions
- AND the warning includes a documentation link
- AND production builds have no performance impact

### US-3: Language Switching
**As a** design system consumer
**I want** to dynamically change the active language
**So that** users can switch languages at runtime

**Acceptance Criteria:**
- WHEN consumer calls `setLang('ja')` from `useLanguage()` hook
- THEN all typography components immediately re-render with Japanese fonts
- AND the change happens without layout shift (font-display: swap)
- AND screen readers are notified via `lang` attribute update

### ~~US-4: Component-Level Language Override~~ [OUT OF SCOPE]
**Status**: Deferred to future release

**Rationale**: Component-level language overrides add complexity and redundant HTML attributes. The `lang` attribute from `LanguageProvider` is sufficient for CSS inheritance. This feature will be added only if specific use cases emerge requiring mixed languages on the same page.

**Original Requirement** (for reference):
- ~~Allow `<Heading lang="en">` prop to override context language~~
- ~~Individual components can use different languages on same page~~

### US-5: System Fonts with Noto Fallback
**As a** design system consumer
**I want** fonts to load instantly using system fonts
**So that** my application has fast initial render and no font flash

**Acceptance Criteria:**
- WHEN user's device has Hiragino Sans (macOS) or Yu Gothic (Windows)
- THEN Japanese text uses system fonts immediately (0ms load time)
- AND when system fonts are unavailable, Noto Sans JP loads from bundle
- AND the fallback happens smoothly with `font-display: swap`
- AND total bundle size increase is < 600KB (all languages combined)

### US-6: Optional HTML Lang Sync
**As a** design system consumer
**I want** to optionally sync language changes to `<html lang>`
**So that** I can maintain SEO and accessibility best practices

**Acceptance Criteria:**
- WHEN consumer provides `onChange` callback to `<LanguageProvider>`
- THEN the callback is invoked with new language on every change
- AND consumer can manually update `document.documentElement.lang`
- AND this is optional (provider works without callback)
- AND no hydration errors occur in SSR environments

### US-7: Storybook Language Demos
**As a** design system developer
**I want** comprehensive Storybook examples for each language
**So that** I can verify typography rendering and consumers can see usage examples

**Acceptance Criteria:**
- WHEN viewing Storybook "Typography/Multilingual" section
- THEN I see separate stories for Japanese, Traditional Chinese, and English
- AND each story demonstrates Heading, Text, and Paragraph components
- AND Japanese demo includes Hiragana, Katakana, Kanji, English names, numbers
- AND Traditional Chinese demo includes traditional characters with proper fonts
- AND a Language Switcher story demonstrates runtime language switching

### US-8: Language-Specific Typography Adjustments
**As a** design system consumer
**I want** line-height and letter-spacing optimized per language
**So that** each language has optimal readability

**Acceptance Criteria:**
- WHEN rendering Japanese or Chinese text
- THEN line-height increases to 1.7-1.9 (vs 1.5 for English)
- AND consumers can override with custom CSS variables
- AND the adjustments are documented in Storybook

---

## 2. Functional Requirements

### FR-1: Language Context System
- **FR-1.1**: Implement `LanguageContext` using React Context API
- **FR-1.2**: Support languages: `'en'` | `'ja'` | `'zh-TW'`
- **FR-1.3**: Provide `useLanguage()` hook returning `{ lang, setLang }`
- **FR-1.4**: Default language is `'en'` if not specified
- **FR-1.5**: Throw error if `useLanguage()` used outside provider (development mode)

### FR-2: LanguageProvider Component
- **FR-2.1**: Accept props: `children`, `defaultLang`, `onChange`
- **FR-2.2**: Render wrapper `<div>` with `lang={currentLang}` attribute
- ~~**FR-2.3**: Apply CSS class `lang-${currentLang}` for styling~~ [REMOVED - Not needed, attribute selector is sufficient]
- **FR-2.3**: Invoke `onChange(newLang)` callback when language changes
- **FR-2.4**: No hydration errors in SSR environments (Next.js, Remix)

### FR-3: CSS Font Stack Configuration
- **FR-3.1**: Define CSS custom properties in `tokens.css`:
  - `--font-en`: Inter → system-ui → sans-serif
  - `--font-ja`: Hiragino Sans → Yu Gothic → Noto Sans JP → sans-serif
  - `--font-zh-tw`: Microsoft JhengHei → PingFang TC → Noto Sans TC → sans-serif
- **FR-3.2**: Add `[lang="ja"]` selector setting `--font-sans: var(--font-ja)`
- **FR-3.3**: Add `[lang="zh-TW"]` selector setting `--font-sans: var(--font-zh-tw)`
- **FR-3.4**: Add `[lang="en"]` selector setting `--font-sans: var(--font-en)`
- **FR-3.5**: Default `--font-sans` to `var(--font-en)` in `:root`

### FR-4: Tailwind Plugin (Optional Enhancement)
- **FR-4.1**: Add Tailwind plugin providing language variants
- **FR-4.2**: Variants: `lang-en:*`, `lang-ja:*`, `lang-zh-tw:*`
- **FR-4.3**: Example usage: `<div className="lang-ja:font-japanese">`
- **FR-4.4**: Plugin coexists with CSS custom properties

### FR-5: Font File Bundling
- **FR-5.1**: Bundle Noto Sans JP (Japanese) subset (~200KB)
- **FR-5.2**: Bundle Noto Sans TC (Traditional Chinese) subset (~200KB)
- **FR-5.3**: Use `@font-face` with `font-display: swap`
- **FR-5.4**: Subset fonts to common CJK characters (U+3000-30FF, U+4E00-9FAF)
- **FR-5.5**: Configure Vite to copy font files to dist

### FR-6: Typography Component Integration
- **FR-6.1**: Typography components inherit language from `LanguageProvider` via CSS
- ~~**FR-6.2**: Add optional `lang` prop to components for component-level override~~ [OUT OF SCOPE]
- ~~**FR-6.3**: Apply `lang` attribute to rendered HTML element~~ [OUT OF SCOPE - Handled by LanguageProvider wrapper]
- **FR-6.2**: Typography components work without explicit language detection (CSS inheritance sufficient)
- **FR-6.3**: Components remain unchanged - no need to import `useLanguage()` hook

### FR-7: Language-Specific Typography Adjustments
- **FR-7.1**: Add CSS custom properties for line-height:
  - `--line-height-en: 1.5`
  - `--line-height-ja: 1.8`
  - `--line-height-zh-tw: 1.8`
- **FR-7.2**: Typography components inherit language-specific line-height
- **FR-7.3**: Allow consumer override via custom CSS variables

### FR-8: Development Warnings
- **FR-8.1**: Typography components detect missing `LanguageProvider` context
- **FR-8.2**: Log console warning in development mode only
- **FR-8.3**: Warning message includes:
  - Component name
  - Setup instructions
  - Documentation link
- **FR-8.4**: No warnings in production builds

### FR-9: Storybook Demos
- **FR-9.1**: Create folder `src/components/typography/Multilingual/`
- **FR-9.2**: Create `Japanese.stories.tsx` with all typography components
- **FR-9.3**: Japanese demo text includes:
  - Hiragana sample
  - Katakana sample
  - Kanji sample
  - English names (e.g., "John Smith")
  - Numbers and currency (e.g., "¥12,345")
- **FR-9.4**: Create `TraditionalChinese.stories.tsx` with all typography components
- **FR-9.5**: Create `English.stories.tsx` with all typography components
- **FR-9.6**: Create `LanguageSwitcher.stories.tsx` demonstrating runtime switching
- **FR-9.7**: Use Shadcn Dropdown component for language switcher UI
- **FR-9.8**: Each story file contains Heading, Text, and Paragraph examples

### FR-10: Library Exports
- **FR-10.1**: Export `LanguageProvider` from `src/index.ts`
- **FR-10.2**: Export `useLanguage` hook from `src/index.ts`
- **FR-10.3**: Export `Language` type from `src/index.ts`
- **FR-10.4**: Export `LanguageContextValue` type from `src/index.ts`
- **FR-10.5**: All exports in single entry point (no separate i18n path)

---

## 3. Non-Functional Requirements

### NFR-1: Performance
- **NFR-1.1**: Initial render uses system fonts (0ms font load time)
- **NFR-1.2**: Noto font loading does not block rendering (font-display: swap)
- **NFR-1.3**: Total bundle size increase < 600KB (all language fonts combined)
- **NFR-1.4**: Language switching causes < 100ms reflow time
- **NFR-1.5**: Tree-shaking removes unused i18n code if not imported

### NFR-2: SSR Safety
- **NFR-2.1**: No hydration errors in Next.js App Router
- **NFR-2.2**: No hydration errors in Next.js Pages Router
- **NFR-2.3**: No hydration errors in Remix
- **NFR-2.4**: Server and client render identical HTML for same props

### NFR-3: Accessibility
- **NFR-3.1**: `lang` attribute present on `LanguageProvider` wrapper (inherited by typography components)
- **NFR-3.2**: Screen readers correctly identify language for pronunciation
- **NFR-3.3**: Language changes announced to screen readers
- **NFR-3.4**: Keyboard navigation works with language switcher

### NFR-4: Browser Support
- **NFR-4.1**: Works in Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **NFR-4.2**: CSS custom properties supported (all modern browsers)
- **NFR-4.3**: Graceful degradation to system fonts if Noto fails to load

### NFR-5: Framework Compatibility
- **NFR-5.1**: Works with React 18+
- **NFR-5.2**: Compatible with Next.js 13+ (App Router and Pages Router)
- **NFR-5.3**: Compatible with Remix 1.x+
- **NFR-5.4**: Compatible with Vite 4+
- **NFR-5.5**: No framework-specific code (pure React)

### NFR-6: Developer Experience
- **NFR-6.1**: TypeScript types exported for all APIs
- **NFR-6.2**: JSDoc comments with usage examples
- **NFR-6.3**: Clear console warnings in development mode
- **NFR-6.4**: Storybook documentation with setup guide
- **NFR-6.5**: Zero-config for basic usage (defaults to English)

### NFR-7: Maintainability
- **NFR-7.1**: All i18n code in `src/lib/i18n/` directory
- **NFR-7.2**: Reusable types in `src/lib/i18n/types.ts`
- **NFR-7.3**: Font configurations centralized in `tokens.css`
- **NFR-7.4**: Language constants in single source of truth

---

## 4. Technical Constraints

### TC-1: Technology Stack
- **TC-1.1**: Must use React 18+ Context API (no Redux or external state)
- **TC-1.2**: Must use CSS custom properties (no CSS-in-JS required)
- **TC-1.3**: Must integrate with existing Tailwind CSS setup
- **TC-1.4**: Must work with existing CVA (class-variance-authority) pattern

### TC-2: Bundle Size
- **TC-2.1**: Total font files < 600KB (compressed)
- **TC-2.2**: JavaScript code for i18n < 10KB (minified)
- **TC-2.3**: No additional runtime dependencies

### TC-3: Build System
- **TC-3.1**: Must build with existing Vite configuration
- **TC-3.2**: Font files must be copied to `dist/fonts/`
- **TC-3.3**: Types must be generated for all exported APIs

### TC-4: Backward Compatibility
- **TC-4.1**: Existing typography components continue working unchanged
- **TC-4.2**: No breaking changes to current API
- **TC-4.3**: `LanguageProvider` is additive (optional enhancement)

---

## 5. Out of Scope (Future Considerations)

### OS-1: Component-Level Language Override
**Status**: Deferred to future release
- Add optional `lang` prop to individual typography components
- Allow mixing multiple languages on the same page
- Component-level `lang` attribute override
- Development warnings for components used outside provider

**Rationale**: Not needed for initial release. CSS inheritance from `LanguageProvider` wrapper is sufficient. Will add if specific use cases emerge.

### OS-2: Additional Languages
- Korean, Simplified Chinese (future languages)
- RTL languages (Arabic, Hebrew)

### OS-3: Font Weight Variations
- Language-specific font weight mappings
- Variable font support

### OS-4: Font Subsetting Automation
- CLI tool for automatic font subsetting
- Dynamic font loading based on page content

### OS-5: Advanced Features
- Automatic language detection from browser settings
- Font loading performance metrics
- A/B testing different font stacks

---

## 6. Acceptance Criteria Summary

### Must Have (P0)
- ✅ `LanguageProvider` component with `en`, `ja`, `zh-TW` support
- ✅ `useLanguage()` hook for language state management
- ✅ CSS custom properties for font-family switching
- ✅ System fonts with Noto fallback bundled
- ✅ Typography components inherit language via CSS (no component changes needed)
- ~~✅ Component-level `lang` prop override~~ [OUT OF SCOPE - Deferred]
- ~~✅ Development mode warnings for missing provider~~ [OUT OF SCOPE - Not needed without component integration]
- ✅ SSR-safe implementation (no hydration errors)
- ✅ Storybook demos for all three languages
- ✅ Language switcher demo story

### Should Have (P1)
- ✅ Language-specific line-height adjustments
- ✅ Tailwind plugin for language variants
- ✅ Optional `onChange` callback for HTML sync
- ✅ TypeScript types and JSDoc comments
- ✅ Shadcn Dropdown in language switcher demo

### Nice to Have (P2)
- ⚠️ Font subsetting script (manual for now)
- ⚠️ Performance metrics dashboard
- ⚠️ Additional demo stories (side-by-side comparisons)

---

## 7. Success Metrics

### Functional Success
- All user stories pass acceptance criteria
- Zero hydration errors in Next.js test app
- All Storybook stories render correctly
- Type checking passes with no errors

### Performance Success
- Initial render: 0ms font load (system fonts)
- Language switch: < 100ms reflow
- Bundle size: < 600KB total font files
- Lighthouse score: No performance regression

### Quality Success
- WCAG 2.1 AA compliance (lang attributes)
- Screen reader testing passes
- Cross-browser testing passes
- Unit test coverage > 80%

### Testing Requirements
- **Unit Tests**: Context provider state management, hook behavior, language switching logic
- **Integration Tests**: CSS font-family application via `lang` attribute, font inheritance in typography components
- **SSR Tests**: Next.js App Router hydration, Next.js Pages Router hydration, Remix SSR validation
- **Visual Regression**: Storybook Chromatic snapshots for each language (Japanese, Traditional Chinese, English)
- **Accessibility Tests**: NVDA screen reader language announcement, JAWS pronunciation validation, keyboard navigation in language switcher
- **Performance Tests**: Font loading waterfall analysis, language switching reflow measurement, bundle size tracking in CI/CD
- **Cross-Browser Tests**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ font rendering validation

---

## 8. Dependencies

### Internal Dependencies
- Existing typography components (Heading, Text, Paragraph)
- Existing tokens.css and CSS variable system
- Existing Tailwind configuration
- Existing Storybook setup

### External Dependencies
- React 18+ (peer dependency)
- Noto Sans JP font files (bundled)
- Noto Sans TC font files (bundled)
- Shadcn Dropdown component (dev dependency for demo)

---

## 9. Risk Assessment

### Risk 1: Font File Size Exceeds Budget
**Impact**: High | **Probability**: Medium
**Quantitative Impact**: If fonts exceed 600KB budget by 200KB (800KB total), this causes:
- ~400ms additional First Contentful Paint (FCP) delay on 3G networks (P75)
- ~150ms delay on 4G networks (P75)
- Potential failure of performance budgets in CI/CD pipelines
- Consumer complaints about bundle size bloat

**Mitigation**:
- Use pyftsubset or glyphhanger to reduce Noto Sans JP from 5MB → 200KB
- Subset to common CJK characters (U+3000-30FF, U+4E00-9FAF)
- Monitor bundle size in CI/CD with automated alerts at 550KB threshold
- Test font loading performance with WebPageTest on 3G Fast profile

### Risk 2: SSR Hydration Mismatch
**Impact**: High | **Probability**: Low
**Quantitative Impact**: Hydration errors affect estimated 40% of consumer base using Next.js 13+:
- React throws error: "Text content does not match server-rendered HTML"
- Forces client-side re-render, negating SSR performance benefits
- Causes flash of incorrect content (FOIC)
- Damages trust in design system reliability

**Mitigation**:
- Use JSX wrapper approach rendering `<div lang={lang}>` (inherently SSR-safe)
- No client-only code (useEffect for DOM manipulation)
- Comprehensive SSR testing: Next.js App Router, Pages Router, Remix
- Automated hydration validation in CI/CD using Playwright

### Risk 3: Browser Font Availability Varies
**Impact**: Medium | **Probability**: Low
**Quantitative Impact**:
- ~15% of Windows users lack Yu Gothic (fallback to MS Gothic, poor rendering)
- ~5% of macOS users on older versions lack Hiragino Sans
- Results in inconsistent visual appearance across platforms
- Customer support burden from "fonts look wrong" reports

**Mitigation**:
- Bundle Noto Sans JP/TC as universal fallback (works on all platforms)
- Use font-display: swap to show system font immediately during Noto load
- Comprehensive browser testing matrix: Windows 10/11, macOS 11+, Linux
- Visual regression testing in Storybook Chromatic across OS platforms

### Risk 4: Consumer Adoption Confusion
**Impact**: Medium | **Probability**: Medium
**Quantitative Impact**:
- Estimated 30% of consumers initially use typography without LanguageProvider
- Results in English fonts for all languages (poor CJK rendering)
- Increases support ticket volume by ~20 tickets/month
- Delays project timelines while consumers debug setup

**Mitigation**:
- Development-mode console warnings with clear setup instructions
- Comprehensive Storybook documentation with copy-paste examples
- JSDoc hints in IDE autocomplete
- Beta testing with 3 internal teams before public release to gather feedback

### Risk 5: Font Loading Race Conditions (NEW)
**Impact**: Medium | **Probability**: Medium
**Quantitative Impact**:
- Noto fonts may load mid-user-interaction (e.g., during form filling)
- Causes layout shift of ~50-100px (CLS score degradation)
- Text reflow interrupts reading flow, poor UX
- Affects ~10% of users on slow connections (3G, throttled WiFi)

**Mitigation**:
- Use font-display: swap to prevent invisible text
- Preload critical font files with `<link rel="preload">`
- Set 5-second font loading timeout, fallback to system fonts
- Monitor Core Web Vitals CLS metric, alert if > 0.1

---

## 10. Open Questions (To Be Resolved)

1. ~~Should LanguageProvider be required or optional?~~ **RESOLVED**: Optional with dev warnings
2. ~~Which CSS approach to use?~~ **RESOLVED**: Hybrid (CSS custom props + Tailwind plugin)
3. ~~How to handle font loading?~~ **RESOLVED**: System fonts + bundled Noto fallback
4. ~~How to make usage obvious?~~ **RESOLVED**: Dev console warnings + Storybook docs
5. **Font subsetting process**: Manual or automated? (Defer to implementation phase)
6. **Font loading analytics**: Should we track font load performance? (Defer to future)

---

**Document Version**: 1.0
**Last Updated**: 2025-11-03
**Status**: ✅ Ready for Design Phase
**Next Phase**: Design Document Creation
