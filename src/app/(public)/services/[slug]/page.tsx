import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Check, ArrowLeft } from "lucide-react"
import { getPayload } from "@/lib/payload-client"
import { CTASection } from "@/components/public/sections/CTASection"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"
import { Button } from "@/components/ui/button"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload()
    const result = await payload.find({ collection: "services", where: { slug: { equals: slug } }, limit: 1 })
    const service = result.docs[0]
    if (service) return { title: service.title as string, description: service.summary as string }
  } catch {}
  return { title: "Service" }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  let service: any = null

  try {
    const payload = await getPayload()
    const result = await payload.find({ collection: "services", where: { and: [{ slug: { equals: slug } }, { status: { equals: "published" } }] }, limit: 1 })
    service = result.docs[0]
  } catch {}

  if (!service) notFound()

  return (
    <>
      <section className="bg-brand-bg pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <Link href="/services" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-gold text-sm tracking-widest uppercase mb-8 transition-colors">
              <ArrowLeft size={14} /> All Services
            </Link>
            {service.tagline && <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">{service.tagline}</p>}
            <h1 className="font-display text-5xl md:text-7xl font-light text-brand-text leading-[1.05] mb-6">{service.title}</h1>
            <p className="text-brand-muted text-xl leading-relaxed mb-12">{service.summary}</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {service.format && (
              <ScrollReveal delay={0.1} className="border border-brand-border p-5 bg-white">
                <p className="text-brand-gold text-xs tracking-widest uppercase mb-1 font-sans">Format</p>
                <p className="text-brand-text">{service.format}</p>
              </ScrollReveal>
            )}
            {service.duration && (
              <ScrollReveal delay={0.2} className="border border-brand-border p-5 bg-white">
                <p className="text-brand-gold text-xs tracking-widest uppercase mb-1 font-sans">Duration</p>
                <p className="text-brand-text">{service.duration}</p>
              </ScrollReveal>
            )}
            {service.pricing?.showPrice && service.pricing?.price && (
              <ScrollReveal delay={0.3} className="border border-brand-gold p-5 bg-brand-elevated">
                <p className="text-brand-gold text-xs tracking-widest uppercase mb-1 font-sans">{service.pricing.priceLabel || "Investment"}</p>
                <p className="text-brand-text font-display text-2xl">{service.pricing.price}</p>
              </ScrollReveal>
            )}
          </div>

          {service.outcomes?.length > 0 && (
            <ScrollReveal delay={0.2} className="mb-16">
              <h2 className="font-display text-3xl text-brand-text font-light mb-8">What&apos;s included</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.outcomes.map((o: any, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={16} className="text-brand-gold mt-0.5 shrink-0" />
                    <span className="text-brand-muted">{o.outcome}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          )}

          {service.targetAudience && (
            <ScrollReveal delay={0.3} className="mb-16 border-l-2 border-brand-gold pl-6">
              <h2 className="font-display text-2xl text-brand-text font-light mb-4">This is for you if...</h2>
              <p className="text-brand-muted leading-relaxed">{service.targetAudience}</p>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.4}>
            <Button asChild className="bg-brand-gold hover:bg-brand-gold-light text-white px-10 py-6 text-sm tracking-widest uppercase rounded-none">
              <Link href={service.ctaHref || "/book-call"}>{service.ctaLabel || "Apply Now"}</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
      <CTASection />
    </>
  )
}
