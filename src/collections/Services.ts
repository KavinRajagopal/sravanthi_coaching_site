import type { CollectionConfig } from "payload"
import { lexicalEditor } from "@payloadcms/richtext-lexical"

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    description: "Manage coaching programs and services.",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "tagline", type: "text" },
    { name: "summary", type: "textarea", required: true },
    { name: "description", type: "richText", editor: lexicalEditor({}) },
    { name: "targetAudience", type: "textarea" },
    {
      name: "outcomes",
      type: "array",
      fields: [{ name: "outcome", type: "text" }],
    },
    { name: "format", type: "text", admin: { description: "e.g. Virtual 1:1 Sessions" } },
    { name: "duration", type: "text", admin: { description: "e.g. 3 months / 12 sessions" } },
    {
      name: "pricing",
      type: "group",
      fields: [
        { name: "showPrice", type: "checkbox", defaultValue: false, label: "Show Price Publicly" },
        { name: "price", type: "text", admin: { condition: (_, siblingData) => siblingData.showPrice } },
        { name: "priceLabel", type: "text", defaultValue: "Investment", admin: { condition: (_, siblingData) => siblingData.showPrice } },
      ],
    },
    { name: "ctaLabel", type: "text", defaultValue: "Apply Now" },
    { name: "ctaHref", type: "text", defaultValue: "/book-call" },
    { name: "coverImage", type: "upload", relationTo: "media" },
    { name: "featured", type: "checkbox", defaultValue: false, label: "Featured Service" },
    { name: "order", type: "number", defaultValue: 0 },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      defaultValue: "draft",
    },
  ],
}
