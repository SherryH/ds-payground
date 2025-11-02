import type { Meta, StoryObj } from '@storybook/react'
import { Paragraph } from './Paragraph'

const meta = {
  title: 'Typography/Paragraph',
  component: Paragraph,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'The paragraph size'
    },
    variant: {
      control: 'select',
      options: ['default', 'muted', 'lead'],
      description: 'The visual style variant'
    }
  }
} satisfies Meta<typeof Paragraph>

export default meta
type Story = StoryObj<typeof meta>

const sampleText =
  'The quick brown fox jumps over the lazy dog. This is a sample paragraph to demonstrate the typography styles in our design system. It contains enough text to show line height and spacing.'

export const Default: Story = {
  args: {
    children: sampleText
  }
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: sampleText
  },
  parameters: {
    docs: {
      description: {
        story: 'Small paragraph size, useful for secondary content or fine print.'
      }
    }
  }
}

export const Base: Story = {
  args: {
    size: 'base',
    children: sampleText
  },
  parameters: {
    docs: {
      description: {
        story: 'Base paragraph size, the default for body text.'
      }
    }
  }
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: sampleText
  },
  parameters: {
    docs: {
      description: {
        story: 'Large paragraph size, good for emphasis or featured content.'
      }
    }
  }
}

export const Muted: Story = {
  args: {
    variant: 'muted',
    children: sampleText
  },
  parameters: {
    docs: {
      description: {
        story: 'Muted variant with reduced opacity, useful for secondary text.'
      }
    }
  }
}

export const Lead: Story = {
  args: {
    variant: 'lead',
    children:
      'This is a lead paragraph that introduces the main content. It has larger text and medium weight to stand out from regular body text.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Lead variant, typically used as an introduction or summary paragraph.'
      }
    }
  }
}

export const MultiParagraph: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <Paragraph variant="lead">
        This is an introductory lead paragraph that sets the stage for the
        content below. It uses larger text with medium weight.
      </Paragraph>
      <Paragraph>
        This is the first body paragraph with regular styling. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua.
      </Paragraph>
      <Paragraph>
        This is a second body paragraph. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Paragraph>
      <Paragraph variant="muted" size="sm">
        This is a footnote or secondary information paragraph with muted styling
        and smaller size.
      </Paragraph>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of using different paragraph variants together in a document.'
      }
    }
  }
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
      <Paragraph size="sm">{sampleText}</Paragraph>
      <Paragraph size="base">{sampleText}</Paragraph>
      <Paragraph size="lg">{sampleText}</Paragraph>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All paragraph sizes displayed together for comparison.'
      }
    }
  }
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
      <Paragraph variant="default">{sampleText}</Paragraph>
      <Paragraph variant="muted">{sampleText}</Paragraph>
      <Paragraph variant="lead">
        This is a lead paragraph with larger text and medium weight for emphasis.
      </Paragraph>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All paragraph variants displayed together for comparison.'
      }
    }
  }
}
