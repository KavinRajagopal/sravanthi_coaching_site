"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedText } from "@/components/public/shared/AnimatedText"
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
  headline = "Become the speaker people remember.",
  subheadline = "Speaker coaching for ambitious professionals who are done playing small.",
  ctaPrimary = { label: "Book a Discovery Call", href: "/book-call" },
  ctaSecondary = { label: "Explore Programs", href: "/services" },
  heroImage,
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center bg-brand-black overflow-hidden">
      {/* Background */}
      {backgroundImage ? (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt}
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-brand-black/40" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-black to-brand-elevated">
          {/* Subtle gold gradient orb */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-brand-gold/3 rounded-full blur-3xl" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className={`grid ${heroImage ? "grid-cols-1 lg:grid-cols-2 gap-16" : "grid-cols-1"} items-center`}>
          {/* Text content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-brand-gold font-sans text-xs tracking-[0.3em] uppercase mb-6"
            >
              Speaker & Confidence Coach
            </motion.p>

            <h1 className="font-display font-light text-brand-cream leading-[1.05] mb-8">
              <AnimatedText
                text={headline}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                delay={0.2}
              />
            </h1>

            <motion.p
              variants={fadeUp}
              transition={{ delay: 0.8 }}
              className="text-brand-muted text-lg md:text-xl leading-relaxed mb-12 max-w-xl"
            >
              {subheadline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                className="bg-brand-gold hover:bg-brand-gold-light text-brand-black font-medium px-8 py-6 text-sm tracking-widest uppercase rounded-none transition-all duration-300 hover:scale-[1.02]"
              >
                <Link href={ctaPrimary.href}>{ctaPrimary.label}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-brand-muted text-brand-cream hover:border-brand-gold hover:text-brand-gold bg-transparent px-8 py-6 text-sm tracking-widest uppercase rounded-none transition-all duration-300"
              >
                <Link href={ctaSecondary.href}>{ctaSecondary.label}</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero image */}
          {heroImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-[3/4] max-w-md mx-auto">
                <div className="absolute inset-0 border border-brand-gold/30 translate-x-4 translate-y-4" />
                <Image
                  src={heroImage.url}
                  alt={heroImage.alt}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/30 to-transparent" />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="text-brand-gold/60" size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
