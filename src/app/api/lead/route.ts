import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, phone } = await request.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: "Name and email required" },
        { status: 400 }
      );
    }

    // Email Christopher via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: `Use Yourself Well <${process.env.RESEND_FROM_EMAIL || "hello@useyourselfwell.com"}>`,
            to: [process.env.CHRISTOPHER_EMAIL || "christopher@useyourselfwell.com"],
            replyTo: email,
            subject: `New Lead: ${name} — Discovery Call Request`,
            html: `
              <!DOCTYPE html>
              <html>
              <head><meta charset="utf-8"></head>
              <body style="font-family: Inter, -apple-system, sans-serif; background: #FAFAF8; margin: 0; padding: 0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding: 40px 0;">
                      <table width="560" cellpadding="0" cellspacing="0" style="background: #FFFFFF; border: 1px solid #E5E2DC;">
                        <tr>
                          <td style="padding: 40px;">
                            <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 24px; margin: 0 0 16px 0; font-weight: 500;">New Lead</h1>
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr><td style="padding: 6px 0; color: #6B6B65; font-size: 14px;">Name</td></tr>
                              <tr><td style="padding: 0 0 12px 0; color: #1C1C1A; font-size: 16px;">${name}</td></tr>
                              <tr><td style="padding: 6px 0; color: #6B6B65; font-size: 14px;">Email</td></tr>
                              <tr><td style="padding: 0 0 12px 0; color: #1C1C1A; font-size: 16px;"><a href="mailto:${email}" style="color: #7C6F5B;">${email}</a></td></tr>
                              <tr><td style="padding: 6px 0; color: #6B6B65; font-size: 14px;">Phone</td></tr>
                              <tr><td style="padding: 0 0 12px 0; color: #1C1C1A; font-size: 16px;">${phone || "Not provided"}</td></tr>
                            </table>
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
      } catch (error) {
        console.error("Resend lead email error:", error);
      }
    }

    // Also add to Brevo
    if (process.env.BREVO_API_KEY) {
      try {
        await fetch("https://api.brevo.com/v3/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": process.env.BREVO_API_KEY,
          },
          body: JSON.stringify({
            email,
            attributes: {
              FIRSTNAME: name,
              PHONE: phone || "",
              LEAD_SOURCE: "Discovery Call",
            },
            listIds: [parseInt(process.env.BREVO_LIST_ID || "2")],
          }),
        });
      } catch (error) {
        console.error("Brevo lead contact error:", error);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead route error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
