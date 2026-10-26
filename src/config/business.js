/**
 * Public business facts for Journaly.
 *
 * Journaly is the brand. The legal entity and any parent-brand line are
 * configuration, because those details are not finally confirmed.
 *
 * TODO — owner must fill these in before they are shown as facts.
 * Null, empty string, and empty arrays render nothing. Do not invent values here.
 *
 * - legalEntityName: currently "SAZO Management Private Limited" (unconfirmed)
 * - parentBrand.enabled: keep false until the parent-brand line is confirmed
 * - parentBrand.label: e.g. "A KAMN venture" (unused while enabled is false)
 * - parentBrand.href: e.g. https://kamn-growth.vercel.app (unused while enabled is false)
 * - minimumOrderQuantity: not confirmed
 * - leadTime: not confirmed
 * - publishedFromPrice: not confirmed
 * - policy.*: commercial terms. Null means the term is confirmed in the quote, not published here.
 * - clientNames: none confirmed
 * - testimonials: none confirmed for the business offer
 * - certifications: none confirmed (including eco / sustainability claims)
 * - stats: none confirmed
 * - gstInvoice: off until a GST invoice on custom orders is confirmed
 * - panIndiaDelivery: off until pan-India delivery should be shown as a trust point
 * - clientLogos, caseStudies, portfolio: empty until real assets exist
 * - heroAb.enabled: off. Variants are not shown until the test is turned on
 * - pricing ranges live in src/config/pricing.js and stay empty until real prices exist
 * - seasonal order-by lead time lives in src/config/seasons.js and stays unset until you choose a campaign deadline
 */

export const BUSINESS = {
  brandName: 'Journaly',
  siteUrl: 'https://journaly.in',
  ownerName: 'Mohammad Saiful Haque',
  legalEntityName: 'SAZO Management Private Limited',
  parentBrand: {
    enabled: false,
    label: 'A KAMN venture',
    href: 'https://kamn-growth.vercel.app'
  },
  whatsappDisplay: '+91 96998 97763',
  whatsappE164: '919699897763',
  contactEmail: 'saifulbusiness47@gmail.com',
  country: 'India',
  minimumOrderQuantity: null,
  leadTime: null,
  publishedFromPrice: null,
  clientNames: [],
  testimonials: [],
  certifications: [],
  stats: [],
  gstInvoice: false,
  panIndiaDelivery: false,
  clientLogos: [],
  caseStudies: [],
  portfolio: [],
  policy: {
    paymentTerms: null,
    cancellationWindow: null,
    deliveryWindow: null,
    returnWindow: null,
    grievanceOfficerName: null,
    registeredAddress: null
  },
  heroAb: {
    enabled: false,
    variants: [
      {
        id: 'control',
        headline: 'Custom branded journals for businesses in India.'
      },
      {
        id: 'keep',
        headline: 'Branded journals for clients, teams, and events.'
      }
    ]
  }
};

export function confirmedLegalEntity() {
  const name = BUSINESS.legalEntityName?.trim();
  return name || null;
}

export function parentBrandLink() {
  const parent = BUSINESS.parentBrand;
  if (!parent?.enabled) return null;
  const label = parent.label?.trim();
  const href = parent.href?.trim();
  if (!label || !href) return null;
  return { label, href };
}

export function hasFact(value) {
  if (value == null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}
