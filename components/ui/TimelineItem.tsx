'use client'

import { motion } from 'framer-motion'
import { Briefcase, ChevronDown, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Badge } from './badge'
import { Card } from './card'
import { cn } from '@/lib/utils'
import { fadeInUp } from '@/lib/motion'
import type { Experience } from '@/data/experience'

/** One expandable entry on the vertical experience timeline. */
export function TimelineItem({ item, index }: { item: Experience; index: number }) {
  // The most recent role starts expanded; older ones collapse.
  const [open, setOpen] = useState(index === 0)
  const panelId = `experience-panel-${index}`

  return (
    <motion.li variants={fadeInUp} className="relative pl-12 sm:pl-16">
      {/* Node on the timeline rail */}
      <span className="absolute left-0 top-2 flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-background text-primary shadow-lg shadow-primary/10 sm:h-11 sm:w-11">
        <Briefcase className="h-4 w-4" />
      </span>

      <Card className="hover:border-primary/30">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold tracking-tight">
              {item.company}
            </h3>
            <p className="mt-0.5 text-sm font-medium text-primary">{item.role}</p>
          </div>

          <span className="rounded-full bg-[linear-gradient(100deg,hsl(var(--grad-1)),hsl(var(--grad-3)))] px-3 py-1 text-xs font-semibold text-white">
            {item.period}
          </span>
        </div>

        {item.location && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {item.location}
          </p>
        )}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
        >
          {open ? 'Hide details' : 'View details'}
          <ChevronDown
            className={cn('h-4 w-4 transition-transform duration-300', open && 'rotate-180')}
          />
        </button>

        {/* Height animation via grid-template-rows keeps the content in flow. */}
        <div
          id={panelId}
          className={cn(
            'grid transition-all duration-300 ease-out',
            open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          )}
        >
          <div className="overflow-hidden">
            <ul className="mt-4 space-y-2.5">
              {item.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="relative pl-5 text-sm leading-relaxed text-muted-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-primary"
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {item.tech.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </Card>
    </motion.li>
  )
}
