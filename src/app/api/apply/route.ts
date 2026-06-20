import { NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = parseInt(process.env.BREVO_APPLY_LIST_ID || "4");
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
  goals: string,
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
          APPLY_GOALS: goals,
          SOURCE: "9-Week Study Application",
        },
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    },
  ).catch((err) => console.error("Brevo upsert error:", err));
}

const confirmationEmailHtml = (name: string) => `
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
              <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 24px; margin: 0 0 16px 0; font-weight: 500; color: #23252A;">Thanks for your interest, ${name}.</h1>
              <p style="color: #304F50; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">I've received your application for the 9-Week One Skill Study and will review it within 48 hours.</p>
              <p style="color: #304F50; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">If it feels like a good fit, I'll reach out to schedule a call and discuss next steps.</p>
              <p style="color: #304F50; font-size: 16px; line-height: 1.6; margin: 0;">In the meantime, feel free to explore <a href="https://useyourselfwell.com/one-skill" style="color: #C47A4A;">One Skill</a> to get started.</p>
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

const notificationHtml = (name: string, email: string, goals: string) => `
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
              <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 24px; margin: 0 0 16px 0; font-weight: 500;">New 9-Week Study Application</h1>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="padding: 6px 0; color: #6B6B65; font-size: 14px;">Name</td></tr>
                <tr><td style="padding: 0 0 12px 0; color: #1C1C1A; font-size: 16px;">${name}</td></tr>
                <tr><td style="padding: 6px 0; color: #6B6B65; font-size: 14px;">Email</td></tr>
                <tr><td style="padding: 0 0 12px 0; color: #1C1C1A; font-size: 16px;"><a href="mailto:${email}" style="color: #7C6F5B;">${email}</a></td></tr>
                <tr><td style="padding: 6px 0; color: #6B6B65; font-size: 14px;">Goals</td></tr>
                <tr><td style="padding: 0 0 12px 0; color: #1C1C1A; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${goals || "Not provided"}</td></tr>
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
    const { name, email, goals } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }

    const errors: string[] = [];

    // 1. Upsert contact to Brevo
    await upsertBrevoContact(email, name, goals || "");

    // 2. Send confirmation to applicant
    const confirmErr = await sendBrevoEmail(
      email,
      name,
      "Application Received — 9-Week One Skill Study",
      confirmationEmailHtml(name),
    );
    if (confirmErr) errors.push(confirmErr);

    // 3. Notify Christopher
    const notifyErr = await sendBrevoEmail(
      CHRISTOPHER_EMAIL,
      "Christopher",
      `New 9-Week Study Applicant: ${name}`,
      notificationHtml(name, email, goals || ""),
    );
    if (notifyErr) errors.push(notifyErr);

    if (errors.length > 0) {
      return NextResponse.json({ success: true, errors }, { status: 200 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Apply route error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
