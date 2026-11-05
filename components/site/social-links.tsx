import { Mail } from "lucide-react"

import { FacebookIcon, GithubIcon, LinkedinIcon, WhatsAppIcon } from "@/components/site/icons"
import { profile, socials } from "@/lib/site"
import { cn } from "@/lib/utils"

const items = [
  { label: "WhatsApp", href: socials.whatsapp, icon: WhatsAppIcon },
  { label: "GitHub", href: socials.github, icon: GithubIcon },
  { label: "LinkedIn", href: socials.linkedin, icon: LinkedinIcon },
  { label: "Facebook", href: socials.facebook, icon: FacebookIcon },
] as const

export function SocialLinks({
  className,
  iconClassName,
  ...props
}: {
  className?: string
  iconClassName?: string
} & React.ComponentProps<"ul">) {
  return (
    <ul className={cn("flex items-center gap-2.5", className)} {...props}>
      {items.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${profile.shortName} on ${label}`}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
          >
            <Icon className={cn("size-[18px]", iconClassName)} aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  )
}

export function EmailLink({ className }: { className?: string }) {
  return (
    <a
      href={`mailto:${profile.email}`}
      aria-label={`Email ${profile.name} at ${profile.email}`}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-ring",
        className,
      )}
    >
      <Mail className="size-[18px]" aria-hidden />
    </a>
  )
}
