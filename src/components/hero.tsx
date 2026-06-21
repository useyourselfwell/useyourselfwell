"use client";

import { useState, type FormEvent } from "react";
import { cn, trackEvent } from "@/lib/utils";

export function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        trackEvent("Free Intro Signup");
        setSubmitted(true);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="hero"
      className="relative overflow-hidden py-24 md:py-36 text-center"
    >
      {/* Background image */}
      <img
        src="/images/bg-01.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Gradient overlay: lighter top-right, darker bottom-left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.75) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-6 flex flex-col items-center">
        <h1 className="mb-6 max-w-3xl font-playfair text-4xl font-medium leading-[1.15] text-background md:text-5xl lg:text-6xl">
          "One Skill" to rule them all
        </h1>

        <div className="flex items-center gap-3">
          <hr className="w-10 border-t-2 border-accent" />
          <span className="font-inter text-s font-medium uppercase tracking-[0.18em] text-accent">
            The first two steps of the Alexander Technique
          </span>
          <hr className="w-10 border-t-2 border-accent" />
        </div>

        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-background/75">
          Most people are working harder than they need to, overthinking,
          overmoving and overdoing everything. The good news? There is one skill
          that will show you that it doesn&rsquo;t have to be this way.
        </p>

        <div className="mt-10 w-full max-w-md flex flex-col items-center gap-3">
          {submitted ? (
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                <svg
                  className="h-6 w-6 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <p className="text-lg font-medium text-accent">
                Check your inbox — free access is on its way.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={cn(
                  "min-w-0 flex-1 border border-white/20 bg-white/10 px-4 py-3.5 text-base text-background",
                  "placeholder:text-background/45 focus:outline-none focus:ring-1 focus:ring-accent/60",
                  "rounded-site backdrop-blur-sm",
                )}
              />
              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "rounded-site bg-accent px-7 py-3.5 text-base font-medium text-white shadow-md whitespace-nowrap",
                  "transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
                  "disabled:cursor-not-allowed disabled:opacity-60",
                )}
              >
                {loading ? "Sending…" : "Get Free Access"}
              </button>
            </form>
          )}

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-background/55">
            <span className="flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              No credit card required
            </span>
            <span className="hidden sm:inline text-background/30">•</span>
            <span className="flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              Free forever
            </span>
            <span className="hidden sm:inline text-background/30">•</span>
            <span className="flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              Instant access
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
