import { ArrowRight, Clock } from "lucide-react";
import { Button, DisabledButton } from "@/components/ui/Button";
import { liondevs } from "@/data/liondevs";
import { isTBD } from "@/lib/utils";

export const registrationOpen = !isTBD(liondevs.registration.endpoint);

/** "Register" when the form is connected, otherwise a disabled "opens soon" state. */
export function RegisterButton({ className }: { className?: string }) {
  if (!registrationOpen) {
    return (
      <DisabledButton className={className}>
        <Clock aria-hidden className="size-5" />
        Registration opens soon
      </DisabledButton>
    );
  }
  return (
    <Button href={liondevs.registration.pageUrl} variant="gold" size="lg" className={className}>
      Register now
      <ArrowRight
        aria-hidden
        className="size-5 transition-transform group-hover/btn:translate-x-1"
      />
    </Button>
  );
}
