'use client'

import { useEffect, useRef, useState } from 'react'

type TypewriterProps = {
  /** Phrases cycled through, in order */
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  /** Pause once a word is fully typed */
  holdMs?: number
  className?: string
}

/**
 * Typewriter effect for the hero role titles.
 * Renders the live text in an aria-live region so screen readers announce
 * the roles rather than every intermediate keystroke.
 */
export function Typewriter({
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  holdMs = 1600,
  className,
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const current = words[wordIndex % words.length]

    // Word fully typed: hold, then start deleting.
    if (!deleting && text === current) {
      timer.current = setTimeout(() => setDeleting(true), holdMs)
      return () => clearTimeout(timer.current)
    }

    // Word fully deleted: advance to the next one.
    if (deleting && text === '') {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
      return
    }

    timer.current = setTimeout(
      () =>
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        ),
      deleting ? deletingSpeed : typingSpeed
    )
    return () => clearTimeout(timer.current)
  }, [text, deleting, wordIndex, words, typingSpeed, deletingSpeed, holdMs])

  return (
    <span className={className}>
      {/* Full list is exposed to assistive tech; the animation is decorative. */}
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true" className="ml-0.5 inline-block animate-caret text-primary">
        |
      </span>
    </span>
  )
}

type CounterProps = {
  to: number
  suffix?: string
  /** Total animation length in ms */
  duration?: number
  className?: string
}

/**
 * Counts from 0 up to `to` once the element scrolls into view.
 * Uses requestAnimationFrame with an ease-out curve rather than a spring so
 * the final value always lands exactly on the target.
 */
export function Counter({ to, suffix = '', duration = 1600, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true

        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          // easeOutExpo
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
          setValue(Math.round(eased * to))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [to, duration])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
