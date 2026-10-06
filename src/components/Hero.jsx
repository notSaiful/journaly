import React from 'react';

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#FAF7F2]">
      {/* Full Screen Actual Size Video - 100% Natural Brightness, No Darkness Filter, Looping Cleanly */}
      <video
        src="/videos/hero-film.mp4"
        autoPlay
        muted
        playsInline
        loop
        className="w-full h-full object-cover object-center"
      />

      {/* White Text Overlay Only:
          "Five minutes.
           Every day gets somewhere to live."
      */}
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center pointer-events-none z-20">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-[1.12] drop-shadow-[0_4px_30px_rgba(0,0,0,0.65)]">
            <span className="block italic font-light">Five minutes.</span>
            <span className="block font-medium tracking-normal mt-2 sm:mt-4">
              Every day gets somewhere to live.
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
