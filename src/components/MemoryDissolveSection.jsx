import React from 'react';

export default function MemoryDissolveSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#FAF7F2] select-none">
      {/* Full Screen Half & Half: Left half phone with memories, Right half Journaly book */}
      <img
        src="/images/memory-half-phone-journal.jpg"
        alt="Digital Memories and Physical Journaly"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* White Text Overlay Only: "Let the pages do the remembering." */}
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center pointer-events-none z-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-[1.12] drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
            Let the pages do the remembering.
          </h2>
        </div>
      </div>
    </section>
  );
}
