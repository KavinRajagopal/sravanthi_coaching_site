"use client"

import { useInView, animate } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"

interface Stat {
  value: string
  label: string
  description?: string
}

interface StatsSectionProps {
  sectionTitle?: string
  stats?: Stat[]
}

function AnimatedStat({ value }: { value: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const numericMatch = value.match(/(\d+)/)
  const numericPart = numericMatch ? parseInt(numericMatch[1]) : null
  const suffix = numericMatch ? value.replace(numericMatch[1], "") : value

  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    if (isInView && numericPart !== null) {
      const controls = animate(0, numericPart, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (v) => setDisplayed(Math.round(v)),
      })
      return controls.stop
    }
  }, [isInView, numericPart])

  return (
    <span ref={ref} className="font-display text-5xl md:text-6xl text-brand-text font-light">
      {numericPart !== null ? `${displayed}${suffix}` : value}
    </span>
  )
}

const defaultStats: Stat[] = [
  { value: "100+", label: "Events Hosted", description: "Corporate & social events" },
  { value: "200+", label: "People Coached", description: "In public speaking, confidence & stage presence" },
  { value: "5+", label: "Years Experience", description: "In emcee & speaker coaching" },
  { value: "10+", label: "Event Formats", description: "Conferences, pageants, launches, panels & more" },
]

export function StatsSection({ sectionTitle, stats }: StatsSectionProps) {
  const displayStats = stats && stats.length > 0 ? stats : defaultStats
  return (
    <section className="bg-brand-bg border-y border-brand-border py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {sectionTitle && (
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-3xl text-brand-text font-light">{sectionTitle}</h2>
          </ScrollReveal>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {displayStats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="text-center">
              <AnimatedStat value={stat.value} />
              <p className="text-brand-gold font-sans text-xs tracking-widest uppercase mt-2 mb-1">{stat.label}</p>
              {stat.description && <p className="text-brand-muted text-xs">{stat.description}</p>}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
