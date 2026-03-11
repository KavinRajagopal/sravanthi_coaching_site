import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "@/components/public/shared/WhatsAppButton";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sravanthi.com"

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Emcee Sravz — Sravanthi Prattipati",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  description: "Bringing warmth, energy, and unforgettable moments to every stage. Emcee services for weddings, corporate events, and celebrations. Based in Dallas, TX.",
  sameAs: [
    "https://www.linkedin.com/in/sravanthi-prattipati",
    "https://www.instagram.com/emcee_sravz/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "psravanthi108@gmail.com",
    telephone: "682-238-0691",
    contactType: "customer service",
    areaServed: "US",
  },
}

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Emcee Sravz | Sravanthi Prattipati — Emcee & Event Host",
    template: "%s | Emcee Sravz",
  },
  description:
    "Bringing warmth, energy, and unforgettable moments to every stage. Emcee services for weddings, Sangeets, corporate events, and celebrations. Dallas, TX.",
  keywords: [
    "emcee",
    "event host",
    "wedding emcee",
    "Sangeet emcee",
    "corporate emcee",
    "Sravanthi Prattipati",
    "Emcee Sravz",
    "Dallas TX emcee",
    "Indian wedding emcee",
    "Telugu emcee",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Emcee Sravz",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased font-sans">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
