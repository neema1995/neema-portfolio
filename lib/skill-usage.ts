import { experiences } from '@/data/experience'
import { projects } from '@/data/projects'

/**
 * Tech labels are written slightly differently across the data files
 * ('RESTful APIs' in skills.ts vs 'REST APIs' in projects.ts), so compare on a
 * normalised key rather than the raw string.
 */
function normalise(tech: string): string {
  return tech
    .toLowerCase()
    .replace(/^restful /, 'rest ')
    .replace(/[.\s-]/g, '')
}

export type SkillUsage = {
  /** Projects on the resume that list this technology. */
  projects: string[]
  /** Employers on the resume that list this technology. */
  companies: string[]
}

/** Where a given skill actually shows up in the resume data. */
export function skillUsage(skill: string): SkillUsage {
  const key = normalise(skill)
  return {
    projects: projects.filter((p) => p.tech.some((t) => normalise(t) === key)).map((p) => p.name),
    companies: experiences
      .filter((e) => e.tech.some((t) => normalise(t) === key))
      .map((e) => e.company),
  }
}

/** Skills with production evidence rank above skills without it. */
export function evidenceScore(usage: SkillUsage): number {
  return usage.projects.length + usage.companies.length
}

/**
 * Turns a 0-100 level into words. The resume states no ratings (see the TODO
 * in data/skills.ts), so bands are deliberately coarse — no false precision.
 */
export function levelLabel(level: number): string {
  if (level >= 90) return 'Expert'
  if (level >= 80) return 'Advanced'
  if (level >= 70) return 'Proficient'
  return 'Working knowledge'
}

/** Filled segments out of 5, derived from the same bands as levelLabel. */
export function levelSegments(level: number): number {
  if (level >= 90) return 5
  if (level >= 80) return 4
  if (level >= 70) return 3
  return 2
}
