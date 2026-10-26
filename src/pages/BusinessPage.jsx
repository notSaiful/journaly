import { MessageCircle } from 'lucide-react';
import { useRouter } from '../utils/router';
import { trackFunnel } from '../utils/funnel';
import { USE_CASES, WHATSAPP_CHAT_URL, JOURNALY_WHATSAPP_DISPLAY } from '../utils/whatsappQuote';
import QuoteForm from '../components/quote/QuoteForm';
import PriceEstimator from '../components/b2b/PriceEstimator';

export default function BusinessPage() {
  const { search } = useRouter();
  const params = new URLSearchParams(search || '');
  const sampleKit = params.get('sample') === '1';
  const estimate = {
    journalType: params.get('journal') || '',
    quantityTier: params.get('tier') || '',
    brandingMethod: params.get('branding') || ''
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#7C5A1E] font-semibold block mb-3">
            Custom journals for businesses
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight">
            Request a quote
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#6A6054] font-light max-w-xl">
            Start with your name, WhatsApp number, and approximate quantity. Company, email, branding, and deadline can wait. We reply on WhatsApp at {JOURNALY_WHATSAPP_DISPLAY}. No order is placed on this form.
          </p>
          <a
            href={WHATSAPP_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackFunnel('whatsapp_opened', { cta: 'quote_page' })}
            className="mt-8 inline-flex w-full sm:w-auto min-h-11 items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border-2 border-[#1E1B18] text-xs font-semibold uppercase tracking-widest"
          >
            <MessageCircle className="w-4 h-4 text-[#E5A93C]" aria-hidden="true" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {USE_CASES.map((item) => (
            <div key={item} className="p-4 rounded-xl bg-white border border-[#E5DDCF]">
              <span className="text-xs font-medium text-[#1E1B18] block">{item}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5DDCF] shadow-xl max-w-3xl mx-auto">
          <QuoteForm key={search || 'quote'} sampleKit={sampleKit} estimate={estimate} />
        </div>
      </div>
      <PriceEstimator id="quote-price-estimator" />
    </div>
  );
}
