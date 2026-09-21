'use client'

import { motion } from 'framer-motion'
import { Database, Layers, Sparkles, Wrench, type LucideIcon } from 'lucide-react'
import { Card, CardTitle } from './card'
import { cn } from '@/lib/utils'
import { fadeInUp } from '@/lib/motion'
import { levelLabel, levelSegments } from '@/lib/skill-usage'
import type { SkillCategory } from '@/data/skills'

/** Category icon lookup — keys match SkillCategory['icon']. */
const icons: Record<SkillCategory['icon'], LucideIcon> = {
  layers: Layers,
  database: Database,
  wrench: Wrench,
  sparkles: Sparkles,
}

const SEGMENTS = [0, 1, 2, 3, 4]

/** One skills category, with a coarse 5-segment level per skill. */
export function SkillCard({ category }: { category: SkillCategory }) {
  const Icon = icons[category.icon]

  return (
    <motion.li variants={fadeInUp}>
      {/*
        No `h-full`: cards hug their content so a short category is not
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

        <ul className="mt-4 divide-y divide-border">
          {category.skills.map((skill) => {
            const filled = levelSegments(skill.level)
            const label = levelLabel(skill.level)
            return (
              <li key={skill.name} className="flex items-center justify-between gap-4 py-2.5">
                <span className="text-sm font-medium">{skill.name}</span>

                <span className="flex shrink-0 items-center gap-3">
                  <span className="hidden text-xs text-muted-foreground sm:inline">{label}</span>
                  {/*
                    Segments rather than a percentage bar: the underlying numbers
                    are estimates, so coarse buckets are the honest presentation.
                  */}
                  <span
                    role="img"
                    aria-label={`${skill.name}: ${label}`}
                    className="flex gap-1"
                  >
                    {SEGMENTS.map((i) => (
                      <span
                        key={i}
                        aria-hidden="true"
                        className={cn(
                          'h-1.5 w-4 rounded-full transition-colors',
                          i < filled ? 'bg-primary' : 'bg-muted'
                        )}
                      />
                    ))}
                  </span>
                </span>
              </li>
            )
          })}
        </ul>
      </Card>
    </motion.li>
  )
}
