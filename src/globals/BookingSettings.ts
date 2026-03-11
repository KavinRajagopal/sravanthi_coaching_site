import type { GlobalConfig } from "payload"

export const BookingSettings: GlobalConfig = {
  slug: "booking-settings",
  label: "Booking Settings",
  admin: {
    description: "Configure the booking/scheduling integration for discovery calls.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "activeFlow",
      type: "select",
      options: [
        { label: "Direct Booking (Calendly / external link)", value: "direct" },
        { label: "Qualification Form then Booking", value: "qualify" },
        { label: "Contact Form Only", value: "form" },
      ],
      defaultValue: "direct",
      required: true,
    },
    {
      name: "bookingUrl",
      type: "text",
      defaultValue: "https://calendly.com/emceesravz/intro-meeting",
      label: "Booking URL (Calendly or similar)",
    },
    {
      name: "embedCode",
      type: "textarea",
      label: "Embed Code (optional — paste Calendly embed HTML)",
    },
    { name: "ctaLabel", type: "text", defaultValue: "Schedule a Discovery Call" },
    { name: "successMessage", type: "textarea", defaultValue: "Thank you! Your session is booked. Check your email for confirmation details." },
    {
      name: "pageHeadline", type: "text",
      defaultValue: "Let's talk about your next stage",
    },
    {
      name: "pageSubtext", type: "textarea",
      defaultValue: "Book a free 15-minute discovery call to explore how coaching can help you develop the stage presence, confidence, and speaking identity you've been building toward.",
    },
  ],
}
