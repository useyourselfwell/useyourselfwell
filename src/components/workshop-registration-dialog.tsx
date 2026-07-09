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

export function WorkshopRegistrationDialog({
  open,
  onOpenChange,
  workshopTitle,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workshopTitle: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/workshop-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, workshop: workshopTitle }),
      });

      if (res.ok) {
        trackEvent("Workshop Registration");
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Unable to submit. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setName("");
    setEmail("");
    setSubmitted(false);
    setError("");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Register for {workshopTitle}</DialogTitle>
          <DialogDescription>
            Workshops are free of charge, and you are welcome to bring a friend. Enter your name and email to secure your spot.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <svg
                className="h-6 w-6 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <p className="text-lg font-medium text-foreground">
              You&rsquo;re registered!
            </p>
            <p className="mt-2 text-sm text-muted">
              Thanks, {name}. Check your email for confirmation and next steps.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="ws-name"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                id="ws-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={cn(
                  "w-full border border-border bg-background p-3 text-sm text-foreground",
                  "placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent",
                  "rounded-site",
                )}
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="ws-email"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="ws-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  "w-full border border-border bg-background p-3 text-sm text-foreground",
                  "placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent",
                  "rounded-site",
                )}
                placeholder="you@example.com"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full rounded-site bg-accent px-8 py-3 text-base font-medium text-white transition-colors",
                "hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60",
              )}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
