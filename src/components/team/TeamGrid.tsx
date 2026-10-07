import { Reveal } from "@/components/ui/Reveal";
import { team } from "@/data/team";
import { isTBD } from "@/lib/utils";
import { TeamCard } from "./TeamCard";

/** Board members from src/data/team.ts. Members named "TBD" are hidden. */
export function TeamGrid() {
  const members = team.filter((m) => !isTBD(m.name));
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((m, i) => (
        <Reveal as="li" key={m.name} y={32} delay={i * 0.1}>
          <TeamCard member={m} />
        </Reveal>
      ))}
    </ul>
  );
}
