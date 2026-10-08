/**
 * Skills, grouped exactly as the resume's "Technical Skills" section groups them.
 *
 * Proficiency values are NOT stated on the resume and remain estimates — they
 * drive the coarse Expert / Advanced / Proficient / Working-knowledge bands in
 * lib/skill-usage.ts, nothing finer. One exception is deliberate: the resume
 * itself calls AWS "working knowledge", so AWS is scored into that band rather
 * than guessed upward.
 * TODO: confirm the remaining levels.
 */

export type Skill = {
  name: string
  /** 0-100, bucketed into bands for display */
  level: number
}

export type SkillCategory = {
  /** Category label exactly as grouped on the resume */
  title: string
  /** Lucide icon name resolved in components/ui/SkillCard.tsx */
  icon: 'code' | 'layers' | 'database' | 'cloud' | 'architecture' | 'integrations'
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: 'code',
    skills: [
      { name: 'PHP', level: 95 },
      { name: 'SQL', level: 90 },
      { name: 'JavaScript', level: 80 },
      { name: 'HTML5', level: 85 },
      { name: 'CSS3', level: 85 },
    ],
  },
  {
    title: 'Frameworks',
    icon: 'layers',
    skills: [
      { name: 'Laravel', level: 95 },
      { name: 'Vue.js', level: 80 },
      { name: 'Tailwind CSS', level: 85 },
    ],
  },
  {
    title: 'Databases',
    icon: 'database',
    skills: [
      { name: 'MySQL', level: 92 },
      { name: 'Redis', level: 85 },
      { name: 'MongoDB', level: 72 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'cloud',
    skills: [
      // "working knowledge" is the resume's own wording for AWS.
      { name: 'AWS (EC2, RDS, S3)', level: 65 },
      { name: 'GitLab CI/CD', level: 78 },
      { name: 'GitHub', level: 88 },
    ],
  },
  {
    title: 'Architecture',
    icon: 'architecture',
    skills: [
      { name: 'REST APIs', level: 93 },
      { name: 'Multi-tenant SaaS', level: 90 },
      { name: 'Queue processing', level: 88 },
      { name: 'Caching', level: 88 },
    ],
  },
  {
    title: 'Integrations',
    icon: 'integrations',
    skills: [
      { name: 'Stripe', level: 85 },
      { name: 'Razorpay', level: 85 },
      { name: 'Webhooks', level: 85 },
      { name: 'SSO', level: 80 },
      { name: 'SMS Gateway', level: 80 },
      { name: 'AI APIs', level: 75 },
    ],
  },
]

/**
 * Flat technology list — every distinct technology named on the resume.
 * Feeds the ticker, the "Also familiar with" chips and the SEO keywords.
 */
export const skillTags: string[] = [
  'PHP',
  'Laravel',
  'MySQL',
  'Redis',
  'Vue.js',
  'JavaScript',
  'Tailwind CSS',
  'MongoDB',
  'SQL',
  'HTML5',
  'CSS3',
  'AWS',
  'GitLab CI/CD',
  'REST APIs',
  'Multi-tenant SaaS',
  'Queue Processing',
  'Caching',
  'Stripe',
  'Razorpay',
  'Webhooks',
  'SSO',
  'AI APIs',
]
