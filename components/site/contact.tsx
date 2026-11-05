import { ArrowUp, ArrowUpRight, MapPin, Mail } from "lucide-react"

import { FacebookIcon, GithubIcon, LinkedinIcon, WhatsAppIcon } from "@/components/site/icons"
import { ContactForm } from "@/components/site/contact-form"
import { profile, socials } from "@/lib/site"
import { Reveal } from "@/components/site/reveal"
import { cn } from "@/lib/utils"

function handleFromUrl(url: string) {
  try {
    return new URL(url).pathname.replace(/^\/+|\/+$/g, "")
  } catch {
    return url
  }
}

const contactRows = [
  { label: "WhatsApp", handle: "+880 1758-853890", href: socials.whatsapp, Icon: WhatsAppIcon },
  { label: "GitHub", handle: handleFromUrl(socials.github), href: socials.github, Icon: GithubIcon },
  { label: "LinkedIn", handle: handleFromUrl(socials.linkedin), href: socials.linkedin, Icon: LinkedinIcon },
  { label: "Facebook", handle: handleFromUrl(socials.facebook), href: socials.facebook, Icon: FacebookIcon },
] as const

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-border/60">
      {/* Decorative aurora accents + watermark */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="hero-blob hero-blob-a bg-primary/15" />
        <div className="hero-blob hero-blob-b bg-fuchsia-500/12" />
        <div className="hero-grain absolute inset-0" />
        <span className="absolute -bottom-4 left-0 select-none text-[9rem] font-black leading-none tracking-tighter text-foreground/[0.03] sm:text-[12rem]">
          04
        </span>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: heading, email, location, contact rows */}
          <Reveal>
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              <Mail className="size-3.5 text-primary" aria-hidden />
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Let&apos;s work <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">together</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Have a project in mind or an opportunity to discuss? Feel free
              to reach out — I usually reply within a day.
            </p>

            {/* Big email link */}
            <a
              href={`mailto:${profile.email}`}
              className="group mt-8 inline-flex max-w-full items-baseline gap-2 border-b border-border pb-1 text-xl font-bold tracking-tight break-all transition-colors hover:border-primary sm:text-2xl"
            >
              <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent transition-opacity group-hover:opacity-90">
                {profile.email}
              </span>
              <ArrowUpRight
                className="size-5 shrink-0 translate-y-0.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary motion-reduce:transition-none"
                aria-hidden
              />
            </a>

            <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" aria-hidden />
              {profile.location}
            </p>

            {/* Glass social rows */}
            <ul className="hero-glass mt-8 rounded-2xl border border-border/60 px-4 shadow-lg shadow-primary/5 sm:px-5">
              {contactRows.map(({ label, handle, href, Icon }) => (
                <li key={label} className="border-b border-border/60 last:border-b-0">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 py-4 focus-visible:outline-2 focus-visible:outline-ring"
                    aria-label={`${profile.shortName} on ${label}: ${handle}`}
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background/70 text-muted-foreground transition-all group-hover:bg-primary/12 group-hover:text-primary">
                      <Icon className="size-[18px]" aria-hidden />
                    </span>
                    <span className="font-semibold">{label}</span>
                    <span className="min-w-0 truncate font-mono text-xs text-muted-foreground sm:text-sm">
                      {handle}
                    </span>
                    <ArrowUpRight
                      className="ml-auto size-4 shrink-0 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary motion-reduce:transition-none"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Right: glass form panel */}
          <Reveal delay={100}>
            <div className="hero-glass relative overflow-hidden rounded-2xl border border-border/60 p-5 shadow-xl shadow-primary/10 sm:p-7">
              {/* Top gradient accent */}
              <span
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                aria-hidden
              />
              {/* Corner glow */}
              <span
                className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-primary/10 blur-2xl"
                aria-hidden
              />
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function BackToTop() {
  return (
    <a
      href="#home"
      aria-label="Back to top"
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-ring",
      )}
    >
      <ArrowUp className="size-4" aria-hidden />
    </a>
  )
}
