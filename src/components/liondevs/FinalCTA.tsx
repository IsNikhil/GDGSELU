import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/ui/SocialIcons";
import { liondevs } from "@/data/liondevs";
import { CircuitCorner } from "./CircuitLines";
import { RegisterButton } from "./RegisterButton";

export function FinalCTA() {
  const [a, b, c] = liondevs.closingLine.split(". ");
  return (
    <section
      aria-labelledby="ld-final"
      className="section-y relative isolate overflow-hidden border-t border-ld-gold/15"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_50%_100%,rgb(47_107_85/0.5),transparent_70%)]"
      />
      <CircuitCorner
        corner="bl"
        draw={false}
        className="absolute bottom-0 left-0 w-40 opacity-60 sm:w-60"
      />
      <CircuitCorner
        corner="br"
        draw={false}
        className="absolute right-0 bottom-0 w-40 opacity-60 sm:w-60"
      />
      <Reveal className="container-site text-center">
        <h2
          id="ld-final"
          className="mx-auto max-w-4xl font-serif text-[length:var(--text-h1)] font-semibold text-ld-text"
        >
          {a}. {b}. <span className="text-gold-gradient">{c}</span>
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <RegisterButton />
          <SocialLinks tone="ld" />
        </div>
      </Reveal>
    </section>
  );
}
