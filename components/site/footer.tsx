import { profile } from "@/lib/site"
import { SocialLinks } from "@/components/site/social-links"
import { BackToTop } from "@/components/site/contact"

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        <div className="text-center sm:text-left">
          <a href="#home" className="focus-visible:outline-2 focus-visible:outline-ring">
            <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-base font-extrabold tracking-tight text-transparent">
              {profile.shortName}
              <span className="text-foreground">.</span>
            </span>
          </a>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <SocialLinks />
          <BackToTop />
        </div>
      </div>
    </footer>
  )
}
