'use client'

import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Card } from '@/components/ui/card'
import { education } from '@/data/education'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion'

export function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="section bg-subtle">
      <div className="container-page">
        <SectionHeading
          id="education-heading"
          eyebrow="Education"
          title="Academic background"
          subtitle="Where I studied."
        />

        {/*
          Single column: the certifications panel that used to sit alongside
          this one has been removed, so a two-column grid would leave half the
          row empty.
        */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl"
        >
          <motion.h3
            variants={fadeInUp}
            className="mb-5 flex items-center gap-2 text-lg font-semibold tracking-tight"
          >
            <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
            Qualifications
          </motion.h3>

          <ul className="space-y-4">
            {education.map((item) => (
              <motion.li key={item.degree} variants={fadeInUp}>
                <Card>
                  <p className="font-semibold tracking-tight">{item.degree}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.institution}</p>
                  {/* Years are not stated on the resume; rendered only when present. */}
                  {item.year && (
                    <p className="mt-2 text-xs font-medium text-muted-foreground">{item.year}</p>
                  )}
                </Card>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
