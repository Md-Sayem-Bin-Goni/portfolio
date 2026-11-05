import { projects } from "@/lib/site"
import { ProjectCard } from "@/components/site/project-card"
import { Reveal } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden border-t border-border/60">
      {/* Decorative aurora accent + watermark */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="hero-blob hero-blob-b bg-fuchsia-500/12" />
        <div className="hero-blob hero-blob-c bg-primary/12" />
        <span className="absolute -top-6 right-0 select-none text-[9rem] font-black leading-none tracking-tighter text-foreground/[0.03] sm:text-[12rem]">
          03
        </span>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <SectionHeading
            title="Featured Projects"
            description="A selection of projects I have built."
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 100}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
