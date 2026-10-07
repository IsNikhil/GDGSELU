"use client";

import {
  ArrowLeft,
  Loader2,
  LogOut,
  Mail,
  Paperclip,
  PenSquare,
  RefreshCw,
  Reply,
  Send,
  X,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Logo } from "@/components/layout/Logo";
import { Sky } from "@/components/ui/Sky";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type Summary = {
  id: string;
  from: string;
  to: string[];
  subject: string;
  createdAt: string;
  attachments: number;
};

type Detail = Omit<Summary, "attachments"> & {
  cc: string[];
  replyTo: string[];
  messageId: string | null;
  html: string | null;
  text: string | null;
  attachments: { filename: string; contentType: string; size: number | null }[];
};

type Draft = { to: string; subject: string; text: string; inReplyTo: string | null };

const READ_KEY = "gdg-inbox-read";

async function api<T>(path: string, body?: unknown): Promise<{ status: number; data: T }> {
  const res = await fetch(`/api/inbox/${path}`, {
    method: body === undefined ? "GET" : "POST",
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as T;
  return { status: res.status, data };
}

function parseAddress(raw: string) {
  const m = raw.match(/^\s*"?([^"<]*?)"?\s*<([^>]+)>\s*$/);
  return m ? { name: m[1].trim() || m[2], email: m[2] } : { name: raw, email: raw };
}

function shortDate(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  return d.toDateString() === today.toDateString()
    ? d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : d.toLocaleDateString([], { month: "short", day: "numeric" });
}

function errorText(code: string | undefined) {
  switch (code) {
    case "not_configured":
      return "The inbox is not set up yet. Add the environment variables from docs/inbox-setup.md.";
    case "resend":
      return "Resend rejected the request. Check the API key has full access and the domain is verified.";
    case "invalid_code":
      return "That code is wrong or has expired. Request a new one.";
    case "invalid_email":
      return "Enter a valid email address.";
    case "invalid_to":
      return "Check the To address.";
    case "empty":
      return "Add a subject and a message.";
    default:
      return "Something went wrong. Please try again.";
  }
}

/* ---------------- Sign in ---------------- */

function SignIn({ onSignedIn }: { onSignedIn: (email: string) => void }) {
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function requestCode(e?: FormEvent) {
    e?.preventDefault();
    setBusy(true);
    setError("");
    const { status, data } = await api<{ error?: string }>("login/", { email });
    setBusy(false);
    if (status !== 200) return setError(errorText(data.error));
    setStep("code");
    setNotice(`If ${email} is on the board list, a code is on its way. It expires in 10 minutes.`);
  }

  async function verify(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { status, data } = await api<{ email?: string; error?: string }>("verify/", { code });
    setBusy(false);
    if (status !== 200 || !data.email) return setError(errorText(data.error));
    onSignedIn(data.email);
  }

  const input =
    "mt-2 block w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-subtle focus:border-brand focus:ring-4 focus:ring-brand/10";

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-16">
      <Sky className="h-full" />
      <div className="rise relative z-10 w-full max-w-sm rounded-3xl border border-line bg-white/90 p-7 shadow-lg shadow-black/5 backdrop-blur-xl sm:p-8">
        <Link href="/" className="inline-block rounded-lg" aria-label="GDG Southeastern home">
          <Logo />
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
          Board <span className="serif-italic">inbox</span>
        </h1>
        <p className="mt-2 text-[14px] text-muted">
          Read and reply to email sent to {site.contactEmail}.
        </p>

        {step === "email" ? (
          <form onSubmit={requestCode} className="mt-6">
            <label htmlFor="inbox-email" className="text-[14px] font-semibold text-foreground">
              Your board email
            </label>
            <input
              id="inbox-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={input}
            />
            <button
              type="submit"
              disabled={busy}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-[#222] disabled:opacity-60"
            >
              {busy && <Loader2 aria-hidden className="size-4 animate-spin" />}
              Email me a sign in code
            </button>
          </form>
        ) : (
          <form onSubmit={verify} className="mt-6">
            <p className="rounded-xl bg-surface px-4 py-3 text-[13px] text-muted">{notice}</p>
            <label
              htmlFor="inbox-code"
              className="mt-5 block text-[14px] font-semibold text-foreground"
            >
              Sign in code
            </label>
            <input
              id="inbox-code"
              autoComplete="one-time-code"
              autoCapitalize="characters"
              spellCheck={false}
              required
              placeholder="ABCD-2345"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className={cn(input, "font-mono text-lg tracking-[0.2em]")}
            />
            <button
              type="submit"
              disabled={busy}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-[#222] disabled:opacity-60"
            >
              {busy && <Loader2 aria-hidden className="size-4 animate-spin" />}
              Sign in
            </button>
            <div className="mt-4 flex justify-between text-[13px]">
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setCode("");
                  setError("");
                }}
                className="text-muted hover:text-foreground"
              >
                Use a different email
              </button>
              <button
                type="button"
                onClick={() => requestCode()}
                disabled={busy}
                className="text-muted hover:text-foreground"
              >
                Resend code
              </button>
            </div>
          </form>
        )}
        <p aria-live="polite" className="mt-4 text-[13px] font-medium text-[#c5221f]">
          {error}
        </p>
      </div>
    </main>
  );
}

