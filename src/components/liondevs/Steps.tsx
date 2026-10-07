import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { liondevs } from "@/data/liondevs";

function BuildVisual() {
  const files = ["app/page.tsx", "api/solve.ts", "README.md"];
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="overflow-hidden rounded-xl bg-[#0d0d0d] shadow-lg shadow-black/15">
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="size-2 rounded-full" style={{ background: c }} />
          ))}
          <span className="ml-2 text-[10px] text-white/40">team-repo</span>
        </div>
        <ul className="p-3 font-mono text-[11px] leading-[1.9] text-white/70">
          {files.map((f, i) => (
            <li key={f} className="flex items-center justify-between">
              <span>{f}</span>
              <span className={i === 0 ? "text-[#4ade80]" : "text-white/30"}>
                {i === 0 ? "+42" : "+8"}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-line bg-white px-4 py-3 shadow-md shadow-black/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted">Working solution</span>
          <span className="text-[9px] text-subtle">building…</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-black/[0.08]">
          <div className="fill-bar h-full rounded-full bg-foreground/70" />
        </div>
      </div>
    </div>
  );
}

function SolveVisual() {
  const checks = ["Take on the challenge", "Find a smart way to fix it", "Get ready to pitch"];
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="rounded-xl border border-line bg-white p-4 shadow-sm">
        <p className="text-[10px] tracking-wider text-subtle uppercase">The challenge</p>
        <p className="mt-1 font-display text-[15px] font-bold text-foreground">
          A real-world problem
        </p>
        <span className="mt-2 inline-block rounded-full bg-surface px-2 py-0.5 text-[10px] text-muted">
          Revealed closer to the event
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        {checks.map((c, i) => (
          <li
            key={c}
            className="bob flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-[12px] text-foreground shadow-sm"
            style={{ animationDelay: `${-i * 1.4}s` }}
          >
            <span className="flex size-4 items-center justify-center rounded-full bg-[#4ade80]/15 text-[#16803c]">
              <Check className="size-2.5" />
            </span>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PitchVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-[#0d0d0d] p-4 shadow-lg shadow-black/15">
        <span className="text-[9px] tracking-wider text-white/40 uppercase">Slide 3 of 8</span>
        <p className="mt-3 font-display text-[18px] leading-tight font-bold text-white">
          Our solution
        </p>
        <div className="mt-3 flex flex-col gap-1.5">
          <span className="h-1.5 w-3/4 rounded-full bg-white/20" />
          <span className="h-1.5 w-1/2 rounded-full bg-white/20" />
        </div>
        <span className="absolute right-3 bottom-3 rounded-full bg-white px-2 py-0.5 text-[9px] font-semibold text-black">
          Live demo
        </span>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3 shadow-md shadow-black/[0.06]">
        <span className="text-[11px] text-muted">Judges and industry mentors</span>
        <span className="flex -space-x-1.5">
          {["#c9d6ea", "#e8dcc9", "#d4e5d6"].map((c) => (
            <span
              key={c}
              className="size-5 rounded-full ring-2 ring-white"
              style={{ background: c }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

const visuals: ReactNode[] = [
  <BuildVisual key="b" />,
  <SolveVisual key="s" />,
  <PitchVisual key="p" />,
];

/** Build, Solve, Pitch as three numbered cards. */
export function Steps() {
  return (
    <section aria-labelledby="ld-steps" className="relative px-6 py-20 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand opacity-[0.05] blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          id="ld-steps"
          title="Three steps."
          accent="One big idea."
          className="mb-12 md:mb-16"
        />
        <ol className="grid gap-4 md:grid-cols-3">
          {liondevs.steps.map((step, i) => (
            <Reveal as="li" key={step.title} y={32} duration={0.45} delay={i * 0.15}>
              <div className="relative flex h-[clamp(420px,60vh,480px)] flex-col overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-7">
                <div
                  aria-hidden
                  className="dot-grid pointer-events-none absolute inset-0 opacity-[0.35]"
                />
                <h3 className="relative flex items-baseline gap-2.5 pb-3 font-display text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl">
                  <span className="text-foreground/[0.16]">0{i + 1}</span>
                  <span className="text-foreground">{step.title}</span>
                </h3>
                <div aria-hidden className="relative min-h-0 flex-1 py-3">
                  {visuals[i]}
                </div>
                <p className="relative pt-3 text-[13.5px] leading-relaxed text-muted">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
