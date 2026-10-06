import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';
import { useRouter } from '../../utils/router';
import { trackEvent } from '../../utils/analytics';

export default function HomePersonalisation({ onAddToCart }) {
  const { navigate } = useRouter();
  const [customName, setCustomName] = useState('SARAH');
  const [foilType, setFoilType] = useState('gold');

  const handleCustomAdd = () => {
    trackEvent('personalisation_complete', { name: customName, foil: foilType });
    if (onAddToCart) {
      onAddToCart({
        id: 'gratitude-journal-custom',
        name: 'The Bloom Journal',
        customId: `gratitude-custom-${customName}-${foilType}`,
        price: 349,
        quantity: 1,
        image: '/images/journal-floral-front.png',
        monogram: customName.toUpperCase(),
        foilType: foilType === 'gold' ? '24K Gold Foil' : foilType === 'silver' ? 'Silver Chrome' : 'Blind Deboss'
      });
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-[#FAF7F2] border-b border-[#E5DDCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-3">
            Atelier Personalisation
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#1E1B18] tracking-tight leading-tight">
            MAKE IT <br />
            <span className="text-[#6A6054] font-normal">UNMISTAKABLY YOURS.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6A6054] font-light max-w-xl">
            Add your name and turn a beautiful journal into your journal. Hand-stamped in small batches using traditional brass letterpress.
          </p>
        </div>

        {/* Live Personalisation Interactive Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center bg-white rounded-3xl p-6 sm:p-12 border border-[#E5DDCF] shadow-xl">
          
          {/* Left Column: Live Journal Mockup with Live Name Stamping */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#E5DDCF] bg-[#F4EFE6] flex items-center justify-center group">
              <img
                src="/images/journal-floral-front.png"
                alt="Personalised Journal Preview"
                className="w-full h-full object-cover object-center pointer-events-none"
              />

              {/* Dynamic Hot Foil Name Stamping Plate */}
              <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center justify-center text-center px-4">
                <div className="px-6 py-2.5 rounded-lg bg-white/95 backdrop-blur-md border border-[#E5DDCF] shadow-lg">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8C7E72] block mb-0.5">
                    {foilType === 'gold' ? '24K Heated Gold Foil' : foilType === 'silver' ? 'Silver Chrome' : 'Blind Deep Deboss'}
                  </span>
                  <span
                    className={`font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                      foilType === 'gold'
                        ? 'gold-foil-emboss'
                        : foilType === 'silver'
                        ? 'silver-foil-emboss'
                        : 'blind-deboss'
                    }`}
                  >
                    {customName || 'YOUR NAME'}
                  </span>
                </div>
              </div>

              {/* Corner Foil Seal */}
              <div className="absolute top-4 right-4 bg-[#FAF7F2]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-[#1E1B18] border border-[#E5DDCF] shadow-xs flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#E5A93C]" />
                <span>Complimentary Stamping</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Input: Custom Name */}
            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-[#1E1B18] font-semibold block mb-2">
                01 • Enter Your Name or Initials (Max 12 Characters)
              </label>
              <input
                type="text"
                maxLength={12}
                value={customName}
                onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                placeholder="SARAH"
                className="w-full px-5 py-4 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-[#1E1B18] font-serif text-xl tracking-widest uppercase focus:outline-none focus:border-[#E5A93C] focus:bg-white transition-all shadow-xs"
              />
              <span className="text-[11px] text-[#6A6054] font-light mt-1.5 block">
                Preview updates instantly on the journal cover.
              </span>
            </div>

            {/* Foil Finishes Selector */}
            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-[#1E1B18] font-semibold block mb-3">
                02 • Choose Your Letterpress Foil Finish
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFoilType('gold')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    foilType === 'gold'
                      ? 'border-[#E5A93C] bg-[#FAF7F2] shadow-sm ring-1 ring-[#E5A93C]'
                      : 'border-[#E5DDCF] bg-white hover:border-[#1E1B18]'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-[#E5A93C] mb-2 shadow-xs" />
                  <span className="text-xs font-serif font-medium text-[#1E1B18] block">24K Gold Foil</span>
                  <span className="text-[10px] text-[#6A6054] font-light block">Signature</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFoilType('silver')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    foilType === 'silver'
                      ? 'border-[#1E1B18] bg-[#FAF7F2] shadow-sm ring-1 ring-[#1E1B18]'
                      : 'border-[#E5DDCF] bg-white hover:border-[#1E1B18]'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-[#C0C0C0] mb-2 shadow-xs" />
                  <span className="text-xs font-serif font-medium text-[#1E1B18] block">Silver Chrome</span>
                  <span className="text-[10px] text-[#6A6054] font-light block">Crisp & Modern</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFoilType('deboss')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    foilType === 'deboss'
                      ? 'border-[#8C7E72] bg-[#FAF7F2] shadow-sm ring-1 ring-[#8C7E72]'
                      : 'border-[#E5DDCF] bg-white hover:border-[#1E1B18]'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-[#3D352E] mb-2 shadow-xs" />
                  <span className="text-xs font-serif font-medium text-[#1E1B18] block">Blind Deboss</span>
                  <span className="text-[10px] text-[#6A6054] font-light block">Subtle Impression</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#E5DDCF] flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleCustomAdd}
                className="w-full sm:flex-1 py-4 px-8 rounded-full bg-[#1E1B18] hover:bg-[#332C26] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#E5A93C]" />
                <span>Add Custom Journal — $36</span>
              </button>

              <button
                onClick={() => navigate('/personalise')}
                className="w-full sm:w-auto py-4 px-6 rounded-full border border-[#E5DDCF] hover:bg-[#FAF7F2] text-xs font-mono uppercase tracking-wider text-[#1E1B18] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Full Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
