import type { CollectionConfig } from "payload"
import { HeroBlock } from "@/blocks/Hero.block"
import { AboutBlock } from "@/blocks/About.block"
import { TransformationBlock } from "@/blocks/Transformation.block"
import { ProgramsBlock } from "@/blocks/Programs.block"
import { TestimonialsBlock } from "@/blocks/Testimonials.block"
import { SpeakingBlock } from "@/blocks/Speaking.block"
import { CTABlock } from "@/blocks/CTA.block"
import { StatsBlock } from "@/blocks/Stats.block"
import { BlogPreviewBlock } from "@/blocks/BlogPreview.block"
import { RichTextBlock } from "@/blocks/RichText.block"
import { FAQBlock } from "@/blocks/FAQ.block"
import { WhySravanthiBlock } from "@/blocks/WhySravanthi.block"
import { InstagramBlock } from "@/blocks/Instagram.block"
import { PackagesBlock } from "@/blocks/Packages.block"

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    description: "Manage all website pages and their content sections.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: "URL path (e.g. 'home', 'about')" },
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      defaultValue: "draft",
      required: true,
    },
    {
      name: "layout",
      type: "blocks",
      blocks: [
        HeroBlock,
        AboutBlock,
        TransformationBlock,
        ProgramsBlock,
        TestimonialsBlock,
        SpeakingBlock,
        CTABlock,
        StatsBlock,
        BlogPreviewBlock,
        RichTextBlock,
        FAQBlock,
        WhySravanthiBlock,
        InstagramBlock,
        PackagesBlock,
      ],
    },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "title", type: "text", label: "SEO Title" },
        { name: "description", type: "textarea", label: "Meta Description" },
        { name: "ogImage", type: "upload", relationTo: "media", label: "OG Image" },
        { name: "noindex", type: "checkbox", defaultValue: false, label: "No Index" },
      ],
    },
  ],
}
