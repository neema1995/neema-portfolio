/**
 * Professional experience, transcribed from the resume.
 * Bullets are the resume's wording; tech tags are inferred only from
 * technologies named inside those same bullets.
 */

export type Experience = {
  company: string
  role: string
  period: string
  /** Optional — the resume gives a location for one employer only */
  location?: string
  bullets: string[]
  tech: string[]
}

export const experiences: Experience[] = [
  {
    company: 'Infinite Open-Source Solutions LLP',
    role: 'Software Engineer',
    period: '2023 – Present',
    location: 'Gov. Cyber Park (Sahya Building), Calicut, Kerala',
    bullets: [
      'Designed and developed RESTful APIs to support mobile applications (iOS / Android) in Laravel.',
      'Created an automated productivity email report system using cron jobs, sending detailed performance summaries and activity logs to admins at regular intervals (daily / weekly / monthly).',
      'Implemented task request system and time request system.',
      'Created service classes for user management, project task handling, and time tracking — reducing code duplication and improving application performance.',
    ],
    tech: ['Laravel', 'PHP', 'REST APIs', 'MySQL', 'Cron Jobs'],
  },
  {
    company: 'Cybooz IT Solutions',
    role: 'Web Developer',
    period: '2022 – 2023 · 1y 9m',
    // TODO: Add location — not stated on the resume for this employer.
    bullets: [
      'Developed and maintained scalable web applications using Laravel and PHP.',
      'Collaborated with frontend developers to implement responsive user interfaces using Vue.js and Tailwind CSS.',
      'Optimized database queries to improve application performance.',
    ],
    tech: ['Laravel', 'PHP', 'Vue.js', 'Tailwind CSS', 'MySQL'],
  },
]
