'use client'

import { motion } from 'framer-motion'
import { Building2, Calendar, Code2, FolderKanban, type LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Counter } from '@/components/shared/AnimatedText'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { stats, type Stat } from '@/data/achievements'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion'

const ICONS: Record<Stat['icon'], LucideIcon> = {
  calendar: Calendar,
  building: Building2,
  folder: FolderKanban,
  code: Code2,
}

/**
 * Counters are limited to figures stated on the resume.
 * TODO: Add awards, recognitions and quantified impact metrics — the source
 * resume contains none, so nothing is shown for them here.
 */
export function Achievements() {
  return (
    <section id="achievements" aria-labelledby="achievements-heading" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div id="achievements-heading">
          <SectionHeading
            eyebrow="Achievements"
            title="By the numbers"
            subtitle="A snapshot of my professional track record so far."
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => {
            const Icon = ICONS[stat.icon]
            return (
              <motion.div key={stat.label} variants={fadeInUp}>
                <Card className="flex h-full flex-col items-center py-8 text-center transition-transform duration-300 hover:-translate-y-1">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="gradient-text font-display text-5xl font-bold">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </span>
                  <h3 className="mt-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground/80">
                    {stat.note}
                  </p>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
