import React, { useState } from 'react';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { useRouter } from '../../utils/router';
import { trackEvent } from '../../utils/analytics';

export default function HomeFiveMinuteRitual() {
  const { navigate } = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      time: '05:00',
      title: 'ARRIVE',
      prompt: 'Open the book. Sit with your coffee. The world outside can wait for five quiet minutes.',
      cue: 'The physical touch of the smooth page signals your mind to slow down.'
    },
    {
      time: '04:00',
      title: 'APPRECIATE',
      prompt: 'Notice three small things that are already good.',
      cue: 'Not grand achievements—the morning light through the blinds, warm tea, an easy conversation.'
    },
    {
      time: '03:00',
      title: 'NOTICE',
      prompt: 'Capture one ordinary detail you would otherwise forget by tomorrow afternoon.',
      cue: 'The way someone laughed. The weather on your walk. The song playing in the bakery.'
    },
    {
      time: '02:00',
      title: 'CHOOSE',
      prompt: 'Declare one single intention for the day ahead.',
      cue: 'What will make today feel well-spent when you lay down to sleep tonight?'
    },
    {
      time: '01:00',
      title: 'REMEMBER',
      prompt: 'Leave a brief sentence for the person you are becoming.',
      cue: 'A reminder of courage, forgiveness, or simple patience.'
    },
    {
      time: '00:00',
      title: 'DONE',
      prompt: 'Close the cover. Five minutes invested. Your life has somewhere to live.',
      cue: 'You kept a little of today forever. Come back tomorrow.'
    }
  ];

  const handleStartHabit = () => {
    trackEvent('habit_section_complete', { completedStep: steps[activeStep].title });
    navigate('/five-minute-habit');
  };

  return (
    <section
      id="scene-five-minute-ritual"
      className="py-24 sm:py-32 bg-[#141312] text-[#FAF7F2] border-b border-stone-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#E5A93C] font-semibold block mb-3">
            The Five-Minute Ritual
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white leading-tight">
            A FEW MINUTES TODAY. <br />
            <span className="text-[#E5A93C] font-normal">Something to keep for years.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-400 font-light max-w-xl mx-auto">
            Interactive breakdown of the daily rhythm. Click through the timeline to see how five minutes becomes a lifetime archive.
          </p>
        </div>

        {/* Timeline & Visual Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left: Step Selection Timeline */}
          <div className="lg:col-span-6 space-y-3">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.time}
                  onClick={() => {
                    setActiveStep(idx);
                    trackEvent('habit_step_click', { step: step.title, time: step.time });
                  }}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? 'bg-[#1E1B18] border-[#E5A93C] shadow-lg'
                      : 'bg-stone-900/60 border-stone-800 hover:border-stone-700 hover:bg-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`px-2.5 py-1 rounded text-xs font-mono font-bold tracking-wider ${
                      isActive ? 'bg-[#E5A93C] text-[#141312]' : 'bg-stone-800 text-stone-400'
                    }`}>
                      {step.time}
                    </div>
                    <div>
                      <h3 className={`text-base font-serif tracking-wide ${
                        isActive ? 'text-white font-medium' : 'text-stone-300 group-hover:text-white'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-xs mt-0.5 line-clamp-1 ${
                        isActive ? 'text-stone-300' : 'text-stone-500'
                      }`}>
                        {step.prompt}
                      </p>
                    </div>
                  </div>

                  {isActive ? (
                    <CheckCircle2 className="w-5 h-5 text-[#E5A93C] flex-shrink-0" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-stone-700 group-hover:bg-stone-500 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Active Ritual Spotlight Display */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden bg-[#1E1B18] border border-stone-800 p-8 sm:p-10 shadow-2xl flex flex-col justify-between min-h-[420px]">
              
              {/* Active Step Details */}
              <div>
                <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E5A93C] flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Minute Marker {steps[activeStep].time}</span>
                  </span>
                  <span className="text-xs font-mono text-stone-500">
                    Step {activeStep + 1} of {steps.length}
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-4">
                  {steps[activeStep].title}
                </h3>

                <p className="text-lg text-stone-200 font-light leading-relaxed mb-6">
                  "{steps[activeStep].prompt}"
                </p>

                <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800/80">
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    <strong className="text-[#E5A93C] font-normal block mb-1">Behind the page:</strong>
                    {steps[activeStep].cue}
                  </p>
                </div>
              </div>

              {/* Supporting Hands holding journal visual preview */}
              <div className="mt-8 pt-6 border-t border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/journal-floral-hands.png"
                    alt="Hands holding journal"
                    className="w-12 h-12 rounded-lg object-cover border border-stone-700 shadow-sm"
                  />
                  <div>
                    <span className="text-xs text-stone-300 font-medium block">Tactile Bamboo Bound</span>
                    <span className="text-[11px] text-stone-500 block">Zero bleed • Flat lay</span>
                  </div>
                </div>

                <button
                  onClick={handleStartHabit}
                  className="px-6 py-2.5 rounded-full bg-[#E5A93C] hover:bg-[#D49B28] text-[#141312] text-xs font-semibold tracking-wider uppercase transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span>Start the Habit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
