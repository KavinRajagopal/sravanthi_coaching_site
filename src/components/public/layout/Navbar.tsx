"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
  isButton?: boolean
  openInNewTab?: boolean
}

interface NavbarProps {
  items?: NavItem[]
  siteName?: string
}

const defaultItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Book a Call", href: "/book-call", isButton: true },
]

export function Navbar({ items = defaultItems, siteName = "Sravanthi" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-brand-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl text-brand-text font-light tracking-wide hover:text-brand-gold transition-colors">
            {siteName}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {items.map((item) =>
              item.isButton ? (
                <Button
                  key={item.label}
                  asChild
                  className="bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white transition-all duration-300 px-6 rounded-none font-sans text-sm tracking-widest uppercase"
                >
                  <Link href={item.href} target={item.openInNewTab ? "_blank" : undefined}>
                    {item.label}
                  </Link>
                </Button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.openInNewTab ? "_blank" : undefined}
                  className="text-brand-muted hover:text-brand-text font-sans text-sm tracking-widest uppercase transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              )
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-brand-text p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-brand-bg flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button
              className="absolute top-5 right-6 text-brand-text"
              onClick={() => setMobileOpen(false)}
            >
              <X size={28} />
            </button>
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "font-display text-3xl font-light tracking-wide transition-colors",
                  item.isButton
                    ? "text-brand-gold hover:text-brand-gold-light"
                    : "text-brand-text hover:text-brand-gold"
                )}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
