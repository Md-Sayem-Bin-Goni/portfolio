import type { Metadata } from "next"
import { ArrowLeft, ExternalLink, CheckCircle2, Wrench, Rocket } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { projects } from "@/lib/site"
import { Navbar } from "@/components/site/navbar"
import { Footer } from "@/components/site/footer"
import { BackToTop } from "@/components/site/contact"
import { GithubIcon } from "@/components/site/icons"

export function generateStaticParams() {
  return projects
    .filter((project) => project.visible)
    .map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.visible && p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} | Project Details`,
    description: project.description,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.visible && p.slug === slug)
  if (!project) notFound()

  const githubLink = project.links.find((l) => l.type === "github")
  const liveLink = project.links.find((l) => l.type === "live")

  return (
    <>
      <Navbar />
      <main className="border-t border-border/60">
        <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
          {/* Back link */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
          >
            <ArrowLeft className="size-4" aria-hidden /> Back to all projects
          </Link>

          {/* Header */}
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
              {project.title}
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {project.description}
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {liveLink ? (
              <a
                href={liveLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-ring"
              >
                <ExternalLink className="size-4" aria-hidden /> Live Project
              </a>
            ) : null}
            {githubLink ? (
              <a
                href={githubLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-border px-5 text-sm font-semibold text-foreground/90 transition-all hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
              >
                <GithubIcon className="size-4" aria-hidden /> GitHub Repository
              </a>
            ) : null}
          </div>

          {/* Screenshot */}
          {project.image ? (
            <div className="mt-10 overflow-hidden rounded-2xl border border-border shadow-xl shadow-primary/5">
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                width={1280}
                height={720}
                className="h-auto w-full object-cover"
              />
            </div>
          ) : null}

          {/* Tech stack */}
          <section className="mt-12" aria-labelledby="stack-heading">
            <h2
              id="stack-heading"
              className="inline-flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl"
            >
              <Wrench className="size-5 text-primary" aria-hidden /> Technology
              Stack
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="hero-glass rounded-full border border-border/60 px-3.5 py-1.5 text-sm font-medium text-foreground/85"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          {/* Challenges */}
          <section className="mt-12" aria-labelledby="challenges-heading">
            <h2
              id="challenges-heading"
              className="inline-flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl"
            >
              <Rocket
                className="size-5 text-fuchsia-600 dark:text-fuchsia-400"
                aria-hidden
              />{" "}
              Challenges Faced
            </h2>
            <ul className="mt-4 space-y-3">
              {project.challenges.map((challenge) => (
                <ProjectPoint key={challenge} text={challenge} />
              ))}
            </ul>
          </section>

          {/* Improvements */}
          <section className="mt-12" aria-labelledby="improvements-heading">
            <h2
              id="improvements-heading"
              className="inline-flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl"
            >
              <Rocket className="size-5 text-primary" aria-hidden /> Potential
              Improvements &amp; Future Plans
            </h2>
            <ul className="mt-4 space-y-3">
              {project.improvements.map((note) => (
                <ProjectPoint key={note} text={note} />
              ))}
            </ul>
          </section>

          <BackToTop />
        </article>
      </main>
      <Footer />
    </>
  )
}

function ProjectPoint({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
      <CheckCircle2
        className="mt-0.5 size-4.5 shrink-0 text-primary/80"
        aria-hidden
      />
      <span className="text-foreground/80">{text}</span>
    </li>
  )
}
