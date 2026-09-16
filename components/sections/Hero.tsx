'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Download, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Typewriter } from '@/components/shared/AnimatedText'
import { personal } from '@/data/personal'
import { heroBadges } from '@/data/skills'
import { fadeInUp, staggerContainer } from '@/lib/motion'

/** Decorative gradient blobs behind the hero. */
function Blobs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-24 top-10 h-72 w-72 animate-blob rounded-full bg-[hsl(var(--grad-1)/0.25)] blur-[90px]" />
      <div className="absolute right-0 top-32 h-80 w-80 animate-blob rounded-full bg-[hsl(var(--grad-2)/0.22)] blur-[100px] [animation-delay:3s]" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 animate-blob rounded-full bg-[hsl(var(--grad-3)/0.2)] blur-[90px] [animation-delay:6s]" />
      {/* Faint grid to give the blobs something to sit against */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
    </div>
  )
}

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-20 pt-32"
    >
      <Blobs />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        {/* Availability / location strip */}
        <motion.p
          variants={fadeInUp}
          className="glass gradient-border inline-flex items-center gap-2 !rounded-full px-4 py-1.5 text-xs text-muted-foreground"
        >
          <MapPin className="h-3.5 w-3.5 text-primary" />
          {personal.location}
        </motion.p>

        {/* Single H1 for the page */}
        <motion.h1
          variants={fadeInUp}
          className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl"
        >
          <span className="gradient-text">{personal.name}</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mt-5 font-display text-xl font-medium text-muted-foreground sm:text-2xl md:text-3xl"
        >
          <Typewriter words={[...personal.roles]} />
        </motion.p>

        <motion.p
          variants={fadeInUp}
          className="mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground"
        >
          {personal.objective}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeInUp} className="mt-9 flex flex-wrap justify-center gap-3">
          <a href="#contact">
            <Button size="lg">Hire Me</Button>
          </a>
          <a href="#projects">
            <Button size="lg" variant="outline">
              View Work
            </Button>
          </a>
          <a href={personal.resumeUrl} download>
            <Button size="lg" variant="outline">
              <Download className="h-4 w-4" /> Download CV
            </Button>
          </a>
        </motion.div>

        {/* Social links */}
        <motion.ul variants={fadeInUp} className="mt-8 flex items-center gap-3">
          {[
            { href: personal.linkedin, label: 'LinkedIn profile', Icon: Linkedin, external: true },
            { href: `mailto:${personal.email}`, label: `Email ${personal.name}`, Icon: Mail, external: false },
            { href: `tel:${personal.phone.replace(/\s/g, '')}`, label: `Call ${personal.name}`, Icon: Phone, external: false },
          ].map(({ href, label, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
              >
                <Icon className="h-4.5 w-4.5" />
              </a>
            </li>
          ))}
        </motion.ul>

        {/* Floating tech badges */}
        <motion.ul
          variants={fadeInUp}
          className="mt-12 flex max-w-2xl flex-wrap justify-center gap-2.5"
        >
          {heroBadges.map((badge, i) => (
            <li
              key={badge}
              className="glass gradient-border animate-float !rounded-full px-4 py-1.5 text-xs font-medium"
              // Staggered delays keep the badges from bobbing in unison.
              style={{ animationDelay: `${i * 0.35}s` }}
            >
              {badge}
            </li>
          ))}
        </motion.ul>

        {/* Scroll hint */}
        <motion.a
          variants={fadeInUp}
          href="#about"
          aria-label="Scroll to About section"
          className="mt-14 text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </motion.a>
      </motion.div>
    </section>
  )
}
