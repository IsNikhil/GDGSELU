// Server only. Thin wrapper around the Resend REST API.
// Docs: https://resend.com/docs/api-reference/emails/list-received-emails

import { resendKey } from "./config";

const API = "https://api.resend.com";

export class ResendError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${resendKey()}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });
  const body = (await res.json().catch(() => ({}))) as { message?: string };
  if (!res.ok) throw new ResendError(res.status, body.message ?? `Resend error ${res.status}`);
  return body as T;
}

export type Attachment = {
  id?: string;
  filename: string;
  content_type: string;
  size?: number;
};

export type ReceivedSummary = {
  id: string;
  from: string;
  to: string[];
  subject: string;
  created_at: string;
  cc?: string[] | null;
  reply_to?: string[] | null;
  message_id?: string | null;
  attachments?: Attachment[];
};

export type ReceivedEmail = ReceivedSummary & {
  html?: string | null;
  text?: string | null;
  headers?: Record<string, string> | null;
};

export function listReceived(opts: { limit?: number; after?: string }) {
  const q = new URLSearchParams({ limit: String(opts.limit ?? 30) });
  if (opts.after) q.set("after", opts.after);
  return call<{ data: ReceivedSummary[]; has_more: boolean }>(`/emails/receiving?${q}`);
}

export function getReceived(id: string) {
  return call<ReceivedEmail>(`/emails/receiving/${encodeURIComponent(id)}`);
}

export function sendEmail(msg: {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  headers?: Record<string, string>;
}) {
  return call<{ id: string }>("/emails", {
    method: "POST",
    body: JSON.stringify({
      from: msg.from,
      to: msg.to,
      subject: msg.subject,
      text: msg.text,
      html: msg.html,
      reply_to: msg.replyTo,
      headers: msg.headers,
    }),
  });
}
