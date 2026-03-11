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
    { name: "tagline", type: "text", defaultValue: "Setting the stage for memorable moments. Dallas, TX — open to travel." },
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
            { label: "Emcee & Hosting", href: "/services/emcee-hosting" },
            { label: "Leadership Launchpad", href: "/services/leadership-launchpad" },
            { label: "Speaking Coaching", href: "/services/speaking-coaching" },
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
    { name: "bottomText", type: "text", defaultValue: "© 2026 Sravanthi Prattipati. All rights reserved." },
  ],
}
