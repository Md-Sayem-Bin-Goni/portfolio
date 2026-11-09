import { NextResponse } from "next/server"
import { Resend } from "resend"

interface ContactPayload {
  name?: unknown
  email?: unknown
  subject?: unknown
  message?: unknown
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
/** Basic in-memory rate limiting: max 3 messages per 10 minutes per IP. */
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 3
const hits = new Map<string, number[]>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  return false
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_EMAIL

  if (!apiKey || !to) {
    console.error("Missing RESEND_API_KEY or CONTACT_EMAIL env vars.")
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    )
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      { status: 429 },
    )
  }

  let payload: ContactPayload
  try {
    payload = (await request.json()) as ContactPayload
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : ""
  const email = typeof payload.email === "string" ? payload.email.trim() : ""
  const subject = typeof payload.subject === "string" ? payload.subject.trim() : ""
  const message = typeof payload.message === "string" ? payload.message.trim() : ""

  if (!name || name.length > 100) {
    return NextResponse.json({ error: "Please provide your name." }, { status: 400 })
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    )
  }
  if (!message || message.length > 5000) {
    return NextResponse.json({ error: "Please write a message." }, { status: 400 })
  }

  const resend = new Resend(apiKey)
  const subjectLine = subject
    ? `Portfolio inquiry: ${subject}`
    : `Portfolio inquiry from ${name}`

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: subjectLine,
      html: `
        <table style="width:100%;border-collapse:collapse;font-family:Arial,Helvetica,sans-serif">
          <tr><td style="padding:8px 12px;background:#f5f5f7;font-weight:bold;width:90px">Name</td><td style="padding:8px 12px">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f5f7;font-weight:bold">Email</td><td style="padding:8px 12px">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f5f7;font-weight:bold">Subject</td><td style="padding:8px 12px">${escapeHtml(subject || "—")}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f5f7;font-weight:bold;vertical-align:top">Message</td><td style="padding:8px 12px;white-space:pre-wrap">${escapeHtml(message)}</td></tr>
        </table>
      `,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "—"}\n\n${message}`,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Email send failed:", err)
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    )
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
