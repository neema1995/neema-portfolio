'use client'

import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Linkedin, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Card, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/SectionHeading'
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
    { Icon: Mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}`, external: false },
    { Icon: Phone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone.replace(/\s/g, '')}`, external: false },
    { Icon: Linkedin, label: 'LinkedIn', value: 'View profile', href: personal.linkedin, external: true },
    { Icon: MapPin, label: 'Location', value: personal.address, href: null, external: false },
  ]

  return (
    <section id="contact" aria-labelledby="contact-heading" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div id="contact-heading">
          <SectionHeading
            eyebrow="Contact"
            title="Let's work together"
            subtitle="Have a project or a role in mind? Send a message and I'll get back to you."
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 lg:grid-cols-5"
        >
          {/* Contact details */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Card className="h-full">
              <CardTitle className="mb-5">Get in touch</CardTitle>
              <ul className="space-y-5">
                {details.map(({ Icon, label, value, href, external }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="break-words text-sm hover:text-primary"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="break-words text-sm">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Form */}
          <motion.div variants={fadeInUp} className="lg:col-span-3">
            <Card>
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
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
                      'w-full resize-y rounded-2xl border bg-background/50 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20',
                      errors.message ? 'border-destructive' : 'border-border'
                    )}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-xs text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />{' '}
                      Send Message
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
                      'flex items-center gap-2 rounded-xl border px-4 py-3 text-sm',
                      status === 'success'
                        ? 'border-primary/30 bg-primary/10 text-primary'
                        : 'border-destructive/30 bg-destructive/10 text-destructive'
                    )}
                  >
                    {status === 'success' ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 shrink-0" />
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
          'w-full rounded-full border bg-background/50 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20',
          error ? 'border-destructive' : 'border-border'
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
