import { buildConfig } from "payload"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { uploadthingStorage } from "@payloadcms/storage-uploadthing"
import sharp from "sharp"
import path from "path"
import { fileURLToPath } from "url"

import { Users } from "@/collections/Users"
import { Media } from "@/collections/Media"
import { Pages } from "@/collections/Pages"
import { Services } from "@/collections/Services"
import { Testimonials } from "@/collections/Testimonials"
import { Categories } from "@/collections/Categories"
import { BlogPosts } from "@/collections/BlogPosts"
import { ContactSubmissions } from "@/collections/ContactSubmissions"
import { LegalPages } from "@/collections/LegalPages"

import { autoSeed } from "@/lib/auto-seed"
import { SiteSettings } from "@/globals/SiteSettings"
import { Navigation } from "@/globals/Navigation"
import { FooterGlobal } from "@/globals/Footer"
import { BookingSettings } from "@/globals/BookingSettings"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "— Sravanthi Admin",
    },
  },

  collections: [
    Users,
    Media,
    Pages,
    Services,
    Testimonials,
    Categories,
    BlogPosts,
    ContactSubmissions,
    LegalPages,
  ],

  globals: [
    SiteSettings,
    Navigation,
    FooterGlobal,
    BookingSettings,
  ],

  onInit: async (payload) => {
    await autoSeed(payload)
  },

  editor: lexicalEditor({}),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL!,
    },
    push: true,
  }),

  plugins: [
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN!,
        acl: "public-read",
      },
    }),
  ],

  secret: process.env.PAYLOAD_SECRET!,

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  sharp,
})
