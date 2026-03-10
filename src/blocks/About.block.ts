import type { Block } from "payload"

export const AboutBlock: Block = {
  slug: "about",
  labels: { singular: "About Section", plural: "About Sections" },
  fields: [
    { name: "label", type: "text", defaultValue: "About Sravanthi" },
    { name: "pullQuote", type: "text", defaultValue: "I help speakers go from overlooked to unforgettable." },
    { name: "body", type: "textarea", defaultValue: "With over a decade of experience working with professionals across industries, Sravanthi helps ambitious leaders find their voice, own the room, and build a personal brand that speaks before they even say a word." },
    { name: "image", type: "upload", relationTo: "media" },
    {
      name: "stats",
      type: "array",
      fields: [
        { name: "value", type: "text" },
        { name: "label", type: "text" },
      ],
      defaultValue: [
        { value: "200+", label: "Speakers Coached" },
        { value: "10+", label: "Years Experience" },
        { value: "30+", label: "Global Stages" },
      ],
    },
  ],
}
