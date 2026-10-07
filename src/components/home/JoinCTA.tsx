import { ArrowRight } from "lucide-react";
import { Brackets } from "@/components/ui/Brackets";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/ui/SocialIcons";
import { joinHref } from "@/lib/links";

export function JoinCTA({ title = "Ready to build with us?" }: { title?: string }) {
  return (
    <section aria-labelledby="join-cta" className="section-y">
      <div className="container-site">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-14 text-center shadow-card-lg sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgb(66_133_244/0.14),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgb(52_168_83/0.14),transparent_55%)]"
            />
            <Brackets className="mx-auto w-20" />
            <h2
              id="join-cta"
              className="mx-auto mt-6 max-w-2xl text-[length:var(--text-h2)] font-bold text-fg"
            >
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[length:var(--text-lead)] text-muted">
              Join GDG Southeastern and follow us for workshops, talks, and LionDevs updates.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <Magnetic>
                <Button href={joinHref} size="lg">
                  Join GDG Southeastern
                  <ArrowRight
                    aria-hidden
                    className="size-5 transition-transform group-hover/btn:translate-x-1"
                  />
                </Button>
              </Magnetic>
              <SocialLinks />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
