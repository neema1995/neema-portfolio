'use client'

import { motion } from 'framer-motion'
import { Briefcase, MapPin } from 'lucide-react'
import { Badge } from './badge'
import { Card } from './card'
import { fadeInUp } from '@/lib/motion'
import type { Experience } from '@/data/experience'

/** One role on the experience timeline. */
export function TimelineItem({ item }: { item: Experience }) {
  return (
    <motion.li variants={fadeInUp} className="relative pl-12">
      {/* Timeline marker, sitting on top of the rail drawn by the parent <ol>. */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm"
      >
        <Briefcase className="h-4 w-4" />
      </span>

      <Card>
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">{item.role}</h3>
            <p className="mt-0.5 font-medium text-primary">{item.company}</p>
          </div>
          <Badge variant="muted" className="shrink-0">
            {item.period}
          </Badge>
        </div>

        {item.location && (
          <p className="mt-3 flex items-start gap-1.5 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {item.location}
          </p>
        )}

        <ul className="mt-4 space-y-2.5">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span
                aria-hidden="true"
                className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60"
              />
              {bullet}
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
          {item.tech.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </motion.li>
  )
}
