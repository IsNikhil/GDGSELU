import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { team, type TeamMember } from "@/data/team";
import { initials, isTBD } from "@/lib/utils";

function Portrait({ m }: { m: TeamMember }) {
  return (
    <figure className="w-[200px] shrink-0 md:w-[232px]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-black/5">
        {m.photo ? (
          <Image
            src={m.photo}
            alt=""
            fill
            sizes="(min-width: 768px) 232px, 200px"
            className="object-cover"
            style={{ objectPosition: m.photoFocus }}
          />
        ) : (
          <span className="flex size-full items-center justify-center font-display text-4xl font-bold text-subtle">
            {initials(m.name)}
          </span>
        )}
      </div>
      <figcaption className="mt-3 px-1">
        <span className="block text-[14px] font-semibold text-foreground">{m.name}</span>
        <span className="block text-[13px] text-muted">{m.role}</span>
      </figcaption>
    </figure>
  );
}

/** Board members on a slow endless carousel that pauses on hover. */
export function TeamPreview() {
  const members = team.filter((m) => !isTBD(m.name));
  // Repeat so one half of the track is always wider than the screen.
  const half = Array.from(
    { length: Math.max(1, Math.ceil(12 / members.length)) },
    () => members,
  ).flat();

  return (
    <section aria-labelledby="team-preview" className="relative overflow-hidden py-20 md:py-28">
      <div className="px-6">
        <SectionHeading
          id="team-preview"
          title="The students"
          accent="behind the chapter."
          lead="The board that plans our events and keeps the community growing."
        />
      </div>

      <h3 className="sr-only">Board members</h3>
      <ul className="sr-only">
        {members.map((m) => (
          <li key={m.name}>
            {m.name}, {m.role}
          </li>
        ))}
      </ul>

      <Reveal y={32} className="mt-12 md:mt-14">
        <div
          aria-hidden
          className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
        >
          <div className="carousel-track flex w-max gap-4">
            {[0, 1].map((copy) => half.map((m, i) => <Portrait key={`${copy}-${i}`} m={m} />))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-10 text-center">
        <p className="text-[14px] text-muted">
          Want to say hello?{" "}
          <Link
            href="/team"
            className="group inline-flex items-center gap-1 font-semibold text-foreground"
          >
            Meet the team
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
