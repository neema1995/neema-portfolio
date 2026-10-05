'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Bot, MessageCircle, Send, Sparkles, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { MAX_HISTORY, MAX_MESSAGE_LENGTH, type ChatMessage } from '@/lib/chat-schema'
import { personal } from '@/data/personal'
import { cn } from '@/lib/utils'

/** Starter questions, phrased the way a recruiter would actually ask. */
const SUGGESTIONS = [
  'What have you built with Laravel?',
  'Tell me about your backend experience',
  'Which databases have you worked with?',
]

const GREETING = `Hi, I'm ${personal.name.split(' ')[0]}. Ask me about my experience, projects or the technologies I work with.`

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  // Keep the newest message in view as tokens arrive.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, streaming])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Escape closes the panel, matching the mobile nav's behaviour.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Abandon any in-flight request if the component goes away.
  useEffect(() => () => abortRef.current?.abort(), [])

  const atLimit = messages.length >= MAX_HISTORY

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || streaming || atLimit) return

    setError(null)
    setInput('')

    const history: ChatMessage[] = [...messages, { role: 'user', content: trimmed }]
    // Render the user turn plus an empty assistant turn to stream into.
    setMessages([...history, { role: 'assistant', content: '' }])
    setStreaming(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.message ?? 'The assistant is unavailable right now.')
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let answer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        answer += decoder.decode(value, { stream: true })
        // Replace the trailing assistant turn on each chunk.
        setMessages([...history, { role: 'assistant', content: answer }])
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      setError((err as Error).message)
      // Drop the empty assistant bubble so the error is the only feedback.
      setMessages(history)
    } finally {
      setStreaming(false)
      abortRef.current = null
    }
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? `Close the chat with ${personal.name.split(' ')[0]}` : `Chat with ${personal.name.split(' ')[0]}`}
        aria-expanded={open}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-card-hover transition-colors hover:bg-primary/90"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label={`Chat with ${personal.name.split(' ')[0]}`}
            className="fixed bottom-24 right-4 z-50 flex h-[min(32rem,calc(100vh-8rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card-hover sm:right-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border p-4">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary"
              >
                <Sparkles className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold tracking-tight">Chat with {personal.name.split(' ')[0]}</p>
                <p className="text-xs text-muted-foreground">AI trained on my CV</p>
              </div>
            </div>

            {/* Transcript */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
              <Bubble role="assistant">{GREETING}</Bubble>

              {messages.map((message, i) => (
                <Bubble key={i} role={message.role}>
                  {message.content ||
                    (streaming && i === messages.length - 1 ? <TypingDots /> : '')}
                </Bubble>
              ))}

              {messages.length === 0 && (
                <ul className="space-y-2 pt-1">
                  {SUGGESTIONS.map((question) => (
                    <li key={question}>
                      <button
                        type="button"
                        onClick={() => send(question)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                      >
                        {question}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {error && (
                <p role="status" className="rounded-lg bg-destructive/10 p-3 text-xs text-destructive">
                  {error}
                </p>
              )}

              {atLimit && (
                <p className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">
                  That&apos;s all I can cover here. For anything more, email me at{' '}
                  <a href={`mailto:${personal.email}`} className="text-primary hover:underline">
                    {personal.email}
                  </a>
                  .
                </p>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <label htmlFor="chat-input" className="sr-only">
                Ask {personal.name.split(' ')[0]} a question
              </label>
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={MAX_MESSAGE_LENGTH}
                disabled={streaming || atLimit}
                placeholder={atLimit ? 'Conversation ended' : 'Ask a question…'}
                className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={streaming || atLimit || !input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            <p className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
              AI version of {personal.name.split(' ')[0]} — for anything important, email me directly.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Bubble({ role, children }: { role: ChatMessage['role']; children: React.ReactNode }) {
  const isUser = role === 'user'
  return (
    <div className={cn('flex gap-2.5', isUser && 'justify-end')}>
      {!isUser && (
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary"
        >
          <Bot className="h-4 w-4" />
        </span>
      )}
      <div
        className={cn(
          'max-w-[85%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm leading-relaxed',
          isUser ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
        )}
      >
        {children}
      </div>
    </div>
  )
}

/** Shown in the assistant bubble until the first token arrives. */
function TypingDots() {
  return (
    <span className="flex gap-1 py-1" aria-label="Thinking">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  )
}
