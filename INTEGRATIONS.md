# Integrations & Deployment

How the three advertised automations are wired, and how to deploy to Vercel.
All integrations **degrade gracefully** — the site builds and runs with none of
these keys set; each feature simply stays dormant until its keys are added.

---

## 1. Automatic emails (Resend) — ✅ fully built

On every contact-form submit, the lead is saved to Supabase and then two emails
fire (non-blocking — a mail failure never fails the form):

- **Lead notification** → your team (`EMAIL_TEAM_TO`), reply-to set to the prospect.
- **Auto-reply** → the prospect, confirming their audit is underway.

**To activate:**
1. Create an account at [resend.com] and verify your sending domain.
2. Set `RESEND_API_KEY` and `EMAIL_FROM` (must use the verified domain).
3. Optionally set `EMAIL_TEAM_TO`.

Code: `lib/email.ts` (provider-isolated — swapping to SendGrid/Postmark is a
one-file change), wired in `app/api/contact/route.ts`.

---

## 2. Google reviews

### Review requests — ✅ fully built (needs your review link)
Emails a past customer a "leave us a review" link.
- Set `NEXT_PUBLIC_GOOGLE_REVIEW_URL` (from Google Business Profile → Ask for reviews).
- Trigger via `POST /api/reviews/request` with `{ name, email, businessName? }`
  (send `Authorization: Bearer <ADMIN_API_TOKEN>` if that env var is set).
- Code: `lib/reviews.ts` → `sendReviewRequest()`.

### Review monitoring/replying — 🧩 scaffolded
Reading and replying to reviews needs the Google Business Profile API (OAuth +
Google approval). The functions and data shape are ready in `lib/reviews.ts`
(`fetchGoogleReviews`, `replyToReview`) with `TODO`s marking the API calls.
Set the `GOOGLE_BUSINESS_*` env vars once you have GBP access.

---

## 3. AI voice agent (Vapi) — 🧩 scaffolded

`components/VoiceAgentButton.tsx` renders a live "Talk to our AI" web-call button
on the contact page. It **self-hides** until configured.

**To activate:**
1. Create an assistant at [vapi.ai].
2. Set `NEXT_PUBLIC_VAPI_PUBLIC_KEY` and `NEXT_PUBLIC_VAPI_ASSISTANT_ID`.

The SDK loads from a CDN at click-time, so there's nothing to install. Prefer
bundling? `npm i @vapi-ai/web` and swap the dynamic import for a static one.

Note: this is the *web* demo call. A real phone line for "answers every call"
is configured inside Vapi (buy a number + attach the assistant) — that lives on
their platform, not in this repo.

---

## Deploying to Vercel

This is a standard Next.js app — Vercel is the native host. No config files needed.

1. **Push to GitHub** (repo already initialized locally).
2. On [vercel.com] → **Add New → Project** → import the repo. Vercel auto-detects
   Next.js; no build settings to change.
3. **Add environment variables** (Settings → Environment Variables) — copy the
   keys from `.env.example`. At minimum, for the current live features:
   Supabase, Stripe, and (for emails) Resend.
4. **Deploy.** Every push to `main` auto-deploys; PRs get preview URLs.
5. Point your domain (`kairoagency.com`) at the project under **Domains**, and
   set `NEXT_PUBLIC_SITE_URL` to the production URL.

Pre-deploy check: `npm run build` should pass locally before the first deploy.
