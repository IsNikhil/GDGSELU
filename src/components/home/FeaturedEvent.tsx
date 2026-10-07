import { ArrowRight, CalendarDays, GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import { CircuitCorner } from "@/components/liondevs/CircuitLines";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { liondevs } from "@/data/liondevs";
import { formatDate, parseDate } from "@/lib/utils";

/** Dark green and gold LionDevs banner that breaks from the light page. */
export function FeaturedEvent({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const date = parseDate(liondevs.date);
  return (
    <Reveal>
      <article className="theme-liondevs relative isolate overflow-hidden rounded-[2rem] border border-ld-gold/30 bg-ld-bg text-ld-text shadow-card-lg">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_20%,rgb(47_107_85/0.55),transparent_60%)]"
        />
        <CircuitCorner
          corner="tl"
          draw={false}
          className="absolute top-0 left-0 w-40 opacity-50 sm:w-56"
        />
        <CircuitCorner
          corner="br"
          draw={false}
          className="absolute right-0 bottom-0 w-40 opacity-50 sm:w-56"
        />

        <div className="relative grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-12 lg:p-14">
          <div className="relative mx-auto w-full max-w-[18rem] lg:max-w-none">
            <div
              aria-hidden
              className="glow-pulse absolute inset-[12%] -z-10 rounded-full bg-[radial-gradient(circle,rgb(212_179_106/0.35),transparent_70%)]"
            />
            <Image
              src={liondevs.logo}
              alt="LionDevs logo: a gold and green lion head with circuit lines"
              width={1254}
              height={1254}
              sizes="(min-width: 1024px) 420px, 18rem"
              className="h-auto w-full rounded-3xl"
            />
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.28em] text-ld-gold uppercase sm:text-sm">
              Featured event
            </p>
            <H className="mt-3 font-serif text-[length:var(--text-h2)] font-semibold text-ld-text">
              {liondevs.headline.map((w, i) => (
                <span key={w} className={i === 1 ? "text-gold-gradient" : undefined}>
                  {w}{" "}
                </span>
              ))}
            </H>
            <p className="mt-2 text-sm font-semibold tracking-[0.2em] text-ld-gold-light uppercase">
              {liondevs.name}: {liondevs.label}
            </p>
            <p className="mt-5 max-w-xl text-[length:var(--text-lead)] text-ld-muted">
              {liondevs.description}
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ld-muted">
              <li className="flex items-center gap-2">
                <CalendarDays aria-hidden className="size-4 text-ld-gold" />
                {date
                  ? formatDate(date)
                  : liondevs.tentativeDate
                    ? `${liondevs.tentativeDate} (tentative)`
                    : "Date to be announced"}
              </li>
              <li className="flex items-center gap-2">
                <MapPin aria-hidden className="size-4 text-ld-gold" />
                Hammond, Louisiana
              </li>
              <li className="flex items-center gap-2">
                <GraduationCap aria-hidden className="size-4 text-ld-gold" />
                Open to students from any school
              </li>
            </ul>
            <Button href="/liondevs" variant="gold" size="lg" className="mt-8">
              Learn more
              <span className="sr-only"> about LionDevs</span>
              <ArrowRight
                aria-hidden
                className="size-5 transition-transform group-hover/btn:translate-x-1"
              />
            </Button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
