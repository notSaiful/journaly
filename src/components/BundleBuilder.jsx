import React, { useState } from 'react';
import { Sparkles, Check, Gift, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function BundleBuilder({ onAddBundleToCart }) {
  const [tier, setTier] = useState(3);
  const [selectedJournals] = useState([
    { ...PRODUCTS[0], color: 'Forest Sage' },
    { ...PRODUCTS[1], color: 'Midnight Onyx' },
    { ...PRODUCTS[2], color: 'Warm Sand Linen' }
  ]);
  const [isAdded, setIsAdded] = useState(false);

  const tiers = [
    {
      count: 1,
      title: 'Solo Thinker',
      subtitle: '1 Archival Journal',
      discountPct: 0,
      pricePerItem: 38,
      totalPrice: 38,
      freePen: false,
      badge: null
    },
    {
      count: 2,
      title: 'The Dual Ritual',
      subtitle: '2 Journals (Work + Personal)',
      discountPct: 10,
      pricePerItem: 34.20,
      totalPrice: 68.40,
      originalTotal: 76,
      freePen: false,
      badge: 'Most Popular'
    },
    {
      count: 3,
      title: 'The Executive Trilogy',
      subtitle: '3 Journals + Free Machined Brass Pen ($28 Value)',
      discountPct: 20,
      pricePerItem: 30.40,
      totalPrice: 91.20,
      originalTotal: 142,
      freePen: true,
      badge: 'Best Value • Save $51'
    }
  ];

  const currentTier = tiers.find((t) => t.count === tier) || tiers[2];

  const handleAddBundle = () => {
    const itemsToAdd = selectedJournals.slice(0, currentTier.count).map((item) => ({
      ...item,
      customId: `bundle-${item.id}-${item.color}-${Math.random()}`,
      selectedColor: item.color,
      price: currentTier.pricePerItem,
      bundleDiscount: `${currentTier.discountPct}% OFF`,
      monogram: 'A.C.'
    }));

    if (currentTier.freePen) {
      itemsToAdd.push({
        ...PRODUCTS[4],
        customId: `bundle-free-brass-pen-${Math.random()}`,
        name: 'Machined Solid Brass Rollerball Pen (Bespoke Trilogy Gift)',
        price: 0,
        selectedColor: 'Raw Polished Brass',
        isFreeGift: true
      });
    }

    onAddBundleToCart(itemsToAdd);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="bundle-builder" className="py-20 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE8DD] text-[#735C3E] text-xs font-mono uppercase tracking-widest mb-3 border border-[#D9CFBF]">
            <Gift className="w-3.5 h-3.5 text-[#8C6D46]" />
            <span>Volume Tier Savings</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#2B2520] tracking-tight mb-4">
            Curate Your Complete System.
          </h2>
          <p className="text-[#6A6054] text-base sm:text-lg font-light leading-relaxed">
            Separate work strategy from intimate personal reflection. 
            Build a multi-journal system and unlock up to 20% savings plus a complimentary machined solid brass pen.
          </p>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tiers.map((t) => (
            <div
              key={t.count}
              onClick={() => setTier(t.count)}
              className={`relative rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                tier === t.count
                  ? 'bg-white border-[#8C6D46] shadow-md ring-2 ring-[#8C6D46]/20 scale-[1.01]'
                  : 'bg-[#FAF7F2] border-[#E5DDCF] hover:bg-white hover:border-[#D5C9B7]'
              }`}
            >
              {/* Badge */}
              {t.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#8C6D46] text-white text-[11px] font-bold tracking-wide uppercase px-3.5 py-1 rounded-full shadow-xs">
                  {t.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#8C8072]">
                    Tier {t.count}
                  </span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    tier === t.count ? 'border-[#8C6D46] bg-[#8C6D46] text-white' : 'border-[#D9CFBF]'
                  }`}>
                    {tier === t.count && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-semibold text-[#2B2520] mb-1">
                  {t.title}
                </h3>
                <p className="text-xs text-[#6A6054] mb-6 font-light">{t.subtitle}</p>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-[#EFE8DD]">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2520]">
                      ${t.totalPrice.toFixed(2)}
                    </span>
                    {t.originalTotal && (
                      <span className="text-sm text-[#8C8072] line-through">
                        ${t.originalTotal}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#6A6054] block mt-1">
                    (${t.pricePerItem.toFixed(2)} per journal)
                  </span>
                </div>

                {/* Inclusions */}
                <ul className="space-y-2.5 text-xs text-[#4A4138] mb-6 font-light">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#4B6B55] flex-shrink-0" />
                    <span>{t.count}x 160 GSM Archival Journals of your choice</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#4B6B55] flex-shrink-0" />
                    <span>Free 24K Gold Foil Monogramming on each</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#4B6B55] flex-shrink-0" />
                    <span>Free Worldwide Priority Delivery</span>
                  </li>
                  {t.freePen && (
                    <li className="flex items-center gap-2 font-medium text-[#735C3E] bg-[#FAF3E8] p-2 rounded-xl border border-[#E8DDCA]">
                      <Sparkles className="w-4 h-4 text-[#8C6D46] flex-shrink-0" />
                      <span>FREE Solid Machined Brass Pen ($28 Value)</span>
                    </li>
                  )}
                </ul>
              </div>

              <button
                type="button"
                className={`w-full py-3 rounded-xl text-xs font-semibold transition-all ${
                  tier === t.count
                    ? 'bg-[#332B24] text-[#FAF7F2]'
                    : 'bg-[#EFE8DD] text-[#4A4138] hover:bg-[#E5DDCF]'
                }`}
              >
                {tier === t.count ? 'Selected Plan' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

        {/* Selected Bundle Inclusions Preview & Fast Add */}
        <div className="bg-white rounded-3xl border border-[#E5DDCF] p-6 sm:p-8 shadow-sm max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-4 overflow-hidden">
              {selectedJournals.slice(0, currentTier.count).map((item, idx) => (
                <img
                  key={idx}
                  src={item.image}
                  alt={item.name}
                  className="inline-block h-16 w-16 rounded-2xl object-cover ring-4 ring-white shadow-xs"
                />
              ))}
              {currentTier.freePen && (
                <img
                  src={PRODUCTS[4].image}
                  alt="free pen"
                  className="inline-block h-16 w-16 rounded-2xl object-cover ring-4 ring-[#E8D4B0] shadow-xs"
                />
              )}
            </div>

            <div>
              <span className="text-xs font-bold text-[#2B2520] block">
                {currentTier.title} ({currentTier.count} Journals {currentTier.freePen ? '+ Free Brass Pen' : ''})
              </span>
              <span className="text-xs text-[#345941] font-medium">
                {currentTier.discountPct > 0 ? `Unlocks ${currentTier.discountPct}% Bundle Discount` : 'Full Archival Experience'}
              </span>
            </div>
          </div>

          <button
            onClick={handleAddBundle}
            disabled={isAdded}
            className={`w-full sm:w-auto px-8 py-4 rounded-full font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer ${
              isAdded ? 'bg-[#405445] text-white' : 'bg-[#332B24] hover:bg-[#251F1A] text-[#FAF7F2]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-[#C4D9CA]" />
                <span>Bundle Added to Bag!</span>
              </>
            ) : (
              <>
                <span>Add Curated Bundle — ${currentTier.totalPrice.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4 text-[#D9C4A1]" />
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
}
