import { NextRequest, NextResponse } from "next/server"
import { getPayload } from "@/lib/payload-client"

// Protect with a secret token: call with ?token=YOUR_SEED_SECRET
const SEED_SECRET = process.env.SEED_SECRET || "seed-sravanthi-2024"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token")

  if (token !== SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const results: string[] = []
  const errors: string[] = []

  try {
    const payload = await getPayload()
    results.push("✅ Database connected")

    // ─── Admin User ────────────────────────────────────────────────────────
    try {
      const existing = await payload.find({ collection: "users", limit: 1 })
      if (existing.docs.length === 0) {
        await payload.create({
          collection: "users",
          data: {
            email: "admin@sravanthi.com",
            password: "changeme123!",
            name: "Sravanthi Admin",
            role: "admin",
          },
        })
        results.push("✅ Admin user created (admin@sravanthi.com / changeme123!)")
      } else {
        results.push("⏭️ Admin user already exists")
      }
    } catch (err: any) {
      errors.push(`❌ Admin user: ${err.message}`)
    }

    // ─── Services (delete old + recreate) ─────────────────────────────────
    try {
      const existing = await payload.find({ collection: "services", limit: 100 })
      for (const doc of existing.docs) {
        await payload.delete({ collection: "services", id: doc.id })
      }
      const servicesData = [
        {
          title: "Emcee & Hosting Services",
          slug: "emcee-hosting",
          tagline: "Your event, elevated",
          summary: "Professional emcee for weddings, Sangeets, Sweet 16s, coming-of-age celebrations, corporate galas, conferences, and more. Engaging audiences with warmth, energy, and seamless flow.",
          outcomes: [
            { outcome: "Weddings, Sangeets & Indian celebrations" },
            { outcome: "Corporate events, galas & conferences" },
            { outcome: "Celebrity & VIP interviews" },
            { outcome: "Birthday parties & milestone events" },
          ],
          targetAudience: "Families, event organizers, and corporate teams looking for a professional emcee who brings warmth, bilingual fluency, and personalized preparation to every event.",
          format: "In-Person or Virtual",
          duration: "Custom",
          ctaLabel: "Enquire Now",
          ctaHref: "/book-call",
          featured: true,
          order: 1,
          status: "published",
        },
        {
          title: "Speaking Coaching & Workshops",
          slug: "speaking-coaching",
          tagline: "Find your voice",
          summary: "1:1 coaching and group workshops to develop your speaking presence, confidence, and presentation skills for any stage or boardroom.",
          outcomes: [
            { outcome: "1:1 speaker coaching" },
            { outcome: "Group workshops" },
            { outcome: "Presentation skills training" },
            { outcome: "Corporate training sessions" },
          ],
          targetAudience: "Professionals who want to develop their speaking confidence and presentation skills.",
          format: "Virtual or In-Person",
          duration: "Custom",
          ctaLabel: "Book a Call",
          ctaHref: "/book-call",
          featured: false,
          order: 2,
          status: "published",
        },
      ]
      for (const service of servicesData) {
        await payload.create({ collection: "services", data: service })
      }
      results.push("✅ Services recreated (2 — Emcee + Speaking Coaching)")
    } catch (err: any) {
      errors.push(`❌ Services: ${err.message}`)
    }

    // ─── Testimonials ──────────────────────────────────────────────────────
    try {
      const existing = await payload.find({ collection: "testimonials", limit: 1 })
      if (existing.docs.length === 0) {
        const testimonialsData = [
          { quote: "Working with Sravanthi completely transformed how I show up on stage. I used to shrink — now I own every room I walk into. My TEDx application was accepted three weeks after we finished our program.", clientName: "Priya Mehta", clientTitle: "Founder & CEO", company: "Meridian Ventures", result: "Accepted for TEDx Talk", rating: 5, featured: true, order: 1, status: "published" },
          { quote: "Sravanthi works at the identity level. The shift in my executive presence has been recognized by my leadership team and my clients. This is completely different from any presentation training I've done before.", clientName: "James Okonkwo", clientTitle: "VP of Engineering", company: "TechScale Inc.", result: "Promoted 3 months after coaching", rating: 5, featured: true, order: 2, status: "published" },
          { quote: "I was terrified of public speaking. Now I actively seek out speaking opportunities. Sravanthi didn't just teach me techniques — she helped me find my voice and trust it completely.", clientName: "Aisha Rahman", clientTitle: "Senior Manager", company: "Global Finance Corp", result: "Delivered keynote at industry conference", rating: 5, featured: true, order: 3, status: "published" },
          { quote: "The ROI on this coaching has been extraordinary. Within 6 months I landed two major speaking engagements and my consulting rates doubled. Sravanthi's method is the real deal.", clientName: "Carlos Vega", clientTitle: "Leadership Consultant", company: "Independent", result: "Doubled consulting rates", rating: 5, featured: true, order: 4, status: "published" },
          { quote: "Sravanthi has a rare gift for seeing exactly what's holding you back and creating the precise environment to break through it. My communication style has completely elevated.", clientName: "Dr. Sarah Lin", clientTitle: "Medical Director", company: "HealthBridge", result: "Conference keynote speaker", rating: 5, featured: false, order: 5, status: "published" },
          { quote: "I came in thinking I needed to improve my delivery. What I discovered was that I needed to stop hiding. Sravanthi helped me step fully into who I am as a communicator. Genuinely life-changing.", clientName: "Marcus Thompson", clientTitle: "Entrepreneur", company: "ThinkShift Labs", result: "Featured in Forbes 30 Under 30", rating: 5, featured: false, order: 6, status: "published" },
        ]
        for (const t of testimonialsData) {
          await payload.create({ collection: "testimonials", data: t })
        }
        results.push("✅ Testimonials created (6)")
      } else {
        results.push("⏭️ Testimonials already exist")
      }
    } catch (err: any) {
      errors.push(`❌ Testimonials: ${err.message}`)
    }

    // ─── Categories ────────────────────────────────────────────────────────
    const categoryIds: Record<string, string> = {}
    try {
      const existing = await payload.find({ collection: "categories", limit: 10 })
      if (existing.docs.length === 0) {
        const cats = [
          { name: "Speaking Tips", slug: "speaking-tips" },
          { name: "Executive Presence", slug: "executive-presence" },
          { name: "Confidence", slug: "confidence" },
          { name: "Personal Branding", slug: "personal-branding" },
        ]
        for (const cat of cats) {
          const created = await payload.create({ collection: "categories", data: cat })
          categoryIds[cat.slug] = created.id as string
        }
        results.push("✅ Categories created (4)")
      } else {
        for (const cat of existing.docs) {
          categoryIds[cat.slug as string] = cat.id as string
        }
        results.push("⏭️ Categories already exist")
      }
    } catch (err: any) {
      errors.push(`❌ Categories: ${err.message}`)
    }

    // ─── Blog Posts ────────────────────────────────────────────────────────
    const emptyLexical = { root: { type: "root", children: [{ type: "paragraph", children: [{ type: "text", text: "Full article content coming soon.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1 }], direction: "ltr", format: "", indent: 0, version: 1 } }
    try {
      const existing = await payload.find({ collection: "blog-posts", limit: 1 })
      if (existing.docs.length === 0) {
        const posts = [
          { title: "5 Habits That Separate Memorable Speakers from Forgettable Ones", slug: "5-habits-memorable-speakers", excerpt: "Discover the daily practices that transform ordinary communicators into speakers who leave lasting impressions.", content: emptyLexical, author: "Sravanthi Prattipati", status: "published", publishedAt: new Date("2026-01-15").toISOString(), categories: categoryIds["speaking-tips"] ? [categoryIds["speaking-tips"]] : [] },
          { title: "The Stage Fright Reframe: How to Turn Nerves into Presence", slug: "stage-fright-reframe", excerpt: "What if your pre-speaking anxiety wasn't a problem to solve, but a signal pointing toward something powerful?", content: emptyLexical, author: "Sravanthi Prattipati", status: "published", publishedAt: new Date("2025-12-01").toISOString(), categories: categoryIds["confidence"] ? [categoryIds["confidence"]] : [] },
          { title: "Why Your Speaker Identity Matters More Than Your Slides", slug: "speaker-identity-matters", excerpt: "The most impactful speakers don't just deliver content. They deliver themselves.", content: emptyLexical, author: "Sravanthi Prattipati", status: "published", publishedAt: new Date("2025-11-01").toISOString(), categories: categoryIds["personal-branding"] ? [categoryIds["personal-branding"]] : [] },
        ]
        for (const post of posts) {
          await payload.create({ collection: "blog-posts", data: post as any })
        }
        results.push("✅ Blog posts created (3)")
      } else {
        results.push("⏭️ Blog posts already exist")
      }
    } catch (err: any) {
      errors.push(`❌ Blog posts: ${err.message}`)
    }

    // ─── Legal Pages ───────────────────────────────────────────────────────
    try {
      const existing = await payload.find({ collection: "legal-pages", limit: 1 })
      if (existing.docs.length === 0) {
        await payload.create({ collection: "legal-pages", data: { title: "Privacy Policy", type: "privacy", content: emptyLexical } })
        await payload.create({ collection: "legal-pages", data: { title: "Terms & Conditions", type: "terms", content: emptyLexical } })
        await payload.create({ collection: "legal-pages", data: { title: "Cookie Policy", type: "cookies", content: emptyLexical } })
        results.push("✅ Legal pages created (privacy, terms, cookies)")
      } else {
        results.push("⏭️ Legal pages already exist")
      }
    } catch (err: any) {
      errors.push(`❌ Legal pages: ${err.message}`)
    }

    // ─── Homepage (delete old + recreate) ─────────────────────────────────
    try {
      const existing = await payload.find({ collection: "pages", where: { slug: { equals: "home" } }, limit: 1 })
      // Always delete and recreate to get latest content
      for (const doc of existing.docs) {
        await payload.delete({ collection: "pages", id: doc.id })
      }

      const services = await payload.find({ collection: "services", limit: 10 })
      const serviceIds = services.docs.map((s: any) => s.id)
      const testimonials = await payload.find({ collection: "testimonials", limit: 6 })
      const testimonialIds = testimonials.docs.map((t: any) => t.id)

      await payload.create({
        collection: "pages",
        data: {
          title: "Home",
          slug: "home",
          status: "published",
          layout: [
            {
              blockType: "hero",
              headline: "Sravanthi Prattipati",
              subheadline: "From weddings and Sangeets to corporate galas and celebrity interviews — bringing warmth, energy, and seamless flow to every event.",
              ctaPrimary: { label: "Book for Your Event", href: "/book-call" },
              ctaSecondary: { label: "View Services", href: "/services" },
            },
            {
              blockType: "stats",
              stats: [
                { value: "100+", label: "Events Hosted", description: "Corporate & social events" },
                { value: "50+", label: "Corporate Clients", description: "Trusted partnerships" },
                { value: "5+", label: "Years Experience", description: "In emcee & speaker coaching" },
                { value: "10+", label: "Industries", description: "Across diverse sectors" },
              ],
            },
            {
              blockType: "why-sravanthi",
              sectionTitle: "Why Sravanthi",
              subtitle: "What makes every event special.",
              items: [
                { title: "Personalized Preparation", description: "Every event is different. Sravanthi personally prepares for each one — understanding the audience, the tone, and the goals to deliver a truly tailored experience.", iconName: "ClipboardList" },
                { title: "Genuine Charisma", description: "A natural warmth and energy that connects with audiences instantly. Sravanthi makes every guest and attendee feel welcome and engaged.", iconName: "Heart" },
                { title: "Bilingual — Telugu & English", description: "Fluent in both Telugu and English, Sravanthi seamlessly switches between languages to connect with diverse audiences at Indian celebrations and corporate events alike.", iconName: "Globe" },
                { title: "Plans Games & Activities", description: "Not just hosting — Sravanthi plans and leads interactive games, icebreakers, and audience activities that keep the energy high throughout your event.", iconName: "Gamepad2" },
                { title: "Weddings to Corporate Stages", description: "From intimate Sangeets and Sweet 16s to large-scale corporate galas and celebrity interviews — Sravanthi brings the right energy to every occasion.", iconName: "Mic" },
                { title: "Memorable Moments", description: "Every event deserves moments that people talk about long after. Sravanthi creates those moments with spontaneity, humour, and heart.", iconName: "Sparkles" },
              ],
            },
            {
              blockType: "programs",
              sectionTitle: "Services",
              subtitle: "How we can work together.",
              programs: serviceIds,
            },
            {
              blockType: "speaking",
              sectionTitle: "Past Events & Appearances",
              subtitle: "Emcee · Speaker · Workshop Facilitator",
              appearances: [
                { event: "Grand Wedding Celebration", date: "2026", topic: "Wedding Emcee — Telugu & English", type: "Emcee" },
                { event: "Tech Leadership Summit", date: "2026", topic: "Corporate Emcee & Host", type: "Emcee" },
                { event: "Celebrity Interview Series", date: "2025", topic: "Interviewing actors & public figures", type: "Interview" },
                { event: "Sangeet Night Celebration", date: "2025", topic: "Games, dances & entertainment", type: "Emcee" },
                { event: "Corporate Innovation Gala", date: "2025", topic: "Awards ceremony host", type: "Emcee" },
                { event: "Sweet 16 & Coming of Age", date: "2025", topic: "Milestone celebration host", type: "Emcee" },
              ],
            },
            {
              blockType: "testimonials",
              sectionTitle: "What clients are saying",
              testimonials: testimonialIds,
            },
            {
              blockType: "instagram",
              instagramUrl: "https://instagram.com/sravanthi",
              handle: "@sravanthi",
              subtitle: "Behind the scenes, event highlights, and speaking tips.",
            },
            {
              blockType: "cta",
              headline: "Ready to elevate your next event?",
              subtext: "Book a free discovery call and let's talk about how we can work together.",
              ctaLabel: "Schedule a Discovery Call",
              ctaHref: "/book-call",
              backgroundStyle: "dark",
            },
          ] as any,
          seo: {
            title: "Sravanthi Prattipati | Emcee & Speaker Coach",
            description: "Professional emcee, hosting services, and speaker coaching. Fulfilling events, one at a time.",
          },
        },
      })
      results.push("✅ Homepage recreated with emcee-focused content")
    } catch (err: any) {
      errors.push(`❌ Homepage: ${err.message}`)
    }

    // ─── Site Settings ─────────────────────────────────────────────────────
    try {
      await payload.updateGlobal({
        slug: "site-settings",
        data: {
          siteName: "Sravanthi",
          contactEmail: "hello@sravanthi.com",
          cookieBanner: { text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.", ctaLabel: "Got it" },
        },
      })
      results.push("✅ Site settings configured")
    } catch (err: any) {
      errors.push(`❌ Site settings: ${err.message}`)
    }

    // ─── Booking Settings ──────────────────────────────────────────────────
    try {
      await payload.updateGlobal({
        slug: "booking-settings",
        data: {
          activeFlow: "direct",
          bookingUrl: "https://calendly.com/sravanthi",
          ctaLabel: "Schedule a Discovery Call",
          pageHeadline: "Let's talk about your next event",
          pageSubtext: "Book a free 30-minute discovery call to explore how we can work together to make your next event unforgettable.",
          successMessage: "Thank you! Your session is booked. Check your email for confirmation details.",
        },
      })
      results.push("✅ Booking settings configured")
    } catch (err: any) {
      errors.push(`❌ Booking settings: ${err.message}`)
    }

    return NextResponse.json({
      success: true,
      message: "Seed complete!",
      results,
      errors,
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
