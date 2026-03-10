import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { getPayload } from "@/lib/payload-client"
import { CTASection } from "@/components/public/sections/CTASection"
import { ScrollReveal } from "@/components/public/shared/ScrollReveal"
import { formatDate } from "@/lib/utils"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sravanthi.com"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload()
    const result = await payload.find({ collection: "blog-posts", where: { slug: { equals: slug } }, limit: 1 })
    const post = result.docs[0]
    if (post) {
      const seo = post.seo as any
      return {
        title: seo?.title || post.title as string,
        description: seo?.description || post.excerpt as string,
        openGraph: {
          type: "article",
          title: seo?.title || post.title as string,
          description: seo?.description || post.excerpt as string,
          images: post.coverImage ? [{ url: (post.coverImage as any).url }] : undefined,
          publishedTime: post.publishedAt as string,
          authors: post.author ? [post.author as string] : ["Sravanthi Prattipati"],
        },
      }
    }
  } catch {}
  return { title: "Blog Post" }
}

function renderLexicalContent(content: any): string {
  if (!content || typeof content === "string") return content || ""

  // Payload Lexical content is a JSON object with a root node
  if (content.root && content.root.children) {
    return content.root.children.map((node: any) => lexicalNodeToHtml(node)).join("")
  }

  return ""
}

function lexicalNodeToHtml(node: any): string {
  if (!node) return ""

  switch (node.type) {
    case "paragraph":
      const pChildren = (node.children || []).map(lexicalNodeToHtml).join("")
      return pChildren ? `<p>${pChildren}</p>` : "<br/>"

    case "heading": {
      const tag = `h${node.tag?.replace("h", "") || "2"}`
      const children = (node.children || []).map(lexicalNodeToHtml).join("")
      return `<${tag}>${children}</${tag}>`
    }

    case "list": {
      const tag = node.listType === "bullet" ? "ul" : "ol"
      const items = (node.children || []).map(lexicalNodeToHtml).join("")
      return `<${tag}>${items}</${tag}>`
    }

    case "listitem":
      return `<li>${(node.children || []).map(lexicalNodeToHtml).join("")}</li>`

    case "quote":
      return `<blockquote>${(node.children || []).map(lexicalNodeToHtml).join("")}</blockquote>`

    case "link": {
      const href = node.fields?.url || node.url || "#"
      const target = node.fields?.newTab ? ' target="_blank" rel="noopener noreferrer"' : ""
      return `<a href="${href}"${target}>${(node.children || []).map(lexicalNodeToHtml).join("")}</a>`
    }

    case "text": {
      let text = node.text || ""
      if (!text) return ""
      // Apply text formats
      if (node.format) {
        if (node.format & 1) text = `<strong>${text}</strong>`
        if (node.format & 2) text = `<em>${text}</em>`
        if (node.format & 8) text = `<u>${text}</u>`
        if (node.format & 4) text = `<s>${text}</s>`
        if (node.format & 16) text = `<code>${text}</code>`
      }
      return text
    }

    case "horizontalrule":
      return "<hr/>"

    default:
      // For unknown types, try to render children
      if (node.children) {
        return (node.children as any[]).map(lexicalNodeToHtml).join("")
      }
      return ""
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  let post: any = null

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: "blog-posts",
      where: { and: [{ slug: { equals: slug } }, { status: { equals: "published" } }] },
      limit: 1,
    })
    post = result.docs[0]
  } catch {}

  if (!post) notFound()

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || "",
    datePublished: post.publishedAt || "",
    dateModified: post.updatedAt || post.publishedAt || "",
    author: {
      "@type": "Person",
      name: post.author || "Sravanthi Prattipati",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Sravanthi Prattipati",
      url: SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
    image: post.coverImage ? (post.coverImage as any).url : undefined,
  }

  const renderedContent = renderLexicalContent(post.content)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="bg-brand-black pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-gold text-sm tracking-widest uppercase mb-8 transition-colors"
            >
              <ArrowLeft size={14} /> All Posts
            </Link>
            {post.publishedAt && (
              <p className="text-brand-muted text-sm mb-4">{formatDate(post.publishedAt)}</p>
            )}
            <h1 className="font-display text-4xl md:text-6xl font-light text-brand-cream leading-[1.1] mb-6">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-xl text-brand-muted leading-relaxed mb-12 border-l-2 border-brand-gold pl-6">
                {post.excerpt}
              </p>
            )}
          </ScrollReveal>

          {(post.coverImage as any)?.url && (
            <ScrollReveal delay={0.1} className="mb-12">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={(post.coverImage as any).url}
                  alt={(post.coverImage as any).alt || post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.2}>
            {renderedContent ? (
              <div
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:font-display prose-headings:font-light prose-headings:text-brand-cream
                  prose-p:text-brand-muted prose-p:leading-relaxed
                  prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-brand-cream
                  prose-em:text-brand-muted
                  prose-blockquote:border-l-brand-gold prose-blockquote:text-brand-muted prose-blockquote:font-display prose-blockquote:italic
                  prose-code:text-brand-gold prose-code:bg-brand-elevated prose-code:px-1 prose-code:rounded
                  prose-hr:border-brand-border
                  prose-ul:text-brand-muted prose-ol:text-brand-muted
                  prose-li:marker:text-brand-gold"
                dangerouslySetInnerHTML={{ __html: renderedContent }}
              />
            ) : (
              <div className="prose prose-invert prose-lg max-w-none
                prose-headings:font-display prose-headings:font-light prose-headings:text-brand-cream
                prose-p:text-brand-muted prose-p:leading-relaxed">
                <p className="text-brand-muted leading-relaxed">
                  Full article content will appear here once published through the admin dashboard.
                </p>
              </div>
            )}
          </ScrollReveal>

          {post.author && (
            <ScrollReveal delay={0.3} className="mt-16 pt-8 border-t border-brand-border">
              <p className="text-brand-muted text-sm">
                Written by <span className="text-brand-cream">{post.author}</span>
              </p>
            </ScrollReveal>
          )}
        </div>
      </article>
      <CTASection />
    </>
  )
}
