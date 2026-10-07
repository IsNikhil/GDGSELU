"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { SocialLinks } from "@/components/ui/SocialIcons";
import { liondevs } from "@/data/liondevs";
import { site } from "@/data/site";
import { cn, isTBD } from "@/lib/utils";

type Status = "idle" | "sending" | "done" | "error";
type Errors = Partial<Record<"name" | "email" | "school" | "major" | "team" | "student", string>>;

const years = ["Freshman", "Sophomore", "Junior", "Senior", "Graduate student", "Other"];
const teamOptions = [
  { value: "have-team", label: "I already have a team (up to 3)" },
  { value: "solo", label: "I am competing alone" },
  { value: "not-sure", label: "Not sure yet" },
];
const interestOptions = [
  "Coding and building",
  "Design",
  "Business and pitching",
  "Research and problem solving",
];
const heardOptions = [
  "Instagram",
  "LinkedIn",
  "A friend",
  "Class or professor",
  "Flyer or poster",
  "Other",
];

const field =
  "mt-2 block w-full min-h-12 rounded-xl border border-ld-gold/30 bg-ld-bg px-4 py-3 text-ld-text placeholder:text-ld-muted/70 " +
  "transition-colors focus:border-ld-gold-light focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ld-gold-light " +
  "aria-[invalid=true]:border-[#f28b82]";
const label = "block font-semibold text-ld-text";
const hint = "mt-1 text-sm text-ld-muted";
const errorText = "mt-2 text-sm font-medium text-[#f6aea9]";

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  if (name.length < 2) errors.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Please enter a valid email address.";
  if (!String(data.get("school") ?? "").trim()) errors.school = "Please enter your school name.";
  if (!String(data.get("major") ?? "").trim()) errors.major = "Please enter your major.";
  if (!data.get("team")) errors.team = "Please choose one option.";
  if (!data.get("student"))
    errors.student = "LionDevs is for active students. Please confirm you are one.";
  return errors;
}

/**
 * LionDevs interest and registration form.
 * Sends the answers to a Google Apps Script web app that saves them to a Google Sheet.
 * Setup steps: docs/registration-setup.md
 */
