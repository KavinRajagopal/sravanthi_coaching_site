"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"
import { InstagramFeed } from "@/components/public/shared/InstagramFeed"

interface Appearance {
  event: string
  date?: string
  topic?: string
  type?: string
  link?: string
}

interface SpeakingSectionProps {
  sectionTitle?: string
  subtitle?: string
  appearances?: Appearance[]
  elfsightWidgetId?: string
}

const defaultAppearances: Appearance[] = [
  { event: "Grand Wedding Celebration", date: "2026", topic: "Wedding Emcee — Telugu & English", type: "Emcee" },
  { event: "Tech Leadership Summit", date: "2026", topic: "Corporate Emcee & Host", type: "Emcee" },
  { event: "Celebrity Interview Series", date: "2025", topic: "Interviewing actors & public figures", type: "Interview" },
  { event: "Sangeet Night Celebration", date: "2025", topic: "Games, dances & entertainment", type: "Emcee" },
  { event: "Corporate Innovation Gala", date: "2025", topic: "Awards ceremony host", type: "Emcee" },
  { event: "Sweet 16 & Coming of Age", date: "2025", topic: "Milestone celebration host", type: "Emcee" },
]

export function SpeakingSection({
  sectionTitle = "Past Events & Appearances",
  subtitle = "Emcee · Speaker · Workshop Facilitator",
  appearances = defaultAppearances,
  elfsightWidgetId,
}: SpeakingSectionProps) {
  return (
    <section className="bg-brand-bg py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16 max-w-2xl mx-auto">
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
        </ScrollReveal>

        {/* Marquee logo row */}
        <div className="mb-16 border-y border-brand-border py-6 overflow-hidden">
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...defaultAppearances, ...defaultAppearances].map((a, i) => (
              <span key={i} className="text-brand-muted/40 font-display text-lg font-light tracking-wide">
                {a.event}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Appearance cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appearances.map((a, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="border border-brand-border bg-white p-6 hover:border-brand-gold/40 transition-all duration-300 group h-full">
                <div className="flex items-start justify-between mb-4">
                  {a.type && (
                    <Badge className="bg-brand-gold/10 text-brand-gold border border-brand-gold/30 rounded-none font-sans text-xs tracking-wide uppercase hover:bg-brand-gold/10">
                      {a.type}
                    </Badge>
                  )}
                  {a.date && (
                    <span className="text-brand-muted text-xs">{a.date}</span>
                  )}
                </div>
                <h3 className="font-display text-xl text-brand-text font-light mb-2">{a.event}</h3>
                {a.topic && <p className="text-brand-muted text-sm leading-relaxed">{a.topic}</p>}
                {a.link && (
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center gap-2 text-brand-gold text-xs tracking-widest uppercase hover:text-brand-gold-light transition-colors group-hover:gap-3"
                  >
                    Watch / Listen <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Instagram Feed */}
        {elfsightWidgetId && (
          <ScrollReveal className="mt-16">
            <div className="text-center mb-8">
              <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-2">Follow Along</p>
              <h3 className="font-display text-2xl md:text-3xl font-light text-brand-text">Event Highlights</h3>
            </div>
            <InstagramFeed widgetId={elfsightWidgetId} />
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
