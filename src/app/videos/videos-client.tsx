"use client";

import { useState } from "react";
import Link from "next/link";
import { cn, trackEvent } from "@/lib/utils";
import { Video, Sparkles, ArrowRight, Play } from "lucide-react";

export function VideosClientPage() {
  const upcomingCategories = [
    {
      title: "Constructive Rest Guided Audio",
      description: "A 10-minute guided talk-through to help you release spine tension during your daily stop.",
      duration: "10 mins",
      tag: "Audio Guide"
    },
    {
      title: "Unclenching the Jaw & Neck",
      description: "Simple, practical awareness prompts to interrupt tension patterns while working at a desk.",
      duration: "5 mins",
      tag: "Quick Relief"
    },
    {
      title: "Bending and Reaching Basics",
      description: "An anatomical exploration of your hip joints to take the strain out of everyday housework.",
      duration: "8 mins",
      tag: "Movement coordination"
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
              Learning Library
            </span>
          </div>

          <h1 className="mt-6 font-playfair text-4xl font-medium leading-[1.15] text-background sm:text-5xl lg:text-6xl">
            Video Library
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-background/65">
            Free videos and guided explorations to help you notice tension, find ease, and practice the Alexander Technique in everyday life.
          </p>
        </div>
      </section>

      {/* ── Main Library Content ── */}
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24 space-y-16">
        
        {/* Featured Video */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
            <Sparkles className="h-4 w-4" /> Featured Video
          </div>
          
          <div className="overflow-hidden rounded-site border border-border bg-card shadow-md">
            {/* Embed Video */}
            <div className="aspect-video w-full bg-black relative">
              <iframe
                src="https://www.youtube.com/embed/zsSa_O0dfQA"
                title="One Skill — Alexander Technique Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0 absolute inset-0"
              />
            </div>
            
            <div className="p-6 md:p-8 space-y-4">
              <h2 className="font-playfair text-2xl font-medium text-foreground">
                One Skill — Alexander Technique Introduction
              </h2>
              <p className="text-sm leading-relaxed text-muted max-w-2xl">
                In this introductory session, Christopher explores the basic philosophy behind the Alexander Technique. You will learn what it means to stop bracing for impact, how posture relates to coordinates rather than stiffness, and how to start noticing strain habits today.
              </p>
            </div>
          </div>
        </section>

        {/* Library Expansion / Upcoming Content */}
        <section className="space-y-8">
          <div>
            <h2 className="font-playfair text-2xl font-medium text-foreground">
              Upcoming Content & Audio Guides
            </h2>
            <p className="mt-2 text-sm text-muted">
              More sessions and audio guides are added to the library regularly. Check back soon for new guides:
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {upcomingCategories.map((cat, idx) => (
              <div key={idx} className="rounded-site border border-border bg-card p-6 shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <span className="inline-block rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {cat.tag}
                  </span>
                  <h3 className="mt-3 font-semibold text-foreground text-sm leading-snug">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {cat.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-[11px] font-medium text-accent border-t border-border/55 pt-3">
                  <span className="flex items-center gap-1">
                    <Video className="h-3.5 w-3.5" /> {cat.duration}
                  </span>
                  <span className="italic text-muted font-normal">Coming soon</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA section: Free Email Access Form */}
        <VideoCtaSection />
      </div>
    </>
  );
}

function VideoCtaSection() {
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
        trackEvent("Free Intro Signup (Videos Page)");
        setSubmitted(true);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-site bg-foreground p-8 md:p-12 text-center relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
      />
      <h2 className="font-playfair text-2xl font-medium text-background relative z-10">
        Just Try It.
      </h2>
      <p className="mt-2 text-sm text-background/60 max-w-sm mx-auto relative z-10 mb-6">
        The digital course is completely free. Get instant access to the structured self-guided course and constructive rest guides.
      </p>

      <div className="relative z-10 max-w-md mx-auto">
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
    </section>
  );
}
