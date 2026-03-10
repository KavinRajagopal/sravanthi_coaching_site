import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"
import { getPayload } from "@/lib/payload-client"
import { CTASection } from "@/components/public/sections/CTASection"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Services",
  description: "Speaker coaching programs — 1:1 coaching, group programs, VIP intensives, and speaking engagements.",
}

export default async function ServicesPage() {
  let services: any[] = []

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: "services",
      where: { status: { equals: "published" } },
      sort: "order",
    })
    services = result.docs
  } catch {}

  const defaultServices = [
    { id: "1", title: "Signature 1:1 Coaching", tagline: "The deep-dive transformation", summary: "An intimate, high-touch coaching experience tailored entirely to your speaking goals.", outcomes: [{ outcome: "Weekly 1:1 coaching sessions" }, { outcome: "Personalized speaker development roadmap" }, { outcome: "Video review & feedback" }], format: "Virtual 1:1", duration: "3 or 6 months", ctaLabel: "Apply Now", ctaHref: "/book-call", featured: true, slug: "private-coaching" },
    { id: "2", title: "Group Coaching Program", tagline: "Grow with your peers", summary: "A cohort-based program designed for professionals who want expert guidance and community.", outcomes: [{ outcome: "Weekly group coaching calls" }, { outcome: "Live practice & feedback" }, { outcome: "Private community access" }], format: "Group + 1:1", duration: "8 weeks", ctaLabel: "Join Waitlist", ctaHref: "/book-call", featured: false, slug: "group-program" },
    { id: "3", title: "VIP Intensive Day", tagline: "Accelerated transformation", summary: "A focused full-day experience to breakthrough your biggest speaking blocks.", outcomes: [{ outcome: "Full-day private coaching" }, { outcome: "Speaker identity deep-work" }, { outcome: "30-day follow-up support" }], format: "Virtual or In-Person", duration: "1 day", ctaLabel: "Book Your Day", ctaHref: "/book-call", featured: false, slug: "vip-intensive" },
    { id: "4", title: "Book Sravanthi to Speak", tagline: "Bring her to your event", summary: "Book Sravanthi as a keynote speaker, workshop facilitator, or panelist.", outcomes: [{ outcome: "Keynote presentations" }, { outcome: "Workshop facilitation" }, { outcome: "Corporate training" }], format: "In-Person or Virtual", duration: "Custom", ctaLabel: "Enquire Now", ctaHref: "/book-call", featured: false, slug: "speaking" },
  ]

  const displayServices = services.length > 0 ? services : defaultServices

  return (
    <>
      <section className="bg-brand-black pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="mb-16 max-w-2xl">
            <p className="text-brand-gold font-sans text-xs tracking-[0.3em] uppercase mb-4">Programs</p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-brand-cream leading-[1.05]">
              Ways to Work Together
            </h1>
            <p className="mt-6 text-brand-muted text-lg leading-relaxed">
              Choose the path that fits where you are and where you want to go.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayServices.map((service: any, i: number) => (
              <ScrollReveal key={service.id} delay={i * 0.1}>
                <div className={`relative border h-full flex flex-col transition-all duration-300 ${service.featured ? "border-brand-gold bg-brand-elevated" : "border-brand-border bg-brand-surface hover:border-brand-gold/50"}`}>
                  {service.featured && (
                    <div className="absolute -top-3 left-6">
                      <Badge className="bg-brand-gold text-brand-black rounded-none text-xs tracking-widest uppercase px-3 py-1 font-sans">Most Popular</Badge>
                    </div>
                  )}
                  <div className="p-8 flex flex-col h-full">
                    {service.tagline && <p className="text-brand-gold text-xs tracking-[0.2em] uppercase mb-2 font-sans">{service.tagline}</p>}
                    <h2 className="font-display text-2xl md:text-3xl text-brand-cream font-light mb-4">{service.title}</h2>
                    <p className="text-brand-muted text-sm leading-relaxed mb-6">{service.summary}</p>
                    {service.outcomes?.length > 0 && (
                      <ul className="space-y-2 mb-8 flex-1">
                        {service.outcomes.slice(0, 4).map((o: any, j: number) => (
                          <li key={j} className="flex items-start gap-3 text-brand-muted text-sm">
                            <Check size={14} className="text-brand-gold mt-0.5 shrink-0" />
                            <span>{o.outcome}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-brand-border">
                      <div>
                        {service.duration && <p className="text-brand-muted text-xs">{service.duration}</p>}
                        {service.format && <p className="text-brand-muted text-xs">{service.format}</p>}
                      </div>
                      <Button asChild className={`flex items-center gap-2 px-6 py-4 text-sm tracking-widest uppercase rounded-none transition-all ${service.featured ? "bg-brand-gold text-brand-black hover:bg-brand-gold-light" : "bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black"}`}>
                        <Link href={service.slug ? `/services/${service.slug}` : (service.ctaHref || "/book-call")}>
                          {service.ctaLabel || "Learn More"} <ArrowRight size={14} />
                        </Link>
                      </Button>
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
