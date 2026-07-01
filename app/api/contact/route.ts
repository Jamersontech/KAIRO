import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  business: string;
  email: string;
  phone?: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json();
    const { name, business, email, message } = body;

    // Server-side validation
    if (!name?.trim() || !business?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }
    if (!email?.trim() || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────────────
    // TODO: Connect this to your email/CRM service.
    //
    // Options:
    //   1. Resend (https://resend.com) — add RESEND_API_KEY env var
    //   2. SendGrid — add SENDGRID_API_KEY env var
    //   3. GoHighLevel / HubSpot CRM webhook
    //   4. Simple mailto via nodemailer + SMTP
    //
    // Example with Resend:
    //   import { Resend } from 'resend'
    //   const resend = new Resend(process.env.RESEND_API_KEY)
    //   await resend.emails.send({ from: '...', to: '...', subject: '...', html: '...' })
    // ─────────────────────────────────────────────────────

    // For now, log the submission (replace with real integration)
    console.log("[Contact Form Submission]", {
      name: body.name,
      business: body.business,
      email: body.email,
      phone: body.phone || "N/A",
      message: body.message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
