"use client";

import { useState } from "react";
import {
  Elements,
  PaymentElement,
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
import { cn } from "@/lib/utils";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function PaymentForm({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (msg: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      onError(error.message ?? "Payment failed. Please try again.");
      setLoading(false);
    } else {
      onSuccess();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className={cn(
          "w-full rounded-site bg-accent px-6 py-3.5 text-base font-medium text-white shadow-sm",
          "transition-all duration-300 hover:bg-accent/90 hover:shadow-md",
          "disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {loading ? "Processing…" : "Pay $27"}
      </button>
    </form>
  );
}

export function PaymentDialog({ open, onOpenChange }: PaymentDialogProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleDialogOpen(open: boolean) {
    if (open && !clientSecret) {
      setStatus("loading");
      setErrorMessage("");
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
        });
        const data = await res.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setStatus("idle");
        } else {
          setStatus("error");
          setErrorMessage("Couldn't initialize payment. Please try again.");
        }
      } catch {
        setStatus("error");
        setErrorMessage("Network error. Please try again.");
      }
    }
    onOpenChange(open);
  }

  function handleSuccess() {
    setStatus("success");
  }

  function handleError(msg: string) {
    setErrorMessage(msg);
    setStatus("error");
  }

  function handleClose() {
    setStatus("idle");
    setClientSecret(null);
    setErrorMessage("");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Purchase One Skill</DialogTitle>
          <DialogDescription>
            Enter your payment details below. Your purchase is protected by a
            14-day money-back guarantee.
          </DialogDescription>
        </DialogHeader>

        {status === "loading" && (
          <div className="flex items-center justify-center py-10">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4 py-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
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
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <p className="text-lg font-medium text-foreground">
              Payment successful!
            </p>
            <p className="text-sm text-muted">
              Check your email for access to the course.
            </p>
            <button
              onClick={handleClose}
              className={cn(
                "rounded-site bg-accent px-8 py-2.5 text-sm font-medium text-white shadow-sm",
                "transition-all duration-300 hover:bg-accent/90",
              )}
            >
              Close
            </button>
          </div>
        )}

        {status === "error" && (
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
              onClick={() => setStatus("idle")}
              className={cn(
                "rounded-site bg-accent px-8 py-2.5 text-sm font-medium text-white shadow-sm",
                "transition-all duration-300 hover:bg-accent/90",
              )}
            >
              Try Again
            </button>
          </div>
        )}

        {status === "idle" && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm onSuccess={handleSuccess} onError={handleError} />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
}
