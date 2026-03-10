import type { Block } from "payload"

export const StatsBlock: Block = {
  slug: "stats",
  labels: { singular: "Stats Section", plural: "Stats Sections" },
  fields: [
    { name: "sectionTitle", type: "text" },
    {
      name: "stats",
      type: "array",
      fields: [
        { name: "value", type: "text" },
        { name: "label", type: "text" },
        { name: "description", type: "text" },
      ],
      defaultValue: [
        { value: "200+", label: "Speakers Coached", description: "Professionals transformed" },
        { value: "10+", label: "Years Experience", description: "In speaker development" },
        { value: "30+", label: "Global Stages", description: "Panels, keynotes & podcasts" },
        { value: "95%", label: "Satisfaction Rate", description: "Client success stories" },
      ],
    },
  ],
}
