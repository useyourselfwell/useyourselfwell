"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "One Skill", href: "/one-skill" },
  { label: "Workshops", href: "/workshops" },
  { label: "Videos", href: "/videos" },
  { label: "About", href: "/about" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-foreground/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3"
        >
          <img src="/images/logo.png" alt="" className="h-12 sm:h-20 w-auto" />
          <span className="font-playfair text-2xl sm:text-3xl font-medium text-background mb-1 sm:mb-3">
            Use Yourself Well
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
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

        {/* Mobile Navigation Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md p-1.5 text-background/80 hover:text-background md:hidden focus:outline-none transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-white/5 bg-foreground/95 px-6 py-5 space-y-4 animate-fade-in absolute left-0 right-0 top-full shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-base font-medium text-background/80 transition-colors hover:text-background py-1"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className={cn(
              "block text-center rounded-site bg-accent px-4 py-2.5 text-base font-medium text-white",
              "transition-all duration-200 hover:bg-accent/85",
            )}
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
