import { z } from 'zod'

/** Shared chat contract, imported by both the widget and the API route. */

/** Cap on what a VISITOR may type. Mirrored by maxLength on the input. */
export const MAX_MESSAGE_LENGTH = 500

/**
 * Cap on an assistant turn replayed back to us.
 *
 * This is deliberately separate from MAX_MESSAGE_LENGTH. The client resends
 * the whole conversation, so our own replies pass through validation too —
 * and a reply is routinely longer than a question. Capping both at 500 meant
 * the turn straight after any long answer was rejected.
 *
 * Replies are bounded upstream by max_tokens (~400 tokens), so this is
 * headroom rather than a real limit, and over-long input is truncated instead
 * of rejected: it is our own output, so failing on it is self-inflicted.
 */
export const MAX_REPLY_LENGTH = 4000

/** Turns kept in context. Each turn is resent, so this caps per-request cost. */
export const MAX_HISTORY = 12

const userMessageSchema = z.object({
  role: z.literal('user'),
  content: z
    .string()
    .trim()
    .min(1, 'Please type a question first.')
    .max(MAX_MESSAGE_LENGTH, `Please keep questions under ${MAX_MESSAGE_LENGTH} characters.`),
})

const assistantMessageSchema = z.object({
  role: z.literal('assistant'),
  content: z
    .string()
    .trim()
    .transform((value) => value.slice(0, MAX_REPLY_LENGTH)),
})

export const chatMessageSchema = z.discriminatedUnion('role', [
  userMessageSchema,
  assistantMessageSchema,
])

export const chatRequestSchema = z.object({
  messages: z
    .array(chatMessageSchema)
    .min(1, 'Send at least one message.')
    .max(MAX_HISTORY, 'This conversation is too long. Start a new chat.')
    // The API requires the conversation to end on a user turn.
    .refine((m) => m[m.length - 1]?.role === 'user', {
      message: 'The last message must come from the visitor.',
    }),
})

export type ChatMessage = z.infer<typeof chatMessageSchema>
