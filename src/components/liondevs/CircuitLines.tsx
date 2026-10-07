import { cn } from "@/lib/utils";

type Corner = "tl" | "tr" | "bl" | "br";

const flips: Record<Corner, string> = {
  tl: "",
  tr: "-scale-x-100",
  bl: "-scale-y-100",
  br: "-scale-100",
};

const paths = [
  "M0 40 H70 L110 80 V150",
  "M0 90 H40 L80 130 V230 L110 260",
  "M40 0 V30 L90 80 H170",
  "M120 0 V20 L160 60 H240",
];

const nodes: Array<[number, number]> = [
  [110, 150],
  [110, 260],
  [170, 80],
  [240, 60],
];

/**
 * Thin gold circuit traces with node circles, like the LionDevs poster corners.
 * `draw` animates the lines in with an SVG stroke animation.
 */
export function CircuitCorner({
  corner = "tl",
  draw = true,
  delay = 0,
  className,
}: {
  corner?: Corner;
  draw?: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 260 280"
      fill="none"
      className={cn("pointer-events-none text-ld-gold", flips[corner], className)}
    >
      {paths.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={draw ? "draw-path" : undefined}
          style={draw ? { animationDelay: `${delay + i * 0.18}s` } : undefined}
          opacity={0.75}
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="5"
          stroke="currentColor"
          strokeWidth="1.5"
          className={draw ? "fade-in" : undefined}
          style={draw ? { animationDelay: `${delay + 1.2 + i * 0.15}s` } : undefined}
        />
      ))}
    </svg>
  );
}
