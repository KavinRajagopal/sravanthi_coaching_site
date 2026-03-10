"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, ReactNode } from "react"
import { fadeUp } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "left" | "right" | "none"
}

export function ScrollReveal({ children, className, delay = 0, direction = "up" }: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })

  const variants = {
    up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
    none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
