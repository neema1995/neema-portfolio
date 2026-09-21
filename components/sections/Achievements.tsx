'use client'

import { motion } from 'framer-motion'
import { Building2, CalendarDays, Code2, FolderGit2, type LucideIcon } from 'lucide-react'
import { Counter } from '@/components/shared/AnimatedText'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Card } from '@/components/ui/card'
import { stats, type Stat } from '@/data/achievements'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion'

/** Stat icon lookup — keys match Stat['icon']. */
const icons: Record<Stat['icon'], LucideIcon> = {
  calendar: CalendarDays,
  building: Building2,
  folder: FolderGit2,
  code: Code2,
}

/**
 * Counters are limited to figures stated on the resume.
 * TODO: Add awards, recognitions and quantified impact metrics — the source
 * resume contains none, so nothing is shown for them here.
 */
export function Achievements() {
  return (
    <section id="achievements" aria-labelledby="achievements-heading" className="section">
      <div className="container-page">
        <SectionHeading
          id="achievements-heading"
          eyebrow="Achievements"
          title="By the numbers"
          subtitle="A snapshot of my professional track record so far."
        />

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => {
            const Icon = icons[stat.icon]
            return (
              <motion.li key={stat.label} variants={fadeInUp}>
                <Card className="h-full text-center">
                  <span
                    aria-hidden="true"
                    className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-primary-soft text-primary"
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <p className="mt-4 text-4xl font-bold tracking-tight">
                    <Counter to={stat.value} />
                    {stat.suffix}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-foreground">{stat.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stat.note}</p>
                </Card>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
