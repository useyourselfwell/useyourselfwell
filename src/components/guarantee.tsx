"use client";

import { useRef, useState, type FormEvent } from "react";
import { cn, trackEvent } from "@/lib/utils";
import {
  TurnstileWidget,
  type TurnstileWidgetHandle,
} from "@/components/turnstile-widget";

export function Guarantee() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | undefined>();
  const widgetRef = useRef<TurnstileWidgetHandle>(null);

  async function handleFreeSubmit(e: FormEvent) {
    e.preventDefault();
    if (!turnstileToken) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken }),
      });
      if (res.ok) {
        trackEvent("Free Intro Signup (Just Try It)");
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
      // Tokens are single-use: re-challenge before any retry.
      widgetRef.current?.reset();
    }
  }

  return (
    <section className="bg-accent-light/40 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-playfair text-3xl font-medium leading-snug text-foreground md:text-4xl lg:text-5xl">
            Just Try It.
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-muted">
            The digital course is completely free. The great thing about the One Skill is that once you learn it, you have it for life. You don&rsquo;t need to keep paying or keeping up with a routine.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-muted mb-8">
            Download the free intro, see how it feels in your body, and decide for yourself.
          </p>

          {/* Moved Free Email Access Form here */}
          {submitted ? (
            <p className="text-base font-medium text-accent">
              ✓ Check your inbox — free access is on its way.
            </p>
          ) : (
            <form
              onSubmit={handleFreeSubmit}
              className="flex flex-col gap-3 sm:flex-row max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for free access"
                className={cn(
                  "min-w-0 flex-1 border border-border bg-white px-4 py-3 text-sm text-foreground",
                  "placeholder:text-muted/40 focus:outline-none focus:ring-1 focus:ring-accent",
                  "rounded-site shadow-sm",
                )}
              />
              <button
                type="submit"
                disabled={loading || !turnstileToken}
                className={cn(
                  "rounded-site bg-accent px-6 py-3 text-sm font-medium text-white shadow-sm whitespace-nowrap",
                  "transition-all duration-300 hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98]",
                  "disabled:cursor-not-allowed disabled:opacity-60",
                )}
              >
                {loading ? "Sending…" : "Get Free Access"}
              </button>
            </form>
          )}

          <div className="mt-4 flex justify-center">
            {!submitted && (
              <TurnstileWidget
                ref={widgetRef}
                action="lead-magnet"
                onToken={setTurnstileToken}
              />
            )}
          </div>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          <p className="mt-3 text-xs text-muted/60">
            No credit card · Free forever · Instant access
          </p>
        </div>
      </div>
    </section>
  );
}

