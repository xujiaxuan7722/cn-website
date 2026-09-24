import type { MetadataRoute } from 'next';
import { SERIES } from '@/content/series';
import { SITE_URL } from '@/content/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/products`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/brand-story`, changeFrequency: 'monthly', priority: 0.7 },
    ...SERIES.map((s) => ({ url: `${SITE_URL}/series/${s.slug}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
  ];
}
