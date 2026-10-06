import React, { useState } from 'react';
import { Star, CheckCircle, ShieldCheck } from 'lucide-react';
import { REVIEWS } from '../data/products';

export default function SocialProofReviews() {
  const [filter, setFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Reviews (18,420)' },
    { id: 'fountain', label: 'Fountain Pen Users' },
    { id: 'clarity', label: 'Daily Clarity Routine' },
    { id: 'craft', label: 'Paper & Binding Quality' }
  ];

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#FAF7F2] border-t border-[#E5DDCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Big Star Summary */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8C6D46] mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Global Writer Community</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#2B2520] tracking-tight">
              Real Clarity. 18,400+ Stories.
            </h2>
          </div>

          {/* Aggregate Rating Scoreboard in Minimalist Beige */}
          <div className="bg-white p-6 rounded-3xl border border-[#E5DDCF] shadow-xs flex items-center gap-6">
            <div className="text-center">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-[#2B2520] block leading-none">
                4.98
              </span>
              <div className="flex items-center justify-center gap-1 text-[#C49B55] my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-[11px] text-[#8C8072] font-medium">Over 18,420 Verified Reviews</span>
            </div>

            <div className="border-l border-[#EFE8DD] pl-6 space-y-1 text-xs text-[#6A6054]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#8C8072]">5 Star</span>
                <div className="w-24 h-2 bg-[#F3ECE1] rounded-full overflow-hidden">
                  <div className="w-[96%] h-full bg-[#383129]" />
                </div>
                <span className="text-[10px] font-mono text-[#383129]">96%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#8C8072]">4 Star</span>
                <div className="w-24 h-2 bg-[#F3ECE1] rounded-full overflow-hidden">
                  <div className="w-[4%] h-full bg-[#A89D8E]" />
                </div>
                <span className="text-[10px] font-mono">4%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#8C8072]">3 Star</span>
                <div className="w-24 h-2 bg-[#F3ECE1] rounded-full overflow-hidden">
                  <div className="w-[0.5%] h-full bg-[#D9CFBF]" />
                </div>
                <span className="text-[10px] font-mono">&lt;1%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                filter === tab.id
                  ? 'bg-[#332B24] text-[#FAF7F2]'
                  : 'bg-white text-[#4A4138] border border-[#E5DDCF] hover:border-[#D5C9B7]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DDCF] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with stars & date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#C49B55]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#8C8072] font-mono">{rev.date}</span>
                </div>

                <h4 className="font-serif text-lg font-semibold text-[#2B2520] mb-2 leading-snug">
                  "{rev.title}"
                </h4>

                <p className="text-xs sm:text-sm text-[#6A6054] leading-relaxed mb-6 font-light">
                  {rev.content}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EFE8DD] flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-[#2B2520]">
                    <span>{rev.author}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-[#345941] fill-[#E2EBE5]" />
                  </div>
                  <span className="text-[11px] text-[#8C8072] block">{rev.role}</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#8C8072] uppercase block">Verified Purchase</span>
                  <span className="text-[11px] font-medium text-[#4A4138]">{rev.product}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* UGC Customer Photo Strip in Warm Linen */}
        <div className="bg-[#F4EFE6] rounded-3xl p-6 sm:p-8 border border-[#E5DDCF]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
                Worn, Written & Cherished in the Wild
              </h3>
              <p className="text-xs text-[#6A6054] font-light">
                Tag @ChronicleAtelier on Instagram & Pinterest to be featured.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-[#8C6D46]">
              #ChronicleClarity
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden group shadow-xs">
              <img
                src="/images/hero_journal_desk_1791006815772.jpg"
                alt="customer desk"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-white text-center text-xs">
                <span>"My morning coffee & 5-minute clarity ritual in London" — @eleanor.v</span>
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden group shadow-xs">
              <img
                src="/images/journal_forest_sage_1791006838711.jpg"
                alt="customer journal"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-white text-center text-xs">
                <span>"Forest Sage with custom gold foil. Flawless." — @studio_k</span>
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden group shadow-xs">
              <img
                src="/images/journal_linen_sand_1791006887974.jpg"
                alt="customer linen"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-white text-center text-xs">
                <span>"The raw Belgian linen texture is unmatched." — @wabisabi_notes</span>
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden group shadow-xs">
              <img
                src="/images/journal_terracotta_1791006911161.jpg"
                alt="customer terracotta"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-white text-center text-xs">
                <span>"Quarterly review ledger in rich saddle leather." — @founder_log</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
