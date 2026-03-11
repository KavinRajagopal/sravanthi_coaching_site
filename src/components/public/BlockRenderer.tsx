import { HeroSection } from "@/components/public/sections/HeroSection"
import { AboutSection } from "@/components/public/sections/AboutSection"
import { TransformationSection } from "@/components/public/sections/TransformationSection"
import { ProgramsSection } from "@/components/public/sections/ProgramsSection"
import { TestimonialsSection } from "@/components/public/sections/TestimonialsSection"
import { SpeakingSection } from "@/components/public/sections/SpeakingSection"
import { CTASection } from "@/components/public/sections/CTASection"
import { StatsSection } from "@/components/public/sections/StatsSection"
import { BlogPreviewSection } from "@/components/public/sections/BlogPreviewSection"
import { FAQSection } from "@/components/public/sections/FAQSection"
import { RichTextSection } from "@/components/public/sections/RichTextSection"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Block = { blockType: string; [key: string]: any }

interface BlockRendererProps {
  blocks: Block[]
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.blockType) {
          case "hero":
            return <HeroSection key={i} {...block} />
          case "about":
            return <AboutSection key={i} {...block} />
          case "transformation":
            return <TransformationSection key={i} {...block} />
          case "programs":
            return <ProgramsSection key={i} {...block} />
          case "testimonials":
            return <TestimonialsSection key={i} {...block} />
          case "speaking":
            return <SpeakingSection key={i} {...block} />
          case "cta":
            return <CTASection key={i} {...block} />
          case "stats":
            return <StatsSection key={i} {...block} />
          case "blog-preview":
            return <BlogPreviewSection key={i} {...block} />
          case "faq":
            return <FAQSection key={i} {...block} />
          case "rich-text":
            return <RichTextSection key={i} {...block} />
          default:
            return null
        }
      })}
    </>
  )
}
