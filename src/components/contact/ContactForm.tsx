"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { site } from "@/data/site";
import { cn, isTBD } from "@/lib/utils";

type Status = "idle" | "sending" | "done" | "error" | "too_soon";
type Errors = Partial<Record<"fullName" | "replyEmail" | "message", string>>;

const topics = [
  "General question",
  "LionDevs",
  "Sponsorship or partnership",
  "Speaking or mentoring",
  "Joining the board",
  "Other",
];

const field =
  "mt-2 block w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-foreground outline-none placeholder:text-subtle " +
  "transition-[border-color,box-shadow] focus:border-brand focus:ring-4 focus:ring-brand/10 " +
  "aria-[invalid=true]:border-[#c5221f]";
const label = "block text-[14px] font-semibold text-foreground";
const errorText = "mt-2 text-sm font-medium text-[#c5221f]";

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (String(data.get("fullName") ?? "").trim().length < 2)
    errors.fullName = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get("replyEmail") ?? "").trim()))
    errors.replyEmail = "Please enter a valid email so we can reply.";
  if (String(data.get("message") ?? "").trim().length < 10)
    errors.message = "Please write a little more (at least 10 characters).";
  return errors;
}

/**
 * Contact form. Posts to the same Google Apps Script as the LionDevs registration,
 * which saves the message to the "Messages" sheet and emails it to the chapter inbox.
 * Field names differ from the registration form on purpose (see the script).
 */
export function ContactForm() {
  const endpoint = site.formsEndpoint;
  const connected = !isTBD(endpoint);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const doneRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!connected || status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);

    // Spam trap: real people never fill in the hidden "website" field.
    if (String(data.get("website") ?? "")) {
      setStatus("done");
      return;
    }

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      requestAnimationFrame(() => document.getElementById(`contact-${first}`)?.focus());
      return;
    }

    const body = new URLSearchParams({ form: "contact" });
    for (const k of ["fullName", "replyEmail", "topic", "message"]) {
      body.set(k, String(data.get(k) ?? "").trim());
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", body });
      const json = (await res.json().catch(() => ({ ok: res.ok }))) as {
        ok?: boolean;
        error?: string;
      };
      if (json.error === "too_soon") {
        setStatus("too_soon");
        return;
      }
      if (!res.ok || json.ok === false) throw new Error("Request failed");
      setStatus("done");
      form.reset();
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
        className="rounded-3xl border border-line bg-white p-8 text-center outline-none sm:p-12"
      >
        <CheckCircle2 aria-hidden className="mx-auto size-12 text-brand" strokeWidth={1.5} />
        <h3 className="mt-5 text-3xl font-bold tracking-tight text-foreground">
          Message <span className="serif-italic font-normal">sent.</span>
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-[15px] text-muted">
          Thanks for reaching out. Someone from the board will reply to your email soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-line px-5 py-2 text-[14px] font-semibold text-foreground transition-colors hover:bg-black/[0.03]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="relative rounded-3xl border border-line bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-fullName" className={label}>
            Name
          </label>
          <input
            id="contact-fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "contact-fullName-error" : undefined}
            className={field}
          />
          {errors.fullName && (
            <p id="contact-fullName-error" className={errorText}>
              {errors.fullName}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-replyEmail" className={label}>
            Email
          </label>
          <input
            id="contact-replyEmail"
            name="replyEmail"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.replyEmail)}
            aria-describedby={errors.replyEmail ? "contact-replyEmail-error" : undefined}
            className={field}
          />
          {errors.replyEmail && (
            <p id="contact-replyEmail-error" className={errorText}>
              {errors.replyEmail}
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-topic" className={label}>
            Topic
          </label>
          <select id="contact-topic" name="topic" defaultValue={topics[0]} className={field}>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className={label}>
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            maxLength={5000}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={cn(field, "resize-y")}
          />
          {errors.message && (
            <p id="contact-message-error" className={errorText}>
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {/* Spam trap. Hidden from people and screen readers. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={!connected || status === "sending"}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-foreground px-7 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#222] hover:shadow-lg hover:shadow-black/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" && <Loader2 aria-hidden className="size-4 animate-spin" />}
          {status === "sending" ? "Sending" : "Send message"}
        </button>
        <p aria-live="polite" className="text-[13px] text-muted">
          {!connected && "The form is not connected yet."}
          {status === "too_soon" && (
            <span className="text-[#c5221f]">
              You just sent a message. Please wait a minute before sending another.
            </span>
          )}
          {status === "error" && (
            <span className="text-[#c5221f]">
              Something went wrong. Please try again, or email us at {site.contactEmail}.
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
