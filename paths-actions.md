# User Paths & Actions Reference

## Overview

This document maps every user-facing path through the site, the actions available, and the corresponding backend requirements (Brevo lists, transactional emails, Stripe integrations). Use this to verify all automations, triggers, and email flows are operational.

---

## 1. Home Page (`/`)

| Section | User Action | Triggered Event | Backend Dependency |
|---|---|---|---|
| Hero CTA | Click "Get Free Access" | Opens Stripe PaymentDialog | Stripe PaymentIntent → `/api/create-payment-intent` |
| Course Offer section | Click "Get Free Access →" | Opens Stripe PaymentDialog | Stripe PaymentIntent → `/api/create-payment-intent` |
| Course Offer section | Scroll / Read | — | — |
| Final CTA | Click button (pulls `course.cta`) | Opens Stripe PaymentDialog | Stripe PaymentIntent → `/api/create-payment-intent` |
| Lead Magnet | Enter email → "Send me the guide" | `fetch("/api/lead-magnet", POST)` | → Brevo: add contact → send free guide email |

### Purchase Path (Stripe flow)

The One Skill digital course is currently **free** (`course.price: 0`). No Stripe payment is needed for the digital course. The Stripe flow applies only to the **Intro to One Skill** ($197), which is purchased via Stripe Checkout.

```
User clicks "Reserve Your Spot — $197"
  → Redirects to Stripe Checkout
  → Checkout.session.completed webhook
  → User receives course access email + scheduling link
```

---

## 2. Success Page (`/success`)

| User Action | Triggered Event | Backend Dependency |
|---|---|---|
| Page loads | — | Verify Stripe webhook delivers course access email via Brevo |
| Click "Back to Home" | Navigate to `/` | — |

**Transactional email needed:**
- **Course Access Email** — triggered by Stripe `checkout.session.completed` or `payment_intent.succeeded` webhook → Brevo sends email with course access link

---

## 3. One Skill Page (`/one-skill`)

| Section | User Action | Triggered Event | Backend Dependency |
|---|---|---|---|
| Hero CTA | Click "Apply for Intro to One Skill" | Opens ApplyDialog | — |
| ApplyDialog | Submit name + email + goals | `fetch("/api/apply", POST)` | → Brevo: add contact to "Intro to One Skill Applicants" list → send confirmation email |
| Intro to One Skill section | Click "Apply for Intro to One Skill" | Opens ApplyDialog | (same as above) |
| Self-guided course | Click "Get Free Access" | Navigate to `/#course` (scrolls to course section) | Free (no payment required) |
| Final CTA | Click "Apply for Intro to One Skill" | Opens ApplyDialog | (same as above) |
| Final CTA | Click "Not ready yet? Start with One Skill — Free" | Navigate to `/#course` | Free |

**Transactional emails needed:**
- **Application Confirmation** — triggered by successful `/api/apply` submission → confirm receipt, mention 48-hour response time
- **Follow-up Notification** — notifies Christopher of new application (Brevo email notification or internal forward)

**Brevo list:** `Intro to One Skill Applicants` — tag with "applied-intro-to-one-skill"

---

## 4. Workshops Page (`/workshops`)

| Section | User Action | Triggered Event | Backend Dependency |
|---|---|---|---|
| Workshop card | Click "Register" | Opens WorkshopRegistrationDialog | — |
| Registration dialog | Submit name + email | `fetch("/api/workshop-registration", POST)` | → Brevo: add contact to "Workshop Registrants" list → send confirmation email |
| Stay Updated card | Click "Get in Touch" | Navigate to `/contact` | — |

**Transactional emails needed:**
- **Workshop Registration Confirmation** — triggered by successful `/api/workshop-registration` submission → confirm spot, include date/details

**Brevo list:** `Workshop Registrants` — tag with workshop title (e.g. "stop-bracing", "lightening-load", "staying-in-game")

---

## 5. Videos Page (`/videos`)

| User Action | Triggered Event | Backend Dependency |
|---|---|---|
| Watch embedded YouTube video | — | YouTube (no backend dependency) |
| Read description | — | — |

No backend actions. Purely informational.

---

## 6. About Page (`/about`)

| User Action | Triggered Event | Backend Dependency |
|---|---|---|
| Read / browse | — | — |

No backend actions.

