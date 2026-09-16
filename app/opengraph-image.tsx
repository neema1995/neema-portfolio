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
          background: 'linear-gradient(135deg, #0c0c14 0%, #171433 55%, #0d2a33 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: '#9b8cff', textTransform: 'uppercase' }}>
          Portfolio
        </div>
        <div style={{ fontSize: 86, fontWeight: 700, marginTop: 20, lineHeight: 1.05 }}>
          {personal.name}
        </div>
        <div style={{ fontSize: 40, marginTop: 16, color: '#5ad9f0' }}>{personal.role}</div>
        <div style={{ fontSize: 26, marginTop: 28, color: '#a6a9bd' }}>
          Laravel · PHP · MySQL · Vue.js · REST APIs
        </div>
        <div style={{ fontSize: 24, marginTop: 14, color: '#7c7f94' }}>{personal.location}</div>
      </div>
    ),
    size
  )
}
