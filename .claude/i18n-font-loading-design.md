# Multi-Language Font Loading Design

## Overview

Design document for implementing internationalization (i18n) font loading in the design system component library, supporting English, Japanese, and Traditional Chinese.

---

## Requirements

### Supported Languages
- **English (en)** - Primary language
- **Japanese (ja)** - Hiragino Sans, Yu Gothic, Noto Sans CJK JP
- **Traditional Chinese (zh-TW)** - Microsoft JhengHei (Windows), PingFang TC (macOS), Noto Sans CJK TC

### Constraints
- Must be SSR-safe (Next.js, Remix compatibility)
- Component library (doesn't own host application)
- Zero-config for consumers (pit-of-success design)
- Accessible (screen reader support)
- Performant (no layout shifts)

---

## Design Approaches Analyzed

### Approach 1: Dynamic `lang` Attribute Switching

**Implementation:**
```javascript
// Update <html lang> dynamically
document.documentElement.lang = userSelectedLanguage;
```

**Pros:**
- ✅ Semantic HTML compliance (W3C standard)
- ✅ Accessibility (screen readers use for pronunciation)
- ✅ SEO benefits
- ✅ Browser feature alignment (spell-check, hyphenation)
- ✅ Simple CSS targeting with attribute selectors

**Cons:**
- ❌ Global scope limitation (only one `lang` per document)
- ❌ Component library constraint (invasive for consumers)
- ❌ SSR hydration issues (server/client mismatch)
- ❌ Testing complexity in Storybook
- ❌ Third-party conflicts with i18n libraries
- ❌ Runtime performance (can trigger reflow)

**Verdict:** ⚠️ Not recommended as primary strategy for component libraries

---

### Approach 2: CSS Class-Based Font Switching

**Implementation:**
```tsx
// Apply class to HTML element
document.documentElement.classList.add(`lang-${lang}`);
```

```css
html.lang-en { --font-sans: var(--font-en); }
html.lang-ja { --font-sans: var(--font-ja); }
html.lang-zh-tw { --font-sans: var(--font-zh-tw); }
```

**Pros:**
- ✅ Component-level control (mix languages on same page)
- ✅ Library-friendly (doesn't hijack global state)
- ✅ Framework agnostic
- ✅ Performance (CSS class changes are fast)
- ✅ Testing & Storybook friendly
- ✅ Progressive enhancement
- ✅ CSS-in-JS compatible
- ✅ Industry adoption (MUI, Ant Design, Chakra UI)

**Cons:**
- ❌ Extra class management overhead
- ❌ CSS duplication (minimal)
- ❌ Must remember to update both class AND `lang` for accessibility
- ❌ State management complexity

**Verdict:** ✅ Strong candidate, industry-proven pattern

---

### Approach 3: JSX `lang` Wrapper (Recommended)

**Implementation:**
```tsx
<LanguageContext.Provider value={{ lang, setLang }}>
  <div lang={lang} className={`lang-${lang}`}>
    {children}
  </div>
</LanguageContext.Provider>
```

**Pros:**
- ✅ **SSR-safe by default** (no hydration errors)
- ✅ **Framework agnostic** (works in Next.js, Remix, Gatsby)
- ✅ **Scoped, not global** (doesn't touch `<html>`)
- ✅ **Testable** (pure React, no DOM manipulation)
- ✅ **Accessibility** (`lang` on ancestor helps screen readers)
- ✅ **Zero-config** (works out of the box)

**Cons:**
- ⚠️ Adds wrapper `<div>` to DOM (minimal impact)
- ⚠️ Consumer must wrap app in `<LanguageProvider>`

**Verdict:** ⭐⭐⭐⭐⭐ **RECOMMENDED** - Best balance of all criteria

---

## Recommended Architecture

### Primary Strategy: Hybrid Approach

Combine JSX `lang` wrapper with CSS classes and optional callback:

```tsx
// LanguageProvider.tsx
export function LanguageProvider({
  children,
  defaultLang = 'en',
  onChange // Optional: consumer can sync to <html>
}: LanguageProviderProps) {
  const [lang, setLangState] = useState<Language>(defaultLang);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    onChange?.(newLang); // Notify consumer
  }, [onChange]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {/* Apply lang attribute via JSX (SSR-safe) */}
      <div lang={lang} className={`lang-${lang}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}
```

### CSS Strategy

```css
/* tokens.css - Define font stacks */
:root {
  /* English */
  --font-en: 'Inter', system-ui, -apple-system, sans-serif;

  /* Japanese */
  --font-ja: 'Hiragino Sans', 'Hiragino Kaku Gothic Pro',
             'Yu Gothic', 'Noto Sans CJK JP', sans-serif;

  /* Traditional Chinese */
  --font-zh-tw: 'Microsoft JhengHei', 'PingFang TC',
                'Noto Sans CJK TC', sans-serif;

  /* Default */
  --font-sans: var(--font-en);
}

/* Language-specific font switching via inheritance */
[lang="en"] {
  --font-sans: var(--font-en);
}

[lang="ja"] {
  --font-sans: var(--font-ja);
}

[lang="zh-TW"] {
  --font-sans: var(--font-zh-tw);
}

/* Typography inherits from --font-sans */
.font-sans {
  font-family: var(--font-sans);
}
```

---

## Implementation Plan

### Phase 1: Core Infrastructure

#### 1.1 Language Types & Constants
```typescript
// src/lib/i18n/types.ts
export const SUPPORTED_LANGUAGES = ['en', 'ja', 'zh-TW'] as const;
export type Language = typeof SUPPORTED_LANGUAGES[number];

export interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
}
```

#### 1.2 Language Context
```typescript
// src/lib/i18n/LanguageContext.tsx
export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
```

#### 1.3 Language Provider
```typescript
// src/lib/i18n/LanguageProvider.tsx
export interface LanguageProviderProps {
  children: ReactNode;
  defaultLang?: Language;
  onChange?: (lang: Language) => void;
}

export function LanguageProvider({
  children,
  defaultLang = 'en',
  onChange
}: LanguageProviderProps) {
  // Implementation as shown above
}
```

---

### Phase 2: Font Definitions

#### 2.1 Update tokens.css
Add language-specific font stacks:
- English: Inter + system fonts
- Japanese: Hiragino Sans → Yu Gothic → Noto Sans CJK JP
- Traditional Chinese: Microsoft JhengHei → PingFang TC → Noto Sans CJK TC

#### 2.2 Add Font Loading Strategy
Consider:
- Variable fonts (Noto Sans Variable supports EN, JA, ZH)
- Font subsetting for CJK (reduce bundle size)
- `font-display: swap` to avoid FOIT

---

### Phase 3: Component Updates

#### 3.1 Typography Components
Update `Heading`, `Text`, `Paragraph` to support language context:
- Optional `lang` prop for component-level overrides
- Automatic font-family from context
- CVA variants for language-specific styling (if needed)

#### 3.2 Export i18n Utilities
```typescript
// src/index.ts
export { LanguageProvider, useLanguage } from './lib/i18n';
export type { Language, LanguageContextValue } from './lib/i18n/types';
```

---

### Phase 4: Documentation & Examples

#### 4.1 Storybook Stories
- Multi-language examples for all typography components
- Language switcher decorator
- Side-by-side comparison stories

#### 4.2 README Updates
- Installation guide
- Basic usage example
- Next.js integration example
- Optional `<html>` sync pattern

#### 4.3 Consumer Guidelines
```tsx
// Example: Next.js App Router
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider defaultLang="en">
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

// Optional: Sync to <html> for SEO
<LanguageProvider
  onChange={(lang) => {
    document.documentElement.lang = lang;
  }}
>
```

---

## Additional Recommendations

### 1. Font Loading Strategy

**Option A: Variable Fonts**
```css
@font-face {
  font-family: 'Noto Sans Variable';
  src: url('/fonts/NotoSans-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
}

[lang="ja"] {
  font-feature-settings: 'jp04' 1; /* Japanese glyphs */
}
```

**Benefits:**
- Single font file (smaller bundle)
- Language-specific glyphs via OpenType features
- Better performance

### 2. Font Subsetting

CJK fonts are large (5-15MB). Use subsetting:
```bash
# Subset for common characters
pyftsubset NotoSansCJK.otf \
  --unicodes="U+4E00-9FFF,U+3040-309F,U+30A0-30FF" \
  --output-file="NotoSansCJK-subset.woff2"
```

### 3. Progressive Font Loading

```css
@font-face {
  font-family: 'Noto Sans JP';
  src: url('/fonts/NotoSansJP.woff2') format('woff2');
  font-display: swap; /* Show fallback immediately */
}
```

### 4. Tailwind Plugin for Language Variants

```javascript
// tailwind.config.ts
module.exports = {
  plugins: [
    function({ addVariant }) {
      addVariant('lang-en', '[lang="en"] &');
      addVariant('lang-ja', '[lang="ja"] &');
      addVariant('lang-zh-tw', '[lang="zh-TW"] &');
    }
  ]
};

// Usage:
<div className="lang-ja:font-japanese lang-en:font-inter">
  Hello / こんにちは
</div>
```

---

## Decision Matrix

| Criteria | `lang` Attribute Only | CSS Classes Only | Hybrid (JSX + Callback) |
|----------|---------------------|-----------------|-------------------------|
| **Accessibility** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **SEO** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **SSR Safety** | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Flexibility** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Library Use** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Performance** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Simplicity** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Testing** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**Winner:** Hybrid Approach (JSX wrapper + CSS classes + optional callback)

---

## Success Criteria

- ✅ Zero hydration errors in Next.js/Remix
- ✅ Works without configuration (zero-config)
- ✅ Screen readers correctly announce language
- ✅ No flash of unstyled text (FOUT)
- ✅ Component-level language overrides work
- ✅ TypeScript provides full type safety
- ✅ Storybook demonstrates all languages
- ✅ Bundle size impact < 50KB (with subsetting)

---

## References

- [W3C HTML `lang` Attribute Spec](https://www.w3.org/International/questions/qa-html-language-declarations)
- [MDN: `lang` Global Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
- [Material-UI i18n Approach](https://mui.com/material-ui/guides/localization/)
- [Next.js i18n Routing](https://nextjs.org/docs/advanced-features/i18n-routing)
- [Google Fonts Variable Fonts](https://fonts.google.com/variablefonts)
- [WCAG Language of Page (3.1.1)](https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html)

---

## Open Questions

1. Should we include web font files in the library bundle, or let consumers load them?
2. Do we need RTL (right-to-left) support for future languages?
3. Should we provide a CLI tool for font subsetting automation?
4. Do we want to support font weight/style variations per language?

---

## Next Steps

1. Create implementation specification document
2. Break down into atomic tasks
3. Set up TypeScript types and interfaces
4. Implement core `LanguageProvider` component
5. Add font definitions to tokens.css
6. Update typography components
7. Create Storybook examples
8. Write consumer documentation
9. Add integration tests
10. Performance benchmarking

---

**Document Status:** ✅ Design Approved
**Last Updated:** 2025-11-03
**Next Phase:** Implementation Specification
