# JOURNALY — SITE & REPOSITORY AUDIT

**Date:** October 3, 2026  
**Role:** Senior Creative Director + Awwwards Interaction Designer + Ecommerce CRO Lead + Frontend Engineer  
**Document:** `/docs/JOURNALY_SITE_AUDIT.md`  

---

## 1. Technical Architecture & Framework

- **Build Tool:** Vite 8.3.2 (ESM module bundling)
- **UI Framework:** React 19.2.8 (`react`, `react-dom`)
- **Styling:** Tailwind CSS v4.3.3 (`@tailwindcss/vite`) + Custom design layer in `src/index.css`
- **Iconography:** `lucide-react` (v1.50.0)
- **Visual Effects:** `canvas-confetti` (v1.9.4)
- **Linter:** `oxlint` (v1.81.0)
- **Routing Paradigm:** Previously single-page with hash matching (`#terms`, `#privacy`, `#refund-policy`, `#shipping-policy`, `#contact-us`). Must be upgraded to a robust URL path + hash fallback routing architecture supporting deep routes (`/`, `/shop`, `/collections`, `/five-minute-habit`, `/personalise`, `/gifts`, `/business`, `/about`, `/track-order`, `/order-success`, `/faq`, `/contact`, `/terms-and-conditions`, `/privacy-policy`, `/refund-cancellation-policy`, `/shipping-delivery-policy`, `/grievance-redressal`) without breaking single-page deployment.

---

## 2. Route Audit

| Route Path | Type | Status | Required Enhancement |
| :--- | :--- | :--- | :--- |
| `/` | Homepage | Working | Transform from section stack into 10-scene continuous brand story (Hero journal opening, What photos miss, Habit ritual, Habit progression, Featured journals, Inside journal, Shop by moment, Personalisation, Social proof, Final call). |
| `/five-minute-habit` | Landing Page | **Missing** | Dedicated high-converting habit acquisition page with minimal distraction, timeline ritual, and interior proof. |
| `/shop` | Commerce Catalog | **Missing** | Structured, scannable product grid with category filtering (All, Everyday, Gratitude, College, Travel, Relationships, Gifts, Notebooks). |
| `/collections` | Curated Chapters | **Missing** | Editorial chapter curation linking life stages to tailored guided journals. |
| `/product/:id` | PDP | Partial (Modal only) | Full standalone PDP route + enhanced modal quick-view with factual specs, variant selector, live personalisation preview, and sticky Add-to-Bag. |
| `/personalise` | Custom Studio | Partial (MonogramStudio unmounted) | High-fidelity 5-step live personalisation studio with dynamic HTML/canvas foil name stamping. |
| `/gifts` | Gifting Suite | **Missing** | Dedicated gift bundles, unboxing presentation, complimentary card writer, and corporate/family gifting. |
| `/business` | B2B & Corporate | **Missing** | Custom guided journals for teams, colleges, orientations, conferences, and event branding. |
| `/about` | Brand Narrative | **Missing** | Deep story: "We save more photos than any generation before us. And somehow, whole months still disappear." |
| `/track-order` | Post-Purchase Utility | **Missing** | 5-stage order status visualizer (Confirmed, Packed, Shipped, Out for Delivery, Delivered) with realistic lookup logic. |
| `/order-success` | Conversion Post-Checkout | **Missing** | Post-purchase celebration page with order ID, summary, tracking link, and habit onboarding prompt. |
| `/faq` | Knowledge Center | Partial (GuaranteeFAQ on Home) | Standalone comprehensive FAQ hub organized into 10 clear categories. |
| `/contact` | Merchant Helpline | Working (`#contact-us`) | Upgraded with dedicated form validation, response SLA, and official corporate identity. |
| `/terms-and-conditions` | Legal Compliance | Working (`#terms`) | Add standalone URL path route with standardized Razorpay/card processing clause. |
| `/privacy-policy` | Legal Compliance | Working (`#privacy`) | Standardized PCI-DSS Level 1 & data protection disclosures. |
| `/refund-cancellation-policy` | Legal Compliance | Working (`#refund-policy`) | 60-day empty book guarantee & explicit 5–7 business days refund turnaround. |
| `/shipping-delivery-policy` | Legal Compliance | Working (`#shipping-policy`) | 24-hr dispatch, domestic 2–4 days, global 4–8 days via BlueDart/DHL. |
| `/grievance-redressal` | Legal Compliance | **Missing** | Mandatory Indian/international e-commerce compliance officer details and ticket escalation. |

