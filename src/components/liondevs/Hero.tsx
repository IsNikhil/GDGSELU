import { CalendarClock, ChevronDown, GraduationCap } from "lucide-react";
import Image from "next/image";
import { liondevs } from "@/data/liondevs";
import { parseDate } from "@/lib/utils";
import { CircuitCorner } from "./CircuitLines";
import { Countdown } from "./Countdown";
import { RegisterButton } from "./RegisterButton";

function GdgMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 24"
      className="h-4 w-8"
      fill="none"
      strokeWidth="5"
      strokeLinecap="round"
    >
      <path d="M16 4 L5 12" stroke="var(--g-red)" />
      <path d="M5 12 L16 20" stroke="var(--g-blue)" />
      <path d="M32 4 L43 12" stroke="var(--g-green)" />
      <path d="M43 12 L32 20" stroke="var(--g-yellow)" />
    </svg>
  );
}

export function LionDevsHero() {
  const date = parseDate(liondevs.date);
  return (
    <section
      aria-labelledby="ld-title"
      className="relative isolate flex min-h-[calc(100svh-var(--nav-h))] items-center overflow-hidden"
    >
      {/* Background glow and circuit corners */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgb(47_107_85/0.55),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgb(212_179_106/0.12),transparent_70%)]" />
      </div>
      <CircuitCorner
        corner="tl"
        delay={0.2}
        className="absolute top-0 left-0 w-[clamp(7rem,22vw,17rem)]"
      />
      <CircuitCorner
        corner="tr"
        delay={0.4}
        className="absolute top-0 right-0 w-[clamp(7rem,22vw,17rem)]"
      />
      <CircuitCorner
        corner="bl"
        delay={0.6}
        className="absolute bottom-0 left-0 hidden w-[clamp(7rem,18vw,14rem)] sm:block"
      />
      <CircuitCorner
        corner="br"
        delay={0.8}
        className="absolute right-0 bottom-0 hidden w-[clamp(7rem,18vw,14rem)] sm:block"
      />

      <div className="container-site flex flex-col items-center py-[clamp(2.5rem,6vw,5rem)] text-center">
        <div className="relative w-[clamp(9rem,26vw,15rem)]">
          <div
            aria-hidden
            className="glow-pulse absolute inset-[8%] -z-10 rounded-full bg-[radial-gradient(circle,rgb(230_201_136/0.45),transparent_68%)]"
          />
          <Image
            src={liondevs.logo}
            alt="LionDevs logo"
            width={1254}
            height={1254}
            priority
            sizes="(min-width: 1024px) 240px, 40vw"
            className="animate-float h-auto w-full rounded-[1.75rem]"
          />
        </div>

        <p className="rise-in mt-6 inline-flex items-center gap-2 rounded-full border border-ld-gold/40 bg-ld-bg-2/70 px-4 py-1.5 text-sm text-ld-text [animation-delay:100ms]">
          <span className="font-serif font-semibold text-ld-gold-light">Hosted by</span>
          <GdgMark />
          <span className="font-semibold">GDG</span>
          <span className="sr-only">, Google Developer Group</span>
        </p>

        <p className="rise-in mt-6 text-xs font-semibold tracking-[0.32em] text-ld-gold uppercase [animation-delay:180ms] sm:text-sm">
          {liondevs.label}
        </p>

        <h1
          id="ld-title"
          className="mt-4 font-serif text-[clamp(2.75rem,1.4rem+7vw,7rem)] leading-[1] font-bold tracking-[-0.02em]"
        >
          <span className="sr-only">
            {liondevs.name}: {liondevs.headline.join(" ")}
          </span>
          <span aria-hidden className="flex flex-wrap justify-center gap-x-[0.28em]">
            {liondevs.headline.map((word, i) => (
              <span
                key={word}
                className={`rise-in inline-block ${i === 1 ? "text-gold-gradient" : "text-ld-text"}`}
                style={{ animationDelay: `${300 + i * 260}ms` }}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        <p className="rise-in mt-6 max-w-2xl text-[length:var(--text-lead)] text-ld-muted [animation-delay:1100ms]">
          {liondevs.description}
        </p>
        <p className="rise-in mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ld-gold-light [animation-delay:1180ms] sm:text-base">
          <GraduationCap aria-hidden className="size-5 shrink-0" />
          {liondevs.openTo}
        </p>

        <div className="rise-in mt-7 [animation-delay:1250ms]">
          {date ? (
            <Countdown iso={liondevs.date} />
          ) : (
            <p className="inline-flex items-center gap-2 rounded-full border border-ld-gold/40 px-4 py-2 text-sm font-semibold text-ld-gold-light">
              <CalendarClock aria-hidden className="size-4" />
              {liondevs.tentativeDate
                ? `${liondevs.tentativeDate} (tentative)`
                : "Date to be announced"}
            </p>
          )}
        </div>

        <div className="rise-in mt-8 flex w-full flex-col items-center justify-center gap-3 [animation-delay:1400ms] sm:w-auto sm:flex-row">
          <RegisterButton className="w-full sm:w-auto" />
          <a
            href="#overview"
            className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-ld-gold/50 px-7 py-3.5 font-semibold text-ld-gold-light transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-ld-gold/10 sm:w-auto"
          >
            Learn more
            <ChevronDown
              aria-hidden
              className="size-5 transition-transform group-hover:translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
