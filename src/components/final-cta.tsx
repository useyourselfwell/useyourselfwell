"use client";

import { useState } from "react";
import { cn, trackEvent } from "@/lib/utils";
import { course } from "@/lib/course";
import { PaymentDialog } from "@/components/payment-dialog";

export function FinalCta() {
  const [dialogOpen, setDialogOpen] = useState(false);

  async function handleCheckout() {
    trackEvent("CTA Click");
    setDialogOpen(true);
  }

  return (
    <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
      {/* Decorative orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block font-inter text-xs font-medium uppercase tracking-[0.18em] text-accent">
            Get Started
          </span>
          <h2 className="font-playfair text-3xl font-medium leading-snug text-background md:text-4xl lg:text-5xl">
            Ready to feel what ease actually feels like?
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-background/70">
            Start with One Skill. Most people notice something in the very first
            module.
          </p>

          <div className="mt-10 flex flex-col items-center">
            <button
              onClick={handleCheckout}
              className={cn(
                "rounded-site bg-accent px-10 py-4 text-lg font-medium text-white shadow-md",
                "transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
              )}
            >
              {course.cta}
            </button>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-background/60">
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
      </div>

      <PaymentDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
}
