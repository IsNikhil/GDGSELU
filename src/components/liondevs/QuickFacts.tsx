import { CalendarDays, GraduationCap, MapPin, Users } from "lucide-react";
import { RevealItem, Stagger } from "@/components/ui/Reveal";
import { liondevs } from "@/data/liondevs";
import { formatDate, parseDate } from "@/lib/utils";

export function QuickFacts() {
  const date = parseDate(liondevs.date);
  const facts = [
    {
      Icon: CalendarDays,
      label: "Date",
      value: date
        ? formatDate(date)
        : liondevs.tentativeDate
          ? `${liondevs.tentativeDate} (tentative)`
          : "TBD",
    },
    { Icon: MapPin, label: "Location", value: liondevs.location },
    { Icon: GraduationCap, label: "Who can join", value: liondevs.eligibility },
    { Icon: Users, label: "Format", value: `${liondevs.format}. ${liondevs.teamSize}.` },
  ];
  return (
    <section
      id="overview"
      aria-label="Quick facts"
      className="relative border-y border-ld-gold/15 bg-ld-bg-2/60"
    >
      <Stagger
        as="dl"
        className="container-site grid gap-px py-2 [grid-template-columns:repeat(auto-fit,minmax(min(100%,14rem),1fr))]"
      >
        {facts.map(({ Icon, label, value }) => (
          <RevealItem key={label} className="relative py-6 pr-2 pl-[4.5rem] sm:pr-4 sm:pl-20">
            <dt className="text-xs font-bold tracking-[0.2em] text-ld-gold uppercase">
              <span className="absolute top-6 left-2 flex size-11 items-center justify-center rounded-full border border-ld-gold/60 sm:left-4">
                <Icon aria-hidden className="size-5" />
              </span>
              {label}
            </dt>
            <dd className="mt-1 text-ld-text">{value}</dd>
          </RevealItem>
        ))}
      </Stagger>
    </section>
  );
}
