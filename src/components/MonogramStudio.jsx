import React, { useState } from 'react';
import { Sparkles, Check, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function MonogramStudio({ onAddToCart }) {
  const [selectedProduct] = useState(PRODUCTS[0]);
  const [selectedColor, setSelectedColor] = useState(PRODUCTS[0].colors[0]);
  const [monogramText, setMonogramText] = useState('M.S.');
  const [foilType, setFoilType] = useState('gold'); // 'gold' | 'silver' | 'deboss'
  const [paperRuling, setPaperRuling] = useState('5mm Dot Grid');
  const [position] = useState('center'); // 'center' | 'bottom-right'
  const [isAdded, setIsAdded] = useState(false);

  const foilStyles = {
    gold: {
      label: '24K Warm Gold Foil',
      textClass: 'gold-foil-emboss font-serif tracking-[0.25em] font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]',
      colorSwatch: 'bg-gradient-to-r from-[#C29F5F] via-[#F4E3BC] to-[#A88243]'
    },
    silver: {
      label: 'Pure Platinum Silver',
      textClass: 'silver-foil-emboss font-serif tracking-[0.25em] font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]',
      colorSwatch: 'bg-gradient-to-r from-stone-300 via-white to-stone-400'
    },
    deboss: {
      label: 'Artisan Blind Deboss',
      textClass: 'blind-deboss font-serif tracking-[0.25em] font-bold drop-shadow-[inset_0_2px_3px_rgba(0,0,0,0.5)]',
      colorSwatch: 'bg-[#524940]'
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleAddCustomToCart = () => {
    const customizedItem = {
      ...selectedProduct,
      customId: `${selectedProduct.id}-${selectedColor.name}-${monogramText}-${foilType}`,
      selectedColor: selectedColor.name,
      selectedColorHex: selectedColor.hex,
      customImage: selectedColor.image,
      monogram: monogramText.trim() ? monogramText.trim() : null,
      foilType: foilType,
      paperRuling: paperRuling,
      position: position,
      price: selectedProduct.price
    };

    onAddToCart(customizedItem);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="monogram-studio" className="py-20 lg:py-28 bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE8DD] border border-[#D9CFBF] text-[#735C3E] text-xs font-mono uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#8C6D46]" />
            <span>Complimentary Bespoke Studio ($15 Value Included)</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#2B2520] tracking-tight mb-4">
            Make It Unmistakably Yours.
          </h2>
          <p className="text-[#6A6054] text-base sm:text-lg font-light leading-relaxed">
            Hand-stamped in our London bindery using traditional heated brass type. 
            Personalize your cover with initials or an intention that grounds your daily ritual.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Live Preview Mockup */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl shadow-[0_20px_50px_-12px_rgba(80,70,60,0.18)] overflow-hidden border-8 border-white bg-stone-900 transition-all duration-500">
              
              {/* Journal Cover Texture & Color */}
              <img
                src={selectedColor.image}
                alt={selectedColor.name}
                className="w-full h-full object-cover filter contrast-[1.02] transition-all duration-700"
              />

              {/* Spine Highlight Shadow */}
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/35 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 left-7 w-[1px] bg-white/20 pointer-events-none" />

              {/* Dynamic Live Stamped Monogram Foil */}
              {monogramText.trim() && (
                <div
                  className={`absolute transition-all duration-500 flex flex-col items-center pointer-events-none ${
                    position === 'center'
                      ? 'inset-0 flex items-center justify-center'
                      : 'bottom-16 right-10'
                  }`}
                >
                  {position === 'center' && (
                    <div className="w-8 h-8 mb-2 opacity-80 flex items-center justify-center">
                      <Sparkles className={`w-6 h-6 ${foilType === 'gold' ? 'text-[#F5E2B8]' : foilType === 'silver' ? 'text-stone-200' : 'text-black/40'}`} />
                    </div>
                  )}
                  <span
                    className={`text-2xl sm:text-3xl uppercase tracking-[0.35em] ${foilStyles[foilType].textClass} px-3 py-1 rounded`}
                  >
                    {monogramText}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/50 mt-1">
                    Archival 2026
                  </span>
                </div>
              )}

              {/* Live Badge Watermark */}
              <div className="absolute top-4 left-4 bg-stone-900/50 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-white flex items-center gap-1.5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Atelier Preview</span>
              </div>

              {/* 160 GSM Stamp */}
              <div className="absolute bottom-4 left-4 bg-[#FAF7F2]/95 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-mono font-bold text-[#2B2520] shadow-sm">
                160 GSM BAMBOO
              </div>
            </div>

            {/* Micro Caption */}
            <p className="text-xs text-[#8C8072] mt-4 text-center italic font-light">
              *Preview shows simulated 24K hot foil impression on vegan pebble grain. Hand-inspected before dispatch.
            </p>
          </div>

          {/* Right Column: Customization Controls in Minimalist Beige */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5DDCF] shadow-sm space-y-6">
            
            {/* Step 1: Text Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#2B2520]">
                  1. Enter Custom Monogram / Intention
                </label>
                <span className="text-xs text-[#8C8072] font-mono">Max 6 Chars</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  value={monogramText}
                  onChange={(e) => setMonogramText(e.target.value.toUpperCase())}
                  placeholder="e.g. M.S. or FOCUS"
                  className="w-full px-4 py-3.5 rounded-xl border border-[#D9CFBF] focus:border-[#8C6D46] focus:ring-2 focus:ring-[#8C6D46]/15 font-serif text-lg tracking-widest uppercase text-[#2B2520] bg-[#FAF7F2]/60 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setMonogramText('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C8072] hover:text-[#2B2520]"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Step 2: Choose Cover Shade */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#2B2520] block mb-2">
                2. Select Cover Material & Tone: <span className="font-normal text-[#6A6054] ml-1">{selectedColor.name}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorChange(color)}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all ${
                      selectedColor.name === color.name
                        ? 'border-[#8C6D46] bg-[#FAF7F2] ring-1 ring-[#8C6D46]'
                        : 'border-[#E5DDCF] hover:border-[#D9CFBF] bg-white'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-black/10 flex-shrink-0 shadow-inner"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs font-medium text-[#2B2520] truncate">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Foil Stamping Finish */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#2B2520] block mb-2">
                3. Choose Foil Stamping Finish
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(foilStyles).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => setFoilType(key)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      foilType === key
                        ? 'border-[#8C6D46] bg-[#FAF7F2] shadow-sm ring-1 ring-[#8C6D46]'
                        : 'border-[#E5DDCF] hover:border-[#D9CFBF]'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full mx-auto mb-1.5 shadow-sm ${item.colorSwatch}`} />
                    <span className="text-[11px] font-medium text-[#2B2520] block leading-tight">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Paper Ruling & Layout */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#2B2520] block mb-2">
                4. Select Interior Archival Ruling
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['5mm Dot Grid', '7mm Ruled', 'Blank 160gsm'].map((ruling) => (
                  <button
                    key={ruling}
                    onClick={() => setPaperRuling(ruling)}
                    className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all ${
                      paperRuling === ruling
                        ? 'border-[#8C6D46] bg-[#FAF7F2] text-[#8C6D46] font-semibold'
                        : 'border-[#E5DDCF] text-[#6A6054] hover:border-[#D9CFBF]'
                    }`}
                  >
                    {ruling}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing Summary & Free Perk Callout */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5DDCF] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl font-bold text-[#2B2520]">$38</span>
                  <span className="text-[#8C8072] line-through text-sm">$53</span>
                  <span className="text-[11px] bg-[#E2EBE5] text-[#345941] font-semibold px-2 py-0.5 rounded border border-[#C5D9CC]">
                    Save $15 (Free Foil)
                  </span>
                </div>
                <p className="text-[11px] text-[#6A6054] mt-0.5">
                  Includes 160gsm Archival Journal + Custom Monogram
                </p>
              </div>

              <div className="text-right hidden sm:block">
                <span className="text-xs text-[#8C8072] block">Dispatch Window</span>
                <span className="text-xs font-semibold text-[#2B2520]">Leaves Atelier in 24h</span>
              </div>
            </div>

            {/* High Converting Action Button */}
            <button
              onClick={handleAddCustomToCart}
              className={`w-full py-4 rounded-full font-medium text-base shadow-sm flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                isAdded
                  ? 'bg-[#405445] text-white'
                  : 'bg-[#332B24] hover:bg-[#251F1A] text-[#FAF7F2]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5 text-[#C4D9CA]" />
                  <span>Added To Your Bag!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#D9C4A1]" />
                  <span>Add Personalized Journal to Bag — $38</span>
                </>
              )}
            </button>

            {/* Guarantee Pill */}
            <div className="flex items-center justify-center gap-4 text-[11px] text-[#8C8072] pt-1 font-light">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6A6054]" /> Hassle-Free 7-Day Returns
              </span>
              <span>•</span>
              <span>Express Delivery</span>
              <span>•</span>
              <span>Atelier Craftsmanship</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
