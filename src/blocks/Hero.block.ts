import type { Block } from "payload"

export const HeroBlock: Block = {
  slug: "hero",
  labels: { singular: "Hero Section", plural: "Hero Sections" },
  fields: [
    { name: "headline", type: "text", required: true, defaultValue: "Become the speaker people remember" },
    { name: "subheadline", type: "textarea", defaultValue: "Speaker coaching for ambitious professionals who are done playing small." },
    {
      name: "ctaPrimary",
      type: "group",
      fields: [
        { name: "label", type: "text", defaultValue: "Book a Discovery Call" },
        { name: "href", type: "text", defaultValue: "/book-call" },
      ],
    },
    {
      name: "ctaSecondary",
      type: "group",
      fields: [
        { name: "label", type: "text", defaultValue: "Explore Programs" },
        { name: "href", type: "text", defaultValue: "/services" },
      ],
    },
    { name: "heroImage", type: "upload", relationTo: "media" },
    { name: "backgroundImage", type: "upload", relationTo: "media" },
  ],
}
