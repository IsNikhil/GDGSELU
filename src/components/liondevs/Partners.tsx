import { Handshake, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RevealItem, Stagger, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { liondevs, type Person, type Sponsor } from "@/data/liondevs";
import { site } from "@/data/site";
import { initials, isTBD } from "@/lib/utils";

function PeopleBlock({ title, people }: { title: string; people: Person[] }) {
  if (people.length === 0) return null;
  return (
    <div className="mt-12">
      <h3 className="text-center text-sm font-bold tracking-[0.22em] text-ld-gold uppercase">
        {title}
      </h3>
      <Stagger
        as="ul"
        className="mt-6 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,13rem),1fr))]"
      >
        {people.map((p) => (
          <RevealItem
            as="li"
            key={p.name}
            className="rounded-3xl border border-ld-gold/20 bg-ld-bg-2/60 p-6 text-center"
          >
            <span className="mx-auto flex size-20 items-center justify-center overflow-hidden rounded-full border-[1.5px] border-ld-gold font-serif text-2xl text-ld-gold-light">
              {p.photo ? (
                <Image
                  src={p.photo}
                  alt=""
                  width={80}
                  height={80}
                  sizes="80px"
                  className="size-full object-cover"
                />
              ) : (
                initials(p.name)
              )}
            </span>
            <p className="mt-4 font-semibold text-ld-text">{p.name}</p>
            {p.title && <p className="text-sm text-ld-muted">{p.title}</p>}
          </RevealItem>
        ))}
      </Stagger>
    </div>
  );
}

function SponsorBlock({ sponsors }: { sponsors: Sponsor[] }) {
  if (sponsors.length === 0) return null;
  return (
    <div className="mt-12">
      <h3 className="text-center text-sm font-bold tracking-[0.22em] text-ld-gold uppercase">
        Sponsors
      </h3>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-6">
        {sponsors.map((s) => (
          <li
            key={s.name}
            className="flex min-h-20 min-w-40 items-center justify-center rounded-2xl border border-ld-gold/20 bg-ld-text/95 px-6 py-4"
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
              <span className="font-semibold text-ld-bg">{s.name}</span>
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
    <section aria-labelledby="ld-partners" className="section-y bg-ld-bg-2/40">
      <div className="container-site">
        <SectionHeading
          tone="ld"
          align="center"
          id="ld-partners"
          eyebrow="Mentors, judges, and sponsors"
          title="Built with our community."
        />
        <PeopleBlock title="Mentors" people={mentors} />
        <PeopleBlock title="Judges" people={judges} />
        <SponsorBlock sponsors={sponsors} />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="flex flex-col items-center gap-6 rounded-[1.75rem] border border-ld-gold/40 bg-gradient-to-br from-ld-bg-2 to-ld-bg p-8 text-center sm:flex-row sm:p-10 sm:text-left">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ld-gold text-ld-gold-light">
              <Handshake aria-hidden className="size-7" strokeWidth={1.6} />
            </span>
            <div className="flex-1">
              <p className="font-serif text-[length:var(--text-h3)] font-semibold text-ld-text">
                Want to sponsor or mentor?
              </p>
              <p className="mt-2 text-ld-muted">
                Help students build something real. We would love to hear from you.
              </p>
            </div>
            <Link
              href={contactHref}
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-ld-gold/70 px-6 font-semibold text-ld-gold-light transition-colors hover:bg-ld-gold/10"
            >
              <Mail aria-hidden className="size-4" />
              Contact us
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
