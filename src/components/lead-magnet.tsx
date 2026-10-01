"use client";

import { useRef, useState, type FormEvent } from "react";
import { cn, trackEvent } from "@/lib/utils";
import {
  TurnstileWidget,
  type TurnstileWidgetHandle,
} from "@/components/turnstile-widget";

export function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | undefined>();
  const widgetRef = useRef<TurnstileWidgetHandle>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!turnstileToken) return;
    setLoading(true);

    try {
      const res = await fetch("/api/one-skill-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken }),
      });

      if (res.ok) {
        trackEvent("One Skill Signup");
        setSubmitted(true);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
      // Tokens are single-use: re-challenge before any retry.
      widgetRef.current?.reset();
    }
  }

  return (
    <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
      {/* Decorative background element */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-accent-light/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block font-inter text-xs font-medium uppercase tracking-[0.18em] text-accent">
            Free Guide
          </span>
          <h2 className="font-playfair text-3xl font-medium leading-snug text-background md:text-4xl lg:text-5xl">
            The One Skill
            <br />
            That Changes Everything
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-background/70">
            Enter your email and we&rsquo;ll send you a free guide — two moves,
            three seconds, no extra time carved out of a day that doesn&rsquo;t
            have any to spare.
          </p>

          {submitted ? (
            <p className="mt-8 text-lg font-medium text-accent">
              ✓ Check your inbox! The One Skill guide is on its way.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={cn(
                  "min-w-0 flex-1 border border-border/40 bg-background/10 p-3 text-sm text-background",
                  "placeholder:text-background/40 focus:outline-none focus:ring-1 focus:ring-accent/60",
                  "rounded-site backdrop-blur-sm",
                )}
              />
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <TurnstileWidget
                  ref={widgetRef}
                  action="signup"
                  onToken={setTurnstileToken}
                />
                <button
                  type="submit"
                  disabled={loading || !turnstileToken}
                  className={cn(
                    "rounded-site bg-background px-6 py-3 text-sm font-medium text-foreground shadow-sm",
                    "transition-all duration-300 hover:bg-background/90 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
                    "disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap",
                  )}
                >
                  {loading ? "Sending..." : "Send me the guide"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
