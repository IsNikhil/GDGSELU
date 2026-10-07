import { ArrowDown, Check, ChevronLeft, Maximize2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Sky } from "@/components/ui/Sky";
import { liondevs } from "@/data/liondevs";
import { parseDate, rise } from "@/lib/utils";
import { Countdown } from "./Countdown";
import { RegisterButton, registrationOpen } from "./RegisterButton";

/** Dark event window: the logo on the right, highlights typing in on the left. */
function EventConsole() {
  const date = parseDate(liondevs.date);
  return (
    <div className="overflow-hidden rounded-2xl border border-black/20 bg-[#0d0d0d] text-left shadow-lg shadow-black/10">
      <div
        aria-hidden
        className="flex h-9 items-center justify-between gap-2 border-b border-white/[0.06] px-3 md:h-10 md:px-4"
      >
        <div className="flex min-w-0 items-center gap-2 md:gap-3">
          <span className="flex shrink-0 items-center gap-1 text-[11px] text-white/40">
            <ChevronLeft className="size-3" />
            GDG
          </span>
          <span className="truncate text-[11.5px] font-medium text-white/85 md:text-[12px]">
            liondevs
          </span>
          <span className="hidden items-center gap-1.5 text-[10px] text-white/40 sm:flex">
            <span className="size-1.5 rounded-full bg-[#e2b65b]" />
            {liondevs.format}
          </span>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 text-[10px] text-white/45">
          <span
            className={`size-1.5 rounded-full ${registrationOpen ? "bg-[#4ade80]" : "bg-white/30"}`}
          />
          {registrationOpen ? "Registration open" : "Opening soon"}
        </span>
      </div>

      <div className="flex flex-col-reverse sm:h-[340px] sm:flex-row">
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-6 border-white/[0.06] p-4 sm:border-r md:w-[340px] md:flex-none md:p-5">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-white/35 uppercase">Why join</p>
            <ul className="mt-3 flex flex-col gap-2 font-mono text-[11.5px] md:text-[12px]">
              {liondevs.highlights.map((h, i) => (
                <li
                  key={h.text}
                  className="rise flex items-start gap-2 text-white/70"
                  style={rise({ y: 6, dur: 0.4, delay: 1.6 + i * 0.3 })}
                >
                  <Check aria-hidden className="mt-0.5 size-3.5 shrink-0 text-[#4ade80]" />
                  {h.text}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-[10px] tracking-[0.2em] text-white/35 uppercase">
              {date ? "Starts in" : "When"}
            </p>
            {date ? (
              <Countdown iso={liondevs.date} />
            ) : (
              <p className="text-[13px] text-white/80">
                {liondevs.tentativeDate || "Date to be announced"}
                <span className="text-white/40"> (tentative)</span>
              </p>
            )}
          </div>
        </div>
        <div aria-hidden className="relative flex flex-1 items-center justify-center py-8 sm:py-0">
          <Maximize2 className="absolute top-3 right-3 size-3 text-white/25" />
          <Image
            src={liondevs.logo}
            alt=""
            width={240}
            height={240}
            priority
            sizes="(min-width: 768px) 240px, 160px"
            className="bob size-40 rounded-2xl shadow-2xl shadow-black/60 md:size-[220px]"
          />
        </div>
      </div>
    </div>
  );
}

export function LionDevsHero() {
  const [last, ...rest] = [...liondevs.headline].reverse();
  const first = rest.reverse();

  return (
    <section
      aria-labelledby="ld-title"
      className="relative flex flex-col items-center overflow-x-clip px-6 pt-16 pb-16 md:pb-24"
    >
      <Sky className="h-[85vh] min-h-[560px]" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center pt-14 text-center md:pt-[4.5rem]">
        <p
          className="rise mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-3.5 py-1 text-[12px] font-medium text-muted backdrop-blur-sm"
          style={rise({ y: 12, dur: 0.6, delay: 0.25 })}
        >
          <span className="size-1.5 rounded-full bg-brand" />
          {liondevs.label}
        </p>
        <h1 id="ld-title" className="rise mb-5" style={rise({ y: 30, blur: 6, delay: 0.35 })}>
          <span className="sr-only">{liondevs.name}: </span>
          <span className="block text-[clamp(2.5rem,11vw,3.25rem)] leading-[0.95] font-extrabold tracking-[-0.03em] text-foreground md:text-[clamp(3.25rem,6vw,4.5rem)]">
            {first.join(" ")}
          </span>
          <span className="serif-italic block text-[clamp(2.5rem,11vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-foreground md:text-[clamp(3.25rem,6vw,4.5rem)]">
            {last}
          </span>
        </h1>
        <p
          className="rise mb-7 max-w-xl text-[15px] leading-[1.65] text-muted"
          style={rise({ y: 20, dur: 0.6, delay: 0.55 })}
        >
          {liondevs.description}
        </p>
        <div
          className="rise flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          style={rise({ y: 20, dur: 0.6, delay: 0.7 })}
        >
          <RegisterButton className="w-full sm:w-auto" />
          <Button href="#overview" variant="outline" className="w-full sm:w-auto">
            Learn more
            <ArrowDown
              aria-hidden
              className="size-4 transition-transform duration-200 group-hover/btn:translate-y-0.5"
            />
          </Button>
        </div>
        <p
          className="rise mt-5 text-[14px] text-muted"
          style={rise({ y: 12, dur: 0.6, delay: 0.8 })}
        >
          {liondevs.openTo}
        </p>
      </div>

      <div
        className="rise relative z-10 mx-auto mt-10 w-full max-w-5xl sm:px-4 md:mt-14"
        style={rise({ y: 60, scale: 0.96, dur: 1, delay: 0.9 })}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/3 left-1/2 h-[300px] w-[80%] -translate-x-1/2 rounded-full bg-brand opacity-[0.06] blur-[100px]" />
        </div>
        <EventConsole />
      </div>
    </section>
  );
}
