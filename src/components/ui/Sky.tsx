import { cn } from "@/lib/utils";

type Puff = { x: number; y: number; r: number };
type Cluster = { x: number; y: number; w: number; h: number; n: number; seed: number };

// Deterministic random numbers, so the server and every visit draw the same sky.
function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Cumulus shape: a flat-ish base with puffs piling up toward the middle. */
function puffs({ x, y, w, h, n, seed }: Cluster): Puff[] {
  const rand = rng(seed);
  const out: Puff[] = [];
  for (let i = 0; i < n; i++) {
    const u = rand();
    const px = x + u * w;
    const hump = Math.sin(u * Math.PI); // taller in the middle
    const py = y + h - rand() * h * (0.35 + 0.65 * hump);
    const r = (h * 0.22 + rand() * h * 0.3) * (0.55 + 0.45 * hump);
    out.push({ x: px, y: py, r });
  }
  return out;
}

// Masses hug the edges and the bottom, leaving the middle open for the headline.
const clusters: Cluster[] = [
  { x: -140, y: 70, w: 560, h: 330, n: 34, seed: 11 },
  { x: 1180, y: 40, w: 560, h: 340, n: 34, seed: 23 },
  { x: 330, y: 330, w: 220, h: 90, n: 10, seed: 5 },
  { x: 1090, y: 360, w: 240, h: 90, n: 10, seed: 9 },
  { x: -160, y: 560, w: 760, h: 330, n: 40, seed: 31 },
  { x: 1000, y: 540, w: 760, h: 340, n: 40, seed: 47 },
  { x: 420, y: 760, w: 760, h: 230, n: 30, seed: 59 },
];

const all = clusters.map(puffs);

function Layer({
  fill,
  dx = 0,
  dy = 0,
  scale = 1,
  opacity = 1,
}: {
  fill: string;
  dx?: number;
  dy?: number;
  scale?: number;
  opacity?: number;
}) {
  return (
    <g fill={fill} opacity={opacity}>
      {all.flat().map((p, i) => (
        <circle key={i} cx={p.x + dx} cy={p.y + dy} r={p.r * scale} />
      ))}
    </g>
  );
}

/**
 * Painterly sky drawn in SVG. Puffs are layered shadow, body, then a warm light,
 * and a low frequency displacement roughens the edges like brush strokes.
 * Fades into the page background at the bottom.
 */
export function Sky({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 top-0", className)}>
      <div className="absolute top-0 left-1/2 h-full w-full min-w-[110%] -translate-x-1/2 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMin slice" className="h-full w-full">
          <defs>
            <linearGradient id="sky-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7ea2d3" />
              <stop offset="0.35" stopColor="#a8c1e2" />
              <stop offset="0.7" stopColor="#d9e2ec" />
              <stop offset="1" stopColor="#f1efec" />
            </linearGradient>
            <filter id="sky-paint" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="4" />
              <feDisplacementMap
                in="SourceGraphic"
                scale="34"
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feGaussianBlur stdDeviation="2.2" />
            </filter>
            <filter id="sky-haze" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="28" />
            </filter>
          </defs>
          <rect width="1600" height="1000" fill="url(#sky-fill)" />
          {/* Soft halo so clouds melt into the sky. */}
          <g filter="url(#sky-haze)" opacity="0.7">
            <Layer fill="#f4f1ee" scale={1.15} />
          </g>
          <g filter="url(#sky-paint)">
            <Layer fill="#a3b5cf" dy={18} opacity={0.45} />
            <Layer fill="#c9d3e0" dy={10} />
            <Layer fill="#f9f8f6" />
            <Layer fill="#fff4e8" dx={-14} dy={-16} scale={0.62} opacity={0.9} />
          </g>
        </svg>
      </div>
      {/* Soft light pool behind the headline, as on the reference. */}
      <div
        className="absolute top-[45%] left-1/2 h-[60%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(245,243,240,0.65) 0%, rgba(245,243,240,0.3) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
