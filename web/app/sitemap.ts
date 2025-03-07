import type { MetadataRoute } from 'next';
import { User } from '@/app/constraint';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogsites = User?.blogs.map((blog) => ({
    url: `https://anirbanpaul.vercel.app/blogs/${blog.filename}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: 'https://anirbanpaul.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://anirbanpaul.vercel.app/blogs',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...blogsites,
  ];
}
