"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Mic, User, Shield, Activity, TrendingUp, Heart, Star, Zap, Globe } from "lucide-react"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"

interface TransformationItem {
  icon?: string
  title: string
  description: string
}

interface TransformationSectionProps {
  sectionTitle?: string
  subtitle?: string
  items?: TransformationItem[]
}

const iconMap: Record<string, React.ReactNode> = {
  mic: <Mic size={22} />,
  user: <User size={22} />,
  shield: <Shield size={22} />,
  activity: <Activity size={22} />,
  "trending-up": <TrendingUp size={22} />,
  heart: <Heart size={22} />,
  star: <Star size={22} />,
  zap: <Zap size={22} />,
  globe: <Globe size={22} />,
}

const defaultItems: TransformationItem[] = [
  { icon: "mic", title: "Stage Presence", description: "Command any room with a magnetic, grounded energy that draws people in before you say a word." },
  { icon: "user", title: "Speaker Identity", description: "Own a clear, compelling speaking persona that reflects your authentic voice and expertise." },
  { icon: "shield", title: "Authentic Confidence", description: "Speak from genuine strength — not performance anxiety or people-pleasing habits." },
  { icon: "activity", title: "Body Language & Voice", description: "Master non-verbal communication, vocal tone, and physical presence for maximum impact." },
  { icon: "trending-up", title: "High-Visibility Brand", description: "Position yourself as a thought leader in your industry through strategic visibility." },
  { icon: "heart", title: "Charisma & Connection", description: "Build real rapport with audiences that makes them lean in, remember you, and take action." },
]

export function TransformationSection({
  sectionTitle = "What changes when you work with Sravanthi",
  subtitle,
  items = defaultItems,
}: TransformationSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" })

  return (
    <section className="bg-brand-surface py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-brand-gold font-sans text-xs tracking-[0.3em] uppercase mb-4">Transformation</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-brand-cream leading-[1.1]">
            {sectionTitle}
          </h2>
          {subtitle && <p className="mt-4 text-brand-muted text-lg">{subtitle}</p>}
        </ScrollReveal>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } }}
              className="bg-brand-surface p-8 group hover:bg-brand-elevated transition-colors duration-300"
            >
              <div className="text-brand-gold mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">
                {iconMap[item.icon || "star"] || <Star size={22} />}
              </div>
              <h3 className="font-display text-xl text-brand-cream mb-3 font-light">{item.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
