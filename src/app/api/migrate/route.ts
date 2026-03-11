import { NextResponse } from "next/server"
import { getPayload } from "@/lib/payload-client"

export async function GET() {
  try {
    const payload = await getPayload()

    // Find the home page
    const pages = await payload.find({
      collection: "pages",
      where: { slug: { equals: "home" } },
      limit: 1,
    })

    const homePage = pages.docs[0]
    if (!homePage) {
      return NextResponse.json({ error: "Home page not found" }, { status: 404 })
    }

    const layout = (homePage as any).layout as any[]
    if (!layout || layout.length === 0) {
      return NextResponse.json({ error: "No layout blocks found" }, { status: 404 })
    }

    let updated = false
    const updatedLayout = layout.map((block: any) => {
      // Update Stats block
      if (block.blockType === "stats" && block.stats) {
        const newStats = block.stats.map((stat: any) => {
          if (stat.label === "Corporate Clients") {
            updated = true
            return { ...stat, value: "200+", label: "People Coached", description: "In public speaking, confidence & stage presence" }
          }
          if (stat.label === "Industries") {
            updated = true
            return { ...stat, value: "10+", label: "Event Formats", description: "Conferences, pageants, launches, panels & more" }
          }
          return stat
        })
        return { ...block, stats: newStats }
      }

      // Update Why Sravanthi block
      if (block.blockType === "why-sravanthi" && block.items) {
        const newItems = block.items.map((item: any) => {
          if (item.title?.includes("Bilingual")) {
            updated = true
            return {
              ...item,
              title: "Multilingual — Telugu, Hindi & English",
              description: "Fluent in English, Telugu, and Hindi, and conversational in Tamil — seamlessly switching between languages to connect with diverse audiences.",
            }
          }
          return item
        })
        return { ...block, items: newItems }
      }

      return block
    })

    if (!updated) {
      return NextResponse.json({ message: "No changes needed — values already up to date" })
    }

    await payload.update({
      collection: "pages",
      id: homePage.id,
      data: { layout: updatedLayout } as any,
    })

    return NextResponse.json({ success: true, message: "Homepage stats and multilingual text updated!" })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
