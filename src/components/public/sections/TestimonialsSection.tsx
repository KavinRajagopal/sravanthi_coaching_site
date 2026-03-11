import Image from "next/image"
import { Star } from "lucide-react"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"

interface Testimonial {
  id: string
  quote: string
  clientName: string
  clientTitle?: string
  company?: string
  result?: string
  rating?: number
  image?: { url: string; alt: string } | null
}

interface TestimonialsSectionProps {
  sectionTitle?: string
  testimonials?: Testimonial[]
}

const defaultTestimonials: Testimonial[] = [
  { id: "1", quote: "Working with Sravanthi completely transformed how I show up on stage. I used to shrink — now I own every room I walk into. My TEDx application was accepted three weeks after we finished our program.", clientName: "Priya Mehta", clientTitle: "Founder & CEO", company: "Meridian Ventures", result: "Accepted for TEDx Talk", rating: 5 },
  { id: "2", quote: "I've done presentation skills training before, but this was completely different. Sravanthi works at the identity level. The shift in my executive presence has been recognized by my leadership team and my clients.", clientName: "James Okonkwo", clientTitle: "VP of Engineering", company: "TechScale Inc.", result: "Promoted 3 months after coaching", rating: 5 },
  { id: "3", quote: "I was terrified of public speaking. Now I actively seek out speaking opportunities. Sravanthi didn't just teach me techniques — she helped me find my voice and trust it completely.", clientName: "Aisha Rahman", clientTitle: "Senior Manager", company: "Global Finance Corp", result: "Delivered keynote at industry conference", rating: 5 },
  { id: "4", quote: "The ROI on this coaching has been extraordinary. Within 6 months I landed two major speaking engagements and my consulting rates doubled. Sravanthi's method is the real deal.", clientName: "Carlos Vega", clientTitle: "Leadership Consultant", company: "Independent", result: "Doubled consulting rates", rating: 5 },
  { id: "5", quote: "Sravanthi has a rare gift for seeing exactly what's holding you back and creating the precise environment to break through it. My communication style has completely elevated.", clientName: "Dr. Sarah Lin", clientTitle: "Medical Director", company: "HealthBridge", result: "Conference keynote speaker", rating: 5 },
  { id: "6", quote: "I came in thinking I needed to improve my delivery. What I discovered was that I needed to stop hiding. Sravanthi helped me step fully into who I am as a communicator. Genuinely life-changing.", clientName: "Marcus Thompson", clientTitle: "Entrepreneur", company: "ThinkShift Labs", result: "Featured in Forbes 30 Under 30", rating: 5 },
]

export function TestimonialsSection({
  sectionTitle = "What clients are saying",
  testimonials = defaultTestimonials,
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

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.id} delay={(i % 3) * 0.1} className="break-inside-avoid">
              <div className="bg-white border border-brand-border p-8 hover:border-brand-gold/40 transition-all duration-300">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating || 5 }).map((_, j) => (
                    <Star key={j} size={12} className="text-brand-gold fill-brand-gold" />
                  ))}
                </div>

                {/* Decorative quote mark */}
                <div className="font-display text-6xl text-brand-gold/20 leading-none -mb-2">&ldquo;</div>

                <blockquote className="font-display text-lg text-brand-text font-light leading-relaxed italic mb-6">
                  {t.quote}
                </blockquote>

                {t.result && (
                  <div className="mb-4 inline-block bg-brand-gold/10 border border-brand-gold/30 px-3 py-1">
                    <p className="text-brand-gold text-xs tracking-wide">{t.result}</p>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-4 border-t border-brand-border">
                  {t.image ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                      <Image src={t.image.url} alt={t.image.alt} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0">
                      <span className="text-brand-gold text-sm font-display font-light">
                        {t.clientName.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-brand-text text-sm font-medium">{t.clientName}</p>
                    <p className="text-brand-muted text-xs">
                      {t.clientTitle}{t.company ? `, ${t.company}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