/* ---------------- Reader ---------------- */

/** Received HTML is untrusted: no scripts, no same origin access, links open in a new tab. */
function HtmlBody({ html }: { html: string }) {
  const doc = useMemo(
    () =>
      `<!doctype html><html><head><meta charset="utf-8"><meta name="referrer" content="no-referrer"><base target="_blank"><style>body{margin:0;padding:20px;font:15px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#111;word-wrap:break-word}img{max-width:100%;height:auto}</style></head><body>${html}</body></html>`,
    [html],
  );
  return (
    <iframe
      title="Email content"
      sandbox="allow-popups allow-popups-to-escape-sandbox"
      srcDoc={doc}
      className="h-full min-h-[50vh] w-full rounded-2xl border border-line bg-white"
    />
  );
}

function Reader({
  detail,
  loading,
  onReply,
  onBack,
}: {
  detail: Detail | null;
  loading: boolean;
  onReply: (d: Detail) => void;
  onBack: () => void;
}) {
  const [plain, setPlain] = useState(false);
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-subtle">
        <Loader2 aria-hidden className="size-5 animate-spin" />
        <span className="sr-only">Loading message</span>
      </div>
    );
  }
  if (!detail) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-subtle">
        <Mail aria-hidden className="size-8" strokeWidth={1.5} />
        <p className="text-[14px]">Select a message to read it.</p>
      </div>
    );
  }
  const from = parseAddress(detail.from);
  const showHtml = detail.html && !plain;
  return (
    <article className="flex h-full flex-col gap-4 overflow-y-auto p-4 sm:p-6">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 self-start text-[13px] text-muted hover:text-foreground md:hidden"
      >
        <ArrowLeft aria-hidden className="size-4" />
        All messages
      </button>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold tracking-tight break-words text-foreground">
            {detail.subject || "(no subject)"}
          </h2>
          <p className="mt-2 text-[14px] text-foreground">
            <span className="font-semibold">{from.name}</span>{" "}
            <span className="text-muted">&lt;{from.email}&gt;</span>
          </p>
          <p className="mt-0.5 text-[12.5px] text-subtle">
            To {detail.to.join(", ")}
            {detail.cc.length > 0 && <> · Cc {detail.cc.join(", ")}</>} ·{" "}
            {new Date(detail.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          {detail.html && detail.text && (
            <button
              type="button"
              onClick={() => setPlain((v) => !v)}
              className="rounded-full border border-line px-3.5 py-2 text-[13px] font-medium text-muted hover:text-foreground"
            >
              {plain ? "Formatted" : "Plain text"}
            </button>
          )}
          <button
            type="button"
            onClick={() => onReply(detail)}
            className="flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#222]"
          >
            <Reply aria-hidden className="size-4" />
            Reply
          </button>
        </div>
      </div>
      {detail.attachments.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {detail.attachments.map((f) => (
            <li
              key={f.filename}
              className="flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-[12px] text-muted"
            >
              <Paperclip aria-hidden className="size-3" />
              {f.filename}
            </li>
          ))}
        </ul>
      )}
      <div className="min-h-0 flex-1">
        {showHtml ? (
          <HtmlBody html={detail.html!} />
        ) : (
          <pre className="rounded-2xl border border-line bg-white p-5 font-sans text-[15px] leading-relaxed whitespace-pre-wrap text-foreground">
            {detail.text || "(empty message)"}
          </pre>
        )}
      </div>
    </article>
  );
}

