"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

import { navLinks, profile } from "@/lib/site"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/site/theme-toggle"

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>(navLinks[0].href)

  // Elevate the navbar background after scrolling away from the top
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Track which section the visitor is currently viewing
  useEffect(() => {
    const ids = navLinks.map((link) => link.href.slice(1))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id
            const href = `#${id}`
            // Scrolling past the last tracked section keeps the last one highlighted
            if (navLinks.some((link) => link.href === href)) setActive(href)
          }
        }
      },
      // Narrow band around the top under the sticky navbar
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Prevent background scrolling while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const linkClass = (href: string) =>
    cn(
      "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring",
      active === href
        ? "text-foreground"
        : "text-muted-foreground hover:bg-primary/8 hover:text-foreground",
    )

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-border bg-background/80 shadow-xs backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <a
          href="#home"
          aria-label={`${profile.name} — home`}
          className="group/brand relative inline-flex items-center rounded-xl focus-visible:outline-2 focus-visible:outline-ring"
        >
          {/* Wordmark */}
          <span className="relative flex flex-col overflow-visible">
            <span
              className="relative inline-flex items-center text-xl leading-none font-extrabold tracking-tight transition-transform duration-300 ease-out group-hover/brand:-translate-y-0.5 motion-reduce:transition-none"
            >
              <span className="brand-flow bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                {profile.shortName.slice(0, -1)}
              </span>
              <span
                className="mr-[1px] text-foreground transition-colors duration-300 group-hover/brand:text-primary"
              >
                {profile.shortName.slice(-1)}
              </span>
              {/* Tail dot with pulse ring on hover */}
              <span aria-hidden className="relative ml-1 inline-flex size-2 items-center justify-center">
                <span
                  aria-hidden
                  className="absolute inline-flex size-2 rounded-full bg-gradient-to-br from-primary to-fuchsia-500 opacity-0 transition-opacity duration-300 group-hover/brand:animate-ping group-hover/brand:opacity-60 motion-reduce:group-hover/brand:animate-none"
                />
                <span className="relative inline-flex size-2 rounded-full bg-gradient-to-br from-primary to-fuchsia-500 transition-all duration-300 group-hover/brand:scale-110 motion-reduce:transition-none" />
              </span>
              {/* Hover glow behind the wordmark */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-0 blur-md transition-opacity duration-500 group-hover/brand:opacity-60 motion-reduce:transition-none"
                style={{
                  background:
                    "linear-gradient(90deg, color-mix(in oklch, var(--primary) 70%, transparent), transparent, color-mix(in oklch, oklch(0.7 0.19 328) 70%, transparent))",
                }}
              />
            </span>

            {/* Caption row: underline grower + role */}
            <span className="mt-1 flex items-center gap-2">
              <span
                aria-hidden
                className="h-px w-3 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 transition-all duration-500 ease-out group-hover/brand:w-8 motion-reduce:transition-none"
              />
              <span className="text-[9px] font-semibold tracking-[0.28em] whitespace-nowrap text-muted-foreground uppercase transition-colors duration-300 group-hover/brand:text-primary">
                {profile.role}
              </span>
            </span>

            {/* Shared underline grower */}
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-1 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 transition-transform duration-300 ease-out group-hover/brand:scale-x-100 motion-reduce:transition-none"
            />
          </span>
          <span className="sr-only">— {profile.name}</span>
        </a>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} aria-current={active === link.href ? "true" : undefined} className={linkClass(link.href)}>
                {link.label}
                {/* Active-section indicator: dot + underline */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 bottom-1.5 h-px rounded-full bg-gradient-to-r from-primary to-fuchsia-500 transition-opacity duration-300",
                    active === link.href ? "opacity-100" : "opacity-0",
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-primary transition-colors",
                    active === link.href ? "bg-primary" : "bg-transparent",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-foreground/80 transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring md:hidden"
          >
            {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "grid overflow-hidden bg-background/95 backdrop-blur-md transition-[grid-template-rows,opacity] duration-300 md:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <ul className="flex flex-col gap-1 px-4 pt-2 pb-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.href ? "true" : undefined}
                  className={cn(
                    "relative flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring",
                    active === link.href
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:bg-primary/10 hover:text-foreground",
                  )}
                >
                  {/* Active tracker dot */}
                  <span
                    aria-hidden
                    className={cn(
                      "size-1.5 rounded-full transition-colors",
                      active === link.href ? "bg-primary" : "bg-border",
                    )}
                  />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}
