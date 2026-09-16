'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { TimelineItem } from '@/components/ui/TimelineItem'
import { experiences } from '@/data/experience'
import { staggerContainer, viewportOnce } from '@/lib/motion'

export function Experience() {
  const railRef = useRef<HTMLDivElement>(null)

  // Draw the timeline rail as the section scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 75%', 'end 60%'],
  })
  const railHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" aria-labelledby="experience-heading" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div id="experience-heading">
          <SectionHeading
            eyebrow="Experience"
            title="Where I've worked"
            subtitle="Roles and responsibilities across my professional career."
          />
        </div>

        <div ref={railRef} className="relative">
          {/* Static rail track */}
          <div
            aria-hidden="true"
            className="absolute left-4 top-2 h-full w-px bg-border sm:left-[22px]"
          />
          {/* Gradient rail that draws in on scroll */}
          <motion.div
            aria-hidden="true"
            style={{ height: railHeight }}
            className="absolute left-4 top-2 w-px bg-[linear-gradient(180deg,hsl(var(--grad-1)),hsl(var(--grad-3)))] sm:left-[22px]"
          />

          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-8"
          >
            {experiences.map((item, index) => (
              <TimelineItem key={item.company} item={item} index={index} />
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
