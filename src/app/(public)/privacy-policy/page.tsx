import { Metadata } from "next"
import Link from "next/link"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Sravanthi Prattipati's website.",
}

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-brand-bg pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">Legal</p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-brand-text leading-[1.05] mb-8">
            Privacy Policy
          </h1>
          <div className="w-12 h-px bg-brand-gold mb-12" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="prose prose-brand max-w-none text-brand-muted space-y-6">
            <p className="text-sm text-brand-muted/60">Last updated: March 11, 2026</p>

            <h2 className="font-display text-2xl text-brand-text font-light mt-8">1. Information We Collect</h2>
            <p>When you visit our website, book a call, or contact us, we may collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name and email address (when you submit a form or book a call)</li>
              <li>Phone number (if voluntarily provided)</li>
              <li>Usage data such as pages visited, time spent, and referring URLs</li>
              <li>Cookies and similar tracking technologies (see our Cookie Policy)</li>
            </ul>

            <h2 className="font-display text-2xl text-brand-text font-light mt-8">2. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Respond to your inquiries and booking requests</li>
              <li>Provide emcee and coaching services</li>
              <li>Send relevant updates about our services (with your consent)</li>
              <li>Improve our website and user experience</li>
            </ul>

            <h2 className="font-display text-2xl text-brand-text font-light mt-8">3. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers (e.g., Calendly for scheduling, email providers) who assist in operating our website and services, subject to confidentiality agreements.
            </p>

            <h2 className="font-display text-2xl text-brand-text font-light mt-8">4. Third-Party Services</h2>
            <p>Our website may use third-party services including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Calendly (for booking calls)</li>
              <li>Elfsight (for social media widgets and reviews)</li>
              <li>Google Analytics (for website analytics)</li>
            </ul>
            <p>Each service has its own privacy policy governing the use of your information.</p>

            <h2 className="font-display text-2xl text-brand-text font-light mt-8">5. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="font-display text-2xl text-brand-text font-light mt-8">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>

            <h2 className="font-display text-2xl text-brand-text font-light mt-8">7. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please reach out via our{" "}
              <Link href="/book-call" className="text-brand-gold hover:text-brand-gold-light underline">contact page</Link>.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
