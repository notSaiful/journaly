import { useState } from 'react';
import { useRouter } from '../../utils/router';
import { trackFunnel } from '../../utils/funnel';
import { JOURNAL_TYPES, findPriceRange, formatInrRange, PRICE_RANGES } from '../../config/pricing';
import { BRANDING_OPTIONS, QUANTITY_OPTIONS } from '../../utils/whatsappQuote';

const fieldClass =
  'w-full min-h-11 px-4 py-3 rounded-xl border border-[#E5DDCF] bg-white text-sm focus:outline-none focus:border-[#E5A93C]';

export default function PriceEstimator({ id = 'price-estimator' }) {
  const { navigate } = useRouter();
  const [journalType, setJournalType] = useState('unsure');
  const [quantityTier, setQuantityTier] = useState('50-99');
  const [brandingMethod, setBrandingMethod] = useState('Not sure yet');
  const range = findPriceRange({ journalType, quantityTier, brandingMethod });
  const pricesPublished = PRICE_RANGES.length > 0;

  const ask = () => {
    trackFunnel('estimator_used', {
      journal_type: journalType,
      quantity_tier: quantityTier,
      branding_method: brandingMethod,
      price_shown: Boolean(range)
    });
    const params = new URLSearchParams({
      journal: journalType,
      tier: quantityTier,
      branding: brandingMethod
    });
    navigate(`/business?${params.toString()}`);
  };

  return (
    <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby={`${id}-heading`}>
      <div className="rounded-3xl border border-[#E5DDCF] bg-white p-6 sm:p-10">
        <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#7C5A1E] font-semibold mb-3">Price</p>
        <h2 id={`${id}-heading`} className="text-3xl sm:text-4xl font-medium tracking-tight">Get a price for your run</h2>
        <p className="mt-3 text-sm text-[#6A6054] font-light max-w-2xl">
          Choose a journal type, a quantity, and a branding method.
          {pricesPublished
            ? ' A published range appears only when this combination is in the price table. The quote still confirms the number.'
            : ' No custom-order price is published yet, so this step will not show a rupee amount. We will send the exact price on WhatsApp.'}
        </p>
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <label className="text-xs font-mono uppercase tracking-wider">
            Journal type
            <select className={`${fieldClass} mt-1.5`} value={journalType} onChange={(event) => setJournalType(event.target.value)}>
              {JOURNAL_TYPES.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </label>
          <label className="text-xs font-mono uppercase tracking-wider">
            Quantity
            <select className={`${fieldClass} mt-1.5`} value={quantityTier} onChange={(event) => setQuantityTier(event.target.value)}>
              {QUANTITY_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </label>
          <label className="text-xs font-mono uppercase tracking-wider">
            Branding
            <select className={`${fieldClass} mt-1.5`} value={brandingMethod} onChange={(event) => setBrandingMethod(event.target.value)}>
              {BRANDING_OPTIONS.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
          {range ? (
            <p className="text-lg font-medium">
              Estimated range {formatInrRange(range)}
              <span className="block text-xs font-normal text-[#6A6054] mt-1">An estimate from the published table, not a final quote.</span>
            </p>
          ) : (
            <p className="text-sm text-[#6A6054] max-w-xl">No price is shown for this combination. Get your exact price on WhatsApp. Your choices travel with the quote.</p>
          )}
          <button type="button" onClick={ask} className="inline-flex min-h-11 items-center justify-center px-6 py-3.5 rounded-full bg-[#1E1B18] text-[#FAF7F2] text-xs font-semibold uppercase tracking-widest cursor-pointer shrink-0">
            {range ? 'Continue to quote' : 'Get your exact price on WhatsApp'}
          </button>
        </div>
      </div>
    </section>
  );
}
