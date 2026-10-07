import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Brackets } from "@/components/ui/Brackets";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/data/about";

export function AboutPreview() {
  return (
    <section aria-labelledby="about-preview" className="section-y bg-bg-soft">
      <div className="container-site grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            id="about-preview"
            eyebrow="About us"
            title="A home for students who like to build."
          />
          <p className="mt-5 max-w-2xl text-[length:var(--text-lead)] text-muted">{about.short}</p>
          <Link
            href="/about"
            className="group mt-7 inline-flex min-h-11 items-center gap-2 font-semibold text-link underline-offset-4 hover:underline"
          >
            More about us
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
        <Reveal delay={0.1}>
          <figure className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 shadow-card sm:p-10">
            <Brackets className="w-20" />
            <blockquote className="mt-6 text-[length:var(--text-h3)] leading-snug font-semibold text-fg">
              You do not need to be a computer science major or have any experience.
            </blockquote>
            <figcaption className="mt-4 font-semibold text-gold-text">{about.belong}</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
