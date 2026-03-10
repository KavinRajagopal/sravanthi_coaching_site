import { NextRequest, NextResponse } from "next/server"
import { getPayload } from "@/lib/payload-client"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, role, helpNeeded, challenge, goals, budget, consent } = body

    if (!name || !email || !consent) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const payload = await getPayload()
    await payload.create({
      collection: "contact-submissions",
      data: { name, email, phone, role, helpNeeded, challenge, goals, budget, consent, status: "new" },
    })

    // Send email notification via Resend if configured
    if (process.env.RESEND_API_KEY) {
      try {
        const { resend } = await import("@/lib/resend")
        const toEmail = process.env.CONTACT_EMAIL || "hello@sravanthi.com"
        const fromEmail = process.env.FROM_EMAIL || "website@sravanthi.com"

        await resend.emails.send({
          from: `Sravanthi Website <${fromEmail}>`,
          to: toEmail,
          subject: `New inquiry from ${name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #C9A84C; border-bottom: 1px solid #2A2520; padding-bottom: 12px;">New Coaching Inquiry</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #888; width: 140px;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
                ${phone ? `<tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>` : ""}
                ${role ? `<tr><td style="padding: 8px 0; color: #888;">Role</td><td style="padding: 8px 0;">${role}</td></tr>` : ""}
                ${budget ? `<tr><td style="padding: 8px 0; color: #888;">Budget</td><td style="padding: 8px 0;">${budget}</td></tr>` : ""}
              </table>
              ${helpNeeded ? `<h3 style="color: #F5F0E8; margin-top: 24px;">What they need help with</h3><p style="color: #A89F8C;">${helpNeeded}</p>` : ""}
              ${challenge ? `<h3 style="color: #F5F0E8;">Their challenge</h3><p style="color: #A89F8C;">${challenge}</p>` : ""}
              ${goals ? `<h3 style="color: #F5F0E8;">Their goals</h3><p style="color: #A89F8C;">${goals}</p>` : ""}
              <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #2A2520; color: #888; font-size: 12px;">
                This message was submitted via the contact form at sravanthi.com
              </div>
            </div>
          `,
        })
      } catch (emailErr) {
        // Log but don't fail the request — submission is already saved
        console.error("Email notification failed:", emailErr)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
