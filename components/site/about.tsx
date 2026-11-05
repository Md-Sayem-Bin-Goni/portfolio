import { Heart, Layout, GraduationCap, Code2, Rocket, BookOpen, Infinity as InfinityIcon } from "lucide-react"

import { profile, skillGroups, projects } from "@/lib/site"
import { Reveal } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"

const highlights = [
  {
    icon: Heart,
    text: "Passionate about programming and building real-world software.",
    tile: "bg-primary/12 text-primary",
  },
  {
    icon: Layout,
    text: "Focused on clean UI and fully responsive web applications.",
    tile: "bg-fuchsia-500/12 text-fuchsia-600 dark:text-fuchsia-400",
  },
  {
    icon: GraduationCap,
    text: "Continuously learning and improving development skills.",
    tile: "bg-cyan-400/12 text-cyan-600 dark:text-cyan-400",
  },
] as const

const techCount = skillGroups.reduce((sum, g) => sum + g.skills.length, 0)
const liveCount = projects.filter((p) => p.visible).length

const stats = [
  { icon: Code2, value: `${techCount}+`, label: "Technologies used" },
  { icon: Rocket, value: `${liveCount}+`, label: "Live projects" },
  { icon: BookOpen, value: "Always", label: "Learning new tools" },
  { icon: InfinityIcon, value: "∞", label: "Curiosity & drive" },
] as const

export function About() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-border/60">
      {/* Decorative aurora accent + watermark */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="hero-blob hero-blob-b bg-primary/15" />
        <span className="absolute -top-6 right-0 select-none text-[9rem] font-black leading-none tracking-tighter text-foreground/[0.03] sm:text-[12rem]">
          01
        </span>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <SectionHeading
            title="About Me"
            description="A quick look at who I am and what drives me."
          />
        </Reveal>

        {/* Stats strip */}
        <div className="animate-fade-up mt-2 mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="hero-glass group rounded-2xl border border-border/60 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 motion-reduce:hover:translate-y-0 sm:p-5"
            >
              <span className="mx-auto flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-fuchsia-500/10 text-primary transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none">
                <Icon className="size-5" aria-hidden />
              </span>
              <p className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                {value}
              </p>
              <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <Reveal>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {profile.about.map((paragraph, i) => (
                <p key={paragraph.slice(0, 24)} className={i === 0 ? "text-foreground" : undefined}>
                  {i === 0 ? (
                    <span className="mr-2 inline-block align-middle text-3xl font-black leading-none bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">
                      {paragraph.slice(0, 1)}
                    </span>
                  ) : null}
                  {i === 0 ? paragraph.slice(1) : paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ul className="hero-glass flex flex-col gap-3.5 rounded-2xl border border-border/60 p-5 shadow-lg shadow-primary/5 transition-shadow hover:shadow-xl hover:shadow-primary/10 sm:p-6">
              {highlights.map(({ icon: Icon, text, tile }) => (
                <li key={text} className="flex items-start gap-3.5">
                  <span
                    className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors ${tile}`}
                  >
                    <Icon className="size-[18px]" aria-hidden />
                  </span>
                  <p className="pt-1.5 text-sm leading-relaxed text-foreground/90 sm:text-[0.95rem]">{text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
