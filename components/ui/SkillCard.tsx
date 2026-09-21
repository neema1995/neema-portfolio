'use client'

import { motion } from 'framer-motion'
import { Database, Layers, Sparkles, Wrench, type LucideIcon } from 'lucide-react'
import { Card, CardTitle } from './card'
import { fadeInUp } from '@/lib/motion'
import type { SkillCategory } from '@/data/skills'

/** Category icon lookup — keys match SkillCategory['icon']. */
const icons: Record<SkillCategory['icon'], LucideIcon> = {
  layers: Layers,
  database: Database,
  wrench: Wrench,
  sparkles: Sparkles,
}

/**
 * Turns a 0-100 level into words, so the meter means something to a screen
 * reader (and to anyone who does not read a bar as a number).
 */
function levelLabel(level: number): string {
  if (level >= 90) return 'Expert'
  if (level >= 80) return 'Advanced'
  if (level >= 70) return 'Proficient'
  return 'Working knowledge'
}

/** One skills category with a proficiency meter per skill. */
export function SkillCard({ category }: { category: SkillCategory }) {
  const Icon = icons[category.icon]

  return (
    <motion.li variants={fadeInUp}>
      {/*
        No `h-full`: cards hug their content so a short category does not get
        stretched to match a long one, which left a large void inside it.
      */}
      <Card>
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary"
          >
            <Icon className="h-5 w-5" />
          </span>
          <CardTitle className="flex-1">{category.title}</CardTitle>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {category.skills.length}
          </span>
        </div>

        <ul className="mt-5 space-y-4">
          {category.skills.map((skill) => (
            <li key={skill.name}>
              <div className="mb-2 flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium">{skill.name}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {levelLabel(skill.level)}
                </span>
              </div>

              <div
                role="progressbar"
                aria-label={`${skill.name} proficiency`}
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuetext={`${levelLabel(skill.level)}, ${skill.level} percent`}
                className="h-1.5 overflow-hidden rounded-full bg-muted"
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </motion.li>
  )
}
