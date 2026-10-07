import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { site } from "@/data/site";
import { joinHref } from "@/lib/links";

/** Soft Google colored blobs and floating brackets. Transform only animation. */
function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="blob-a absolute -top-[18%] -left-[12%] size-[min(70vw,560px)] rounded-full bg-[radial-gradient(circle,rgb(66_133_244/0.22),transparent_65%)]" />
      <div className="blob-b absolute top-[8%] -right-[14%] size-[min(65vw,520px)] rounded-full bg-[radial-gradient(circle,rgb(52_168_83/0.18),transparent_65%)]" />
      <div className="blob-b absolute -bottom-[22%] left-[18%] size-[min(60vw,480px)] rounded-full bg-[radial-gradient(circle,rgb(251_188_4/0.18),transparent_65%)]" />
      <div className="blob-a absolute right-[22%] -bottom-[18%] size-[min(50vw,400px)] rounded-full bg-[radial-gradient(circle,rgb(234_67_53/0.14),transparent_65%)]" />
      {/* Fine dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,color-mix(in_srgb,var(--text)_12%,transparent)_1px,transparent_0)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
    </div>
  );
}

function FloatingBracket({ side, className }: { side: "left" | "right"; className?: string }) {
  const [a, b] =
    side === "left" ? ["var(--g-red)", "var(--g-blue)"] : ["var(--g-green)", "var(--g-yellow)"];
  const d = side === "left" ? ["M30 6 L8 24", "M8 24 L30 42"] : ["M10 6 L32 24", "M32 24 L10 42"];
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 48"
      fill="none"
      strokeWidth="8"
      strokeLinecap="round"
      className={className}
    >
      <path d={d[0]} stroke={a} />
      <path d={d[1]} stroke={b} />
    </svg>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <HeroBackground />
      <div className="container-site grid items-center gap-12 pt-[clamp(2.5rem,7vw,5.5rem)] pb-[clamp(4rem,9vw,7rem)] lg:grid-cols-[1.25fr_1fr]">
        <div>
          <p className="rise-in inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-1.5 text-sm font-semibold text-fg shadow-card backdrop-blur">
            <Sparkles aria-hidden className="size-4 text-[#b06000] dark:text-[#fdd663]" />
            {site.tagline}
          </p>
          <h1
            id="hero-title"
            className="rise-in mt-6 text-[length:var(--text-display)] leading-[1.02] font-bold tracking-[-0.035em] text-fg [animation-delay:80ms]"
          >
            Where Lions learn to{" "}
            <span className="relative whitespace-nowrap text-[#1a73e8] dark:text-[#8ab4f8]">
              <span aria-hidden className="text-[#c5221f] dark:text-[#f28b82]">
                &lt;
              </span>
              build
              <span aria-hidden className="text-[#188038] dark:text-[#81c995]">
                /&gt;
              </span>
            </span>
          </h1>
          <p className="rise-in mt-6 max-w-xl text-[length:var(--text-lead)] text-muted [animation-delay:160ms]">
            {site.name} is the student-run Google Developer Group at Southeastern Louisiana
            University. No experience needed. Just bring your curiosity.
          </p>
          <div className="rise-in mt-9 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row sm:items-center">
            <Magnetic>
              <Button href={joinHref} size="lg" className="w-full sm:w-auto">
                Join GDG Southeastern
                <ArrowRight
                  aria-hidden
                  className="size-5 transition-transform group-hover/btn:translate-x-1"
                />
              </Button>
            </Magnetic>
            <Button href="/liondevs" variant="secondary" size="lg">
              <span aria-hidden className="size-2 rounded-full bg-[#d4af6a]" />
              See LionDevs
            </Button>
          </div>
        </div>

        <div className="fade-in relative mx-auto w-full max-w-[min(100%,380px)] [animation-delay:200ms] lg:max-w-[420px]">
          <FloatingBracket
            side="left"
            className="animate-float absolute top-[8%] -left-[6%] w-[16%] [animation-delay:-2s]"
          />
          <FloatingBracket
            side="right"
            className="animate-float absolute -right-[4%] bottom-[10%] w-[16%] [animation-delay:-4s]"
          />
          <div className="relative aspect-square rounded-[2.5rem] border border-line bg-white p-[8%] shadow-card-lg">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 translate-y-4 scale-95 rounded-[2.5rem] bg-[conic-gradient(from_180deg,#4285f4,#34a853,#fbbc04,#ea4335,#4285f4)] opacity-40 blur-2xl"
            />
            <Image
              src={site.logo}
              alt="GDG Southeastern logo: a lion head between Google colored brackets"
              width={200}
              height={200}
              priority
              sizes="(min-width: 1024px) 360px, 80vw"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
