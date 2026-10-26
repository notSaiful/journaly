/**
 * Public business facts for Journaly.
 *
 * Journaly is the brand. The legal entity and any parent-brand line are
 * configuration, because those details are not finally confirmed.
 *
 * TODO — owner must fill these in before they are shown as facts.
 * Null, empty string, and empty arrays render nothing. Do not invent values here.
 *
 * - legalEntityName: "SAZO Management Private Limited"
 * - parentBrand.enabled: stays false. No parent-brand line is published.
 * - minimumOrderQuantity: 50 units, approved for the public site
 * - leadTime: not confirmed. Leave null so no lead time is shown.
 * - publishedFromPrice: not confirmed
 * - policy.*: commercial terms. Null means the term is confirmed in the quote, not published here.
 * - clientNames: none confirmed
 * - testimonials: none confirmed for the business offer
 * - certifications: none confirmed (including eco / sustainability claims)
 * - stats: none confirmed
 * - gstInvoice: off. Do not show a GST invoice claim.
 * - panIndiaDelivery: on. Delivery across India is an approved public fact.
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
    label: '',
    href: ''
  },
  whatsappDisplay: '+91 96998 97763',
  whatsappE164: '919699897763',
  contactEmail: 'saifulbusiness47@gmail.com',
  country: 'India',
  minimumOrderQuantity: 50,
  leadTime: null,
  publishedFromPrice: null,
  clientNames: [],
  testimonials: [],
  certifications: [],
  stats: [],
  gstInvoice: false,
  panIndiaDelivery: true,
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

export const DESIGN_MOCKUP =
  'A free digital design mockup with up to 2 revision rounds before you order.';

export const UNDER_MINIMUM_NOTE = 'Need fewer than 50? Ask us about a paid sample.';

export const NAME_PERSONALISATION = 'Name personalisation on each journal is available.';

export function hasFact(value) {
  if (value == null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}
