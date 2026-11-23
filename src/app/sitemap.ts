import { siteConfig } from '@/config/site';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    {
      path: '',
      priority: 1.0,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/about',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/projects',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: {
        'pt-BR': `${siteConfig.url}${route.path}`,
        'en-US': `${siteConfig.url}${route.path}`,
      },
    },
  }));
}
