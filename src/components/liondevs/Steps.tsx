"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Hammer, Lightbulb, Presentation } from "lucide-react";
import { useRef } from "react";
import { RevealItem, Stagger } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { liondevs } from "@/data/liondevs";

const icons = [Hammer, Lightbulb, Presentation];

/** Build, Solve, Pitch. The connecting line draws in as you scroll. */
export function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section aria-labelledby="ld-steps" className="section-y bg-ld-bg-2/40">
      <div className="container-site">
        <SectionHeading
          tone="ld"
          id="ld-steps"
          eyebrow="How it works"
          title="Three steps. One big idea."
        />
        <div ref={ref} className="relative mt-14">
          {/* Track and animated fill. Vertical on phones, horizontal on desktop. */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-[2.25rem] w-px bg-ld-gold/15 lg:top-[2.25rem] lg:right-[16%] lg:bottom-auto lg:left-[16%] lg:h-px lg:w-auto"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute top-0 bottom-0 left-[2.25rem] w-px origin-top bg-gradient-to-b from-ld-gold to-ld-gold-light lg:hidden"
          />
          <motion.div
            aria-hidden
            style={{ scaleX: progress }}
            className="absolute top-[2.25rem] right-[16%] left-[16%] hidden h-px origin-left bg-gradient-to-r from-ld-gold to-ld-gold-light lg:block"
          />
          <Stagger as="ol" gap={0.15} className="relative grid gap-10 lg:grid-cols-3 lg:gap-8">
            {liondevs.steps.map((step, i) => {
              const Icon = icons[i] ?? Lightbulb;
              return (
                <RevealItem
                  as="li"
                  key={step.title}
                  className="flex gap-6 lg:flex-col lg:items-center lg:text-center"
                >
                  <span className="relative flex size-[4.5rem] shrink-0 items-center justify-center rounded-full border-[1.5px] border-ld-gold bg-ld-bg text-ld-gold-light">
                    <Icon aria-hidden className="size-7" strokeWidth={1.6} />
                    <span className="absolute -top-1 -right-1 flex size-7 items-center justify-center rounded-full bg-ld-gold text-xs font-bold text-ld-bg">
                      {i + 1}
                    </span>
                  </span>
                  <div className="pt-2 lg:pt-0">
                    <h3
                      className={`font-serif text-[length:var(--text-h2)] leading-none font-semibold ${i === 1 ? "text-gold-gradient" : "text-ld-text"}`}
                    >
                      {step.title}.
                    </h3>
                    <p className="mt-3 max-w-xs text-ld-muted lg:mx-auto">{step.text}</p>
                  </div>
                </RevealItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
