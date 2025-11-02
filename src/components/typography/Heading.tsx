import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const headingVariants = cva(
  'font-sans tracking-tight',
  {
    variants: {
      level: {
        h1: 'text-4xl font-bold leading-tight',
        h2: 'text-3xl font-bold leading-tight',
        h3: 'text-2xl font-semibold leading-normal',
        h4: 'text-xl font-semibold leading-normal',
        h5: 'text-lg font-medium leading-normal',
        h6: 'text-base font-medium leading-normal'
      },
      variant: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        accent: 'text-accent-foreground'
      }
    },
    defaultVariants: {
      level: 'h2',
      variant: 'default'
    }
  }
)

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Heading = ({
  as,
  level,
  variant,
  className,
  ...props
}: HeadingProps) => {
  const Component = as || level || 'h2'

  return (
    <Component
      className={cn(headingVariants({ level: level || as, variant }), className)}
      {...props}
    />
  )
}
