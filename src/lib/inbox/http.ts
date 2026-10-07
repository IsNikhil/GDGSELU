// Server only. Shared guards and responses for the /api/inbox route handlers.

import { InboxConfigError } from "./config";
import { ResendError } from "./resend";
import { getSession } from "./session";

export const noStore = { "Cache-Control": "no-store" };

export function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: noStore });
}

/**
 * Rejects cross site POSTs. Cookies are SameSite=Strict already; this also requires
 * a JSON body and, when the browser sends one, a same origin Origin header.
 */
export function badPost(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "bad_request" }, 400);
  }
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json({ error: "forbidden" }, 403);
  }
  return null;
}

/** Runs the handler only for a signed in board member. */
export async function withSession(handler: (email: string) => Promise<Response>) {
  try {
    const email = await getSession();
    if (!email) return json({ error: "unauthorized" }, 401);
    return await handler(email);
  } catch (err) {
    return failure(err);
  }
}

export function failure(err: unknown) {
  if (err instanceof InboxConfigError) {
    console.error(err.message);
    return json({ error: "not_configured" }, 503);
  }
  if (err instanceof ResendError) {
    console.error(`Resend ${err.status}: ${err.message}`);
    return json({ error: "resend", message: err.message }, 502);
  }
  console.error(err);
  return json({ error: "server" }, 500);
}

export const EMAIL_RE = /^[^\s@<>,]+@[^\s@<>,]+\.[^\s@<>,]+$/;

export function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}
