import React from 'react';
import { Check } from 'lucide-react';

export default function HomeHabitPositioning() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#E5DDCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Asset: Full Size Journal Display */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E5DDCF] bg-[#F4EFE6] group">
              <img
                src="/images/journal-floral-coffee-desk.png"
                alt="Morning coffee with Journaly habit journal and brass pen"
                className="w-full h-auto object-cover object-center group-hover:scale-101 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              {/* Journaly Accent Tag */}
              <div className="absolute top-4 left-4 bg-[#FAF7F2]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E5DDCF] text-[11px] font-mono tracking-widest uppercase text-[#1E1B18] shadow-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E5A93C]" />
                <span>Morning Ritual</span>
              </div>
            </div>
          </div>

          {/* Editorial Copy: Clean and Minimal (Button removed) */}
          <div className="lg:col-span-5">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-3">
              The Five-Minute Habit
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#1E1B18] tracking-tight leading-tight">
              START SMALL. <br />
              <span className="text-[#6A6054] font-normal">COME BACK TOMORROW.</span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#6A6054] font-light leading-relaxed">
              You don’t need an hour, a perfect routine, or something profound to say.
            </p>

            {/* Three Pillar Prompts */}
            <div className="mt-8 space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#EFE8DD] text-[#1E1B18] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#E5A93C]" />
                </div>
                <span className="text-sm sm:text-base text-[#1E1B18] font-medium">A few thoughtful prompts.</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#EFE8DD] text-[#1E1B18] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#E5A93C]" />
                </div>
                <span className="text-sm sm:text-base text-[#1E1B18] font-medium">A few honest minutes.</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#EFE8DD] text-[#1E1B18] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#E5A93C]" />
                </div>
                <span className="text-sm sm:text-base text-[#1E1B18] font-medium">One page at a time.</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
