import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sravanthi.com"

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sravanthi Prattipati",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  description: "Speaker coaching for ambitious professionals — stage presence, speaker identity, and confidence coaching.",
  sameAs: [
    "https://www.linkedin.com/in/sravanthi-prattipati",
    "https://www.instagram.com/sravanthicoaches",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@sravanthi.com",
    contactType: "customer service",
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
    default: "Sravanthi Prattipati | Speaker & Confidence Coach",
    template: "%s | Sravanthi Prattipati",
  },
  description:
    "Become the speaker people remember. Speaker coaching for ambitious professionals — stage presence, speaker identity, and confidence coaching.",
  keywords: [
    "speaker coach",
    "confidence coach",
    "stage presence",
    "public speaking coach",
    "Sravanthi Prattipati",
    "executive presence",
    "communication coaching",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Sravanthi Prattipati",
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
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
