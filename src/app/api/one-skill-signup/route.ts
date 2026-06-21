import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const errors: string[] = [];
    const secretLink = "https://useyourselfwell.com/guides/one-skill";

    if (!process.env.BREVO_API_KEY) {
      return NextResponse.json(
        {
          error:
            "Brevo is not configured. Add BREVO_API_KEY to your environment variables.",
        },
        { status: 500 },
      );
    }

    // ── Step 1: Create or update the contact in Brevo ──
    const listId = parseInt(process.env.BREVO_LIST_ID || "");
    if (isNaN(listId)) {
      return NextResponse.json(
        { error: "BREVO_LIST_ID is not set to a valid number." },
        { status: 500 },
      );
    }

    // Try creating the contact first (POST). If it already exists (409), update it (PUT).
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

    if (!createRes.ok && createRes.status !== 409) {
      const text = await createRes.text();
      errors.push(`Brevo create contact: ${createRes.status} ${text}`);
    }

    // Also send email with the secret link via Brevo SMTP
    const fromEmail =
      process.env.BREVO_FROM_EMAIL || "hello@useyourselfwell.com";
    const fromName = process.env.BREVO_FROM_NAME || "Use Yourself Well";

    const smtpRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { email: fromEmail, name: fromName },
        to: [{ email }],
        subject: "Your Guide: The One Skill",
        htmlContent: `
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
                      <p style="font-size: 16px; color: #304F50; line-height: 1.6; margin: 0 0 16px 0;">Hey {{ contact.FIRSTNAME }},</p>
                      <p style="font-size: 16px; color: #304F50; line-height: 1.6; margin: 0 0 16px 0;">Welcome. Your copy of <strong style="color: #23252A;">The One Skill — Notice. Lighten. Repeat.</strong> is ready.</p>
                      <p style="font-size: 16px; color: #304F50; line-height: 1.6; margin: 0 0 24px 0;">
                        Inside you&rsquo;ll find the full guide plus a short video introduction. It&rsquo;s two moves, three seconds, and no extra time carved out of a day that doesn&rsquo;t have any to spare.
                      </p>
                      <p style="margin: 0 0 24px 0;">
                        <a href="${secretLink}" style="display: inline-block; background: #C47A4A; color: #F6F4EF; padding: 12px 24px; text-decoration: none; font-size: 15px; font-weight: 500;">Read The One Skill →</a>
                      </p>
                      <p style="font-size: 16px; color: #304F50; line-height: 1.6; margin: 0 0 16px 0;">
                        Once you&rsquo;ve read it, try the two moves right where you are. Most people are surprised how much shifts in just a few seconds.
                      </p>
                      <p style="font-size: 16px; color: #304F50; line-height: 1.6; margin: 0 0 16px 0;">Got questions? Just hit reply. I read every message.</p>
                      <p style="font-size: 16px; color: #304F50; line-height: 1.6; margin: 0;">Christopher</p>
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

    if (!smtpRes.ok) {
      const text = await smtpRes.text();
      errors.push(`Brevo SMTP: ${smtpRes.status} ${text}`);
    }

    if (errors.length > 0) {
      console.error("One Skill signup errors:", errors);
      return NextResponse.json({ error: errors.join("; ") }, { status: 500 });
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
