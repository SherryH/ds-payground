import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const paragraphVariants = cva(
  'font-sans text-foreground',
  {
    variants: {
      size: {
        sm: 'text-sm leading-relaxed',
        base: 'text-base leading-relaxed',
        lg: 'text-lg leading-relaxed'
      },
      variant: {
        default: '',
        muted: 'text-muted-foreground',
        lead: 'text-lg font-medium leading-normal'
      }
    },
    defaultVariants: {
      size: 'base',
      variant: 'default'
    }
  }
)

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

export const Paragraph = ({
  size,
  variant,
  className,
  ...props
}: ParagraphProps) => {
  return (
    <p
      className={cn(paragraphVariants({ size, variant }), className)}
      {...props}
    />
  )
}
