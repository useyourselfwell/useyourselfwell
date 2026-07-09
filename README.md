# Use Yourself Well — Website

Landing page + marketing site for Christopher Slye's Alexander Technique teaching. Built with Next.js 14, Tailwind CSS, and several integrations (Stripe, Brevo, Supabase).

---

## Project Structure

```
05_Website/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (Nav, Footer, fonts, metadata)
│   │   ├── page.tsx                  # Homepage — all sections in order
│   │   ├── globals.css               # Tailwind + custom CSS variables
│   │   ├── contact/
│   │   │   └── page.tsx              # Contact page with email form
│   │   ├── success/
│   │   │   └── page.tsx              # Post-purchase success page
│   │   └── api/
│   │       ├── contact/route.ts      # POST — contact form (Brevo contact + SMTP)
│   │       ├── lead-magnet/route.ts  # POST — free guide download (Brevo contact + SMTP)
│   │       ├── lead/route.ts         # POST — discovery call form (Brevo + Resend)
│   │       ├── checkout/route.ts     # POST — Stripe Checkout session
│   │       ├── create-payment-intent/route.ts  # POST — Stripe PaymentIntent
│   │       └── stripe/webhook/route.ts         # POST — Stripe webhook handler
│   │
│   ├── components/
│   │   ├── nav.tsx                   # Sticky top navigation
│   │   ├── footer.tsx                # Footer with links
│   │   ├── hero.tsx                  # Hero section
│   │   ├── problem-reframe.tsx       # Problem intro section
│   │   ├── mechanism.tsx             # How it works
│   │   ├── testimonials.tsx          # Testimonial cards
│   │   ├── course-offer.tsx          # One Skill video course offer
│   │   ├── offer-ladder.tsx          # In-person program pricing card
│   │   ├── about.tsx                 # About Christopher
│   │   ├── lead-magnet.tsx           # Free guide email capture
│   │   ├── faq-section.tsx           # FAQ accordion
│   │   ├── guarantee.tsx             # Satisfaction guarantee
│   │   ├── final-cta.tsx             # Bottom call-to-action
│   │   ├── contact-dialog.tsx        # Reusable modal form (discovery calls)
│   │   ├── payment-dialog.tsx        # Stripe payment modal
│   │   └── ui/
│   │       ├── dialog.tsx            # Radix UI dialog wrapper
│   │       └── accordion.tsx         # Radix UI accordion wrapper
│   │
│   └── lib/
│       ├── course.ts                 # All content data (course, pricing, FAQs, testimonials, etc.)
│       ├── stripe.ts                 # Client-side Stripe helper
│       ├── supabase.ts               # Supabase client singleton
│       └── utils.ts                  # cn() classname utility + trackEvent
│
├── .env.local                        # Environment variables (not committed)
├── .env.local.example                # Env variable reference
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Pages

| Route | File | Content |
|---|---|---|
| `/` | `page.tsx` | Single-page marketing site, all sections stacked vertically |
| `/contact` | `contact/page.tsx` | Contact form with email, phone, location info |
| `/success` | `success/page.tsx` | Post-purchase confirmation page |

---

## Content Data (`src/lib/course.ts`)

All site copy lives in this single file — course info, pricing tiers, testimonials, FAQs, doctor quotes, navigation links, and site config. **Edit this file to change any text on the site.** Key exports:

| Export | What it controls |
|---|---|
| `course` | One Skill course name, price, priceId, modules |
| `siteConfig` | Site name, description, URL (used in metadata/SEO) |
| `pricingTiers` | Offer ladder pricing (Standard + Intro Offer) |
| `testimonials` | Testimonial quotes |
| `doctorQuotes` | Doctor endorsement quotes |
| `faqItems` | FAQ questions & answers |
| `pricingTiers` | In-person program pricing rows |

---

## Integrations

### Brevo (Sendinblue) — Email + Contacts

Used for all contact management and transactional email. No other email service needed.

| Endpoint | What it does |
|---|---|
| Brevo Contacts API (`PUT /v3/contacts/{email}`) | Creates/updates a contact (upsert) with `updateEnabled: true` |
| Brevo SMTP API (`POST /v3/smtp/email`) | Sends transactional emails — acknowledgements, notifications, guide delivery |

**Required env vars:**
- `BREVO_API_KEY` — API key with contact + SMTP permissions
- `BREVO_LIST_ID` — Default list ID for new contacts (default `2`)
- `BREVO_FROM_EMAIL` — Verified sender email (e.g. `hello@useyourselfwell.com`)
- `BREVO_FROM_NAME` — Sender display name

**Transactional emails sent:**
- **Contact form** → acknowledgement to submitter + notification to Christopher
- **Lead magnet** → sends free guide PDF link
- **Stripe webhook** (legacy) → Resend-based purchase confirmation (still uses Resend)

**To edit the contact form auto-reply:** edit `buildContactEmailHtml()` in `src/app/api/contact/route.ts` and the subject line in the `sendTransactionalEmail()` call for the acknowledgement.

### Stripe — Payments

| Route | Purpose |
|---|---|
| `/api/checkout` | Creates a Stripe Checkout session for the One Skill course |
| `/api/create-payment-intent` | Creates a PaymentIntent (used by payment dialog) |
| `/api/stripe/webhook` | Handles `checkout.session.completed` and `payment_intent.succeeded` events |

On successful purchase, the webhook:
1. Records purchase in Supabase (if configured)
2. Adds customer to Brevo contact list
3. Sends a welcome email with module links via **Resend** (still uses Resend as of now)

**Required env vars:** `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Supabase — Purchase Records

