// Re-mounts on every route change, so the CSS enter animation plays as a page transition.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
