import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from '../../utils/router';
import { trackEvent } from '../../utils/analytics';

export default function HomeFinalCall() {
  const { navigate } = useRouter();

  const handleFindJournal = () => {
    trackEvent('hero_cta', { source: 'final_call_to_action' });
    navigate('/shop');
  };

  return (
    <section className="relative py-24 sm:py-32 bg-[#FAF7F2] text-[#1E1B18] border-b border-[#E5DDCF] select-none">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Yellow bookmark motif */}
        <div className="w-2.5 h-7 bg-[#E5A93C] rounded-xs shadow-xs mb-8" />

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[#1E1B18] leading-tight">
          THE ORDINARY DAYS <br />
          <span className="text-[#6A6054] font-normal">BECOME THE ONES YOU MISS.</span>
        </h2>

        <p className="mt-5 text-base sm:text-lg text-[#6A6054] font-normal tracking-wide">
          Write a little of today down.
        </p>

        <p className="mt-2 text-xs sm:text-sm text-[#8C7E72] font-light max-w-md">
          Start small with five minutes tomorrow morning.
        </p>

        <div className="mt-10">
          <button
            onClick={handleFindJournal}
            className="px-9 py-4 rounded-full bg-[#1E1B18] hover:bg-[#332C26] text-[#FAF7F2] font-semibold text-xs sm:text-sm tracking-widest uppercase transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2.5 cursor-pointer group"
          >
            <span>Find Your Journal</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
