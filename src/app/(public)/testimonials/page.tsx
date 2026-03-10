import { Metadata } from "next"
import Image from "next/image"
import { Star } from "lucide-react"
import { getPayload } from "@/lib/payload-client"
import { CTASection } from "@/components/public/sections/CTASection"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What speakers say about working with Sravanthi Prattipati.",
}

export default async function TestimonialsPage() {
  let testimonials: any[] = []

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: "testimonials",
      where: { status: { equals: "published" } },
      sort: "order",
    })
    testimonials = result.docs
  } catch {}

  const defaultTestimonials = [
    { id: "1", quote: "Working with Sravanthi completely transformed how I show up on stage. I used to shrink — now I own every room I walk into.", clientName: "Priya Mehta", clientTitle: "Founder & CEO", company: "Meridian Ventures", result: "Accepted for TEDx Talk", rating: 5 },
    { id: "2", quote: "The shift in my executive presence has been recognized by my leadership team and my clients.", clientName: "James Okonkwo", clientTitle: "VP of Engineering", company: "TechScale Inc.", result: "Promoted 3 months after coaching", rating: 5 },
    { id: "3", quote: "I was terrified of public speaking. Now I actively seek out speaking opportunities.", clientName: "Aisha Rahman", clientTitle: "Senior Manager", company: "Global Finance Corp", result: "Delivered keynote at industry conference", rating: 5 },
    { id: "4", quote: "The ROI on this coaching has been extraordinary. Within 6 months I landed two major speaking engagements and my consulting rates doubled.", clientName: "Carlos Vega", clientTitle: "Leadership Consultant", company: "Independent", result: "Doubled consulting rates", rating: 5 },
    { id: "5", quote: "My communication style has completely elevated. Sravanthi sees exactly what's holding you back.", clientName: "Dr. Sarah Lin", clientTitle: "Medical Director", company: "HealthBridge", result: "Conference keynote speaker", rating: 5 },
    { id: "6", quote: "Sravanthi helped me step fully into who I am as a communicator. Genuinely life-changing.", clientName: "Marcus Thompson", clientTitle: "Entrepreneur", company: "ThinkShift Labs", result: "Featured in Forbes 30 Under 30", rating: 5 },
  ]

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials

  return (
    <>
      <section className="bg-brand-black pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-brand-gold font-sans text-xs tracking-[0.3em] uppercase mb-4">Success Stories</p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-brand-cream leading-[1.05]">
              What speakers are saying
            </h1>
          </ScrollReveal>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {displayTestimonials.map((t: any, i: number) => (
              <ScrollReveal key={t.id} delay={(i % 3) * 0.1} className="break-inside-avoid">
                <div className="bg-brand-surface border border-brand-border p-8 hover:border-brand-gold/40 transition-all duration-300">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating || 5 }).map((_: any, j: number) => (
                      <Star key={j} size={12} className="text-brand-gold fill-brand-gold" />
                    ))}
                  </div>
                  <div className="font-display text-6xl text-brand-gold/20 leading-none -mb-2">"</div>
                  <blockquote className="font-display text-lg text-brand-cream font-light leading-relaxed italic mb-6">{t.quote}</blockquote>
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
                        <span className="text-brand-gold font-display">{t.clientName.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <p className="text-brand-cream text-sm font-medium">{t.clientName}</p>
                      <p className="text-brand-muted text-xs">{t.clientTitle}{t.company ? `, ${t.company}` : ""}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  )
}
