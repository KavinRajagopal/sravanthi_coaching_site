import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { getPayload } from "@/lib/payload-client"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, practical wisdom, and resources for speakers, leaders, and communicators.",
}

export default async function BlogPage() {
  let posts: any[] = []

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: "blog-posts",
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
    })
    posts = result.docs
  } catch {}

  const defaultPosts = [
    { id: "1", title: "5 Habits That Separate Memorable Speakers from Forgettable Ones", slug: "5-habits-memorable-speakers", excerpt: "Discover the daily practices that transform ordinary communicators into speakers who leave lasting impressions.", publishedAt: "2024-03-01", author: "Sravanthi Prattipati" },
    { id: "2", title: "The Stage Fright Reframe: How to Turn Nerves into Presence", slug: "stage-fright-reframe", excerpt: "What if your pre-speaking anxiety wasn't a problem to solve, but a signal pointing toward something powerful?", publishedAt: "2024-02-15", author: "Sravanthi Prattipati" },
    { id: "3", title: "Why Your Speaker Identity Matters More Than Your Slides", slug: "speaker-identity-matters", excerpt: "The most impactful speakers don't just deliver content. They deliver themselves.", publishedAt: "2024-02-01", author: "Sravanthi Prattipati" },
    { id: "4", title: "Commanding the Room: The Non-Verbal Secrets of Executive Presence", slug: "commanding-the-room", excerpt: "70% of your message is delivered before you speak. Here's how to make every non-verbal cue work in your favor.", publishedAt: "2024-01-15", author: "Sravanthi Prattipati" },
    { id: "5", title: "From Overlooked to Unforgettable: Building Your Personal Brand as a Speaker", slug: "personal-brand-speaker", excerpt: "Your personal brand is the story people tell about you when you leave the room. Here's how to shape it intentionally.", publishedAt: "2024-01-01", author: "Sravanthi Prattipati" },
    { id: "6", title: "The Power of the Pause: Why Silence Is the Speaker's Most Powerful Tool", slug: "power-of-pause", excerpt: "Most speakers rush to fill silence. The confident ones use it as punctuation. Here's how to master the pause.", publishedAt: "2023-12-15", author: "Sravanthi Prattipati" },
  ]

  const displayPosts = posts.length > 0 ? posts : defaultPosts

  return (
    <section className="bg-brand-black pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="mb-16">
          <p className="text-brand-gold font-sans text-xs tracking-[0.3em] uppercase mb-4">Blog</p>
          <h1 className="font-display text-5xl md:text-7xl font-light text-brand-cream leading-[1.05]">
            Insights & Resources
          </h1>
          <p className="mt-6 text-brand-muted text-lg max-w-xl">
            Practical wisdom for speakers, leaders, and communicators.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post: any, i: number) => (
            <ScrollReveal key={post.id} delay={(i % 3) * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="border border-brand-border hover:border-brand-gold/40 transition-all duration-300 h-full flex flex-col bg-brand-surface">
                  <div className="aspect-[16/9] bg-brand-elevated relative overflow-hidden">
                    {post.coverImage?.url ? (
                      <Image src={post.coverImage.url} alt={post.coverImage.alt || post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-5xl text-brand-gold/10 font-light">"</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    {post.publishedAt && <p className="text-brand-muted text-xs mb-3">{formatDate(post.publishedAt)}</p>}
                    <h2 className="font-display text-xl text-brand-cream font-light leading-snug mb-3 group-hover:text-brand-gold transition-colors flex-1">{post.title}</h2>
                    {post.excerpt && <p className="text-brand-muted text-sm leading-relaxed mb-4">{post.excerpt}</p>}
                    <div className="flex items-center gap-2 text-brand-gold text-xs tracking-widest uppercase group-hover:gap-3 transition-all duration-300 mt-auto">
                      Read more <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
