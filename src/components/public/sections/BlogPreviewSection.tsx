import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"
import { formatDate } from "@/lib/utils"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  coverImage?: { url: string; alt: string } | null
  publishedAt?: string
  author?: string
}

interface BlogPreviewSectionProps {
  sectionTitle?: string
  subtitle?: string
  posts?: BlogPost[]
}

const defaultPosts: BlogPost[] = [
  { id: "1", title: "5 Habits That Separate Memorable Speakers from Forgettable Ones", slug: "5-habits-memorable-speakers", excerpt: "Discover the daily practices that transform ordinary communicators into speakers who leave lasting impressions.", publishedAt: "2026-01-15" },
  { id: "2", title: "The Stage Fright Reframe: How to Turn Nerves into Presence", slug: "stage-fright-reframe", excerpt: "What if your pre-speaking anxiety wasn't a problem to solve, but a signal pointing toward something powerful?", publishedAt: "2025-12-01" },
  { id: "3", title: "Why Your Speaker Identity Matters More Than Your Slides", slug: "speaker-identity-matters", excerpt: "The most impactful speakers don't just deliver content. They deliver themselves. Here's how to find and own your unique speaker identity.", publishedAt: "2025-11-01" },
]

export function BlogPreviewSection({
  sectionTitle = "Insights & Resources",
  subtitle = "Practical wisdom for speakers, leaders, and communicators.",
  posts = defaultPosts,
}: BlogPreviewSectionProps) {
  return (
    <section className="bg-brand-elevated py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <ScrollReveal>
            <p className="text-brand-muted font-sans text-xs tracking-[0.3em] uppercase mb-4">Blog</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-brand-text leading-[1.1]">
              {sectionTitle}
            </h2>
            {subtitle && <p className="mt-3 text-brand-muted text-lg max-w-md">{subtitle}</p>}
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Link
              href="/blog"
              className="flex items-center gap-2 text-brand-gold text-sm tracking-widest uppercase hover:gap-4 transition-all duration-300"
            >
              View all posts <ArrowRight size={14} />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="border border-brand-border hover:border-brand-gold/40 transition-all duration-300 h-full flex flex-col bg-white">
                  <div className="aspect-[16/9] bg-brand-elevated relative overflow-hidden">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage.url}
                        alt={post.coverImage.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-brand-elevated flex items-center justify-center">
                        <span className="font-display text-4xl text-brand-gold/20 font-light">&ldquo;</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    {post.publishedAt && (
                      <p className="text-brand-muted text-xs mb-3">{formatDate(post.publishedAt)}</p>
                    )}
                    <h3 className="font-display text-xl text-brand-text font-light leading-snug mb-3 group-hover:text-brand-gold transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-brand-muted text-sm leading-relaxed flex-1">{post.excerpt}</p>
                    )}
                    <div className="mt-4 flex items-center gap-2 text-brand-gold text-xs tracking-widest uppercase group-hover:gap-3 transition-all duration-300">
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
