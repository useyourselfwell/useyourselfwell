"use client";

import { useState, type FormEvent } from "react";
import { cn, trackEvent } from "@/lib/utils";
import Link from "next/link";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";

export default function ContactPage() {
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
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        {/* Left — contact info */}
        <div className="lg:col-span-2">
          <h1 className="font-playfair text-4xl font-medium text-foreground sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Have a question about the work, or want to see if the Alexander
            Technique is right for you? I&rsquo;d love to hear from you.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex items-start gap-4">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <a
                  href="mailto:hello@useyourselfwell.com"
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  hello@useyourselfwell.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-medium text-foreground">Phone</p>
                <a
                  href="tel:+18013329504"
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  (801) 332-9504
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-medium text-foreground">Location</p>
                <p className="text-sm text-muted">Bountiful, Utah</p>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <p className="text-sm leading-relaxed text-muted">
              Prefer to book a discovery call directly?{" "}
              <Link
                href="/#course"
                className="font-medium text-accent underline underline-offset-2 transition-colors hover:text-accent/80"
              >
                Start with One Skill
              </Link>{" "}
              or send a message and I&rsquo;ll get back to you within 24 hours.
            </p>
          </div>
        </div>

        {/* Right — contact form */}
        <div className="lg:col-span-3">
          {submitted ? (
            <div className="flex flex-col items-center justify-center rounded-site border border-border bg-card px-8 py-16 text-center">
              <CheckCircle className="mb-4 h-12 w-12 text-accent" />
              <h2 className="font-playfair text-2xl font-medium text-foreground">
                Message Sent!
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                Thanks for reaching out, {name}. I typically respond within 24
                hours.
              </p>
              <Link
                href="/#course"
                className="mt-8 inline-block rounded-site bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
              >
                Back to the Course
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-site border border-border bg-card p-8 sm:p-10"
            >
              <h2 className="font-playfair text-2xl font-medium text-foreground">
                Send a Message
              </h2>
              <p className="mt-1 text-sm text-muted">
                All fields are required unless marked optional.
              </p>

              <div className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
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
                        "rounded-site",
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
                        "rounded-site",
                      )}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-1.5 block text-sm font-medium text-foreground"
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
                      "w-full border border-border bg-background p-3 text-sm text-foreground",
                      "placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent",
                      "rounded-site",
                    )}
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={cn(
                      "w-full resize-y border border-border bg-background p-3 text-sm text-foreground",
                      "placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent",
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
                  "mt-8 w-full rounded-site bg-accent px-8 py-3 text-base font-medium text-white transition-colors",
                  "hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60",
                )}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
