import { Home } from "lucide-react";
import { Brackets } from "@/components/ui/Brackets";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[70svh] flex-col items-center justify-center py-20 text-center">
      <Brackets className="w-24" />
      <p className="mt-8 text-[clamp(4rem,14vw,8rem)] leading-none font-bold tracking-tighter text-fg">
        404
      </p>
      <h1 className="mt-4 text-[length:var(--text-h2)] font-bold text-fg">
        This lion wandered off the trail.
      </h1>
      <p className="mt-3 max-w-md text-muted">
        The page you are looking for is not here. Let us get you back to the pride.
      </p>
      <Button href="/" size="lg" className="mt-8">
        <Home aria-hidden className="size-5" />
        Back to home
      </Button>
    </section>
  );
}
