import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, phone, business_name, business_type, website_url,
    google_review_count, monthly_leads, biggest_challenge, goals,
    plan_interest, message } = body;

  if (!name?.trim() || !email?.trim() || !business_name?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  const { error } = await supabase.from("audit_requests").insert({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || null,
    business_name: business_name.trim(),
    business_type: business_type || null,
    website_url: website_url?.trim() || null,
    google_review_count: google_review_count || null,
    monthly_leads: monthly_leads || null,
    biggest_challenge: biggest_challenge || null,
    goals: goals || null,
    plan_interest: plan_interest || null,
    message: message?.trim() || null,
  });

  if (error) {
    console.error("[Supabase] audit_requests insert failed:", error.message);
    return NextResponse.json({ error: "Could not save submission" }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