/* ---------------- Compose ---------------- */

function Composer({
  draft,
  onChange,
  onClose,
}: {
  draft: Draft;
  onChange: (d: Draft) => void;
  onClose: (sent: boolean) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const field =
    "w-full border-b border-line bg-transparent px-4 py-2.5 text-[14px] text-foreground outline-none placeholder:text-subtle focus:border-brand";

  async function send(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { status, data } = await api<{ error?: string; message?: string }>("send/", draft);
    setBusy(false);
    if (status !== 200) return setError(data.message || errorText(data.error));
    onClose(true);
  }

  return (
    <form
      onSubmit={send}
      aria-label={draft.inReplyTo ? "Reply" : "New message"}
      className="fixed inset-x-3 bottom-3 z-50 flex max-h-[85dvh] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl shadow-black/20 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[560px]"
    >
      <div className="flex items-center justify-between bg-[#0d0d0d] px-4 py-2.5 text-[13px] font-medium text-white">
        {draft.inReplyTo ? "Reply" : "New message"}
        <button
          type="button"
          onClick={() => onClose(false)}
          aria-label="Discard"
          className="rounded p-1 text-white/60 hover:text-white"
        >
          <X aria-hidden className="size-4" />
        </button>
      </div>
      <p className="border-b border-line px-4 py-2.5 text-[13px] text-subtle">
        From {site.contactEmail}
      </p>
      <input
        aria-label="To"
        placeholder="To"
        value={draft.to}
        onChange={(e) => onChange({ ...draft, to: e.target.value })}
        className={field}
        required
      />
      <input
        aria-label="Subject"
        placeholder="Subject"
        value={draft.subject}
        onChange={(e) => onChange({ ...draft, subject: e.target.value })}
        className={field}
        required
      />
      <textarea
        aria-label="Message"
        value={draft.text}
        onChange={(e) => onChange({ ...draft, text: e.target.value })}
        rows={10}
        autoFocus
        className="min-h-[180px] flex-1 resize-none px-4 py-3 text-[14px] leading-relaxed text-foreground outline-none"
        required
      />
      <div className="flex items-center gap-3 border-t border-line px-4 py-3">
        <button
          type="submit"
          disabled={busy}
          className="flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-[14px] font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-brand/20 disabled:opacity-60"
        >
          {busy ? (
            <Loader2 aria-hidden className="size-4 animate-spin" />
          ) : (
            <Send aria-hidden className="size-4" />
          )}
          Send
        </button>
        <p aria-live="polite" className="text-[12.5px] text-[#c5221f]">
          {error}
        </p>
      </div>
    </form>
  );
}

/* ---------------- Mailbox ---------------- */

function Mailbox({ me, onSignedOut }: { me: string; onSignedOut: () => void }) {
  const [messages, setMessages] = useState<Summary[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [listState, setListState] = useState<"loading" | "ready" | "more" | "refresh">("loading");
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [toast, setToast] = useState("");
  // Mailbox only renders in the browser (after the sign in check), so localStorage is safe here.
  const [read, setRead] = useState<Set<string>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(READ_KEY) ?? "[]") as string[]);
    } catch {
      return new Set();
    }
  });
  const cache = useRef(new Map<string, Detail>());

  const markRead = (id: string) =>
    setRead((prev) => {
      const next = new Set(prev).add(id);
      try {
        localStorage.setItem(READ_KEY, JSON.stringify([...next].slice(-500)));
      } catch {}
      return next;
    });

  type Page = { status: number; data: { messages?: Summary[]; hasMore?: boolean; error?: string } };

  /** Applies a fetched page. Called from promise callbacks only. */
  const apply = useCallback(
    ({ status, data }: Page, append: boolean) => {
      if (status === 401) return onSignedOut();
      if (status !== 200 || !data.messages) {
        setError(errorText(data.error));
      } else {
        setError("");
        setMessages((prev) => (append ? [...prev, ...data.messages!] : data.messages!));
        setHasMore(Boolean(data.hasMore));
      }
      setListState("ready");
    },
    [onSignedOut],
  );

  const fetchPage = (after?: string): Promise<Page> =>
    api(after ? `messages/?after=${encodeURIComponent(after)}` : "messages/");

  const load = (mode: "more" | "refresh", after?: string) => {
    setListState(mode);
    void fetchPage(after).then((page) => apply(page, Boolean(after)));
  };

  useEffect(() => {
    const refresh = () => void fetchPage().then((page) => apply(page, false));
    refresh();
    const id = setInterval(() => {
      if (document.visibilityState === "visible") refresh();
    }, 60_000);
    return () => clearInterval(id);
    // fetchPage is a plain wrapper around fetch; apply is the only real dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apply]);

  async function open(id: string) {
    setSelected(id);
    markRead(id);
    const cached = cache.current.get(id);
    if (cached) return setDetail(cached);
    setDetail(null);
    setDetailLoading(true);
    const { status, data } = await api<Detail & { error?: string }>(
      `messages/${encodeURIComponent(id)}/`,
    );
    setDetailLoading(false);
    if (status === 401) return onSignedOut();
    if (status !== 200) return setError(errorText(data.error));
    cache.current.set(id, data);
    setDetail(data);
  }

  function reply(d: Detail) {
    const to = d.replyTo[0] || parseAddress(d.from).email;
    const quoted = (d.text ?? "")
      .split("\n")
      .map((l) => `> ${l}`)
      .join("\n");
    setDraft({
      to,
      subject: /^re:/i.test(d.subject) ? d.subject : `Re: ${d.subject}`,
      text: `\n\nOn ${new Date(d.createdAt).toLocaleString()}, ${d.from} wrote:\n${quoted}`,
      inReplyTo: d.messageId,
    });
  }

  async function signOut() {
    await api("logout/", {});
    onSignedOut();
  }

  return (
    <div className="flex h-dvh flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-line bg-white/80 px-4 backdrop-blur-xl sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" aria-label="GDG Southeastern home" className="shrink-0 rounded-lg">
            <Logo showName={false} />
          </Link>
          <span className="truncate font-display text-[17px] font-bold text-foreground">
            Inbox{" "}
            <span className="font-sans text-[13px] font-normal text-subtle">
              {site.contactEmail}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDraft({ to: "", subject: "", text: "", inReplyTo: null })}
            className="flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-[13px] font-semibold text-white hover:bg-[#222]"
          >
            <PenSquare aria-hidden className="size-3.5" />
            <span className="hidden sm:inline">Compose</span>
          </button>
          <span className="hidden text-[12.5px] text-subtle lg:inline">{me}</span>
          <button
            type="button"
            onClick={signOut}
            aria-label="Sign out"
            title="Sign out"
            className="rounded-full p-2 text-muted hover:bg-black/[0.04] hover:text-foreground"
          >
            <LogOut aria-hidden className="size-4" />
          </button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 md:grid-cols-[360px_1fr]">
        <section
          aria-label="Messages"
          className={cn(
            "min-h-0 flex-col border-r border-line",
            selected ? "hidden md:flex" : "flex",
          )}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-[13px] font-bold tracking-wider text-foreground uppercase">
              Received
            </h1>
            <button
              type="button"
              onClick={() => load("refresh")}
              aria-label="Refresh"
              className="rounded-full p-1.5 text-muted hover:bg-black/[0.04] hover:text-foreground"
            >
              <RefreshCw
                aria-hidden
                className={cn("size-4", listState === "refresh" && "animate-spin")}
              />
            </button>
          </div>
          {error && (
            <p
              role="alert"
              className="mx-4 mb-3 rounded-xl bg-[#c5221f]/[0.06] px-3 py-2 text-[13px] text-[#c5221f]"
            >
              {error}
            </p>
          )}
          <ul className="min-h-0 flex-1 overflow-y-auto">
            {listState === "loading" &&
              Array.from({ length: 6 }, (_, i) => (
                <li key={i} className="border-b border-line px-4 py-3.5">
                  <div className="h-3 w-1/2 animate-pulse rounded bg-black/[0.06]" />
                  <div className="mt-2 h-3 w-3/4 animate-pulse rounded bg-black/[0.04]" />
                </li>
              ))}
            {listState !== "loading" && messages.length === 0 && !error && (
              <li className="px-4 py-10 text-center text-[14px] text-subtle">No email yet.</li>
            )}
            {messages.map((m) => {
              const unread = !read.has(m.id);
              const from = parseAddress(m.from);
              return (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => open(m.id)}
                    aria-current={selected === m.id ? "true" : undefined}
                    className={cn(
                      "w-full border-b border-line px-4 py-3 text-left transition-colors hover:bg-black/[0.02]",
                      selected === m.id && "bg-brand/[0.07] hover:bg-brand/[0.07]",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {unread && (
                        <span
                          aria-label="Unread"
                          className="size-2 shrink-0 rounded-full bg-brand"
                        />
                      )}
                      <span
                        className={cn(
                          "flex-1 truncate text-[14px]",
                          unread ? "font-semibold text-foreground" : "text-muted",
                        )}
                      >
                        {from.name}
                      </span>
                      {m.attachments > 0 && (
                        <Paperclip aria-label="Has attachments" className="size-3 text-subtle" />
                      )}
                      <span className="shrink-0 text-[12px] text-subtle">
                        {shortDate(m.createdAt)}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 block truncate text-[13px]",
                        unread ? "text-foreground" : "text-subtle",
                      )}
                    >
                      {m.subject || "(no subject)"}
                    </span>
                  </button>
                </li>
              );
            })}
            {hasMore && (
              <li className="p-4 text-center">
                <button
                  type="button"
                  onClick={() => load("more", messages.at(-1)?.id)}
                  disabled={listState === "more"}
                  className="rounded-full border border-line px-4 py-1.5 text-[13px] font-medium text-muted hover:text-foreground"
                >
                  {listState === "more" ? "Loading…" : "Load older"}
                </button>
              </li>
            )}
          </ul>
        </section>

        <section
          aria-label="Message"
          className={cn("min-h-0 bg-surface/50", selected ? "block" : "hidden md:block")}
        >
          <Reader
            detail={detail}
            loading={detailLoading}
            onReply={reply}
            onBack={() => {
              setSelected(null);
              setDetail(null);
            }}
          />
        </section>
      </div>

      {draft && (
        <Composer
          draft={draft}
          onChange={setDraft}
          onClose={(sent) => {
            setDraft(null);
            if (sent) {
              setToast("Sent");
              setTimeout(() => setToast(""), 2500);
            }
          }}
        />
      )}
      <p
        aria-live="polite"
        className={cn(
          "pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-white transition-opacity",
          toast ? "opacity-100" : "opacity-0",
        )}
      >
        {toast}
      </p>
    </div>
  );
}

/* ---------------- Root ---------------- */

export function InboxApp() {
  const [state, setState] = useState<{ phase: "loading" | "out" | "in"; email?: string }>({
    phase: "loading",
  });

  useEffect(() => {
    void api<{ email?: string }>("me/").then(({ status, data }) =>
      setState(
        status === 200 && data.email ? { phase: "in", email: data.email } : { phase: "out" },
      ),
    );
  }, []);

  const signedOut = useCallback(() => setState({ phase: "out" }), []);

  if (state.phase === "loading") {
    return (
      <div className="flex min-h-dvh items-center justify-center text-subtle">
        <Loader2 aria-hidden className="size-5 animate-spin" />
        <span className="sr-only">Loading</span>
      </div>
    );
  }
  if (state.phase === "out") {
    return <SignIn onSignedIn={(email) => setState({ phase: "in", email })} />;
  }
  return <Mailbox me={state.email!} onSignedOut={signedOut} />;
}
