import type { GlobalConfig } from "payload"

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    description: "Global site configuration — name, logo, contact, analytics.",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "siteName", type: "text", defaultValue: "Sravanthi Prattipati", required: true },
    { name: "logo", type: "upload", relationTo: "media" },
    { name: "favicon", type: "upload", relationTo: "media" },
    { name: "contactEmail", type: "email", defaultValue: "hello@sravanthi.com" },
    { name: "contactPhone", type: "text" },
    { name: "location", type: "text", defaultValue: "Global | Virtual" },
    { name: "googleAnalyticsId", type: "text", label: "Google Analytics ID (GA4)" },
    { name: "metaPixelId", type: "text", label: "Meta Pixel ID (optional)" },
    {
      name: "cookieBanner",
      type: "group",
      fields: [
        { name: "text", type: "text", defaultValue: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies." },
        { name: "ctaLabel", type: "text", defaultValue: "Got it" },
      ],
    },
    { name: "instagramUrl", type: "text", label: "Instagram Profile URL", admin: { description: "Full Instagram URL for the Instagram section on the homepage" } },
    { name: "elfsightWidgetId", type: "text", label: "Elfsight Instagram Widget ID", admin: { description: "Widget ID from Elfsight (e.g. abc123-def456). Sign up at elfsight.com, create an Instagram Feed widget, and paste the ID here." } },
    {
      name: "socialLinks",
      type: "group",
      fields: [
        { name: "linkedin", type: "text" },
        { name: "instagram", type: "text" },
        { name: "twitter", type: "text" },
        { name: "youtube", type: "text" },
        { name: "facebook", type: "text" },
      ],
    },
  ],
}
