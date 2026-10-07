import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { liondevs, type Person, type Sponsor } from "@/data/liondevs";
import { site } from "@/data/site";
import { initials, isTBD } from "@/lib/utils";

function PeopleBlock({ title, people }: { title: string; people: Person[] }) {
  if (people.length === 0) return null;
  return (
    <div className="mt-12">
      <h3 className="mb-6 text-center text-[13px] font-bold tracking-wider text-foreground uppercase">
        {title}
      </h3>
      <ul className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,13rem),1fr))]">
        {people.map((p, i) => (
          <Reveal
            as="li"
            key={p.name}
            y={32}
            delay={i * 0.08}
            className="rounded-2xl border border-line bg-white p-6 text-center"
          >
            <span className="mx-auto flex size-16 items-center justify-center overflow-hidden rounded-full bg-surface font-display text-xl font-bold text-subtle">
              {p.photo ? (
                <Image
                  src={p.photo}
                  alt=""
                  width={64}
                  height={64}
                  sizes="64px"
                  className="size-full object-cover"
                />
              ) : (
                initials(p.name)
              )}
            </span>
            <p className="mt-4 font-semibold text-foreground">{p.name}</p>
            {p.title && <p className="text-[13px] text-muted">{p.title}</p>}
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

function SponsorBlock({ sponsors }: { sponsors: Sponsor[] }) {
  if (sponsors.length === 0) return null;
  return (
    <div className="mt-12">
      <h3 className="mb-6 text-center text-[13px] font-bold tracking-wider text-foreground uppercase">
        Sponsors
      </h3>
      <ul className="flex flex-wrap items-center justify-center gap-4">
        {sponsors.map((s) => (
          <li
            key={s.name}
            className="flex min-h-20 min-w-40 items-center justify-center rounded-2xl border border-line bg-white px-6 py-4"
          >
            {s.logo ? (
              <Image
                src={s.logo}
                alt={s.name}
                width={160}
                height={60}
                sizes="160px"
                className="h-12 w-auto object-contain"
              />
            ) : (
              <span className="font-semibold text-foreground">{s.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Mentors, judges, and sponsors. Each block hides itself while its list is empty. */
export function Partners() {
  const { mentors, judges, sponsors } = liondevs;
  const contactHref = isTBD(site.contactEmail) ? "/contact" : `mailto:${site.contactEmail}`;
  return (
    <section aria-labelledby="ld-partners" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading id="ld-partners" title="Built with" accent="our community." />
        <PeopleBlock title="Mentors" people={mentors} />
        <PeopleBlock title="Judges" people={judges} />
        <SponsorBlock sponsors={sponsors} />

        <Reveal y={32} className="mx-auto mt-12 max-w-3xl">
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-line bg-white p-8 text-center sm:flex-row sm:p-10 sm:text-left">
            <div className="flex-1">
              <p className="font-display text-2xl font-bold text-foreground">
                Want to sponsor <span className="serif-italic font-normal">or mentor?</span>
              </p>
              <p className="mt-2 text-[15px] text-muted">
                Help students build something real. We would love to hear from you.
              </p>
            </div>
            <Link
              href={contactHref}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-[14px] font-semibold text-white transition-all duration-200 hover:bg-[#222] hover:shadow-lg hover:shadow-black/10"
            >
              Contact us
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
