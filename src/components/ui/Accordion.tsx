"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Item = { q: string; a: string };

/** FAQ list. White cards, a plus that turns into an x, and a smooth height change. */
export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <ul className="flex flex-col gap-4">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <Reveal as="li" key={item.q} delay={i * 0.06} duration={0.5}>
            <div className="rounded-2xl border border-line bg-white transition-colors duration-200 hover:border-line-hover">
              <h3>
                <button
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left text-[16px] font-bold text-foreground sm:px-7"
                >
                  {item.q}
                  <span
                    aria-hidden
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center text-subtle transition-transform duration-200",
                      isOpen && "rotate-45",
                    )}
                  >
                    <Plus className="size-4" />
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                inert={!isOpen}
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-[14px] leading-[1.7] text-muted sm:px-7">{item.a}</p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