---

## 7. Contact Page (`/contact`)

| User Action | Triggered Event | Backend Dependency |
|---|---|---|
| Fill contact form → "Send Message" | `fetch("/api/contact", POST)` | → Brevo: send email notification to Christopher + auto-reply to user |
| Click email link | Opens `mailto:hello@useyourselfwell.com` | — |
| Click phone link | Opens `tel:+18013329504` | — |
| Click "Start with One Skill" | Navigate to `/#course` | — |

**Transactional emails needed:**
- **Contact Auto-Reply** — triggered by successful `/api/contact` submission → confirm message received, 24-hour response time
- **Contact Notification** — sends Christopher the message details

**Brevo list:** `Contact Submissions`

---

## 8. Nav / Footer (Global)

| Element | User Action | Result |
|---|---|---|
| Logo "Use Yourself Well" | Click | Navigate to `/` |
| Nav: Home | Click | Navigate to `/` |
| Nav: One Skill | Click | Navigate to `/one-skill` |
| Nav: Videos | Click | Navigate to `/videos` |
| Nav: Workshops | Click | Navigate to `/workshops` |
| Nav: About | Click | Navigate to `/about` |
| Nav: Contact (button) | Click | Navigate to `/contact` |
| Footer: One Skill | Click | Navigate to `/one-skill` |
| Footer: Videos | Click | Navigate to `/videos` |
| Footer: Workshops | Click | Navigate to `/workshops` |
| Footer: About | Click | Navigate to `/about` |
| Footer: Contact | Click | Navigate to `/contact` |

---

## API Routes Summary

| Route | Method | Purpose | Brevo / Email Action |
|---|---|---|---|
| `/api/create-payment-intent` | POST | Creates Stripe PaymentIntent for One Skill purchase | — (handled by Stripe webhook) |
| `/api/lead-magnet` | POST | Subscribes email for free guide | → Add to Brevo list "Free Guide" → Send guide email |
| `/api/contact` | POST | Submits contact form | → Notify Christopher + auto-reply to sender |
| /api/apply | POST | Applies for Intro to One Skill | → Add to Brevo list "Intro to One Skill Applicants" → Send confirmation |
| `/api/workshop-registration` | POST | Registers for a workshop | → Add to Brevo list "Workshop Registrants" → Send confirmation |

---

## Stripe Webhook Events to Handle

| Event | Action |
|---|---|
| `payment_intent.succeeded` | Grant course access → trigger Brevo transactional email with access link |
| `payment_intent.payment_failed` | Log failure, optionally notify user |

---

## Brevo List Summary

| List Name | Source | Tags |
|---|---|---|
| Free Guide | Lead Magnet form (`/api/lead-magnet`) | — |
| Intro to One Skill Applicants | Apply dialog (/api/apply) | applied-intro-to-one-skill |
| Workshop Registrants | Workshop registration (`/api/workshop-registration`) | Workshop ID slug: `stop-bracing`, `lightening-load`, `staying-in-game` |
| Contact Submissions | Contact form (`/api/contact`) | — |
| One Skill Purchasers | Stripe webhook (`payment_intent.succeeded`) | `purchased-one-skill` |

---

## Transactional Emails Checklist

| Email | Trigger | Status |
|---|---|---|
| Free Guide delivery | Lead magnet form submission | ⬜ |
| Contact auto-reply | Contact form submission | ⬜ |
| Contact notification to Christopher | Contact form submission | ⬜ |
| Intro to One Skill application confirmation | Apply form submission | ⬜ |
| Intro to One Skill applicant notification to Christopher | Apply form submission | ⬜ |
| Workshop registration confirmation | Workshop registration form | ⬜ |
| Course access email (with login/link) | Stripe payment success webhook | ⬜ |

---

## Purchase Path Edge Cases

| Scenario | Expected Behavior |
|---|---|
| User closes PaymentDialog mid-flow | Dialog closes, no charge, no email |
| Stripe payment fails (card declined) | Error shown in dialog, user can retry |
| Stripe payment succeeds but webhook fails | Payment captured but email not sent — Brevo webhook retry or manual reconciliation |
| User refreshes `/success` page | Page shows success message again (no duplicate charge) |
| User double-clicks "Pay $27" | Stripe idempotency prevents duplicate charges |
