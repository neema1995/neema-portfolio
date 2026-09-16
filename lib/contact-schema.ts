import { z } from 'zod'

/**
 * Single source of truth for contact form validation.
 * Imported by both the client form and the API route so the rules cannot drift.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(80, 'Name is too long.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  subject: z
    .string()
    .trim()
    .min(3, 'Please enter a subject.')
    .max(120, 'Subject is too long.'),
  message: z
    .string()
    .trim()
    .min(10, 'Message should be at least 10 characters.')
    .max(2000, 'Message is too long.'),
})

export type ContactInput = z.infer<typeof contactSchema>

/** Field-keyed error map returned by the API and rendered under each input. */
export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>
