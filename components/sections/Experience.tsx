'use client'

import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { TimelineItem } from '@/components/ui/TimelineItem'
import { experiences } from '@/data/experience'
import { staggerContainer, viewportOnce } from '@/lib/motion'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="section">
      <div className="container-page">
        <SectionHeading
          id="experience-heading"
          eyebrow="Experience"
          title="Where I've worked"
          subtitle="Roles and responsibilities across my professional career."
        />

        {/* Vertical timeline: the rail is drawn on the <ol>, markers on each item. */}
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mx-auto max-w-3xl space-y-8 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border"
        >
          {experiences.map((item) => (
            <TimelineItem key={item.company} item={item} />
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
