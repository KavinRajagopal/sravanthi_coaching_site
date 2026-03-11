"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { staggerContainer, fadeUp } from "@/lib/animations"

interface HeroSectionProps {
  headline?: string
  subheadline?: string
  ctaPrimary?: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  heroImage?: { url: string; alt: string } | null
  backgroundImage?: { url: string; alt: string } | null
}

export function HeroSection({
  headline = "Sravanthi Prattipati",
  subheadline = "From weddings and Sangeets to corporate galas and celebrity interviews — bringing warmth, energy, and seamless flow to every event.",
  ctaPrimary = { label: "Book for Your Event", href: "/book-call" },
  ctaSecondary = { label: "View Services", href: "/services" },
  heroImage,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center bg-brand-bg overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-xl"
          >
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl sm:text-6xl md:text-7xl text-brand-text font-light italic leading-[1.1] mb-4"
            >
              {headline}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-brand-text font-sans text-sm md:text-base tracking-[0.3em] uppercase font-semibold mb-2"
            >
              Professional Emcee
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-brand-muted font-sans text-xs tracking-[0.2em] uppercase mb-8"
            >
              Speaker Coach &amp; Host
            </motion.p>

            <motion.p
              variants={fadeUp}
              transition={{ delay: 0.4 }}
              className="text-brand-muted text-lg md:text-xl leading-relaxed mb-10 max-w-md"
            >
              {subheadline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                className="bg-brand-gold hover:bg-brand-gold-light text-white font-medium px-8 py-6 text-sm tracking-widest uppercase rounded-none transition-all duration-300 hover:scale-[1.02]"
              >
                <Link href={ctaPrimary.href}>{ctaPrimary.label}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-brand-text text-brand-text hover:border-brand-gold hover:text-brand-gold bg-transparent px-8 py-6 text-sm tracking-widest uppercase rounded-none transition-all duration-300"
              >
                <Link href={ctaSecondary.href}>{ctaSecondary.label}</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="relative"
          >
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto">
              <Image
                src={heroImage?.url || "/images/sravanthi-hero.jpeg"}
                alt={heroImage?.alt || "Sravanthi Prattipati — Professional Emcee"}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
