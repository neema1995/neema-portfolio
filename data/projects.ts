/**
 * Projects, transcribed from the resume.
 *
 * The resume lists a name and description only — no tech stack, no repository
 * and no live URL. Tech tags below are limited to technologies the resume
 * attributes to this developer's work; links are left null on purpose.
 *
 * TODO: Add live demo and source links for each project.
 * TODO: Confirm the per-project tech stack (not specified on the resume).
 */

export type Project = {
  name: string
  description: string
  tech: string[]
  /** null = no link on the resume; the card renders the button disabled. */
  liveUrl: string | null
  sourceUrl: string | null
}

export const projects: Project[] = [
  {
    name: 'Desklog',
    description:
      'An automated productivity tracking software for monitoring employee online, idle, and offline time. Allows users to create projects and tasks, and generate detailed reports and analytics.',
    tech: ['Laravel', 'PHP', 'MySQL', 'Vue.js', 'Redis'],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    name: 'Rupbee',
    description:
      'A banking cloud solution for NBFCs that processes banking transactions across various branches.',
    tech: ['Laravel', 'PHP', 'MySQL', 'REST APIs'],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    name: 'ERP',
    description: 'Enterprise Resource Planning system.',
    tech: ['Laravel', 'PHP', 'MySQL'],
    liveUrl: null,
    sourceUrl: null,
  },
]

/** Filter chips for the projects grid, derived from the tags above. */
export const projectFilters: string[] = [
  'All',
  ...Array.from(new Set(projects.flatMap((p) => p.tech))),
]
