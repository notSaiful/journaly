import React from 'react';

export default function HomeMemoryStory() {
  return (
    <section
      id="scene-memory-story"
      className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#E5DDCF] select-none"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] block mb-3 font-semibold">
          The Memory Dilemma
        </span>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#1E1B18] tracking-tight leading-tight">
          YOU REMEMBER THE PHOTO. <br />
          <span className="text-[#6A6054] font-normal text-xl sm:text-2xl md:text-3xl mt-2 block">
            But do you remember how it felt?
          </span>
        </h2>

        {/* Clean, Full-Natural Visual Representation */}
        <div className="mt-12 w-full max-w-4xl rounded-2xl overflow-hidden shadow-lg border border-[#E5DDCF] bg-[#F4EFE6]">
          <img
            src="/images/memory-half-phone-journal.jpg"
            alt="Camera roll photos versus the physical keepsake habit journal"
            className="w-full h-auto max-h-[560px] object-cover object-center"
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
}
