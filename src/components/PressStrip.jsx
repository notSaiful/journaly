import React from 'react';
import { PRESS_LOGOS } from '../data/products';
import { CheckCircle2, Award } from 'lucide-react';

export default function PressStrip() {
  return (
    <section className="py-12 bg-[#F4EFE6] border-y border-[#E5DDCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subtitle */}
        <p className="text-center font-mono text-[11px] tracking-[0.25em] uppercase text-[#8C8072] mb-8 flex items-center justify-center gap-2">
          <Award className="w-3.5 h-3.5 text-[#8C6D46]" />
          <span>Recognized Worldwide for Archival Craftsmanship</span>
        </p>

        {/* Press Badges & Quotes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-items-center">
          {PRESS_LOGOS.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-3 group">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[#2B2520] opacity-80 group-hover:opacity-100 transition-opacity">
                {item.name}
              </span>
              <p className="text-[11px] text-[#6E6458] italic mt-1.5 max-w-[170px] leading-tight font-light">
                "{item.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* 4 Pillars of Craftsmanship */}
        <div className="mt-10 pt-8 border-t border-[#DFD5C5] grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#3D352E]">
            <CheckCircle2 className="w-4 h-4 text-[#596E5F]" />
            <span>IntelligentLab Researched Prompts</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#3D352E]">
            <CheckCircle2 className="w-4 h-4 text-[#596E5F]" />
            <span>180° Smyth-Sewn Flat Lay</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#3D352E]">
            <CheckCircle2 className="w-4 h-4 text-[#596E5F]" />
            <span>9/10 Build a Lasting Habit</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#3D352E]">
            <CheckCircle2 className="w-4 h-4 text-[#596E5F]" />
            <span>Zero Synthetic Plastics</span>
          </div>
        </div>

      </div>
    </section>
  );
}
