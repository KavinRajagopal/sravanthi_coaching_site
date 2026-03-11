import { NextResponse } from "next/server"
import { getPayload } from "@/lib/payload-client"

export async function GET() {
  const changes: string[] = []

  try {
    const payload = await getPayload()

    // ─── Update homepage layout blocks (stats, why-sravanthi) ───────────
    const pages = await payload.find({
      collection: "pages",
      where: { slug: { equals: "home" } },
      limit: 1,
    })

    const homePage = pages.docs[0]
    if (homePage) {
      const layout = (homePage as any).layout as any[]
      if (layout && layout.length > 0) {
        let layoutUpdated = false
        const updatedLayout = layout.map((block: any) => {
          if (block.blockType === "stats" && block.stats) {
            const newStats = block.stats.map((stat: any) => {
              if (stat.label === "Corporate Clients") {
                layoutUpdated = true
                return { ...stat, value: "200+", label: "People Coached", description: "In public speaking, confidence & stage presence" }
              }
              if (stat.label === "Industries") {
                layoutUpdated = true
                return { ...stat, value: "10+", label: "Event Formats", description: "Conferences, pageants, launches, panels & more" }
              }
              return stat
            })
            return { ...block, stats: newStats }
          }

          if (block.blockType === "why-sravanthi" && block.items) {
            const newItems = block.items.map((item: any) => {
              if (item.title?.includes("Bilingual")) {
                layoutUpdated = true
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

        if (layoutUpdated) {
          await payload.update({
            collection: "pages",
            id: homePage.id,
            data: { layout: updatedLayout } as any,
          })
          changes.push("Homepage layout blocks updated (stats, why-sravanthi)")
        }
      }
    }

    // ─── Update services collection ─────────────────────────────────────
    const services = await payload.find({ collection: "services", limit: 100 })

    for (const service of services.docs) {
      const s = service as any

      // Update Leadership Launchpad service
      if (s.title?.includes("Leadership Launchpad")) {
        await payload.update({
          collection: "services",
          id: s.id,
          data: {
            title: "Leadership Launchpad",
            tagline: "Empowering the next generation",
            summary: "Private & group coaching to help individuals build confidence, communicate clearly, and develop leadership through public speaking and emceeing skills.",
            outcomes: [
              { outcome: "Private 1-on-1 coaching sessions" },
              { outcome: "Public speaking, storytelling & audience engagement" },
              { outcome: "Leadership skills & hosting practice" },
              { outcome: "Final mock event showcase" },
            ],
            format: "Virtual or In-Person",
            duration: "Packages starting at $599",
            ctaLabel: "Explore",
            ctaHref: "/leadership-launchpad",
          } as any,
        })
        changes.push("Leadership Launchpad service updated")
      }

      // Update Speaking Coaching service
      if (s.title?.includes("Speaking Coaching")) {
        await payload.update({
          collection: "services",
          id: s.id,
          data: {
            ctaLabel: "Book a Call",
            ctaHref: "/book-call",
          } as any,
        })
        changes.push("Speaking Coaching CTA updated")
      }
    }

    if (changes.length === 0) {
      return NextResponse.json({ message: "No changes needed — everything is up to date" })
    }

    return NextResponse.json({ success: true, changes })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
