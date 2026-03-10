import { Metadata } from "next"
import { getPayload } from "@/lib/payload-client"
import { BlockRenderer } from "@/components/public/BlockRenderer"
import { Navbar } from "@/components/public/layout/Navbar"
import { Footer } from "@/components/public/layout/Footer"
import { CookieBanner } from "@/components/public/shared/CookieBanner"
import { HeroSection } from "@/components/public/sections/HeroSection"
import { StatsSection } from "@/components/public/sections/StatsSection"
import { TransformationSection } from "@/components/public/sections/TransformationSection"
import { ProgramsSection } from "@/components/public/sections/ProgramsSection"
import { TestimonialsSection } from "@/components/public/sections/TestimonialsSection"
import { SpeakingSection } from "@/components/public/sections/SpeakingSection"
import { BlogPreviewSection } from "@/components/public/sections/BlogPreviewSection"
import { CTASection } from "@/components/public/sections/CTASection"

// NOTE: src/app/(public)/page.tsx also resolves to "/" and conflicts with this file.
// One of the two must be deleted. This file (root page.tsx) takes precedence in Next.js.
// Delete src/app/(public)/page.tsx after verifying this file works correctly.

export const metadata: Metadata = {
  title: "Sravanthi Prattipati | Speaker & Confidence Coach",
  description:
    "Become the speaker people remember. Speaker coaching for ambitious professionals — stage presence, speaker identity, and confidence coaching.",
}

export default async function HomePage() {
  let navItems: any
  let footerData: any
  let siteSettings: any
  let homePage: any

  try {
    const payload = await getPayload()
    const [nav, footer, settings, pages] = await Promise.all([
      payload.findGlobal({ slug: "navigation" }),
      payload.findGlobal({ slug: "footer" }),
      payload.findGlobal({ slug: "site-settings" }),
      payload.find({
        collection: "pages",
        where: { and: [{ slug: { equals: "home" } }, { status: { equals: "published" } }] },
        limit: 1,
      }),
    ])
    navItems = nav?.items
    footerData = footer
    siteSettings = settings
    homePage = pages.docs[0]
  } catch {
    // Fall through — use defaults
  }

  const mainContent =
    homePage?.layout && homePage.layout.length > 0 ? (
      <BlockRenderer blocks={homePage.layout as any[]} />
    ) : (
      <>
        <HeroSection />
        <StatsSection />
        <TransformationSection />
        <ProgramsSection />
        <TestimonialsSection />
        <SpeakingSection />
        <BlogPreviewSection />
        <CTASection />
      </>
    )

  return (
    <>
      <Navbar items={navItems} siteName={siteSettings?.siteName} />
      <main>{mainContent}</main>
      <Footer
        tagline={footerData?.tagline}
        columns={footerData?.columns}
        bottomText={footerData?.bottomText}
        siteName={siteSettings?.siteName}
        socialLinks={siteSettings?.socialLinks}
      />
      <CookieBanner
        text={siteSettings?.cookieBanner?.text}
        ctaLabel={siteSettings?.cookieBanner?.ctaLabel}
      />
    </>
  )
}
