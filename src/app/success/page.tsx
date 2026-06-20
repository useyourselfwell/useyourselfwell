"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Check, Mail, Sparkles, ArrowRight, Home } from "lucide-react";

export default function SuccessPage() {
  const nextSteps = [
    {
      title: "Check your inbox",
      desc: "You will receive an email shortly with your personal login link to the One Skill course."
    },
    {
      title: "Add us to your contacts",
      desc: "To ensure you receive course updates and replies, mark hello@useyourselfwell.com as a safe sender."
    },
    {
      title: "Watch the introductory video",
      desc: "In the meantime, you can explore the free video library to begin noticing your tension habits."
    }
  ];

  return (
    <section className="relative overflow-hidden py-24 md:py-32 min-h-[70vh] flex items-center justify-center">
      {/* Background Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent-light/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-xl px-6 text-center">
        
        {/* Success Card */}
        <div className="rounded-site border border-border bg-card p-8 md:p-12 shadow-md space-y-8">
          
          {/* Animated/Glowing Check Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent ring-4 ring-accent/5 animate-pulse">
            <Check className="h-8 w-8" />
          </div>

          <div className="space-y-3">
            <h1 className="font-playfair text-3xl font-medium leading-tight text-foreground md:text-4xl">
              Thank You.
            </h1>
            <p className="text-base text-accent font-medium">
              Your course registration is successful!
            </p>
          </div>

          {/* Next Steps List */}
          <div className="text-left border-y border-border/75 py-6 space-y-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/50 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" /> What happens next
            </h2>
            <ol className="space-y-4">
              {nextSteps.map((step, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground leading-none">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">
                      {step.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <p className="text-xs leading-relaxed text-muted">
            If you don&rsquo;t see the email within a few minutes, please check your spam folder or contact Christopher.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/"
              className={cn(
                "flex-1 inline-flex items-center justify-center gap-2 rounded-site bg-accent px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200",
                "hover:bg-accent/90 hover:shadow-md hover:scale-[1.02]",
              )}
            >
              <Home className="h-4 w-4" /> Back to Home
            </Link>
            <Link
              href="/videos"
              className={cn(
                "flex-1 inline-flex items-center justify-center gap-2 rounded-site border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-all duration-200",
                "hover:bg-muted hover:shadow-sm hover:scale-[1.02]",
              )}
            >
              Explore Video Library <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
