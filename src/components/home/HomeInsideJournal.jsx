import React, { useState } from 'react';
import { Sparkles, Sun, Moon, Users, Calendar, ArrowUpRight } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

export default function HomeInsideJournal() {
  const [activeTab, setActiveTab] = useState('morning');

  const tabs = [
    {
      id: 'morning',
      label: 'Morning',
      icon: Sun,
      title: 'Three small things worth noticing.',
      body: 'Before your inbox opens or the commute begins. Train your nervous system to notice what is already quietly working in your favor.',
      samplePrompt: '1. The morning sunlight on the counter\n2. First hot sip of pour-over\n3. Waking up without an alarm buzzing'
    },
    {
      id: 'evening',
      label: 'Evening',
      icon: Moon,
      title: 'Keep what was good.',
      body: 'Days blur when we only tally unfinished tasks. A two-minute evening reflection anchors the day’s warmth before you sleep.',
      samplePrompt: '• A small win: Finished the tough presentation\n• What went right: Laughing until my stomach hurt at lunch\n• What to release: The email I can reply to tomorrow'
    },
    {
      id: 'people',
      label: 'People',
      icon: Users,
      title: 'Remember who made the day better.',
      body: 'The version of life you will look back on is made of faces and voices. Note the people who brought lightness into your hours.',
      samplePrompt: '• Who made me smile: The barista who remembered my name\n• An unexpected kindness: An old friend texting "thinking of you"'
    },
    {
      id: 'weekly',
      label: 'Weekly',
      icon: Calendar,
      title: 'Look back before the week disappears.',
      body: 'Every Sunday, take ten minutes to review your five-minute daily entries. Watch an entire week crystallize into an indelible story.',
      samplePrompt: '• The theme of this week: "Patience with beginning again"\n• A memory to keep: Thursday evening dinner outdoors'
    },
    {
      id: 'future',
      label: 'Future',
      icon: ArrowUpRight,
      title: 'Leave something for the person you’re becoming.',
      body: 'Quiet milestone check-ins at Week 04, 08, 12, and 18. Letters written to the future version of you who will read these pages years from now.',
      samplePrompt: '• To the future me reading this in December:\n"Remember how nervous you were in October? Look how well it worked out."'
    }
  ];

  const currentTabData = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="py-24 sm:py-32 bg-[#F4EFE6] border-b border-[#E5DDCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-3">
            Interior Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#1E1B18] tracking-tight leading-tight">
            NO BLANK-PAGE PANIC.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6A6054] font-light">
            We give you somewhere to begin.
          </p>
        </div>

        {/* State Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  trackEvent('inside_journal_tab_click', { tab: tab.id });
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E1B18] text-[#FAF7F2] shadow-md'
                    : 'bg-white/80 text-[#6A6054] hover:bg-white hover:text-[#1E1B18] border border-[#E5DDCF]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#E5A93C]' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tactile Book Spread Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl p-6 sm:p-12 border border-[#E5DDCF] shadow-xl">
          
          {/* Left: Authentic Open Interior Spread Photography */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#E5DDCF] bg-[#FAF7F2]">
              <img
                src="/images/memory-journal-open.jpg"
                alt="Actual interior open spread of Journaly"
                className="w-full h-auto object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 left-4 bg-[#FAF7F2]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E5DDCF] text-[10px] font-mono tracking-widest uppercase text-[#1E1B18] shadow-xs">
                180° Lay-Flat Thread Binding
              </div>
            </div>
          </div>

          {/* Right: Active Tab Prompt Breakdown */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E5A93C] font-semibold block mb-2">
                Prompt Focus • {currentTabData.label}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1B18] font-normal leading-snug">
                {currentTabData.title}
              </h3>
              <p className="mt-3 text-sm text-[#6A6054] font-light leading-relaxed">
                {currentTabData.body}
              </p>
            </div>

            {/* Handwritten simulation style card on cream background */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDCF]/80 shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C7E72] block mb-2">
                Actual Daily Layout
              </span>
              <p className="font-serif text-sm sm:text-base text-[#1E1B18] italic whitespace-pre-line leading-relaxed">
                {currentTabData.samplePrompt}
              </p>
            </div>

            <div className="pt-2 text-xs text-[#6A6054] font-light flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>Printed on premium heavyweight opaque paper. Zero ink bleed guaranteed.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
