// Server only. Stateless sign in for the board inbox:
//   1. A board member asks for a code. We email an 8 character code and store a signed,
//      httpOnly "challenge" cookie that holds only an HMAC of the code (never the code).
//   2. They type the code. If its HMAC matches, we set a signed, httpOnly session cookie.
// Nothing is stored server side. Removing someone from INBOX_ALLOWED_EMAILS ends their
// session on the next request. Changing INBOX_SESSION_SECRET signs everyone out.

import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { isAllowed, sessionSecret } from "./config";

const SESSION_COOKIE = "gdg_inbox_session";
const CHALLENGE_COOKIE = "gdg_inbox_challenge";
const COOKIE_PATH = "/api/inbox";
const SESSION_SECONDS = 60 * 60 * 24 * 7; // 7 days
const CHALLENGE_SECONDS = 60 * 10; // codes expire after 10 minutes
const RESEND_COOLDOWN_SECONDS = 30;
// 32^8 is about 1.1 trillion combinations, far beyond what can be guessed in 10 minutes.
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CODE_LENGTH = 8;

type Session = { email: string; exp: number };
type Challenge = { email: string; hash: string; exp: number; iat: number };

const now = () => Math.floor(Date.now() / 1000);
const b64 = (s: string | Buffer) => Buffer.from(s).toString("base64url");

function hmac(data: string) {
  return createHmac("sha256", sessionSecret()).update(data).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

function sign(kind: string, payload: object) {
  const body = b64(JSON.stringify(payload));
  return `${body}.${hmac(`${kind}.${body}`)}`;
}

function verify<T extends { exp: number }>(kind: string, token: string | undefined): T | null {
  if (!token) return null;
  const [body, mac] = token.split(".");
  if (!body || !mac || !safeEqual(mac, hmac(`${kind}.${body}`))) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as T;
    return payload.exp > now() ? payload : null;
  } catch {
    return null;
  }
}

const cookieOptions = (maxAge: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: COOKIE_PATH,
  maxAge,
});

/** Normalizes what someone typed: uppercase, no spaces or dashes. */
export function normalizeCode(input: string) {
  return input.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function newCode() {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) code += CODE_ALPHABET[randomInt(CODE_ALPHABET.length)];
  return code;
}

function codeHash(email: string, code: string, exp: number) {
  return hmac(`code:${email}:${code}:${exp}`);
}

/** True when a code was sent to this email very recently (avoids flooding inboxes). */
export async function recentlySent(email: string) {
  const store = await cookies();
  const c = verify<Challenge>("challenge", store.get(CHALLENGE_COOKIE)?.value);
  return Boolean(c && c.email === email && now() - c.iat < RESEND_COOLDOWN_SECONDS);
}

export async function startChallenge(email: string, code: string) {
  const exp = now() + CHALLENGE_SECONDS;
  const token = sign("challenge", { email, hash: codeHash(email, code, exp), exp, iat: now() });
  (await cookies()).set(CHALLENGE_COOKIE, token, cookieOptions(CHALLENGE_SECONDS));
}

/** Checks the typed code. On success, swaps the challenge for a session. */
export async function completeChallenge(input: string): Promise<string | null> {
  const store = await cookies();
  const c = verify<Challenge>("challenge", store.get(CHALLENGE_COOKIE)?.value);
  if (!c || !isAllowed(c.email)) return null;
  if (!safeEqual(codeHash(c.email, normalizeCode(input), c.exp), c.hash)) return null;
  store.delete({ name: CHALLENGE_COOKIE, path: COOKIE_PATH });
  const session: Session = { email: c.email, exp: now() + SESSION_SECONDS };
  store.set(SESSION_COOKIE, sign("session", session), cookieOptions(SESSION_SECONDS));
  return c.email;
}

/** The signed in board member's email, or null. */
export async function getSession(): Promise<string | null> {
  const store = await cookies();
  const s = verify<Session>("session", store.get(SESSION_COOKIE)?.value);
  return s && isAllowed(s.email) ? s.email : null;
}

export async function endSession() {
  const store = await cookies();
  store.delete({ name: SESSION_COOKIE, path: COOKIE_PATH });
  store.delete({ name: CHALLENGE_COOKIE, path: COOKIE_PATH });
}
