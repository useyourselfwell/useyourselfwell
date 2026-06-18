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

        <div className="mt-12 space-y-0">
          {course.modules.map((mod) => (
            <div
              key={mod.number}
              className={cn(
                "group flex gap-5 border-b border-border py-5 transition-colors duration-200 hover:bg-accent/5 -mx-3 px-3 rounded",
                mod.number === 1 && "border-t border-border",
              )}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent ring-1 ring-accent/20 transition-all duration-200 group-hover:bg-accent group-hover:text-white group-hover:ring-accent">
                {mod.number}
              </span>
              <div>
                <h3 className="text-base font-medium text-foreground">
                  {mod.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{mod.description}</p>
              </div>
            </div>
          ))}
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
