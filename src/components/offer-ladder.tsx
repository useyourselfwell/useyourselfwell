"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { pricingTiers } from "@/lib/course";
import { ContactDialog } from "@/components/contact-dialog";

export function OfferLadder() {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  function handleDialogOpen(tierName: string) {
    setOpenDialog(tierName);
  }

  function handleDialogClose() {
    setOpenDialog(null);
  }

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
          One Skill: 1-on-1 lessons
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-background/60">
          Twelve weeks of personalized hands-on sessions with Christopher. For
          the fastest, deepest change, nothing compares to in-person work.
        </p>

        <div className="mt-12">
          <article className="flex flex-col border border-white/10 bg-white/5 p-8 backdrop-blur-sm rounded-site">
            {/* Standard tier row */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <div className="min-w-0 flex-1">
                <h3 className="font-playfair text-xl font-medium text-background">
                  One Skill — {pricingTiers[0].name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-background/60">
                  {pricingTiers[0].description}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-5">
                <p className="text-2xl font-medium text-accent whitespace-nowrap">
                  {pricingTiers[0].price}
                </p>
                <button
                  onClick={() => handleDialogOpen(pricingTiers[0].name)}
                  className={cn(
                    "inline-block rounded-site bg-background px-6 py-3 text-sm font-medium text-foreground shadow-sm whitespace-nowrap",
                    "transition-all duration-300 hover:bg-background/90 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
                  )}
                >
                  {pricingTiers[0].cta}
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-white/10" />

            {/* Intro Offer tier row */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <div className="min-w-0 flex-1">
                <h3 className="font-playfair text-xl font-medium text-background">
                  One Skill — {pricingTiers[1].name}
                </h3>
                <span
                  className={cn(
                    "mt-1.5 inline-flex items-center rounded-full bg-accent/20 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-accent",
                    "ring-1 ring-accent/30",
                  )}
                >
                  Limited — new product intro
                </span>
                <p className="mt-2 text-sm leading-relaxed text-background/60">
                  {pricingTiers[1].description}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-5">
                <p className="text-2xl font-medium text-accent whitespace-nowrap">
                  {pricingTiers[1].price}
                </p>
                <button
                  onClick={() => handleDialogOpen(pricingTiers[1].name)}
                  className={cn(
                    "inline-block rounded-site bg-accent px-6 py-3 text-sm font-medium text-white shadow-sm whitespace-nowrap",
                    "transition-all duration-300 hover:bg-accent/90 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
                  )}
                >
                  {pricingTiers[1].cta}
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Contact dialogs */}
      {pricingTiers.map((tier) => (
        <ContactDialog
          key={`dialog-${tier.name}`}
          open={openDialog === tier.name}
          onOpenChange={(open) => {
            if (!open) handleDialogClose();
          }}
          title={
            tier.highlighted
              ? "Apply for the Intro Offer"
              : "Book a Call — 12-Week In-Person Program"
          }
        />
      ))}
    </section>
  );
}
