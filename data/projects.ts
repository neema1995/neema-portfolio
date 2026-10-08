/**
 * Projects, transcribed from the resume.
 *
 * The resume lists a name, description and tech stack — no repository and no
 * live URL — so links stay null and the cards render without a link row.
 *
 * TODO: Add live demo and source links for each project.
 */

export type Project = {
  name: string
  description: string
  tech: string[]
  /** null = no link on the resume; the card omits the link row. */
  liveUrl: string | null
  sourceUrl: string | null
}

export const projects: Project[] = [
  {
    name: 'Desklog',
    description:
      'Employee time tracker with projects, tasks and reports. Built its backend APIs, queues, payments and caching.',
    tech: [
      'PHP',
      'Laravel',
      'MySQL',
      'Redis',
      'Laravel Queues',
      'REST APIs',
      'Stripe',
      'Razorpay',
    ],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    name: 'Rupbee',
    description:
      'Banking cloud solution for NBFCs that processes transactions across branches.',
    // The resume types this as "Veu.js"; corrected to the real framework name.
    tech: ['PHP', 'Laravel', 'MySQL', 'Vue.js'],
    liveUrl: null,
    sourceUrl: null,
  },
]

/** Filter chips for the projects grid, derived from the tags above. */
export const projectFilters: string[] = [
  'All',
  ...Array.from(new Set(projects.flatMap((p) => p.tech))),
]