---

## 3. Product Data & Specifications Audit

- **Current Inventory:** 5 items defined in `src/data/products.js`:
  1. `architect-dot-grid` ($38) — Forest Sage, Midnight Onyx, Warm Sand, Terracotta.
  2. `daily-clarity-planner` ($42) — Midnight Onyx, Forest Sage, Terracotta.
  3. `artisan-raw-linen` ($40) — Belgian flax linen.
  4. `deep-work-ledger` ($44) — Saddle leather.
  5. `solid-brass-pen` ($28) — Marine-grade machined brass.
- **Newly Audited Assets:**
  - High-res packshots and interior spreads for the **5 Minutes Gratitude Journal** ($36) and **5 Minutes Manifestation Journal** ($36).
  - Editorial lifestyle assets: `journal-study-desk.jpg`, `journal-floral-coffee-desk.png`, `journal-floral-hands.png`, `journal-floral-gift-box.png`.
- **Factual Integrity Mandate:** Specifications must strictly document real attributes:
  - **Paper:** 160 GSM cold-pressed acid-free bamboo paper (zero bleed/ghosting).
  - **Binding:** 180° flat-lay Smyth-sewn thread binding.
  - **Dimensions:** Standard A5 (148 x 210 mm) and A5+ Executive.
  - **Pages:** 224 numbered archival pages.
  - **Bookmarks:** Dual woven ribbon markers with brass aglets.
  - **Gusset:** Expandable rear keepsake pocket.
  - **Origin:** Hand-bound in small batches.

---

## 4. Design Strengths, Weaknesses & Opportunities

### Current Strengths
1. **Clean Brand Foundation:** The name **JOURNALY** is properly reflected across core legal documents, navigation, and badges.
2. **High Conversion Cart:** Slide-out drawer with cart items, upsells, free shipping milestone indicator ($60 threshold), and checkout integration.
3. **Legal Compliance Foundation:** Thorough policy documents already authored for Razorpay merchant verification.
4. **Hero and Media Video Assets:** Natural brightness, looping videos without playback buttons or audio controls.

### Current Weaknesses
1. **Monotony in Section Rhythm:** Too many consecutive cream-colored sections without cinematic dark contrast or photography breaks.
2. **Underutilized Asset Power:** Outstanding real photography from `untitled folder 2` (such as the unboxing gift set, hands holding journal, marble coffee desk, and stacked editions) remained unmapped.
3. **Disjointed Navigation:** Navigation lacked links to dedicated shopping categories, gifting, about story, and order tracking.
4. **Font Redundancy:** Loaded three font families (`Cormorant Garamond`, `Plus Jakarta Sans`, `JetBrains Mono`). Must constrain strictly to **two fonts** (Sans 80% + Serif 20%) to uphold design law.
5. **Lack of Signature Tactile Micro-Interactions:** The physical journal verbs (OPEN, FLIP, PLACE, STACK, WRITE, SLIDE, FOLD, KEEP) need to be deeply embedded into interactions.

---

## 5. Mobile & Responsive Audit

- **Viewport Range Tested:** 320px to 430px mobile, 768px tablet, 1440px desktop.
- **Mobile Weaknesses Identified:**
  - Full-screen desktop height (`h-screen`) on small screens can squeeze vertical space on portrait devices with dynamic browser navigation bars (needs `min-h-[100dvh]` and responsive text scale).
  - Floating white text on complex photographic backgrounds requires calibrated text shadows and scrims for legibility.
  - Cart drawer and modals require sticky touch-friendly checkout buttons with proper safe-area padding.

---

## 6. Motion System Audit

- **Existing Motion:** Mostly basic transitions and requestAnimationFrame carousel scroll.
- **Upgraded Motion System Plan:**
  - **Micro Tokens:** 120–180ms for buttons, tabs, input focuses.
  - **UI Tokens:** 180–280ms for drawer slides, modal reveals.
  - **Content Tokens:** 350–600ms for staggered card entries and tab switches.
  - **Editorial Tokens:** 550–950ms for sticky timeline changes, memory reveals, and page lifts.
  - **Reduced Motion Support:** Respect `prefers-reduced-motion: reduce` throughout all components.
