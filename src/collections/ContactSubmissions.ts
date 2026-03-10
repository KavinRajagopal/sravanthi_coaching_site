import type { CollectionConfig } from "payload"

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  admin: {
    useAsTitle: "name",
    description: "Incoming inquiries and contact form submissions.",
    defaultColumns: ["name", "email", "status", "createdAt"],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text" },
    { name: "role", type: "text", label: "Company / Role" },
    { name: "helpNeeded", type: "textarea", label: "What help do you need?" },
    { name: "challenge", type: "textarea", label: "Current speaking challenge" },
    { name: "goals", type: "textarea" },
    { name: "budget", type: "text", label: "Budget range" },
    { name: "consent", type: "checkbox", required: true },
    {
      name: "status",
      type: "select",
      options: [
        { label: "New", value: "new" },
        { label: "Reviewed", value: "reviewed" },
        { label: "Followed Up", value: "followed-up" },
      ],
      defaultValue: "new",
    },
  ],
  timestamps: true,
}
