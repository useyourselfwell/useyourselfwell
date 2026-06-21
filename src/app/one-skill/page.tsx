"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProgramCheckoutDialog } from "@/components/program-checkout-dialog";
import { program, freeIntro } from "@/lib/course";
import {
  ArrowRight,
  Compass,
  Mail,
  BookOpen,
  Layers,
  CheckCircle2,
  Gift,
} from "lucide-react";

export default function OneSkillPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const lessonItems = [
    {
      title: "Two Private Lessons with Christopher",
      description:
        "Hands-on, one-on-one sessions where you experience direct guidance in real time. This part of this work can't be taught through video alone.",
      icon: Compass,
    },
    {
      title: "The 3-Week One Skill Email Course",
      description:
        "A short daily series that reinforces what you experience in your lessons, so the awareness doesn't fade once you leave the room.",
      icon: Mail,
    },
  ];

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Background image */}
        <img
          src="/images/chris-working-2.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[right_center] md:object-center"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.75) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-4xl px-6">
          <div className="flex items-center gap-3">
            <hr className="w-10 border-t-2 border-accent" />
            <span className="font-inter text-xs font-medium uppercase tracking-[0.18em] text-accent">
              In Person Study
            </span>
          </div>

          <h1 className="mt-6 font-playfair text-4xl font-medium leading-[1.15] text-background sm:text-5xl lg:text-6xl">
            One Skill Program
          </h1>

          {/* Pricing */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-background/40 line-through text-lg">
              {program.regularPrice && `$${program.regularPrice}`}
            </span>
            <span className="text-3xl font-medium text-accent">
              ${program.price}
            </span>
            <span className="inline-flex items-center rounded-full bg-accent/20 px-3 py-0.5 text-xs font-semibold text-accent ring-1 ring-accent/30">
              Intro Special - Save ${program.savings}
            </span>
          </div>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-background/65">
            Two private lessons with Christopher, plus everything you need to
            make them count before, during, and after.
          </p>

          <div className="mt-8">
            <button
              onClick={() => setDialogOpen(true)}
              className={cn(
                "inline-flex items-center gap-2 rounded-site bg-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-all duration-200",
                "hover:bg-accent/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
              )}
            >
              Schedule Your First Lesson <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-2 text-xs text-background/40">{program.ctaNote}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24 space-y-20">
        {/* ── Introduction ── */}
        <section className="space-y-6 text-center max-w-2xl mx-auto">
          <p className="font-playfair text-xl md:text-2xl leading-relaxed text-foreground font-medium">
            You already know how to push through. Brace harder, grit your teeth,
            force the rep, the set, the moment.
          </p>
          <p className="text-base leading-relaxed text-muted">
            What you don&rsquo;t know (because you can&rsquo;t see it from
            inside your own body) is what&rsquo;s actually happening underneath
            all that effort. This is where someone in the room shows you.
          </p>
        </section>

        {/* ── Why Two Lessons? ──
        <section className="rounded-site border border-border bg-card p-8 md:p-12 shadow-sm space-y-6">
          <h2 className="font-playfair text-2xl font-medium text-foreground">
            Why two lessons?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 text-base leading-relaxed text-muted">
            <p>
              One lesson gives you a glimpse. Two lessons give you a comparison
              — a clear, felt sense of before and after, and enough time to
              start noticing the habit on your own between sessions.
            </p>
            <p className="font-medium text-foreground md:border-l md:border-border md:pl-6">
              This isn&rsquo;t a sample. It&rsquo;s a real beginning.
            </p>
          </div>
        </section> */}

        {/* ── What's Included ── */}
        <section className="space-y-8">
          <div>
            <h2 className="font-playfair text-3xl font-medium text-foreground">
              What&rsquo;s included
            </h2>
            <p className="mt-2 text-sm text-muted">
              Everything in the program to support your initial transformation:
            </p>
          </div>

          {/* Lesson cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {lessonItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-site border border-border bg-card p-6 shadow-sm space-y-4"
              >
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

          {/* Free digital course included */}
          <div className="rounded-site border border-accent/20 bg-accent-light/10 p-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <Gift className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">
                    {freeIntro.name}
                  </h3>
                  <p className="text-xs text-accent font-medium uppercase tracking-wider">
                    Included free
                  </p>
                </div>
              </div>
              <span className="text-sm text-muted max-w-sm">
                {freeIntro.description}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 border-t border-accent/20 pt-6">
              {freeIntro.bonuses.map((bonus, idx) => (
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
            You won&rsquo;t leave with a fix. You&rsquo;ll leave with a felt
            sense of what&rsquo;s possible and a clear next step, if you want to
            keep going.
          </p>
          <div className="pt-2 flex flex-col items-center gap-2">
            <button
              onClick={() => setDialogOpen(true)}
              className={cn(
                "inline-flex items-center gap-2 rounded-site bg-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-all duration-200",
                "hover:bg-accent/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
              )}
            >
              Schedule Your First Lesson - $197{" "}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* ── What Happens After? ── */}
        <section className="rounded-site border border-border bg-card p-8 md:p-10 shadow-sm space-y-4">
          <h2 className="font-playfair text-2xl font-medium text-foreground">
            What happens after?
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            Some people stop here, with two lessons and a set of tools they can
            use for life.
          </p>
          <p className="text-sm leading-relaxed text-muted">
            Others realize two lessons is only the beginning, and choose to go
            deeper with the full study. That conversation happens after your
            second lesson, when you have a real, felt sense of what&rsquo;s
            possible.
          </p>
        </section>

        {/* ── Testimonial ── */}
        <section className="text-center space-y-5 max-w-2xl mx-auto">
          <h2 className="font-playfair text-2xl font-medium text-foreground">
            What people are saying
          </h2>
          <div className="aspect-video w-full overflow-hidden rounded-site shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/uwS3RzwbvpE"
              title="Seth Godin on the Alexander Technique"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        </section>
      </div>

      {/* ── Ready to Begin Banner ── */}
      <section className="relative overflow-hidden bg-foreground py-20 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
        />
        <div className="relative max-w-2xl mx-auto px-6 space-y-4">
          <h2 className="font-playfair text-3xl font-medium text-background">
            Ready to begin?
          </h2>

          <div className="pt-2 flex flex-col items-center gap-2">
            <button
              onClick={() => setDialogOpen(true)}
              className={cn(
                "rounded-site bg-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition-colors",
                "hover:bg-accent/90",
              )}
            >
              Schedule Your First Lesson - $197
            </button>
          </div>
        </div>
      </section>

      <ProgramCheckoutDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
