'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { personal } from '@/data/personal'

/**
 * Loading screen shown on first paint, then dismissed.
 * Deliberately short — it is an intro flourish, not a real data gate.
 */
export function Loader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setDone(true), 1400)
    return () => clearTimeout(timeout)
  }, [])

  // Lock scrolling while the overlay covers the page.
  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="gradient-text font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {personal.name}
          </motion.span>

          {/* Progress rail */}
          <div className="mt-6 h-[3px] w-48 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="h-full bg-[linear-gradient(90deg,hsl(var(--grad-1)),hsl(var(--grad-3)))]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
