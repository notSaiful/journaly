import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { SlidersHorizontal, Sparkles, Flame } from 'lucide-react';

export default function ProductCatalog({ onQuickView, onAddToCart, onOpenQuiz }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', label: 'All Editions' },
    { id: 'dot-grid', label: "The Architect's Dot-Grid" },
    { id: 'planners', label: 'Daily & Executive Planners' },
    { id: 'mindfulness', label: 'Wabi-Sabi Raw Linen' },
    { id: 'accessories', label: 'Solid Brass Instruments' }
  ];

  const filteredProducts = PRODUCTS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewCount - a.reviewCount;
  });

  return (
    <section id="collection" className="py-20 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Live Social Proof Pill */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#8C8072] mb-2">
              <Flame className="w-3.5 h-3.5 text-[#8C6D46]" />
              <span>Autumn 2026 Archival Collection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#2B2520] tracking-tight">
              Instruments of Clarity.
            </h2>
          </div>

          {/* Social Proof Live Pill & Quiz Callout in Minimalist Beige */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-full bg-[#EBF0EC] border border-[#D1E0D4] text-[#345941] text-xs font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#598C69] animate-pulse" />
              <span>340+ Dispatched in Last 24 Hours</span>
            </div>

            <button
              onClick={onOpenQuiz}
              className="text-xs font-medium text-[#8C6D46] hover:text-[#6E5433] underline decoration-dotted underline-offset-4 flex items-center gap-1 cursor-pointer"
            >
              <span>Not sure which layout? Take the 60s quiz →</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs & Sorting Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E5DDCF]">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#332B24] text-[#FAF7F2] shadow-xs'
                    : 'bg-white hover:bg-[#F3ECE1] text-[#4A4138] border border-[#E5DDCF]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs text-[#8C8072] self-end sm:self-auto">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C8072]" />
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-medium text-[#2B2520] focus:outline-none cursor-pointer border-b border-[#D9CFBF] pb-0.5"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated (4.9★+)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {/* Reassurance Banner under grid in Minimalist Linen Beige */}
        <div className="mt-14 p-6 rounded-3xl bg-[#F4EFE6] border border-[#E5DDCF] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#383129] text-[#D9C4A1] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-[#2B2520]">
                Need Corporate or Wedding Gifting?
              </h4>
              <p className="text-xs text-[#6A6054] font-light">
                Custom company debossing, bulk volume discounts, and luxury bespoke gift packaging available.
              </p>
            </div>
          </div>
          <button
            onClick={() => alert("Corporate gifting concierge: orders@chronicleatelier.com")}
            className="px-6 py-2.5 bg-white hover:bg-[#FAF7F2] border border-[#D9CFBF] rounded-full text-xs font-semibold text-[#3D352E] transition-colors whitespace-nowrap shadow-xs cursor-pointer"
          >
            Inquire for Bespoke Orders
          </button>
        </div>

      </div>
    </section>
  );
}
