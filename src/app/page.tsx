import { Metadata } from "next"
export const revalidate = 300
import { getPayload } from "@/lib/payload-client"
import { BlockRenderer } from "@/components/public/BlockRenderer"
import { Navbar } from "@/components/public/layout/Navbar"
import { Footer } from "@/components/public/layout/Footer"
import { CookieBanner } from "@/components/public/shared/CookieBanner"
import { HeroSection } from "@/components/public/sections/HeroSection"
import { StatsSection } from "@/components/public/sections/StatsSection"
import { ProgramsSection } from "@/components/public/sections/ProgramsSection"
import { TestimonialsSection } from "@/components/public/sections/TestimonialsSection"
import { SpeakingSection } from "@/components/public/sections/SpeakingSection"
import { WhySravanthiSection } from "@/components/public/sections/WhySravanthiSection"
import { PackagesSection } from "@/components/public/sections/PackagesSection"
import { CTASection } from "@/components/public/sections/CTASection"

export const metadata: Metadata = {
  title: "Emcee Sravz | Sravanthi Prattipati — Emcee & Event Host",
  description:
    "Bringing warmth, energy, and unforgettable moments to every stage. Emcee services for weddings, corporate events, and celebrations. Based in Dallas, TX.",
  alternates: { canonical: "/" },
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
      <BlockRenderer blocks={homePage.layout as any[]} siteSettings={siteSettings} />
    ) : (
      <>
        <HeroSection />
        <StatsSection />
        <WhySravanthiSection />
        <ProgramsSection />
        <PackagesSection />
        <SpeakingSection elfsightWidgetId={siteSettings?.elfsightWidgetId} />
        <TestimonialsSection />
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
