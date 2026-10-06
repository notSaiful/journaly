import React, { useState } from 'react';
import { Star, Eye, ShoppingBag, Check } from 'lucide-react';

export default function ProductCard({ product, onQuickView, onAddToCart }) {
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);
  const [isAdding, setIsAdding] = useState(false);

  const displayImage = selectedColor?.image || product.image;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    setIsAdding(true);
    onAddToCart({
      ...product,
      selectedColor: selectedColor?.name,
      selectedColorHex: selectedColor?.hex,
      customImage: displayImage,
      paperRuling: product.paperTypes ? product.paperTypes[0] : null
    });
    setTimeout(() => setIsAdding(false), 1200);
  };

  return (
    <div
      onClick={() => onQuickView(product, selectedColor)}
      className="group relative bg-white rounded-3xl border border-[#E5DDCF] p-4 transition-all duration-300 hover:shadow-lg hover:border-[#D5C9B7] flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#F3ECE1] mb-4">
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Minimalist Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-md text-[#383129] border border-[#E5DDCF] text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full shadow-xs">
              {product.badge}
            </div>
          )}

          {/* Scarcity Alert */}
          {product.stockLeft && product.stockLeft < 10 && (
            <div className="absolute top-3 right-3 bg-[#A67C37]/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              Only {product.stockLeft} Left
            </div>
          )}

          {/* Quick View Hover Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product, selectedColor);
            }}
            className="absolute bottom-3 inset-x-3 py-2.5 bg-[#FAF7F2]/95 hover:bg-white text-[#2B2520] rounded-xl text-xs font-semibold shadow-md backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 border border-[#E5DDCF]"
          >
            <Eye className="w-3.5 h-3.5 text-[#6A6054]" />
            <span>Quick View & Specs</span>
          </button>
        </div>

        {/* Rating Row in Warm Gold */}
        <div className="flex items-center gap-1 text-[#C49B55] mb-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" />
            ))}
          </div>
          <span className="text-[11px] font-semibold text-[#3D352E] ml-1">
            {product.rating}
          </span>
          <span className="text-[11px] text-[#8C8072]">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Product Title & Subtitle */}
        <h3 className="font-serif text-lg sm:text-xl font-medium text-[#2B2520] leading-snug group-hover:text-[#8C6D46] transition-colors mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-[#6A6054] line-clamp-1 mb-3 font-light">
          {product.subtitle}
        </p>
      </div>

      <div>
        {/* Color Swatches */}
        {product.colors && product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 mb-4" onClick={(e) => e.stopPropagation()}>
            <span className="text-[10px] text-[#8C8072] mr-1 uppercase font-mono">Tones:</span>
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColor?.name === color.name
                    ? 'ring-2 ring-[#8C6D46] ring-offset-1 scale-110'
                    : 'border-black/15 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select ${color.name}`}
              />
            ))}
            <span className="text-[10px] text-[#6A6054] font-medium ml-1">
              {selectedColor?.name}
            </span>
          </div>
        )}

        {/* Price & Add to Bag CTA */}
        <div className="pt-3 border-t border-[#EFE8DD] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold text-[#2B2520]">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#8C8072] line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#4B6B55] font-medium block">
              + Free Monogramming
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all ${
              isAdding
                ? 'bg-[#405445] text-white'
                : 'bg-[#332B24] hover:bg-[#251F1A] text-[#FAF7F2]'
            }`}
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#C4D9CA]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#D9C4A1]" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
