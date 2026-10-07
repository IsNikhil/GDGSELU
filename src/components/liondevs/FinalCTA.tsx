import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { liondevs } from "@/data/liondevs";
import { site } from "@/data/site";
import { RegisterButton } from "./RegisterButton";

export function FinalCTA() {
  // "Form your team. Create impact. Join LionDevs." -> two lines, last sentence in serif.
  const sentences = liondevs.closingLine.split(/(?<=\.)\s+/);
  const last = sentences.pop();
  return (
    <section aria-labelledby="ld-final" className="relative overflow-hidden px-6 py-24 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-brand/[0.03] to-transparent"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand opacity-[0.07] blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal blur={8} duration={0.7} className="mb-12">
          <h2 id="ld-final">
            <span className="block text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-foreground">
              {sentences.join(" ")}
            </span>
            <span className="serif-italic block text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-foreground">
              {last}
            </span>
          </h2>
        </Reveal>
        <Reveal
          blur={8}
          delay={0.3}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <RegisterButton size="lg" />
          <Button href={site.social.instagram} variant="outline">
            <InstagramIcon className="size-4" />
            Follow for updates
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
