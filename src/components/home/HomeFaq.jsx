import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';
import { FAQS_BY_CATEGORY } from '../../data/products';
import { useRouter } from '../../utils/router';

export default function HomeFaq() {
  const { navigate } = useRouter();
  const [activeCategory, setActiveCategory] = useState(Object.keys(FAQS_BY_CATEGORY)[0]);
  const [openIndex, setOpenIndex] = useState(0);

  const categories = Object.keys(FAQS_BY_CATEGORY);
  const currentFaqs = FAQS_BY_CATEGORY[activeCategory] || [];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#E5DDCF]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F4EFE6] border border-[#E5DDCF] mb-4 text-[#8C6D46]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-semibold">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1E1B18] tracking-tight leading-tight">
            Everything You Need To Know
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#6A6054] font-light leading-relaxed">
            How IntelligentLab researched questions help 9 out of 10 people build a lasting daily journaling habit.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-4 mb-8">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(0);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-[#1E1B18] border-2 border-[#1E1B18] font-bold shadow-xs'
                    : 'bg-[#FAF7F2] border border-[#E5DDCF] text-[#6A6054] hover:border-[#1E1B18] hover:text-[#1E1B18]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Accordion Questions */}
        <div className="space-y-3.5 max-w-3xl mx-auto">
          {currentFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#E5DDCF] bg-white overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleQuestion(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F2] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-medium text-[#1E1B18]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8C7E72] transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-[#1E1B18]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#6A6054] font-light leading-relaxed border-t border-[#E5DDCF]/40 bg-[#FAF7F2]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Footer Card */}
        <div className="mt-12 max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#F4EFE6] border border-[#E5DDCF] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="font-serif text-lg font-medium text-[#1E1B18]">
              Have a question not covered here?
            </h4>
            <p className="text-xs text-[#6A6054] font-light mt-1">
              Our team in Bengaluru is always here to help you begin your journaling practice.
            </p>
          </div>
          <button
            onClick={() => navigate('/contact')}
            className="px-6 py-3 rounded-full bg-white hover:bg-[#FAF7F2] text-[#1E1B18] border-2 border-[#1E1B18] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>Contact Support</span>
          </button>
        </div>

      </div>
    </section>
  );
}
