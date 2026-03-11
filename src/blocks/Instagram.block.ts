import type { Block } from "payload"

export const InstagramBlock: Block = {
  slug: "instagram",
  labels: { singular: "Instagram Section", plural: "Instagram Sections" },
  fields: [
    { name: "instagramUrl", type: "text", defaultValue: "https://www.instagram.com/emcee_sravz/" },
    { name: "handle", type: "text", defaultValue: "@emcee_sravz" },
    { name: "subtitle", type: "text", defaultValue: "Behind the scenes, event highlights, and speaking tips." },
  ],
}
