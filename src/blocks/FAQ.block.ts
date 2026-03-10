import type { Block } from "payload"

export const FAQBlock: Block = {
  slug: "faq",
  labels: { singular: "FAQ Section", plural: "FAQ Sections" },
  fields: [
    { name: "sectionTitle", type: "text", defaultValue: "Frequently Asked Questions" },
    {
      name: "items",
      type: "array",
      fields: [
        { name: "question", type: "text" },
        { name: "answer", type: "textarea" },
      ],
      defaultValue: [
        { question: "How long does coaching take to see results?", answer: "Most clients notice a significant shift in confidence and clarity within the first 2-3 sessions. Lasting transformation in stage presence and speaker identity typically develops over 3-6 months of consistent practice and coaching." },
        { question: "Do I need speaking experience to work with Sravanthi?", answer: "No. Sravanthi works with both complete beginners and experienced speakers. Whether you're preparing for your first presentation or looking to elevate an established speaking career, the program is tailored to your level." },
        { question: "What formats are available for coaching?", answer: "Coaching is available as 1:1 private sessions, group programs, and VIP intensive days. All sessions are conducted virtually, making it accessible regardless of your location." },
        { question: "How is this different from a public speaking course?", answer: "A course gives you frameworks. Coaching transforms your relationship with speaking. Sravanthi works on your identity, mindset, and presence — not just techniques — so changes are deep, lasting, and authentic to who you are." },
      ],
    },
  ],
}
