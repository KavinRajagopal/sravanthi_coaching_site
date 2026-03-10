import type { CollectionConfig } from "payload"
import { lexicalEditor } from "@payloadcms/richtext-lexical"

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  admin: {
    useAsTitle: "title",
    description: "Manage blog posts and articles.",
    defaultColumns: ["title", "status", "publishedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "excerpt", type: "textarea", required: true },
    { name: "content", type: "richText", editor: lexicalEditor({}), required: true },
    { name: "coverImage", type: "upload", relationTo: "media" },
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
    },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "tag", type: "text" }],
    },
    { name: "author", type: "text", defaultValue: "Sravanthi Prattipati" },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      defaultValue: "draft",
    },
    { name: "publishedAt", type: "date" },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        { name: "ogImage", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "relatedPosts",
      type: "relationship",
      relationTo: "blog-posts",
      hasMany: true,
    },
  ],
}
