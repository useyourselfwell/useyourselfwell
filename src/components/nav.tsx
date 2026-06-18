"use client";

import { cn } from "@/lib/utils";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-foreground/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a
          href="/"
          className={cn(
            "font-playfair text-4xl font-medium text-background transition-colors duration-200",
            "hover:text-accent",
          )}
        >
          Use Yourself Well
        </a>

        <a
          href="/contact"
          className={cn(
            "rounded-site bg-accent px-4 py-1.5 text-sm font-medium text-white",
            "transition-all duration-200 hover:bg-accent/85 hover:shadow-sm",
          )}
        >
          Contact Me
        </a>
      </div>
    </header>
  );
}
