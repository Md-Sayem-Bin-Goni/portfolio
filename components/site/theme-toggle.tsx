"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

const noopSubscribe = () => () => {}

/**
 * Returns false during SSR/first render and true after hydration,
 * so the icon can be deferred without setState-in-effect.
 */
function useMounted() {
  return React.useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  )
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-foreground/80 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
    >
      {mounted && isDark ? (
        <Sun className="size-4" aria-hidden />
      ) : (
        <Moon className="size-4" aria-hidden />
      )}
    </button>
  )
}
