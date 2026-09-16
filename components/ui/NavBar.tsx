'use client'

import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { navLinks } from '@/data/personal'
import { ThemeToggle } from './ThemeToggle'

/**
 * Floating pill navigation.
 * Tracks the section currently in view and highlights the matching link.
 */
export function NavBar() {
  const [active, setActive] = useState<string>(navLinks[0].id)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const sections = navLinks
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    /*
     * rootMargin pulls the detection band to the upper third of the viewport so
     * a section counts as "active" once its heading is comfortably on screen.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0.1, 0.4, 0.75] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.4 }}
      className="fixed inset-x-0 top-4 z-50 px-4"
    >
      <nav
        aria-label="Primary"
        className="glass gradient-border mx-auto flex max-w-4xl items-center justify-between gap-4 !rounded-full px-4 py-2.5 sm:px-6"
      >
        <a
          href="#home"
          className="gradient-text font-display text-base font-bold tracking-tight"
        >
          Neema
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className={cn(
                  'relative rounded-full px-3 py-1.5 text-sm transition-colors',
                  active === link.id
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {/* Shared layout pill slides between the active items */}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(100deg,hsl(var(--grad-1)),hsl(var(--grad-3)))]"
                  />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass gradient-border mx-auto mt-2 grid max-w-4xl grid-cols-2 gap-1 p-3 lg:hidden"
        >
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  'block rounded-xl px-3 py-2 text-sm transition-colors',
                  active === link.id
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.header>
  )
}
