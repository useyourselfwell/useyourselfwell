"use client";

import { useState } from "react";
import { cn, trackEvent } from "@/lib/utils";
import { program } from "@/lib/course";
import { ProgramCheckoutDialog } from "@/components/program-checkout-dialog";

export function FinalCta() {
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleProgramCTA() {
    trackEvent("Program CTA Click (Footer)");
    setDialogOpen(true);
  }

  return (
    <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
      {/* Decorative orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block font-inter text-xs font-medium uppercase tracking-[0.18em] text-accent">
            In-Person Lessons
          </span>
          <h2 className="font-playfair text-3xl font-medium leading-snug text-background md:text-4xl lg:text-5xl">
            Experience the work in real time.
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-background/70">
            Schedule your first lesson in the One Skill Program today. Includes two private sessions with Christopher, the full digital course, and tools you have for life.
          </p>

          {/* Primary CTA: $197 program */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <button
              onClick={handleProgramCTA}
              className={cn(
                "rounded-site bg-accent px-10 py-4 text-lg font-medium text-white shadow-md",
                "transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
              )}
            >
              Schedule Your First Lesson - $197
            </button>
          </div>
        </div>
      </div>

      <ProgramCheckoutDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
}
