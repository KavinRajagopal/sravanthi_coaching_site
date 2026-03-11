import { ScrollReveal } from "@/components/public/shared/ScrollReveal"

interface TestimonialsSectionProps {
  sectionTitle?: string
}

export function TestimonialsSection({
  sectionTitle = "What clients are saying",
}: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="bg-brand-elevated py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">Testimonials</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-brand-text leading-[1.1]">
            {sectionTitle}
          </h2>
          <div className="mt-6 mx-auto w-12 h-px bg-brand-gold" />
        </ScrollReveal>

        {/* Google Reviews Widget */}
        <ScrollReveal>
          <div className="elfsight-app-8b7cfee4-850d-4927-bb7c-d8c385bd6bac" data-elfsight-app-lazy />
        </ScrollReveal>
      </div>
    </section>
  )
}
