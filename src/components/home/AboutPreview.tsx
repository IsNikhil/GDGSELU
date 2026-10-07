import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, gdgExplainer, techAreas } from "@/data/about";
import { team } from "@/data/team";
import { isTBD } from "@/lib/utils";

const interests = [
  "Coding and building",
  "Design",
  "Business and pitching",
  "Research and problem solving",
];

function StepCard({
  n,
  word,
  title,
  text,
  children,
}: {
  n: string;
  word: string;
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <div className="relative flex h-[clamp(430px,64vh,500px)] flex-col overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-7 md:h-[clamp(480px,62vh,540px)]">
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-[0.35]" />
      <p className="relative flex items-baseline gap-2.5 pb-3 font-display text-4xl font-medium tracking-tight sm:text-5xl lg:text-[3.25rem]">
        <span className="text-foreground/[0.16]">{n}</span>
        <span className="text-foreground">{word}</span>
      </p>
      <div aria-hidden className="relative min-h-0 flex-1 py-3">
        {children}
      </div>
      <div className="relative pt-3">
        <h3 className="text-[18px] font-semibold text-foreground md:text-[19px]">{title}</h3>
        <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{text}</p>
      </div>
    </div>
  );
}

/** Topic tiles tossed on the table, with a progress card underneath. */
function CuriousVisual() {
  const tiles = [
    { t: techAreas[1], c: "left-[2%] top-[2%] rotate-[-4deg]", bg: "bg-[#e8f0fb]", d: "0s" },
    { t: techAreas[0], c: "right-[2%] top-[12%] rotate-[3deg]", bg: "bg-[#e7f5ec]", d: "-1.2s" },
    { t: techAreas[3], c: "left-[8%] top-[36%] rotate-[2deg]", bg: "bg-[#fdf3dc]", d: "-2.4s" },
    { t: techAreas[4], c: "right-[6%] top-[46%] rotate-[-3deg]", bg: "bg-[#fbe9e7]", d: "-3.6s" },
  ];
  return (
    <div className="relative h-full w-full">
      {tiles.map((x) => (
        <div key={x.t} className={`absolute w-[46%] ${x.c}`}>
          <div className="bob" style={{ animationDelay: x.d }}>
            <div
              className={`relative flex aspect-video items-end overflow-hidden rounded-xl p-2.5 shadow-lg ring-1 shadow-black/10 ring-black/5 ${x.bg}`}
            >
              <span className="font-display text-[15px] leading-tight font-bold text-foreground/80">
                {x.t}
              </span>
              <span className="absolute top-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[8px] font-medium text-white/85">
                workshop
              </span>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-[2%] left-1/2 w-[78%] -translate-x-1/2">
        <div className="rounded-xl border border-line bg-white px-4 py-3 shadow-md shadow-black/[0.06]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted">Your first project</span>
            <span className="text-[9px] text-subtle">building…</span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-black/[0.08]">
            <div className="fill-bar h-full rounded-full bg-foreground/70" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Interests as chat style bubbles, ending on a reassuring check. */
function AnyMajorVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5">
      {interests.map((t, i) => (
        <div
          key={t}
          className={`max-w-[85%] rounded-2xl border border-line bg-white px-3.5 py-2 text-[12.5px] text-foreground shadow-sm ${i % 2 ? "self-end rounded-br-md" : "self-start rounded-bl-md"}`}
        >
          {t}
        </div>
      ))}
      <div className="mt-2 inline-flex items-center gap-1.5 self-center rounded-full border border-[#4ade80]/40 bg-[#4ade80]/10 px-3 py-1 text-[11.5px] font-medium text-[#16803c]">
        <Check className="size-3" />
        No experience needed
      </div>
    </div>
  );
}

/** Board members as tilted photo cards. */
function StudentRunVisual() {
  const members = team.filter((m) => !isTBD(m.name)).slice(0, 4);
  const spots = [
    "left-[4%] top-[2%] rotate-[-5deg]",
    "right-[4%] top-[8%] rotate-[4deg]",
    "left-[10%] top-[44%] rotate-[3deg]",
    "right-[10%] top-[48%] rotate-[-3deg]",
  ];
  return (
    <div className="relative h-full w-full">
      {members.map((m, i) => (
        <div key={m.name} className={`absolute w-[40%] ${spots[i]}`}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface shadow-lg ring-1 shadow-black/15 ring-black/5">
            {m.photo && (
              <Image
                src={m.photo}
                alt=""
                fill
                sizes="160px"
                className="object-cover"
                style={{ objectPosition: m.photoFocus }}
              />
            )}
            <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/60 px-2 py-0.5 text-[8px] font-medium text-white/90 backdrop-blur-sm">
              {m.role}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AboutPreview() {
  return (
    <section aria-labelledby="about-preview" className="relative px-6 py-20 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand opacity-[0.05] blur-[120px]" />
      </div>
      <div className="relative mx-auto w-full max-w-6xl">
        <SectionHeading
          id="about-preview"
          title="A home for students"
          accent="who like to build."
          lead={about.short}
          className="mb-12 md:mb-16"
        >
          <Link
            href="/about"
            className="group mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-foreground"
          >
            More about us
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </SectionHeading>

        <div className="grid gap-4 md:grid-cols-3">
          <Reveal y={32} duration={0.45}>
            <StepCard n="01" word="Curious?" title="You belong here" text={about.belong}>
              <CuriousVisual />
            </StepCard>
          </Reveal>
          <Reveal y={32} duration={0.45} delay={0.15}>
            <StepCard
              n="02"
              word="Any major"
              title="No experience needed"
              text="You do not need to be a computer science major or have any experience."
            >
              <AnyMajorVisual />
            </StepCard>
          </Reveal>
          <Reveal y={32} duration={0.45} delay={0.3}>
            <StepCard n="03" word="Students" title="Run by students" text={gdgExplainer.points[1]}>
              <StudentRunVisual />
            </StepCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
