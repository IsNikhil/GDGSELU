import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Sky } from "@/components/ui/Sky";
import { techAreas } from "@/data/about";
import { liondevs } from "@/data/liondevs";
import { site } from "@/data/site";
import { joinHref } from "@/lib/links";
import { rise } from "@/lib/utils";
import { ChapterConsole } from "./ChapterConsole";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex flex-col items-center overflow-x-clip px-6 pt-16"
    >
      <Sky className="h-[85vh] min-h-[560px]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center pt-14 text-center md:pt-[4.5rem]">
        <h1 id="hero-title" className="rise mb-5" style={rise({ y: 30, blur: 6, delay: 0.35 })}>
          <span className="block text-[clamp(2.25rem,10.5vw,3rem)] leading-[0.95] font-extrabold tracking-[-0.03em] text-foreground md:text-[clamp(3rem,5vw,3.75rem)]">
            Where Lions learn
          </span>
          <span className="serif-italic block text-[clamp(2.25rem,10.5vw,3rem)] leading-[1.05] tracking-[-0.02em] text-foreground md:text-[clamp(3rem,5vw,3.75rem)]">
            to build.
          </span>
        </h1>

        <p
          className="rise mb-7 text-[15px] leading-[1.65] text-muted"
          style={rise({ y: 20, dur: 0.6, delay: 0.55 })}
        >
          <span className="block">
            {site.name} is the student-run Google Developer Group at Southeastern Louisiana
            University.
          </span>
          <span className="block">No experience needed. Just bring your curiosity.</span>
        </p>

        <div
          className="rise flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          style={rise({ y: 20, dur: 0.6, delay: 0.7 })}
        >
          <Button href={joinHref} className="w-full px-7 sm:w-auto">
            Join GDG Southeastern
          </Button>
          <Button href="/liondevs" variant="outline" className="w-full sm:w-auto">
            See LionDevs
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
            />
          </Button>
        </div>

        <p
          className="rise mt-5 text-[14px] text-muted"
          style={rise({ y: 12, dur: 0.6, delay: 0.8 })}
        >
          <Link href="/liondevs" className="transition-colors hover:text-foreground">
            <span className="font-bold text-foreground">{liondevs.name}</span> is coming.{" "}
            {liondevs.headline.join(" ")}
          </Link>
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-10 w-full max-w-5xl sm:px-4 md:mt-14 md:h-[125vh]">
        <div className="md:sticky md:top-24">
          <div className="rise relative" style={rise({ y: 60, scale: 0.96, dur: 1, delay: 0.9 })}>
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute top-1/3 left-1/2 h-[300px] w-[80%] -translate-x-1/2 rounded-full bg-brand opacity-[0.06] blur-[100px]" />
            </div>
            <ChapterConsole />
          </div>

          <div
            className="rise mt-6 flex flex-wrap items-center justify-center gap-2"
            style={rise({ y: 12, dur: 0.6, delay: 1.2 })}
          >
            <span className="mr-1 text-[12px] text-subtle">Technology we explore</span>
            <ul className="contents">
              {techAreas.map((t, i) => (
                <li
                  key={t}
                  className={
                    i === 0
                      ? "rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-[12px] font-medium text-brand"
                      : "rounded-full border border-line bg-white px-3 py-1 text-[12px] font-medium text-muted"
                  }
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
