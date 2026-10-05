/**
 * Fixed-window, per-key rate limiter held in process memory.
 *
 * LIMITATION: on Vercel each serverless instance has its own map, so the real
 * ceiling is (limit x number of warm instances), and everything resets on a
 * cold start. It stops a single visitor hammering one instance; it is NOT a
 * hard spend cap. For that, move this to Vercel KV or Upstash Redis — the
 * call site does not have to change, only the body of `rateLimit`.
 */
type Window = { count: number; resetAt: number }

const windows = new Map<string, Window>()

/** Drop expired entries so the map cannot grow without bound. */
function sweep(now: number) {
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key)
  }
}

export type RateLimitResult = {
  ok: boolean
  /** Requests still available in the current window. */
  remaining: number
  /** Seconds until the window resets — surfaced as Retry-After. */
  retryAfter: number
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now()
  if (windows.size > 500) sweep(now)

  const existing = windows.get(key)

  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, remaining: limit - 1, retryAfter: 0 }
  }

  existing.count += 1
  const retryAfter = Math.max(1, Math.ceil((existing.resetAt - now) / 1000))

  if (existing.count > limit) {
    return { ok: false, remaining: 0, retryAfter }
  }

  return { ok: true, remaining: limit - existing.count, retryAfter }
}

/** Best-effort client IP from the proxy headers Vercel sets. */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}
