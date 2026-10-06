"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { q: string; a: string };

/** Accessible accordion. Uses the WAI-ARIA disclosure pattern. */
export function Accordion({ items, tone = "site" }: { items: Item[]; tone?: "site" | "ld" }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const ld = tone === "ld";

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <li
            key={item.q}
            className={cn(
              "rounded-2xl border transition-colors duration-300",
              ld
                ? isOpen
                  ? "border-ld-gold/60 bg-ld-bg-2"
                  : "border-ld-gold/20 bg-ld-bg-2/50 hover:border-ld-gold/40"
                : isOpen
                  ? "border-line bg-surface shadow-card"
                  : "border-line bg-surface",
            )}
          >
            <h3 className="text-base sm:text-lg">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-semibold sm:px-6",
                  ld ? "text-ld-text" : "text-fg",
                )}
              >
                <span>{item.q}</span>
                <ChevronDown
                  aria-hidden
                  className={cn(
                    "size-5 shrink-0 transition-transform duration-300",
                    isOpen && "rotate-180",
                    ld ? "text-ld-gold" : "text-muted",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="px-5 pb-5 sm:px-6"
            >
              <p
                className={cn(
                  "animate-[rise-in_0.35s_ease-out_both]",
                  ld ? "text-ld-muted" : "text-muted",
                )}
              >
                {item.a}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
