import React from 'react';

export default function EditorialAnimationSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#FAF7F2]">
      {/* Full Screen Actual Size Animation - 100% Natural Lighting, No Darkness, Looping Cleanly */}
      <video
        src="/videos/editorial-progress-animation.mp4"
        autoPlay
        muted
        playsInline
        loop
        className="w-full h-full object-cover object-center"
      />

      {/* White Text Overlay Only:
          "A living rhythm of daily thought."
      */}
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center pointer-events-none z-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-[1.12] drop-shadow-[0_4px_30px_rgba(0,0,0,0.65)]">
            A living rhythm of daily thought.
          </h2>
        </div>
      </div>
    </section>
  );
}
