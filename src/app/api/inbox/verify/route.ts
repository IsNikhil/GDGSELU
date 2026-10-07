import { badPost, failure, json } from "@/lib/inbox/http";
import { completeChallenge } from "@/lib/inbox/session";

/** Step 2 of sign in: check the code and start a session. */
export async function POST(request: Request) {
  const bad = badPost(request);
  if (bad) return bad;
  try {
    const { code } = (await request.json().catch(() => ({}))) as { code?: string };
    const email = await completeChallenge(String(code ?? ""));
    if (!email) return json({ error: "invalid_code" }, 401);
    return json({ ok: true, email });
  } catch (err) {
    return failure(err);
  }
}
