"use client";

import { useState } from "react";
import { cn, trackEvent } from "@/lib/utils";
import Link from "next/link";
import { CheckCircle2, Award, BookOpen, Clock } from "lucide-react";

export default function AboutPage() {
  const philosophies = [
    {
      title: "Awareness Over Effort",
      description: "We don't try harder to get good posture. We become aware of the strain we're already adding, and we let it go.",
      icon: Award,
    },
    {
      title: "The Art of the Pause",
      description: "Between a stimulus and our response lies our power to choose. We learn to pause and choose freedom over habit.",
      icon: Clock,
    },
    {
      title: "Self-Directed Ease",
      description: "My goal is not to fix you, but to teach you how to coordinate yourself, giving you skills to use for a lifetime.",
      icon: BookOpen,
    },
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
              The Instructor
            </span>
          </div>

          <h1 className="mt-6 font-playfair text-4xl font-medium leading-[1.15] text-background sm:text-5xl lg:text-6xl">
            About Christopher
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-background/65">
            Helping people unlearn chronic strain and rediscover their body's natural coordinates since 2005.
          </p>
        </div>
      </section>

      {/* ── Main Bio Section ── */}
      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <div className="grid gap-12 md:grid-cols-5 items-center">
          <div className="md:col-span-2">
            <div className="relative mx-auto max-w-[280px] md:max-w-none">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-site bg-accent-light/40 ring-1 ring-border shadow-lg">
                <img
                  src="/images/ProfilePic.jpg"
                  alt="Christopher"
                  className="absolute inset-0 h-full w-full object-cover animate-fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent-light/20 to-transparent pointer-events-none" />
              </div>
              {/* Decorative behind border */}
              <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-site border border-accent/30" />
            </div>
          </div>

          <div className="md:col-span-3 space-y-6">
            <h2 className="font-playfair text-3xl font-medium text-foreground">
              Hi, I&rsquo;m Christopher.
            </h2>

            <p className="text-base leading-relaxed text-muted">
              I discovered the Alexander Technique in 2005, and it completely transformed my life. At the time, I was struggling with persistent back pain that constantly interfered with my day-to-day life and work.
            </p>

            <p className="text-base leading-relaxed text-muted">
              It wasn&rsquo;t long after starting my lessons that the back pain was completely gone. But more than that, I realized how much unnecessary physical and mental friction I had been carrying around. That experience of relief and agency is what drives everything I teach.
            </p>

            <p className="text-base leading-relaxed text-muted">
              Most people I work with are smart, capable, and trying very hard. In fact, that&rsquo;s often the problem. This work isn&rsquo;t about trying harder — it&rsquo;s about discovering the quiet freedom that happens when you stop bracing.
            </p>
          </div>
        </div>
      </section>

      {/* ── Teaching Philosophy ── */}
      <section className="bg-muted/30 border-y border-border/50 py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-playfair text-3xl font-medium text-foreground">
              Core Principles of My Teaching
            </h2>
            <p className="mt-4 text-sm text-muted">
              The Alexander Technique isn't a series of exercises. It is a refinement of how you respond to life.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {philosophies.map((item, idx) => (
              <div
                key={idx}
                className="rounded-site border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent mb-5">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-playfair text-lg font-medium text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Credentials ── */}
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <div className="rounded-site border border-border bg-card p-8 md:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-md">
              <h2 className="font-playfair text-2xl font-medium text-foreground">
                Professional Credentials
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                To become an Alexander Technique teacher, candidates must undergo a rigorous, three-year training certification comprising at least 1,600 hours of practical study.
              </p>
            </div>
            
            <ul className="space-y-4 md:border-l border-border/80 md:pl-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                <span className="text-sm font-medium text-foreground">
                  AMSAT Certified Instructor (American Society for the Alexander Technique)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                <span className="text-sm font-medium text-foreground">
                  1,600+ Hour Accredited Teacher Training Certification
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                <span className="text-sm font-medium text-foreground">
                  Over 15 Years of Active Teaching & Private Practice
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Call to Action: Free Email Signup ── */}
      <AboutCtaSection />
    </>
  );
}

function AboutCtaSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleFreeSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        trackEvent("Free Intro Signup (About Page)");
        setSubmitted(true);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-foreground py-16 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative max-w-2xl mx-auto px-6">
        <h2 className="font-playfair text-2xl font-medium text-background">
          Ready to explore the work?
        </h2>
        <p className="mt-2 text-sm text-background/60 max-w-sm mx-auto mb-6">
          Start with the free self-guided digital course to begin noticing tension habits today.
        </p>

        <div className="max-w-md mx-auto">
          {submitted ? (
            <p className="text-base font-medium text-accent">
              ✓ Check your inbox — free access is on its way.
            </p>
          ) : (
            <form
              onSubmit={handleFreeSubmit}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for free access"
                className={cn(
                  "min-w-0 flex-1 border border-white/20 bg-white/10 px-4 py-3 text-sm text-background",
                  "placeholder:text-background/40 focus:outline-none focus:ring-1 focus:ring-accent/60",
                  "rounded-site backdrop-blur-sm",
                )}
              />
              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "rounded-site bg-accent px-6 py-3 text-sm font-medium text-white shadow-sm whitespace-nowrap",
                  "transition-all duration-300 hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98]",
                  "disabled:cursor-not-allowed disabled:opacity-60",
                )}
              >
                {loading ? "Sending…" : "Get Free Access"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
