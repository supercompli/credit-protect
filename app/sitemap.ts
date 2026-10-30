import type { MetadataRoute } from 'next';
import { pages } from '@/lib/content';
import { resources } from '@/lib/resources';

const SITE_URL = 'https://creditcovered.co.za';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '', ...Object.keys(pages), 'quote', 'faq', 'contact',
    'resources', ...resources.map((r) => `resources/${r.slug}`),
    'partners/apply',
  ];

  return [...new Set(paths)].map((path) => ({
    url: `${SITE_URL}/${path}`,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
