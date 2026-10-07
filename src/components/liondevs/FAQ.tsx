import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { liondevs } from "@/data/liondevs";

export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="ld-faq"
      className="relative scroll-mt-24 px-6 py-20 md:py-28"
    >
      <div className="relative mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal blur={8} className="lg:col-span-4">
            <h2
              id="ld-faq"
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              Frequently asked questions
            </h2>
          </Reveal>
          <div className="lg:col-span-8">
            <Accordion items={liondevs.faqs} />
          </div>
        </div>
      </div>
    </section>
  );
}
