// ─────────────────────────────────────────────
//  Google Reviews
//
//  Two halves:
//   1. sendReviewRequest() — fully working. Emails a customer a
//      "leave us a review" link (uses lib/email). This is the
//      automation the site advertises; trigger it after a completed job.
//   2. fetchGoogleReviews() — SCAFFOLD. Reading/replying to reviews
//      needs the Google Business Profile API (OAuth + Google approval).
//      Wire the TODOs below once you have GBP access.
// ─────────────────────────────────────────────

import { sendEmail, reviewRequestEmail, type SendResult } from "@/lib/email";
import { siteConfig } from "@/config/site";

/** The public "write a review" link for your Google Business Profile. */
export function googleReviewUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || siteConfig.googleReviewUrl;
  if (!url || url.includes("REPLACE") || url.trim() === "") return null;
  return url;
}

export function reviewsConfigured(): boolean {
  return googleReviewUrl() !== null;
}

/**
 * Email a customer asking for a Google review. Safe to call anytime —
 * no-ops (never throws) if the review link or email isn't configured yet.
 */
export async function sendReviewRequest(params: {
  to: string;
  name: string;
  businessName?: string;
}): Promise<SendResult> {
  const url = googleReviewUrl();
  if (!url) {
    console.warn("[reviews] NEXT_PUBLIC_GOOGLE_REVIEW_URL not set — skipping request");
    return { ok: false, skipped: true };
  }
  const msg = reviewRequestEmail({
    to: params.to,
    name: params.name,
    reviewUrl: url,
    businessName: params.businessName,
  });
  return sendEmail(msg);
}

// ── Google Business Profile monitoring — SCAFFOLD ──────────────
//
// Reading reviews requires OAuth against the Google Business Profile API:
//   • Create a Google Cloud project, enable "My Business" APIs
//   • Request GBP API access (Google reviews it — can take days)
//   • OAuth once to obtain a refresh token; store it as an env var
//   • Look up your account + location IDs
//
// Env vars expected (see .env.example): GOOGLE_BUSINESS_CLIENT_ID,
// GOOGLE_BUSINESS_CLIENT_SECRET, GOOGLE_BUSINESS_REFRESH_TOKEN,
// GOOGLE_BUSINESS_ACCOUNT_ID, GOOGLE_BUSINESS_LOCATION_ID.

export interface GoogleReview {
  reviewId: string;
  author: string;
  rating: number; // 1..5
  comment: string;
  createdAt: string;
  reply?: string;
}

export function gbpConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_BUSINESS_REFRESH_TOKEN &&
      process.env.GOOGLE_BUSINESS_ACCOUNT_ID &&
      process.env.GOOGLE_BUSINESS_LOCATION_ID
  );
}

/**
 * Fetch recent Google reviews for the connected location.
 * SCAFFOLD: returns [] until GBP credentials are wired. The shape and
 * call site are ready so turning this on is a localized change.
 */
export async function fetchGoogleReviews(): Promise<GoogleReview[]> {
  if (!gbpConfigured()) {
    console.warn("[reviews] Google Business Profile not configured — returning []");
    return [];
  }

  // TODO: exchange GOOGLE_BUSINESS_REFRESH_TOKEN for an access token, then
  // GET https://mybusiness.googleapis.com/v4/accounts/{account}/locations/{location}/reviews
  // and map the response into GoogleReview[]. Left unimplemented on purpose —
  // it needs live GBP API access to build and test against.
  return [];
}

/**
 * Reply to a review. SCAFFOLD — same GBP-access prerequisite as fetching.
 */
export async function replyToReview(
  _reviewId: string,
  _text: string
): Promise<{ ok: boolean; skipped?: boolean }> {
  if (!gbpConfigured()) return { ok: false, skipped: true };
  // TODO: PUT .../reviews/{reviewId}/reply with { comment: text }
  return { ok: false, skipped: true };
}
