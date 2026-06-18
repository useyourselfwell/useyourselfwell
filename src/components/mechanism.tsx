"use client";

import { Eye, ArrowDownToLine, ArrowRightCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const mechanisms = [
  {
    icon: Eye,
    title: "Awareness",
    description:
      "Learn to notice the subtle tension habits you've been carrying for years. Not by changing anything \u2014 just by paying attention.",
  },
  {
    icon: ArrowDownToLine,
    title: "Release",
    description:
      "Discover what it feels like to let go of unnecessary effort. Not forcing relaxation, but allowing a natural ease to return.",
  },
  {
    icon: ArrowRightCircle,
    title: "Choice",
    description:
      "Build the skill of choosing a different response in everyday moments \u2014 sitting, standing, walking, breathing, and thinking.",
  },
];

export function Mechanism() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="font-playfair text-3xl font-medium leading-snug text-foreground md:text-4xl lg:text-5xl">
          It&rsquo;s not about fixing. It&rsquo;s about noticing,
          <br />
          releasing, and choosing differently.
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          The Alexander Technique is a skill of conscious awareness. It teaches
          you to recognize your patterns of tension so you can make a different
          choice.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {mechanisms.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group flex flex-col items-start transition-all duration-300"
              >
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full",
                    "bg-accent-light/60 text-accent ring-1 ring-accent/20",
                    "transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:ring-accent/50",
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-playfair text-xl font-medium text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
