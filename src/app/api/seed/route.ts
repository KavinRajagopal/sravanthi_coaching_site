import { NextRequest, NextResponse } from "next/server"
import { getPayload } from "@/lib/payload-client"
import { autoSeed } from "@/lib/auto-seed"

const SEED_SECRET = process.env.SEED_SECRET || "seed-sravanthi-2024"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token")

  if (token !== SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const payload = await getPayload()
    await autoSeed(payload)
    return NextResponse.json({ success: true, message: "Seed complete!" })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
