'use client'

import { motion } from 'framer-motion'
import { Database, Layers, Sparkles, Wrench, type LucideIcon } from 'lucide-react'
import { Card, CardTitle } from './card'
import { fadeInUp } from '@/lib/motion'
import type { SkillCategory } from '@/data/skills'

/** Maps the icon key stored in data/skills.ts to a Lucide component. */
const ICONS: Record<SkillCategory['icon'], LucideIcon> = {
  layers: Layers,
  database: Database,
  wrench: Wrench,
  sparkles: Sparkles,
}

/** One category card with animated skill meters that fill on scroll. */
export function SkillCard({ category }: { category: SkillCategory }) {
  const Icon = ICONS[category.icon]

  return (
    <motion.div variants={fadeInUp}>
      <Card className="group h-full hover:border-primary/30">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-5 w-5" />
          </span>
          <CardTitle>{category.title}</CardTitle>
        </div>

        <ul className="space-y-4">
          {category.skills.map((skill) => (
            <li key={skill.name}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium">{skill.name}</span>
                <span className="text-xs text-muted-foreground">{skill.level}%</span>
              </div>

              <div
                role="progressbar"
                aria-label={`${skill.name} proficiency`}
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                className="h-1.5 overflow-hidden rounded-full bg-muted"
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-[linear-gradient(90deg,hsl(var(--grad-1)),hsl(var(--grad-3)))]"
                />
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  )
}
