"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "ul" | "ol" | "dl" | "article" | "header";
  /** Seconds before the transition starts. Use i * 0.15 to stagger siblings. */
  delay?: number;
  /** Starting offset in px. */
  y?: number;
  /** Starting blur in px. Headings use 8, cards use 0. */
  blur?: number;
  duration?: number;
  id?: string;
};

/**
 * Fades, lifts, and unblurs its content the first time it scrolls into view.
 * The look lives in globals.css (.reveal), this only flips data-shown.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  y = 24,
  blur = 0,
  duration = 0.6,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-shown", "");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = {
    "--reveal-y": `${y}px`,
    "--reveal-blur": `${blur}px`,
    "--reveal-dur": `${duration}s`,
    "--reveal-delay": `${delay}s`,
  } as CSSProperties;

  return (
    // @ts-expect-error: ref type differs per tag, all are HTMLElements.
    <Tag ref={ref} id={id} className={cn("reveal", className)} style={style}>
      {children}
    </Tag>
  );
}
