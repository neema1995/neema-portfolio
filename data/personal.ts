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

export const personal = {
  name: 'Neema Sunder AV',
  /** Primary role, as printed on the resume */
  role: 'Software Engineer',
  /** Rotating titles for the hero typewriter — all derived from the resume */
  roles: [
    'Software Engineer',
    'Laravel Developer',
    'Backend Engineer',
    'REST API Developer',
    'Vue.js Developer',
  ],
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
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://neema-sunder.vercel.app',
} as const

export const socials: SocialLink[] = [
  { label: 'LinkedIn', href: personal.linkedin, icon: 'linkedin' },
  { label: 'Email', href: `mailto:${personal.email}`, icon: 'mail' },
  { label: 'Phone', href: `tel:${personal.phone.replace(/\s/g, '')}`, icon: 'phone' },
  // TODO: Add GitHub link once a username is available.
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
