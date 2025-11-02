import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textVariants = cva(
  'font-sans',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl'
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold'
      },
      variant: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        error: 'text-destructive',
        success: 'text-green-600'
      }
    },
    defaultVariants: {
      size: 'base',
      weight: 'normal',
      variant: 'default'
    }
  }
)

export interface TextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof textVariants> {
  as?: 'span' | 'p' | 'div' | 'label'
}

export const Text = ({
  as: Component = 'span',
  size,
  weight,
  variant,
  className,
  ...props
}: TextProps) => {
  return (
    <Component
      className={cn(textVariants({ size, weight, variant }), className)}
      {...props}
    />
  )
}
