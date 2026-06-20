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

export function ApplyDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [goals, setGoals] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          goals,
          offer: "Two Private Lessons ($147)",
        }),
      });

      if (res.ok) {
        trackEvent("Two Lessons Reservation Requested");
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
    setGoals("");
    setSubmitted(false);
    setError("");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Reserve Your Two Lessons</DialogTitle>
          <DialogDescription>
            Enter your details to request booking. Christopher will reach out
            within 24 hours to schedule your first lesson and coordinate payment
            ($147).
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
              Request Received!
            </p>
            <p className="mt-2 text-sm text-muted">
              Thanks, {name}. Check your email soon for scheduling times and
              payment instructions.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="apply-name"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                id="apply-name"
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
                htmlFor="apply-email"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="apply-email"
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

            <div>
              <label
                htmlFor="apply-goals"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                What are you hoping to address in these lessons? (optional)
              </label>
              <textarea
                id="apply-goals"
                rows={3}
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className={cn(
                  "w-full resize-y border border-border bg-background p-3 text-sm text-foreground",
                  "placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent",
                  "rounded-site",
                )}
                placeholder="Tell Christopher about any chronic tension, strain, or goals..."
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
              {loading ? "Submitting..." : "Submit Reservation Request"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
