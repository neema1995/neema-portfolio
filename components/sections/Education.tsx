'use client'

import { motion } from 'framer-motion'
import { Award, GraduationCap } from 'lucide-react'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { certifications, education } from '@/data/education'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion'

export function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div id="education-heading">
          <SectionHeading
            eyebrow="Education"
            title="Academic background"
            subtitle="My educational profile and professional certifications."
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 md:grid-cols-2"
        >
          {/* Qualifications */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <CardTitle>Qualifications</CardTitle>
              </div>

              <ol className="space-y-5">
                {education.map((item) => (
                  <li key={item.degree} className="relative border-l border-border pl-5">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full bg-primary"
                    />
                    <h3 className="text-sm font-semibold">{item.degree}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.institution}</p>
                    {/* Years are not stated on the resume; rendered only when present. */}
                    {item.year && (
                      <p className="mt-0.5 text-xs text-primary">{item.year}</p>
                    )}
                  </li>
                ))}
              </ol>
            </Card>
          </motion.div>

          {/* Certifications */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Award className="h-5 w-5" />
                </span>
                <CardTitle>Certifications</CardTitle>
              </div>

              {certifications.length > 0 ? (
                <ol className="space-y-5">
                  {certifications.map((cert) => (
                    <li key={cert.name} className="relative border-l border-border pl-5">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full bg-primary"
                      />
                      <h3 className="text-sm font-semibold">{cert.name}</h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">{cert.issuer}</p>
                      <p className="mt-0.5 text-xs text-primary">{cert.year}</p>
                    </li>
                  ))}
                </ol>
              ) : (
                /* TODO: Add certifications from resume — none are listed there. */
                <CardDescription>
                  No certifications are listed on the resume yet. Add entries to{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                    data/education.ts
                  </code>{' '}
                  and they will appear here automatically.
                </CardDescription>
              )}
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
