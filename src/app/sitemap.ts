import { MetadataRoute } from "next"
import { getPayload } from "@/lib/payload-client"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sravanthi.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/testimonials`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/book-call`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ]

  try {
    const payload = await getPayload()
    const [services, posts] = await Promise.all([
      payload.find({ collection: "services", where: { status: { equals: "published" } } }),
      payload.find({ collection: "blog-posts", where: { status: { equals: "published" } } }),
    ])

    const serviceRoutes: MetadataRoute.Sitemap = services.docs.map((s: any) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: new Date(s.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

    const blogRoutes: MetadataRoute.Sitemap = posts.docs.map((p: any) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))

    return [...staticRoutes, ...serviceRoutes, ...blogRoutes]
  } catch {
    return staticRoutes
  }
}
