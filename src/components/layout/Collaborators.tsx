import Image from "next/image";
import { partners, type Partner } from "@/data/partners";
import { Reveal } from "@/components/ui/Reveal";

function Mark({ p }: { p: Partner }) {
  const body = p.logo ? (
    <Image
      src={p.logo}
      alt={p.name}
      width={160}
      height={48}
      sizes="160px"
      className="h-9 w-auto object-contain grayscale transition duration-300 group-hover:grayscale-0"
    />
  ) : (
    <span className="font-display text-[19px] font-bold tracking-tight whitespace-nowrap text-foreground/45 transition-colors duration-300 group-hover:text-foreground md:text-[21px]">
      {p.name}
    </span>
  );
  const cls =
    "group flex h-20 shrink-0 items-center justify-center rounded-2xl border border-line bg-white px-8 transition-colors duration-300 hover:border-line-hover md:h-24 md:px-10";
  return p.url ? (
    <a href={p.url} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/** Endless, hover-to-pause slider of organizations we have worked with. */
export function Collaborators() {
  if (partners.length === 0) return null;
  // Repeat so one half of the track is always wider than the screen.
  const repeats = Math.max(2, Math.ceil(8 / partners.length));
  const half = Array.from({ length: repeats }, () => partners).flat();

  return (
    <section aria-labelledby="collaborators" className="overflow-hidden py-16 md:py-20">
      <Reveal blur={8} className="px-6 text-center">
        <h2
          id="collaborators"
          className="text-[13px] font-semibold tracking-wider text-subtle uppercase"
        >
          We have collaborated with
        </h2>
      </Reveal>
      <Reveal y={24} delay={0.1} className="mt-8">
        <div className="[mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="carousel-track flex w-max gap-4 pr-4">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
                inert={copy === 1}
                className="flex gap-4"
              >
                {half.map((p, i) => (
                  <li
                    key={`${p.name}-${i}`}
                    aria-hidden={copy === 0 && i >= partners.length ? true : undefined}
                  >
                    <Mark p={p} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
