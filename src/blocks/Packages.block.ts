import type { Block } from "payload"

export const PackagesBlock: Block = {
  slug: "packages",
  labels: { singular: "Packages Section", plural: "Packages Sections" },
  fields: [
    { name: "sectionTitle", type: "text", defaultValue: "Emcee Packages" },
    { name: "subtitle", type: "text", defaultValue: "Choose the experience that fits your event." },
    { name: "quote", type: "textarea" },
    {
      name: "packages",
      type: "array",
      fields: [
        { name: "name", type: "text" },
        { name: "badge", type: "text", admin: { description: "e.g. 'Most Popular'" } },
        { name: "highlighted", type: "checkbox", defaultValue: false },
        {
          name: "features",
          type: "array",
          fields: [{ name: "feature", type: "text" }],
        },
        { name: "ctaLabel", type: "text", defaultValue: "Enquire Now" },
        { name: "ctaHref", type: "text", defaultValue: "/book-call" },
      ],
    },
  ],
}
