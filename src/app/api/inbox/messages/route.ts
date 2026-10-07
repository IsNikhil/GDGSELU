import { json, withSession } from "@/lib/inbox/http";
import { listReceived } from "@/lib/inbox/resend";

/** Received email, newest first. ?after=<id> loads the next page. */
export async function GET(request: Request) {
  return withSession(async () => {
    const after = new URL(request.url).searchParams.get("after") ?? undefined;
    const page = await listReceived({ limit: 30, after });
    return json({
      hasMore: page.has_more,
      messages: page.data.map((m) => ({
        id: m.id,
        from: m.from,
        to: m.to,
        subject: m.subject,
        createdAt: m.created_at,
        attachments: m.attachments?.length ?? 0,
      })),
    });
  });
}
