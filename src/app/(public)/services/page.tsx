import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { getPayload } from "@/lib/payload-client"
import { CTASection } from "@/components/public/sections/CTASection"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Services",
  description: "Emcee & hosting services and speaker coaching — professional event hosting and presentation skills training.",
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
    { id: "1", title: "Emcee & Hosting Services", tagline: "Your event, elevated", summary: "Professional emcee for weddings, Sangeets, corporate galas, celebrity interviews, and milestone celebrations.", outcomes: [{ outcome: "Weddings, Sangeets & Indian celebrations" }, { outcome: "Corporate events & conferences" }, { outcome: "Celebrity & VIP interviews" }], format: "In-Person or Virtual", duration: "Custom", ctaLabel: "Enquire Now", ctaHref: "/book-call", featured: true, slug: "mc-hosting" },
    { id: "2", title: "Speaking Coaching & Workshops", tagline: "Find your voice", summary: "1:1 coaching and group workshops to develop your speaking presence, confidence, and presentation skills.", outcomes: [{ outcome: "1:1 speaker coaching" }, { outcome: "Group workshops" }, { outcome: "Corporate training" }], format: "Virtual or In-Person", duration: "Custom", ctaLabel: "Book a Call", ctaHref: "/book-call", featured: false, slug: "speaking-coaching" },
  ]

  const displayServices = services.length > 0 ? services : defaultServices

  return (
    <>
      <section className="bg-brand-bg pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="mb-16 max-w-2xl">
            <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">Services</p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-brand-text leading-[1.05]">
              How We Can Work Together
            </h1>
            <p className="mt-6 text-brand-muted text-lg leading-relaxed">
              Professional MC services and speaker coaching for events and individuals.
            </p>
            <div className="mt-6 w-12 h-px bg-brand-gold" />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayServices.map((service: any, i: number) => (
              <ScrollReveal key={service.id} delay={i * 0.1}>
                <div className={`relative border h-full flex flex-col transition-all duration-300 ${service.featured ? "border-brand-gold bg-white" : "border-brand-border bg-white hover:border-brand-gold/50"}`}>
                  {service.featured && (
                    <div className="absolute -top-3 left-6">
                      <Badge className="bg-brand-gold text-white rounded-none text-xs tracking-widest uppercase px-3 py-1 font-sans">Featured</Badge>
                    </div>
                  )}
                  <div className="p-8 flex flex-col h-full">
                    {service.tagline && <p className="text-brand-muted text-xs tracking-[0.2em] uppercase mb-2 font-sans">{service.tagline}</p>}
                    <h2 className="font-display text-2xl md:text-3xl text-brand-text font-light mb-4">{service.title}</h2>
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
                      <Button asChild className={`flex items-center gap-2 px-6 py-4 text-sm tracking-widest uppercase rounded-none transition-all ${service.featured ? "bg-brand-gold text-white hover:bg-brand-gold-light" : "bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white"}`}>
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
