import { Metadata } from "next"
import Link from "next/link"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for Sravanthi Prattipati's website and services.",
}

export default function TermsPage() {
  return (
    <section className="bg-brand-bg pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">Legal</p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-brand-text leading-[1.05] mb-8">
            Terms &amp; Conditions
          </h1>
          <div className="w-12 h-px bg-brand-gold mb-12" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="prose prose-brand max-w-none text-brand-muted space-y-6">
            <p className="text-sm text-brand-muted/60">Last updated: March 11, 2026</p>

            <h2 className="font-display text-2xl text-brand-text font-light mt-8">1. Services</h2>
            <p>
              Sravanthi Prattipati provides professional emcee and event hosting services, speaker coaching, and workshops. All services are subject to availability and confirmation.
            </p>

            <h2 className="font-display text-2xl text-brand-text font-light mt-8">2. Bookings &amp; Cancellations</h2>
            <p>
              All bookings are confirmed upon mutual agreement of date, time, package, and payment terms. Cancellation policies will be communicated at the time of booking. A non-refundable deposit may be required to secure your date.
            </p>

            <h2 className="font-display text-2xl text-brand-text font-light mt-8">3. Payment</h2>
            <p>
              Payment terms, including deposits and balances, will be outlined in the service agreement provided upon booking. Late payments may incur additional fees as specified in the agreement.
            </p>

            <h2 className="font-display text-2xl text-brand-text font-light mt-8">4. Intellectual Property</h2>
            <p>
              All content on this website — including text, images, logos, and design — is the property of Sravanthi Prattipati and is protected by copyright law. You may not reproduce, distribute, or use any content without prior written consent.
            </p>

            <h2 className="font-display text-2xl text-brand-text font-light mt-8">5. Limitation of Liability</h2>
            <p>
              Sravanthi Prattipati shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or services. Services are provided &ldquo;as is&rdquo; and we make no warranties regarding outcomes.
            </p>

            <h2 className="font-display text-2xl text-brand-text font-light mt-8">6. Website Use</h2>
            <p>
              By using this website, you agree to use it lawfully and not to engage in any activity that may disrupt or interfere with the website&apos;s functionality. We reserve the right to modify or discontinue any part of this website at any time.
            </p>

            <h2 className="font-display text-2xl text-brand-text font-light mt-8">7. Changes to Terms</h2>
            <p>
              We reserve the right to update these terms at any time. Continued use of the website after changes constitutes acceptance of the updated terms.
            </p>

            <h2 className="font-display text-2xl text-brand-text font-light mt-8">8. Contact</h2>
            <p>
              For questions about these terms, please reach out via our{" "}
              <Link href="/book-call" className="text-brand-gold hover:text-brand-gold-light underline">contact page</Link>.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
