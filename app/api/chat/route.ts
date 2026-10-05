import { NextResponse } from 'next/server'
import { aiConfig } from '@/lib/ai-config'
import { buildSystemPrompt } from '@/lib/assistant-context'
import { chatRequestSchema } from '@/lib/chat-schema'
import { clientKey, rateLimit } from '@/lib/rate-limit'

// Streaming needs a Node runtime and must never be statically optimised.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** 15 messages per IP per 10 minutes. See lib/rate-limit.ts for the caveat. */
const RATE_LIMIT = 15
const RATE_WINDOW_MS = 10 * 60 * 1000

/** Answers are short by design: bounds cost and keeps replies panel-sized. */
const MAX_TOKENS = 400

/** Give up rather than hold the visitor on a spinner indefinitely. */
const REQUEST_TIMEOUT_MS = 30_000

function errorResponse(message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json({ ok: false, message }, { status, headers })
}

function textResponse(body: BodyInit, extraHeaders?: HeadersInit) {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
  })
}

export async function POST(request: Request) {
  if (!aiConfig.apiKey) {
    console.error('[chat] AI_API_KEY is not set')
    return errorResponse('The assistant is not configured yet.', 503)
  }

  const limit = rateLimit(clientKey(request), RATE_LIMIT, RATE_WINDOW_MS)
  if (!limit.ok) {
    return errorResponse(
      "You've sent a lot of messages. Please try again in a few minutes, or use the contact form.",
      429,
      { 'Retry-After': String(limit.retryAfter) }
    )
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return errorResponse('Invalid request body.', 400)
  }

  const parsed = chatRequestSchema.safeParse(payload)
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? 'Invalid message.', 422)
  }

  /*
   * Assistant turns are truncated rather than rejected (see lib/chat-schema.ts),
   * which can leave an empty string. Providers reject empty content, so drop
   * those before they go upstream — the visitor's own turn is never empty.
   */
  const history = parsed.data.messages.filter((m) => m.content.length > 0)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  let upstream: Response
  try {
    upstream = await fetch(`${aiConfig.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${aiConfig.apiKey}`,
      },
      body: JSON.stringify({
        model: aiConfig.model,
        stream: true,
        max_tokens: MAX_TOKENS,
        // Low but non-zero: keeps answers factual without making them robotic.
        temperature: 0.3,
        messages: [
          { role: 'system', content: buildSystemPrompt() },
          ...history,
        ],
      }),
      signal: controller.signal,
    })
  } catch (error) {
    clearTimeout(timeout)
    if ((error as Error).name === 'AbortError') {
      return errorResponse('The assistant took too long to respond. Please try again.', 504)
    }
    console.error('[chat] could not reach the provider', error)
    return errorResponse('The assistant is unreachable right now.', 502)
  }

  /*
   * Unlike an SDK stream, fetch gives us the HTTP status before any body is
   * read — so every upstream failure is still mappable to a real status code
   * here, rather than surfacing as a 200 with an apology inside the stream.
   */
  if (!upstream.ok || !upstream.body) {
    clearTimeout(timeout)
    const detail = await upstream.text().catch(() => '')
    console.error('[chat] provider error', upstream.status, detail.slice(0, 500))

    if (upstream.status === 401 || upstream.status === 403) {
      return errorResponse('The assistant is not configured correctly.', 503)
    }
    if (upstream.status === 429) {
      return errorResponse('The assistant is busy right now. Please try again shortly.', 429)
    }
    if (upstream.status === 404) {
      // Almost always a wrong or retired AI_MODEL value.
      return errorResponse('The assistant is misconfigured.', 503)
    }
    return errorResponse('The assistant is unavailable right now.', 502)
  }

  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  const reader = upstream.body.getReader()

  const body = new ReadableStream<Uint8Array>({
    async start(streamController) {
      // SSE frames can split across chunks, so hold the remainder between reads.
      let buffer = ''
      let emitted = false

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          // The last element may be a partial line — keep it for the next read.
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed.startsWith('data:')) continue

            const data = trimmed.slice(5).trim()
            if (data === '[DONE]') continue

            try {
              const chunk = JSON.parse(data)
              const text = chunk?.choices?.[0]?.delta?.content
              if (typeof text === 'string' && text.length > 0) {
                emitted = true
                streamController.enqueue(encoder.encode(text))
              }
            } catch {
              // A malformed frame is not worth failing the whole answer over.
            }
          }
        }

        // Upstream closed without ever sending content: say something rather
        // than leaving an empty bubble on screen.
        if (!emitted) {
          streamController.enqueue(
            encoder.encode(
              "Sorry — I couldn't generate an answer for that. Try rephrasing, or email directly."
            )
          )
        }
      } catch (error) {
        console.error('[chat] stream interrupted', error)
        streamController.enqueue(
          encoder.encode('\n\n(Sorry — the answer was cut short. Please try again.)')
        )
      } finally {
        clearTimeout(timeout)
        streamController.close()
      }
    },
    cancel() {
      // Visitor closed the panel mid-answer: stop the upstream generation.
      clearTimeout(timeout)
      controller.abort()
      reader.cancel().catch(() => {})
    },
  })

  return textResponse(body, { 'X-RateLimit-Remaining': String(limit.remaining) })
}
