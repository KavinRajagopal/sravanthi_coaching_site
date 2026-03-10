import type { CollectionConfig } from "payload"

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    description: "Upload and manage images and media assets.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Alt Text",
    },
  ],
  upload: true,
}
