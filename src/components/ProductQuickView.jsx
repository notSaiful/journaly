import React, { useState } from 'react';
import { X, Star, CheckCircle2, ShieldCheck, Truck, ShoppingBag, Award } from 'lucide-react';
import { useRouter } from '../utils/router';

export default function ProductQuickView({ product, onClose, onAddToCart }) {
  const { navigate } = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product?.image);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAdd = () => {
    onAddToCart({
      ...product,
      customId: `${product.id}-quickview`,
      quantity: quantity,
      price: product.price
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 700);
  };

  const handleViewFullDetails = () => {
    onClose();
    navigate(product.slug ? `/product/${product.slug}` : `/product/${product.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/45 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E5DDCF] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#FAF7F2] hover:bg-[#F3ECE1] text-[#6A6054] transition-colors cursor-pointer border border-[#E5DDCF]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Gallery in Minimalist Beige */}
          <div className="p-6 bg-[#FAF7F2] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E5DDCF]">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-white border border-[#E5DDCF] shadow-sm">
              <img
                src={activeImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-md text-[#1E1B18] text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#E5DDCF]">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                    (activeImage || product.image) === img ? 'border-[#E5A93C] scale-105 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 bg-white rounded-xl border border-[#E5DDCF] text-[11px] text-[#6A6054] space-y-1.5">
              <div className="flex items-center gap-1.5 font-medium text-[#1E1B18]">
                <Truck className="w-3.5 h-3.5 text-emerald-800" />
                <span>Dispatched within 24 hours (Free Express Delivery)</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-[#1E1B18]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
                <span>Hassle-Free Returns & Dedicated Support</span>
              </div>
            </div>
          </div>

          {/* Right Product Details & Controls */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Rating */}
              <div className="flex items-center gap-1.5 text-[#E5A93C] mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-xs font-semibold text-[#1E1B18] ml-1">{product.rating}</span>
                <span className="text-xs text-[#8C7E72]">({product.reviewCount} reviews)</span>
              </div>

              {/* Title & Price */}
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1E1B18] mb-1">
                {product.name}
              </h2>
              <p className="text-xs text-[#8C6D46] mb-3 font-normal italic">"{product.tagline}"</p>

              <div className="flex items-center gap-3 mb-4">
                <span className="font-serif text-3xl font-bold text-[#1E1B18]">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">₹{product.originalPrice}</span>
                )}
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Save ₹{product.originalPrice ? product.originalPrice - product.price : 200}
                </span>
              </div>

              {/* IntelligentLab Research Box */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DDCF] mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-[#8C6D46]" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#1E1B18] font-semibold">
                    IntelligentLab Researched Prompts
                  </span>
                </div>
                <p className="text-xs text-[#6A6054] font-light leading-relaxed">
                  9/10 people build a lasting habit of daily journaling using this 5-minute format. Researched questions make reflection easy and natural.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-1.5 mb-6 text-xs text-[#4A4138]">
                {product.features?.slice(0, 3).map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#345941] flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity & CTA (White Button) */}
            <div className="space-y-3 pt-4 border-t border-[#E5DDCF]">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#E5DDCF] rounded-full bg-[#FAF7F2] px-3 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-stone-400 hover:text-[#1E1B18] px-2 text-sm cursor-pointer"
                  >
                    −
                  </button>
                  <span className="text-xs font-mono font-medium px-2 text-[#1E1B18]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-stone-400 hover:text-[#1E1B18] px-2 text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={isAdded}
                  className="flex-1 py-3 px-6 rounded-full bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border-2 border-[#1E1B18] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#E5A93C]" />
                  <span>{isAdded ? 'Added to Bag!' : `Add to Bag — ₹${product.price * quantity}`}</span>
                </button>
              </div>

              <button
                onClick={handleViewFullDetails}
                className="w-full py-2.5 text-xs font-mono uppercase tracking-wider text-[#6A6054] hover:text-[#1E1B18] text-center cursor-pointer transition-colors"
              >
                View Full Specifications & Research Details →
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
