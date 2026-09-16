'use client'

import { motion } from 'framer-motion'
import { Building2, Calendar, Code2, Download, Mail, MapPin, Phone, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Counter } from '@/components/shared/AnimatedText'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { personal } from '@/data/personal'
import { yearsOfExperience } from '@/data/achievements'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion'

/** Headline figures repeated from the resume for quick scanning. */
const quickStats = [
  { icon: Calendar, value: yearsOfExperience(), suffix: '+', label: 'Years Experience' },
  { icon: Building2, value: 2, label: 'Companies' },
  { icon: Code2, value: 3, label: 'Major Projects' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div id="about-heading">
          <SectionHeading
            eyebrow="About"
            title="Building reliable backends"
            subtitle="A short introduction drawn from my career objective and experience."
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 md:grid-cols-3"
        >
          {/* Photo placeholder — TODO: drop a real photo at public/images/profile.jpg */}
          <motion.div variants={fadeInUp} className="md:row-span-2">
            <Card className="flex h-full min-h-[260px] flex-col items-center justify-center gap-4 text-center">
              <div
                role="img"
                aria-label={`Portrait placeholder for ${personal.name}`}
                className="flex h-28 w-28 items-center justify-center rounded-full bg-[linear-gradient(135deg,hsl(var(--grad-1)/0.25),hsl(var(--grad-3)/0.25))] text-primary"
              >
                <User className="h-12 w-12" />
              </div>
              <div>
                <CardTitle>{personal.name}</CardTitle>
                <p className="mt-1 text-sm text-primary">{personal.role}</p>
              </div>
              {/*
                TODO: Replace the placeholder above with next/image:
                <Image src="/images/profile.jpg" alt="Neema Sunder AV" width={160} height={160} priority />
              */}
            </Card>
          </motion.div>

          {/* Bio, built from the resume's Career Objective */}
          <motion.div variants={fadeInUp} className="md:col-span-2">
            <Card className="h-full">
              <CardTitle>Who I am</CardTitle>
              <CardDescription className="mt-3">{personal.objective}</CardDescription>
              <CardDescription className="mt-3">
                I currently work as a Software Engineer at Infinite Open-Source Solutions LLP in
                Calicut, where I build RESTful APIs for iOS and Android applications, automated
                reporting systems, and reusable service layers that cut duplication across the
                codebase.
              </CardDescription>

              <a href={personal.resumeUrl} download className="mt-5 inline-block">
                <Button size="sm">
                  <Download className="h-4 w-4" /> Download CV
                </Button>
              </a>
            </Card>
          </motion.div>

          {/* Stat tiles */}
          {quickStats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp}>
              <Card className="flex h-full flex-col items-center justify-center py-8 text-center">
                <stat.icon className="mb-3 h-5 w-5 text-primary" />
                <span className="gradient-text font-display text-4xl font-bold">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </span>
                <span className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </span>
              </Card>
            </motion.div>
          ))}

          {/* Contact details bento tile */}
          <motion.div variants={fadeInUp} className="md:col-span-3">
            <Card>
              <CardTitle className="mb-4">Details</CardTitle>
              <dl className="grid gap-4 sm:grid-cols-3">
                {[
                  { Icon: Mail, term: 'Email', desc: personal.email, href: `mailto:${personal.email}` },
                  { Icon: Phone, term: 'Phone', desc: personal.phone, href: `tel:${personal.phone.replace(/\s/g, '')}` },
                  { Icon: MapPin, term: 'Location', desc: personal.address, href: null },
                ].map(({ Icon, term, desc, href }) => (
                  <div key={term} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div className="min-w-0">
                      <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                        {term}
                      </dt>
                      <dd className="mt-0.5 break-words text-sm">
                        {href ? (
                          <a href={href} className="hover:text-primary">
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
