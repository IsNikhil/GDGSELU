import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { RegistrationForm } from "@/components/liondevs/RegistrationForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
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
    <>
      <PageHeader
        title="Register for"
        accent="LionDevs."
        lead="Sign up to save your spot on the list. LionDevs is open to active students from any college or university, not just Southeastern. Compete solo or in a team of up to 3. We will email you when the date and challenge are announced. It takes about a minute."
      >
        <Link
          href="/liondevs"
          className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft
            aria-hidden
            className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          Back to LionDevs
        </Link>
      </PageHeader>
      <section aria-label="Registration form" className="px-4 pb-24 sm:px-6 md:pb-32">
        <Reveal y={40} className="mx-auto max-w-3xl">
          <RegistrationForm />
        </Reveal>
      </section>
    </>
  );
}
