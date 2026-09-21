import type { Variants } from 'framer-motion'

/**
 * Shared Framer Motion variants so every section animates identically.
 */

/** Fade in while rising — the default entrance for section content. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Parent wrapper that releases its children one after another. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

/** Viewport config shared by every scroll-triggered section. */
export const viewportOnce = { once: true, amount: 0.2 } as const
