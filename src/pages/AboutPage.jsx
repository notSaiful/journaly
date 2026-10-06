import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from '../utils/router';

export default function AboutPage() {
  const { navigate } = useRouter();

  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18] font-sans min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-2.5 h-6 bg-[#E5A93C] rounded-xs mx-auto mb-6" />
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-3">
            The Journaly Origin
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#1E1B18] tracking-tight leading-tight">
            WE SAVE MORE PHOTOS <br />
            THAN ANY GENERATION BEFORE US. <br />
            <span className="text-[#8C6D46] block mt-2 text-lg sm:text-2xl md:text-3xl font-normal">
              And somehow, whole months still disappear.
            </span>
          </h1>
        </div>

        {/* Narrative Core */}
        <div className="space-y-8 text-base sm:text-lg text-[#6A6054] font-light leading-relaxed mb-16">
          <p className="font-serif text-2xl sm:text-3xl text-[#1E1B18] italic font-normal text-center">
            JOURNALY began with a simple thought:
          </p>

          <p>
            A camera can keep how something looked. But not always how it felt.
          </p>

          <div className="p-8 rounded-2xl bg-white border border-[#E5DDCF] shadow-xs space-y-2 text-[#1E1B18] font-serif text-xl sm:text-2xl italic">
            <p>Not the conversation you replayed later.</p>
            <p>Not the nervous first day.</p>
            <p>Not the ridiculous joke.</p>
            <p>Not the person you were slowly becoming.</p>
          </div>

          <p>
            We wanted to make journals that help people keep a little more of real life. Not by asking for pages and pages every day. By making it easier to return for a few thoughtful minutes.
          </p>

          <p>
            When researched IntelligentLab questions guide each page and the book lays flat at 180 degrees, writing ceases to feel like a chore and transforms into a grounding daily habit.
          </p>
        </div>

        {/* Visual Proof */}
        <div className="rounded-3xl overflow-hidden border border-[#E5DDCF] shadow-2xl mb-16">
          <img
            src="/images/memory-half-phone-journal.jpg"
            alt="The contrast between camera images and journal stories"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Closing Call (Beige) */}
        <div className="p-10 rounded-3xl bg-[#F4EFE6] text-[#1E1B18] text-center shadow-md border border-[#E5DDCF]">
          <h2 className="text-3xl sm:text-4xl font-medium text-[#1E1B18] mb-4">
            A LITTLE WRITING. <br />
            <span className="text-[#6A6054] font-normal">A lot more to return to.</span>
          </h2>
          <p className="text-sm text-[#6A6054] font-light max-w-md mx-auto mb-8">
            Start keeping what matters today.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="px-8 py-3.5 rounded-full bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border-2 border-[#1E1B18] text-xs font-semibold uppercase tracking-widest transition-all shadow-md active:scale-95 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Journals</span>
            <ArrowRight className="w-4 h-4 text-[#E5A93C]" />
          </button>
        </div>

      </div>
    </div>
  );
}
