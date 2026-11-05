import { ArrowRight, Download, MapPin, Sparkles, Star } from "lucide-react"
import Image from "next/image"

import { profile, skillGroups } from "@/lib/site"
import { SocialLinks } from "@/components/site/social-links"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * Premium hero section. Profile/banner photo lives in `public/img` and is
 * rendered with next/image below.
 */
export function Hero() {
  const marqueeSkills = [...skillGroups[0].skills, ...skillGroups[1].skills]

  return (
    <section id="home" className="hero-aurora relative overflow-hidden pt-16">
      {/* Decorative background: aurora blobs + grain + giant watermark name */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="hero-blob hero-blob-a bg-primary/25" />
        <div className="hero-blob hero-blob-b bg-fuchsia-500/20" />
        <div className="hero-blob hero-blob-c bg-cyan-400/20" />
        <div className="hero-grain absolute inset-0" />
        <span className="absolute -bottom-4 left-1/2 w-full -translate-x-1/2 select-none text-center text-[22vw] font-black leading-none tracking-tighter text-foreground/[0.03] lg:text-[16rem]">
          {profile.shortName.toUpperCase()}
        </span>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-12 pb-10 sm:px-6 sm:pt-16 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
          {/* Text column */}
          <div className="min-w-0 text-center lg:text-left">
            <span className="animate-fade-up hero-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase text-muted-foreground [animation-delay:0ms]">
              <span className="relative flex size-2" aria-hidden>
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Available for work
            </span>

            <h1 className="animate-fade-up mt-6 [animation-delay:100ms]">
              <span className="block bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                {profile.name.split(" ")[0]} {profile.name.split(" ").slice(1).join(" ")}
              </span>
              <span className="mt-2 block text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {profile.role.split(" ")[0]}{" "}
                <span className="hero-outline-text">{profile.role.split(" ")[1]}</span>
              </span>
            </h1>

            <p className="animate-fade-up mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground [animation-delay:250ms] sm:mx-0 sm:text-base">
              {profile.intro}
            </p>

            <p className="animate-fade-up mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground [animation-delay:300ms]">
              <MapPin className="size-4 text-primary" aria-hidden />
              {profile.location}
            </p>

            <div className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3 [animation-delay:400ms] lg:justify-start">
              <a
                href="#projects"
                className={cn(buttonVariants({ size: "lg" }), "group/cta h-11 px-6 text-base")}
              >
                View My Projects
                <ArrowRight
                  className="transition-transform group-hover/cta:translate-x-1"
                  aria-hidden
                  data-icon="inline-end"
                />
              </a>
              <a
                href={profile.resumeUrl}
                download
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "hero-glass h-11 border-2 px-6 text-base"
                )}
              >
                <Download data-icon="inline-start" aria-hidden />
                Download Resume
              </a>
            </div>

            <SocialLinks className="animate-fade-up mt-8 justify-center [animation-delay:500ms] lg:justify-start" />
          </div>

          {/* Photo column — floating glass card with rotating gradient ring */}
          <div className="animate-fade-up relative mx-auto w-full max-w-[18rem] [animation-delay:300ms] sm:max-w-sm lg:max-w-md">
            {/* Rotating conic ring */}
            <div className="hero-ring absolute -inset-3 rounded-[2.5rem] sm:-inset-4" aria-hidden />

            <div className="hero-glass relative overflow-hidden rounded-[2rem] border border-border/60 shadow-2xl shadow-primary/20">
              <Image
                src="/img/656726536_1471968281231855_3975990816515801620_n.jpg"
                alt={`${profile.name}, ${profile.role}`}
                width={2047}
                height={2048}
                priority
                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.05] motion-reduce:transition-none"
              />
              {/* Bottom fade */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
            </div>

            {/* Floating badges */}
            <div className="badge-float hero-glass absolute -left-4 top-10 flex items-center gap-2 rounded-2xl border border-border/60 px-3 py-2 shadow-lg shadow-primary/10 sm:-left-8">
              <span className="flex size-8 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Sparkles className="size-4" aria-hidden />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold">Clean Code</p>
                <p className="text-[11px] text-muted-foreground">Pixel-perfect UI</p>
              </div>
            </div>

            <div className="badge-float-delay hero-glass absolute -right-3 bottom-12 flex items-center gap-2 rounded-2xl border border-border/60 px-3 py-2 shadow-lg shadow-primary/10 sm:-right-6">
              <span className="flex size-8 items-center justify-center rounded-xl bg-amber-500/15 text-amber-500">
                <Star className="size-4" aria-hidden />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold">Passionate</p>
                <p className="text-[11px] text-muted-foreground">Always learning</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Free space under the banner */}
      <div className="h-10 sm:h-14" aria-hidden />

      {/* Skills marquee */}
      <div className="relative border-y border-border/60 bg-card/50 py-3 backdrop-blur-sm">
        <div className="marquee flex w-max gap-3 motion-reduce:animate-none" aria-hidden>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-3">
              {marqueeSkills.map((skill) => (
                <span
                  key={`${copy}-${skill}`}
                  className="hero-glass inline-flex items-center rounded-full border border-border/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase"
                >
                  {skill}
                </span>
              ))}
            </div>
          ))}
        </div>
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  )
}
