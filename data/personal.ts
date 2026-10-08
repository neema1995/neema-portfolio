/**
 * Personal details.
 * Every value here is taken verbatim from the source resume.
 * Fields absent from the resume are marked with TODO rather than invented.
 */

export type SocialLink = {
  label: string
  href: string
  /** Key used to pick the icon in components/sections/Footer.tsx */
  icon: 'linkedin' | 'github' | 'mail' | 'phone'
}

const DEFAULT_SITE_URL = 'https://neema-portfolio-rbef-mauve.vercel.app'

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
  /** Primary role, as printed on the resume headline */
  role: 'Backend Engineer',
  /** Rotating titles for the hero typewriter — both appear on the resume */
  roles: ['Backend Engineer', 'Software Engineer'],
  dateOfBirth: '18 / 11 / 1995',
  email: 'nsav1995@gmail.com',
  phone: '+91 9497051348',
  /** Full postal address from the resume header */
  address: 'AchamVeettil (h), Poovattuparamba P.O, Calicut [dist], Pin: 673008',
  /** Short form used in the hero and SEO title */
  location: 'Calicut, Kerala, India',
  /**
   * NOTE: the resume STILL lists this LinkedIn URL in truncated form, so it is
   * a dead link. app/layout.tsx drops it from the JSON-LD `sameAs` until the
   * handle looks real, and lib/assistant-context.ts withholds it from the
   * assistant for the same reason.
   * TODO: replace with the full LinkedIn profile URL.
   */
  linkedin: 'https://www.linkedin.com/in/ne',

  github: 'https://github.com/neema1995',

  /** Professional Summary, quoted from the resume */
  objective:
    'Backend engineer building a multi-tenant SaaS platform used by 500+ organizations. Cut report generation time by 60% with MySQL optimization and Redis caching. Builds REST APIs and AI API integrations with PHP, Laravel, MySQL, Vue.js and Redis. Working knowledge of AWS (EC2, RDS, S3).',

  /** Path to the downloadable CV. TODO: drop the real PDF at public/resume.pdf */
  resumeUrl: '/resume.pdf',

  /** Canonical site origin — override with NEXT_PUBLIC_SITE_URL in .env.local */
  siteUrl: resolveSiteUrl(),
} as const

export const socials: SocialLink[] = [
  { label: 'GitHub', href: personal.github, icon: 'github' },
  { label: 'LinkedIn', href: personal.linkedin, icon: 'linkedin' },
  { label: 'Email', href: `mailto:${personal.email}`, icon: 'mail' },
  { label: 'Phone', href: `tel:${personal.phone.replace(/\s/g, '')}`, icon: 'phone' },
]

/**
 * Backend specialities, listed as chips under the hero intro so the reader
 * can scan them instead of parsing a long sentence.
 */
export const specialities: string[] = [
  'Multi-tenant SaaS',
  'MySQL query optimisation',
  'Redis caching',
  'Queue jobs & batches',
  'Payment integrations',
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
  icon: 'saas' | 'speed' | 'api'
}

export const focusAreas: FocusArea[] = [
  {
    title: 'Multi-tenant SaaS',
    description:
      'Built and scaled Desklog, a multi-tenant platform now used by 500+ organizations.',
    icon: 'saas',
  },
  {
    title: 'Performance',
    description:
      'Cut report generation time by 60% through MySQL query optimisation and Redis caching.',
    icon: 'speed',
  },
  {
    title: 'APIs & integrations',
    description:
      'Laravel REST APIs for iOS and Android, plus Stripe, Razorpay, webhooks and SSO.',
    icon: 'api',
  },
]

/** Navigation entries. Section ids must match the <section id="..."> in page.tsx */
export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const
