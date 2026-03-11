import { ScrollReveal } from "@/components/public/shared/ScrollReveal"

function lexicalNodeToHtml(node: any): string {
  if (!node) return ""
  switch (node.type) {
    case "paragraph": {
      const children = (node.children || []).map(lexicalNodeToHtml).join("")
      return children ? `<p>${children}</p>` : "<br/>"
    }
    case "heading": {
      const tag = `h${node.tag?.replace("h", "") || "2"}`
      return `<${tag}>${(node.children || []).map(lexicalNodeToHtml).join("")}</${tag}>`
    }
    case "list": {
      const tag = node.listType === "bullet" ? "ul" : "ol"
      return `<${tag}>${(node.children || []).map(lexicalNodeToHtml).join("")}</${tag}>`
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
      if (node.children) return (node.children as any[]).map(lexicalNodeToHtml).join("")
      return ""
  }
}

function renderLexical(content: any): string {
  if (!content || typeof content === "string") return content || ""
  if (content.root?.children) {
    return content.root.children.map((n: any) => lexicalNodeToHtml(n)).join("")
  }
  return ""
}

interface RichTextSectionProps {
  content?: any
}

export function RichTextSection({ content }: RichTextSectionProps) {
  const html = renderLexical(content)
  if (!html) return null

  return (
    <section className="bg-brand-bg py-16">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal>
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-display prose-headings:font-light prose-headings:text-brand-text
              prose-p:text-brand-muted prose-p:leading-relaxed
              prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline
              prose-strong:text-brand-text
              prose-blockquote:border-l-brand-gold prose-blockquote:text-brand-muted
              prose-code:text-brand-gold prose-code:bg-brand-elevated prose-code:px-1 prose-code:rounded
              prose-hr:border-brand-border
              prose-ul:text-brand-muted prose-ol:text-brand-muted
              prose-li:marker:text-brand-gold"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </ScrollReveal>
      </div>
    </section>
  )
}
