import type { Block } from "payload"

export const BlogPreviewBlock: Block = {
  slug: "blog-preview",
  labels: { singular: "Blog Preview Section", plural: "Blog Preview Sections" },
  fields: [
    { name: "sectionTitle", type: "text", defaultValue: "Insights & Resources" },
    { name: "subtitle", type: "text", defaultValue: "Practical wisdom for speakers, leaders, and communicators." },
    { name: "postsCount", type: "number", defaultValue: 3 },
  ],
}
