import { Metadata } from "next"
import Link from "next/link"
import { getPayload } from "@/lib/payload-client"
import { BlockRenderer } from "@/components/public/BlockRenderer"
import { CTASection } from "@/components/public/sections/CTASection"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"
import { Button } from "@/components/ui/button"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sravanthi.com"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Sravanthi Prattipati — emcee, speaker coach, and event host.",
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sravanthi Prattipati",
  url: SITE_URL,
  jobTitle: "Emcee & Speaker Coach",
  description: "Professional emcee, event host, and speaker coach helping professionals and organizations deliver unforgettable events.",
  knowsAbout: ["Emcee", "Event Hosting", "Public Speaking", "Speaker Coaching", "Stage Presence"],
  sameAs: [
    "https://www.linkedin.com/in/sravanthi-prattipati",
    "https://www.instagram.com/emcee_sravz/",
  ],
}

export default async function AboutPage() {
  let aboutPage = null

  try {
    const payload = await getPayload()
    const pages = await payload.find({
      collection: "pages",
      where: { and: [{ slug: { equals: "about" } }, { status: { equals: "published" } }] },
      limit: 1,
    })
    aboutPage = pages.docs[0]
  } catch {}

  if (aboutPage?.layout?.length) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <BlockRenderer blocks={aboutPage.layout as any[]} />
        <CTASection />
      </>
    )
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {/* Hero */}
      <section className="bg-brand-bg pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">About</p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-brand-text leading-[1.05] max-w-3xl">
              The person behind the mic
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-brand-bg py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <ScrollReveal direction="left">
              <div className="relative max-w-sm">
                <div className="relative aspect-[3/4] bg-brand-elevated border border-brand-border flex items-center justify-center">
                  <span className="text-brand-muted text-sm">Professional photo</span>
                </div>
              </div>
            </ScrollReveal>

            <div className="space-y-8">
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-3xl md:text-4xl text-brand-text font-light">
                  &ldquo;I believe every event deserves a host who makes it unforgettable.&rdquo;
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-brand-muted text-lg leading-relaxed">
                  Sravanthi Prattipati is a professional emcee, event host, and speaker coach who brings warmth, energy, and seamless flow to every stage she steps on.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="text-brand-muted leading-relaxed">
                  With experience across corporate events, galas, conferences, and product launches, Sravanthi brings a unique blend of professionalism and authenticity. She also coaches speakers and professionals to find their voice and own the stage.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <Button asChild className="bg-brand-gold hover:bg-brand-gold-light text-white px-8 py-5 text-sm tracking-widest uppercase rounded-none">
                  <Link href="/book-call">Work with Sravanthi</Link>
                </Button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
