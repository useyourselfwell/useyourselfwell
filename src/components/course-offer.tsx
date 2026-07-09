"use client";

import { useState } from "react";
import { cn, trackEvent } from "@/lib/utils";
import { program } from "@/lib/course";
import { ProgramCheckoutDialog } from "@/components/program-checkout-dialog";

export function CourseOffer() {
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleCTA() {
    trackEvent("Program CTA Click");
    setDialogOpen(true);
  }

  return (
    <section id="program" className="relative overflow-hidden bg-foreground py-24 md:py-32">
      {/* Decorative orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-accent-light/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <hr className="w-10 border-t-2 border-accent" />
          <span className="font-inter text-xs font-medium uppercase tracking-[0.18em] text-accent">
            The Program
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="font-playfair text-3xl font-medium leading-snug text-background md:text-4xl lg:text-5xl">
            One Skill Program
          </h2>
          <div className="flex items-baseline gap-3">
            <span className="text-sm text-background/40 line-through">${program.regularPrice}</span>
            <span className="text-3xl font-medium text-accent">${program.price}</span>
            <span className="inline-flex items-center rounded-full bg-accent/20 px-3 py-0.5 text-xs font-semibold text-accent ring-1 ring-accent/30 whitespace-nowrap">
              Save ${program.savings}
            </span>
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-background/65">
          {program.description}
        </p>

        {/* Includes */}
        <div className="mt-12 space-y-4">
          {program.includes.map((item, i) => (
            <div
              key={i}
              className={cn(
                "rounded-site border p-6 backdrop-blur-sm",
                i === 0
                  ? "border-accent/20 bg-accent/10"
                  : "border-white/10 bg-white/5",
              )}
            >
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <svg
                    className="h-4 w-4"
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
                <div>
                  <h3 className="font-semibold text-background text-sm">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-background/55">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Location note */}
        <p className="mt-5 text-xs text-background/60 text-center tracking-wide font-medium">
          Lessons held in Bountiful, Utah at <span className="text-accent font-semibold">294 E 650 N</span> — just off the 4th North freeway exit.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <button
            onClick={handleCTA}
            className={cn(
              "rounded-site bg-accent px-10 py-4 text-lg font-medium text-white shadow-md",
              "transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
            )}
          >
            {program.cta}
          </button>

        </div>
      </div>

      <ProgramCheckoutDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
}