Optional. When configured, purchase records are logged to a `purchases` table.

**Required env vars:** `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`

### Resend — Legacy Email

Previously used for lead notifications and purchase confirmations. The contact form and lead magnet have been migrated to Brevo SMTP. The **Stripe webhook** (`/api/stripe/webhook`) still uses Resend for purchase confirmation emails.

**Required env vars (if keeping Resend):** `RESEND_API_KEY`, `RESEND_FROM_EMAIL`

---

## Environment Variables

All env vars are listed in `.env.local.example`:

```
# Brevo (primary email provider)
BREVO_API_KEY=
BREVO_LIST_ID=2
BREVO_FROM_EMAIL=hello@useyourselfwell.com
BREVO_FROM_NAME=Use Yourself Well

# Stripe
STRIPE_SECRET_KEY=
STRIPE_PRICE_ID=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Supabase (optional)
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# Resend (legacy — only stripe webhook uses it)
RESEND_API_KEY=
RESEND_FROM_EMAIL=hello@useyourselfwell.com

# Internal
CHRISTOPHER_EMAIL=christopher@useyourselfwell.com
```

---

## Common Tasks

### Change homepage text

Edit `src/lib/course.ts` — all copy (headlines, descriptions, FAQs, pricing, testimonials) lives there.

### Change the contact auto-reply email

Edit the `buildContactEmailHtml()` function and the subject string in `src/app/api/contact/route.ts`.

### Change the lead magnet guide email

Edit the HTML in the `smtpRes` fetch call in `src/app/api/lead-magnet/route.ts`.

### Change pricing

Edit the `pricingTiers` array in `src/lib/course.ts`.

### Change the Stripe product / price

Update `course.priceId` in `src/lib/course.ts`, or set the `STRIPE_PRICE_ID` env var.

### Verify Brevo SMTP is working

Submit the lead magnet form and check the browser console. Errors from Brevo's API are logged there. You need to verify your sender domain in Brevo → SMTP & API → SMTP → Senders.

---

## Design System

| Token | CSS Variable | Value |
|---|---|---|
| Background | `--background` | `#F6F4EF` Warm White |
| Foreground | `--foreground` | `#23252A` Deep Charcoal |
| Accent | `--accent` | `#C47A4A` Copper |
| Accent Light | `--accent-light` | `#7FA7A7` Sage Blue |
| Muted | `--muted` | `#304F50` Dark Dusty Teal |
| Border | `--border` | `#E0DDD4` warm light neutral |
| Border radius | `--radius` | `8px` |
| Font heading | `font-playfair` | Playfair Display |
| Font body | `font-inter` | Inter |

Utility classes use `cn()` from `@/lib/utils` (clsx + tailwind-merge).