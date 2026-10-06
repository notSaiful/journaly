import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useRouter } from '../../utils/router';
import { trackEvent } from '../../utils/analytics';
import LoopingVideo from '../common/LoopingVideo';

export default function HomeHero() {
  const { navigate } = useRouter();

  const handleExplore = () => {
    trackEvent('hero_cta', { action: 'explore_journals' });
    navigate('/shop');
  };

  const handleScrollCue = () => {
    const nextSection = document.getElementById('product-carousel-section') || document.getElementById('scene-memory-story');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[88vh] min-h-[600px] max-h-[880px] flex items-center justify-center overflow-hidden bg-[#FAF7F2] select-none">
      {/* Background Looping Film: 100% Natural Lighting, Undarkened */}
      <LoopingVideo
        src="/videos/hero-film.mp4"
        poster="/images/hero-film-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none brightness-100 contrast-100"
      />

      {/* Minimal subtle vignette - keeps video in its natural bright state */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Minimalist Editorial Content Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Subtle Brand Tag Motif */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-white text-[11px] font-medium tracking-[0.22em] uppercase mb-6 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]" />
          <span>Record Your Life • Daily 5-Minute Habit</span>
        </div>

        {/* Minimalist Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-[1.18] max-w-2xl drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]">
          Your life is happening. <br />
          <span className="text-white/95 font-normal">Keep some of it.</span>
        </h1>

        {/* Primary CTA (White Button) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5">
          <button
            onClick={handleExplore}
            className="px-8 py-3.5 rounded-full bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border-2 border-white font-semibold text-xs tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl active:scale-95 flex items-center gap-2 cursor-pointer group"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#E5A93C]" />
          </button>
        </div>

        {/* Minimalist Scroll Cue */}
        <button
          onClick={handleScrollCue}
          className="mt-12 flex flex-col items-center gap-1.5 text-white/80 hover:text-white transition-colors cursor-pointer group drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
          aria-label="Scroll down to begin story"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] font-medium">
            Scroll to view
          </span>
          <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform text-[#E5A93C]" />
        </button>

      </div>
    </section>
  );
}
