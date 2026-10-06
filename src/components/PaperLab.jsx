import React, { useState } from 'react';
import { ShieldCheck, Check, X, Feather } from 'lucide-react';

export default function PaperLab({ onShopClick }) {
  const [activeTool, setActiveTool] = useState('fountain-pen');

  const tools = [
    {
      id: 'fountain-pen',
      name: 'Wet Fountain Pen',
      spec: 'Montblanc Meisterstück 146 (Broad Nib, Wet Blue Ink)',
      standardEffect: 'Feathering & heavy bleed through to 2 subsequent pages.',
      chronicleEffect: 'Crisp line edges. Zero feathering, zero ghosting on flip side.'
    },
    {
      id: 'sharpie-marker',
      name: 'Alcohol Marker & Sharpie',
      spec: 'Copic Ciao & Sharpie Fine Point Permanent Black',
      standardEffect: 'Complete soak-through ruining reverse writing area completely.',
      chronicleEffect: 'Double-sized bamboo fibers capture pigment entirely on surface.'
    },
    {
      id: 'gel-roller',
      name: '0.7mm Liquid Rollerball',
      spec: 'Pilot G2 & Schmidt Ceramic Liquid Ink',
      standardEffect: 'Noticeable shadows and paper wrinkling under moderate pressure.',
      chronicleEffect: 'Velvety smooth glide with 100% opaque back page.'
    },
    {
      id: 'watercolor',
      name: 'Watercolor Wash & Highlighters',
      spec: 'Winsor & Newton Wet Brush & Zebra Mildliner',
      standardEffect: 'Paper buckles, pills, and tears when damp.',
      chronicleEffect: 'Cold-pressed sizing holds light washes with minimal buckled fibers.'
    }
  ];

  const currentTool = tools.find((t) => t.id === activeTool) || tools[0];

  return (
    <section id="paper-lab" className="py-20 lg:py-28 bg-[#F3ECE1] text-[#2B2520] relative overflow-hidden border-y border-[#E5DDCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8E0D2] border border-[#D9CFBF] text-[#735C3E] text-xs font-mono uppercase tracking-widest mb-4">
            <Feather className="w-3.5 h-3.5 text-[#8C6D46]" />
            <span>The 160 GSM Zero-Bleed Laboratory</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#2B2520] tracking-tight mb-4">
            Paper Engineered to Never Bleed.
          </h2>
          <p className="text-[#6A6054] text-base sm:text-lg font-light leading-relaxed">
            Most luxury journals compromise with 70–80 GSM wood-pulp paper. 
            We mill ultra-dense 160 GSM cold-pressed bamboo paper that holds whatever ink your thoughts demand.
          </p>
        </div>

        {/* Tool Selector Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTool(t.id)}
              className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTool === t.id
                  ? 'bg-[#332B24] text-[#FAF7F2] font-semibold shadow-sm'
                  : 'bg-white hover:bg-[#FAF7F2] text-[#4A4138] border border-[#E5DDCF]'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Comparison Showcase Container in Clean Minimalist Beige */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-[#E5DDCF] p-6 sm:p-10 shadow-sm">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-8 border-b border-[#EFE8DD]">
            <div>
              <span className="text-xs text-[#8C6D46] font-mono uppercase tracking-wider block">
                Testing Apparatus:
              </span>
              <h3 className="text-lg font-medium text-[#2B2520]">
                {currentTool.spec}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#6A6054] bg-[#FAF7F2] px-3.5 py-1.5 rounded-full border border-[#E5DDCF]">
              <ShieldCheck className="w-4 h-4 text-[#4B6B55]" />
              <span>Independent ISO 9706 Archival Certified</span>
            </div>
          </div>

          {/* Interactive Split View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Standard Notebook Paper */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E5DDCF] relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold tracking-wider text-[#9E4A4A] flex items-center gap-1.5">
                  <X className="w-4 h-4 text-[#9E4A4A]" />
                  <span>STANDARD NOTEBOOK (70–80 GSM)</span>
                </span>
                <span className="text-[10px] text-[#8C8072]">Reverse Page Result</span>
              </div>

              {/* Simulated Paper bleed visual */}
              <div className="h-44 bg-[#F2ECE1] rounded-xl p-5 relative overflow-hidden flex flex-col justify-between text-stone-800 shadow-inner border border-[#E2D7C5]">
                <div className="space-y-2 opacity-35">
                  <div className="h-2 bg-stone-400 rounded w-5/6" />
                  <div className="h-2 bg-stone-400 rounded w-4/6" />
                  <div className="h-2 bg-stone-400 rounded w-full" />
                </div>
                {/* Simulated Ink Bleed Blotches */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-24 h-16 bg-[#5A6E82]/35 blur-md rounded-full transform -rotate-12" />
                  <div className="w-16 h-10 bg-[#3E4E5E]/40 blur-sm rounded-full transform translate-x-4" />
                </div>
                <div className="bg-[#F5E6E6] border border-[#E5C2C2] px-3 py-1 rounded text-[11px] font-mono font-semibold text-[#8C3A3A] self-start z-10">
                  FAIL: Severe Bleed & Ghosting
                </div>
              </div>

              <p className="text-xs text-[#6A6054] mt-4 leading-relaxed font-light">
                {currentTool.standardEffect}
              </p>
            </div>

            {/* Chronicle Atelier 160 GSM Bamboo Paper */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border-2 border-[#8C6D46]/60 relative shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold tracking-wider text-[#345941] flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#345941]" />
                  <span>CHRONICLE ATELIER (160 GSM BAMBOO)</span>
                </span>
                <span className="text-[10px] text-[#4B6B55] font-mono font-semibold">Zero Ghosting</span>
              </div>

              {/* Pristine Paper visual */}
              <div className="h-44 bg-white rounded-xl p-5 relative overflow-hidden flex flex-col justify-between text-[#2B2520] shadow-inner border border-[#E5DDCF]">
                {/* Subtle dotted matrix */}
                <div className="absolute inset-0 bg-dot-grid-beige opacity-25" />
                
                <div className="relative z-10 space-y-2">
                  <span className="font-serif italic text-[#3D352E] text-sm">
                    "Where fleeting thoughts become lifelong clarity."
                  </span>
                  <div className="h-1.5 bg-[#8C6D46]/20 rounded w-1/2" />
                </div>

                <div className="bg-[#EBF2ED] border border-[#CDE0D3] px-3 py-1 rounded text-[11px] font-mono font-semibold text-[#2B5438] self-start relative z-10 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#345941]" />
                  <span>PASS: 100% Opaque & Crisp</span>
                </div>
              </div>

              <p className="text-xs text-[#3D352E] mt-4 leading-relaxed font-medium">
                {currentTool.chronicleEffect}
              </p>
            </div>

          </div>

          {/* Bottom Conversion Prompt */}
          <div className="mt-10 pt-6 border-t border-[#EFE8DD] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EBF2ED] text-[#345941] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-xs text-[#524940] font-light">
                Backed by our <strong>100% Fountain Pen Ink Guarantee</strong>. If your ink bleeds, we refund you immediately.
              </p>
            </div>

            <button
              onClick={onShopClick}
              className="px-6 py-3 bg-[#332B24] hover:bg-[#251F1A] text-[#FAF7F2] rounded-full text-xs font-semibold shadow-sm transition-all whitespace-nowrap cursor-pointer"
            >
              Shop 160 GSM Journals ($38)
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
