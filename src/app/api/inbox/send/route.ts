import { inboxFrom } from "@/lib/inbox/config";
import { EMAIL_RE, badPost, escapeHtml, json, withSession } from "@/lib/inbox/http";
import { sendEmail } from "@/lib/inbox/resend";

type Body = {
  to?: string;
  subject?: string;
  text?: string;
  inReplyTo?: string | null;
};

/** Sends a new email or a reply from the chapter address (INBOX_FROM). */
export async function POST(request: Request) {
  const bad = badPost(request);
  if (bad) return bad;
  return withSession(async (sender) => {
    const body = (await request.json().catch(() => ({}))) as Body;
    const to = String(body.to ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const subject = String(body.subject ?? "")
      .trim()
      .slice(0, 300);
    const text = String(body.text ?? "")
      .trim()
      .slice(0, 50_000);
    if (to.length === 0 || to.length > 20 || !to.every((t) => EMAIL_RE.test(t))) {
      return json({ error: "invalid_to" }, 400);
    }
    if (!subject || !text) return json({ error: "empty" }, 400);

    const headers: Record<string, string> = {};
    const ref = String(body.inReplyTo ?? "").trim();
    if (/^<[^<>\s]+>$/.test(ref)) {
      headers["In-Reply-To"] = ref;
      headers.References = ref;
    }

    const sent = await sendEmail({
      from: inboxFrom(),
      to,
      subject,
      text,
      html: `<div style="white-space:pre-wrap;font-family:sans-serif">${escapeHtml(text)}</div>`,
      headers: Object.keys(headers).length ? headers : undefined,
    });
    console.log(`Inbox email ${sent.id} sent by ${sender}`);
    return json({ ok: true, id: sent.id });
  });
}
