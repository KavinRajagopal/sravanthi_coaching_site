import type { GlobalConfig } from "payload"

export const FooterGlobal: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  admin: {
    description: "Footer content and links.",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "tagline", type: "text", defaultValue: "Helping ambitious professionals become the speakers people remember." },
    {
      name: "columns",
      type: "array",
      fields: [
        { name: "heading", type: "text" },
        {
          name: "links",
          type: "array",
          fields: [
            { name: "label", type: "text" },
            { name: "href", type: "text" },
          ],
        },
      ],
      defaultValue: [
        {
          heading: "Services",
          links: [
            { label: "1:1 Coaching", href: "/services/private-coaching" },
            { label: "Group Program", href: "/services/group-program" },
            { label: "VIP Intensive", href: "/services/vip-intensive" },
            { label: "Speaking", href: "/services/speaking" },
          ],
        },
        {
          heading: "Company",
          links: [
            { label: "About", href: "/about" },
            { label: "Blog", href: "/blog" },
            { label: "Testimonials", href: "/testimonials" },
            { label: "Book a Call", href: "/book-call" },
          ],
        },
        {
          heading: "Legal",
          links: [
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms & Conditions", href: "/terms" },
            { label: "Cookie Policy", href: "/cookie-policy" },
          ],
        },
      ],
    },
    { name: "bottomText", type: "text", defaultValue: "© 2024 Sravanthi Prattipati. All rights reserved." },
  ],
}
