import { NextResponse } from "next/server";
import { Resend } from "resend";
import { profile } from "@/data/cv";
import { buildContactEmail } from "@/lib/contactEmail";

function getContactRecipients(): string[] {
  const raw = process.env.CONTACT_TO ?? profile.email;
  return raw
    .split(/[,;]+/)
    .map((address) => address.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Email not configured" }, { status: 503 });
    }

    const resend = new Resend(apiKey);
    const to = getContactRecipients();
    const from = process.env.RESEND_FROM ?? "solantric Portfolio <onboarding@resend.dev>";
    const mail = buildContactEmail({
      name,
      email,
      message,
      brand: profile.brand,
    });

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
