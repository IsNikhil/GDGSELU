"use client";

import { ArrowRight, Mic } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whatWeDo } from "@/data/about";
import { team } from "@/data/team";
import { cn, isTBD } from "@/lib/utils";

function Frame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
      <div className={cn("flex h-[340px] bg-surface p-4 md:h-[400px] md:p-5", className)}>
        {children}
      </div>
    </div>
  );
}

function WorkshopVisual() {
  const code = [
    ["<", "section", ">"],
    ["  <", "h1", ">Hello, Lions</", "h1", ">"],
    ["  <", "button", ">Ship it</", "button", ">"],
    ["</", "section", ">"],
  ];
  return (
    <Frame className="gap-3">
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl bg-[#0d0d0d]">
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="size-2 rounded-full" style={{ background: c }} />
          ))}
          <span className="ml-2 text-[10px] text-white/40">index.html</span>
        </div>
        <pre className="flex-1 p-4 font-mono text-[11px] leading-[1.9] text-white/70 md:text-[12px]">
          {code.map((row, i) => (
            <div key={i} className="whitespace-pre">
              {row.map((part, j) => (
                <span key={j} className={j % 2 ? "text-[#8fb3e8]" : undefined}>
                  {part}
                </span>
              ))}
            </div>
          ))}
          <span className="blink mt-1 inline-block h-[1.1em] w-[0.5em] bg-white/70" />
        </pre>
      </div>
      <div className="hidden w-[38%] flex-col overflow-hidden rounded-xl border border-line bg-white sm:flex">
        <div className="border-b border-line px-3 py-2 text-[10px] text-subtle">Preview</div>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4">
          <span className="font-display text-xl font-bold text-foreground">Hello, Lions</span>
          <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-semibold text-white">
            Ship it
          </span>
        </div>
      </div>
    </Frame>
  );
}

