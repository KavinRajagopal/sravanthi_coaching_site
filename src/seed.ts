/**
 * Payload CMS Seed Script
 *
 * Run after configuring DATABASE_URL:
 *   npx payload run src/seed.ts
 *
 * Or programmatically with ts-node:
 *   npx ts-node --project tsconfig.json src/seed.ts
 */

import { getPayload } from "payload"
import config from "@payload-config"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function seed() {
  const payload = await getPayload({ config })

  console.log("🌱 Starting seed...")

  // ─── Admin User ────────────────────────────────────────────────────────────
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
      console.log("✅ Admin user created (email: admin@sravanthi.com, password: changeme123!)")
      console.log("   ⚠️  Change this password immediately after first login!")
    } else {
      console.log("⏭️  Admin user already exists, skipping.")
    }
  } catch (err) {
    console.error("❌ Failed to create admin user:", err)
  }

  // ─── Services ──────────────────────────────────────────────────────────────
  try {
    const existing = await payload.find({ collection: "services", limit: 1 })
    if (existing.docs.length === 0) {
      const servicesData = [
        {
          title: "Emcee & Hosting Services",
          slug: "mc-hosting",
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
      console.log("✅ Services created (2 services)")
    } else {
      console.log("⏭️  Services already exist, skipping.")
    }
  } catch (err) {
    console.error("❌ Failed to create services:", err)
  }

  // ─── Testimonials ──────────────────────────────────────────────────────────
  try {
    const existing = await payload.find({ collection: "testimonials", limit: 1 })
    if (existing.docs.length === 0) {
      const testimonialsData = [
        {
          quote: "Working with Sravanthi completely transformed how I show up on stage. I used to shrink — now I own every room I walk into. My TEDx application was accepted three weeks after we finished our program.",
          clientName: "Priya Mehta",
          clientTitle: "Founder & CEO",
          company: "Meridian Ventures",
          result: "Accepted for TEDx Talk",
          rating: 5,
          featured: true,
          order: 1,
          status: "published",
        },
        {
          quote: "Sravanthi works at the identity level. The shift in my executive presence has been recognized by my leadership team and my clients. This is completely different from any presentation training I've done before.",
          clientName: "James Okonkwo",
          clientTitle: "VP of Engineering",
          company: "TechScale Inc.",
          result: "Promoted 3 months after coaching",
          rating: 5,
          featured: true,
          order: 2,
          status: "published",
        },
        {
          quote: "I was terrified of public speaking. Now I actively seek out speaking opportunities. Sravanthi didn't just teach me techniques — she helped me find my voice and trust it completely.",
          clientName: "Aisha Rahman",
          clientTitle: "Senior Manager",
          company: "Global Finance Corp",
          result: "Delivered keynote at industry conference",
          rating: 5,
          featured: true,
          order: 3,
          status: "published",
        },
        {
          quote: "The ROI on this coaching has been extraordinary. Within 6 months I landed two major speaking engagements and my consulting rates doubled. Sravanthi's method is the real deal.",
          clientName: "Carlos Vega",
          clientTitle: "Leadership Consultant",
          company: "Independent",
          result: "Doubled consulting rates",
          rating: 5,
          featured: true,
          order: 4,
          status: "published",
        },
        {
          quote: "Sravanthi has a rare gift for seeing exactly what's holding you back and creating the precise environment to break through it. My communication style has completely elevated.",
          clientName: "Dr. Sarah Lin",
          clientTitle: "Medical Director",
          company: "HealthBridge",
          result: "Conference keynote speaker",
          rating: 5,
          featured: false,
          order: 5,
          status: "published",
        },
        {
          quote: "I came in thinking I needed to improve my delivery. What I discovered was that I needed to stop hiding. Sravanthi helped me step fully into who I am as a communicator. Genuinely life-changing.",
          clientName: "Marcus Thompson",
          clientTitle: "Entrepreneur",
          company: "ThinkShift Labs",
          result: "Featured in Forbes 30 Under 30",
          rating: 5,
          featured: false,
          order: 6,
          status: "published",
        },
      ]

      for (const t of testimonialsData) {
        await payload.create({ collection: "testimonials", data: t })
      }
      console.log("✅ Testimonials created (6 testimonials)")
    } else {
      console.log("⏭️  Testimonials already exist, skipping.")
    }
  } catch (err) {
    console.error("❌ Failed to create testimonials:", err)
  }

  // ─── Categories ────────────────────────────────────────────────────────────
  const categoryIds: Record<string, string> = {}
  try {
    const existing = await payload.find({ collection: "categories", limit: 1 })
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
      console.log("✅ Categories created")
    } else {
      console.log("⏭️  Categories already exist, skipping.")
      const allCats = await payload.find({ collection: "categories", limit: 20 })
      for (const cat of allCats.docs) {
        categoryIds[cat.slug as string] = cat.id as string
      }
    }
  } catch (err) {
    console.error("❌ Failed to create categories:", err)
  }

  // ─── Blog Posts ────────────────────────────────────────────────────────────
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
          publishedAt: new Date("2026-01-15").toISOString(),
          categories: categoryIds["speaking-tips"] ? [categoryIds["speaking-tips"]] : [],
        },
        {
          title: "The Stage Fright Reframe: How to Turn Nerves into Presence",
          slug: "stage-fright-reframe",
          excerpt: "What if your pre-speaking anxiety wasn't a problem to solve, but a signal pointing toward something powerful?",
          author: "Sravanthi Prattipati",
          status: "published",
          publishedAt: new Date("2025-12-01").toISOString(),
          categories: categoryIds["confidence"] ? [categoryIds["confidence"]] : [],
        },
        {
          title: "Why Your Speaker Identity Matters More Than Your Slides",
          slug: "speaker-identity-matters",
          excerpt: "The most impactful speakers don't just deliver content. They deliver themselves. Here's how to find and own your unique speaker identity.",
          author: "Sravanthi Prattipati",
          status: "published",
          publishedAt: new Date("2025-11-01").toISOString(),
          categories: categoryIds["personal-branding"] ? [categoryIds["personal-branding"]] : [],
        },
      ]

      for (const post of posts) {
        await payload.create({ collection: "blog-posts", data: post as any })
      }
      console.log("✅ Blog posts created (3 posts)")
    } else {
      console.log("⏭️  Blog posts already exist, skipping.")
    }
  } catch (err) {
    console.error("❌ Failed to create blog posts:", err)
  }

  // ─── Legal Pages ───────────────────────────────────────────────────────────
  try {
    const existing = await payload.find({ collection: "legal-pages", limit: 1 })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: "legal-pages",
        data: {
          title: "Privacy Policy",
          type: "privacy",
        },
      })
      await payload.create({
        collection: "legal-pages",
        data: {
          title: "Terms & Conditions",
          type: "terms",
        },
      })
      await payload.create({
        collection: "legal-pages",
        data: {
          title: "Cookie Policy",
          type: "cookies",
        },
      })
      console.log("✅ Legal pages created (privacy, terms, cookies)")
    } else {
      console.log("⏭️  Legal pages already exist, skipping.")
    }
  } catch (err) {
    console.error("❌ Failed to create legal pages:", err)
  }

  // ─── Homepage Page ─────────────────────────────────────────────────────────
  try {
    const existing = await payload.find({
      collection: "pages",
      where: { slug: { equals: "home" } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      // Fetch service IDs to reference in ProgramsBlock
      const services = await payload.find({ collection: "services", limit: 10 })
      const serviceIds = services.docs.map((s: any) => s.id)

      // Fetch testimonial IDs to reference in TestimonialsBlock
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
              subheadline: "Fulfilling events, one at a time.",
              ctaPrimary: { label: "Book a Call", href: "/book-call" },
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
              instagramUrl: "https://www.instagram.com/emcee_sravz/",
              handle: "@emcee_sravz",
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
      console.log("✅ Homepage created with all blocks")
    } else {
      console.log("⏭️  Homepage already exists, skipping.")
    }
  } catch (err) {
    console.error("❌ Failed to create homepage:", err)
  }

  // ─── Site Settings Global ──────────────────────────────────────────────────
  try {
    await payload.updateGlobal({
      slug: "site-settings",
      data: {
        siteName: "Sravanthi",
        contactEmail: "hello@sravanthi.com",
        cookieBanner: {
          text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
          ctaLabel: "Got it",
        },
      },
    })
    console.log("✅ Site settings configured")
  } catch (err) {
    console.error("❌ Failed to update site settings:", err)
  }

  // ─── Booking Settings Global ───────────────────────────────────────────────
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
    console.log("✅ Booking settings configured")
  } catch (err) {
    console.error("❌ Failed to update booking settings:", err)
  }

  console.log("\n🎉 Seed complete!")
  console.log("   Visit /admin to log in and manage your content.")
  process.exit(0)
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err)
  process.exit(1)
})
