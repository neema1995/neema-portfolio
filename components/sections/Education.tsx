'use client'

import { motion } from 'framer-motion'
import { Award, GraduationCap } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Card } from '@/components/ui/card'
import { certifications, education } from '@/data/education'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion'

export function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="section bg-subtle">
      <div className="container-page">
        <SectionHeading
          id="education-heading"
          eyebrow="Education"
          title="Academic background"
          subtitle="My educational profile and professional certifications."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-10 lg:grid-cols-2"
        >
          {/* Qualifications */}
          <motion.div variants={fadeInUp}>
            <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold tracking-tight">
              <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
              Qualifications
            </h3>
            <ul className="space-y-4">
              {education.map((item) => (
                <li key={item.degree}>
                  <Card>
                    <p className="font-semibold tracking-tight">{item.degree}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.institution}</p>
                    {/* Years are not stated on the resume; rendered only when present. */}
                    {item.year && (
                      <p className="mt-2 text-xs font-medium text-muted-foreground">{item.year}</p>
                    )}
                  </Card>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Certifications */}
          <motion.div variants={fadeInUp}>
            <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold tracking-tight">
              <Award className="h-5 w-5 text-primary" aria-hidden="true" />
              Certifications
            </h3>
            {certifications.length > 0 ? (
              <ul className="space-y-4">
                {certifications.map((cert) => (
                  <li key={cert.name}>
                    <Card>
                      <p className="font-semibold tracking-tight">{cert.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{cert.issuer}</p>
                      <p className="mt-2 text-xs font-medium text-muted-foreground">{cert.year}</p>
                    </Card>
                  </li>
                ))}
              </ul>
            ) : (
              /* TODO: Add certifications from resume — none are listed there. */
              <Card className="border-dashed bg-transparent shadow-none">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  No certifications are listed on the resume yet. Add entries to{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">data/education.ts</code>{' '}
                  and they will appear here automatically.
                </p>
              </Card>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
