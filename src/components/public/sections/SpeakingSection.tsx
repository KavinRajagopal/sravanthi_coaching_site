"use client"

import { Instagram } from "lucide-react"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"
import { InstagramFeed } from "@/components/public/shared/InstagramFeed"

interface SpeakingSectionProps {
  sectionTitle?: string
  subtitle?: string
  elfsightWidgetId?: string
  instagramUrl?: string
}

export function SpeakingSection({
  sectionTitle = "Past Events & Appearances",
  subtitle = "Emcee · Speaker · Workshop Facilitator",
  elfsightWidgetId,
  instagramUrl = "https://www.instagram.com/emcee_sravz/",
}: SpeakingSectionProps) {
  return (
    <section className="bg-brand-bg py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">Portfolio</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-brand-text leading-[1.1]">
            {sectionTitle}
          </h2>
          {subtitle && (
            <p className="mt-4 text-brand-muted text-sm tracking-widest font-sans uppercase">
              {subtitle}
            </p>
          )}
          <div className="mt-6 mx-auto w-12 h-px bg-brand-gold" />
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 text-brand-gold hover:text-brand-gold-light transition-colors font-sans text-sm tracking-widest uppercase"
          >
            <Instagram size={18} />
            @emcee_sravz
          </a>
        </ScrollReveal>

        <InstagramFeed widgetId={elfsightWidgetId} />
      </div>
    </section>
  )
}
