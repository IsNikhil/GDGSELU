import { badPost, json } from "@/lib/inbox/http";
import { endSession } from "@/lib/inbox/session";

export async function POST(request: Request) {
  const bad = badPost(request);
  if (bad) return bad;
  await endSession();
  return json({ ok: true });
}
