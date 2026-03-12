export const revalidate = 300

import { Navbar } from "@/components/public/layout/Navbar"
import { Footer } from "@/components/public/layout/Footer"
import { CookieBanner } from "@/components/public/shared/CookieBanner"
import { getPayload } from "@/lib/payload-client"

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  let navItems
  let footerData
  let siteSettings

  try {
    const payload = await getPayload()
    const [nav, footer, settings] = await Promise.all([
      payload.findGlobal({ slug: "navigation" }),
      payload.findGlobal({ slug: "footer" }),
      payload.findGlobal({ slug: "site-settings" }),
    ])
    navItems = nav?.items
    footerData = footer
    siteSettings = settings
  } catch {
    // Use defaults if Payload not yet configured
  }

  return (
    <>
      <Navbar items={navItems} siteName={siteSettings?.siteName} />
      <main>{children}</main>
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
