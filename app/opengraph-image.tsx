import { ImageResponse } from 'next/og'
import { personal } from '@/data/personal'

export const runtime = 'edge'
export const alt = `${personal.name} — ${personal.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Social share card, generated from resume data so it never goes stale.
 * Uses system fonts only — no font fetch, so the edge render stays fast.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#ffffff',
          color: '#0f172a',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand bar, matching the blue primary token. */}
        <div style={{ display: 'flex', width: 96, height: 8, background: '#2563eb', borderRadius: 4 }} />
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 32, lineHeight: 1.05, letterSpacing: -3 }}>
          {personal.name}
        </div>
        <div style={{ fontSize: 40, marginTop: 16, color: '#2563eb', fontWeight: 600 }}>
          {personal.role}
        </div>
        <div style={{ fontSize: 28, marginTop: 28, color: '#334155' }}>
          Laravel · PHP · MySQL · Vue.js · REST APIs
        </div>
        <div style={{ fontSize: 24, marginTop: 12, color: '#64748b' }}>{personal.location}</div>
      </div>
    ),
    size
  )
}
