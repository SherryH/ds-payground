import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from './Heading'

const meta = {
  title: 'Typography/Heading',
  component: Heading,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'The heading level (affects both HTML tag and styling)'
    },
    variant: {
      control: 'select',
      options: ['default', 'muted', 'accent'],
      description: 'The visual style variant'
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Override the HTML tag while keeping the styling from level'
    }
  }
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const H1: Story = {
  args: {
    level: 'h1',
    children: 'Heading Level 1'
  }
}

export const H2: Story = {
  args: {
    level: 'h2',
    children: 'Heading Level 2'
  }
}

export const H3: Story = {
  args: {
    level: 'h3',
    children: 'Heading Level 3'
  }
}

export const H4: Story = {
  args: {
    level: 'h4',
    children: 'Heading Level 4'
  }
}

export const H5: Story = {
  args: {
    level: 'h5',
    children: 'Heading Level 5'
  }
}

export const H6: Story = {
  args: {
    level: 'h6',
    children: 'Heading Level 6'
  }
}

export const Muted: Story = {
  args: {
    level: 'h2',
    variant: 'muted',
    children: 'Muted Heading'
  }
}

export const Accent: Story = {
  args: {
    level: 'h2',
    variant: 'accent',
    children: 'Accent Heading'
  }
}

export const SemanticOverride: Story = {
  args: {
    as: 'h1',
    level: 'h3',
    children: 'Looks like H3, but is H1 in HTML'
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the `as` prop to override the HTML tag while keeping the visual styling. Useful for maintaining proper heading hierarchy for accessibility.'
      }
    }
  }
}

export const AllLevels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading level="h1">Heading 1</Heading>
      <Heading level="h2">Heading 2</Heading>
      <Heading level="h3">Heading 3</Heading>
      <Heading level="h4">Heading 4</Heading>
      <Heading level="h5">Heading 5</Heading>
      <Heading level="h6">Heading 6</Heading>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All heading levels displayed together for comparison.'
      }
    }
  }
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading level="h2" variant="default">Default Variant</Heading>
      <Heading level="h2" variant="muted">Muted Variant</Heading>
      <Heading level="h2" variant="accent">Accent Variant</Heading>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All color variants using the same heading level.'
      }
    }
  }
}
