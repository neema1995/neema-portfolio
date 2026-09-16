import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/** shadcn/ui button, extended with a `gradient` variant for the CTAs. */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        gradient:
          'bg-[linear-gradient(100deg,hsl(var(--grad-1)),hsl(var(--grad-2)),hsl(var(--grad-3)))] bg-[length:200%_100%] text-white shadow-lg shadow-primary/25 hover:bg-[position:100%_0] hover:shadow-xl hover:shadow-primary/35',
        outline:
          'border border-border bg-transparent hover:border-primary/60 hover:bg-primary/10',
        ghost: 'hover:bg-muted',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-muted',
      },
      size: {
        sm: 'h-9 px-4',
        md: 'h-11 px-6',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'gradient', size: 'md' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
)
Button.displayName = 'Button'

export { Button, buttonVariants }
