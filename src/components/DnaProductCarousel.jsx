import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ShoppingBag, Eye, Star } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useRouter } from '../utils/router';

export default function DnaProductCarousel({ onAddToCart, onQuickView }) {
  const scrollRef = useRef(null);
  const { navigate } = useRouter();
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const carouselItems = PRODUCTS.map((prod, idx) => ({
    ...prod,
    displayImage: prod.image,
    tag: prod.badge || 'Habit Edition',
    edition: `0${idx + 1} / ${prod.name.split('—')[1]?.trim() || prod.name}`
  }));

  // Manual smooth arrow scrolling
  const scrollByAmount = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  // Drag to scroll handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Strictly 1 card per product — no duplication
  const allCards = carouselItems;

  return (
    <section id="product-carousel-section" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E5DDCF] relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E5A93C]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#8C6D46] font-semibold">
                The Daily Habit Collection
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#1A1816] tracking-tight">
              Researched Habit Editions
            </h2>
            <p className="text-[#6A6054] text-sm sm:text-base font-light mt-2 max-w-xl">
              IntelligentLab researched questions designed to help 9 out of 10 people build a lasting daily habit and record their real life.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollByAmount(-340)}
              className="w-11 h-11 rounded-full bg-white border border-[#E5DDCF] text-[#1A1816] hover:bg-[#F3ECE1] hover:border-[#D9CFBF] transition-all flex items-center justify-center shadow-xs cursor-pointer active:scale-95"
              aria-label="Previous items"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollByAmount(340)}
              className="w-11 h-11 rounded-full bg-white border border-[#E5DDCF] text-[#1A1816] hover:bg-[#F3ECE1] hover:border-[#D9CFBF] transition-all flex items-center justify-center shadow-xs cursor-pointer active:scale-95"
              aria-label="Next items"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Simple Horizontal Moving Track */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); setIsDragging(false); }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-8 cursor-grab active:cursor-grabbing pb-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {allCards.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="flex-shrink-0 w-[270px] sm:w-[310px] rounded-3xl bg-white border border-[#E5DDCF] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
          >
            {/* Product Image Frame */}
            <div 
              className="relative aspect-[4/5] bg-[#F4EFE6] overflow-hidden cursor-pointer"
              onClick={() => navigate(item.slug ? `/product/${item.slug}` : `/product/${item.id}`)}
            >
              <img
                src={item.displayImage}
                alt={item.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
              />

              {/* Tag / Badge */}
              <div className="absolute top-3.5 left-3.5 bg-[#FAF7F2]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-[#1A1816] border border-[#E5DDCF]/80 shadow-xs font-medium">
                {item.tag}
              </div>

              {/* Price Pill */}
              <div className="absolute bottom-3.5 right-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-semibold text-[#1E1B18] border border-[#E5DDCF] shadow-sm">
                ₹{item.price}
              </div>
            </div>

            {/* Product Info & Action */}
            <div className="p-5 flex flex-col justify-between flex-1 bg-[#FAF7F2]">
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#8C8072] font-mono mb-1.5">
                  <span>{item.edition}</span>
                  <div className="flex items-center gap-1 text-[#E5A93C]">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[#1A1816] font-sans font-medium text-xs">{item.rating}</span>
                  </div>
                </div>

                <h3 
                  onClick={() => navigate(item.slug ? `/product/${item.slug}` : `/product/${item.id}`)}
                  className="font-serif text-lg font-medium text-[#1A1816] group-hover:text-[#8C6D46] transition-colors cursor-pointer"
                >
                  {item.name}
                </h3>
                <p className="text-xs text-[#6A6054] font-light mt-1 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>

              {/* Action Buttons (White Button) */}
              <div className="flex items-center gap-2 pt-4 mt-2 border-t border-[#E5DDCF]/70">
                <button
                  onClick={() => {
                    if (onAddToCart) {
                      onAddToCart({
                        ...item,
                        customId: `${item.id}-carousel-select`,
                        quantity: 1,
                        price: item.price,
                        image: item.displayImage
                      });
                    }
                  }}
                  className="flex-1 py-2.5 px-4 bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border-2 border-[#1E1B18] text-xs font-semibold rounded-full transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#E5A93C]" />
                  <span>Add to Bag</span>
                </button>

                {onQuickView && (
                  <button
                    onClick={() => onQuickView(item)}
                    className="p-2.5 rounded-full bg-white border border-[#E5DDCF] text-[#4A4138] hover:text-[#1A1816] hover:bg-[#F3ECE1] transition-colors cursor-pointer"
                    title="Quick View"
                    aria-label={`Quick View ${item.name}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
