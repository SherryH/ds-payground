import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'

const meta = {
  title: 'Typography/Text',
  component: Text,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl'],
      description: 'The text size'
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'The font weight'
    },
    variant: {
      control: 'select',
      options: ['default', 'muted', 'error', 'success'],
      description: 'The visual style variant'
    },
    as: {
      control: 'select',
      options: ['span', 'p', 'div', 'label'],
      description: 'The HTML element to render'
    }
  }
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is default text'
  }
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text size="xs">Extra Small Text (xs)</Text>
      <Text size="sm">Small Text (sm)</Text>
      <Text size="base">Base Text (base)</Text>
      <Text size="lg">Large Text (lg)</Text>
      <Text size="xl">Extra Large Text (xl)</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available text sizes.'
      }
    }
  }
}

export const Weights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text weight="normal">Normal Weight (400)</Text>
      <Text weight="medium">Medium Weight (500)</Text>
      <Text weight="semibold">Semibold Weight (600)</Text>
      <Text weight="bold">Bold Weight (700)</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available font weights.'
      }
    }
  }
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text variant="default">Default Variant</Text>
      <Text variant="muted">Muted Variant</Text>
      <Text variant="error">Error Variant</Text>
      <Text variant="success">Success Variant</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All color variants.'
      }
    }
  }
}

export const Combinations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text size="lg" weight="bold">Large Bold Text</Text>
      <Text size="sm" weight="medium" variant="muted">Small Medium Muted</Text>
      <Text size="base" weight="semibold" variant="error">Base Semibold Error</Text>
      <Text size="xl" weight="bold" variant="success">XL Bold Success</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of combining different props for various use cases.'
      }
    }
  }
}

export const AsLabel: Story = {
  args: {
    as: 'label',
    weight: 'medium',
    size: 'sm',
    children: 'Form Label'
  },
  parameters: {
    docs: {
      description: {
        story: 'Using Text as a label element with appropriate styling for forms.'
      }
    }
  }
}

export const InlineUsage: Story = {
  render: () => (
    <p>
      This is a paragraph with{' '}
      <Text as="span" weight="bold">
        bold inline text
      </Text>{' '}
      and{' '}
      <Text as="span" variant="error">
        error text
      </Text>
      .
    </p>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text component can be used inline within other text content.'
      }
    }
  }
}
