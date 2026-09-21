'use client'

import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Linkedin, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { contactSchema, type ContactFieldErrors, type ContactInput } from '@/lib/contact-schema'
import { personal } from '@/data/personal'
import { cn } from '@/lib/utils'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const EMPTY: ContactInput = { name: '', email: '', subject: '', message: '' }

export function Contact() {
  const [values, setValues] = useState<ContactInput>(EMPTY)
  const [errors, setErrors] = useState<ContactFieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [feedback, setFeedback] = useState('')

  function update<K extends keyof ContactInput>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }))
    // Clear a field's error as soon as the user edits it.
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Validate on the client first so obvious mistakes never hit the network.
    const parsed = contactSchema.safeParse(values)
    if (!parsed.success) {
      const fieldErrors: ContactFieldErrors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactInput
        fieldErrors[key] ??= issue.message
      }
      setErrors(fieldErrors)
      setStatus('error')
      setFeedback('Please fix the highlighted fields.')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      const body = await res.json()

      if (!res.ok) {
        setErrors(body.errors ?? {})
        setStatus('error')
        setFeedback(body.message ?? 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
      setFeedback(body.message ?? 'Thanks — your message has been received.')
      setValues(EMPTY)
    } catch {
      setStatus('error')
      setFeedback('Network error. Please email me directly instead.')
    }
  }

  const fields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', autoComplete: 'name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', autoComplete: 'email' },
    { name: 'subject', label: 'Subject', type: 'text', placeholder: 'What is this about?', autoComplete: 'off' },
  ] as const

  const details = [
    { icon: Mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}`, external: false },
    { icon: Phone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone.replace(/\s/g, '')}`, external: false },
    { icon: Linkedin, label: 'LinkedIn', value: 'View profile', href: personal.linkedin, external: true },
    { icon: MapPin, label: 'Location', value: personal.address, href: null, external: false },
  ]

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section">
      <div className="container-page">
        <SectionHeading
          id="contact-heading"
          eyebrow="Contact"
          title="Let's work together"
          subtitle="Have a project or a role in mind? Send a message and I'll get back to you."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"
        >
          {/* Contact details */}
          <motion.div variants={fadeInUp}>
            <Card className="p-0">
              <dl className="divide-y divide-border">
                {details.map(({ icon: Icon, label, value, href, external }) => (
                  <div key={label} className="flex gap-4 p-5">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="mt-1 break-words text-sm text-foreground">
                        {href ? (
                          <a
                            href={href}
                            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            className="rounded transition-colors hover:text-primary"
                          >
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Card>
          </motion.div>

          {/* Form */}
          <motion.div variants={fadeInUp}>
            <Card className="p-6 sm:p-8">
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  {fields.slice(0, 2).map((field) => (
                    <Field
                      key={field.name}
                      {...field}
                      value={values[field.name]}
                      error={errors[field.name]}
                      onChange={(v) => update(field.name, v)}
                    />
                  ))}
                </div>

                <Field
                  {...fields[2]}
                  value={values.subject}
                  error={errors.subject}
                  onChange={(v) => update('subject', v)}
                />

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={(e) => update('message', e.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    placeholder="Tell me about your project…"
                    className={cn(
                      'w-full resize-y rounded-lg border bg-background px-3.5 py-2.5 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20',
                      errors.message ? 'border-destructive' : 'border-input'
                    )}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-xs text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button type="submit" size="lg" disabled={status === 'submitting'} className="w-full">
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" /> Send message
                    </>
                  )}
                </Button>

                {/* Success / error banner, announced to assistive tech */}
                {feedback && status !== 'submitting' && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="status"
                    aria-live="polite"
                    className={cn(
                      'flex items-center gap-2 rounded-lg border p-3 text-sm',
                      status === 'success'
                        ? 'border-success/30 bg-success/10 text-success'
                        : 'border-destructive/30 bg-destructive/10 text-destructive'
                    )}
                  >
                    {status === 'success' ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    )}
                    {feedback}
                  </motion.p>
                )}
              </form>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/** Single labelled text input with inline error messaging. */
function Field({
  name,
  label,
  type,
  placeholder,
  autoComplete,
  value,
  error,
  onChange,
}: {
  name: string
  label: string
  type: string
  placeholder: string
  autoComplete: string
  value: string
  error?: string
  onChange: (value: string) => void
}) {
  const id = name
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'h-11 w-full rounded-lg border bg-background px-3.5 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20',
          error ? 'border-destructive' : 'border-input'
        )}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
