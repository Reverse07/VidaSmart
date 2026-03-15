import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/checkout/', '/carrito/'],
    },
    sitemap: 'https://vida-smart.vercel.app/sitemap.xml',
  }
}