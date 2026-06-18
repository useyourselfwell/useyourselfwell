import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import { course } from "@/lib/course";

function isSupabaseConfigured() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

async function addToBrevo(email: string) {
  if (!process.env.BREVO_API_KEY) return;

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [parseInt(process.env.BREVO_LIST_ID || "2")],
        attributes: {
          PRODUCT: course.name,
        },
      }),
    });

    if (!response.ok) {
      console.error("Brevo add contact failed:", await response.text());
    }
  } catch (error) {
    console.error("Brevo error:", error);
  }
}

async function sendConfirmationEmail(email: string) {
  if (!process.env.RESEND_API_KEY) return;

  const moduleLinks = course.modules
    .map(
      (mod, i) =>
        `<tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #E0DDD4;">
            <strong style="color: #C47A4A;">Module ${mod.number}:</strong>
            <span style="color: #23252A;">${mod.title}</span>
            <br/>
            <a href="https://www.youtube.com/playlist?list=PLACEHOLDER_${i + 1}" style="color: #5E9C9D; font-size: 13px;">Watch Module ${mod.number} →</a>
          </td>
        </tr>`,
    )
    .join("");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `Use Yourself Well <${process.env.RESEND_FROM_EMAIL || "hello@useyourselfwell.com"}>`,
        to: [email],
        subject: `Welcome to ${course.name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8"></head>
          <body style="font-family: Inter, -apple-system, sans-serif; background: #F6F4EF; margin: 0; padding: 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding: 40px 0;">
                  <table width="560" cellpadding="0" cellspacing="0" style="background: #FFFFFF; border: 1px solid #E0DDD4;">
                    <tr>
                      <td style="padding: 40px;">
                        <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; color: #23252A; margin: 0 0 8px 0; font-weight: 500;">Thank you for your purchase.</h1>
                        <p style="font-size: 16px; color: #5E9C9D; line-height: 1.6; margin: 0 0 24px 0;">You now have access to <strong style="color: #23252A;">${course.name}</strong>. Below are your modules.</p>

                        <table width="100%" cellpadding="0" cellspacing="0">
                          ${moduleLinks}
                        </table>

                        <p style="font-size: 14px; color: #5E9C9D; line-height: 1.6; margin: 24px 0 0 0;">
                          Watch at your own pace. Most people notice something in the very first module.
                        </p>
                        <p style="font-size: 14px; color: #5E9C9D; line-height: 1.6; margin: 8px 0 0 0;">
                          If you have any questions, reply to this email.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      }),
    });

    if (!response.ok) {
      console.error("Resend email failed:", await response.text());
    }
  } catch (error) {
    console.error("Resend error:", error);
  }
}

async function handlePurchase(email: string, stripeId: string) {
  // Insert purchase into Supabase
  if (isSupabaseConfigured() && supabase) {
    try {
      await (supabase.from("purchases") as any).insert({
        email,
        stripe_session_id: stripeId,
        product: course.name,
      });
    } catch (error) {
      console.error("Supabase insert failed:", error);
    }
  } else {
    console.log("Supabase not configured, skipping purchase record.");
  }

  // Add to Brevo
  await addToBrevo(email);

  // Send confirmation email
  await sendConfirmationEmail(email);
}

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || "",
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email || session.customer_details?.email;

    if (!email) {
      console.error("No email from checkout session");
      return NextResponse.json({ error: "No email" }, { status: 400 });
    }

    await handlePurchase(email, session.id);
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object as Stripe.PaymentIntent;
    const email =
      pi.receipt_email ||
      (pi.latest_charge
        ? (await stripe.charges.retrieve(pi.latest_charge as string))
            .billing_details?.email
        : undefined);

    if (!email) {
      console.error("No email from payment intent");
      return NextResponse.json({ error: "No email" }, { status: 400 });
    }

    await handlePurchase(email, pi.id);
  }

  return NextResponse.json({ received: true });
}
