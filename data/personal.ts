/**
 * Personal details.
 * Every value here is taken verbatim from the source resume.
 * Fields absent from the resume are marked with TODO rather than invented.
 */

export type SocialLink = {
  label: string
  href: string
  /** Key used to pick the icon in components/sections/Footer.tsx */
  icon: 'linkedin' | 'mail' | 'phone'
}

const DEFAULT_SITE_URL = 'https://neema-sunder.vercel.app'

/**
 * Canonical site origin, used for metadataBase, the sitemap, robots.txt and
 * the JSON-LD @ids.
 *
 * Reads as a list of candidates rather than `??` on purpose: a Vercel project
 * variable that exists but is blank yields '', which `??` does NOT fall back
 * on, so `new URL('')` in app/layout.tsx failed the build with
 * ERR_INVALID_URL. Anything blank or unparseable is skipped, and `.origin`
 * normalises the result so nothing downstream produces a double slash.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    // Vercel injects the deployment host with no scheme.
    process.env.NEXT_PUBLIC_VERCEL_URL && `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
    DEFAULT_SITE_URL,
  ]

  for (const candidate of candidates) {
    const value = candidate?.trim()
    if (!value) continue
    try {
      return new URL(value).origin
    } catch {
      // Malformed value (e.g. a host with no scheme) — try the next candidate.
    }
  }

  return DEFAULT_SITE_URL
}

export const personal = {
  name: 'Neema Sunder AV',
  /** Primary role, as printed on the resume */
  role: 'Software Engineer',
  /** Rotating titles for the hero typewriter — all derived from the resume */
  roles: ['Software Engineer', 'Backend Engineer'],
  dateOfBirth: '18 / 11 / 1995',
  email: 'nsav1995@gmail.com',
  phone: '+91 9497051348',
  /** Full postal address from the resume header */
  address: 'AchamVeettil (h), Poovattuparamba P.O, Calicut [dist], Pin: 673008',
  /** Short form used in the hero and SEO title */
  location: 'Calicut, Kerala, India',
  /**
   * NOTE: the resume lists this LinkedIn URL in truncated form.
   * TODO: replace with the full LinkedIn profile URL.
   */
  linkedin: 'https://www.linkedin.com/in/ne',

  // TODO: Add GitHub profile — no GitHub username is present in the resume.
  // (The GitHub Stats section was intentionally omitted for this reason.)

  /** Career Objective, quoted from the resume */
  objective:
    'Experienced Laravel developer with expertise in building scalable web applications using Laravel, PHP, MySQL and Vue.js. Strong expertise in RESTful APIs, database design and performance optimization. Passionate about writing clean, maintainable code and improving application efficiency.',

  /** Path to the downloadable CV. TODO: drop the real PDF at public/resume.pdf */
  resumeUrl: '/resume.pdf',

  /** Canonical site origin — override with NEXT_PUBLIC_SITE_URL in .env.local */
  siteUrl: resolveSiteUrl(),
} as const

export const socials: SocialLink[] = [
  { label: 'LinkedIn', href: personal.linkedin, icon: 'linkedin' },
  { label: 'Email', href: `mailto:${personal.email}`, icon: 'mail' },
  { label: 'Phone', href: `tel:${personal.phone.replace(/\s/g, '')}`, icon: 'phone' },
  // TODO: Add GitHub link once a username is available.
]

/**
 * Backend specialities, listed as chips under the hero intro so the reader
 * can scan them instead of parsing a long sentence.
 */
export const specialities: string[] = [
  'Advanced Eloquent modelling',
  'Complex query optimisation',
  'Redis caching strategies',
  'Queue-driven processing',
  'Domain-driven structure',
]

/**
 * What I actually spend my time on, shown as cards under the hero.
 * Each entry paraphrases a bullet already present in data/experience.ts —
 * nothing here is invented.
 */
export type FocusArea = {
  title: string
  description: string
  /** Lucide icon name resolved in components/sections/Hero.tsx */
  icon: 'api' | 'report' | 'layers'
}

export const focusAreas: FocusArea[] = [
  {
    title: 'REST APIs',
    description:
      'Laravel APIs that back iOS and Android apps — versioned endpoints, predictable payloads.',
    icon: 'api',
  },
  {
    title: 'Automated reporting',
    description:
      'Cron-driven productivity reports that mail performance summaries and activity logs to admins.',
    icon: 'report',
  },
  {
    title: 'Service layers',
    description:
      'Reusable service classes for users, tasks and time tracking that cut duplication across the codebase.',
    icon: 'layers',
  },
]

/** Navigation entries. Section ids must match the <section id="..."> in page.tsx */
export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const
