"use client"

import * as React from "react"
import { CheckCircle2, Send, XCircle } from "lucide-react"

import { profile } from "@/lib/site"
import { cn } from "@/lib/utils"

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

type Status = "idle" | "sending" | "sent" | "error"

const emptyForm: FormData = { name: "", email: "", subject: "", message: "" }

/**
 * Contact form that delivers messages directly to `profile.email`.
 * Uses FormSubmit's free AJAX endpoint — the first-ever submission
 * sends the owner an activation link (check the inbox once and click it;
 * afterwards every message arrives as regular email).
 */
export function ContactForm() {
  const [form, setForm] = React.useState<FormData>(emptyForm)
  const [status, setStatus] = React.useState<Status>("idle")

  function set(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formEl = e.currentTarget
    setStatus("sending")

    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${profile.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: form.subject
              ? `Portfolio inquiry: ${form.subject}`
              : `Portfolio inquiry from ${form.name || "a visitor"}`,
            _template: "table",
            _captcha: "false",
            Name: form.name,
            Email: form.email,
            Subject: form.subject,
            Message: form.message,
          }),
        },
      )

      if (!res.ok) throw new Error(`Request failed: ${res.status}`)

      formEl.reset()
      setForm(emptyForm)
      setStatus("sent")
    } catch {
      // Fallback: open the visitor's mail client so the message still gets through
      try {
        const subject = form.subject
          ? `Portfolio inquiry: ${form.subject}`
          : `Portfolio inquiry from ${form.name || "a visitor"}`
        const body = [
          `Hi ${profile.shortName},`,
          "",
          form.message,
          "",
          form.name ? `— ${form.name}` : "",
          form.email || "",
        ]
          .filter((line) => line !== "")
          .join("\n")
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      } finally {
        setStatus("error")
      }
    }
  }

  const fieldClass =
    "w-full border-b border-border bg-transparent py-2 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary"

  const labelClass = "mb-1 block text-xs font-semibold tracking-widest text-muted-foreground uppercase"

  return (
    <form onSubmit={handleSubmit} className="mt-10 text-left">
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={set("name")}
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={set("email")}
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="contact-subject" className={labelClass}>
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={set("subject")}
          placeholder="What's this about?"
          className={fieldClass}
        />
      </div>

      <div className="mt-6">
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={set("message")}
          placeholder="Tell me a little about your project or opportunity."
          className={cn(fieldClass, "resize-y")}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background shadow-sm transition-all",
            "hover:scale-[1.03] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-ring motion-reduce:transition-none",
            "disabled:pointer-events-none disabled:opacity-60",
          )}
        >
          <Send className="size-4" aria-hidden />
          {status === "sending" ? "Sending…" : "Send message"}
        </button>

        <p
          aria-live="polite"
          className={cn(
            "flex items-center gap-2 text-sm transition-opacity duration-500",
            status === "idle" ? "sr-only opacity-0" : "opacity-100",
          )}
        >
          {status === "sent" && (
            <>
              <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" aria-hidden />
              <span className="text-foreground/90">
                Message sent! It&apos;s on its way — I&apos;ll reply soon.
              </span>
            </>
          )}
          {status === "sending" && <span className="text-muted-foreground">Sending your message…</span>}
          {status === "error" && (
            <>
              <XCircle className="size-4 text-destructive" aria-hidden />
              <span className="text-destructive">
                Couldn&apos;t send automatically — your mail app may have opened instead. Please email me directly.
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  )
}
