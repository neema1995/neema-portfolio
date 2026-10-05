/**
 * Career timing helpers.
 *
 * The "By the numbers" section this file once fed has been removed; what is
 * left is the derived years-of-experience figure, still used by the hero and
 * by the assistant's system prompt.
 */

/** Career start year, from the earliest role on the resume (Cybooz, 2022). */
export const CAREER_START_YEAR = 2022

/** Whole years of professional experience, computed at render time. */
export function yearsOfExperience(now: Date = new Date()): number {
  return Math.max(1, now.getFullYear() - CAREER_START_YEAR)
}
