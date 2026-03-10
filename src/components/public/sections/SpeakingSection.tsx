"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"

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
}

const defaultAppearances: Appearance[] = [
  { event: "Women in Leadership Summit", date: "2024", topic: "Own Your Voice, Own the Room", type: "Conference" },
  { event: "The Executive Edge Podcast", date: "2024", topic: "Building Executive Presence from the Inside Out", type: "Podcast" },
  { event: "TEDx Regional Stage", date: "2023", topic: "The Silence Before the Speech", type: "Conference" },
  { event: "Forbes Coaches Council", date: "2023", topic: "The 5 Pillars of Speaker Identity", type: "Panel" },
  { event: "HR Innovation Summit", date: "2023", topic: "Communication as Leadership Currency", type: "Workshop" },
  { event: "The Founders' Mic Podcast", date: "2022", topic: "From Engineer to Executive Communicator", type: "Podcast" },
]

export function SpeakingSection({
  sectionTitle = "Sravanthi on the Stage",
  subtitle = "Speaker · Panelist · Podcast Guest",
  appearances = defaultAppearances,
}: SpeakingSectionProps) {
  return (
    <section className="bg-brand-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-brand-gold font-sans text-xs tracking-[0.3em] uppercase mb-4">Speaking</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-brand-cream leading-[1.1]">
            {sectionTitle}
          </h2>
          {subtitle && (
            <p className="mt-4 text-brand-muted text-base tracking-widest font-sans uppercase text-sm">
              {subtitle}
            </p>
          )}
        </ScrollReveal>

        {/* Marquee logo row placeholder */}
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
              <div className="border border-brand-border bg-brand-surface p-6 hover:border-brand-gold/40 transition-all duration-300 group h-full">
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
                <h3 className="font-display text-xl text-brand-cream font-light mb-2">{a.event}</h3>
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
      </div>
    </section>
  )
}
