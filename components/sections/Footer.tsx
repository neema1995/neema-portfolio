'use client'

import { Linkedin, Mail, Phone, type LucideIcon } from 'lucide-react'
import { navLinks, personal, socials, type SocialLink } from '@/data/personal'

const ICONS: Record<SocialLink['icon'], LucideIcon> = {
  linkedin: Linkedin,
  mail: Mail,
  phone: Phone,
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
        <a href="#home" className="gradient-text font-display text-2xl font-bold tracking-tight">
          {personal.name}
        </a>

        {/* Quick links */}
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social links */}
        <ul className="flex items-center gap-3">
          {socials.map((social) => {
            const Icon = ICONS[social.icon]
            const external = social.href.startsWith('http')
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            )
          })}
        </ul>

        <p className="text-center text-xs text-muted-foreground">
          © {year} {personal.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
