# Design System

A modern, type-safe design system built with React, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

Run Storybook to develop and preview components:

```bash
npm run storybook
```

### Build

Build the library for distribution:

```bash
npm run build
```

This creates:
- `dist/index.mjs` - ESM bundle
- `dist/index.cjs` - CommonJS bundle
- `dist/index.d.ts` - TypeScript declarations
- `dist/styles.css` - Compiled CSS

## 📦 Using in Your Project

### Install the package

```bash
npm install @your-org/design-system
```

### Import styles and components

```tsx
import { Heading, Text, Paragraph } from '@your-org/design-system'
import '@your-org/design-system/dist/styles.css'

function App() {
  return (
    <div>
      <Heading level="h1">Welcome to My App</Heading>
      <Paragraph variant="lead">
        This is an introduction using the design system.
      </Paragraph>
      <Text size="sm" variant="muted">
        Small muted text for additional context
      </Text>
    </div>
  )
}
```

## 📚 Components

### Typography

#### Heading

Semantic heading component with multiple levels and variants.

```tsx
<Heading level="h1">Main Title</Heading>
<Heading level="h2" variant="muted">Subtitle</Heading>

// Override semantic tag while keeping visual style
<Heading as="h1" level="h3">Looks like H3, semantically H1</Heading>
```

**Props:**
- `level`: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' (default: 'h2')
- `variant`: 'default' | 'muted' | 'accent' (default: 'default')
- `as`: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' (optional)

#### Text

Flexible text component for inline or block content.

```tsx
<Text size="lg" weight="bold">Important text</Text>
<Text variant="muted">Secondary information</Text>
<Text as="label" weight="medium">Form Label</Text>
```

**Props:**
- `size`: 'xs' | 'sm' | 'base' | 'lg' | 'xl' (default: 'base')
- `weight`: 'normal' | 'medium' | 'semibold' | 'bold' (default: 'normal')
- `variant`: 'default' | 'muted' | 'error' | 'success' (default: 'default')
- `as`: 'span' | 'p' | 'div' | 'label' (default: 'span')

#### Paragraph

Paragraph component with optimized line height for readability.

```tsx
<Paragraph variant="lead">
  Introduction paragraph with larger text
</Paragraph>
<Paragraph>Regular body text paragraph</Paragraph>
<Paragraph size="sm" variant="muted">
  Fine print or footnotes
</Paragraph>
```

**Props:**
- `size`: 'sm' | 'base' | 'lg' (default: 'base')
- `variant`: 'default' | 'muted' | 'lead' (default: 'default')

## 🎨 Design Tokens

The design system uses CSS variables for theming. You can customize these in your app:

```css
:root {
  /* Typography */
  --font-size-base: 1rem;
  --font-weight-medium: 500;
  --line-height-normal: 1.5;

  /* Colors (HSL) */
  --foreground: 222.2 84% 4.9%;
  --muted-foreground: 215.4 16.3% 46.9%;

  /* ... more tokens */
}
```

## 🛠️ Development Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build the library
- `npm run preview` - Preview the build
- `npm run storybook` - Run Storybook
- `npm run build-storybook` - Build Storybook for deployment
- `npm run lint` - Lint code
- `npm run type-check` - Type check without emitting

## 📝 Publishing

1. Update version in `package.json`
2. Build the library: `npm run build`
3. Publish to npm: `npm publish --access public`

## 🏗️ Architecture

- **Vite** - Fast build tool and dev server
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **class-variance-authority** - Type-safe variant handling
- **shadcn/ui** - Component patterns and conventions
- **Storybook** - Component documentation and development

## 🤝 Contributing

1. Create a new branch
2. Make your changes
3. Add/update stories in Storybook
4. Test your changes
5. Submit a pull request

## 📄 License

MIT
