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
        { value: "100+", label: "Events Hosted", description: "Corporate & social events" },
        { value: "200+", label: "People Coached", description: "In public speaking, confidence & stage presence" },
        { value: "5+", label: "Years Experience", description: "In emcee & speaker coaching" },
        { value: "10+", label: "Event Formats", description: "Conferences, pageants, launches, panels & more" },
      ],
    },
  ],
}
