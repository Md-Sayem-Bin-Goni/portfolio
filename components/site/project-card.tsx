import { ArrowUpRight, ExternalLink, ImageIcon } from "lucide-react"
import Image from "next/image"

import { GithubIcon } from "@/components/site/icons"
import type { Project } from "@/lib/site"

/**
 * Premium project card. To add a new project, append it to `projects`
 * in `lib/site.ts` — no card changes needed.
 * Renders a real screenshot when `image` is set, otherwise a placeholder.
 */
export function ProjectCard({ project }: { project: Project }) {
  const initial = project.title[0]

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/15 motion-reduce:hover:translate-y-0">
      {/* Top gradient accent that lights up on hover */}
      <span
        className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      {/* Screenshot or placeholder visual */}
      <div className="relative flex aspect-video items-center justify-center overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-fuchsia-500/10 transition-colors group-hover:from-primary/20 group-hover:to-fuchsia-500/20">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 100vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.06] motion-reduce:transition-none"
          />
        ) : (
          <>
            <span
              className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-fuchsia-500 text-2xl font-extrabold text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
              aria-hidden
            >
              {initial}
            </span>
            <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-background/80 px-2 py-1 text-[0.7rem] text-muted-foreground backdrop-blur-sm">
              <ImageIcon className="size-3" aria-hidden />
              Screenshot placeholder
            </span>
          </>
        )}

        {/* Numbered index badge */}
        <span
          aria-hidden
          className="hero-glass absolute left-3 top-3 inline-flex size-8 items-center justify-center rounded-lg border border-border/60 text-sm font-bold text-foreground/80"
        >
          {project.title.length > 0 ? project.title.slice(0, 2).toUpperCase() : ""}
        </span>

        {/* Gradient wash on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="inline-flex items-center gap-1.5 text-lg font-bold tracking-tight">
          <span className="bg-gradient-to-r from-foreground to-foreground bg-clip-text transition-all duration-300 group-hover:from-primary group-hover:to-fuchsia-500 group-hover:text-transparent">
            {project.title}
          </span>
          <ArrowUpRight
            className="size-4 -translate-x-1 opacity-0 text-primary transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none"
            aria-hidden
          />
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="hero-glass rounded-full border border-border/60 px-2.5 py-0.5 text-xs font-medium text-foreground/80"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-border/60 pt-4">
          {project.links.map((link) =>
            link.type === "github" ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium text-foreground/90 transition-all hover:border-primary/50 hover:text-primary hover:shadow-md hover:shadow-primary/10 focus-visible:outline-2 focus-visible:outline-ring"
              >
                <GithubIcon className="size-4" aria-hidden />
                {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex h-9 items-center gap-1.5 overflow-hidden rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors focus-visible:outline-2 focus-visible:outline-ring"
              >
                {/* Gradient fill that sweeps in on card hover */}
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-primary to-fuchsia-500 transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none"
                />
                <ExternalLink className="relative size-4" aria-hidden />
                <span className="relative">{link.label}</span>
              </a>
            ),
          )}
        </div>
      </div>
    </article>
  )
}
