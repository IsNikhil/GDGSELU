import { json, withSession } from "@/lib/inbox/http";

/** Who is signed in. 401 when nobody is. */
export async function GET() {
  return withSession(async (email) => json({ email }));
}
