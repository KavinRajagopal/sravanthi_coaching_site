"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  sectionTitle?: string
  items?: FAQItem[]
}

const defaultItems: FAQItem[] = [
  { question: "How long does coaching take to see results?", answer: "Most clients notice a significant shift in confidence and clarity within the first 2-3 sessions. Lasting transformation in stage presence and speaker identity typically develops over 3-6 months of consistent practice and coaching." },
  { question: "Do I need speaking experience to work with Sravanthi?", answer: "No. Sravanthi works with both complete beginners and experienced speakers. Whether you're preparing for your first presentation or looking to elevate an established speaking career, the program is tailored to your level." },
  { question: "What formats are available for coaching?", answer: "Coaching is available as 1:1 private sessions, group programs, and VIP intensive days. All sessions are conducted virtually, making it accessible regardless of your location." },
  { question: "How is this different from a public speaking course?", answer: "A course gives you frameworks. Coaching transforms your relationship with speaking. Sravanthi works on your identity, mindset, and presence — not just techniques — so changes are deep, lasting, and authentic to who you are." },
]

export function FAQSection({ sectionTitle = "Frequently Asked Questions", items = defaultItems }: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-brand-bg py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">FAQ</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-brand-text leading-[1.1]">
            {sectionTitle}
          </h2>
          <div className="mt-6 mx-auto w-12 h-px bg-brand-gold" />
        </ScrollReveal>

        <div className="divide-y divide-brand-border">
          {items.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between gap-4 py-6 text-left group"
              >
                <span className="font-display text-xl text-brand-text font-light group-hover:text-brand-gold transition-colors">
                  {item.question}
                </span>
                <span className="text-brand-gold mt-1 shrink-0">
                  {open === i ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-brand-muted leading-relaxed pb-6">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
