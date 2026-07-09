# SEO Implementation Plan — useyourselfwell.com

## Background

The site is a Next.js App Router project with Tailwind v4, Vercel Analytics + Speed Insights, and Google Analytics already wired up. The foundation is surprisingly strong: `layout.tsx` already has full `Metadata` with OG, Twitter, JSON-LD LocalBusiness schema, and the `siteConfig` object already stores the Bountiful address/phone/geo. Both `sitemap.ts` and `robots.ts` are already native Next.js files.

**What this means:** we are NOT starting from zero. The low-hanging fruit is already done. The remaining gaps are more strategic and content-level.

---

## Audit Summary — What's Already Done ✅ vs. What's Missing ❌

| Item | Status | Notes |
|------|--------|-------|
| `metadataBase` | ✅ Done | Set to `https://useyourselfwell.com` |
| Title template (`%s \| Use Yourself Well`) | ✅ Done | Layout already uses template |
| Home title includes "Bountiful" + "Utah" | ✅ Done | Explicit in default title |
| Per-page `metadata` exports | ✅ Done | `/about`, `/workshops`, `/one-skill` all export metadata |
| `canonical` alternates | ✅ Done | Set on all sub-pages |
| JSON-LD LocalBusiness schema | ✅ Done | In `layout.tsx` `other` field |
| `sitemap.ts` native file | ✅ Done | Covers 6 routes |
| `robots.ts` native file | ✅ Done | Configured |
| `next/font/google` for fonts | ✅ Done | Playfair + Inter self-hosted |
| Vercel Analytics + Speed Insights | ✅ Done | Both imported in layout |
| OG image | ⚠️ Partial | Uses `/images/house.png` (generic, not a proper OG image at 1200×630) |
| Hero image as `<img>` not `<Image />` | ❌ Missing | No `priority` prop, no LCP optimization |
| Image alt text on public images | ❌ Missing | `ChrisWorking.jpg`, `ProfilePic.jpg` etc. lack descriptive filenames |
| Images in `<img>` tags lack explicit `width`/`height` | ❌ Missing | CLS risk on hero + mechanism images |
| LocalBusiness JSON-LD in `layout.tsx` `other` field | ⚠️ Wrong approach | Using `metadata.other` is non-standard; should be inline `<script>` Server Component |
| Symptom-based landing pages | ❌ Missing | No "back pain," "musicians," "desk workers" pages |
| FAQ uses SEO-friendly question format | ⚠️ Partial | Questions in `faqItems` aren't specifically "What is AT?" style |
| Home page FAQ expanded with AT-demystifying Qs | ❌ Missing | Missing "Is AT like physical therapy?", "What happens in a session?" |
| Keyword expansion in `siteConfig` keywords | ⚠️ Partial | Good start, missing "somatic movement," "Davis County," "tech neck" etc. |
| `<Image />` with `priority` for hero | ❌ Missing | Plain `<img>` used throughout |
| ISR on content-heavy pages | ❌ Missing | No `revalidate` export |
| `/bountiful-group` local page | ❌ Missing | Not in sitemap or app |

---

## Proposed Changes

### 1. Core Metadata Improvements

#### [MODIFY] [layout.tsx](file:///Users/freq/digital-brain2/01_Use_Yourself_Well/07_Website/src/app/layout.tsx)

