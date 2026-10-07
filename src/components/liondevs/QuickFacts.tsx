import { Reveal } from "@/components/ui/Reveal";
import { liondevs } from "@/data/liondevs";
import { formatDate, parseDate } from "@/lib/utils";

export function QuickFacts() {
  const date = parseDate(liondevs.date);
  const facts = [
    {
      label: "Date",
      value: date
        ? formatDate(date)
        : liondevs.tentativeDate
          ? `${liondevs.tentativeDate} (tentative)`
          : "TBD",
    },
    { label: "Location", value: liondevs.location },
    { label: "Who can join", value: liondevs.eligibility },
    { label: "Format", value: `${liondevs.format}. ${liondevs.teamSize}.` },
  ];
  return (
    <section
      id="overview"
      aria-labelledby="ld-overview"
      className="scroll-mt-24 px-6 py-16 md:py-20"
    >
      <h2 id="ld-overview" className="sr-only">
        Quick facts
      </h2>
      <dl className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map(({ label, value }, i) => (
          <Reveal
            key={label}
            y={32}
            delay={i * 0.1}
            className="rounded-2xl border border-line bg-white p-6"
          >
            <dt className="text-[12px] text-subtle">{label}</dt>
            <dd className="mt-1.5 font-display text-[18px] leading-snug font-bold text-foreground">
              {value}
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
