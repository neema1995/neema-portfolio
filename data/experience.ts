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
      'Built and scaled Desklog, a multi-tenant SaaS platform used by 500+ organizations.',
      'Cut report generation time by 60% through MySQL query optimization and Redis caching.',
      'Designed REST APIs in Laravel for the iOS and Android mobile apps.',
      'Moved bulk tasks and report generation to background queue jobs and batches (Laravel Bus).',
      'Automated daily, weekly, and monthly email reports to admins using cron jobs.',
      'Integrated Razorpay and Stripe for online payments and subscriptions.',
      'Implemented webhooks, SSO login, and the task and time request systems.',
      'Wrote service classes for users, tasks, and time tracking to reduce duplicate code.',
      /*
       * TODO: the resume has a ninth bullet here that is still an unfilled
       * placeholder — "Integrated AI APIs to [PLACEHOLDER: describe the AI
       * feature and its result]". It is omitted rather than guessed at.
       * Fill in the real feature and outcome, then add it back as:
       *   'Integrated AI APIs to <what it does>, <measurable result>.',
       * and add 'AI APIs' to the tech list below.
       */
    ],
    tech: [
      'Laravel',
      'PHP',
      'MySQL',
      'Redis',
      'REST APIs',
      'Laravel Queues',
      'Stripe',
      'Razorpay',
      'Webhooks',
      'SSO',
    ],
  },
  {
    company: 'Cybooz IT Solutions',
    role: 'Web Developer',
    period: '2022 – 2023',
    // TODO: Add location — not stated on the resume for this employer.
    bullets: [
      'Built and maintained web applications with Laravel and PHP.',
      'Optimized MySQL queries to improve application performance.',
      'Integrated an SMS system into client applications.',
      'Built responsive interfaces with frontend developers using Vue.js and Tailwind CSS.',
    ],
    tech: ['Laravel', 'PHP', 'MySQL', 'Vue.js', 'Tailwind CSS', 'SMS Gateway'],
  },
]
