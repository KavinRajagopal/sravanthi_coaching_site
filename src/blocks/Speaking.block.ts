import type { Block } from "payload"

export const SpeakingBlock: Block = {
  slug: "speaking",
  labels: { singular: "Speaking Section", plural: "Speaking Sections" },
  fields: [
    { name: "sectionTitle", type: "text", defaultValue: "Sravanthi on the Stage" },
    { name: "subtitle", type: "text", defaultValue: "Speaker · Panelist · Podcast Guest" },
    {
      name: "logos",
      type: "array",
      fields: [
        { name: "logo", type: "upload", relationTo: "media" },
        { name: "name", type: "text" },
      ],
    },
    {
      name: "appearances",
      type: "array",
      fields: [
        { name: "event", type: "text" },
        { name: "date", type: "text" },
        { name: "topic", type: "text" },
        { name: "type", type: "select", options: ["Conference", "Podcast", "Panel", "Workshop", "Interview"] },
        { name: "link", type: "text" },
      ],
      defaultValue: [
        { event: "Women in Leadership Summit", date: "2024", topic: "Own Your Voice, Own the Room", type: "Conference" },
        { event: "The Executive Edge Podcast", date: "2024", topic: "Building Executive Presence from the Inside Out", type: "Podcast" },
        { event: "TEDx Regional Stage", date: "2023", topic: "The Silence Before the Speech", type: "Conference" },
      ],
    },
  ],
}
