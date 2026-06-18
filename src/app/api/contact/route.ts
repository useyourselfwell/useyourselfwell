import { NextResponse } from "next/server";

interface ContactRequestBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

async function upsertBrevoContact(
  email: string,
  name: string,
): Promise<string | null> {
  if (!process.env.BREVO_API_KEY) return "BREVO_API_KEY is not set";

  // Use PUT with updateEnabled to upsert — works whether contact exists or not
  const res = await fetch(
    `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        attributes: {
          FIRSTNAME: name,
          CONTACT_SOURCE: "Contact Form",
        },
        listIds: [parseInt(process.env.BREVO_LIST_ID || "2")],
        updateEnabled: true,
      }),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    return `Brevo contact API returned ${res.status}: ${text}`;
  }

  return null;
}

async function sendTransactionalEmail(
  toEmail: string,
  toName: string,
  subjectLine: string,
  html: string,
): Promise<string | null> {
  if (!process.env.BREVO_API_KEY) return "BREVO_API_KEY is not set";

  const fromEmail =
    process.env.BREVO_FROM_EMAIL || "christopher@useyourselfwell.com";
  const fromName = process.env.BREVO_FROM_NAME || "Use Yourself Well";

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { email: fromEmail, name: fromName },
      to: [{ email: toEmail, name: toName }],
      subject: subjectLine,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return `Brevo SMTP API returned ${res.status}: ${text}`;
  }

  return null;
}

function buildContactEmailHtml(name: string) {
  return `
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
                  <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 24px; margin: 0 0 16px 0; font-weight: 500; color: #23252A;">Thanks for reaching out</h1>
                  <p style="color: #304F50; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">Hi ${name},</p>
                  <p style="color: #304F50; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">I've received your message and will get back to you within 24 hours. I look forward to connecting with you.</p>
                  <p style="color: #304F50; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">In the meantime, you're welcome to explore the <a href="https://useyourselfwell.com/#course" style="color: #C47A4A;">One Skill course</a> to get started.</p>
                  <table style="margin-top: 24px;">
                    <tr>
                      <td align="center" style="background: #C47A4A; border-radius: 8px; padding: 12px 32px;">
                        <a href="https://useyourselfwell.com/#course" style="color: #FFFFFF; text-decoration: none; font-size: 15px; font-weight: 500;">Explore One Skill</a>
                      </td>
                    </tr>
                  </table>
                  <hr style="border: none; border-top: 1px solid #E5E2DC; margin: 32px 0;" />
                  <p style="color: #6B6B65; font-size: 13px; line-height: 1.5; margin: 0;">Christopher Neville<br />Use Yourself Well<br />Bountiful, Utah</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

function buildInternalEmailHtml(
  name: string,
  email: string,
  subject: string,
  message: string,
) {
  return `
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
                  <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 24px; margin: 0 0 16px 0; font-weight: 500;">New Contact Message</h1>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr><td style="padding: 6px 0; color: #6B6B65; font-size: 14px;">Name</td></tr>
                    <tr><td style="padding: 0 0 12px 0; color: #1C1C1A; font-size: 16px;">${name}</td></tr>
                    <tr><td style="padding: 6px 0; color: #6B6B65; font-size: 14px;">Email</td></tr>
                    <tr><td style="padding: 0 0 12px 0; color: #1C1C1A; font-size: 16px;"><a href="mailto:${email}" style="color: #7C6F5B;">${email}</a></td></tr>
                    <tr><td style="padding: 6px 0; color: #6B6B65; font-size: 14px;">Subject</td></tr>
                    <tr><td style="padding: 0 0 12px 0; color: #1C1C1A; font-size: 16px;">${subject}</td></tr>
                    <tr><td style="padding: 6px 0; color: #6B6B65; font-size: 14px;">Message</td></tr>
                    <tr><td style="padding: 0 0 12px 0; color: #1C1C1A; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</td></tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequestBody;
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const errors: string[] = [];

    // 1. Create / update the contact in Brevo
    const contactErr = await upsertBrevoContact(email, name);
    if (contactErr) {
      console.error("Brevo contact upsert error:", contactErr);
      errors.push(contactErr);
    }

    // 2. Send transactional email to the contact (acknowledgement)
    const ackErr = await sendTransactionalEmail(
      email,
      name,
      "Thanks for reaching out — Use Yourself Well",
      buildContactEmailHtml(name),
    );
    if (ackErr) {
      console.error("Brevo acknowledgement email error:", ackErr);
      errors.push(ackErr);
    }

    // 3. Send transactional email to us (notification)
    const christopherEmail =
      process.env.CHRISTOPHER_EMAIL || "christopher@useyourselfwell.com";
    const notifyErr = await sendTransactionalEmail(
      christopherEmail,
      "Christopher",
      `New Contact: ${name} — ${subject}`,
      buildInternalEmailHtml(name, email, subject, message),
    );
    if (notifyErr) {
      console.error("Brevo notification email error:", notifyErr);
      errors.push(notifyErr);
    }

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 200 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
