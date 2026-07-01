# Kairo — AI Automation Agency Website

A modern, high-converting marketing website for Kairo, built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
kairo/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (Header, Footer, metadata)
│   ├── page.tsx                # Home page
│   ├── services/page.tsx       # Services page
│   ├── how-it-works/page.tsx   # Process page
│   ├── pricing/page.tsx        # Pricing page
│   ├── about/page.tsx          # About page
│   ├── contact/page.tsx        # Contact page
│   ├── privacy/page.tsx        # Privacy policy (placeholder)
│   ├── terms/page.tsx          # Terms of service (placeholder)
│   ├── sitemap.ts              # Auto-generated sitemap
│   └── api/contact/route.ts    # Contact form API route
│
├── components/                 # Reusable UI components
│   ├── Header.tsx              # Sticky nav with mobile hamburger
│   ├── Footer.tsx              # Site footer
│   ├── Hero.tsx                # Homepage hero section
│   ├── ProblemSolution.tsx     # Problem/solution comparison
│   ├── ServicesOverview.tsx    # 3-service overview cards
│   ├── StatsBar.tsx            # Key metrics bar
│   ├── Testimonials.tsx        # Client testimonial cards
│   ├── FinalCTA.tsx            # Bottom CTA section
│   ├── ProcessStep.tsx         # Numbered step component
│   ├── PricingCard.tsx         # Pricing tier card
│   └── ContactForm.tsx         # Validated contact form
│
├── config/
│   └── site.ts                 # ← EDIT BRAND INFO & PRICING HERE
│
├── lib/
│   └── utils.ts                # cn() utility
│
└── public/                     # Static assets
```

---

## Where to Edit Things

### Brand colors
Edit the CSS variables in `app/globals.css`:
```css
:root {
  --color-charcoal: #1c1c1e;   /* Primary text / dark backgrounds */
  --color-offwhite: #faf9f6;   /* Page background */
  --color-emerald: #0f5132;    /* Primary accent (CTAs, highlights) */
  --color-gold: #c9a24b;       /* Secondary accent (icons, badges) */
}
```

### Business info (name, email, phone, social links, Calendly)
Edit `config/site.ts` → `siteConfig` object.

### Pricing numbers
Edit `config/site.ts` → `pricingConfig.tiers`. Each tier has:
- `price` — set to `"$XXX"` placeholder, replace with your actual number
- `period` — currently `"/mo"`, change if needed
- `features` — the bullet points for that tier
- `highlight` — set to `true` for the "most popular" tier (only one should be `true`)

### Copy / headlines
Each page lives in `app/<page>/page.tsx`. All copy is inline — search for the text you want to change and edit it directly. There is no CMS.

### Testimonials
Edit the `testimonials` array in `components/Testimonials.tsx`.

### Services detail content
Edit the `services` array in `app/services/page.tsx`.

### Contact form → email/CRM integration
The form posts to `/api/contact`. Open `app/api/contact/route.ts` and replace the `console.log` with your integration:

**Resend (recommended):**
```bash
npm install resend
```
```ts
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
await resend.emails.send({
  from: 'Kairo <noreply@kairoagency.com>',
  to: 'hello@kairoagency.com',
  subject: `New audit request from ${name} — ${business}`,
  html: `<p>${name} (${email}) | ${phone}</p><p>${message}</p>`,
})
```

**Calendly embed:**
Replace the `href` in the Contact page's "Book a Strategy Call" link with your real Calendly URL (already set in `config/site.ts → calendarUrl`).

---

## Deployment

### Vercel (recommended — zero config)
```bash
npx vercel
```
Set environment variables in the Vercel dashboard if your contact API uses them (e.g., `RESEND_API_KEY`).

### Static export (if no API routes needed)
In `next.config.ts`:
```ts
const nextConfig = { output: 'export' }
export default nextConfig
```
Then `npm run build` → deploy `out/` to any static host (Netlify, Cloudflare Pages, etc.).

> Note: Static export disables the `/api/contact` route. Use a third-party form service (Formspree, Basin, etc.) instead.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 15 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Framer Motion | Scroll animations |
| Lucide React | Icons |

---

## SEO

- Metadata (title, description, Open Graph, Twitter Card) set per-page via `metadata` exports
- Root template in `app/layout.tsx`
- Sitemap auto-generated at `/sitemap.xml` via `app/sitemap.ts`
- Semantic HTML throughout
- Update `siteConfig.url` in `config/site.ts` before deploying to production
