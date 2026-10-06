import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, HelpCircle, Sparkles, ArrowRight } from 'lucide-react';
import { FAQS } from '../data/products';

export default function GuaranteeFAQ({ onShopClick }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Risk Reversal Guarantee Feature Box in Minimalist Linen Sandstone */}
        <div className="mb-20 max-w-4xl mx-auto bg-[#F4EFE6] border border-[#E5DDCF] rounded-3xl p-8 sm:p-12 text-[#2B2520] shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[#EBE3D5] border border-[#D9CFBF] flex items-center justify-center flex-shrink-0 text-[#8C6D46] shadow-xs">
              <ShieldCheck className="w-9 h-9 text-[#8C6D46]" />
            </div>

            <div className="flex-1 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#8C6D46] block font-medium">
                60-Day "Empty Book" Guarantee
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#2B2520]">
                If your mind isn't clearer after 60 days, keep the book. We'll refund every penny.
              </h3>
              <p className="text-xs sm:text-sm text-[#6A6054] leading-relaxed max-w-2xl font-light">
                We don't want you to worry about whether you'll stick with journaling. 
                Write in it every morning. Fill pages, cross things out, spill coffee on it. 
                If you don't feel calmer and more focused, simply email us for an instant 100% refund. 
                You will never have to return the book.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Header & Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#8C6D46] block mb-2 font-medium">
              Common Inquiries
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#2B2520] tracking-tight">
              Everything You Need to Know.
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E5DDCF] overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-lg font-medium text-[#2B2520] hover:text-[#8C6D46] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8C8072] transition-transform duration-300 flex-shrink-0 ${
                      openIndex === idx ? 'rotate-180 text-[#8C6D46]' : ''
                    }`}
                  />
                </button>

                {openIndex === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#6A6054] leading-relaxed border-t border-[#EFE8DD] pt-3 animate-fade-in font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final High-Converting Call to Action in Minimalist Warm Linen */}
        <div className="mt-20 max-w-5xl mx-auto bg-[#EFE8DD] border border-[#D9CFBF] rounded-3xl p-8 sm:p-14 text-center text-[#2B2520] relative overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/70 text-[#735C3E] text-xs font-mono tracking-widest uppercase border border-[#D9CFBF]">
              <Sparkles className="w-3.5 h-3.5 text-[#8C6D46]" />
              <span>Limited Atelier Run</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#2B2520]">
              Begin your five minutes today.
            </h3>

            <p className="text-xs sm:text-sm text-[#6A6054] leading-relaxed font-light">
              Experience the unmatched tactile weight of 160 GSM bamboo paper and bespoke gold foil monogramming. 
              Dispatched within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={onShopClick}
                className="w-full sm:w-auto px-8 py-4 bg-[#332B24] hover:bg-[#251F1A] text-[#FAF7F2] rounded-full text-sm font-semibold shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Shop The Collection ($38)</span>
                <ArrowRight className="w-4 h-4 text-[#D9C4A1]" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
