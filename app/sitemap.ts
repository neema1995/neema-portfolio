import type { MetadataRoute } from 'next'
import { personal } from '@/data/personal'

/** Single-page site, so the sitemap has one canonical entry. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: personal.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
