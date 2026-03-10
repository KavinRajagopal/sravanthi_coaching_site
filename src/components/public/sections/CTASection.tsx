import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"

interface CTASectionProps {
  headline?: string
  subtext?: string
  ctaLabel?: string
  ctaHref?: string
  backgroundStyle?: "dark" | "gold" | "image"
  backgroundImage?: { url: string; alt: string } | null
}

export function CTASection({
  headline = "Ready to become the speaker people remember?",
  subtext = "Book a free discovery call and let's talk about your next stage.",
  ctaLabel = "Schedule a Discovery Call",
  ctaHref = "/book-call",
  backgroundStyle = "dark",
  backgroundImage,
}: CTASectionProps) {
  const isGold = backgroundStyle === "gold"

  return (
    <section className={`relative py-24 md:py-32 overflow-hidden ${isGold ? "bg-brand-gold" : "bg-brand-elevated"}`}>
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image src={backgroundImage.url} alt={backgroundImage.alt} fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-brand-black/70" />
        </div>
      )}

      {/* Decorative lines */}
      {!isGold && (
        <>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
        </>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <p className={`font-sans text-xs tracking-[0.3em] uppercase mb-6 ${isGold ? "text-brand-black/60" : "text-brand-gold"}`}>
            Take the next step
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className={`font-display font-light leading-[1.1] mb-6 text-4xl md:text-5xl lg:text-6xl ${isGold ? "text-brand-black" : "text-brand-cream"}`}>
            {headline}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className={`text-lg leading-relaxed mb-12 max-w-2xl mx-auto ${isGold ? "text-brand-black/70" : "text-brand-muted"}`}>
            {subtext}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <Button
            asChild
            className={`inline-flex items-center gap-3 px-10 py-6 text-sm tracking-widest uppercase rounded-none transition-all duration-300 hover:scale-[1.02] ${isGold ? "bg-brand-black text-brand-cream hover:bg-brand-elevated" : "bg-brand-gold text-brand-black hover:bg-brand-gold-light"}`}
          >
            <Link href={ctaHref}>
              {ctaLabel}
              <ArrowRight size={16} />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
