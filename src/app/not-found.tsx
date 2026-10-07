import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";

export default function NotFound() {
  return (
    <PageHeader
      title="This lion wandered"
      accent="off the trail."
      lead="The page you are looking for is not here. Let us get you back to the pride."
    >
      <div className="flex flex-col items-center gap-6">
        <Button href="/">Back to home</Button>
        <p className="font-display text-[clamp(5rem,16vw,9rem)] leading-none font-extrabold tracking-tighter text-foreground/[0.08]">
          404
        </p>
      </div>
    </PageHeader>
  );
}
