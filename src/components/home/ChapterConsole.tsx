import { Check, ChevronLeft, Maximize2, Plus, RotateCcw, Send } from "lucide-react";
import Image from "next/image";
import { techAreas } from "@/data/about";
import { liondevs } from "@/data/liondevs";
import { site } from "@/data/site";
import { rise } from "@/lib/utils";

type Line = { kind: "cmd" | "ok" | "next"; text: string };

const lines: Line[] = [
  { kind: "cmd", text: "npx gdg join" },
  { kind: "ok", text: "No experience needed" },
  { kind: "ok", text: "Open to every major" },
  { kind: "ok", text: "Free for every student" },
  { kind: "cmd", text: "gdg events --next" },
  { kind: "next", text: `${liondevs.name}: ${liondevs.headline.join(" ")}` },
];

const tracks = [
  {
    id: "T3",
    clips: [
      { label: "Tech talk", start: 6, width: 14 },
      { label: "Tech talk", start: 38, width: 14 },
      { label: "Tech talk", start: 70, width: 14 },
    ],
    tone: "border-[#8b7bf0]/40 bg-[#8b7bf0]/20 text-[#c9c0ff]",
  },
  {
    id: "T2",
    clips: techAreas.map((t, i) => ({
      label: t.replace("AI and Machine Learning", "AI and ML"),
      start: 1 + i * 16.4,
      width: 15.4,
    })),
    tone: "border-[#6490d0]/45 bg-[#6490d0]/20 text-[#b9cfee]",
  },
  {
    id: "T1",
    clips: [
      { label: "Projects", start: 4, width: 52 },
      { label: liondevs.name, start: 60, width: 36 },
    ],
    tone: "border-[#e2b65b]/40 bg-[#e2b65b]/15 text-[#f1d9a4]",
  },
];

/**
 * Dark app window in the hero, standing in for the reference's editor mock.
 * Everything in it comes from the data files. Animated with CSS only.
 */
