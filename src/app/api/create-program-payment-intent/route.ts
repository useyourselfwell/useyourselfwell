import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const PROGRAM_PRICE_CENTS = 197 * 100; // $197

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, interest } = body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: PROGRAM_PRICE_CENTS,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        product: "One Skill Program",
        customerName: name ?? "",
        customerEmail: email ?? "",
        customerInterest: interest ?? "",
      },
      receipt_email: email ?? undefined,
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Program PaymentIntent creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
