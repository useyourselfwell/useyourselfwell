"use client";

import { useState } from "react";
import { cn, trackEvent } from "@/lib/utils";
import { course } from "@/lib/course";
import { PaymentDialog } from "@/components/payment-dialog";

export function CourseOffer() {
  const [dialogOpen, setDialogOpen] = useState(false);

  async function handleCheckout() {
    trackEvent("CTA Click");
    setDialogOpen(true);
  }

  return (
    <section id="course" className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex items-center gap-3">
          <hr className="w-10 border-t-2 border-accent" />
          <span className="font-inter text-xs font-medium uppercase tracking-[0.18em] text-accent">
            The Course
          </span>
        </div>

        <h2 className="mt-6 font-playfair text-3xl font-medium leading-snug text-foreground md:text-4xl lg:text-5xl">
          Start Here: One Skill
        </h2>

        <p className="mt-3 text-2xl font-medium text-accent">
          {course.price === 27 ? "$27" : `$${course.price}`}
        </p>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {course.description}
        </p>

        <div className="mt-12">
          <div className="rounded-site border border-accent/20 bg-accent-light/10 p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  What's included
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 border-t border-accent/20 pt-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                  <svg
                    className="h-4 w-4 text-accent shrink-0"
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
                  The Deep Stop
                </h4>
                <p className="text-xs leading-relaxed text-muted">
                  A guide to constructive rest — one of the simplest, most
                  powerful tools for releasing unnecessary tension.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                  <svg
                    className="h-4 w-4 text-accent shrink-0"
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
                  In the Face of the Other
                </h4>
                <p className="text-xs leading-relaxed text-muted">
                  Applying the skill in conversations, meetings, and social
                  situations — where most people lose awareness fastest.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                  <svg
                    className="h-4 w-4 text-accent shrink-0"
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
                  The Daily Five
                </h4>
                <p className="text-xs leading-relaxed text-muted">
                  A short daily checklist to help the habit of noticing stick.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-10 flex flex-col items-center">
          <button
            onClick={handleCheckout}
            className={cn(
              "rounded-site bg-accent px-10 py-4 text-lg font-medium text-white shadow-md",
              "transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
            )}
          >
            {course.cta}
          </button>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted/80">
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
            <span className="hidden sm:inline text-muted/40">•</span>
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
