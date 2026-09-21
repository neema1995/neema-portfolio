'use client'

import { motion } from 'framer-motion'
import { Download, Mail, MapPin, Phone } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Card } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { personal } from '@/data/personal'
import { cn } from '@/lib/utils'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion'

const details = [
  { icon: Mail, term: 'Email', desc: personal.email, href: `mailto:${personal.email}` },
  {
    icon: Phone,
    term: 'Phone',
    desc: personal.phone,
    href: `tel:${personal.phone.replace(/\s/g, '')}`,
  },
  { icon: MapPin, term: 'Based in', desc: personal.location, href: null },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section">
      <div className="container-page">
        <SectionHeading
          id="about-heading"
          eyebrow="About"
          title="A bit about me"
          subtitle="Backend-focused engineer with a preference for clean APIs and data models that hold up."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12"
        >
          <motion.div variants={fadeInUp} className="space-y-5">
            <p className="text-lg leading-relaxed text-foreground">{personal.objective}</p>

            <p className="leading-relaxed text-muted-foreground">
              I currently work as a Software Engineer at{' '}
              <span className="font-medium text-foreground">
                Infinite Open-Source Solutions LLP
              </span>{' '}
              in Calicut, where I build RESTful APIs for iOS and Android applications, automated
              reporting systems, and reusable service layers that cut duplication across the
              codebase.
            </p>

            <div className="pt-2">
              <a
                href={personal.resumeUrl}
                download
                className={cn(buttonVariants({ variant: 'outline' }))}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download CV
              </a>
            </div>
          </motion.div>

          {/* Contact details */}
          <motion.div variants={fadeInUp}>
            <Card className="p-0">
              <dl className="divide-y divide-border">
                {details.map(({ icon: Icon, term, desc, href }) => (
                  <div key={term} className="flex gap-4 p-5">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        {term}
                      </dt>
                      <dd className="mt-1 break-words text-sm text-foreground">
                        {href ? (
                          <a href={href} className="rounded transition-colors hover:text-primary">
                            {desc}
                          </a>
                        ) : (
                          desc
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
