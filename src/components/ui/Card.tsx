import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  hover = true,
  ...props
}: ComponentProps<"div"> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        "relative rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-7",
        hover &&
          "transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-card-lg motion-reduce:hover:translate-y-0",
        className,
      )}
      {...props}
    />
  );
}
