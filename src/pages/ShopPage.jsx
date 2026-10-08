import React, { useState } from 'react';
import { ShoppingBag, Eye, Star, ShieldCheck, Truck, RotateCcw, Clock, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, REVIEWS } from '../data/products';
import { useRouter } from '../utils/router';
import { trackEvent } from '../utils/analytics';

export default function ShopPage({ onAddToCart }) {
  const { navigate } = useRouter();
  const product = PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState(product?.image || '/images/journal-guided-meadow-front.jpg');

  if (!product) return null;

  const handleProductSelect = () => {
    trackEvent('view_product', { productId: product.id, name: product.name });
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18] font-sans min-h-screen py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Sub-header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-[#E5DDCF] text-[11px] font-mono tracking-widest uppercase text-[#8C6D46] mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]" />
            <span>Exclusive Single Edition • IntelligentLab Researched</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#1E1B18] tracking-tight leading-tight">
            {product.name}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#6A6054] font-light">
            “{product.tagline}”
          </p>
        </div>

        {/* Product Feature Card (Interactive Gallery + Purchasing Column) */}
        <div className="bg-white rounded-3xl border border-[#E5DDCF] shadow-sm overflow-hidden p-6 sm:p-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Gallery & Angles (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div 
                className="relative aspect-[4/5] sm:aspect-[1/1] max-h-[540px] rounded-2xl bg-[#F4EFE6] overflow-hidden border border-[#E5DDCF]/80 cursor-pointer group"
                onClick={handleProductSelect}
              >
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-4 left-4 bg-[#FAF7F2]/95 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase text-[#1E1B18] border border-[#E5DDCF] shadow-xs">
                  {product.badge}
                </div>
              </div>

              {/* Thumbnails of all 5 Angles */}
              <div className="grid grid-cols-5 gap-2.5 sm:gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === img
                        ? 'border-[#1E1B18] ring-2 ring-[#E5A93C]/40 scale-102'
                        : 'border-[#E5DDCF] hover:border-[#8C7E72]'
                    }`}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Story, Pricing & Actions (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center text-[#E5A93C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-medium text-[#1E1B18]">{product.rating}</span>
                  <span className="text-xs text-[#8C7E72] font-mono">({product.reviewCount} Verified Orders)</span>
                </div>

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl sm:text-4xl font-semibold text-[#1E1B18]">₹{product.price}</span>
                  <span className="text-lg text-[#8C7E72] line-through">₹{product.originalPrice}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E5A93C]/15 text-[#8C6D46] text-xs font-mono font-semibold">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#6A6054] font-light leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* 4 Value Pillars */}
                <div className="space-y-3 mb-8">
                  {product.valuePoints.map((val, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#345941] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-[#1E1B18] block">{val.title}</span>
                        <span className="text-xs text-[#6A6054] font-light">{val.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div>
                <div className="flex flex-col gap-3 mb-6">
                  <button
                    onClick={() => {
                      trackEvent('add_to_cart', { productId: product.id, price: product.price });
                      if (onAddToCart) {
                        onAddToCart({
                          ...product,
                          customId: `${product.id}-exclusive`,
                          quantity: 1,
                          price: product.price
                        });
                      }
                    }}
                    className="w-full py-4 px-6 bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border-2 border-[#1E1B18] text-xs font-semibold uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#E5A93C]" />
                    <span>Add To Bag — ₹{product.price}</span>
                  </button>

                  <button
                    onClick={handleProductSelect}
                    className="w-full py-3 px-6 bg-transparent hover:bg-stone-100 text-[#6A6054] border border-[#E5DDCF] text-xs font-medium uppercase tracking-wider rounded-full transition-all text-center cursor-pointer"
                  >
                    View In-Depth Editorial Details
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#E5DDCF]/80 text-center">
                  <div className="flex flex-col items-center">
                    <Truck className="w-4 h-4 text-[#8C6D46] mb-1" />
                    <span className="text-[10px] uppercase font-mono text-[#6A6054]">Free Express Delivery</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <RotateCcw className="w-4 h-4 text-[#8C6D46] mb-1" />
                    <span className="text-[10px] uppercase font-mono text-[#6A6054]">7-Day Easy Returns</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Clock className="w-4 h-4 text-[#8C6D46] mb-1" />
                    <span className="text-[10px] uppercase font-mono text-[#6A6054]">5 Mins Daily</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Verified Reviews Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-medium text-[#1E1B18]">
              Read Real Daily Habit Stories
            </h2>
            <p className="text-xs sm:text-sm text-[#6A6054] mt-1 font-light">
              9 out of 10 people successfully build and sustain a daily journaling habit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((rev) => (
              <div key={rev.id} className="bg-white p-6 rounded-2xl border border-[#E5DDCF] shadow-xs">
                <div className="flex items-center gap-1 text-[#E5A93C] mb-2.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <h3 className="font-semibold text-sm text-[#1E1B18] mb-1.5">{rev.title}</h3>
                <p className="text-xs sm:text-sm text-[#6A6054] font-light leading-relaxed mb-4">
                  “{rev.content}”
                </p>
                <div className="flex items-center justify-between text-[11px] text-[#8C7E72] font-mono pt-3 border-t border-[#E5DDCF]/60">
                  <span>{rev.author} • {rev.city}</span>
                  <span className="text-[#345941] font-medium">✓ Verified Purchase</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
