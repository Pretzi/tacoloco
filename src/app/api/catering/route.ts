import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, date, guests, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const EMAIL_TO = process.env.LEAD_NOTIFICATION_EMAIL;
  const EMAIL_BCC = process.env.LEAD_NOTIFICATION_BCC;
  const EMAIL_FROM = process.env.EMAIL_FROM || "noreply@pretzi.dev";
  const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || "TacoLoco";

  if (!RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service not configured." },
      { status: 500 }
    );
  }

  const htmlBody = `
    <h2>New Catering Inquiry</h2>
    <table style="border-collapse:collapse;width:100%;max-width:500px;">
      <tr><td style="padding:8px 12px;font-weight:bold;">Name</td><td style="padding:8px 12px;">${name}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;">Email</td><td style="padding:8px 12px;">${email}</td></tr>
      ${phone ? `<tr><td style="padding:8px 12px;font-weight:bold;">Phone</td><td style="padding:8px 12px;">${phone}</td></tr>` : ""}
      ${date ? `<tr><td style="padding:8px 12px;font-weight:bold;">Event date</td><td style="padding:8px 12px;">${date}</td></tr>` : ""}
      ${guests ? `<tr><td style="padding:8px 12px;font-weight:bold;">Guests</td><td style="padding:8px 12px;">${guests}</td></tr>` : ""}
    </table>
    <h3>Message</h3>
    <p>${message.replace(/\n/g, "<br>")}</p>
  `;

  const toAddresses = [EMAIL_TO].filter(Boolean) as string[];
  const bccAddresses = EMAIL_BCC ? [EMAIL_BCC] : undefined;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${EMAIL_FROM_NAME} <${EMAIL_FROM}>`,
        to: toAddresses,
        bcc: bccAddresses,
        reply_to: email,
        subject: `Catering inquiry from ${name}`,
        html: htmlBody,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend error:", data);
      return NextResponse.json(
        { error: "Failed to send email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}
