"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Gentle entrance animation via IntersectionObserver (CSS transitions).
 * Disabled for users who prefer reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  /** Stagger delay in ms */
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transform-gpu transition-all duration-700 ease-out",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-5 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  )
}
