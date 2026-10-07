import { techAreas } from "@/data/about";

const dots = ["bg-[#4285f4]", "bg-[#ea4335]", "bg-[#fbbc04]", "bg-[#34a853]"];

function Chip({ label, i }: { label: string; i: number }) {
  return (
    <li className="flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-surface px-5 py-2.5 text-base font-semibold whitespace-nowrap text-fg shadow-card">
      <span aria-hidden className={`size-2.5 rounded-full ${dots[i % dots.length]}`} />
      {label}
    </li>
  );
}

/** Slow infinite scroll of technology areas. Pauses on hover. Static list with reduced motion. */
export function TechMarquee() {
  return (
    <section aria-labelledby="tech-areas" className="py-[clamp(3rem,6vw,5rem)]">
      <div className="container-site">
        <h2
          id="tech-areas"
          className="text-center text-sm font-bold tracking-[0.22em] text-gold-text uppercase"
        >
          Technology we explore
        </h2>
      </div>
      <div className="marquee relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] motion-reduce:[mask-image:none]">
        <div className="marquee-track flex w-max gap-4 pr-4 motion-reduce:w-auto motion-reduce:justify-center">
          <ul className="flex gap-4 motion-reduce:container-site motion-reduce:flex-wrap motion-reduce:justify-center">
            {techAreas.map((t, i) => (
              <Chip key={t} label={t} i={i} />
            ))}
          </ul>
          {[0, 1, 2].map((copy) => (
            <ul key={copy} aria-hidden className="flex gap-4 motion-reduce:hidden">
              {techAreas.map((t, i) => (
                <Chip key={t} label={t} i={i} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
