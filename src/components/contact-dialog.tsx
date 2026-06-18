"use client";

import { useState, type FormEvent } from "react";
import { cn, trackEvent } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
}

export function ContactDialog({
  open,
  onOpenChange,
  title = "Book a Discovery Call",
}: ContactDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });

      if (res.ok) {
        trackEvent("Discovery Call Click");
        setSubmitted(true);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      // Reset form state when closing
      setTimeout(() => {
        setName("");
        setEmail("");
        setPhone("");
        setSubmitted(false);
      }, 300);
    }
    onOpenChange(open);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Fill in your details below and we&rsquo;ll get back to you shortly.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <p className="text-lg font-medium text-foreground">
              Thanks for reaching out!
            </p>
            <p className="mt-2 text-sm text-muted">
              We&rsquo;ll be in touch soon to schedule your call.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={cn(
                  "w-full border border-border bg-background p-3 text-sm text-foreground",
                  "placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent",
                )}
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  "w-full border border-border bg-background p-3 text-sm text-foreground",
                  "placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent",
                )}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="contact-phone"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Phone
              </label>
              <input
                id="contact-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={cn(
                  "w-full border border-border bg-background p-3 text-sm text-foreground",
                  "placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent",
                )}
                placeholder="(555) 123-4567"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full bg-accent px-8 py-3 text-base text-white transition-colors",
                "hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60",
                "rounded-site",
              )}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
