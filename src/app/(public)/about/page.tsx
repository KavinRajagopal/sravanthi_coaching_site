export const revalidate = 300

import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Instagram } from "lucide-react"
import { getPayload } from "@/lib/payload-client"
import { BlockRenderer } from "@/components/public/BlockRenderer"
import { CTASection } from "@/components/public/sections/CTASection"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"
import { Button } from "@/components/ui/button"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sravanthi.com"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Sravanthi Prattipati — emcee, speaker coach, and event host.",
  alternates: { canonical: "/about" },
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
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/sravanthi-about.jpeg"
                    alt="Sravanthi Prattipati — Professional Emcee on stage"
                    fill
                    className="object-cover object-top"
                  />
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
                  I am an Indian-American — born in India and raised in the U.S. — which allows me to bring the best of both worlds to the stage. I am fluent in English, Telugu, and Hindi, and conversational in Tamil, which enables me to connect seamlessly with diverse audiences in a warm and inclusive way.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="text-brand-muted leading-relaxed">
                  What began as a happy accident has grown into my true profession. I have emceed over 100 events across a wide range of formats: from intimate cultural gatherings to large-scale concerts and political events with 5,000+ attendees.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <p className="text-brand-muted leading-relaxed">
                  As a speaker coach, I also help professionals and aspiring speakers find their voice and own the stage — whether it&apos;s a boardroom presentation, a keynote, or a personal milestone.
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

      {/* Highlights — Embedded Instagram Reels */}
      <section className="bg-brand-elevated py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">Portfolio</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-brand-text leading-[1.1]">
              Some Highlights
            </h2>
            <div className="mt-6 mx-auto w-12 h-px bg-brand-gold" />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { category: "Politicians", shortcode: "DKbMed7AqPO" },
              { category: "Celebrities", shortcode: "DJTBdGeMgm6" },
              { category: "Concerts", shortcode: "DM_pL_utZWL" },
              { category: "Beauty Pageant", shortcode: "DJsQbGzyHXr" },
              { category: "Cultural Events", shortcode: "C-txGqrt4BH" },
              { category: "RJ & Radio", shortcode: "DKA4zOttDk4" },
            ].map((item, i) => (
              <ScrollReveal key={item.category} delay={i * 0.08}>
                <div className="bg-white border border-brand-border overflow-hidden hover:border-brand-gold/40 transition-all duration-300">
                  <div className="p-4 pb-0">
                    <h3 className="font-display text-xl text-brand-text font-light text-center">{item.category}</h3>
                  </div>
                  <iframe
                    src={`https://www.instagram.com/reel/${item.shortcode}/embed/`}
                    className="w-full border-0"
                    height="480"
                    scrolling="no"
                    allowTransparency
                    allow="encrypted-media"
                    title={`${item.category} reel`}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4} className="mt-12 text-center">
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="https://www.instagram.com/sravanthi_prattipati"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold-light transition-colors text-sm tracking-widest uppercase"
              >
                <Instagram size={16} /> @sravanthi_prattipati
              </a>
              <a
                href="https://www.instagram.com/emcee_sravz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold-light transition-colors text-sm tracking-widest uppercase"
              >
                <Instagram size={16} /> @emcee_sravz
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </>
  )
}
