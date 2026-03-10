import { Metadata } from "next"
import { getPayload } from "@/lib/payload-client"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"
import { ContactForm } from "@/components/public/sections/ContactForm"

export const metadata: Metadata = {
  title: "Book a Call",
  description: "Schedule a free discovery call with Sravanthi Prattipati to discuss your speaking goals.",
}

export default async function BookCallPage() {
  let bookingSettings: any = null

  try {
    const payload = await getPayload()
    bookingSettings = await payload.findGlobal({ slug: "booking-settings" })
  } catch {}

  const headline = bookingSettings?.pageHeadline || "Let's talk about your next stage"
  const subtext = bookingSettings?.pageSubtext || "Book a free 30-minute discovery call to explore how coaching can help you develop the stage presence, confidence, and speaking identity you've been building toward."
  const bookingUrl = bookingSettings?.bookingUrl || "https://calendly.com/sravanthi"
  const ctaLabel = bookingSettings?.ctaLabel || "Schedule a Discovery Call"
  const activeFlow = bookingSettings?.activeFlow || "direct"

  return (
    <section className="bg-brand-black pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal className="mb-12">
          <p className="text-brand-gold font-sans text-xs tracking-[0.3em] uppercase mb-4">Book a Call</p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-brand-cream leading-[1.05] mb-6">
            {headline}
          </h1>
          <p className="text-brand-muted text-lg leading-relaxed max-w-2xl">{subtext}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* What to expect */}
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-2xl text-brand-cream font-light mb-6">What to expect on the call</h2>
            <ul className="space-y-4">
              {[
                "A relaxed 30-minute conversation (no pressure, no sales pitch)",
                "We'll discuss your current speaking challenges and goals",
                "You'll learn if and how coaching could help you",
                "You'll leave with clarity on your next step, regardless of whether we work together",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-brand-muted">
                  <span className="text-brand-gold font-display text-lg leading-none mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Booking widget or form */}
          <ScrollReveal delay={0.2}>
            {activeFlow === "direct" && bookingUrl ? (
              <div className="border border-brand-border bg-brand-surface p-8 text-center">
                <p className="text-brand-muted mb-6">Click below to choose a time that works for you.</p>
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-brand-gold hover:bg-brand-gold-light text-brand-black px-10 py-5 text-sm tracking-widest uppercase transition-all duration-300 hover:scale-[1.02]"
                >
                  {ctaLabel}
                </a>
              </div>
            ) : (
              <ContactForm />
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
