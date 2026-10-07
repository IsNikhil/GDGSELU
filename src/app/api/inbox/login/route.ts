import { inboxFrom, isAllowed } from "@/lib/inbox/config";
import { EMAIL_RE, badPost, escapeHtml, failure, json } from "@/lib/inbox/http";
import { sendEmail } from "@/lib/inbox/resend";
import { newCode, recentlySent, startChallenge } from "@/lib/inbox/session";

/**
 * Step 1 of sign in: email a one time code to a board member.
 * Always answers { ok: true } so the form does not reveal who is on the board.
 */
export async function POST(request: Request) {
  const bad = badPost(request);
  if (bad) return bad;
  try {
    const { email: raw } = (await request.json().catch(() => ({}))) as { email?: string };
    const email = String(raw ?? "")
      .trim()
      .toLowerCase();
    if (!EMAIL_RE.test(email)) return json({ error: "invalid_email" }, 400);

    if (isAllowed(email) && !(await recentlySent(email))) {
      const code = newCode();
      const pretty = `${code.slice(0, 4)}-${code.slice(4)}`;
      await sendEmail({
        from: inboxFrom(),
        to: [email],
        subject: `Your GDG Southeastern inbox code: ${pretty}`,
        text: `Your sign in code is ${pretty}\n\nIt expires in 10 minutes. If you did not ask for it, you can ignore this email.`,
        html:
          `<p>Your GDG Southeastern inbox sign in code:</p>` +
          `<p style="font-size:28px;font-weight:700;letter-spacing:4px;font-family:monospace">${escapeHtml(pretty)}</p>` +
          `<p style="color:#666">It expires in 10 minutes. If you did not ask for it, you can ignore this email.</p>`,
      });
      await startChallenge(email, code);
    }
    return json({ ok: true });
  } catch (err) {
    return failure(err);
  }
}
