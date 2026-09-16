import type { MetadataRoute } from 'next'
import { personal } from '@/data/personal'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The API route has nothing to index.
      disallow: '/api/',
    },
    sitemap: `${personal.siteUrl}/sitemap.xml`,
  }
}
