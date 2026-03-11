import { Sparkles, Globe, Gamepad2, Heart, ClipboardList, Mic } from "lucide-react"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"

interface WhyItem {
  icon: React.ReactNode
  title: string
  description: string
}

const defaultItems: WhyItem[] = [
  {
    icon: <ClipboardList size={24} />,
    title: "Personalized Preparation",
    description: "Every event is different. Sravanthi personally prepares for each one — understanding the audience, the tone, and the goals to deliver a truly tailored experience.",
  },
  {
    icon: <Heart size={24} />,
    title: "Genuine Charisma",
    description: "A natural warmth and energy that connects with audiences instantly. Sravanthi makes every guest and attendee feel welcome and engaged.",
  },
  {
    icon: <Globe size={24} />,
    title: "Bilingual — Telugu & English",
    description: "Fluent in both Telugu and English, Sravanthi seamlessly switches between languages to connect with diverse audiences at Indian celebrations and corporate events alike.",
  },
  {
    icon: <Gamepad2 size={24} />,
    title: "Plans Games & Activities",
    description: "Not just hosting — Sravanthi plans and leads interactive games, icebreakers, and audience activities that keep the energy high throughout your event.",
  },
  {
    icon: <Mic size={24} />,
    title: "Weddings to Corporate Stages",
    description: "From intimate Sangeets and Sweet 16s to large-scale corporate galas and celebrity interviews — Sravanthi brings the right energy to every occasion.",
  },
  {
    icon: <Sparkles size={24} />,
    title: "Memorable Moments",
    description: "Every event deserves moments that people talk about long after. Sravanthi creates those moments with spontaneity, humour, and heart.",
  },
]

interface WhySravanthiSectionProps {
  sectionTitle?: string
  subtitle?: string
  items?: WhyItem[]
}

export function WhySravanthiSection({
  sectionTitle = "Why Sravanthi",
  subtitle = "What makes every event special.",
  items = defaultItems,
}: WhySravanthiSectionProps) {
  return (
    <section className="bg-brand-elevated py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">The Difference</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-brand-text leading-[1.1]">
            {sectionTitle}
          </h2>
          {subtitle && <p className="mt-4 text-brand-muted text-lg">{subtitle}</p>}
          <div className="mt-6 mx-auto w-12 h-px bg-brand-gold" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="bg-white border border-brand-border p-8 h-full hover:border-brand-gold/40 transition-all duration-300 group">
                <div className="text-brand-gold mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {item.icon}
                </div>
                <h3 className="font-display text-xl text-brand-text font-light mb-3">{item.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
