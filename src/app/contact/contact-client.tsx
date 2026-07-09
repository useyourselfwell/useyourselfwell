"use client";

import { useState, type FormEvent } from "react";
import { cn, trackEvent } from "@/lib/utils";
import Link from "next/link";
import { Mail, Phone, MapPin, CheckCircle, ArrowRight } from "lucide-react";

export function ContactClientPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.success) {
          trackEvent("Contact Form Submitted");
          setSubmitted(true);
        } else if (data.errors) {
          // The submission saved but Brevo emails failed — show the details
          console.error("Brevo errors:", data.errors);
          setSubmitted(true);
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Unable to send your message. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="relative overflow-hidden bg-foreground py-20 md:py-28">
        {/* Decorative orb */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent-light/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-5xl px-6">
          <div className="flex items-center gap-3">
            <hr className="w-10 border-t-2 border-accent" />
            <span className="font-inter text-xs font-medium uppercase tracking-[0.18em] text-accent">
              Get in Touch
            </span>
          </div>

          <h1 className="mt-6 font-playfair text-4xl font-medium leading-[1.15] text-background sm:text-5xl lg:text-6xl">
            Contact
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-background/65">
            Have a question about the work, or want to see if the Alexander Technique is right for you? I&rsquo;d love to hear from you.
          </p>
        </div>
      </section>

      {/* ── Main Content Grid ── */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16 items-start">
          
          {/* Left Column — Contact Info */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-playfair text-2xl font-medium text-foreground">
                Connect Directly
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Feel free to reach out via form, email, or phone. I typically respond to all inquiries within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">Email</p>
                  <a
                    href="mailto:hello@useyourselfwell.com"
                    className="mt-1 block text-base font-medium text-foreground transition-colors hover:text-accent"
                  >
                    hello@useyourselfwell.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">Phone</p>
                  <a
                    href="tel:+18013329504"
                    className="mt-1 block text-base font-medium text-foreground transition-colors hover:text-accent"
                  >
                    (801) 332-9504
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">Location</p>
                  <p className="mt-1 text-base font-medium text-foreground">
                    Bountiful, Utah
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-site border-l-2 border-accent/40 bg-accent-light/10 p-6 space-y-4">
              <p className="text-sm leading-relaxed text-foreground">
                <span className="font-semibold text-accent">Prefer to book direct? </span>
                You can start with a 9-week One Skill study or check out the self-guided course options.
              </p>
              <Link
                href="/one-skill"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent hover:text-accent/80 transition-colors"
              >
                Learn about One Skill <ArrowRight className="h-4.5 w-4.5" />
              </Link>
            </div>
          </div>

          {/* Right Column — Contact Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-site border border-border bg-card px-8 py-16 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <CheckCircle className="h-7 w-7" />
                </div>
                <h2 className="font-playfair text-2xl font-medium text-foreground">
                  Message Sent!
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                  Thanks for reaching out, {name}. I will get back to you as soon as possible.
                </p>
                <Link
                  href="/"
                  className="mt-8 inline-block rounded-site bg-accent px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-accent/90 hover:shadow-md"
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-site border border-border bg-card p-8 sm:p-10 shadow-sm"
              >
                <h2 className="font-playfair text-2xl font-medium text-foreground">
                  Send a Message
                </h2>
                <p className="mt-1 text-xs text-muted">
                  All fields are required.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground"
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
                          "w-full border border-border bg-background px-4 py-3 text-sm text-foreground transition-all",
                          "placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent",
                          "rounded-site",
                        )}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground"
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
                          "w-full border border-border bg-background px-4 py-3 text-sm text-foreground transition-all",
                          "placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent",
                          "rounded-site",
                        )}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className={cn(
                        "w-full border border-border bg-background px-4 py-3 text-sm text-foreground transition-all",
                        "placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent",
                        "rounded-site",
                      )}
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={cn(
                        "w-full resize-y border border-border bg-background px-4 py-3 text-sm text-foreground transition-all",
                        "placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent",
                        "rounded-site",
                      )}
                      placeholder="Tell me a bit about what brings you here..."
                    />
                  </div>
                </div>

                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "mt-8 w-full rounded-site bg-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200",
                    "hover:bg-accent/90 hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60",
                  )}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
          
        </div>
      </section>
    </>
  );
}
