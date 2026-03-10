/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE RE-CREATED. */
import { RootPage, generatePageMetadata } from "@payloadcms/next/views"
import { importMap } from "../importMap"

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateMetadata = ({ params, searchParams }: Args) =>
  generatePageMetadata({ config: import("@payload-config") as any, params, searchParams })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Page = ({ params, searchParams }: Args) =>
  RootPage({ config: import("@payload-config") as any, params, searchParams, importMap })

export default Page
