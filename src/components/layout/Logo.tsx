import Image from "next/image";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/** The GDG Southeastern logo on its original white tile. Never recolored or stretched. */
export function Logo({
  size = 44,
  className,
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-black/5",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={site.logo}
        alt="GDG Southeastern logo"
        width={size}
        height={size}
        sizes={`${size}px`}
        priority={priority}
        className="h-full w-full object-contain"
      />
    </span>
  );
}
