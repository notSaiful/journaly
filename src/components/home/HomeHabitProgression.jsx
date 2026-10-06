import React, { useState } from 'react';

export default function HomeHabitProgression() {
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  const milestones = [
    {
      marker: 'DAY 01',
      title: 'Just begin.',
      description: 'You open the first leaf. The date line is blank. You write three sentences about breakfast or the weather. You close the cover feeling unburdened.'
    },
    {
      marker: 'WEEK 01',
      title: 'A few pages become a rhythm.',
      description: 'Without forcing it, you reach for the journal alongside your morning mug. The prompt already knows what to ask.'
    },
    {
      marker: 'WEEK 04',
      title: 'You start noticing more.',
      description: 'Throughout the day, your mind quietly notes: "I want to write this down tomorrow morning." Your attention sharpens.'
    },
    {
      marker: 'WEEK 08',
      title: 'The small details begin adding up.',
      description: 'You flip backward and rediscover a conversation from two months ago that you had completely forgotten occurred.'
    },
    {
      marker: 'WEEK 12',
      title: 'Your journal sounds unmistakably like you.',
      description: 'No performative prose. Just honest, grounded, intimate snapshots of your actual days, worries, and victories.'
    },
    {
      marker: 'WEEK 18',
      title: 'You have a chapter of your life.',
      description: 'The spine is lovingly broken-in. The ribbon rests near the end. An entire season of your existence is preserved forever.'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#FAF7F2] border-b border-[#E5DDCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-3">
            Long-Term Practice
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#1E1B18] tracking-tight leading-tight">
            NOT A CHALLENGE. <br />
            <span className="text-[#6A6054] font-normal">A practice.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6A6054] font-light leading-relaxed max-w-xl">
            No perfect streak required. Start with one page. Return when you can. Let the habit grow quietly.
          </p>
        </div>

        {/* 2-Column Progression Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Continuous Progress Film (Hands writing & memories inserted) */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#E5DDCF] bg-[#141312] aspect-[16/10] relative group">
              <video
                src="/videos/editorial-progress-animation.mp4"
                autoPlay
                muted
                playsInline
                loop
                className="w-full h-full object-cover object-center pointer-events-none"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#FAF7F2]/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#E5DDCF] flex items-center justify-between shadow-sm">
                <span className="text-xs font-serif text-[#1E1B18] italic font-medium">
                  "A living rhythm of daily thought."
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5A93C] font-semibold">
                  18-Week Arc
                </span>
              </div>
            </div>
          </div>

          {/* Right: Milestone Progression Cards */}
          <div className="lg:col-span-6 space-y-3">
            {milestones.map((item, idx) => {
              const isCurrent = selectedMilestone === idx;
              return (
                <div
                  key={item.marker}
                  onClick={() => setSelectedMilestone(idx)}
                  className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-white border-[#E5A93C] shadow-md ring-1 ring-[#E5A93C]/30'
                      : 'bg-[#F4EFE6]/70 border-[#E5DDCF] hover:bg-white hover:border-[#D5C9B5]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-mono font-bold tracking-widest ${
                      isCurrent ? 'text-[#E5A93C]' : 'text-[#6A6054]'
                    }`}>
                      {item.marker}
                    </span>
                    <span className="text-xs font-serif italic text-[#6A6054]">
                      {isCurrent ? 'Current focus' : ''}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-[#1E1B18] font-medium">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6A6054] font-light mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
