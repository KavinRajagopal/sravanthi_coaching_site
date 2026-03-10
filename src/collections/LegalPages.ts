import type { CollectionConfig } from "payload"
import { lexicalEditor } from "@payloadcms/richtext-lexical"

export const LegalPages: CollectionConfig = {
  slug: "legal-pages",
  admin: {
    useAsTitle: "title",
    description: "Privacy policy, terms, and other legal pages.",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Privacy Policy", value: "privacy" },
        { label: "Terms & Conditions", value: "terms" },
        { label: "Cookie Policy", value: "cookies" },
        { label: "Disclaimer", value: "disclaimer" },
      ],
      required: true,
      unique: true,
    },
    { name: "content", type: "richText", editor: lexicalEditor({}), required: true },
  ],
  timestamps: true,
}
