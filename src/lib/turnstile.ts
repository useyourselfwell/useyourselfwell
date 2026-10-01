/**
 * Canonical Cloudflare Turnstile server-side verification.
 *
 * Contract: browser -> our backend -> siteverify. The token is read from the
 * request body, redeemed exactly once against siteverify, and the existing
 * handler logic only runs when `success`, the expected `action`, and the
 * frontend `hostname` all check out.
 *
 * Never call this from the browser, and never log or return the secret.
 */

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Used only when TURNSTILE_HOSTNAMES is unset, so a missing env var degrades to
 * a still-meaningful hostname check instead of locking every form out.
 * localhost is added outside production only — never in a production allowlist.
 */
const DEFAULT_PRODUCTION_HOSTNAMES = [
  "useyourselfwell.com",
  "www.useyourselfwell.com",
];

function expectedHostnames(): Set<string> {
  const configured = process.env.TURNSTILE_HOSTNAMES;
  if (configured && configured.trim()) {
    return new Set(
      configured
        .split(",")
        .map((hostname) => hostname.trim())
        .filter(Boolean),
    );
  }

  const fallback = new Set(DEFAULT_PRODUCTION_HOSTNAMES);
  if (process.env.NODE_ENV !== "production") {
    fallback.add("localhost");
    fallback.add("127.0.0.1");
  }
  return fallback;
}

function clientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || undefined;
}

export type TurnstileVerification = { ok: true } | { ok: false; reason: string };

/**
 * @param request        the incoming request (used for the client IP)
 * @param token          `cf-turnstile-response` from the submitted body
 * @param expectedAction the action this surface was rendered with
 */
export async function verifyTurnstile(
  request: Request,
  token: unknown,
  expectedAction: string,
): Promise<TurnstileVerification> {
  const hostnames = expectedHostnames();
  if (
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > 2048 ||
    hostnames.size === 0
  ) {
    return { ok: false, reason: "invalid-token" };
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("Turnstile: TURNSTILE_SECRET_KEY is not set");
    return { ok: false, reason: "missing-secret" };
  }

  const ip = clientIp(request);

  let result: {
    success?: boolean;
    action?: string;
    hostname?: string;
    "error-codes"?: string[];
  };

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({
        secret,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
      }),
    });
    if (!response.ok) throw new Error(`siteverify ${response.status}`);
    result = await response.json();
  } catch (error) {
    console.error("Turnstile: siteverify request failed", error);
    return { ok: false, reason: "siteverify-unreachable" };
  }

  if (!result.success) {
    console.warn(
      "Turnstile: rejected",
      result["error-codes"]?.join(", ") || "unknown",
    );
    return { ok: false, reason: "rejected" };
  }

  if (result.action !== expectedAction) {
    console.warn(
      `Turnstile: action mismatch (expected ${expectedAction}, got ${result.action})`,
    );
    return { ok: false, reason: "action-mismatch" };
  }

  if (!result.hostname || !hostnames.has(result.hostname)) {
    console.warn(`Turnstile: hostname not allowed (${result.hostname})`);
    return { ok: false, reason: "hostname-mismatch" };
  }

  return { ok: true };
}

/** Shared 403 body so every gated route answers identically. */
export const TURNSTILE_REJECTION = {
  error:
    "We couldn't verify that submission as coming from a real browser. Please refresh the page and try again.",
} as const;