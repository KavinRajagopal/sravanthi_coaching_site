import type { Block } from "payload"

export const TestimonialsBlock: Block = {
  slug: "testimonials",
  labels: { singular: "Testimonials Section", plural: "Testimonials Sections" },
  fields: [
    { name: "sectionTitle", type: "text", defaultValue: "What speakers are saying" },
    {
      name: "testimonials",
      type: "relationship",
      relationTo: "testimonials",
      hasMany: true,
    },
  ],
}
