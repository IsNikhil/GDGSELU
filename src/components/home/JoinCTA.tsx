import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { site } from "@/data/site";
import { joinHref } from "@/lib/links";

export function JoinCTA({
  title = "Ready to build",
  accent = "with us?",
  lead = "Join GDG Southeastern and follow us for workshops, talks, and LionDevs updates.",
}: {
  title?: string;
  accent?: string;
  lead?: string;
}) {
  return (
    <section aria-labelledby="join-cta" className="relative overflow-hidden px-6 py-24 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-brand/[0.03] to-transparent"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand opacity-[0.07] blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal blur={8} duration={0.7} className="mb-6">
          <h2 id="join-cta">
            <span className="block text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-foreground">
              {title}
            </span>
            <span className="serif-italic block text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-foreground">
              {accent}
            </span>
          </h2>
        </Reveal>
        <Reveal blur={8} delay={0.15} className="mb-12 text-[17px] leading-relaxed text-muted">
          <p>{lead}</p>
        </Reveal>
        <Reveal
          blur={8}
          delay={0.3}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            href={joinHref}
            size="lg"
            className="shadow-md shadow-brand/15 hover:shadow-brand/25"
          >
            Join GDG Southeastern
          </Button>
          <Button href={site.social.instagram} variant="outline">
            <InstagramIcon className="size-4" />
            Follow on Instagram
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