export function RegistrationForm() {
  const endpoint = liondevs.registration.endpoint;
  const connected = !isTBD(endpoint);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [team, setTeam] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!connected || status === "sending") return;
    const data = new FormData(e.currentTarget);

    // Spam trap: real people never fill in the hidden "website" field.
    if (String(data.get("website") ?? "")) {
      setStatus("done");
      return;
    }

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    const body = new URLSearchParams();
    for (const [k, v] of data.entries()) {
      if (k === "website") continue;
      body.append(k, String(v));
    }
    body.set("interests", data.getAll("interests").join(", "));
    body.set("consent", data.get("consent") ? "yes" : "no");
    body.set("student", data.get("student") ? "yes" : "no");

    setStatus("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", body });
      const json = (await res.json().catch(() => ({ ok: res.ok }))) as { ok?: boolean };
      if (!res.ok || json.ok === false) throw new Error("Request failed");
      setStatus("done");
      formRef.current?.reset();
      requestAnimationFrame(() => doneRef.current?.focus());
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        ref={doneRef}
        tabIndex={-1}
        role="status"
        className="rounded-[1.75rem] border border-ld-gold/50 bg-ld-bg-2 p-8 text-center outline-none sm:p-12"
      >
        <CheckCircle2
          aria-hidden
          className="mx-auto size-14 text-ld-gold-light"
          strokeWidth={1.5}
        />
        <h2 className="mt-5 font-serif text-[length:var(--text-h2)] font-semibold text-ld-text">
          You are on the list!
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ld-muted">
          Thanks for signing up for LionDevs. We will email you as soon as the date, team details,
          and challenge are announced.
        </p>
        <p className="mt-6 font-semibold text-ld-text">
          While you wait, join the chapter and follow along:
        </p>
        <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={site.joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full bg-gradient-to-r from-ld-gold to-ld-gold-light px-6 font-semibold text-ld-bg"
          >
            Join GDG Southeastern
          </a>
          <SocialLinks tone="ld" />
        </div>
      </div>
    );
  }

  const errorList = Object.entries(errors);

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-describedby="form-note"
      className="relative rounded-[1.75rem] border border-ld-gold/30 bg-ld-bg-2/70 p-6 sm:p-10"
    >
      <p id="form-note" className="text-sm text-ld-muted">
        Fields marked{" "}
        <span aria-hidden className="text-ld-gold-light">
          *
        </span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      {errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mt-5 rounded-xl border border-[#f28b82]/60 bg-[#f28b82]/10 p-4 outline-none"
        >
          <p className="font-semibold text-ld-text">
            Please fix {errorList.length === 1 ? "this" : "these"}:
          </p>
          <ul className="mt-2 list-disc pl-5 text-sm text-[#f6aea9]">
            {errorList.map(([k, msg]) => (
              <li key={k}>
                <a href={`#reg-${k}`} className="underline underline-offset-2">
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-name" className={label}>
            Full name{" "}
            <span aria-hidden className="text-ld-gold-light">
              *
            </span>
          </label>
          <input
            id="reg-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "reg-name-error" : undefined}
            className={field}
          />
          {errors.name && (
            <p id="reg-name-error" className={errorText}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="reg-email" className={label}>
            Email{" "}
            <span aria-hidden className="text-ld-gold-light">
              *
            </span>
          </label>
          <input
            id="reg-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={`reg-email-hint${errors.email ? " reg-email-error" : ""}`}
            className={field}
          />
          <p id="reg-email-hint" className={hint}>
            Use the email you check most. Event updates go here.
          </p>
          {errors.email && (
            <p id="reg-email-error" className={errorText}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="reg-school" className={label}>
            School name{" "}
            <span aria-hidden className="text-ld-gold-light">
              *
            </span>
          </label>
          <input
            id="reg-school"
            name="school"
            type="text"
            autoComplete="organization"
            required
            aria-invalid={Boolean(errors.school)}
            aria-describedby={`reg-school-hint${errors.school ? " reg-school-error" : ""}`}
            className={field}
          />
          <p id="reg-school-hint" className={hint}>
            Students from any college or university can join.
          </p>
          {errors.school && (
            <p id="reg-school-error" className={errorText}>
              {errors.school}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="reg-advisor" className={label}>
            Advisor name
          </label>
          <input
            id="reg-advisor"
            name="advisor"
            type="text"
            aria-describedby="reg-advisor-hint"
            className={field}
          />
          <p id="reg-advisor-hint" className={hint}>
            Faculty advisor or mentor, if you have one.
          </p>
        </div>

        <div>
          <label htmlFor="reg-major" className={label}>
            Major{" "}
            <span aria-hidden className="text-ld-gold-light">
              *
            </span>
          </label>
          <input
            id="reg-major"
            name="major"
            type="text"
            required
            aria-invalid={Boolean(errors.major)}
            aria-describedby={errors.major ? "reg-major-error" : undefined}
            className={field}
          />
          {errors.major && (
            <p id="reg-major-error" className={errorText}>
              {errors.major}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="reg-year" className={label}>
            Year
          </label>
          <select id="reg-year" name="year" defaultValue="" className={field}>
            <option value="">Choose one</option>
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <fieldset
        id="reg-team"
        tabIndex={-1}
        className="mt-8 outline-none"
        aria-invalid={Boolean(errors.team)}
        aria-describedby={errors.team ? "reg-team-error" : undefined}
      >
        <legend className={label}>
          Do you have a team?{" "}
          <span aria-hidden className="text-ld-gold-light">
            *
          </span>
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {teamOptions.map((o) => (
            <label
              key={o.value}
              className={cn(
                "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-ld-text transition-colors",
                team === o.value
                  ? "border-ld-gold bg-ld-gold/10"
                  : "border-ld-gold/25 hover:border-ld-gold/50",
              )}
            >
              <input
                type="radio"
                name="team"
                value={o.value}
                required
                onChange={() => setTeam(o.value)}
                className="size-5 shrink-0 accent-[#d4b36a]"
              />
              {o.label}
            </label>
          ))}
        </div>
        {errors.team && (
          <p id="reg-team-error" className={errorText}>
            {errors.team}
          </p>
        )}
      </fieldset>

      {team === "have-team" && (
        <div className="mt-6">
          <label htmlFor="reg-teamname" className={label}>
            Team name or teammates
          </label>
          <input id="reg-teamname" name="teamName" type="text" className={field} />
        </div>
      )}

      <fieldset className="mt-8">
        <legend className={label}>What would you like to work on?</legend>
        <p className={hint}>Pick any that fit.</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {interestOptions.map((o) => (
            <label
              key={o}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-ld-gold/25 px-4 py-3 text-ld-text hover:border-ld-gold/50 has-[:checked]:border-ld-gold has-[:checked]:bg-ld-gold/10"
            >
              <input
                type="checkbox"
                name="interests"
                value={o}
                className="size-5 shrink-0 accent-[#d4b36a]"
              />
              {o}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-heard" className={label}>
            How did you hear about LionDevs?
          </label>
          <select id="reg-heard" name="heardFrom" defaultValue="" className={field}>
            <option value="">Choose one</option>
            {heardOptions.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="reg-questions" className={label}>
            Questions or ideas?
          </label>
          <textarea
            id="reg-questions"
            name="questions"
            rows={4}
            className={cn(field, "resize-y")}
          />
        </div>
      </div>

      {/* Spam trap. Hidden from people and screen readers. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="reg-website">Website</label>
        <input id="reg-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-8">
        <label
          htmlFor="reg-student"
          className="flex cursor-pointer items-start gap-3 rounded-xl border border-ld-gold/25 p-4 text-ld-text"
        >
          <input
            id="reg-student"
            type="checkbox"
            name="student"
            value="yes"
            required
            aria-invalid={Boolean(errors.student)}
            aria-describedby={errors.student ? "reg-student-error" : undefined}
            className="mt-0.5 size-5 shrink-0 accent-[#d4b36a]"
          />
          <span>
            I am an active student.{" "}
            <span aria-hidden className="text-ld-gold-light">
              *
            </span>
          </span>
        </label>
        {errors.student && (
          <p id="reg-student-error" className={errorText}>
            {errors.student}
          </p>
        )}
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-ld-gold/25 p-4 text-ld-text">
        <input
          type="checkbox"
          name="consent"
          value="yes"
          className="mt-0.5 size-5 shrink-0 accent-[#d4b36a]"
        />
        <span>
          Yes, email me LionDevs updates and GDG Southeastern news.
          <span className="mt-1 block text-sm text-ld-muted">You can unsubscribe at any time.</span>
        </span>
      </label>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={!connected || status === "sending"}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ld-gold to-ld-gold-light px-8 font-semibold text-ld-bg shadow-[0_8px_28px_-8px_rgb(212_179_106/0.6)] transition-transform hover:-translate-y-0.5 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === "sending" && <Loader2 aria-hidden className="size-5 animate-spin" />}
          {!connected
            ? "Registration opens soon"
            : status === "sending"
              ? "Sending"
              : "Count me in"}
        </button>
        <p aria-live="polite" className="text-sm text-ld-muted">
          {!connected && "The form is not open yet. Follow us for the launch."}
          {status === "error" && (
            <span className="text-[#f6aea9]">
              Something went wrong. Please try again in a moment, or message us on Instagram.
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
