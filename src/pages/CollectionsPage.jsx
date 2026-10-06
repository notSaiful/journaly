import React from 'react';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '../data/products';
import { useRouter } from '../utils/router';
import { trackEvent } from '../utils/analytics';

export default function CollectionsPage() {
  const { navigate } = useRouter();

  const handleSelectCollection = (colId) => {
    trackEvent('collection_view', { collectionId: colId });
    navigate('/shop');
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18] font-sans min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-3">
            Curated Chapters
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#1E1B18] tracking-tight leading-tight">
            EVERY CHAPTER <br />
            <span className="text-[#6A6054] font-normal">DESERVES ITS OWN PAGES.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#6A6054] font-light">
            Choose by the part of life you want to keep.
          </p>
        </div>

        {/* Featured Stack Banner (Beige) */}
        <div className="rounded-3xl overflow-hidden border border-[#E5DDCF] bg-[#F4EFE6] text-[#1E1B18] p-8 sm:p-14 mb-16 shadow-md relative group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E5A93C] font-semibold block mb-3">
                Signature Collection Arc
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight text-[#1E1B18]">
                From Manifestation to Memory.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#6A6054] font-light leading-relaxed max-w-xl">
                Whether capturing morning gratitude or intentional daily focus, each edition shares the same researched IntelligentLab questions and comfortable lay-flat construction.
              </p>
              <div className="mt-8">
                <button
                  onClick={() => navigate('/shop')}
                  className="px-7 py-3 rounded-full bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border-2 border-[#1E1B18] text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Complete Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <img
                src="/images/journal-collection-stacked.jpg"
                alt="Stacked Journal Editions"
                className="w-full rounded-2xl shadow-lg border border-[#E5DDCF] object-cover group-hover:scale-101 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Curated Collection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => handleSelectCollection(col.id)}
              className="bg-white rounded-2xl border border-[#E5DDCF] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] bg-[#F4EFE6] overflow-hidden">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-[#FAF7F2]/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-[#1E1B18] border border-[#E5DDCF] shadow-xs">
                  {col.title}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1 bg-[#FAF7F2]">
                <div>
                  <h3 className="font-serif text-2xl font-normal text-[#1E1B18] group-hover:text-[#E5A93C] transition-colors">
                    {col.title}
                  </h3>
                  <p className="font-serif italic text-sm text-[#8C6D46] mt-1">
                    "{col.tagline}"
                  </p>
                  <p className="text-xs text-[#6A6054] font-light mt-2 leading-relaxed">
                    {col.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5DDCF]/80 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#1E1B18] group-hover:text-[#E5A93C]">
                  <span>View Chapter Editions</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
