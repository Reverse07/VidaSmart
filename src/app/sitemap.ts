import { MetadataRoute } from 'next'
import { supabaseAdmin } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vida-smart.vercel.app'

  const { data: products } = await supabaseAdmin
    .from('products')
    .select('slug, created_at')
    .eq('is_active', true)

  const productUrls = (products ?? []).map(p => ({
    url: `${baseUrl}/productos/${p.slug}`,
    lastModified: new Date(p.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/productos`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/productos?cat=tech`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/productos?cat=mascotas`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...productUrls,
  ]
}