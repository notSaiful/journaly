/**
 * Institutional quote handoff to the Journaly WhatsApp line.
 * Message building stays pure so the link can be checked without a browser.
 */

import { BUSINESS } from '../config/business';

export const JOURNALY_WHATSAPP_NUMBER = BUSINESS.whatsappE164;

export const JOURNALY_WHATSAPP_DISPLAY = BUSINESS.whatsappDisplay;

const MAX_WHATSAPP_URL_LENGTH = 1800;

export const QUANTITY_OPTIONS = [
  { value: '25-50', label: '25 – 50 Units' },
  { value: '50-100', label: '50 – 100 Units' },
  { value: '100-250', label: '100 – 250 Units' },
  { value: '250-500', label: '250 – 500 Units' },
  { value: '500+', label: '500+ Units (Fully Bespoke)' },
  { value: 'unsure', label: 'Not sure yet' }
];

export const USE_CASES = [
  'Employee Onboarding',
  'Employee Appreciation',
  'Colleges & Graduations',
  'Conferences & Summits',
  'Boutique Hospitality',
  'Executive Events'
];

export const USE_CASE_OPTIONS = [...USE_CASES, 'Other'];

export const BRANDING_OPTIONS = [
  'Not sure yet',
  'No branding',
  'Gold foil logo',
  'Blind deboss logo',
  'Custom interior pages',
  'Foil, deboss, and interiors'
];

export const DEADLINE_OPTIONS = [
  'As soon as possible',
  'Within 2 weeks',
  'Within 1 month',
  'Within 3 months',
  'Flexible'
];

export function buildWhatsAppUrl(text) {
  return `https://wa.me/${JOURNALY_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const WHATSAPP_CHAT_URL = buildWhatsAppUrl(
  'Hi Journaly, I would like to discuss a custom journal order for my organization.'
);

function cleanLine(value) {
  return String(value ?? '').replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function cleanNotes(value) {
  return String(value ?? '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
}

function quantityLabel(value) {
  return QUANTITY_OPTIONS.find((option) => option.value === value)?.label || cleanLine(value);
}

function composeQuoteMessage(form, notes) {
  return [
    'Institutional quote request - Journaly',
    '',
    `Name: ${cleanLine(form.name)}`,
    `Company: ${cleanLine(form.company)}`,
    `Email: ${cleanLine(form.email)}`,
    `Phone: ${cleanLine(form.phone)}`,
    `Quantity: ${quantityLabel(form.quantity)}`,
    `Use case: ${cleanLine(form.useCase)}`,
    `Branding: ${cleanLine(form.branding)}`,
    `Deadline: ${cleanLine(form.deadline)}`,
    `Notes: ${notes || 'None'}`
  ].join('\n');
}

export function buildInstitutionalQuoteUrl(form) {
  let notes = cleanNotes(form.notes);
  let message = composeQuoteMessage(form, notes);
  let url = buildWhatsAppUrl(message);

  while (url.length > MAX_WHATSAPP_URL_LENGTH && notes.length > 0) {
    notes = notes.slice(0, Math.max(0, notes.length - 80)).trimEnd();
    message = composeQuoteMessage(form, notes ? `${notes}…` : '');
    url = buildWhatsAppUrl(message);
  }

  return { url, message };
}

function invalid(field, message) {
  return { field, message };
}

export function validateInstitutionalQuote(form) {
  if (!cleanLine(form.name)) return invalid('name', 'Enter your name.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanLine(form.email))) {
    return invalid('email', 'Enter a valid work email.');
  }
  const phoneDigits = cleanLine(form.phone).replace(/\D/g, '');
  if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    return invalid('phone', 'Enter a phone number we can reach you on.');
  }
  if (!cleanLine(form.company)) return invalid('company', 'Enter your organization or company.');
  if (!QUANTITY_OPTIONS.some((option) => option.value === form.quantity)) {
    return invalid('quantity', 'Choose an estimated quantity.');
  }
  if (!USE_CASE_OPTIONS.includes(form.useCase)) return invalid('useCase', 'Choose a use case.');
  if (!BRANDING_OPTIONS.includes(form.branding)) return invalid('branding', 'Choose a branding option.');
  if (!DEADLINE_OPTIONS.includes(form.deadline)) return invalid('deadline', 'Choose a deadline.');
  return null;
}

/**
 * Open WhatsApp from the submit click. A new tab keeps the confirmation on
 * this page; if the browser blocks that, continue in the same tab.
 */
export function openWhatsAppUrl(url) {
  if (typeof window === 'undefined') return false;

  const popup = window.open(url, '_blank');
  if (popup && !popup.closed) {
    try {
      popup.opener = null;
    } catch {
      // The new browsing context may already seal opener.
    }
    return true;
  }

  window.location.assign(url);
  return false;
}
