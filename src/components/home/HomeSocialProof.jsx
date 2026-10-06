import React from 'react';
import { Star, ShieldCheck, CheckCircle } from 'lucide-react';
import { REVIEWS } from '../../data/products';
import LoopingVideo from '../common/LoopingVideo';

export default function HomeSocialProof() {
  return (
    <section className="py-20 sm:py-28 bg-[#F4EFE6] border-b border-[#E5DDCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-3">
            Real Stories & Daily Practice
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#1E1B18] tracking-tight leading-tight">
            WRITTEN <br />
            <span className="text-[#6A6054] font-normal">IN REAL LIFE.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6A6054] font-light max-w-xl">
            Not perfect handwriting. Not perfect days. Just real ones worth keeping.
          </p>
        </div>

        {/* Dual Video Testimonials (Normal, Undarkened Brightness) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Testimonial Video 1: Gift Prep & Unboxing */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-[#E5DDCF] flex flex-col group">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#EFE8DD]">
              <LoopingVideo
                src="/videos/testimonial-gift-prep.mp4"
                poster="/images/testimonial-gift-prep-poster.jpg"
                className="w-full h-full object-cover object-center brightness-100 contrast-100"
              />
              <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-[#1E1B18] border border-[#E5DDCF] shadow-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]" />
                <span>Atelier Gift Unboxing</span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#E5A93C] mb-2.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#1E1B18] font-normal leading-relaxed mb-3">
                  “Writing here every morning feels like a gift to my future self. My mind is noticeably calmer before the workday even starts.”
                </p>
              </div>
              <div className="pt-3 border-t border-[#E5DDCF]/80 flex items-center justify-between text-xs text-[#6A6054]">
                <div>
                  <span className="font-semibold text-[#1E1B18]">Ananya Roy</span>
                  <span className="text-stone-400 mx-1.5">•</span>
                  <span>Gift Recipient</span>
                </div>
                <span className="flex items-center gap-1 text-[11px] text-[#345941] font-mono font-medium">
                  <CheckCircle className="w-3 h-3" />
                  Verified Order
                </span>
              </div>
            </div>
          </div>

          {/* Testimonial Video 2: Editorial Journal Progress & Habit */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-[#E5DDCF] flex flex-col group">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#EFE8DD]">
              <LoopingVideo
                src="/videos/testimonial-editorial-journal.mp4"
                poster="/images/testimonial-editorial-journal-poster.jpg"
                className="w-full h-full object-cover object-center brightness-100 contrast-100"
              />
              <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-[#1E1B18] border border-[#E5DDCF] shadow-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]" />
                <span>Daily Practice In Action</span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#E5A93C] mb-2.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#1E1B18] font-normal leading-relaxed mb-3">
                  “Five minutes every morning completely replaced phone scrolling for me. 18 weeks later, looking back through these pages is surreal.”
                </p>
              </div>
              <div className="pt-3 border-t border-[#E5DDCF]/80 flex items-center justify-between text-xs text-[#6A6054]">
                <div>
                  <span className="font-semibold text-[#1E1B18]">Dr. Siddharth M.</span>
                  <span className="text-stone-400 mx-1.5">•</span>
                  <span>Daily Journaler</span>
                </div>
                <span className="flex items-center gap-1 text-[11px] text-[#345941] font-mono font-medium">
                  <CheckCircle className="w-3 h-3" />
                  Verified Order
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Real Customer Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {REVIEWS.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-[#E5DDCF] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#E5A93C]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-[#8C7E72]">{rev.date}</span>
                </div>

                <h3 className="font-medium text-base text-[#1E1B18] mb-1.5">
                  "{rev.title}"
                </h3>
                <p className="text-xs sm:text-sm text-[#6A6054] font-light leading-relaxed">
                  {rev.content}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E5DDCF]/70 flex items-center justify-between text-xs text-[#6A6054]">
                <div>
                  <span className="font-semibold text-[#1E1B18]">{rev.author}</span>
                  <span className="text-stone-400 mx-1.5">•</span>
                  <span className="font-light">{rev.role}</span>
                </div>
                <span className="flex items-center gap-1 text-[11px] text-[#345941] font-mono">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Hassle-Free Returns Banner (Beige, Minimal) */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#FAF7F2] text-[#1E1B18] border border-[#E5DDCF] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E5A93C]/15 text-[#E5A93C] flex items-center justify-center flex-shrink-0 mt-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#E5A93C] font-semibold block mb-1">
                Simple & Transparent Policy
              </span>
              <h3 className="font-medium text-xl sm:text-2xl text-[#1E1B18]">
                Hassle-Free Returns & Concierge Support
              </h3>
              <p className="text-xs sm:text-sm text-[#6A6054] font-light mt-1 max-w-xl">
                We want you to feel complete peace of mind. If you ever feel your journal isn't the right fit, we provide straightforward, hassle-free returns.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
