'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion'

type Props = {
  /** Small uppercase label above the heading */
  eyebrow: string
  /** Main H2 for the section */
  title: string
  /** Optional supporting sentence */
  subtitle?: string
}

/** Consistent heading block for every section, animated on scroll. */
export function SectionHeading({ eyebrow, title, subtitle }: Props) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="mb-12 flex flex-col items-center text-center"
    >
      <motion.span
        variants={fadeInUp}
        className="mb-4 inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
      >
        {eyebrow}
      </motion.span>

      <motion.h2
        variants={fadeInUp}
        className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className="mt-4 max-w-2xl text-balance text-muted-foreground"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
