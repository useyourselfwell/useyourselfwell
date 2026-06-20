import { NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_WORKSHOP_LIST_ID = parseInt(
  process.env.BREVO_WORKSHOP_LIST_ID || "5",
);
const CHRISTOPHER_EMAIL =
  process.env.CHRISTOPHER_EMAIL || "christopher@useyourselfwell.com";
const FROM_EMAIL =
  process.env.BREVO_FROM_EMAIL || "hello@useyourselfwell.com";
const FROM_NAME = process.env.BREVO_FROM_NAME || "Use Yourself Well";

async function sendBrevoEmail(
  toEmail: string,
  toName: string,
  subject: string,
  html: string,
) {
  if (!BREVO_API_KEY) return "BREVO_API_KEY not set";

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { email: FROM_EMAIL, name: FROM_NAME },
      to: [{ email: toEmail, name: toName }],
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return `Brevo SMTP error: ${res.status} ${text}`;
  }

  return null;
}

async function upsertBrevoContact(
  email: string,
  name: string,
  workshop: string,
) {
  if (!BREVO_API_KEY) return;

  await fetch(
    `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        attributes: {
          FIRSTNAME: name,
          WORKSHOP: workshop,
          SOURCE: "Workshop Registration",
        },
        listIds: [BREVO_WORKSHOP_LIST_ID],
        updateEnabled: true,
      }),
    },
  ).catch((err) => console.error("Brevo upsert error:", err));
}

const confirmationEmailHtml = (name: string, workshop: string) => `
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
              <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 24px; margin: 0 0 16px 0; font-weight: 500; color: #23252A;">You're registered, ${name}!</h1>
              <p style="color: #304F50; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">Thanks for signing up for <strong>${workshop}</strong>. You'll receive a reminder with the Zoom link and details closer to the date.</p>
              <p style="color: #304F50; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">Workshops are free of charge. Feel free to bring a friend.</p>
              <p style="color: #304F50; font-size: 16px; line-height: 1.6; margin: 0;">If you have any questions in the meantime, just reply to this email.</p>
              <hr style="border: none; border-top: 1px solid #E5E2DC; margin: 32px 0;" />
              <p style="color: #6B6B65; font-size: 13px; line-height: 1.5; margin: 0;">Christopher Neville<br />Use Yourself Well</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const notificationHtml = (name: string, email: string, workshop: string) => `
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
              <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 24px; margin: 0 0 16px 0; font-weight: 500;">New Workshop Registration</h1>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="padding: 6px 0; color: #6B6B65; font-size: 14px;">Name</td></tr>
                <tr><td style="padding: 0 0 12px 0; color: #1C1C1A; font-size: 16px;">${name}</td></tr>
                <tr><td style="padding: 6px 0; color: #6B6B65; font-size: 14px;">Email</td></tr>
                <tr><td style="padding: 0 0 12px 0; color: #1C1C1A; font-size: 16px;"><a href="mailto:${email}" style="color: #7C6F5B;">${email}</a></td></tr>
                <tr><td style="padding: 6px 0; color: #6B6B65; font-size: 14px;">Workshop</td></tr>
                <tr><td style="padding: 0 0 12px 0; color: #1C1C1A; font-size: 16px;">${workshop}</td></tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export async function POST(request: Request) {
  try {
    const { name, email, workshop } = await request.json();

    if (!name || !email || !workshop) {
      return NextResponse.json(
        { error: "Name, email, and workshop are required." },
        { status: 400 },
      );
    }

    const errors: string[] = [];

    // 1. Upsert contact to Brevo
    await upsertBrevoContact(email, name, workshop);

    // 2. Send confirmation to registrant
    const confirmErr = await sendBrevoEmail(
      email,
      name,
      `Registration Confirmed — ${workshop}`,
      confirmationEmailHtml(name, workshop),
    );
    if (confirmErr) errors.push(confirmErr);

    // 3. Notify Christopher
    const notifyErr = await sendBrevoEmail(
      CHRISTOPHER_EMAIL,
      "Christopher",
      `New Workshop Registration: ${name} — ${workshop}`,
      notificationHtml(name, email, workshop),
    );
    if (notifyErr) errors.push(notifyErr);

    if (errors.length > 0) {
      return NextResponse.json({ success: true, errors }, { status: 200 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Workshop registration route error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
