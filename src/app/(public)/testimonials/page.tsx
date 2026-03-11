import { Metadata } from "next"
import { CTASection } from "@/components/public/sections/CTASection"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What clients say about working with Sravanthi Prattipati.",
}

export default function TestimonialsPage() {
  return (
    <>
      <section className="bg-brand-bg pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">Testimonials</p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-brand-text leading-[1.05]">
              What clients are saying
            </h1>
            <div className="mt-6 mx-auto w-12 h-px bg-brand-gold" />
          </ScrollReveal>

          {/* Google Reviews Widget */}
          <ScrollReveal>
            <div className="elfsight-app-8b7cfee4-850d-4927-bb7c-d8c385bd6bac" data-elfsight-app-lazy />
          </ScrollReveal>
        </div>
      </section>
      <CTASection />
    </>
  )
}
