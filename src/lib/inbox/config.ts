// Server only. Read by the /api/inbox route handlers, never imported by client code.
// All values come from environment variables (Vercel > Project > Settings > Environment
// Variables, or .env.local for local development). See docs/inbox-setup.md.

export class InboxConfigError extends Error {}

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new InboxConfigError(`Missing environment variable ${name}`);
  return value;
}

/** Full access Resend API key. Needed to read received email. */
export function resendKey() {
  return required("RESEND_API_KEY");
}

/** Sender for replies and login codes, e.g. "GDG Southeastern <info@gdgselu.com>". */
export function inboxFrom() {
  return required("INBOX_FROM");
}

/** Secret used to sign login codes and session cookies. At least 32 random characters. */
export function sessionSecret() {
  const secret = required("INBOX_SESSION_SECRET");
  if (secret.length < 32) {
    throw new InboxConfigError("INBOX_SESSION_SECRET must be at least 32 characters");
  }
  return secret;
}

/** Board members allowed to sign in, from a comma separated list. */
export function allowedEmails(): Set<string> {
  return new Set(
    (process.env.INBOX_ALLOWED_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isAllowed(email: string) {
  return allowedEmails().has(email.trim().toLowerCase());
}
