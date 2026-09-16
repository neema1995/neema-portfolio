/**
 * Skills, taken from the resume's "Core Skills" and "Skills" sections.
 *
 * Proficiency values are NOT stated on the resume. They are rendered as
 * relative skill meters only; adjust `level` to taste — see TODO below.
 * TODO: confirm proficiency levels (resume lists no ratings).
 */

export type Skill = {
  name: string
  /** 0-100, used by the animated skill bars */
  level: number
}

export type SkillCategory = {
  /** Category label exactly as grouped on the resume */
  title: string
  /** Lucide icon name resolved in components/ui/SkillCard.tsx */
  icon: 'layers' | 'database' | 'wrench' | 'sparkles'
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frameworks',
    icon: 'layers',
    skills: [
      { name: 'Laravel', level: 95 },
      { name: 'Vue.js', level: 82 },
      { name: 'Bootstrap', level: 85 },
    ],
  },
  {
    title: 'Databases',
    icon: 'database',
    skills: [
      { name: 'MySQL', level: 92 },
      { name: 'MongoDB', level: 75 },
      { name: 'PostgreSQL', level: 78 },
    ],
  },
  {
    title: 'Tools',
    icon: 'wrench',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Composer', level: 88 },
      { name: 'Docker', level: 76 },
      { name: 'PHPUnit', level: 80 },
      { name: 'Redis', level: 78 },
    ],
  },
  {
    title: 'Others',
    icon: 'sparkles',
    skills: [
      { name: 'RESTful APIs', level: 93 },
      { name: 'Unit Testing', level: 80 },
    ],
  },
]

/** Flat tag list — the resume's standalone "Skills" section, in its original order. */
export const skillTags: string[] = [
  'Laravel',
  'PHP',
  'MySQL',
  'MongoDB',
  'JavaScript',
  'Vue.js',
  'jQuery',
  'REST APIs',
  'Redis',
  'Git',
  'Docker',
  'AWS',
  'HTML5',
  'CSS3',
  'SQL',
]

/** Subset floated as animated badges in the hero. */
export const heroBadges: string[] = [
  'Laravel',
  'PHP',
  'MySQL',
  'Vue.js',
  'Redis',
  'Docker',
  'REST APIs',
  'AWS',
]
