import type { Payload } from "payload"

export async function autoSeed(payload: Payload) {
  console.log("🌱 Auto-seed: checking database...")

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
      console.log("✅ Admin user created")
    }
  } catch (err: any) {
    console.error("❌ Admin user:", err.message)
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
        tagline: "Setting the Stage for Memorable Moments",
        summary: "Professional emcee for weddings, Sangeets, concerts, corporate events, birthdays, babyshowers, HalfSaree/Dhoti ceremonies, and more. Based in Dallas, TX and open to travel.",
        outcomes: [
          { outcome: "Weddings, Sangeets & Indian celebrations" },
          { outcome: "Corporate events, galas & conferences" },
          { outcome: "Concerts & entertainment events" },
          { outcome: "Birthdays, babyshowers & milestone events" },
          { outcome: "HalfSaree/Dhoti ceremonies" },
          { outcome: "Celebrity & VIP interviews" },
        ],
        targetAudience: "Families, event organizers, and corporate teams looking for a professional emcee who brings warmth, bilingual fluency, and personalized preparation to every event.",
        format: "In-Person (Dallas, TX — open to travel)",
        duration: "Custom",
        ctaLabel: "Enquire Now",
        ctaHref: "/book-call",
        featured: true,
        order: 1,
        status: "published",
      },
      {
        title: "Leadership Launchpad — Summer Courses",
        slug: "leadership-launchpad",
        tagline: "Empowering the next generation",
        summary: "Summer courses for Grades 1–12. Public speaking, writing, acting, improv, leadership, mindset coaching, and more. Flexible schedule, limited seats. Starting at $99+.",
        outcomes: [
          { outcome: "Grades 1–6: Public Speaking, Writing, Acting, Mindfulness, Yoga, Storytelling + Improv" },
          { outcome: "Grades 7–12: College Readiness, Leadership 101, Public Speaking + Improv, Business" },
          { outcome: "Time & Task Management, Stress Management, Investing 101" },
          { outcome: "Internship & job shadowing opportunities" },
        ],
        targetAudience: "Parents looking for enriching summer programs that build confidence, leadership, and life skills in their children (Grades 1–12).",
        format: "In-Person (Dallas, TX)",
        duration: "June 1 – July 31 (Flexible Schedule)",
        ctaLabel: "Register Now",
        ctaHref: "/book-call",
        featured: true,
        order: 2,
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
        order: 3,
        status: "published",
      },
    ]
    for (const service of servicesData) {
      await payload.create({ collection: "services", data: service })
    }
    console.log("✅ Services recreated")
  } catch (err: any) {
    console.error("❌ Services:", err.message)
  }

  // ─── Testimonials ──────────────────────────────────────────────────────
  try {
    // Delete old testimonials and recreate with updated content
    const existingTestimonials = await payload.find({ collection: "testimonials", limit: 100 })
    for (const doc of existingTestimonials.docs) {
      await payload.delete({ collection: "testimonials", id: doc.id })
    }
    {
      const testimonialsData = [
        { quote: "Sravanthi hosted our daughter's Sangeet and it was absolutely magical. She kept the energy high all night, got everyone on the dance floor, and made every family member feel special. Our relatives are still talking about it!", clientName: "Lakshmi & Ravi Krishnamurthy", clientTitle: "Parents of the Bride", company: "", result: "Unforgettable Sangeet celebration", rating: 5, featured: true, order: 1, status: "published" },
        { quote: "We hired Sravanthi for our wedding reception and she was phenomenal. She effortlessly switched between Telugu and English, kept the programme flowing perfectly, and added such warmth to the whole evening. Highly recommend!", clientName: "Ananya & Vikram Reddy", clientTitle: "Newlyweds", company: "", result: "Beautiful bilingual wedding", rating: 5, featured: true, order: 2, status: "published" },
        { quote: "Sravanthi emceed our company's annual gala and she was the best decision we made. Professional, charismatic, and she really took the time to understand our brand. The audience loved her.", clientName: "Jennifer Mitchell", clientTitle: "Events Director", company: "Lone Star Innovations", result: "Standing ovation at corporate gala", rating: 5, featured: true, order: 3, status: "published" },
        { quote: "Our son's HalfSaree ceremony was so special because of Sravanthi. She planned games, coordinated with the family, and made sure every moment was celebrated. She treats every event like it's her own family's.", clientName: "Padma Srinivasan", clientTitle: "Mother of the honoree", company: "", result: "Perfect HalfSaree ceremony", rating: 5, featured: true, order: 4, status: "published" },
        { quote: "Sravanthi hosted our corporate conference and I was blown away by her preparation. She knew every speaker's background, kept the audience engaged between sessions, and handled last-minute changes like a pro.", clientName: "David Park", clientTitle: "VP of Marketing", company: "NexGen Solutions", result: "Seamless corporate conference", rating: 5, featured: true, order: 5, status: "published" },
        { quote: "We booked Sravanthi for our baby shower and she made the whole event so joyful. The games she planned were hilarious and got everyone involved — even the shy aunties! She really knows how to read a room.", clientName: "Deepika & Arjun Nair", clientTitle: "Expecting parents", company: "", result: "Joyful baby shower celebration", rating: 5, featured: true, order: 6, status: "published" },
      ]
      for (const t of testimonialsData) {
        await payload.create({ collection: "testimonials", data: t })
      }
      console.log("✅ Testimonials created")
    }
  } catch (err: any) {
    console.error("❌ Testimonials:", err.message)
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
      console.log("✅ Categories created")
    } else {
      for (const cat of existing.docs) {
        categoryIds[cat.slug as string] = cat.id as string
      }
    }
  } catch (err: any) {
    console.error("❌ Categories:", err.message)
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
      console.log("✅ Blog posts created")
    }
  } catch (err: any) {
    console.error("❌ Blog posts:", err.message)
  }

  // ─── Legal Pages ───────────────────────────────────────────────────────
  try {
    const existing = await payload.find({ collection: "legal-pages", limit: 1 })
    if (existing.docs.length === 0) {
      await payload.create({ collection: "legal-pages", data: { title: "Privacy Policy", type: "privacy", content: emptyLexical } })
      await payload.create({ collection: "legal-pages", data: { title: "Terms & Conditions", type: "terms", content: emptyLexical } })
      await payload.create({ collection: "legal-pages", data: { title: "Cookie Policy", type: "cookies", content: emptyLexical } })
      console.log("✅ Legal pages created")
    }
  } catch (err: any) {
    console.error("❌ Legal pages:", err.message)
  }

  // ─── Homepage (delete old + recreate) ─────────────────────────────────
  try {
    const existing = await payload.find({ collection: "pages", where: { slug: { equals: "home" } }, limit: 1 })
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
            subheadline: "Bringing warmth, energy, and unforgettable moments to every stage — from intimate celebrations to grand corporate events. Based in Dallas, TX.",
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
            blockType: "packages",
            sectionTitle: "Emcee Packages",
            subtitle: "Choose the experience that fits your event.",
            quote: "I like to bring people together and make the event memorable. If it's a concert, my goal is to make sure everyone is having a good time. If it's a Sangeet, my goal is to make the bride and groom feel special — I treat it as my best friend's wedding.",
          },
          {
            blockType: "speaking",
            sectionTitle: "Past Events & Appearances",
            subtitle: "Emcee · Speaker · Workshop Facilitator",
          },
          {
            blockType: "testimonials",
            sectionTitle: "What clients are saying",
            testimonials: testimonialIds,
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
          title: "Emcee Sravz | Sravanthi Prattipati — Emcee & Event Host",
          description: "Bringing warmth, energy, and unforgettable moments to every stage. Emcee services for weddings, corporate events, and celebrations. Based in Dallas, TX.",
        },
      },
    })
    console.log("✅ Homepage recreated")
  } catch (err: any) {
    console.error("❌ Homepage:", err.message)
  }

  // ─── Site Settings ─────────────────────────────────────────────────────
  try {
    await payload.updateGlobal({
      slug: "site-settings",
      data: {
        siteName: "Emcee Sravz",
        contactEmail: "psravanthi108@gmail.com",
        location: "Dallas, TX (Open to travel)",
        instagramUrl: "https://www.instagram.com/emcee_sravz/",
        cookieBanner: { text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.", ctaLabel: "Got it" },
      },
    })
    console.log("✅ Site settings configured")
  } catch (err: any) {
    console.error("❌ Site settings:", err.message)
  }

  // ─── Booking Settings ──────────────────────────────────────────────────
  try {
    await payload.updateGlobal({
      slug: "booking-settings",
      data: {
        activeFlow: "direct",
        bookingUrl: "https://calendly.com/emceesravz/intro-meeting",
        ctaLabel: "Schedule a Discovery Call",
        pageHeadline: "Let's talk about your next event",
        pageSubtext: "Book a free 15-minute discovery call to explore how we can work together to make your next event unforgettable.",
        successMessage: "Thank you! Your session is booked. Check your email for confirmation details.",
      },
    })
    console.log("✅ Booking settings configured")
  } catch (err: any) {
    console.error("❌ Booking settings:", err.message)
  }

  console.log("🌱 Auto-seed: complete!")
}
