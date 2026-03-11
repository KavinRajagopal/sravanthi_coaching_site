import { Metadata } from "next"
import Link from "next/link"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie policy for Sravanthi Prattipati's website.",
}

export default function CookiePolicyPage() {
  return (
    <section className="bg-brand-bg pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">Legal</p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-brand-text leading-[1.05] mb-8">
            Cookie Policy
          </h1>
          <div className="w-12 h-px bg-brand-gold mb-12" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="prose prose-brand max-w-none text-brand-muted space-y-6">
            <p className="text-sm text-brand-muted/60">Last updated: March 11, 2026</p>

            <h2 className="font-display text-2xl text-brand-text font-light mt-8">What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and improve your experience.
            </p>

            <h2 className="font-display text-2xl text-brand-text font-light mt-8">How We Use Cookies</h2>
            <p>We use cookies for the following purposes:</p>

            <h3 className="font-display text-xl text-brand-text font-light mt-6">Essential Cookies</h3>
            <p>
              These are necessary for the website to function properly. They enable core features like page navigation and access to secure areas.
            </p>

            <h3 className="font-display text-xl text-brand-text font-light mt-6">Analytics Cookies</h3>
            <p>
              These help us understand how visitors interact with our website by collecting anonymous usage data. This helps us improve the site experience.
            </p>

            <h3 className="font-display text-xl text-brand-text font-light mt-6">Third-Party Cookies</h3>
            <p>
              Some third-party services embedded on our site (such as Calendly, Elfsight widgets, and social media embeds) may set their own cookies. We do not control these cookies.
            </p>

            <h2 className="font-display text-2xl text-brand-text font-light mt-8">Managing Cookies</h2>
            <p>
              You can control and manage cookies through your browser settings. Most browsers allow you to block or delete cookies. However, blocking certain cookies may impact the functionality of this website.
            </p>

            <h2 className="font-display text-2xl text-brand-text font-light mt-8">Contact</h2>
            <p>
              If you have questions about our use of cookies, please reach out via our{" "}
              <Link href="/book-call" className="text-brand-gold hover:text-brand-gold-light underline">contact page</Link>.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
