import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    if (!process.env.BREVO_API_KEY) {
      return NextResponse.json(
        {
          error:
            "Brevo is not configured. Add BREVO_API_KEY to your environment variables.",
        },
        { status: 500 },
      );
    }

    const listId = parseInt(process.env.BREVO_LIST_ID || "");
    if (isNaN(listId)) {
      return NextResponse.json(
        { error: "BREVO_LIST_ID is not set to a valid number." },
        { status: 500 },
      );
    }

    const createRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        attributes: {
          LEAD_MAGNET: "The One Skill Guide",
        },
      }),
    });

    // 409 means contact already exists — that's fine
    if (!createRes.ok && createRes.status !== 409) {
      const text = await createRes.text();
      console.error("Brevo create contact:", createRes.status, text);
      return NextResponse.json(
        { error: "Failed to add contact to list." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("One Skill signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
