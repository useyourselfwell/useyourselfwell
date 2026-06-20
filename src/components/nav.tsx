"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "One Skill", href: "/one-skill" },
  { label: "Workshops", href: "/workshops" },
  { label: "Videos", href: "/videos" },
  { label: "About", href: "/about" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-foreground/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className={cn(
            "font-playfair text-2xl md:text-4xl font-medium text-background transition-colors duration-200",
            "hover:text-accent",
          )}
        >
          Use Yourself Well
        </Link>

        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-background/70 transition-colors duration-200 hover:text-background"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={cn(
              "rounded-site bg-accent px-4 py-1.5 text-sm font-medium text-white",
              "transition-all duration-200 hover:bg-accent/85 hover:shadow-sm",
            )}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
