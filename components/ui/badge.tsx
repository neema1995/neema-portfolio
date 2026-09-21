import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

/** Pill used for technology labels throughout the site. */
const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        /* Default: neutral chip that never competes with body copy. */
        muted: 'bg-muted text-muted-foreground',
        /* Emphasis: tinted brand chip for the primary stack of an item. */
        brand: 'bg-primary-soft text-primary',
        outline: 'border border-border text-muted-foreground',
      },
    },
    defaultVariants: { variant: 'muted' },
  }
)

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
