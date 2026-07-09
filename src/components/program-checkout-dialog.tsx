"use client";

import { useState, type FormEvent } from "react";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn, trackEvent } from "@/lib/utils";
import { program } from "@/lib/course";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const CAL_URL =
  process.env.NEXT_PUBLIC_CAL_URL ?? "https://cal.com";

// ─── Step 1: Registration ────────────────────────────────────────────────────

interface RegistrationData {
  name: string;
  email: string;
  interest: string;
}

function RegistrationStep({
  onNext,
}: {
  onNext: (data: RegistrationData) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onNext({ name, email, interest });
  }

  const inputClass = cn(
    "w-full rounded-site border border-border bg-white px-3 py-3 text-base text-foreground",
    "placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent",
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="prog-name"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Name
        </label>
        <input
          id="prog-name"
          type="text"
          required
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="prog-email"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Email
        </label>
        <input
          id="prog-email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="prog-interest"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          What are you hoping to change or improve?
        </label>
        <textarea
          id="prog-interest"
          rows={3}
          placeholder="Chronic tension, back pain, stress, performance under pressure…"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className={cn(
            inputClass,
            "resize-y",
          )}
        />
      </div>

      <button
        type="submit"
        className={cn(
          "w-full rounded-site bg-accent px-6 py-3.5 text-base font-medium text-white shadow-sm",
          "transition-all duration-300 hover:bg-accent/90 hover:shadow-md",
        )}
      >
        Continue to Payment →
      </button>
    </form>
  );
}

// ─── Step 2: Payment ─────────────────────────────────────────────────────────

function PaymentStep({
  clientSecret,
  name,
  email,
  onSuccess,
  onError,
}: {
  clientSecret: string;
  name: string;
  email: string;
  onSuccess: () => void;
  onError: (msg: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      onError("Card element not found.");
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement,
        billing_details: { name, email },
      },
    });

    if (error) {
      onError(error.message ?? "Payment failed. Please try again.");
      setLoading(false);
    } else {
      trackEvent("Program Purchase");
      onSuccess();
    }
  }

  const boxClass =
    "rounded-site border border-border bg-white px-3 py-3.5 min-h-[48px] transition-colors focus-within:border-accent focus-within:ring-1 focus-within:ring-accent";

  const elementStyle = {
    base: {
      fontSize: "16px",
      fontFamily: "Inter, sans-serif",
      color: "#23252A",
      "::placeholder": { color: "#90969C" },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Order summary */}
      <div className="rounded-site border border-border bg-accent-light/20 px-4 py-3 flex items-center justify-between">
        <span className="text-sm text-foreground font-medium">
          {program.name}
        </span>
        <span className="text-sm font-semibold text-accent">
          ${program.price}
        </span>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Card Number
        </label>
        <div className={boxClass}>
          <CardNumberElement options={{ style: elementStyle }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Expiry
          </label>
          <div className={boxClass}>
            <CardExpiryElement options={{ style: elementStyle }} />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            CVC
          </label>
          <div className={boxClass}>
            <CardCvcElement options={{ style: elementStyle }} />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className={cn(
          "w-full rounded-site bg-accent px-6 py-3.5 text-base font-medium text-white shadow-sm",
          "transition-all duration-300 hover:bg-accent/90 hover:shadow-md",
          "disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {loading ? "Processing…" : `Pay $${program.price}`}
      </button>

      <p className="text-center text-xs text-muted">
        Protected by a 14-day satisfaction guarantee
      </p>
    </form>
  );
}

// ─── Step 3: Success ─────────────────────────────────────────────────────────

function SuccessStep({ name, email }: { name: string; email: string }) {
  const calUrl = new URL(CAL_URL);
  if (name) calUrl.searchParams.set("name", name);
  if (email) calUrl.searchParams.set("email", email);
  return (
    <div className="space-y-6 py-4 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
        <svg
          className="h-7 w-7"
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

      <div>
        <p className="text-lg font-medium text-foreground">
          Payment confirmed, {name.split(" ")[0]}!
        </p>
        <p className="mt-2 text-sm text-muted">
          Now let&rsquo;s get your first lesson on the calendar.
        </p>
      </div>

      <a
        href={calUrl.toString()}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex w-full items-center justify-center gap-2 rounded-site bg-accent px-6 py-3.5 text-base font-medium text-white shadow-sm",
          "transition-all duration-300 hover:bg-accent/90 hover:shadow-md",
        )}
      >
        Schedule Your First Lesson →
      </a>

      <p className="text-xs text-muted">
        A receipt has been sent to your email.
      </p>
    </div>
  );
}

