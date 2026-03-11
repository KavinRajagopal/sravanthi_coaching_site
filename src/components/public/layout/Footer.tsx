import Link from "next/link"
import { Linkedin, Instagram, Twitter, Youtube } from "lucide-react"

interface FooterColumn {
  heading: string
  links: { label: string; href: string }[]
}

interface FooterProps {
  tagline?: string
  columns?: FooterColumn[]
  bottomText?: string
  siteName?: string
  socialLinks?: {
    linkedin?: string
    instagram?: string
    twitter?: string
    youtube?: string
  }
}

const defaultColumns: FooterColumn[] = [
  {
    heading: "Services",
    links: [
      { label: "Emcee & Hosting", href: "/#services" },
      { label: "Speaking Coaching", href: "/#services" },
      { label: "Book a Call", href: "/book-call" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Testimonials", href: "/testimonials" },
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
]

export function Footer({
  tagline = "Professional emcee, hosting services, and speaker coaching.",
  columns = defaultColumns,
  bottomText = "\u00A9 2026 Sravanthi Prattipati. All rights reserved.",
  siteName = "Sravanthi",
  socialLinks = {},
}: FooterProps) {
  return (
    <footer className="bg-brand-dark border-t border-brand-dark">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-display text-2xl text-brand-cream font-light tracking-wide">
              {siteName}
            </Link>
            <p className="mt-4 text-brand-cream/60 text-sm leading-relaxed max-w-xs">
              {tagline}
            </p>
            {/* Social links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                  className="text-brand-cream/50 hover:text-brand-gold transition-colors" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                  className="text-brand-cream/50 hover:text-brand-gold transition-colors" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                  className="text-brand-cream/50 hover:text-brand-gold transition-colors" aria-label="Twitter">
                  <Twitter size={18} />
                </a>
              )}
              {socialLinks.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"
                  className="text-brand-cream/50 hover:text-brand-gold transition-colors" aria-label="YouTube">
                  <Youtube size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-brand-cream font-sans text-xs tracking-widest uppercase mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}
                      className="text-brand-cream/50 hover:text-brand-gold text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-brand-cream/10">
          <p className="text-brand-cream/40 text-xs text-center">{bottomText}</p>
        </div>
      </div>
    </footer>
  )
}
