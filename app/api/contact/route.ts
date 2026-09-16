import { NextResponse } from 'next/server'
import { contactSchema, type ContactFieldErrors, type ContactInput } from '@/lib/contact-schema'

/**
 * Contact form endpoint.
 *
 * Current behaviour: validates the payload and logs it server-side.
 * No email is sent.
 *
 * TODO: wire up an email provider (e.g. Resend, SendGrid or Nodemailer) here.
 * The validated payload is available as `data` below — send it to
 * nsav1995@gmail.com and return the same response shape so the client form
 * keeps working unchanged.
 */
export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Invalid request body.' },
      { status: 400 }
    )
  }

  const parsed = contactSchema.safeParse(payload)

  if (!parsed.success) {
    // Collapse Zod issues into one message per field for the form to render.
    const errors: ContactFieldErrors = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactInput
      errors[key] ??= issue.message
    }

    return NextResponse.json(
      { ok: false, message: 'Please fix the highlighted fields.', errors },
      { status: 422 }
    )
  }

  const data = parsed.data

  // Server-side record of the submission until a mail provider is connected.
  console.info('[contact] new submission', {
    name: data.name,
    email: data.email,
    subject: data.subject,
    receivedAt: new Date().toISOString(),
  })

  return NextResponse.json({
    ok: true,
    message: "Thanks for reaching out — I'll get back to you soon.",
  })
}
