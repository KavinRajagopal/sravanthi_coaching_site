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

    // ─── Services ──────────────────────────────────────────────────────────
    try {
      const existing = await payload.find({ collection: "services", limit: 1 })
      if (existing.docs.length === 0) {
        const servicesData = [
          {
            title: "Signature 1:1 Coaching",
            slug: "private-coaching",
            tagline: "The deep-dive transformation",
            summary: "An intimate, high-touch coaching experience tailored entirely to your speaking goals, stage presence challenges, and personal brand vision.",
            outcomes: [
              { outcome: "Weekly 1:1 coaching sessions" },
              { outcome: "Personalized speaker development roadmap" },
              { outcome: "Video review & detailed feedback" },
              { outcome: "Speaking opportunity strategy" },
              { outcome: "On-camera performance coaching" },
            ],
            targetAudience: "Ambitious professionals who want deep, lasting transformation in their speaking presence and are ready to invest fully in their growth.",
            format: "Virtual 1:1 Sessions",
            duration: "3 or 6 months",
            ctaLabel: "Apply Now",
            ctaHref: "/book-call",
            featured: true,
            order: 1,
            status: "published",
          },
          {
            title: "Group Coaching Program",
            slug: "group-program",
            tagline: "Grow with your peers",
            summary: "A cohort-based program for professionals who want expert guidance, peer accountability, and a community of driven communicators.",
            outcomes: [
              { outcome: "Weekly group coaching calls" },
              { outcome: "Live practice & feedback rounds" },
              { outcome: "Private community access" },
              { outcome: "Resource library & templates" },
            ],
            targetAudience: "Professionals who thrive with community support and want to develop their speaking skills alongside a cohort of peers.",
            format: "Group + 1:1 Elements",
            duration: "8 weeks",
            ctaLabel: "Join Waitlist",
            ctaHref: "/book-call",
            featured: false,
            order: 2,
            status: "published",
          },
          {
            title: "VIP Intensive Day",
            slug: "vip-intensive",
            tagline: "Accelerated transformation",
            summary: "A focused full-day experience to break through your biggest speaking blocks, refine your stage presence, and leave with complete clarity.",
            outcomes: [
              { outcome: "Full-day private coaching session" },
              { outcome: "Complete speaker identity deep-work" },
              { outcome: "On-camera performance coaching" },
              { outcome: "30-day follow-up support" },
            ],
            targetAudience: "Speakers who need rapid results — preparing for a major event, TEDx talk, keynote, or career-defining moment.",
            format: "Virtual or In-Person",
            duration: "1 intensive day",
            ctaLabel: "Book Your Day",
            ctaHref: "/book-call",
            featured: false,
            order: 3,
            status: "published",
          },
          {
            title: "Book Sravanthi to Speak",
            slug: "speaking",
            tagline: "Bring her to your event",
            summary: "Book Sravanthi as a keynote speaker, workshop facilitator, or panelist for your organization, conference, or leadership event.",
            outcomes: [
              { outcome: "Keynote presentations" },
              { outcome: "Workshop facilitation" },
              { outcome: "Panel participation" },
              { outcome: "Corporate training sessions" },
            ],
            targetAudience: "Event organizers, corporate HR teams, and conference programmers looking for an impactful speaker on communication and leadership presence.",
            format: "In-Person or Virtual",
            duration: "Custom",
            ctaLabel: "Enquire Now",
            ctaHref: "/book-call",
            featured: false,
            order: 4,
            status: "published",
          },
        ]
        for (const service of servicesData) {
          await payload.create({ collection: "services", data: service })
        }
        results.push("✅ Services created (4)")
      } else {
        results.push("⏭️ Services already exist")
      }
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
    try {
      const existing = await payload.find({ collection: "blog-posts", limit: 1 })
      if (existing.docs.length === 0) {
        const posts = [
          {
            title: "5 Habits That Separate Memorable Speakers from Forgettable Ones",
            slug: "5-habits-memorable-speakers",
            excerpt: "Discover the daily practices that transform ordinary communicators into speakers who leave lasting impressions.",
            author: "Sravanthi Prattipati",
            status: "published",
            publishedAt: new Date("2024-03-01").toISOString(),
            categories: categoryIds["speaking-tips"] ? [categoryIds["speaking-tips"]] : [],
          },
          {
            title: "The Stage Fright Reframe: How to Turn Nerves into Presence",
            slug: "stage-fright-reframe",
            excerpt: "What if your pre-speaking anxiety wasn't a problem to solve, but a signal pointing toward something powerful?",
            author: "Sravanthi Prattipati",
            status: "published",
            publishedAt: new Date("2024-02-15").toISOString(),
            categories: categoryIds["confidence"] ? [categoryIds["confidence"]] : [],
          },
          {
            title: "Why Your Speaker Identity Matters More Than Your Slides",
            slug: "speaker-identity-matters",
            excerpt: "The most impactful speakers don't just deliver content. They deliver themselves. Here's how to find and own your unique speaker identity.",
            author: "Sravanthi Prattipati",
            status: "published",
            publishedAt: new Date("2024-02-01").toISOString(),
            categories: categoryIds["personal-branding"] ? [categoryIds["personal-branding"]] : [],
          },
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
        await payload.create({ collection: "legal-pages", data: { title: "Privacy Policy", type: "privacy" } })
        await payload.create({ collection: "legal-pages", data: { title: "Terms & Conditions", type: "terms" } })
        await payload.create({ collection: "legal-pages", data: { title: "Cookie Policy", type: "cookies" } })
        results.push("✅ Legal pages created (privacy, terms, cookies)")
      } else {
        results.push("⏭️ Legal pages already exist")
      }
    } catch (err: any) {
      errors.push(`❌ Legal pages: ${err.message}`)
    }

    // ─── Homepage ──────────────────────────────────────────────────────────
    try {
      const existing = await payload.find({ collection: "pages", where: { slug: { equals: "home" } }, limit: 1 })
      if (existing.docs.length === 0) {
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
              { blockType: "hero", headline: "Become the speaker people remember.", subheadline: "Speaker coaching for ambitious professionals who are done playing small.", ctaPrimary: { label: "Book a Discovery Call", href: "/book-call" }, ctaSecondary: { label: "Explore Programs", href: "/services" } },
              { blockType: "stats", stats: [{ value: "200+", label: "Speakers Coached", description: "Professionals transformed" }, { value: "10+", label: "Years Experience", description: "In speaker development" }, { value: "30+", label: "Global Stages", description: "Panels, keynotes & podcasts" }, { value: "95%", label: "Satisfaction Rate", description: "Client success stories" }] },
              { blockType: "transformation", sectionTitle: "What changes when you work with Sravanthi", items: [{ icon: "mic", title: "Stage Presence", description: "Command any room with a magnetic, grounded energy that draws people in before you say a word." }, { icon: "user", title: "Speaker Identity", description: "Own a clear, compelling speaking persona that reflects your authentic voice and expertise." }, { icon: "shield", title: "Authentic Confidence", description: "Speak from genuine strength — not performance anxiety or people-pleasing habits." }, { icon: "activity", title: "Body Language & Voice", description: "Master non-verbal communication, vocal tone, and physical presence for maximum impact." }, { icon: "trending-up", title: "High-Visibility Brand", description: "Position yourself as a thought leader in your industry through strategic visibility." }, { icon: "heart", title: "Charisma & Connection", description: "Build real rapport with audiences that makes them lean in, remember you, and take action." }] },
              { blockType: "programs", sectionTitle: "Ways to Work Together", subtitle: "Choose the path that fits where you are and where you want to go.", programs: serviceIds },
              { blockType: "testimonials", sectionTitle: "What speakers are saying", testimonials: testimonialIds },
              { blockType: "speaking", sectionTitle: "Sravanthi on the Stage", subtitle: "Speaker · Panelist · Podcast Guest", appearances: [{ event: "Women in Leadership Summit", date: "2024", topic: "Own Your Voice, Own the Room", type: "Conference" }, { event: "The Executive Edge Podcast", date: "2024", topic: "Building Executive Presence from the Inside Out", type: "Podcast" }, { event: "TEDx Regional Stage", date: "2023", topic: "The Silence Before the Speech", type: "Conference" }, { event: "Forbes Coaches Council", date: "2023", topic: "The 5 Pillars of Speaker Identity", type: "Panel" }, { event: "HR Innovation Summit", date: "2023", topic: "Communication as Leadership Currency", type: "Workshop" }, { event: "The Founders' Mic Podcast", date: "2022", topic: "From Engineer to Executive Communicator", type: "Podcast" }] },
              { blockType: "blog-preview", sectionTitle: "Insights & Resources", subtitle: "Practical wisdom for speakers, leaders, and communicators.", postsCount: 3 },
              { blockType: "cta", headline: "Ready to become the speaker people remember?", subtext: "Book a free discovery call and let's talk about your next stage.", ctaLabel: "Schedule a Discovery Call", ctaHref: "/book-call", backgroundStyle: "dark" },
            ] as any,
            seo: { title: "Sravanthi Prattipati | Speaker & Confidence Coach", description: "Become the speaker people remember. Speaker coaching for ambitious professionals — stage presence, speaker identity, and confidence coaching." },
          },
        })
        results.push("✅ Homepage created with all blocks")
      } else {
        results.push("⏭️ Homepage already exists")
      }
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
          pageHeadline: "Let's talk about your next stage",
          pageSubtext: "Book a free 30-minute discovery call to explore how coaching can help you develop the stage presence, confidence, and speaking identity you've been building toward.",
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
