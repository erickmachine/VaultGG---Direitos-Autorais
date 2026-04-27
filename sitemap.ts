import { MetadataRoute } from 'next'
import { createServiceClient } from '@/lib/supabase/server'

const BASE_URL = 'https://vaultgg.com.br'

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: BASE_URL,                                    changeFrequency: 'daily',   priority: 1.0 },
  { url: `${BASE_URL}/marketplace`,                   changeFrequency: 'hourly',  priority: 0.95 },
  { url: `${BASE_URL}/vender`,                        changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${BASE_URL}/comprar-conta-valorant`,        changeFrequency: 'daily',   priority: 0.95 },
  { url: `${BASE_URL}/comprar-conta-lol`,             changeFrequency: 'daily',   priority: 0.95 },
  { url: `${BASE_URL}/comprar-conta-fortnite`,        changeFrequency: 'daily',   priority: 0.95 },
  { url: `${BASE_URL}/comprar-conta-cs2`,             changeFrequency: 'daily',   priority: 0.95 },
  { url: `${BASE_URL}/comprar-conta-free-fire`,       changeFrequency: 'daily',   priority: 0.95 },
  { url: `${BASE_URL}/blog`,                          changeFrequency: 'daily',   priority: 0.85 },
  { url: `${BASE_URL}/como-funciona`,                 changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/seguranca`,                     changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/auth/login`,                    changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE_URL}/auth/cadastro`,                 changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE_URL}/termos`,                        changeFrequency: 'monthly', priority: 0.3 },
  { url: `${BASE_URL}/privacidade`,                   changeFrequency: 'monthly', priority: 0.3 },
  { url: `${BASE_URL}/reembolso`,                     changeFrequency: 'monthly', priority: 0.3 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const supabase = createServiceClient()

    const [{ data: games }, { data: listings }, { data: blogPosts }] = await Promise.all([
      supabase.from('games').select('slug, updated_at').eq('is_active', true),
      supabase
        .from('listings')
        .select('id, updated_at')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(500),
      supabase
        .from('blog_posts')
        .select('slug, updated_at')
        .eq('published', true)
        .order('created_at', { ascending: false }),
    ])

    const gamePages: MetadataRoute.Sitemap = (games ?? []).map((g) => ({
      url: `${BASE_URL}/marketplace?game=${g.slug}`,
      lastModified: g.updated_at ? new Date(g.updated_at) : new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.85,
    }))

    const listingPages: MetadataRoute.Sitemap = (listings ?? []).map((l) => ({
      url: `${BASE_URL}/anuncio/${l.id}`,
      lastModified: l.updated_at ? new Date(l.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    const blogPages: MetadataRoute.Sitemap = (blogPosts ?? []).map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    return [...STATIC_PAGES, ...gamePages, ...listingPages, ...blogPages]
  } catch {
    // Se o banco falhar, retorna ao menos as páginas estáticas
    return STATIC_PAGES
  }
}
