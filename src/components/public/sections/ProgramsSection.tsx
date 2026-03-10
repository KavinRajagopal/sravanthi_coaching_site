import Link from "next/link"
import Image from "next/image"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"

interface Program {
  id: string
  title: string
  tagline?: string
  summary: string
  outcomes?: { outcome: string }[]
  format?: string
  duration?: string
  ctaLabel?: string
  ctaHref?: string
  coverImage?: { url: string; alt: string } | null
  featured?: boolean
  slug?: string
}

interface ProgramsSectionProps {
  sectionTitle?: string
  subtitle?: string
  programs?: Program[]
}

const defaultPrograms: Program[] = [
  { id: "1", title: "Signature 1:1 Coaching", tagline: "The deep-dive transformation", summary: "An intimate, high-touch coaching experience tailored entirely to your speaking goals, stage presence challenges, and personal brand vision.", outcomes: [{ outcome: "Weekly 1:1 coaching sessions" }, { outcome: "Personalized speaker development roadmap" }, { outcome: "Video review & feedback" }, { outcome: "Speaking opportunity strategy" }], format: "Virtual 1:1 Sessions", duration: "3 or 6 months", ctaLabel: "Apply Now", ctaHref: "/book-call", featured: true, slug: "private-coaching" },
  { id: "2", title: "Group Coaching Program", tagline: "Grow with your peers", summary: "A cohort-based program designed for professionals who want expert guidance, peer accountability, and a community of driven communicators.", outcomes: [{ outcome: "Weekly group coaching calls" }, { outcome: "Live practice & feedback rounds" }, { outcome: "Private community access" }, { outcome: "Resource library" }], format: "Group + 1:1 Elements", duration: "8 weeks", ctaLabel: "Join Waitlist", ctaHref: "/book-call", featured: false, slug: "group-program" },
  { id: "3", title: "VIP Intensive Day", tagline: "Accelerated transformation", summary: "A focused full-day experience to breakthrough your biggest speaking blocks, refine your stage presence, and leave with complete clarity.", outcomes: [{ outcome: "Full-day private coaching" }, { outcome: "Complete speaker identity work" }, { outcome: "On-camera performance coaching" }, { outcome: "30-day follow-up support" }], format: "Virtual or In-Person", duration: "1 intensive day", ctaLabel: "Book Your Day", ctaHref: "/book-call", featured: false, slug: "vip-intensive" },
  { id: "4", title: "Book Sravanthi to Speak", tagline: "Bring her to your event", summary: "Book Sravanthi as a keynote speaker, workshop facilitator, or panelist for your organization, conference, or leadership event.", outcomes: [{ outcome: "Keynote presentations" }, { outcome: "Workshop facilitation" }, { outcome: "Panel participation" }, { outcome: "Corporate training sessions" }], format: "In-Person or Virtual", duration: "Custom", ctaLabel: "Enquire Now", ctaHref: "/book-call", featured: false, slug: "speaking" },
]

export function ProgramsSection({
  sectionTitle = "Ways to Work Together",
  subtitle = "Choose the path that fits where you are and where you want to go.",
  programs = defaultPrograms,
}: ProgramsSectionProps) {
  return (
    <section id="services" className="bg-brand-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-brand-gold font-sans text-xs tracking-[0.3em] uppercase mb-4">Programs</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-brand-cream leading-[1.1]">
            {sectionTitle}
          </h2>
          {subtitle && <p className="mt-4 text-brand-muted text-lg">{subtitle}</p>}
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program, i) => (
            <ScrollReveal key={program.id} delay={i * 0.1}>
              <div className={`relative border transition-all duration-300 group h-full flex flex-col ${program.featured ? "border-brand-gold bg-brand-elevated" : "border-brand-border bg-brand-surface hover:border-brand-gold/50"}`}>
                {program.featured && (
                  <div className="absolute -top-3 left-6">
                    <Badge className="bg-brand-gold text-brand-black font-sans text-xs tracking-widest uppercase rounded-none px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className="p-8 flex flex-col h-full">
                  {program.tagline && (
                    <p className="text-brand-gold font-sans text-xs tracking-[0.2em] uppercase mb-2">{program.tagline}</p>
                  )}
                  <h3 className="font-display text-2xl md:text-3xl text-brand-cream font-light mb-4">{program.title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed mb-6">{program.summary}</p>

                  {program.outcomes && program.outcomes.length > 0 && (
                    <ul className="space-y-2 mb-8 flex-1">
                      {program.outcomes.slice(0, 4).map((o, j) => (
                        <li key={j} className="flex items-start gap-3 text-brand-muted text-sm">
                          <Check size={14} className="text-brand-gold mt-0.5 shrink-0" />
                          <span>{o.outcome}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-brand-border">
                    <div>
                      {program.duration && <p className="text-brand-muted text-xs">{program.duration}</p>}
                      {program.format && <p className="text-brand-muted text-xs">{program.format}</p>}
                    </div>
                    <Button
                      asChild
                      className={`flex items-center gap-2 px-6 py-4 text-sm tracking-widest uppercase rounded-none transition-all duration-300 ${program.featured ? "bg-brand-gold text-brand-black hover:bg-brand-gold-light" : "bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black"}`}
                    >
                      <Link href={program.ctaHref || "/book-call"}>
                        {program.ctaLabel || "Learn More"}
                        <ArrowRight size={14} />
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
  )
}
