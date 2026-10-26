/**
 * Institutional quote handoff to the Journaly WhatsApp line.
 * Message building stays pure so the link can be checked without a browser.
 */

import { BUSINESS } from '../config/business.js';

export const JOURNALY_WHATSAPP_NUMBER = BUSINESS.whatsappE164;

export const JOURNALY_WHATSAPP_DISPLAY = BUSINESS.whatsappDisplay;

const MAX_WHATSAPP_URL_LENGTH = 1800;

export const QUANTITY_OPTIONS = [
  { value: '50-99', label: '50–99' },
  { value: '100-249', label: '100–249' },
  { value: '250-499', label: '250–499' },
  { value: '500+', label: '500+' }
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
  const lines = ['Quote request — Journaly', ''];
  const add = (label, value) => {
    const clean = cleanLine(value);
    if (clean) lines.push(`${label}: ${clean}`);
  };
  add('Name', form.name);
  add('Phone', form.phone);
  add('Quantity', quantityLabel(form.quantity));
  add('Company', form.company);
  add('Email', form.email);
  add('Use case', form.useCase);
  add('Branding', form.branding);
  add('Journal type', form.journalType);
  add('Deadline', form.deadline);
  if (form.sampleKit) lines.push('Sample kit: Requested');
  add('Season', form.season);
  lines.push(`Notes: ${notes || 'None'}`);
  return lines.join('\n');
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

export function validateQuoteStep1(form) {
  if (!cleanLine(form.name)) return invalid('name', 'Enter your name.');
  const phoneDigits = cleanLine(form.phone).replace(/\D/g, '');
  if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    return invalid('phone', 'Enter a WhatsApp number we can reach you on.');
  }
  if (!QUANTITY_OPTIONS.some((option) => option.value === form.quantity)) {
    return invalid('quantity', 'Choose an approximate quantity.');
  }
  return null;
}

export function validateQuoteStep2(form) {
  const email = cleanLine(form.email);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return invalid('email', 'Enter a valid work email, or leave it blank.');
  }
  if (form.useCase && !USE_CASE_OPTIONS.includes(form.useCase)) {
    return invalid('useCase', 'Choose a use case, or leave it blank.');
  }
  if (form.branding && !BRANDING_OPTIONS.includes(form.branding)) {
    return invalid('branding', 'Choose a branding option, or leave it blank.');
  }
  if (form.deadline && !DEADLINE_OPTIONS.includes(form.deadline)) {
    return invalid('deadline', 'Choose a deadline, or leave it blank.');
  }
  return null;
}

export function validateInstitutionalQuote(form) {
  return validateQuoteStep1(form) || validateQuoteStep2(form);
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
