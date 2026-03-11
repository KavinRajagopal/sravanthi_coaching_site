import Image from "next/image"
import Link from "next/link"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"
import { Button } from "@/components/ui/button"

interface Stat {
  value: string
  label: string
}

interface AboutSectionProps {
  label?: string
  pullQuote?: string
  body?: string
  image?: { url: string; alt: string } | null
  stats?: Stat[]
}

export function AboutSection({
  label = "About Sravanthi",
  pullQuote = "I help speakers go from overlooked to unforgettable.",
  body = "With over a decade of experience working with professionals across industries, Sravanthi helps ambitious leaders find their voice, own the room, and build a personal brand that speaks before they even say a word.",
  image,
  stats = [
    { value: "100+", label: "Events Emceed" },
    { value: "5+", label: "Years Experience" },
    { value: "50+", label: "Corporate Clients" },
  ],
}: AboutSectionProps) {
  return (
    <section id="about" className="bg-brand-bg py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <ScrollReveal direction="left">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <div className="relative aspect-[3/4] bg-brand-elevated overflow-hidden border border-brand-border">
                {image ? (
                  <Image src={image.url} alt={image.alt} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-brand-muted text-sm">Photo coming soon</span>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Text */}
          <div>
            <ScrollReveal delay={0.1}>
              <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">
                {label}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-brand-text leading-[1.2] mb-6">
                &ldquo;{pullQuote}&rdquo;
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-brand-muted text-lg leading-relaxed mb-8">{body}</p>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={0.4}>
              <div className="grid grid-cols-3 gap-6 mb-10">
                {stats.map((stat) => (
                  <div key={stat.label} className="border-l-2 border-brand-gold pl-4">
                    <div className="font-display text-3xl text-brand-text font-light">{stat.value}</div>
                    <div className="text-brand-muted text-xs mt-1 leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <Button
                asChild
                className="border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white bg-transparent px-8 py-5 text-sm tracking-widest uppercase rounded-none transition-all duration-300"
              >
                <Link href="/about">Read Full Story</Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
