import type { Block } from "payload"

export const TransformationBlock: Block = {
  slug: "transformation",
  labels: { singular: "Transformation Section", plural: "Transformation Sections" },
  fields: [
    { name: "sectionTitle", type: "text", defaultValue: "What changes when you work with Sravanthi" },
    { name: "subtitle", type: "text" },
    {
      name: "items",
      type: "array",
      fields: [
        { name: "icon", type: "text", defaultValue: "mic" },
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
      ],
      defaultValue: [
        { icon: "mic", title: "Stage Presence", description: "Command any room with a magnetic, grounded energy that draws people in before you say a word." },
        { icon: "user", title: "Speaker Identity", description: "Own a clear, compelling speaking persona that reflects your authentic voice and expertise." },
        { icon: "shield", title: "Authentic Confidence", description: "Speak from genuine strength — not performance anxiety or people-pleasing habits." },
        { icon: "activity", title: "Body Language & Voice", description: "Master non-verbal communication, vocal tone, and physical presence for maximum impact." },
        { icon: "trending-up", title: "High-Visibility Brand", description: "Position yourself as a thought leader in your industry through strategic visibility." },
        { icon: "heart", title: "Charisma & Connection", description: "Build real rapport with audiences that makes them lean in, remember you, and take action." },
      ],
    },
  ],
}
