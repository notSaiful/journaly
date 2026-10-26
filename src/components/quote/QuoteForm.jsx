import { useState } from 'react';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';
import { trackFunnel } from '../../utils/funnel';
import { backupQuoteLead } from '../../utils/quoteBackup';
import { useFeaturedSeason } from '../../utils/useFeaturedSeason';
import { DESIGN_MOCKUP, UNDER_MINIMUM_NOTE } from '../../config/business';
import { JOURNAL_TYPES } from '../../config/pricing';
import {
  BRANDING_OPTIONS,
  DEADLINE_OPTIONS,
  JOURNALY_WHATSAPP_DISPLAY,
  QUANTITY_OPTIONS,
  USE_CASE_OPTIONS,
  buildInstitutionalQuoteUrl,
  openWhatsAppUrl,
  validateQuoteStep1,
  validateQuoteStep2
} from '../../utils/whatsappQuote';

const fieldClass =
  'w-full min-h-11 px-4 py-3 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-sm focus:outline-none focus:border-[#E5A93C]';
const labelClass =
  'text-xs font-mono uppercase tracking-wider text-[#1E1B18] block mb-1.5 font-medium';

const FIELD_IDS = {
  name: 'quote-name',
  phone: 'quote-phone',
  quantity: 'quote-quantity',
  company: 'quote-company',
  email: 'quote-email',
  useCase: 'quote-use-case',
  branding: 'quote-branding',
  deadline: 'quote-deadline',
  notes: 'quote-notes'
};

function journalLabel(id) {
  return JOURNAL_TYPES.find((item) => item.id === id)?.label || '';
}

