import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/seo';

// 全站放行（包括各家 AI 爬虫，GEO 需要它们能抓到）
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
