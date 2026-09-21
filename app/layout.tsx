import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import type { ReactNode } from 'react'
import './globals.css'
import { Providers } from './providers'
import { personal } from '@/data/personal'
import { skillTags } from '@/data/skills'
import { specialities } from '@/data/personal'

/*
 * Fonts are self-hosted by next/font at build time: no render-blocking request
 * to Google, and `display: swap` avoids invisible text while loading.
 */
const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
})

const title = `${personal.name} — ${personal.role} | ${personal.location}`
/* Meta description: 157 characters, mirroring the hero's positioning. */
const description =
  'Backend-focused Software Engineer in Calicut, Kerala. Laravel, PHP, MySQL and Vue.js — REST APIs, query optimisation, Redis caching and queue-driven systems.'

/*
 * The resume's LinkedIn URL is truncated (".../in/ne"), and a dead `sameAs`
 * weakens entity matching rather than helping it. Publish it only once the
 * handle looks real. See the TODO in data/personal.ts.
 */
const linkedInHandle = personal.linkedin.split('/in/')[1] ?? ''
const sameAs = linkedInHandle.length > 4 ? [personal.linkedin] : []

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
    ...specialities,
  ],
  authors: [{ name: personal.name, url: personal.siteUrl }],
  creator: personal.name,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
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
    { media: '(prefers-color-scheme: dark)', color: '#0b1220' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
}

/*
 * JSON-LD, published as a @graph so the page, the site and the person are
 * three linked entities rather than one loose Person blob. Every value comes
 * from the resume data — nothing is asserted that the site does not show.
 */
const personId = `${personal.siteUrl}/#person`
const siteId = `${personal.siteUrl}/#website`

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${personal.siteUrl}/#page`,
      url: personal.siteUrl,
      name: title,
      description,
      inLanguage: 'en-IN',
      isPartOf: { '@id': siteId },
      about: { '@id': personId },
      mainEntity: { '@id': personId },
      primaryImageOfPage: { '@id': `${personal.siteUrl}/#ogimage` },
    },
    {
      '@type': 'WebSite',
      '@id': siteId,
      url: personal.siteUrl,
      name: `${personal.name} — Portfolio`,
      description,
      inLanguage: 'en-IN',
      publisher: { '@id': personId },
    },
    {
      '@type': 'ImageObject',
      '@id': `${personal.siteUrl}/#ogimage`,
      url: `${personal.siteUrl}/opengraph-image`,
      width: 1200,
      height: 630,
      caption: `${personal.name} — ${personal.role}`,
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: personal.name,
      jobTitle: personal.role,
      description: personal.objective,
      url: personal.siteUrl,
      image: { '@id': `${personal.siteUrl}/#ogimage` },
      email: `mailto:${personal.email}`,
      telephone: personal.phone,
      // Omitted entirely when the profile URL is still truncated.
      ...(sameAs.length > 0 ? { sameAs } : {}),
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
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Calicut',
          addressRegion: 'Kerala',
          addressCountry: 'IN',
        },
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Cochin University of Science and Technology',
      },
      hasOccupation: {
        '@type': 'Occupation',
        name: personal.role,
        occupationLocation: {
          '@type': 'City',
          name: 'Calicut',
        },
        skills: [...skillTags, ...specialities].join(', '),
      },
      knowsAbout: [...skillTags, ...specialities],
      knowsLanguage: [{ '@type': 'Language', name: 'English' }],
    },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-IN"
      // next-themes swaps this class on the client; suppress the expected mismatch.
      suppressHydrationWarning
      className={dmSans.variable}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