// ─── Orchestrator ─────────────────────────────────────────────────────────────

type Step = "registration" | "payment" | "success" | "error";

interface ProgramCheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProgramCheckoutDialog({
  open,
  onOpenChange,
}: ProgramCheckoutDialogProps) {
  const [step, setStep] = useState<Step>("registration");
  const [regData, setRegData] = useState<RegistrationData | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingIntent, setLoadingIntent] = useState(false);

  function handleClose() {
    // only reset if not mid-payment
    setStep("registration");
    setRegData(null);
    setClientSecret(null);
    setErrorMessage("");
    onOpenChange(false);
  }

  async function handleRegistration(data: RegistrationData) {
    setRegData(data);
    setLoadingIntent(true);

    try {
      const res = await fetch("/api/create-program-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, interest: data.interest }),
      });
      const json = await res.json();
      if (json.clientSecret) {
        setClientSecret(json.clientSecret);
        setStep("payment");
      } else {
        setErrorMessage("Couldn't initialize payment. Please try again.");
        setStep("error");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStep("error");
    } finally {
      setLoadingIntent(false);
    }
  }

  const stepLabels: Record<Step, string> = {
    registration: "1",
    payment: "2",
    success: "3",
    error: "!",
  };

  const titles: Record<Step, string> = {
    registration: "Reserve Your Spot",
    payment: "Complete Payment",
    success: "You're In!",
    error: "Something went wrong",
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{titles[step]}</DialogTitle>
          {step === "registration" && (
            <DialogDescription>
              One Skill Program — ${program.price} intro special (reg. ${program.regularPrice})
            </DialogDescription>
          )}
          {step === "payment" && (
            <DialogDescription>
              Your information is saved. Enter your card details to confirm.
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Step indicator */}
        {step !== "error" && (
          <div className="flex items-center gap-2 pb-1">
            {(["registration", "payment", "success"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                    step === s
                      ? "bg-accent text-white"
                      : (["registration", "payment", "success"].indexOf(step) >
                            ["registration", "payment", "success"].indexOf(s)
                          ? "bg-accent/20 text-accent"
                          : "bg-border text-muted"),
                  )}
                >
                  {["registration", "payment", "success"].indexOf(step) >
                  ["registration", "payment", "success"].indexOf(s)
                    ? "✓"
                    : i + 1}
                </div>
                {i < 2 && (
                  <div
                    className={cn(
                      "h-px w-8 transition-colors",
                      ["registration", "payment", "success"].indexOf(step) > i
                        ? "bg-accent/40"
                        : "bg-border",
                    )}
                  />
                )}
              </div>
            ))}
            <span className="ml-1 text-xs text-muted">
              {step === "registration"
                ? "Your info"
                : step === "payment"
                  ? "Payment"
                  : "Schedule"}
            </span>
          </div>
        )}

        {/* Step: Registration */}
        {step === "registration" && (
          <>
            {loadingIntent ? (
              <div className="flex items-center justify-center py-10">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
              </div>
            ) : (
              <RegistrationStep onNext={handleRegistration} />
            )}
          </>
        )}

        {/* Step: Payment */}
        {step === "payment" && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentStep
              clientSecret={clientSecret}
              name={regData?.name ?? ""}
              email={regData?.email ?? ""}
              onSuccess={() => setStep("success")}
              onError={(msg) => {
                setErrorMessage(msg);
                setStep("error");
              }}
            />
          </Elements>
        )}

        {/* Step: Success */}
        {step === "success" && <SuccessStep name={regData?.name ?? ""} email={regData?.email ?? ""} />}

        {/* Step: Error */}
        {step === "error" && (
          <div className="space-y-4 py-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="text-sm text-red-600">{errorMessage}</p>
            <button
              onClick={() => {
                setStep(clientSecret ? "payment" : "registration");
                setErrorMessage("");
              }}
              className={cn(
                "rounded-site bg-accent px-8 py-2.5 text-sm font-medium text-white shadow-sm",
                "transition-all duration-300 hover:bg-accent/90",
              )}
            >
              Try Again
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
