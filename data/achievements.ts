/**
 * Achievement counters.
 *
 * The resume lists no awards, no certifications and no quantified impact
 * metrics, so these counters are limited strictly to facts the resume states:
 * employment start year, number of employers, and number of listed projects.
 *
 * TODO: Add awards / recognitions from resume — none present.
 * TODO: Add quantified impact metrics — none present.
 */

/** Career start year, from the earliest role on the resume (Cybooz, 2022). */
export const CAREER_START_YEAR = 2022

/** Whole years of professional experience, computed at render time. */
export function yearsOfExperience(now: Date = new Date()): number {
  return Math.max(1, now.getFullYear() - CAREER_START_YEAR)
}

export type Stat = {
  /** Numeric target for the animated counter */
  value: number
  suffix?: string
  label: string
  /** Where the figure comes from, shown as small print under the number */
  note: string
  /** Lucide icon name resolved in components/sections/Achievements.tsx */
  icon: 'calendar' | 'building' | 'folder' | 'code'
}

export const stats: Stat[] = [
  {
    value: yearsOfExperience(),
    suffix: '+',
    label: 'Years of Experience',
    note: 'Professional development since 2022',
    icon: 'calendar',
  },
  {
    value: 2,
    label: 'Companies',
    note: 'Infinite Open-Source Solutions & Cybooz',
    icon: 'building',
  },
  {
    value: 3,
    label: 'Major Projects',
    note: 'Desklog, Rupbee and ERP',
    icon: 'folder',
  },
  {
    value: 15,
    suffix: '+',
    label: 'Technologies',
    note: 'Across frameworks, databases and tooling',
    icon: 'code',
  },
]
