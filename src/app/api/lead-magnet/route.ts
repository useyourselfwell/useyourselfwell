import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const errors: string[] = [];

    // Add contact to Brevo (upsert)
    if (process.env.BREVO_API_KEY) {
      const res = await fetch(
        `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "api-key": process.env.BREVO_API_KEY,
          },
          body: JSON.stringify({
            listIds: [parseInt(process.env.BREVO_LIST_ID || "3")],
            attributes: {
              LEAD_MAGNET: "5 Hidden Tension Habits",
            },
            updateEnabled: true,
          }),
        },
      );
      if (!res.ok) {
        const text = await res.text();
        errors.push(`Brevo contact: ${res.status} ${text}`);
      }
    } else {
      errors.push("BREVO_API_KEY is not set");
    }

    // Send email with PDF link via Brevo SMTP
    if (process.env.BREVO_API_KEY) {
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
          subject: "Your Free Guide: 5 Hidden Tension Habits",
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
                        <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 24px; color: #23252A; margin: 0 0 8px 0; font-weight: 500;">Here's your free guide.</h1>
                        <p style="font-size: 16px; color: #5E9C9D; line-height: 1.6; margin: 0 0 24px 0;">Thanks for downloading <strong style="color: #23252A;">The 5 Hidden Tension Habits Most People Never Notice</strong>.</p>
                        <p style="font-size: 14px; color: #5E9C9D; line-height: 1.6; margin: 0;">
                          <a href="https://useyourselfwell.com/guides/5-hidden-tension-habits.pdf" style="display: inline-block; background: #C47A4A; color: #F6F4EF; padding: 12px 24px; text-decoration: none; font-size: 14px;">Download the Guide</a>
                        </p>
                        <p style="font-size: 14px; color: #5E9C9D; line-height: 1.6; margin: 24px 0 0 0;">
                          Start noticing patterns immediately. If you have questions, feel free to reply.
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
      if (!smtpRes.ok) {
        const text = await smtpRes.text();
        errors.push(`Brevo SMTP: ${smtpRes.status} ${text}`);
      }
    } else {
      errors.push("BREVO_API_KEY is not set — cannot send guide email");
    }

    return NextResponse.json({ success: errors.length === 0, errors });
  } catch (error) {
    console.error("Lead magnet error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
