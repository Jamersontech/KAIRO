import { NextRequest, NextResponse } from "next/server";
import { sendReviewRequest } from "@/lib/reviews";

// POST /api/reviews/request
// Body: { name: string, email: string, businessName?: string }
//
// Sends a "leave us a Google review" email to a past customer. This is an
// internal automation endpoint (trigger it after a completed job), so it's
// gated behind ADMIN_API_TOKEN when that env var is set.
export async function POST(req: NextRequest) {
  const requiredToken = process.env.ADMIN_API_TOKEN;
  if (requiredToken) {
    const provided = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    if (provided !== requiredToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, businessName } = body;
  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "name and email are required" }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  const result = await sendReviewRequest({
    to: email.trim().toLowerCase(),
    name: name.trim(),
    businessName: businessName?.trim(),
  });

  if (result.skipped) {
    return NextResponse.json(
      { error: "Review requests not configured (set NEXT_PUBLIC_GOOGLE_REVIEW_URL + RESEND_API_KEY)" },
      { status: 503 }
    );
  }
  if (!result.ok) {
    return NextResponse.json({ error: "Could not send review request" }, { status: 500 });
  }
  return NextResponse.json({ success: true }, { status: 200 });
}
