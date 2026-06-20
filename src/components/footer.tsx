"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-5 px-6 py-8 sm:flex-row">
        <p className="font-playfair text-base font-medium text-foreground">
          Use Yourself Well
        </p>

        <nav className="flex gap-6 text-sm text-muted">
          <Link
            href="/one-skill"
            className="transition-colors duration-200 hover:text-accent"
          >
            One Skill
          </Link>
          <Link
            href="/videos"
            className="transition-colors duration-200 hover:text-accent"
          >
            Videos
          </Link>
          <Link
            href="/workshops"
            className="transition-colors duration-200 hover:text-accent"
          >
            Workshops
          </Link>
          <Link
            href="/about"
            className="transition-colors duration-200 hover:text-accent"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="transition-colors duration-200 hover:text-accent"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
