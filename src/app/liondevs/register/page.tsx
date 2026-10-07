import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CircuitCorner } from "@/components/liondevs/CircuitLines";
import { RegistrationForm } from "@/components/liondevs/RegistrationForm";
import { liondevs } from "@/data/liondevs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Register for LionDevs",
  description:
    "Sign up for LionDevs, the Innovation & Solutions Competition at Southeastern Louisiana University. Get updates on dates, teams, and the challenge.",
  path: "/liondevs/register/",
  image: { url: liondevs.logo, width: 1254, height: 1254, alt: "LionDevs logo" },
});

export default function RegisterPage() {
  return (
    <section aria-labelledby="register-title" className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgb(47_107_85/0.5),transparent_70%)]"
      />
      <CircuitCorner corner="tl" className="absolute top-0 left-0 w-[clamp(6rem,18vw,14rem)]" />
      <CircuitCorner
        corner="tr"
        delay={0.3}
        className="absolute top-0 right-0 w-[clamp(6rem,18vw,14rem)]"
      />
      <div className="container-site max-w-4xl py-[clamp(3rem,7vw,6rem)]">
        <Link
          href="/liondevs"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ld-gold-light hover:underline"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Back to LionDevs
        </Link>
        <p className="mt-6 text-xs font-semibold tracking-[0.32em] text-ld-gold uppercase sm:text-sm">
          {liondevs.label}
        </p>
        <h1
          id="register-title"
          className="mt-3 font-serif text-[length:var(--text-h1)] font-semibold text-ld-text"
        >
          Register for <span className="text-gold-gradient">LionDevs</span>
        </h1>
        <p className="mt-4 max-w-2xl text-[length:var(--text-lead)] text-ld-muted">
          Sign up to save your spot on the list. We will email you when the date, team details, and
          challenge are announced. It takes about a minute.
        </p>
        <div className="mt-10">
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
}
