"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ApplyDialog } from "@/components/apply-dialog";
import { ArrowRight, Compass, Mail, BookOpen, Layers, CheckCircle2 } from "lucide-react";

export default function OneSkillPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const includedItems = [
    {
      title: "Two Private Lessons with Christopher",
      description: "Hands-on, one-on-one sessions where you experience direct guidance in real time — the part of this work that can't be taught through video alone.",
      icon: Compass,
    },
    {
      title: "The 3-Week One Skill Email Course",
      description: "A short daily series that reinforces what you experience in your lessons, so the awareness doesn't fade once you leave the room.",
      icon: Mail,
    },
  ];

  const digitalBonuses = [
    {
      title: "The Deep Stop",
      description: "A guide to constructive rest — one of the simplest, most powerful tools for releasing unnecessary tension."
    },
    {
      title: "In the Face of the Other",
      description: "How to apply the skill in conversations, meetings, and other social situations — where most people lose their awareness fastest."
    },
    {
      title: "The Daily Five",
      description: "A short daily checklist to help the habit of noticing stick, long after your two lessons are over."
    }
  ];

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="relative overflow-hidden bg-foreground py-20 md:py-28">
        {/* Decorative orb */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent-light/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-4xl px-6">
          <div className="flex items-center gap-3">
            <hr className="w-10 border-t-2 border-accent" />
            <span className="font-inter text-xs font-medium uppercase tracking-[0.18em] text-accent">
              In Person Study
            </span>
          </div>

          <h1 className="mt-6 font-playfair text-4xl font-medium leading-[1.15] text-background sm:text-5xl lg:text-6xl">
            One Skill: In Person
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-background/65">
            Two private lessons with Christopher — and everything you need to make them count.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24 space-y-20">
        
        {/* ── Introduction ── */}
        <section className="space-y-8 text-center max-w-2xl mx-auto">
          <p className="font-playfair text-xl md:text-2xl leading-relaxed text-foreground font-medium">
            You&rsquo;ve felt what it&rsquo;s like to push through tension, brace through stress, and try harder than the moment requires.
          </p>
          <p className="text-base leading-relaxed text-muted">
            This is where you start doing something different — with someone in the room who can show you, in real time, what you can&rsquo;t see in yourself.
          </p>
          <div className="pt-4">
            <button
              onClick={() => setDialogOpen(true)}
              className={cn(
                "inline-flex items-center gap-2 rounded-site bg-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-all duration-200",
                "hover:bg-accent/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
              )}
            >
              Reserve Your Two Lessons — $147 <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* ── Why Two Lessons? ── */}
        <section className="rounded-site border border-border bg-card p-8 md:p-12 shadow-sm space-y-6">
          <h2 className="font-playfair text-2xl font-medium text-foreground">
            Why two lessons?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 text-base leading-relaxed text-muted">
            <p>
              One lesson gives you a glimpse. Two lessons give you a comparison — a clear, felt sense of before and after, and enough time to start noticing the habit on your own between sessions.
            </p>
            <p className="font-medium text-foreground md:border-l md:border-border md:pl-6">
              This isn&rsquo;t a sample. It&rsquo;s a real beginning.
            </p>
          </div>
        </section>

        {/* ── What's Included ── */}
        <section className="space-y-8">
          <div>
            <h2 className="font-playfair text-3xl font-medium text-foreground">
              What&rsquo;s included
            </h2>
            <p className="mt-2 text-sm text-muted">
              Everything provided in the package to support your initial transformation:
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {includedItems.map((item, idx) => (
              <div key={idx} className="rounded-site border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground text-lg">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Digital Course Included Card */}
          <div className="rounded-site border border-accent/20 bg-accent-light/10 p-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">
                    One Skill — Digital Course
                  </h3>
                  <p className="text-xs text-accent font-medium uppercase tracking-wider">
                    Included free ($27 value)
                  </p>
                </div>
              </div>
              <span className="text-sm text-muted max-w-sm">
                The complete introduction to the work, so you arrive at your first lesson already understanding the core idea.
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 border-t border-accent/20 pt-6">
              {digitalBonuses.map((bonus, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                    {bonus.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-muted">
                    {bonus.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── This is Not a Trial ── */}
        <section className="text-center space-y-6 max-w-2xl mx-auto py-8">
          <h2 className="font-playfair text-3xl font-medium text-foreground">
            This is not a trial. It&rsquo;s a beginning.
          </h2>
          <p className="text-base leading-relaxed text-muted">
            You won&rsquo;t leave with a fix. You&rsquo;ll leave with a felt sense of what&rsquo;s possible — and a clear next step, if you want to keep going.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setDialogOpen(true)}
              className={cn(
                "inline-flex items-center gap-2 rounded-site bg-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-all duration-200",
                "hover:bg-accent/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
              )}
            >
              Reserve Your Two Lessons — $147 <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* ── What Happens After? ── */}
        <section className="rounded-site border border-border bg-card p-8 md:p-10 shadow-sm space-y-4">
          <h2 className="font-playfair text-2xl font-medium text-foreground">
            What happens after?
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            Some people stop here, with two lessons and a set of tools they can use for life.
          </p>
          <p className="text-sm leading-relaxed text-muted">
            Others realize two lessons is only the beginning — and choose to go deeper with the full Study. That conversation happens after your second lesson, when you have a real, felt sense of what&rsquo;s possible.
          </p>
        </section>

      </div>

      {/* ── Ready to Begin Banner ── */}
      <section className="relative overflow-hidden bg-foreground py-20 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
        />
        <div className="relative max-w-2xl mx-auto px-6 space-y-6">
          <h2 className="font-playfair text-3xl font-medium text-background">
            Ready to begin?
          </h2>
          <p className="text-sm text-background/60 max-w-sm mx-auto">
            Book your two-lesson private study package today to start coordinate unlearning.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setDialogOpen(true)}
              className={cn(
                "rounded-site bg-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition-colors",
                "hover:bg-accent/90",
              )}
            >
              Reserve Your Two Lessons — $147
            </button>
          </div>
        </div>
      </section>

      <ApplyDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
