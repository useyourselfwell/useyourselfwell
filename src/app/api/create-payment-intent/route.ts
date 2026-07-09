import { NextResponse } from "next/server";
import Stripe from "stripe";
import { course } from "@/lib/course";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST() {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: course.price * 100, // cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("PaymentIntent creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
