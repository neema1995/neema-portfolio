'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion'

type Props = {
  /** Short uppercase label above the heading */
  eyebrow: string
  /** Main H2 for the section */
  title: string
  /** Optional supporting sentence */
  subtitle?: string
  /** id placed on the H2 so the section can reference it via aria-labelledby */
  id?: string
  /** Centered is the default; use 'left' when the section body is asymmetric. */
  align?: 'center' | 'left'
}

/**
 * Standard section header: eyebrow, H2 and an optional one-line summary,
 * with the same spacing everywhere so sections read as one system.
 */
export function SectionHeading({ eyebrow, title, subtitle, id, align = 'center' }: Props) {
  const centered = align === 'center'

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn('mb-12 max-w-2xl md:mb-16', centered && 'mx-auto text-center')}
    >
      <motion.p variants={fadeInUp} className="eyebrow">
        {eyebrow}
      </motion.p>

      <motion.h2 id={id} variants={fadeInUp} className="heading-2 mt-3 text-balance">
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p variants={fadeInUp} className="lead mt-4 text-balance">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
