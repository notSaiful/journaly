import React from 'react';
import { ArrowRight, Check, ShieldCheck, Truck, Star, Sparkles, Clock } from 'lucide-react';
import { useRouter } from '../utils/router';
import { PRODUCTS, REVIEWS } from '../data/products';
import { trackEvent } from '../utils/analytics';

export default function FiveMinuteHabitPage({ onAddToCart }) {
  const { navigate } = useRouter();
  const signatureProduct = PRODUCTS[0]; // 5 Minutes Gratitude Journal

  const handleStartJournal = () => {
    trackEvent('habit_section_start', { source: 'landing_hero_cta' });
    onAddToCart({
      ...signatureProduct,
      customId: `${signatureProduct.id}-habit-page`,
      quantity: 1,
      price: signatureProduct.price
    });
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18] font-sans min-h-screen">
      
      {/* 1. High-Converting Hero */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E5DDCF] overflow-hidden">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8DD] border border-[#E5DDCF] text-[11px] font-mono tracking-widest uppercase text-[#1E1B18] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E5A93C]" />
            <span>The 5-Minute Method</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight text-[#1E1B18]">
            A FIVE-MINUTE <br />
            JOURNALING HABIT <br />
            <span className="text-[#E5A93C] font-normal">YOU CAN ACTUALLY START.</span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-[#6A6054] font-light max-w-2xl leading-relaxed">
            Guided prompts remove the blank-page problem, so all you have to do is begin.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleStartJournal}
              className="px-9 py-4 rounded-full bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border-2 border-[#1E1B18] text-xs uppercase tracking-widest font-semibold transition-all shadow-md active:scale-95 flex items-center gap-2.5 cursor-pointer"
            >
              <span>Start My Journal — ₹{signatureProduct?.price || 349}</span>
              <ArrowRight className="w-4 h-4 text-[#E5A93C]" />
            </button>
          </div>

          <div className="mt-6 flex items-center gap-6 text-xs text-[#6A6054]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Hassle-Free 7-Day Returns
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-700" />
              Dispatched within 24 Hours
            </span>
          </div>

          {/* Hero Lifestyle Showcase */}
          <div className="mt-12 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-[#E5DDCF] bg-white">
            <img
              src="/images/journal-floral-coffee-desk.png"
              alt="Five Minute Habit morning setup"
              className="w-full aspect-[16/9] object-cover object-center"
            />
          </div>

        </div>
      </section>

      {/* 2. Overcoming Friction: The Hardest Part */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#F4EFE6] border-b border-[#E5DDCF]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-2">
              Overcoming Resistance
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1E1B18] leading-tight">
              THE HARDEST PART OF JOURNALING <br />
              <span className="italic">IS OFTEN STARTING.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-white border border-[#E5DDCF] shadow-xs">
              <span className="text-xs font-mono uppercase tracking-widest text-stone-400 block mb-2">Doubt 01</span>
              <h3 className="font-serif text-xl font-medium text-[#1E1B18] mb-2">"What do I write?"</h3>
              <p className="text-xs sm:text-sm text-[#6A6054] font-light leading-relaxed">
                You never face an empty canvas. Three grounded questions direct your pen immediately.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5DDCF] shadow-xs">
              <span className="text-xs font-mono uppercase tracking-widest text-stone-400 block mb-2">Doubt 02</span>
              <h3 className="font-serif text-xl font-medium text-[#1E1B18] mb-2">"How much time?"</h3>
              <p className="text-xs sm:text-sm text-[#6A6054] font-light leading-relaxed">
                Three minutes while your morning coffee cools, two minutes before winding down at night.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5DDCF] shadow-xs">
              <span className="text-xs font-mono uppercase tracking-widest text-stone-400 block mb-2">Doubt 03</span>
              <h3 className="font-serif text-xl font-medium text-[#1E1B18] mb-2">"Do I need writing skills?"</h3>
              <p className="text-xs sm:text-sm text-[#6A6054] font-light leading-relaxed">
                None at all. Guided prompts give your thoughts immediate direction—you simply write honest thoughts in a couple sentences.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#E5DDCF] text-[#1E1B18] text-center max-w-2xl mx-auto shadow-xs">
            <p className="font-serif text-2xl font-light leading-snug">
              JOURNALY keeps it simple: <br />
              <span className="text-[#8C6D46] italic font-normal">
                Open the page. Answer the prompts. Come back tomorrow.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* 3. Real Interior Spread Proof */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E5DDCF]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-3">
              Thoughtful Guidance
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1E1B18] leading-tight">
              YOU DON’T NEED <br />
              <span className="italic">TO KNOW WHAT TO WRITE.</span>
            </h2>
            <p className="mt-4 text-base text-[#6A6054] font-light leading-relaxed">
              That’s what the prompts are for. Every spread is divided into clear, manageable daily reflections that require zero preparation.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E5A93C]/20 text-[#1E1B18] flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-3.5 h-3.5 text-[#E5A93C]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1E1B18]">Morning Intention</h4>
                  <p className="text-xs text-[#6A6054] mt-0.5">3 small items of gratitude & your daily focus.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E5A93C]/20 text-[#1E1B18] flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-3.5 h-3.5 text-[#E5A93C]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1E1B18]">Evening Review</h4>
                  <p className="text-xs text-[#6A6054] mt-0.5">A small win and a moment worth remembering.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E5A93C]/20 text-[#1E1B18] flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-3.5 h-3.5 text-[#E5A93C]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1E1B18]">Weekly Landmark</h4>
                  <p className="text-xs text-[#6A6054] mt-0.5">Pause on Sunday to capture the overall rhythm of the week.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#E5DDCF] bg-white">
              <img
                src="/images/memory-journal-open.jpg"
                alt="Open Journaly Interior Spread"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 4. Final Conversion Call (Beige) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4EFE6] text-[#1E1B18] text-center border-t border-[#E5DDCF]">
        <div className="max-w-3xl mx-auto">
          <div className="w-2.5 h-6 bg-[#E5A93C] rounded-xs mx-auto mb-6" />

          <h2 className="text-3xl sm:text-5xl font-medium text-[#1E1B18] tracking-tight">
            FIVE MINUTES. ONE PAGE. <br />
            <span className="text-[#6A6054] font-normal">Start there.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#6A6054] font-light max-w-lg mx-auto leading-relaxed">
            Every day gets somewhere to live. Researched IntelligentLab questions backed by our hassle-free 7-day returns.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleStartJournal}
              className="px-9 py-4 rounded-full bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border-2 border-[#1E1B18] text-xs font-semibold uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Get Your JOURNALY — ₹{signatureProduct?.price || 349}</span>
              <ArrowRight className="w-4 h-4 text-[#E5A93C]" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
