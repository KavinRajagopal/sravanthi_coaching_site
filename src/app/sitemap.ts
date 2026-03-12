import { MetadataRoute } from "next"
import { getPayload } from "@/lib/payload-client"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sravanthi.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const payload = await getPayload()
    const [services, posts, pages] = await Promise.all([
      payload.find({ collection: "services", where: { status: { equals: "published" } } }),
      payload.find({ collection: "blog-posts", where: { status: { equals: "published" } } }),
      payload.find({ collection: "pages", where: { status: { equals: "published" } }, limit: 100 }),
    ])

    const homePage = pages.docs.find((p: any) => p.slug === "home")
    const aboutPage = pages.docs.find((p: any) => p.slug === "about")

    const staticRoutes: MetadataRoute.Sitemap = [
      { url: SITE_URL, lastModified: homePage?.updatedAt ? new Date(homePage.updatedAt as string) : new Date("2026-03-01"), changeFrequency: "weekly", priority: 1 },
      { url: `${SITE_URL}/about`, lastModified: aboutPage?.updatedAt ? new Date(aboutPage.updatedAt as string) : new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.8 },
      { url: `${SITE_URL}/services`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.9 },
      { url: `${SITE_URL}/testimonials`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.7 },
      { url: `${SITE_URL}/blog`, lastModified: posts.docs[0]?.updatedAt ? new Date(posts.docs[0].updatedAt as string) : new Date("2026-03-01"), changeFrequency: "weekly", priority: 0.8 },
      { url: `${SITE_URL}/book-call`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.9 },
      { url: `${SITE_URL}/leadership-launchpad`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.8 },
    ]

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
    return [
      { url: SITE_URL, lastModified: new Date("2026-03-01"), changeFrequency: "weekly" as const, priority: 1 },
      { url: `${SITE_URL}/about`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly" as const, priority: 0.8 },
      { url: `${SITE_URL}/services`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly" as const, priority: 0.9 },
      { url: `${SITE_URL}/testimonials`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly" as const, priority: 0.7 },
      { url: `${SITE_URL}/blog`, lastModified: new Date("2026-03-01"), changeFrequency: "weekly" as const, priority: 0.8 },
      { url: `${SITE_URL}/book-call`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly" as const, priority: 0.9 },
    ]
  }
}
