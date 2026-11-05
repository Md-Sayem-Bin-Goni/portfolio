import type { LucideIcon } from "lucide-react"
import {
  Component,
  Database,
  FileCode2,
  FileType,
  Palette,
  Terminal,
  Braces,
  Boxes,
  Cpu,
  GitBranch,
  FolderGit2,
  Hexagon,
  Layout,
  Triangle,
  Wind,
  Zap,
  Atom,
} from "lucide-react"

import { skillGroups } from "@/lib/site"
import { Reveal } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"

const skillIcons: Record<string, LucideIcon> = {
  HTML: FileCode2,
  CSS: Palette,
  JavaScript: Braces,
  TypeScript: FileType,
  "React.js": Atom,
  "Next.js": Triangle,
  "Tailwind CSS": Wind,
  Bootstrap: Layout,
  "shadcn/ui": Component,
  "Node.js": Hexagon,
  "Express.js": Zap,
  MongoDB: Database,
  Git: GitBranch,
  GitHub: FolderGit2,
  C: Terminal,
  "C++": Cpu,
  Java: Boxes,
}

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden border-t border-border/60 bg-muted/40">
      {/* Decorative aurora accent + watermark */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="hero-blob hero-blob-a bg-primary/10" />
        <div className="hero-blob hero-blob-c bottom-0 top-auto bg-fuchsia-500/10" />
        <span className="absolute -top-6 left-0 select-none text-[9rem] font-black leading-none tracking-tighter text-foreground/[0.03] sm:text-[12rem]">
          02
        </span>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <SectionHeading
            title="Skills &amp; Technologies"
            description="The technologies I know and have worked with."
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 80}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-sm p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 motion-reduce:hover:translate-y-0 sm:p-6">
                {/* Top gradient accent that lights up on hover */}
                <span
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                {/* Corner glow */}
                <span
                  className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />

                <div className="flex items-center justify-between gap-3">
                  <h3 className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                    <span className="size-1.5 rounded-full bg-gradient-to-r from-primary to-fuchsia-500" aria-hidden />
                    {group.title}
                  </h3>
                  <span
                    aria-hidden
                    className="text-2xl font-black leading-none text-foreground/[0.06] transition-colors duration-300 group-hover:text-primary/20"
                  >
                    0{i + 1}
                  </span>
                </div>

                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => {
                    const Icon = skillIcons[skill] ?? Boxes
                    return (
                      <li key={skill}>
                        <span className="hero-glass inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1.5 text-sm font-medium text-foreground/90 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary hover:shadow-md hover:shadow-primary/10 motion-reduce:transition-none">
                          <Icon className="size-4 text-primary" aria-hidden />
                          {skill}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
