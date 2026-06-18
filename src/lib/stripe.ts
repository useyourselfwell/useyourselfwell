import { course } from "./course";

export async function createPaymentIntent(): Promise<{
  clientSecret: string | null;
}> {
  try {
    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create payment intent:", error);
    return { clientSecret: null };
  }
}
