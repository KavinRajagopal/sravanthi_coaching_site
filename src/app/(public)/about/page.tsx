import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getPayload } from "@/lib/payload-client"
import { BlockRenderer } from "@/components/public/BlockRenderer"
import { CTASection } from "@/components/public/sections/CTASection"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"
import { Button } from "@/components/ui/button"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sravanthi.com"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Sravanthi Prattipati — speaker coach, executive presence expert, and stage presence specialist.",
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sravanthi Prattipati",
  url: SITE_URL,
  jobTitle: "Speaker & Confidence Coach",
  description: "Speaker coach, executive presence expert, and communication strategist helping ambitious professionals develop stage presence and speaker identity.",
  knowsAbout: ["Public Speaking", "Executive Presence", "Speaker Coaching", "Stage Presence", "Communication"],
  sameAs: [
    "https://www.linkedin.com/in/sravanthi-prattipati",
    "https://www.instagram.com/sravanthicoaches",
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

  // Default about page
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {/* Hero */}
      <section className="bg-brand-black pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-brand-gold font-sans text-xs tracking-[0.3em] uppercase mb-4">About</p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-brand-cream leading-[1.05] max-w-3xl">
              The coach behind the transformation
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-brand-black py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <ScrollReveal direction="left">
              <div className="relative max-w-sm">
                <div className="absolute inset-0 border border-brand-gold/20 translate-x-6 translate-y-6" />
                <div className="relative aspect-[3/4] bg-brand-elevated flex items-center justify-center">
                  <span className="text-brand-muted text-sm">Professional photo</span>
                </div>
              </div>
            </ScrollReveal>

            <div className="space-y-8">
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-3xl md:text-4xl text-brand-cream font-light">
                  "I spent years watching brilliant people shrink themselves on stage. I decided to do something about it."
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-brand-muted text-lg leading-relaxed">
                  Sravanthi Prattipati is a speaker coach, executive presence expert, and communication strategist who works with ambitious professionals to develop the stage presence, confidence, and speaker identity that makes them unforgettable.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="text-brand-muted leading-relaxed">
                  Her work goes beyond presentation techniques. Sravanthi helps speakers discover their authentic speaking identity — the unique presence, perspective, and energy that makes an audience lean in. Her clients include executives, founders, emerging leaders, and professionals preparing for major career moments.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <p className="text-brand-muted leading-relaxed">
                  With 10+ years of experience and 200+ speakers coached across global industries, Sravanthi brings a rare combination of deep psychological insight, strategic brand thinking, and practical stage craft to every coaching relationship.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <Button asChild className="bg-brand-gold hover:bg-brand-gold-light text-brand-black px-8 py-5 text-sm tracking-widest uppercase rounded-none">
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
