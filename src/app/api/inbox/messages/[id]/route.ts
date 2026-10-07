import { json, withSession } from "@/lib/inbox/http";
import { getReceived } from "@/lib/inbox/resend";

/** One received email with its body. */
export async function GET(_request: Request, ctx: RouteContext<"/api/inbox/messages/[id]">) {
  return withSession(async () => {
    const { id } = await ctx.params;
    const m = await getReceived(id);
    return json({
      id: m.id,
      from: m.from,
      to: m.to,
      cc: m.cc ?? [],
      replyTo: m.reply_to ?? [],
      subject: m.subject,
      createdAt: m.created_at,
      messageId: m.message_id ?? null,
      html: m.html ?? null,
      text: m.text ?? null,
      attachments: (m.attachments ?? []).map((a) => ({
        filename: a.filename,
        contentType: a.content_type,
        size: a.size ?? null,
      })),
    });
  });
}