export function ChapterConsole() {
  return (
    <div
      aria-hidden
      className="overflow-hidden rounded-2xl border border-black/20 bg-[#0d0d0d] text-left shadow-lg shadow-black/10 select-none"
    >
      {/* Title bar */}
      <div className="flex h-9 items-center justify-between gap-2 border-b border-white/[0.06] px-3 md:h-10 md:px-4">
        <div className="flex min-w-0 items-center gap-2 md:gap-3">
          <span className="flex shrink-0 items-center gap-1 text-[11px] text-white/40">
            <ChevronLeft className="size-3" />
            Back
          </span>
          <span className="truncate text-[11.5px] font-medium text-white/85 md:text-[12px]">
            gdg-southeastern
          </span>
          <span className="hidden items-center gap-1.5 text-[10px] text-white/40 sm:flex">
            <span className="size-1.5 rounded-full bg-[#8b7bf0]" />
            Fall semester
          </span>
          <Check className="size-3 shrink-0 text-[#4ade80]" />
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden items-center gap-1.5 text-[10px] text-white/45 sm:flex">
            <span className="size-1.5 rounded-full bg-[#4ade80]" />
            Open to all
          </span>
          <span className="rounded-full bg-white px-2.5 py-[3px] text-[10.5px] font-semibold text-black md:px-3 md:py-1 md:text-[11px]">
            Join
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex h-[264px] flex-row md:h-[360px]">
        <div className="flex min-w-0 flex-1 flex-col border-r border-white/[0.06] md:w-[300px] md:flex-none md:shrink-0">
          <div className="flex gap-1 p-1.5">
            <span className="flex-1 rounded-md py-1 text-center text-[10px] text-white/40 md:py-1.5 md:text-[11px]">
              Files
            </span>
            <span className="flex-1 rounded-md bg-gradient-to-b from-[#4b5cf0] to-[#3a45cc] py-1 text-center text-[10px] font-medium text-white md:py-1.5 md:text-[11px]">
              Terminal
            </span>
          </div>
          <div className="flex items-center justify-between px-3 py-1.5 text-[11px] text-white/70 md:text-[12px]">
            <span className="flex items-center gap-1.5">
              <Plus className="size-3 text-white/40" />
              zsh
            </span>
            <span className="flex items-center gap-2 text-white/30">
              <Plus className="size-3" />
              <RotateCcw className="size-3" />
            </span>
          </div>
          <div className="flex-1 overflow-hidden border-t border-white/[0.06] px-3 py-3 font-mono text-[10.5px] leading-[1.9] md:text-[11.5px]">
            {lines.map((l, i) => (
              <p
                key={l.text}
                className="rise flex items-start gap-2 whitespace-nowrap"
                style={rise({ y: 6, dur: 0.4, delay: 1.7 + i * 0.45 })}
              >
                {l.kind === "cmd" && (
                  <>
                    <span className="text-[#4ade80]">~ $</span>
                    <span className="text-white/90">{l.text}</span>
                  </>
                )}
                {l.kind === "ok" && (
                  <>
                    <span className="text-[#4ade80]">✓</span>
                    <span className="text-white/60">{l.text}</span>
                  </>
                )}
                {l.kind === "next" && (
                  <>
                    <span className="text-[#8fb3e8]">→</span>
                    <span className="text-[#b9cfee]">{l.text}</span>
                  </>
                )}
              </p>
            ))}
            <p
              className="rise flex gap-2"
              style={rise({ y: 6, dur: 0.4, delay: 1.7 + lines.length * 0.45 })}
            >
              <span className="text-[#4ade80]">~ $</span>
              <span className="blink inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-white/80" />
            </p>
          </div>
          <div className="p-2 md:p-2.5">
            <div className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.04] py-1.5 pr-1.5 pl-3">
              <span className="text-[10.5px] text-white/30 md:text-[11px]">
                Ask the chapter anything...
              </span>
              <span className="flex size-5 items-center justify-center rounded-full bg-white text-black md:size-6">
                <Send className="size-2.5 md:size-3" />
              </span>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="relative hidden flex-1 items-center justify-center sm:flex">
          <Maximize2 className="absolute top-3 right-3 size-3 text-white/25" />
          <div className="flex flex-col items-center gap-4">
            <div className="bob flex size-[120px] items-center justify-center rounded-2xl bg-[#f8f7f3] p-2 shadow-2xl shadow-black/50 md:size-[168px]">
              <Image
                src={site.logo}
                alt=""
                width={168}
                height={168}
                sizes="(min-width: 768px) 168px, 120px"
                className="size-full object-contain"
              />
            </div>
            <span className="text-[9px] tracking-[0.3em] text-white/25 uppercase">
              {site.tagline}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="border-t border-white/[0.06]">
        <div className="flex h-8 items-center justify-between px-3 text-[10px] text-white/40 md:px-4">
          <span className="flex gap-3">
            <span>Learn</span>
            <span>Build</span>
            <span className="hidden sm:inline">Talk</span>
            <span className="hidden sm:inline">Meet</span>
          </span>
          <span className="tabular-nums">
            <span className="text-white/70">Week 01</span> | 16
          </span>
        </div>
        <div className="relative pb-3">
          <div className="ml-10 flex justify-between border-b border-white/[0.06] pr-3 pb-1 text-[9px] text-white/25 tabular-nums md:ml-12">
            {["Wk 1", "Wk 4", "Wk 8", "Wk 12", "Wk 16"].map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>
          <div className="mt-1.5 flex flex-col gap-1">
            {tracks.map((t) => (
              <div key={t.id} className="flex h-5 items-center md:h-6">
                <span className="w-10 shrink-0 pl-3 text-[9px] text-white/35 md:w-12 md:pl-4">
                  {t.id}
                </span>
                <div className="relative mr-3 h-full flex-1">
                  {t.clips.map((c) => (
                    <span
                      key={`${c.label}-${c.start}`}
                      className={`absolute inset-y-0 flex items-center overflow-hidden rounded-[4px] border px-1.5 text-[8.5px] whitespace-nowrap md:text-[9.5px] ${t.tone}`}
                      style={{ left: `${c.start}%`, width: `${c.width}%` }}
                    >
                      {c.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Playhead sweeps across the track area. */}
          <div className="pointer-events-none absolute top-0 right-3 bottom-0 left-10 md:left-12">
            <div className="playhead absolute inset-0">
              <span className="absolute top-0 bottom-0 left-0 w-px bg-white/80">
                <span className="absolute -top-0.5 -left-[3px] size-[7px] rotate-45 bg-white" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
