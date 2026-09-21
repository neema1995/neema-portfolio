'use client'

import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

/**
 * Wraps the app in next-themes. The design is built light-first, and
 * `enableSystem` lets visitors who prefer dark land straight in it.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
