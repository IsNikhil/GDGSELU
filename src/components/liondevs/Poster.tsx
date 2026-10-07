import { Download } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { liondevs } from "@/data/liondevs";

/** Event poster. Hidden until `poster` is set in src/data/liondevs.ts. */
export function Poster() {
  if (!liondevs.poster) return null;
  return (
    <section aria-labelledby="ld-poster" className="overflow-hidden px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
        <Reveal blur={8}>
          <h2
            id="ld-poster"
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Share <span className="serif-italic">the poster.</span>
          </h2>
          <p className="mt-5 text-[16px] text-muted">
            Download it, post it, and tag a future teammate.
          </p>
          <a
            href={liondevs.poster}
            download="liondevs-poster.png"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#222]"
          >
            <Download aria-hidden className="size-4" />
            Download poster
          </a>
        </Reveal>
        <Reveal y={60} className="mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-line bg-white p-3 shadow-lg shadow-black/10">
            <Image
              src={liondevs.poster}
              alt="LionDevs poster: Innovation and Solutions Competition at Southeastern Louisiana University. Build. Solve. Pitch."
              width={1054}
              height={1492}
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="h-auto w-full rounded-xl"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