function TalkVisual() {
  const bars = [0.6, 0.9, 0.45, 1, 0.7, 0.5, 0.85, 0.4, 0.75, 0.55, 0.95, 0.6];
  return (
    <Frame>
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-xl bg-[#0d0d0d]">
        <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-foreground">
          <span className="size-1.5 rounded-full bg-[#ef4444]" />
          Live
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70">
          Q&amp;A after
        </span>
        <span className="flex size-16 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80">
          <Mic className="size-6" strokeWidth={1.6} />
        </span>
        <div className="mt-6 flex h-10 items-end gap-[3px]">
          {bars.map((h, i) => (
            <span
              key={i}
              className="eq w-[3px] rounded-full bg-white/70"
              style={{ height: `${h * 100}%`, animationDelay: `${-i * 0.13}s` }}
            />
          ))}
        </div>
        <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between rounded-lg bg-white/[0.08] px-3 py-2 text-[11.5px] text-white/80 backdrop-blur-sm">
          <span>Tech talk</span>
          <span className="text-white/45">Open to every student</span>
        </div>
      </div>
    </Frame>
  );
}

function BuildVisual() {
  const cols = [
    { title: "Idea", cards: ["Pick a real problem", "Find teammates"] },
    { title: "Building", cards: ["Prototype", "Test with users"] },
    { title: "Demo", cards: ["Pitch to judges"] },
  ];
  return (
    <Frame className="gap-2.5 md:gap-3">
      {cols.map((c, ci) => (
        <div
          key={c.title}
          className="flex min-w-0 flex-1 flex-col gap-2 rounded-xl bg-black/[0.03] p-2.5"
        >
          <div className="flex items-center justify-between px-1 text-[11px] font-semibold text-muted">
            {c.title}
            <span className="text-subtle">{c.cards.length}</span>
          </div>
          {c.cards.map((card, i) => (
            <div
              key={card}
              className={cn(
                "rounded-lg border border-line bg-white px-3 py-2.5 text-[12px] text-foreground shadow-sm",
                ci === 1 && i === 0 && "bob ring-2 ring-brand/40",
              )}
            >
              {card}
              <div className="mt-2 flex items-center gap-1">
                <span className="h-1 w-8 rounded-full bg-brand/40" />
                <span className="h-1 w-4 rounded-full bg-black/10" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </Frame>
  );
}

function CommunityVisual() {
  const members = team.filter((m) => !isTBD(m.name));
  return (
    <Frame className="items-center justify-center">
      <div className="grid w-full max-w-sm grid-cols-2 gap-3">
        {members.map((m, i) => (
          <div
            key={m.name}
            className="bob flex items-center gap-2.5 rounded-xl border border-line bg-white p-2.5 shadow-sm"
            style={{ animationDelay: `${-i * 1.3}s` }}
          >
            <span className="relative size-9 shrink-0 overflow-hidden rounded-full bg-surface">
              {m.photo && (
                <Image
                  src={m.photo}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                  style={{ objectPosition: m.photoFocus }}
                />
              )}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[12px] font-semibold text-foreground">
                {m.name.split(" ")[0]}
              </span>
              <span className="block truncate text-[10.5px] text-subtle">{m.role}</span>
            </span>
          </div>
        ))}
        <div className="col-span-2 mt-1 flex items-center justify-center gap-2 rounded-xl border border-dashed border-black/15 bg-white/60 p-3 text-[12px] font-medium text-muted">
          <span className="size-1.5 rounded-full bg-brand" />
          You, next
        </div>
      </div>
    </Frame>
  );
}

type Item = { title: string; text: string; note: string; href?: string; Visual: () => ReactNode };

const items: Item[] = [
  { ...whatWeDo[0], Visual: WorkshopVisual, note: "Web, mobile, cloud, and AI" },
  { ...whatWeDo[1], Visual: TalkVisual, note: "Developers and industry speakers" },
  { ...whatWeDo[2], Visual: BuildVisual, note: "See LionDevs", href: "/liondevs" },
  { ...whatWeDo[3], Visual: CommunityVisual, note: "Meet the team", href: "/team" },
];

function Note({ item }: { item: Pick<Item, "note" | "href"> }) {
  const cls =
    "mt-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-[12px] text-muted";
  if (item.href) {
    return (
      <Link href={item.href} className={cn(cls, "group hover:text-foreground")}>
        {item.note}
        <ArrowRight
          aria-hidden
          className="size-3 transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    );
  }
  return <span className={cls}>{item.note}</span>;
}

/** Desktop: a tall track with a sticky stage. The title list lights up as you scroll. */
function StickyList() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(Math.max(-r.top / total, 0), 0.9999);
      setActive(Math.floor(p * items.length));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((i + 0.5) / items.length) * total, behavior: "smooth" });
  };

  return (
    <div ref={ref} className="relative hidden h-[240vh] md:-mt-16 md:block">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="grid w-full grid-cols-5 items-center gap-14">
          <div className="col-span-2 flex flex-col gap-7">
            {items.map((item, i) => (
              <h3 key={item.title}>
                <button
                  type="button"
                  onClick={() => jump(i)}
                  aria-current={active === i ? "true" : undefined}
                  className={cn(
                    "text-left font-display text-3xl font-bold tracking-tight transition-colors duration-300 lg:text-4xl",
                    active === i
                      ? "text-foreground"
                      : "text-foreground/[0.22] hover:text-foreground/40",
                  )}
                >
                  <span className="mr-3 align-middle text-[14px] font-medium tabular-nums opacity-40">
                    0{i + 1}
                  </span>
                  {item.title}
                </button>
              </h3>
            ))}
          </div>
          <div className="col-span-3">
            <div className="relative h-[480px]">
              {items.map(({ Visual, ...item }, i) => (
                <div
                  key={item.title}
                  aria-hidden={active !== i}
                  inert={active !== i}
                  className="absolute inset-0 flex flex-col justify-center transition-opacity duration-[400ms]"
                  style={{ opacity: active === i ? 1 : 0 }}
                >
                  <Visual />
                  <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
                    {item.text}
                  </p>
                  <div>
                    <Note item={item} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      aria-labelledby="what-we-do-title"
      className="relative px-6 pt-16 pb-4 md:pb-0"
    >
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          id="what-we-do-title"
          title="Learn it. Build it."
          accent="Share it."
          lead="Four simple ways to get involved. Come to one, or come to all of them."
          className="mb-12 md:mb-0"
        />

        <StickyList />

        {/* Phones and small tablets: a simple stacked list. */}
        <ul className="flex flex-col gap-14 md:hidden">
          {items.map(({ Visual, ...item }, i) => (
            <Reveal as="li" key={item.title} y={32}>
              <h3 className="mb-4 font-display text-3xl font-bold tracking-tight text-foreground">
                <span className="mr-3 align-middle text-[14px] font-medium tabular-nums opacity-40">
                  0{i + 1}
                </span>
                {item.title}
              </h3>
              <Visual />
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{item.text}</p>
              <Note item={item} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
