import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import {
  BRANDING_OPTIONS,
  DEADLINE_OPTIONS,
  JOURNALY_WHATSAPP_DISPLAY,
  QUANTITY_OPTIONS,
  USE_CASE_OPTIONS,
  USE_CASES,
  WHATSAPP_CHAT_URL,
  buildInstitutionalQuoteUrl,
  openWhatsAppUrl,
  validateInstitutionalQuote
} from '../utils/whatsappQuote';

const fieldClass =
  'w-full px-4 py-3 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-sm focus:outline-none focus:border-[#E5A93C]';
const labelClass =
  'text-xs font-mono uppercase tracking-wider text-[#1E1B18] block mb-1.5 font-medium';

const FIELD_IDS = {
  name: 'quote-name',
  email: 'quote-email',
  phone: 'quote-phone',
  company: 'quote-company',
  quantity: 'quote-quantity',
  useCase: 'quote-use-case',
  branding: 'quote-branding',
  deadline: 'quote-deadline'
};

const EMPTY_QUOTE = {
  name: '',
  email: '',
  phone: '',
  company: '',
  quantity: '',
  useCase: '',
  branding: '',
  deadline: '',
  notes: ''
};

export default function BusinessPage() {
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState(EMPTY_QUOTE);

  const updateField = (field) => (event) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }));
    if (error) setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationError = validateInstitutionalQuote(formData);
    if (validationError) {
      setError(validationError.message);
      document.getElementById(FIELD_IDS[validationError.field])?.focus();
      return;
    }

    const { url } = buildInstitutionalQuoteUrl(formData);
    trackEvent('business_lead', { company: formData.company, quantity: formData.quantity });
    setWhatsappUrl(url);
    setSubmitted(true);
    openWhatsAppUrl(url);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18] font-sans min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-4xl mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#7C5A1E] font-semibold block mb-3">
            Custom journals for businesses
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#1E1B18] tracking-tight leading-tight">
            Request a quote
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#6A6054] font-light max-w-xl">
            Tell us the quantity, deadline, and how you want the journals branded. We reply on WhatsApp with a quote. No order is placed on this form.
          </p>
          <a
            href={WHATSAPP_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border-2 border-[#1E1B18] text-xs font-semibold uppercase tracking-widest transition-all shadow-md active:scale-95"
          >
            <MessageCircle className="w-4 h-4 text-[#E5A93C]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {USE_CASES.map((item) => (
            <div key={item} className="p-4 rounded-xl bg-white border border-[#E5DDCF] shadow-xs">
              <span className="text-xs font-serif font-medium text-[#1E1B18] block mb-1">
                {item}
              </span>
              <span className="text-[10px] text-[#6A6054] font-mono uppercase tracking-wider block">
                Custom Foil Available
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#E5DDCF] shadow-xl max-w-3xl mx-auto">
          {submitted ? (
            <div className="text-center py-6 sm:py-10">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto mb-4" />
              <h3 className="font-serif text-3xl font-normal text-[#1E1B18] mb-2">
                Press Send in WhatsApp
              </h3>
              <p className="text-sm text-[#6A6054] font-light max-w-md mx-auto">
                Your quote is filled in and ready for {JOURNALY_WHATSAPP_DISPLAY}. WhatsApp should have opened — press Send there so the request reaches us. We reply on WhatsApp with a quote.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border-2 border-[#1E1B18] text-xs font-semibold uppercase tracking-widest transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-[#E5A93C]" />
                <span>Open WhatsApp</span>
              </a>
              <p className="mt-4 text-xs text-[#6A6054] font-light max-w-md mx-auto">
                If WhatsApp did not open, use the button above. Nothing is delivered until you press Send.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-5 text-xs font-mono uppercase tracking-wider text-[#6A6054] hover:text-[#1E1B18] underline underline-offset-4 cursor-pointer"
              >
                Edit details
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="border-b border-[#E5DDCF] pb-4 mb-6">
                <h3 className="font-serif text-2xl font-normal text-[#1E1B18]">
                  Request an Institutional Quote
                </h3>
                <p className="text-xs text-[#6A6054] font-light mt-1">
                  Tell us the quantity, deadline, and branding. Submitting opens WhatsApp with these details filled in. Nothing is delivered until you press Send.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="quote-name" className={labelClass}>
                    Your Name
                  </label>
                  <input
                    id="quote-name"
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    maxLength={80}
                    value={formData.name}
                    onChange={updateField('name')}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="quote-email" className={labelClass}>
                    Work Email
                  </label>
                  <input
                    id="quote-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    maxLength={120}
                    value={formData.email}
                    onChange={updateField('email')}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="quote-phone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="quote-phone"
                    type="tel"
                    name="phone"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={24}
                    placeholder="+91 98XXX XXXXX"
                    value={formData.phone}
                    onChange={updateField('phone')}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="quote-company" className={labelClass}>
                    Organization / Company
                  </label>
                  <input
                    id="quote-company"
                    type="text"
                    name="organization"
                    required
                    autoComplete="organization"
                    maxLength={120}
                    value={formData.company}
                    onChange={updateField('company')}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="quote-quantity" className={labelClass}>
                    Estimated Quantity
                  </label>
                  <select
                    id="quote-quantity"
                    name="quantity"
                    required
                    value={formData.quantity}
                    onChange={updateField('quantity')}
                    className={fieldClass}
                  >
                    <option value="" disabled>
                      Select a quantity
                    </option>
                    {QUANTITY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="quote-deadline" className={labelClass}>
                    Deadline
                  </label>
                  <select
                    id="quote-deadline"
                    name="deadline"
                    required
                    value={formData.deadline}
                    onChange={updateField('deadline')}
                    className={fieldClass}
                  >
                    <option value="" disabled>
                      Select a deadline
                    </option>
                    {DEADLINE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="quote-use-case" className={labelClass}>
                    Use Case
                  </label>
                  <select
                    id="quote-use-case"
                    name="useCase"
                    required
                    value={formData.useCase}
                    onChange={updateField('useCase')}
                    className={fieldClass}
                  >
                    <option value="" disabled>
                      Select a use case
                    </option>
                    {USE_CASE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="quote-branding" className={labelClass}>
                    Branding
                  </label>
                  <select
                    id="quote-branding"
                    name="branding"
                    required
                    value={formData.branding}
                    onChange={updateField('branding')}
                    className={fieldClass}
                  >
                    <option value="" disabled>
                      Select branding
                    </option>
                    {BRANDING_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="quote-notes" className={labelClass}>
                  Notes
                </label>
                <textarea
                  id="quote-notes"
                  name="notes"
                  rows={3}
                  maxLength={800}
                  value={formData.notes}
                  onChange={updateField('notes')}
                  placeholder="Event, size, colours, or anything else we should know."
                  className={fieldClass}
                />
              </div>

              {error ? (
                <p role="alert" className="text-xs font-medium text-[#8B3A3A]">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border-2 border-[#1E1B18] text-xs font-semibold uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Send quote on WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-[#E5A93C]" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
