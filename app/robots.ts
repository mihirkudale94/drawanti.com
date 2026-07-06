import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.drawanti.com/sitemap.xml',
    host: 'https://www.drawanti.com',
  };
}