export default function QuoteForm({ sampleKit = false, estimate = {} }) {
  const season = useFeaturedSeason();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [completedStep, setCompletedStep] = useState(1);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    quantity: estimate.quantityTier && QUANTITY_OPTIONS.some((item) => item.value === estimate.quantityTier)
      ? estimate.quantityTier
      : '',
    company: '',
    email: '',
    useCase: '',
    branding: estimate.brandingMethod && BRANDING_OPTIONS.includes(estimate.brandingMethod)
      ? estimate.brandingMethod
      : '',
    deadline: '',
    notes: '',
    journalType: journalLabel(estimate.journalType),
    sampleKit
  });

  const updateField = (field) => (event) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }));
    if (error) setError('');
  };

  const payloadFor = (activeStep) => ({
    ...formData,
    sampleKit,
    season: season?.name || '',
    sourcePage: typeof window === 'undefined' ? '' : window.location.pathname,
    step: String(activeStep),
    journalType: formData.journalType,
    quantityTier: estimate.quantityTier || '',
    brandingMethod: estimate.brandingMethod || formData.branding
  });

  const complete = (activeStep) => {
    const step1Error = validateQuoteStep1(formData);
    if (step1Error) {
      setError(step1Error.message);
      setStep(1);
      document.getElementById(FIELD_IDS[step1Error.field])?.focus();
      return;
    }
    const step2Error = validateQuoteStep2(formData);
    if (step2Error) {
      setError(step2Error.message);
      setStep(2);
      document.getElementById(FIELD_IDS[step2Error.field])?.focus();
      return;
    }

    const lead = payloadFor(activeStep);
    const { url } = buildInstitutionalQuoteUrl(lead);
    trackFunnel(activeStep === 1 ? 'quote_step_1_completed' : 'quote_step_2_completed', {
      quantity: lead.quantity,
      sample_kit: Boolean(sampleKit)
    });
    if (sampleKit) trackFunnel('sample_requested', { step: activeStep });
    trackFunnel('whatsapp_opened', { step: activeStep });
    trackEvent('business_lead', { quantity: lead.quantity, step: activeStep, sample_kit: Boolean(sampleKit) });
    setWhatsappUrl(url);
    setCompletedStep(activeStep);
    setSubmitted(true);
    openWhatsAppUrl(url);
    backupQuoteLead({
      name: lead.name,
      phone: lead.phone,
      quantity: lead.quantity,
      company: lead.company,
      email: lead.email,
      use_case: lead.useCase,
      branding: lead.branding,
      deadline: lead.deadline,
      notes: lead.notes,
      sample_kit: Boolean(sampleKit),
      season: lead.season,
      source_page: lead.sourcePage,
      step: String(activeStep),
      journal_type: lead.journalType,
      quantity_tier: lead.quantityTier,
      branding_method: lead.brandingMethod
    });
  };

  const submitStep1 = (event) => {
    event.preventDefault();
    complete(1);
  };

  const goToStep2 = () => {
    const step1Error = validateQuoteStep1(formData);
    if (step1Error) {
      setError(step1Error.message);
      document.getElementById(FIELD_IDS[step1Error.field])?.focus();
      return;
    }
    setError('');
    setStep(2);
  };

  const submitStep2 = (event) => {
    event.preventDefault();
    complete(2);
  };

  if (submitted) {
    return (
      <div className="text-center py-6 sm:py-10">
        <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto mb-4" aria-hidden="true" />
        <h3 className="text-3xl font-medium text-[#1E1B18] mb-2">Press Send in WhatsApp</h3>
        <p className="text-sm text-[#6A6054] font-light max-w-md mx-auto">
          Your quote is filled in and ready for {JOURNALY_WHATSAPP_DISPLAY}. WhatsApp should have opened. Press Send there so the request reaches us. We reply on WhatsApp with a quote.
          {completedStep === 1 ? ' You can still add company and deadline in the chat.' : ''}
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackFunnel('whatsapp_opened', { step: 'fallback' })}
          className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-11 px-6 py-4 rounded-full bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border-2 border-[#1E1B18] text-xs font-semibold uppercase tracking-widest"
        >
          <MessageCircle className="w-4 h-4 text-[#E5A93C]" aria-hidden="true" />
          <span>Open WhatsApp</span>
        </a>
        <p className="mt-4 text-xs text-[#6A6054] font-light max-w-md mx-auto">
          If WhatsApp did not open, use the button above. Nothing is ordered until you press Send.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setStep(1);
          }}
          className="mt-5 min-h-11 text-xs font-mono uppercase tracking-wider text-[#6A6054] hover:text-[#1E1B18] underline underline-offset-4 cursor-pointer"
        >
          Edit details
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-[#E5DDCF] pb-4 mb-6">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#7C5A1E] mb-2">
          Step {step} of 2{step === 1 ? ' · the next step is optional' : ' · optional'}
        </p>
        <h2 className="text-2xl font-medium text-[#1E1B18]">
          {step === 1 ? 'Start with three details' : 'Add anything that helps the quote'}
        </h2>
        <p className="text-xs text-[#6A6054] font-light mt-1">
          {step === 1
            ? 'Name, WhatsApp number, and approximate quantity are enough to send. Submitting opens WhatsApp with the message filled in.'
            : 'Skip this if you would rather type the rest in WhatsApp. Nothing is ordered until you press Send.'}
        </p>
        <p className="mt-3 text-sm text-[#1E1B18]">{DESIGN_MOCKUP}</p>
        {sampleKit ? (
          <p className="mt-3 text-sm text-[#1E1B18]">This request includes a sample kit. We confirm what a sample includes when we reply.</p>
        ) : null}
        {formData.journalType ? (
          <p className="mt-2 text-sm text-[#6A6054]">Journal type from the estimator: {formData.journalType}.</p>
        ) : null}
      </div>

      {error ? (
        <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
          {error}
        </p>
      ) : null}

      {step === 1 ? (
        <form onSubmit={submitStep1} className="space-y-5" noValidate>
          <div>
            <label htmlFor={FIELD_IDS.name} className={labelClass}>Your name</label>
            <input id={FIELD_IDS.name} name="name" type="text" autoComplete="name" required maxLength={80} value={formData.name} onChange={updateField('name')} className={fieldClass} />
          </div>
          <div>
            <label htmlFor={FIELD_IDS.phone} className={labelClass}>WhatsApp or phone</label>
            <input id={FIELD_IDS.phone} name="phone" type="tel" autoComplete="tel" required inputMode="tel" maxLength={32} placeholder="+91" value={formData.phone} onChange={updateField('phone')} className={fieldClass} />
          </div>
          <div>
            <label htmlFor={FIELD_IDS.quantity} className={labelClass}>Approximate quantity</label>
            <select id={FIELD_IDS.quantity} name="quantity" required value={formData.quantity} onChange={updateField('quantity')} className={fieldClass}>
              <option value="">Choose a range</option>
              {QUANTITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <p className="mt-2 text-sm text-[#6A6054] font-light">{UNDER_MINIMUM_NOTE}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button type="submit" className="inline-flex min-h-11 items-center justify-center px-6 py-3.5 rounded-full bg-[#1E1B18] text-[#FAF7F2] text-xs font-semibold uppercase tracking-widest cursor-pointer">
              Send on WhatsApp
            </button>
            <button type="button" onClick={goToStep2} className="inline-flex min-h-11 items-center justify-center px-6 py-3.5 rounded-full bg-white border-2 border-[#1E1B18] text-xs font-semibold uppercase tracking-widest cursor-pointer">
              Add company and deadline
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={submitStep2} className="space-y-5" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor={FIELD_IDS.company} className={labelClass}>Company <span className="normal-case tracking-normal text-[#6A6054]">(optional)</span></label>
              <input id={FIELD_IDS.company} name="organization" type="text" autoComplete="organization" maxLength={120} value={formData.company} onChange={updateField('company')} className={fieldClass} />
            </div>
            <div>
              <label htmlFor={FIELD_IDS.email} className={labelClass}>Work email <span className="normal-case tracking-normal text-[#6A6054]">(optional)</span></label>
              <input id={FIELD_IDS.email} name="email" type="email" autoComplete="email" maxLength={120} value={formData.email} onChange={updateField('email')} className={fieldClass} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor={FIELD_IDS.useCase} className={labelClass}>Use case</label>
              <select id={FIELD_IDS.useCase} name="useCase" value={formData.useCase} onChange={updateField('useCase')} className={fieldClass}>
                <option value="">Optional</option>
                {USE_CASE_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={FIELD_IDS.branding} className={labelClass}>Branding</label>
              <select id={FIELD_IDS.branding} name="branding" value={formData.branding} onChange={updateField('branding')} className={fieldClass}>
                <option value="">Optional</option>
                {BRANDING_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor={FIELD_IDS.deadline} className={labelClass}>Deadline</label>
            <select id={FIELD_IDS.deadline} name="deadline" value={formData.deadline} onChange={updateField('deadline')} className={fieldClass}>
              <option value="">Optional</option>
              {DEADLINE_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={FIELD_IDS.notes} className={labelClass}>Notes</label>
            <textarea id={FIELD_IDS.notes} name="notes" rows={4} maxLength={1000} value={formData.notes} onChange={updateField('notes')} className={fieldClass} />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button type="submit" className="inline-flex min-h-11 items-center justify-center px-6 py-3.5 rounded-full bg-[#1E1B18] text-[#FAF7F2] text-xs font-semibold uppercase tracking-widest cursor-pointer">
              Send on WhatsApp
            </button>
            <button type="button" onClick={() => complete(1)} className="inline-flex min-h-11 items-center justify-center px-6 py-3.5 rounded-full bg-white border-2 border-[#1E1B18] text-xs font-semibold uppercase tracking-widest cursor-pointer">
              Skip and send what I have
            </button>
          </div>
          <button type="button" onClick={() => setStep(1)} className="text-xs font-mono uppercase tracking-wider text-[#6A6054] underline underline-offset-4 cursor-pointer min-h-11">
            Back to name and quantity
          </button>
        </form>
      )}
    </div>
  );
}
