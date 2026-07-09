"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { pricingTiers } from "@/lib/course";
import { ApplyDialog } from "@/components/apply-dialog";

export function OfferLadder() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const tier = pricingTiers[0];

  return (
    <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
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
        <h2 className="font-playfair text-3xl font-medium leading-snug text-background md:text-4xl lg:text-5xl">
          Try the Alexander Technique for yourself
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-background/60">
          A special introductory offer to experience one-on-one work and
          discover what it feels like to use yourself better.
        </p>

        <div className="mt-12">
          <article className="rounded-site border border-accent/30 bg-accent/10 p-8 backdrop-blur-sm ring-1 ring-accent/30">
            <span
              className={cn(
                "mb-4 inline-flex items-center rounded-full bg-accent/20 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-accent",
                "ring-1 ring-accent/30",
              )}
            >
              Limited — special intro offer
            </span>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <div className="min-w-0 flex-1">
                <h3 className="font-playfair text-xl font-medium text-background">
                  {tier.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-background/60">
                  {tier.description}
                </p>
                <p className="mt-2 text-xs text-background/40">
                  Held in Bountiful, Utah — just off the 4th North freeway exit.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-5">
                <p className="text-2xl font-medium text-accent whitespace-nowrap">
                  {tier.price}
                </p>
                <button
                  onClick={() => setDialogOpen(true)}
                  className={cn(
                    "inline-block rounded-site bg-accent px-6 py-3 text-sm font-medium text-white shadow-sm whitespace-nowrap",
                    "transition-all duration-300 hover:bg-accent/90 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
                  )}
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>

      <ApplyDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
}
