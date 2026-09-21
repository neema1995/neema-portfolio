import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Standard elevated surface: rounded corners, hairline border, soft shadow.
 * Pass `interactive` for the lift-on-hover treatment used by linked cards.
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }
>(({ className, interactive = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-200',
      interactive && 'hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover',
      className
    )}
    {...props}
  />
))
Card.displayName = 'Card'

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold tracking-tight', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm leading-relaxed text-muted-foreground', className)} {...props} />
))
CardDescription.displayName = 'CardDescription'

export { Card, CardTitle, CardDescription }
