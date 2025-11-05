import type { Meta, StoryObj } from '@storybook/react'
import { LanguageProvider } from '@/lib/i18n'
import { Heading } from '@/components/typography/Heading'
import { Text } from '@/components/typography/Text'
import { Paragraph } from '@/components/typography/Paragraph'

const meta = {
  title: 'Typography/Multilingual/Traditional Chinese',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Traditional Chinese typography demonstration showcasing proper font rendering and character display for Traditional Chinese text. The Noto Sans TC font ensures authentic and readable Traditional Chinese characters.'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta

export default meta
type Story = StoryObj

export const AllComponents: Story = {
  render: () => (
    <LanguageProvider defaultLang="zh-tw">
      <div className="space-y-8 max-w-4xl">
        {/* Headings Section */}
        <section>
          <div className="mb-6">
            <Text size="sm" variant="muted" className="mb-4 block">
              標題範例 (Heading Examples)
            </Text>
            <div className="space-y-4">
              <Heading level="h1">標題一 (Heading 1)</Heading>
              <Heading level="h2">標題二 (Heading 2)</Heading>
              <Heading level="h3">標題三 (Heading 3)</Heading>
            </div>
          </div>
        </section>

        {/* Paragraph Section */}
        <section>
          <div className="mb-6">
            <Text size="sm" variant="muted" className="mb-4 block">
              段落範例 (Paragraph Examples)
            </Text>
            <div className="space-y-4">
              <Paragraph>
                歡迎使用我們的設計系統。這個設計系統支援多種語言的排版，
                包括繁體中文、日文和英文。
              </Paragraph>
              <Paragraph>
                我們的排版系統經過精心設計，確保在不同語言環境下都能提供最佳的閱讀體驗。
                繁體中文使用 Noto Sans TC 字型，確保字符顯示清晰且符合傳統中文排版規範。
              </Paragraph>
            </div>
          </div>
        </section>

        {/* Mixed Content Section */}
        <section>
          <div className="mb-6">
            <Text size="sm" variant="muted" className="mb-4 block">
              混合內容 (Mixed Content)
            </Text>
            <div className="space-y-4">
              <Paragraph>
                這個設計系統由 Design Team 開發，版本號 v1.0.0。
                它支援 React 18+ 和 TypeScript 5+。
              </Paragraph>
              <Paragraph>
                我們提供了超過 50+ 個組件，包含 Button、Input、Select 等常用元件。
                所有組件都經過嚴格的測試，程式碼覆蓋率達到 95% 以上。
              </Paragraph>
            </div>
          </div>
        </section>

        {/* Text Variants Section */}
        <section>
          <div className="mb-6">
            <Text size="sm" variant="muted" className="mb-4 block">
              文字變體 (Text Variants)
            </Text>
            <div className="space-y-2">
              <div>
                <Text size="xs">特小文字 (Extra Small) - 12px</Text>
              </div>
              <div>
                <Text size="sm">小型文字 (Small) - 14px</Text>
              </div>
              <div>
                <Text size="base">基本文字 (Base) - 16px</Text>
              </div>
              <div>
                <Text size="lg">大型文字 (Large) - 18px</Text>
              </div>
              <div>
                <Text size="xl">特大文字 (Extra Large) - 20px</Text>
              </div>
            </div>
          </div>
        </section>

        {/* All Heading Levels */}
        <section>
          <div className="mb-6">
            <Text size="sm" variant="muted" className="mb-4 block">
              完整標題層級 (Complete Heading Hierarchy)
            </Text>
            <div className="space-y-3">
              <Heading level="h1">第一級標題 - Heading 1</Heading>
              <Heading level="h2">第二級標題 - Heading 2</Heading>
              <Heading level="h3">第三級標題 - Heading 3</Heading>
              <Heading level="h4">第四級標題 - Heading 4</Heading>
              <Heading level="h5">第五級標題 - Heading 5</Heading>
              <Heading level="h6">第六級標題 - Heading 6</Heading>
            </div>
          </div>
        </section>

        {/* Heading Variants */}
        <section>
          <div className="mb-6">
            <Text size="sm" variant="muted" className="mb-4 block">
              標題變體 (Heading Variants)
            </Text>
            <div className="space-y-3">
              <Heading level="h2" variant="default">預設標題 (Default)</Heading>
              <Heading level="h2" variant="muted">柔和標題 (Muted)</Heading>
              <Heading level="h2" variant="accent">強調標題 (Accent)</Heading>
            </div>
          </div>
        </section>
      </div>
    </LanguageProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive demonstration of all typography components with Traditional Chinese text. This story showcases headings, paragraphs, text variants, and mixed content (Traditional Chinese with English and numbers) to verify proper font rendering and character display.'
      }
    }
  }
}
