import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RegisterButton } from "@/components/liondevs/RegisterButton";
import { Reveal } from "@/components/ui/Reveal";
import { liondevs } from "@/data/liondevs";
import { formatDate, parseDate } from "@/lib/utils";

/** LionDevs spotlight, laid out like the reference's creator case study panel. */
export function FeaturedEvent({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const date = parseDate(liondevs.date);
  const facts = [
    {
      label: "When",
      value: date ? formatDate(date) : liondevs.tentativeDate || "Date to be announced",
      note: date ? undefined : "tentative",
    },
    { label: "Where", value: "Hammond, Louisiana", note: liondevs.org },
    { label: "Who", value: "Any major, any school", note: liondevs.teamSize },
  ];

  return (
    <Reveal y={32}>
      <article className="rounded-[2rem] border border-line bg-surface p-5 sm:p-8 md:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={liondevs.logo}
              alt="LionDevs logo"
              width={56}
              height={56}
              sizes="128px"
              className="size-12 rounded-xl ring-1 ring-black/5 sm:size-14"
            />
            <div>
              <p className="font-display text-[17px] font-bold text-foreground">{liondevs.name}</p>
              <p className="text-[13px] text-muted">{liondevs.label}</p>
            </div>
          </div>
          <span className="rounded-full border border-line bg-white px-3 py-1 text-[12px] font-medium text-muted">
            Featured event
          </span>
        </div>

        <H className="mt-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {liondevs.headline.slice(0, -1).join(" ")}{" "}
          <span className="serif-italic">{liondevs.headline.at(-1)}</span>
        </H>

        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {facts.map((f) => (
            <li key={f.label} className="rounded-2xl border border-line bg-white p-5">
              <p className="text-[12px] text-subtle">{f.label}</p>
              <p className="mt-1 font-display text-[19px] leading-snug font-bold text-foreground">
                {f.value}
              </p>
              {f.note && <p className="mt-1 text-[12.5px] text-muted">{f.note}</p>}
            </li>
          ))}
        </ul>

        <div className="mt-3 rounded-2xl border border-line bg-white p-5">
          <p className="text-[12px] text-subtle">The competition</p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-foreground">
            {liondevs.description}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/liondevs"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-6 py-3 text-[14px] font-semibold text-white transition-all duration-200 hover:bg-[#222] hover:shadow-lg hover:shadow-black/10"
          >
            Learn more
            <span className="sr-only"> about LionDevs</span>
            <ArrowUpRight aria-hidden className="size-4" />
          </Link>
          <RegisterButton variant="outline" />
        </div>
      </article>
    </Reveal>
  );
}
