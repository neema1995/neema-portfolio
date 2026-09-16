import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import type { ReactNode } from 'react'
import './globals.css'
import { Providers } from './providers'
import { personal } from '@/data/personal'
import { skillTags } from '@/data/skills'

/*
 * Fonts are self-hosted by next/font at build time: no render-blocking request
 * to Google, and `display: swap` avoids invisible text while loading.
 */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const title = `${personal.name} — ${personal.role} | ${personal.location}`
/* Meta description: 158 characters, built from the resume's career objective. */
const description =
  'Software Engineer in Calicut, Kerala building scalable web apps with Laravel, PHP, MySQL and Vue.js. RESTful APIs, database design and performance optimization.'

export const metadata: Metadata = {
  metadataBase: new URL(personal.siteUrl),
  title: {
    default: title,
    template: `%s | ${personal.name}`,
  },
  description,
  keywords: [
    personal.name,
    'Software Engineer',
    'Laravel Developer',
    'Backend Developer',
    'PHP Developer',
    'Calicut',
    'Kerala',
    ...skillTags,
  ],
  authors: [{ name: personal.name, url: personal.siteUrl }],
  creator: personal.name,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    url: personal.siteUrl,
    siteName: `${personal.name} — Portfolio`,
    title,
    description,
    locale: 'en_IN',
    images: [
      {
        // Generated at request time by app/opengraph-image.tsx
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${personal.name} — ${personal.role}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image'],
    // TODO: Add a Twitter/X handle — none is listed on the resume.
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0c0c14' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
}

/** JSON-LD Person record, populated entirely from resume data. */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personal.name,
  jobTitle: personal.role,
  description: personal.objective,
  url: personal.siteUrl,
  email: `mailto:${personal.email}`,
  telephone: personal.phone,
  sameAs: [personal.linkedin],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'AchamVeettil (h), Poovattuparamba P.O',
    addressLocality: 'Calicut',
    addressRegion: 'Kerala',
    postalCode: '673008',
    addressCountry: 'IN',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Infinite Open-Source Solutions LLP',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Cochin University of Science and Technology',
  },
  knowsAbout: skillTags,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      // next-themes swaps this class on the client; suppress the expected mismatch.
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
