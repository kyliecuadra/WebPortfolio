import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactPayload {
  projectType?: string;
  budget?: string;
  timeline?: string;
  email?: string;
  requirements?: string;
  company?: string; // honeypot — real visitors never fill this in
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { projectType, budget, timeline, email, requirements, company } = body;

  // Honeypot field: bots tend to fill in every input they find, humans never see this one.
  // Return a fake success instead of an error so the bot doesn't learn to avoid it.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!projectType || !budget || !timeline || !email || !requirements) {
    return NextResponse.json({ ok: false, error: "Please fill in every field." }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ ok: false, error: "That email address doesn't look valid." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    console.error("Contact form: missing RESEND_API_KEY or CONTACT_TO_EMAIL env var");
    return NextResponse.json(
      { ok: false, error: "The contact form isn't fully configured yet — email couldn't be sent." },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "kylie.dev <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New project inquiry — ${projectType}`,
      text: [
        `Project type: ${projectType}`,
        `Budget: ${budget}`,
        `Timeline: ${timeline}`,
        `Contact email: ${email}`,
        "",
        "Requirements:",
        requirements,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Email failed to send. Please try again in a moment." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message." },
      { status: 500 }
    );
  }
}
