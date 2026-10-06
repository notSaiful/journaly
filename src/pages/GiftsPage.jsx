import React from 'react';
import { ArrowRight, Gift, Check, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useRouter } from '../utils/router';
import { trackEvent } from '../utils/analytics';

export default function GiftsPage({ onAddToCart }) {
  const { navigate } = useRouter();
  const giftSet = PRODUCTS.find((p) => p.id === 'atelier-desk-set') || PRODUCTS[0];

  const handleAddGift = () => {
    trackEvent('add_to_cart', { productId: giftSet.id, source: 'gifts_page' });
    onAddToCart({
      ...giftSet,
      customId: `${giftSet.id}-gift-box`,
      quantity: 1,
      price: giftSet.price,
      selectedColor: 'Blossom & Brass'
    });
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18] font-sans min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          <div className="lg:col-span-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-3">
              The Gifting Suite
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#1E1B18] tracking-tight leading-tight">
              GIVE THEM <br />
              SOMEWHERE TO KEEP <br />
              <span className="text-[#6A6054] font-normal">THIS CHAPTER.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#6A6054] font-light leading-relaxed max-w-xl">
              Thoughtful journals for birthdays, graduations, friendships, new jobs, and everything worth remembering.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleAddGift}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1E1B18] hover:bg-[#332C26] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Gift className="w-4 h-4 text-[#E5A93C]" />
                <span>Shop The Complete Gift Set — ${giftSet.price}</span>
              </button>
            </div>

            <div className="mt-6 flex items-center gap-6 text-xs text-[#6A6054]">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-700" />
                Complimentary Foil Monogram
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-700" />
                Included "A Gift for You" Card
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#E5DDCF] bg-white group">
              <img
                src="/images/journal-floral-gift-box.png"
                alt="Journaly Unboxing Gift Presentation"
                className="w-full aspect-[4/5] object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

        </div>

        {/* Secondary Story: Becoming Something */}
        <section className="py-16 sm:py-20 border-y border-[#E5DDCF] bg-[#F4EFE6] rounded-3xl p-8 sm:p-14 mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="w-6 h-6 text-[#E5A93C] mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#1E1B18] leading-tight mb-6">
              SOME GIFTS ARE OPENED ONCE. <br />
              <span className="font-normal text-[#6A6054]">THIS ONE KEEPS BECOMING SOMETHING.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#6A6054] font-light leading-relaxed max-w-xl mx-auto">
              A standard gift is forgotten in a drawer within a month. A guided journal starts empty and slowly transforms into the most intimate, irreplaceable object on their nightstand.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
