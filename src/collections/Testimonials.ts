import type { CollectionConfig } from "payload"

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "clientName",
    description: "Manage client testimonials and success stories.",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "quote", type: "textarea", required: true },
    { name: "clientName", type: "text", required: true },
    { name: "clientTitle", type: "text" },
    { name: "company", type: "text" },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "videoUrl", type: "text", label: "Video Testimonial URL" },
    {
      name: "rating",
      type: "number",
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    { name: "result", type: "text", admin: { description: "e.g. Landed a TEDx talk" } },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "order", type: "number", defaultValue: 0 },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      defaultValue: "published",
    },
  ],
}
