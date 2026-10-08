/**
 * Educational profile, transcribed from the resume.
 * The resume states no graduation year.
 * TODO: Add the graduation year.
 */

export type Education = {
  degree: string
  institution: string
  /** null until a year is supplied */
  year: string | null
}

export const education: Education[] = [
  {
    degree: 'B.Tech in Computer Science',
    institution: 'Cochin University of Science and Technology',
    year: null,
  },
]
