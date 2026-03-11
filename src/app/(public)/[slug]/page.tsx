import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPayload } from "@/lib/payload-client"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"

const LEGAL_SLUGS: Record<string, string> = {
  "privacy-policy": "privacy",
  "terms": "terms",
  "cookie-policy": "cookies",
  "disclaimer": "disclaimer",
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const type = LEGAL_SLUGS[slug]
  if (!type) return {}
  return { title: slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") }
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params
  const type = LEGAL_SLUGS[slug]
  if (!type) notFound()

  let page: any = null

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: "legal-pages",
      where: { type: { equals: type } },
      limit: 1,
    })
    page = result.docs[0]
  } catch {}

  const title = slug.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")

  return (
    <section className="bg-brand-bg pt-32 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal>
          <h1 className="font-display text-5xl md:text-6xl font-light text-brand-text leading-[1.05] mb-4">
            {page?.title || title}
          </h1>
          {page?.updatedAt && (
            <p className="text-brand-muted text-sm mb-12">Last updated: {new Date(page.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          )}
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="prose max-w-none prose-p:text-brand-muted prose-headings:text-brand-text prose-headings:font-display prose-headings:font-light prose-a:text-brand-gold">
            {page?.content ? (
              <p className="text-brand-muted leading-relaxed">
                {typeof page.content === "string" ? page.content : "Policy content will appear here once added through the admin dashboard."}
              </p>
            ) : (
              <p className="text-brand-muted leading-relaxed">
                This {title.toLowerCase()} page is being prepared. Please check back soon or contact us at hello@sravanthi.com for any questions.
              </p>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
