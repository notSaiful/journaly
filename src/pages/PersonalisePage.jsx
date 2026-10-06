import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { trackEvent } from '../utils/analytics';

export default function PersonalisePage({ onAddToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [selectedFoil, setSelectedFoil] = useState('gold');
  const [customName, setCustomName] = useState('ALEXANDER');

  const journals = PRODUCTS.filter((p) => p.category !== 'accessories');

  const foils = [
    { id: 'gold', name: '24K Gold Foil', class: 'gold-foil-emboss', hex: '#E5A93C' },
    { id: 'silver', name: 'Silver Chrome', class: 'silver-foil-emboss', hex: '#C0C0C0' },
    { id: 'deboss', name: 'Blind Deboss', class: 'blind-deboss', hex: '#3D352E' }
  ];

  const handleAdd = () => {
    trackEvent('personalisation_complete', {
      journal: selectedProduct.name,
      name: customName,
      foil: selectedFoil
    });

    onAddToCart({
      ...selectedProduct,
      customId: `${selectedProduct.id}-custom-${customName}-${selectedFoil}`,
      quantity: 1,
      price: selectedProduct.price,
      selectedColor: selectedProduct.colors ? selectedProduct.colors[0].name : 'Default',
      monogram: customName.toUpperCase(),
      foilType: foils.find((f) => f.id === selectedFoil).name
    });
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18] font-sans min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-3">
            Atelier Personalisation Studio
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#1E1B18] tracking-tight leading-tight">
            MAKE IT <br />
            <span className="text-[#6A6054] font-normal">TRULY YOURS.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#6A6054] font-light">
            Choose your journal. Add your name. See it before we make it.
          </p>
        </div>

        {/* 5-Step Customization Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-white p-6 sm:p-12 rounded-3xl border border-[#E5DDCF] shadow-xl">
          
          {/* Left: Live Preview */}
          <div className="lg:col-span-6 flex justify-center sticky top-28">
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#E5DDCF] bg-[#F4EFE6] flex items-center justify-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-center pointer-events-none"
              />

              {/* Dynamic Letterpress Plaque */}
              <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center justify-center text-center px-4">
                <div className="px-6 py-3 rounded-lg bg-white/95 backdrop-blur-md border border-[#E5DDCF] shadow-lg">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8C7E72] block mb-0.5">
                    {foils.find((f) => f.id === selectedFoil).name}
                  </span>
                  <span
                    className={`font-serif text-2xl font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                      foils.find((f) => f.id === selectedFoil).class
                    }`}
                  >
                    {customName || 'YOUR NAME'}
                  </span>
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-[#FAF7F2]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-[#1E1B18] border border-[#E5DDCF] shadow-xs flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#E5A93C]" />
                <span>Complimentary Hand-Stamping</span>
              </div>
            </div>
          </div>

          {/* Right: Step Inputs */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Step 01: Select Journal */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#1E1B18] font-semibold block mb-3">
                01 • Choose Your Journal Edition
              </span>
              <div className="grid grid-cols-2 gap-3">
                {journals.map((j) => (
                  <button
                    key={j.id}
                    type="button"
                    onClick={() => setSelectedProduct(j)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedProduct.id === j.id
                        ? 'border-[#1E1B18] bg-[#FAF7F2] ring-1 ring-[#1E1B18] shadow-xs'
                        : 'border-[#E5DDCF] bg-white hover:border-[#1E1B18]'
                    }`}
                  >
                    <span className="font-serif text-sm font-medium text-[#1E1B18] block line-clamp-1">
                      {j.name}
                    </span>
                    <span className="text-xs font-mono text-[#8C7E72] mt-0.5 block">
                      ${j.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 02: Foil Selection */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#1E1B18] font-semibold block mb-3">
                02 • Choose Letterpress Foil
              </span>
              <div className="grid grid-cols-3 gap-3">
                {foils.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedFoil(f.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedFoil === f.id
                        ? 'border-[#E5A93C] bg-[#FAF7F2] ring-1 ring-[#E5A93C] shadow-xs'
                        : 'border-[#E5DDCF] bg-white hover:border-[#1E1B18]'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full mb-2 shadow-xs" style={{ backgroundColor: f.hex }} />
                    <span className="text-xs font-serif font-medium text-[#1E1B18] block">{f.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 03: Enter Name */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#1E1B18] font-semibold block mb-2">
                03 • Add Your Name or Initials (Max 12 Chars)
              </span>
              <input
                type="text"
                maxLength={12}
                value={customName}
                onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                placeholder="YOUR NAME"
                className="w-full px-5 py-4 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-[#1E1B18] font-serif text-2xl tracking-widest uppercase focus:outline-none focus:border-[#E5A93C] focus:bg-white transition-all shadow-xs"
              />
            </div>

            {/* Step 04 & 05: Add to Bag */}
            <div className="pt-6 border-t border-[#E5DDCF] space-y-3">
              <button
                onClick={handleAdd}
                className="w-full py-4 px-8 rounded-full bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border-2 border-[#1E1B18] text-xs uppercase tracking-widest font-semibold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#E5A93C]" />
                <span>Preview & Add to Bag — ${selectedProduct.price}</span>
              </button>

              <div className="text-center">
                <span className="text-[11px] text-[#6A6054] font-light">
                  Hand-stamped in small batches. Dispatched within 24 hours.
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
