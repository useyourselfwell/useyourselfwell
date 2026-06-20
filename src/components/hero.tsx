"use client";

import { useState } from "react";
import { cn, trackEvent } from "@/lib/utils";
import { PaymentDialog } from "@/components/payment-dialog";

export function Hero() {
  const [dialogOpen, setDialogOpen] = useState(false);

  async function handleCheckout() {
    trackEvent("CTA Click");
    setDialogOpen(true);
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
          "One Skill" to rule them all{" "}
          {/* Most people don&rsquo;t realize how much tension they carry &mdash;
          until they experience life without it. */}
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
          that will show you that it doesn't have to be this way.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          <button
            onClick={handleCheckout}
            className={cn(
              "rounded-site bg-accent px-10 py-4 text-lg font-medium text-white shadow-md",
              "transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
            )}
          >
            Get "One Skill" Now — $27
          </button>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-background/60">
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
              Instant Lifetime Access
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
              14-Day Money-Back Guarantee
            </span>
          </div>
        </div>
      </div>

      <PaymentDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
}
