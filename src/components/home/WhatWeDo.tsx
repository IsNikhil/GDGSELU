import { Card } from "@/components/ui/Card";
import { GoogleColorIcon } from "@/components/ui/GoogleColorIcon";
import { RevealItem, Stagger } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whatWeDo } from "@/data/about";
import { getIcon } from "@/lib/icons";

const accents = {
  blue: "bg-[#4285f4]",
  red: "bg-[#ea4335]",
  yellow: "bg-[#fbbc04]",
  green: "bg-[#34a853]",
};

export function WhatWeDo({ headingLevel = "h2" }: { headingLevel?: "h2" }) {
  return (
    <section aria-labelledby="what-we-do" className="section-y">
      <div className="container-site">
        <SectionHeading
          as={headingLevel}
          id="what-we-do"
          eyebrow="What we do"
          title="Learn it. Build it. Share it."
          lead="Four simple ways to get involved. Come to one, or come to all of them."
        />
        <Stagger
          as="ul"
          className="mt-12 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,15.5rem),1fr))]"
        >
          {whatWeDo.map((item) => (
            <RevealItem as="li" key={item.title} className="flex">
              <Card className="flex w-full flex-col overflow-hidden">
                <span
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-1 ${accents[item.color]}`}
                />
                <GoogleColorIcon Icon={getIcon(item.icon)} color={item.color} />
                <h3 className="mt-5 text-xl font-bold text-fg">{item.title}</h3>
                <p className="mt-2 text-muted">{item.text}</p>
              </Card>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
