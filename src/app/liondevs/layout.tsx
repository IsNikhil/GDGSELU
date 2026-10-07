import { ScrollProgress } from "@/components/liondevs/ScrollProgress";

/** LionDevs pages always use the dark green and gold theme. */
export default function LionDevsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-liondevs bg-ld-bg text-ld-text [color-scheme:dark]">
      <ScrollProgress />
      {children}
    </div>
  );
}
