import type { Block } from "payload"

export const CTABlock: Block = {
  slug: "cta",
  labels: { singular: "CTA Section", plural: "CTA Sections" },
  fields: [
    { name: "headline", type: "text", defaultValue: "Ready to become the speaker people remember?" },
    { name: "subtext", type: "textarea", defaultValue: "Book a free discovery call and let's talk about your next stage." },
    { name: "ctaLabel", type: "text", defaultValue: "Schedule a Discovery Call" },
    { name: "ctaHref", type: "text", defaultValue: "/book-call" },
    { name: "backgroundStyle", type: "select", options: ["dark", "gold", "image"], defaultValue: "dark" },
    { name: "backgroundImage", type: "upload", relationTo: "media" },
  ],
}
