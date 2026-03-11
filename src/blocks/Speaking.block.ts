import type { Block } from "payload"

export const SpeakingBlock: Block = {
  slug: "speaking",
  labels: { singular: "Speaking Section", plural: "Speaking Sections" },
  fields: [
    { name: "sectionTitle", type: "text", defaultValue: "Past Events & Appearances" },
    { name: "subtitle", type: "text", defaultValue: "Emcee · Speaker · Workshop Facilitator" },
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
        { name: "type", type: "select", options: ["Emcee", "Conference", "Podcast", "Panel", "Workshop", "Interview"] },
        { name: "link", type: "text" },
      ],
      defaultValue: [
        { event: "Grand Wedding Celebration", date: "2026", topic: "Wedding Emcee — Telugu & English", type: "Emcee" },
        { event: "Tech Leadership Summit", date: "2026", topic: "Corporate Emcee & Host", type: "Emcee" },
        { event: "Sangeet Night Celebration", date: "2025", topic: "Games, dances & entertainment", type: "Emcee" },
      ],
    },
  ],
}
