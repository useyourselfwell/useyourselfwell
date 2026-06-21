"use client";

import { useState, type FormEvent } from "react";
import { cn, trackEvent } from "@/lib/utils";

export function Guarantee() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleFreeSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        trackEvent("Free Intro Signup (Just Try It)");
        setSubmitted(true);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
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
                disabled={loading}
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

          <p className="mt-3 text-xs text-muted/60">
            No credit card · Free forever · Instant access
          </p>
        </div>
      </div>
    </section>
  );
}

