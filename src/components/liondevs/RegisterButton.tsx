import { ArrowRight } from "lucide-react";
import { Button, DisabledButton } from "@/components/ui/Button";
import { liondevs } from "@/data/liondevs";
import { isTBD } from "@/lib/utils";

export const registrationOpen = !isTBD(liondevs.registration.endpoint);

/** "Register" when the form is connected, otherwise a disabled "opens soon" state. */
export function RegisterButton({
  className,
  variant = "brand",
  size = "md",
}: {
  className?: string;
  variant?: "brand" | "outline" | "dark";
  size?: "md" | "lg";
}) {
  if (!registrationOpen) {
    return (
      <DisabledButton variant="outline" size={size} className={className}>
        Registration opens soon
      </DisabledButton>
    );
  }
  return (
    <Button
      href={liondevs.registration.pageUrl}
      variant={variant}
      size={size}
      className={className}
    >
      Register now
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
      />
    </Button>
  );
}
