"use client";

import { cn } from "@/lib/utils";
import { testimonials, doctorQuotes } from "@/lib/course";

export function Testimonials() {
  return (
    <section className="bg-accent-light/40 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="">
          <h3 className="font-playfair text-3xl font-medium text-foreground mb-16">
            What physicians say about the Alexander Technique
          </h3>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {doctorQuotes.map((item, i) => (
              <article
                key={i}
                className="flex flex-col border-l-2 border-accent/30 pl-5"
              >
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
