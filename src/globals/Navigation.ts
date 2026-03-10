import type { GlobalConfig } from "payload"

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation",
  admin: {
    description: "Main site navigation links.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "items",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
        { name: "isButton", type: "checkbox", defaultValue: false, label: "Display as CTA button" },
        { name: "openInNewTab", type: "checkbox", defaultValue: false },
      ],
      defaultValue: [
        { label: "About", href: "/about", isButton: false },
        { label: "Services", href: "/services", isButton: false },
        { label: "Blog", href: "/blog", isButton: false },
        { label: "Book a Call", href: "/book-call", isButton: true },
      ],
    },
  ],
}
