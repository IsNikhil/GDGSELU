import { RevealItem, Stagger } from "@/components/ui/Reveal";
import { team } from "@/data/team";
import { isTBD } from "@/lib/utils";
import { TeamCard } from "./TeamCard";

/** Board members from src/data/team.ts. Members named "TBD" are hidden. */
export function TeamGrid() {
  const members = team.filter((m) => !isTBD(m.name));
  return (
    <Stagger
      as="ul"
      className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,16rem),1fr))]"
    >
      {members.map((m) => (
        <RevealItem as="li" key={m.name}>
          <TeamCard member={m} />
        </RevealItem>
      ))}
    </Stagger>
  );
}
