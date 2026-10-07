import { Download } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { liondevs } from "@/data/liondevs";

/** Event poster in a tilted card. Hidden until `poster` is set in src/data/liondevs.ts. */
export function Poster() {
  if (!liondevs.poster) return null;
  return (
    <section aria-labelledby="ld-poster" className="section-y overflow-hidden">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            tone="ld"
            id="ld-poster"
            eyebrow="Spread the word"
            title="Share the poster."
            lead="Download it, post it, and tag a future teammate."
          />
          <a
            href={liondevs.poster}
            download="liondevs-poster.png"
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-ld-gold to-ld-gold-light px-7 py-3.5 font-semibold text-ld-bg transition-transform hover:-translate-y-0.5"
          >
            <Download aria-hidden className="size-5" />
            Download poster
          </a>
        </div>
        <Reveal className="mx-auto w-full max-w-md">
          <div className="rotate-[-3deg] rounded-[1.5rem] border border-ld-gold/40 bg-ld-bg-2 p-3 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.02] motion-reduce:rotate-0">
            <Image
              src={liondevs.poster}
              alt="LionDevs poster: Innovation and Solutions Competition at Southeastern Louisiana University. Build. Solve. Pitch."
              width={1054}
              height={1492}
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="h-auto w-full rounded-[1.1rem]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
