'use client'

import Image from 'next/image'
import { useState } from 'react'
import { personal } from '@/data/personal'

/** Drop a photo at public/images/profile.jpg and it replaces the monogram. */
const PHOTO_SRC = '/images/profile.jpg'

/** Initials shown while no photo is present. */
const initials = personal.name
  .split(' ')
  .slice(0, 2)
  .map((part) => part[0])
  .join('')

/**
 * Hero portrait.
 *
 * Renders the photo when one exists and silently falls back to the monogram
 * when it does not — so a missing or misnamed file shows the original
 * placeholder rather than a broken-image icon. Remove the fallback once the
 * photo is committed if you would rather fail loudly.
 */
export function Portrait() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`Portrait placeholder for ${personal.name}`}
        className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary-soft via-muted to-background shadow-card"
      >
        <span className="text-8xl font-bold tracking-tight text-primary/25">{initials}</span>
      </div>
    )
  }

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted shadow-card">
      <Image
        src={PHOTO_SRC}
        alt={`${personal.name}, ${personal.role}`}
        fill
        // The portrait column is ~45% of a 1152px container, full width on mobile.
        sizes="(max-width: 1024px) 100vw, 480px"
        className="object-cover"
        // Above the fold, so it should not be lazy-loaded.
        priority
        onError={() => setFailed(true)}
      />
    </div>
  )
}
