// ─────────────────────────────────────────────
//  Email — transactional sending via Resend
//
//  All sending goes through `sendEmail()`. Swapping providers
//  (SendGrid, Postmark, etc.) is a one-function change here —
//  nothing else in the app imports a provider directly.
//
//  Uses Resend's REST API over fetch, so there's no npm dependency
//  to install. Set RESEND_API_KEY + EMAIL_FROM to activate; until
//  then every send is a graceful no-op (logged, never throws).
// ─────────────────────────────────────────────

import { siteConfig } from "@/config/site";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function apiKey(): string | null {
  const key = process.env.RESEND_API_KEY;
  if (!key || key.includes("REPLACE") || key.trim() === "") return null;
  return key;
}

/** Verified sender, e.g. "Kairo <hello@kairoagency.com>". Falls back to the site email. */
function fromAddress(): string {
  return process.env.EMAIL_FROM || `${siteConfig.name} <${siteConfig.email}>`;
}

/** Where internal lead notifications land. Defaults to the public site email. */
function teamAddress(): string {
  return process.env.EMAIL_TEAM_TO || siteConfig.email;
}

export function emailConfigured(): boolean {
  return apiKey() !== null;
}

export interface SendEmailInput {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export interface SendResult {
  ok: boolean;
  skipped?: boolean;
  error?: string;
}

/**
 * Send one transactional email. Never throws — returns a result so callers
 * (e.g. the contact route) can log failures without failing the user request.
 */
export async function sendEmail(input: SendEmailInput): Promise<SendResult> {
  const key = apiKey();
  if (!key) {
    console.warn("[email] RESEND_API_KEY not set — skipping send:", input.subject);
    return { ok: false, skipped: true };
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress(),
        to: Array.isArray(input.to) ? input.to : [input.to],
        subject: input.subject,
        html: input.html,
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[email] Resend send failed:", res.status, detail);
      return { ok: false, error: `Resend ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] Resend request threw:", err);
    return { ok: false, error: "network" };
  }
}

// ── Shared brand shell ────────────────────────────────────────

function shell(bodyInner: string): string {
  return `<!doctype html><html><body style="margin:0;background:#0D0D0F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <div style="color:#C9A24B;font-weight:800;letter-spacing:0.28em;font-size:11px;text-transform:uppercase;margin-bottom:24px;">${siteConfig.name}</div>
    <div style="background:#111113;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:32px;color:#ffffff;">
      ${bodyInner}
    </div>
    <div style="color:rgba(255,255,255,0.3);font-size:12px;margin-top:24px;text-align:center;">
      ${siteConfig.name} · ${siteConfig.tagline}
    </div>
  </div></body></html>`;
}

function row(label: string, value?: string | null): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:6px 0;color:rgba(255,255,255,0.4);font-size:13px;width:150px;vertical-align:top;">${label}</td>
    <td style="padding:6px 0;color:#ffffff;font-size:14px;">${value}</td>
  </tr>`;
}

// ── Templates ─────────────────────────────────────────────────

export interface LeadFields {
  name: string;
  email: string;
  phone?: string | null;
  business_name: string;
  business_type?: string | null;
  website_url?: string | null;
  google_review_count?: string | null;
  biggest_challenge?: string | null;
  goals?: string | null;
  plan_interest?: string | null;
  message?: string | null;
}

/** Internal "new lead" notification to the Kairo team. */
export function leadNotificationEmail(lead: LeadFields) {
  const html = shell(`
    <div style="font-size:20px;font-weight:800;margin-bottom:4px;">New audit request 🎯</div>
    <div style="color:rgba(255,255,255,0.5);font-size:14px;margin-bottom:24px;">${lead.business_name} just submitted the contact form.</div>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Name", lead.name)}
      ${row("Email", lead.email)}
      ${row("Phone", lead.phone)}
      ${row("Business", lead.business_name)}
      ${row("Type", lead.business_type)}
      ${row("Website", lead.website_url)}
      ${row("Google reviews", lead.google_review_count)}
      ${row("Biggest challenge", lead.biggest_challenge)}
      ${row("Interested in", lead.goals)}
      ${row("Plan interest", lead.plan_interest)}
      ${row("Message", lead.message)}
    </table>
    <a href="mailto:${lead.email}" style="display:inline-block;margin-top:24px;background:#0F5132;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 22px;border-radius:10px;">Reply to ${lead.name.split(" ")[0]}</a>
  `);
  return {
    to: teamAddress(),
    replyTo: lead.email,
    subject: `New lead: ${lead.business_name}`,
    html,
  };
}

/** Friendly auto-reply / confirmation to the prospect. */
export function leadAutoReplyEmail(lead: LeadFields) {
  const first = lead.name.split(" ")[0];
  const html = shell(`
    <div style="font-size:22px;font-weight:800;margin-bottom:12px;">Thanks, ${first} — we've got it. ✅</div>
    <div style="color:rgba(255,255,255,0.6);font-size:15px;line-height:1.6;">
      We're reviewing <strong style="color:#ffffff;">${lead.business_name}</strong> right now.
      Within <strong style="color:#C9A24B;">1 business day</strong> you'll get a personalised audit of your
      website, Google presence, and lead follow-up — with a clear, no-jargon action plan.
    </div>
    <div style="color:rgba(255,255,255,0.6);font-size:15px;line-height:1.6;margin-top:16px;">
      In the meantime, if anything comes up just reply to this email — it comes straight to us.
    </div>
    <div style="margin-top:24px;color:rgba(255,255,255,0.4);font-size:14px;">— The ${siteConfig.name} team</div>
  `);
  return {
    to: lead.email,
    subject: `We're on it, ${first} — your ${siteConfig.name} audit is underway`,
    html,
  };
}

/** "Leave us a review" request pointing at the business's Google review link. */
export function reviewRequestEmail(params: {
  to: string;
  name: string;
  reviewUrl: string;
  businessName?: string;
}) {
  const first = params.name.split(" ")[0];
  const from = params.businessName || siteConfig.name;
  const html = shell(`
    <div style="font-size:22px;font-weight:800;margin-bottom:12px;">How did we do, ${first}? ⭐</div>
    <div style="color:rgba(255,255,255,0.6);font-size:15px;line-height:1.6;">
      Thanks for choosing ${from}. A quick Google review takes about 30 seconds and makes a
      huge difference for a local business like ours.
    </div>
    <a href="${params.reviewUrl}" style="display:inline-block;margin-top:24px;background:#C9A24B;color:#0D0D0F;text-decoration:none;font-weight:800;font-size:15px;padding:14px 26px;border-radius:10px;">Leave a quick review →</a>
    <div style="margin-top:20px;color:rgba(255,255,255,0.35);font-size:13px;">Thank you — it genuinely means a lot.</div>
  `);
  return {
    to: params.to,
    subject: `A quick favour, ${first}? ⭐`,
    html,
  };
}
