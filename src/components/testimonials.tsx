"use client";

import { cn } from "@/lib/utils";
import { testimonials, doctorQuotes } from "@/lib/course";

export function Testimonials() {
  return (
    <section className="bg-accent-light/40 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="font-playfair text-3xl font-medium leading-snug text-foreground md:text-4xl lg:text-5xl">
          What people are saying
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((item, i) => (
            <article
              key={i}
              className={cn(
                "relative flex flex-col border border-border bg-card p-8 rounded-site",
                "shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5",
              )}
            >
              {/* Decorative quotation mark */}
              <span
                aria-hidden="true"
                className="absolute right-6 top-4 font-playfair text-6xl leading-none text-accent/10 select-none"
              >
                &ldquo;
              </span>
              <blockquote className="relative flex-1 text-base leading-relaxed text-foreground">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <footer className="mt-6 flex items-center gap-2.5 text-sm font-medium text-muted">
                <span className="h-px w-4 bg-accent/50" />
                {item.author}
              </footer>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="font-playfair text-2xl font-medium text-foreground">
            What physicians say about the Alexander Technique
          </h3>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {doctorQuotes.map((item, i) => (
              <article key={i} className="flex flex-col border-l-2 border-accent/30 pl-5">
                <blockquote className="flex-1 text-base leading-relaxed text-muted italic">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <footer className="mt-4 text-sm font-medium text-foreground">
                  &mdash; {item.author}
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