- Expand `keywords` array with high-value symptom + location terms: "tech neck relief Utah," "somatic movement classes Davis County," "posture specialist Bountiful," "back pain without surgery Utah," "Alexander Technique for musicians Utah," etc.
- Fix `metadataBase` OG image reference — replace generic `house.png` with a proper `/og-image.jpg` (1200×630, named for SEO)
- Move JSON-LD out of `metadata.other` and into an inline `<script type="application/ld+json">` inside the layout body (this is the correct pattern per Next.js docs and the request's example)
- Add `ServiceSchema` JSON-LD block alongside the existing LocalBusiness — helps Google understand "Alexander Technique lessons" as a service

#### [MODIFY] [course.ts](file:///Users/freq/digital-brain2/01_Use_Yourself_Well/07_Website/src/lib/course.ts)

- Expand `faqItems` with 4–5 AT-demystifying questions optimized for Featured Snippets:
  - "What happens during an Alexander Technique session?"
  - "Is Alexander Technique like physical therapy or chiropractic care?"
  - "Can Alexander Technique help with back pain?"
  - "How is Alexander Technique different from yoga or Pilates?"
  - "How many sessions do I need?"
- Add a `localKeywords` export (optional helper — strings used in page copy and alt text)

---

### 2. New Symptom/Location Landing Page

#### [NEW] `app/bountiful-group/page.tsx`

A dedicated local page targeting "Alexander Technique Bountiful UT" and "somatic movement classes Davis County." Includes:
- Per-page `metadata` with hyper-local description + canonical
- `LocalBusiness` JSON-LD inline `<script>` Server Component (as shown in the request)
- `<h1>` "Alexander Technique Classes in Bountiful, UT"
- Sections: What is a study group?, Who is it for? (desk workers, musicians, pain sufferers), What to expect, Schedule/CTA
- Links back to `/one-skill` and `/workshops` (internal linking)

#### [MODIFY] [sitemap.ts](file:///Users/freq/digital-brain2/01_Use_Yourself_Well/07_Website/src/app/sitemap.ts)

- Add `/bountiful-group` with `priority: 0.9` and `changeFrequency: 'weekly'`

---

### 3. LCP & Core Web Vitals — Hero Image

#### [MODIFY] [hero.tsx](file:///Users/freq/digital-brain2/01_Use_Yourself_Well/07_Website/src/components/hero.tsx)

- Replace `<img src="/images/bg-01.jpg" aria-hidden>` with Next.js `<Image>` component with:
  - `priority` prop (signals preload to the server — direct LCP improvement)
  - explicit `width` and `height` (prevents CLS)
  - `alt=""` kept (decorative image)
  - `fill` layout + `object-cover` class preserved

#### [MODIFY] [mechanism.tsx](file:///Users/freq/digital-brain2/01_Use_Yourself_Well/07_Website/src/components/mechanism.tsx)

- Replace `<img src="/images/ChrisWorking.jpg" alt="Christopher working with a student">` with `<Image>`:
  - Proper alt text: `"Christopher Neville guiding a student through Alexander Technique in Bountiful, Utah"`
  - Explicit dimensions to prevent CLS

---

### 4. FAQ — Featured Snippet Optimization

#### [MODIFY] [faq-section.tsx](file:///Users/freq/digital-brain2/01_Use_Yourself_Well/07_Website/src/components/faq-section.tsx)

- Wrap the FAQ section in a `<script type="application/ld+json">` for `FAQPage` schema — Google uses this to power rich results in search
- The FAQ items are already driven from `faqItems` in `course.ts`; new questions added there flow automatically

---

### 5. OG Image

#### [NEW] `/public/og-image.jpg` (or generate via `app/opengraph-image.tsx`)

> [!IMPORTANT]
> This requires a decision. Two options:
> - **Option A**: Use `app/opengraph-image.tsx` (Next.js ImageResponse API) — dynamic, no manual image needed, auto-optimized
> - **Option B**: Generate a static 1200×630 JPG with the AI image tool and place in `public/`
>
> I recommend **Option A** (dynamic) as it's lower maintenance.

---

## Open Questions

> [!IMPORTANT]
> **Q1: Bountiful Study Group — does this page exist yet?**
> The `/bountiful-group` route doesn't exist in the codebase. Should I create a full content page, or just the metadata/shell? Is there an actual recurring study group happening that needs scheduling info?

> [!IMPORTANT]
> **Q2: Symptom landing pages — how many?**
> The SEO brief mentions pages like "Managing Tech Neck," "AT for Musicians," and "Ergonomics for Desk Workers." Do you want all three created now, or just the Bountiful local page as a starting point?

> [!NOTE]
> **Q3: OG Image approach** — Option A (dynamic `opengraph-image.tsx`) or Option B (static generated JPG)?

---

## Verification Plan

### Automated
```bash
# Build to confirm no type errors
npm run build

# Confirm /sitemap.xml and /robots.txt are reachable
curl https://useyourselfwell.com/sitemap.xml
curl https://useyourselfwell.com/robots.txt
```

### Manual
- Use [Google Rich Results Test](https://search.google.com/test/rich-results) on `/bountiful-group` to confirm JSON-LD renders
- Run PageSpeed Insights on homepage before/after to measure LCP improvement from `<Image priority>`
- Confirm FAQ `FAQPage` schema is detected in Rich Results Test
