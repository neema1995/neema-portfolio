import * as React from 'react'
import { cn } from '@/lib/utils'

/** Small pill used for tech tags throughout the site. */
export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors',
        className
      )}
      {...props}
    />
  )
}
