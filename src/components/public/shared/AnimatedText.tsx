"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}

export function AnimatedText({ text, className, delay = 0 }: AnimatedTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })
  const words = text.split(" ")

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.07, delayChildren: delay },
    },
  }

  const wordVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
    },
  }

  return (
    <motion.span
      ref={ref}
      className={cn("inline", className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={container}
    >
      {words.map((word, i) => (
        <motion.span key={i} className="inline-block mr-[0.25em]" variants={wordVariant}>
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}
