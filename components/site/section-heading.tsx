import { cn } from "@/lib/utils"

export function SectionHeading({
  title,
  description,
  className,
}: {
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn("mx-auto mb-10 max-w-2xl text-center sm:mb-12", className)}>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {description ? (
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">{description}</p>
      ) : null}
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-fuchsia-500" aria-hidden />
    </div>
  )
}
