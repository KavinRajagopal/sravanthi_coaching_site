import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
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
  {
    id: "1",
    title: "Emcee & Hosting Services",
    tagline: "Setting the Stage for Memorable Moments",
    summary: "Professional emcee for weddings, Sangeets, concerts, corporate events, birthdays, babyshowers, HalfSaree/Dhoti ceremonies, and more. Based in Dallas, TX and open to travel.",
    outcomes: [
      { outcome: "Weddings, Sangeets & Indian celebrations" },
      { outcome: "Corporate events, galas & conferences" },
      { outcome: "Concerts & entertainment events" },
      { outcome: "Birthdays, babyshowers & milestone events" },
    ],
    format: "In-Person (Dallas, TX — open to travel)",
    duration: "Custom",
    ctaLabel: "Enquire Now",
    ctaHref: "/book-call",
    featured: true,
    slug: "emcee-hosting",
  },
  {
    id: "2",
    title: "Leadership Launchpad — Summer Courses",
    tagline: "Empowering the next generation",
    summary: "Summer courses for Grades 1–12. Public speaking, writing, acting, improv, leadership, mindset coaching, and more. Flexible schedule, limited seats. Starting at $99+.",
    outcomes: [
      { outcome: "Grades 1–6: Public Speaking, Writing, Acting, Mindfulness, Storytelling + Improv" },
      { outcome: "Grades 7–12: College Readiness, Leadership 101, Public Speaking + Improv" },
      { outcome: "Time & Task Management, Stress Management, Investing 101" },
      { outcome: "Internship & job shadowing opportunities" },
    ],
    format: "In-Person (Dallas, TX)",
    duration: "June 1 – July 31 (Flexible Schedule)",
    ctaLabel: "Register Now",
    ctaHref: "/book-call",
    featured: true,
    slug: "leadership-launchpad",
  },
  {
    id: "3",
    title: "Speaking Coaching & Workshops",
    tagline: "Find your voice",
    summary: "1:1 coaching and group workshops to develop your speaking presence, confidence, and presentation skills for any stage or boardroom.",
    outcomes: [
      { outcome: "1:1 speaker coaching" },
      { outcome: "Group workshops" },
      { outcome: "Presentation skills training" },
      { outcome: "Corporate training sessions" },
    ],
    format: "Virtual or In-Person",
    duration: "Custom",
    ctaLabel: "Book a Call",
    ctaHref: "/book-call",
    featured: false,
    slug: "speaking-coaching",
  },
]

export function ProgramsSection({
  sectionTitle = "Services",
  subtitle = "How we can work together.",
  programs = defaultPrograms,
}: ProgramsSectionProps) {
  return (
    <section id="services" className="bg-brand-elevated py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">What I Offer</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-brand-text leading-[1.1]">
            {sectionTitle}
          </h2>
          {subtitle && <p className="mt-4 text-brand-muted text-lg">{subtitle}</p>}
          <div className="mt-6 mx-auto w-12 h-px bg-brand-gold" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, i) => (
            <ScrollReveal key={program.id} delay={i * 0.1}>
              <div className={`relative border transition-all duration-300 group h-full flex flex-col ${program.featured ? "border-brand-gold bg-white" : "border-brand-border bg-white hover:border-brand-gold/50"}`}>
                <div className="p-8 flex flex-col h-full">
                  {program.tagline && (
                    <p className="text-brand-muted font-sans text-xs tracking-[0.2em] uppercase mb-2">{program.tagline}</p>
                  )}
                  <h3 className="font-display text-2xl md:text-3xl text-brand-text font-light mb-4">{program.title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed mb-6">{program.summary}</p>

                  {program.outcomes && program.outcomes.length > 0 && (
                    <ul className="space-y-2 mb-8 flex-1">
                      {program.outcomes.slice(0, 4).map((o, j) => (
                        <li key={j} className="flex items-start gap-3 text-brand-muted text-sm">
                          <span className="text-brand-gold mt-0.5 shrink-0">-</span>
                          <span>{o.outcome}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto pt-6 border-t border-brand-border">
                    <Button
                      asChild
                      className={`flex items-center gap-2 px-6 py-4 text-sm tracking-widest uppercase rounded-none transition-all duration-300 ${program.featured ? "bg-brand-gold text-white hover:bg-brand-gold-light" : "bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white"}`}
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
