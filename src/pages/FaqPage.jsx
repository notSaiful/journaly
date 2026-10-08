import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { FAQS_BY_CATEGORY } from '../data/products';

export default function FaqPage() {
  const categories = Object.keys(FAQS_BY_CATEGORY);
  const [activeCategory, setActiveCategory] = useState(categories[0] || '');
  const [openIndex, setOpenIndex] = useState(0);

  const currentFaqs = FAQS_BY_CATEGORY[activeCategory] || (categories.length > 0 ? FAQS_BY_CATEGORY[categories[0]] : []);

  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18] font-sans min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-3">
            Help & Knowledge
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#1E1B18] tracking-tight leading-tight">
            QUESTIONS ARE GOOD.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#6A6054] font-light">
            We’ve answered the common ones below.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white text-[#1E1B18] border-2 border-[#1E1B18] font-bold shadow-xs'
                  : 'bg-[#FAF7F2] border border-[#E5DDCF] text-[#6A6054] hover:border-[#1E1B18] hover:text-[#1E1B18]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {currentFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-[#E5DDCF] overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1E1B18]">
                    {faq.q}
                  </h3>
                  <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform flex-shrink-0 ${
                    isOpen ? 'rotate-180 text-[#E5A93C]' : ''
                  }`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-[#6A6054] font-light leading-relaxed border-t border-[#FAF7F2]">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
