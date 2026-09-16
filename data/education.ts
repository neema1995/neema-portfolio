/**
 * Educational profile, transcribed from the resume.
 * The resume states no graduation years.
 * TODO: Add years for each qualification.
 */

export type Education = {
  degree: string
  institution: string
  /** null until years are supplied */
  year: string | null
}

export const education: Education[] = [
  {
    degree: 'B.Tech in Computer Science',
    institution: 'Cochin University of Science and Technology',
    year: null,
  },
  {
    degree: '12th',
    institution: 'Kerala Higher Secondary Examination Board',
    year: null,
  },
  {
    degree: '10th',
    institution: 'Kerala Board of Public Examination',
    year: null,
  },
]

/**
 * TODO: Add certifications from resume — the source resume lists none.
 * Shape kept ready so entries can be dropped in without touching components.
 */
export type Certification = {
  name: string
  issuer: string
  year: string
}

export const certifications: Certification[] = []
