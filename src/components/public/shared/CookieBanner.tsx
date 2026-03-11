"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface CookieBannerProps {
  text?: string
  ctaLabel?: string
}

export function CookieBanner({
  text = "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
  ctaLabel = "Got it",
}: CookieBannerProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const consent = localStorage.getItem("cookie-consent")
      if (!consent) setVisible(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  const accept = () => {
    localStorage.setItem("cookie-consent", "true")
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-brand-border p-4 md:p-6 shadow-lg"
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-brand-muted text-sm leading-relaxed max-w-2xl">{text}</p>
            <Button
              onClick={accept}
              className="shrink-0 bg-brand-gold hover:bg-brand-gold-light text-white font-medium px-6"
            >
              {ctaLabel}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
