import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { liondevs } from "@/data/liondevs";

export function FAQ() {
  return (
    <section aria-labelledby="ld-faq" className="section-y">
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading tone="ld" id="ld-faq" eyebrow="FAQ" title="Questions? We have answers." />
        <Accordion items={liondevs.faqs} tone="ld" />
      </div>
    </section>
  );
}
