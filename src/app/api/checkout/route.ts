import { NextResponse } from "next/server";
import Stripe from "stripe";
import { course } from "@/lib/course";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: course.priceId,
          quantity: 1,
        },
      ],
      customer_email: undefined, // collect email via Stripe Checkout fields
      billing_address_collection: "auto",
      consent_collection: {
        terms_of_service: "required",
      },
      payment_intent_data: {
        setup_future_usage: "off_session",
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout session creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
