import { Linkedin, Mail, Phone, type LucideIcon } from 'lucide-react'
import { navLinks, personal, socials } from '@/data/personal'

/** Social icon lookup — keys match SocialLink['icon']. */
const icons: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  mail: Mail,
  phone: Phone,
}

export function Footer() {
  const year = new Date().getFullYear()

  const initials = personal.name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')

  return (
    <footer className="border-t border-border bg-subtle">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <p className="flex items-center gap-2.5 font-semibold tracking-tight">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground"
              >
                {initials}
              </span>
              {personal.name}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {personal.role} in {personal.location}, building scalable web applications with
              Laravel, PHP, MySQL and Vue.js.
            </p>

            {/* Social icon row */}
            <ul className="mt-5 flex gap-2">
              {socials.map((social) => {
                const Icon = icons[social.icon]
                const external = social.href.startsWith('http')
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Quick links, split across two columns to keep the footer shallow. */}
          <nav aria-label="Footer" className="md:col-span-2">
            <p className="text-sm font-semibold">Navigation</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="rounded text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
          <span>
            © {year} {personal.name}. All rights reserved.
          </span>
          <a href="#home" className="rounded transition-colors hover:text-primary">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
