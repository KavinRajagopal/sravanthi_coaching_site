import { Instagram } from "lucide-react"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"
import { InstagramFeed } from "@/components/public/shared/InstagramFeed"

interface InstagramSectionProps {
  instagramUrl?: string
  elfsightWidgetId?: string
}

export function InstagramSection({
  instagramUrl = "https://www.instagram.com/emcee_sravz/",
  elfsightWidgetId,
}: InstagramSectionProps) {
  return (
    <section className="bg-brand-elevated py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">Follow Along</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-brand-text leading-[1.1]">
            On Instagram
          </h2>
          <div className="mt-6 mx-auto w-12 h-px bg-brand-gold" />
          <p className="mt-6 text-brand-muted text-lg leading-relaxed">
            Behind the scenes, event highlights, and speaking tips.
          </p>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 text-brand-gold hover:text-brand-gold-light transition-colors font-sans text-sm tracking-widest uppercase"
          >
            <Instagram size={20} />
            Follow @emcee_sravz
          </a>
        </ScrollReveal>

        <InstagramFeed widgetId={elfsightWidgetId} />
      </div>
    </section>
  )
}
