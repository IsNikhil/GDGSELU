import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type GColor = "blue" | "red" | "yellow" | "green";

// Darker shades keep icons at 3:1 or better against their tinted circles.
const styles: Record<GColor, string> = {
  blue: "bg-[#4285f4]/12 text-[#1a73e8] dark:text-[#8ab4f8]",
  red: "bg-[#ea4335]/12 text-[#c5221f] dark:text-[#f28b82]",
  yellow: "bg-[#fbbc04]/18 text-[#b06000] dark:text-[#fdd663]",
  green: "bg-[#34a853]/12 text-[#188038] dark:text-[#81c995]",
};

export function GoogleColorIcon({
  Icon,
  color,
  className,
}: {
  Icon: LucideIcon;
  color: GColor;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-12 items-center justify-center rounded-2xl",
        styles[color],
        className,
      )}
    >
      <Icon aria-hidden className="size-6" />
    </span>
  );
}
