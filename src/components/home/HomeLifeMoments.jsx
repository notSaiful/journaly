import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useRouter } from '../../utils/router';
import { trackEvent } from '../../utils/analytics';

export default function HomeLifeMoments() {
  const { navigate } = useRouter();

  const moments = [
    {
      title: 'This Year',
      subtitle: 'Before another year becomes “that went fast.”',
      path: '/collections'
    },
    {
      title: 'College',
      subtitle: 'The chaos, the people, the firsts.',
      path: '/collections'
    },
    {
      title: 'A Trip',
      subtitle: 'The parts that never make it into the album.',
      path: '/collections'
    },
    {
      title: 'A Relationship',
      subtitle: 'The jokes, milestones and ordinary Tuesdays.',
      path: '/collections'
    },
    {
      title: 'Everyday',
      subtitle: 'Because the small days become the ones you miss.',
      path: '/collections'
    },
    {
      title: 'A New Chapter',
      subtitle: 'For starting before you feel completely ready.',
      path: '/collections'
    },
    {
      title: 'A Gift',
      subtitle: 'Give them somewhere to keep what matters.',
      path: '/gifts'
    }
  ];

  const handleMomentClick = (moment) => {
    trackEvent('collection_view', { moment: moment.title });
    navigate(moment.path);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#FAF7F2] border-b border-[#E5DDCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-3">
            Life Chapters
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#1E1B18] tracking-tight leading-tight">
            WHAT ARE YOU <br />
            <span className="text-[#6A6054] font-normal">TRYING TO KEEP?</span>
          </h2>
          <p className="mt-4 text-base text-[#6A6054] font-light max-w-lg">
            Choose your journal by the season of life you want to remember.
          </p>
        </div>

        {/* Moments Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {moments.map((m) => (
            <div
              key={m.title}
              onClick={() => handleMomentClick(m)}
              className="p-6 rounded-2xl bg-white border border-[#E5DDCF] hover:border-[#1E1B18] hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#E5A93C] mb-4 group-hover:scale-125 transition-transform" />
                <h3 className="text-lg font-medium text-[#1E1B18] group-hover:text-[#E5A93C] transition-colors">
                  {m.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#6A6054] font-light leading-relaxed">
                  {m.subtitle}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E5DDCF]/70 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#1E1B18] group-hover:text-[#E5A93C]">
                <span>Explore Pages</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}

          {/* Special Custom Card */}
          <div
            onClick={() => {
              trackEvent('personalisation_start', { source: 'moments_grid' });
              navigate('/personalise');
            }}
            className="p-6 rounded-2xl bg-[#1E1B18] text-[#FAF7F2] border border-[#1E1B18] hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <Sparkles className="w-4 h-4 text-[#E5A93C] mb-4" />
              <h3 className="font-serif text-2xl font-normal text-white">
                Personalised Monogram
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                Add your name in 24K gold foil and make it unmistakably yours.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#E5A93C]">
              <span>Customize Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
