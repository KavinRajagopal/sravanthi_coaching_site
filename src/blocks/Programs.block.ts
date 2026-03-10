import type { Block } from "payload"

export const ProgramsBlock: Block = {
  slug: "programs",
  labels: { singular: "Programs Section", plural: "Programs Sections" },
  fields: [
    { name: "sectionTitle", type: "text", defaultValue: "Ways to Work Together" },
    { name: "subtitle", type: "text", defaultValue: "Choose the path that fits where you are and where you want to go." },
    {
      name: "programs",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
    },
  ],
}
