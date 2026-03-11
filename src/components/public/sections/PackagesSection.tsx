"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"

interface PackageItem {
  name: string
  badge?: string
  features: string[]
  ctaLabel?: string
  ctaHref?: string
  highlighted?: boolean
}

const defaultPackages: PackageItem[] = [
  {
    name: "Silver",
    features: [
      "Intro call",
      "2 hours at the event",
      "Agenda provided by client a day before the event",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/book-call",
  },
  {
    name: "Gold",
    badge: "Most Popular",
    highlighted: true,
    features: [
      "Intro call",
      "4 hours at the event",
      "Call to go over your expectations",
      "Agenda designed by Sravanthi based on your needs",
      "3 personalized games to engage the audience",
      "Coordination with DJ, photographer & videographer",
    ],
    ctaLabel: "Book Now",
    ctaHref: "/book-call",
  },
  {
    name: "Platinum",
    features: [
      "Intro call",
      "6 hours at the event (4 hrs on stage + 2 hrs on dance floor)",
      "Call to go over your expectations",
      "Agenda designed by Sravanthi based on your needs",
      "3 personalized games to engage the audience",
      "Encourage every guest onto the dance floor — parents, shy guests, everyone!",
      "Coordination with DJ, photographer & videographer",
    ],
    ctaLabel: "Book Now",
    ctaHref: "/book-call",
  },
]

interface PackagesSectionProps {
  sectionTitle?: string
  subtitle?: string
  quote?: string
  packages?: PackageItem[]
}

export function PackagesSection({
  sectionTitle = "Emcee Packages",
  subtitle = "Choose the experience that fits your event.",
  quote = "I like to bring people together and make the event memorable. If it's a concert, my goal is to make sure everyone is having a good time. If it's a Sangeet, my goal is to make the bride and groom feel special — I treat it as my best friend's wedding.",
  packages = defaultPackages,
}: PackagesSectionProps) {
  return (
    <section className="bg-brand-bg py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-8 max-w-2xl mx-auto">
          <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">Packages</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-brand-text leading-[1.1]">
            {sectionTitle}
          </h2>
          {subtitle && <p className="mt-4 text-brand-muted text-lg">{subtitle}</p>}
          <div className="mt-6 mx-auto w-12 h-px bg-brand-gold" />
        </ScrollReveal>

        {quote && (
          <ScrollReveal className="text-center mb-16 max-w-3xl mx-auto" delay={0.1}>
            <blockquote className="font-display text-lg md:text-xl text-brand-muted/80 italic leading-relaxed">
              &ldquo;{quote}&rdquo;
            </blockquote>
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {packages.map((pkg, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div
                className={`relative flex flex-col h-full transition-all duration-300 ${
                  pkg.highlighted
                    ? "border-2 border-brand-gold bg-white shadow-lg scale-[1.02]"
                    : "border border-brand-border bg-white hover:border-brand-gold/40"
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-gold text-white text-xs font-sans tracking-widest uppercase px-4 py-1.5">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className="p-8 flex flex-col h-full">
                  <h3 className={`font-display text-2xl md:text-3xl font-light text-center mb-6 ${
                    pkg.highlighted ? "text-brand-gold" : "text-brand-text"
                  }`}>
                    {pkg.name}
                  </h3>

                  <div className="w-8 h-px bg-brand-border mx-auto mb-6" />

                  <ul className="space-y-4 flex-1 mb-8">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-brand-muted leading-relaxed">
                        <Check size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={`w-full py-5 text-sm tracking-widest uppercase rounded-none transition-all duration-300 ${
                      pkg.highlighted
                        ? "bg-brand-gold text-white hover:bg-brand-gold-light"
                        : "bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white"
                    }`}
                  >
                    <Link href={pkg.ctaHref || "/book-call"}>
                      {pkg.ctaLabel || "Enquire Now"}
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
