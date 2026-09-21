'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Download,
  Layers,
  Linkedin,
  Mail,
  MailCheck,
  MapPin,
  Phone,
  Plug,
  type LucideIcon,
} from 'lucide-react'
import { Typewriter } from '@/components/shared/AnimatedText'
import { buttonVariants } from '@/components/ui/button'
import { yearsOfExperience } from '@/data/achievements'
import { experiences } from '@/data/experience'
import { focusAreas, personal, socials, specialities } from '@/data/personal'
import { skillTags } from '@/data/skills'
import { projects } from '@/data/projects'
import { cn } from '@/lib/utils'
import { fadeInUp, staggerContainer } from '@/lib/motion'

/** Headline figures repeated from the resume — no invented metrics. */
const stats = [
  { value: `${yearsOfExperience()}+`, label: 'Years experience' },
  { value: `${projects.length}`, label: 'Major projects' },
  { value: `${skillTags.length}+`, label: 'Technologies' },
]

/** Focus-area icon lookup — keys match FocusArea['icon']. */
const focusIcons: Record<string, LucideIcon> = {
  api: Plug,
  report: MailCheck,
  layers: Layers,
}

/** Social icon lookup — keys match SocialLink['icon']. */
const socialIcons: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  mail: Mail,
  phone: Phone,
}

/** The current role drives the "currently at" line. */
const current = experiences[0]

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative scroll-mt-24 overflow-hidden border-b border-border bg-subtle"
    >
      {/* Decorative background layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dots" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hero-glow" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container-page relative py-16 md:py-20"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Intro */}
          <div>
            <motion.p
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              Open to opportunities
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]"
            >
              {personal.name}
            </motion.h1>

            {/* Fixed height stops the typewriter from nudging the layout. */}
            <motion.p
              variants={fadeInUp}
              className="mt-4 flex h-8 items-center text-xl font-semibold text-primary sm:text-2xl"
            >
              <Typewriter words={[...personal.roles]} />
            </motion.p>

            {/* The hook carries the argument; the detail below is scannable. */}
            <motion.p
              variants={fadeInUp}
              className="mt-5 max-w-xl text-lg leading-relaxed text-foreground sm:text-xl"
            >
              I design and evolve backend systems with a strong focus on{' '}
              <span className="font-semibold">architecture, performance</span> and{' '}
              <span className="font-semibold">long-term maintainability</span>.
            </motion.p>

            {/* The five specialities were a list trapped in a sentence. */}
            <motion.div variants={fadeInUp} className="mt-6 max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Core work in Laravel &amp; PHP
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {specialities.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-background/70 px-3 py-1.5 text-sm font-medium text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground"
            >
              I also handle Vue.js integration where needed. With {yearsOfExperience()} years of
              production experience, I build systems that scale cleanly and remain maintainable
              under real-world load.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"
            >
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              {personal.location}
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className={cn(buttonVariants({ size: 'lg' }))}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                Get in touch
              </a>
              <a
                href={personal.resumeUrl}
                download
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download CV
              </a>
              <a href="#projects" className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }))}>
                View work
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>

            </motion.div>

            {/* Direct contact shortcuts, on their own line so they read as secondary. */}
            <motion.div variants={fadeInUp} className="mt-6 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Find me on</span>
              <ul className="flex gap-2">
                {socials.map((social) => {
                  const Icon = socialIcons[social.icon]
                  const external = social.href.startsWith('http')
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        aria-label={social.label}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div variants={fadeInUp} className="mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative">
              <div
                role="img"
                aria-label={`Portrait placeholder for ${personal.name}`}
                className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary-soft via-muted to-background shadow-card"
              >
                <span className="text-8xl font-bold tracking-tight text-primary/25">NS</span>
                {/*
                  TODO: Replace the placeholder above with next/image:
                  <Image src="/images/profile.jpg" alt="Neema Sunder AV" fill className="object-cover" priority />
                */}
              </div>

              {/* Tenure card, overlapping the portrait's lower edge. */}
              <div className="absolute -bottom-5 left-5 right-5 rounded-xl border border-border bg-card p-4 shadow-card-hover">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Currently
                </p>
                <p className="mt-1 text-sm font-semibold leading-snug">{current.company}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {current.role} · {current.period}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Headline figures */}
        <motion.dl
          variants={fadeInUp}
          className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-8"
        >
          {stats.map(({ value, label }) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd>
                <span className="block text-3xl font-bold tracking-tight sm:text-4xl">{value}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{label}</span>
              </dd>
            </div>
          ))}
        </motion.dl>

        {/* What I actually work on */}
        <h2 className="sr-only">What I work on</h2>
        <motion.ul variants={fadeInUp} className="mt-10 grid gap-4 sm:grid-cols-3">
          {focusAreas.map((area) => {
            const Icon = focusIcons[area.icon]
            return (
              <li
                key={area.title}
                className="rounded-xl border border-border bg-background/70 p-5 backdrop-blur-sm transition-colors hover:border-primary/30"
              >
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight">{area.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {area.description}
                </p>
              </li>
            )
          })}
        </motion.ul>
      </motion.div>
    </section>
  )
}
