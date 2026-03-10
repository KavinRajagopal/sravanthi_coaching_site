import type { Block } from "payload"
import { lexicalEditor } from "@payloadcms/richtext-lexical"

export const RichTextBlock: Block = {
  slug: "rich-text",
  labels: { singular: "Rich Text Section", plural: "Rich Text Sections" },
  fields: [
    { name: "content", type: "richText", editor: lexicalEditor({}) },
  ],
}
