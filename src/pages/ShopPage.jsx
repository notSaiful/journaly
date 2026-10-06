import React, { useState } from 'react';
import { ShoppingBag, Eye, Star, Filter } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useRouter } from '../utils/router';
import { trackEvent } from '../utils/analytics';

export default function ShopPage({ onAddToCart, onQuickView }) {
  const { navigate } = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Editions' },
    { id: 'gratitude', label: 'Gratitude & Guided' },
    { id: 'manifestation', label: 'Manifestation & Focus' }
  ];

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleProductSelect = (product) => {
    trackEvent('view_product', { productId: product.id, name: product.name });
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18] font-sans min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-3">
            The Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#1E1B18] tracking-tight leading-tight">
            FIND A JOURNAL <br />
            <span className="text-[#6A6054] font-normal">FOR THIS CHAPTER.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#6A6054] font-light">
            Researched daily prompts by IntelligentLab to help 9 out of 10 people build a lasting habit and record their real life.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-10 border-b border-[#E5DDCF]">
          <Filter className="w-4 h-4 text-[#8C7E72] mr-2 flex-shrink-0" />
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  trackEvent('collection_view', { category: cat.id });
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all flex-shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#1E1B18] border-2 border-[#1E1B18] font-bold shadow-xs'
                    : 'bg-[#FAF7F2] border border-[#E5DDCF] text-[#6A6054] hover:border-[#1E1B18] hover:text-[#1E1B18]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Scannable Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#E5DDCF] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Product Visual */}
              <div
                onClick={() => handleProductSelect(product)}
                className="relative aspect-[4/5] bg-[#F4EFE6] overflow-hidden cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                <div className="absolute top-3.5 left-3.5 bg-[#FAF7F2]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-[#1E1B18] border border-[#E5DDCF] shadow-xs">
                  {product.badge}
                </div>

                <div className="absolute bottom-3.5 right-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-semibold text-[#1E1B18] border border-[#E5DDCF] shadow-sm">
                  ₹{product.price}
                </div>
              </div>

              {/* Info & Cart Actions */}
              <div className="p-6 flex flex-col justify-between flex-1 bg-[#FAF7F2]">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#6A6054] font-mono mb-2">
                    <span className="uppercase tracking-wider">{product.category}</span>
                    <div className="flex items-center gap-1 text-[#E5A93C]">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-[#1E1B18] font-sans font-medium text-xs">{product.rating}</span>
                    </div>
                  </div>

                  <h3
                    onClick={() => handleProductSelect(product)}
                    className="font-serif text-xl sm:text-2xl font-medium text-[#1E1B18] group-hover:text-[#E5A93C] transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6A6054] font-light mt-1.5 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-5 mt-4 border-t border-[#E5DDCF]/80">
                  <button
                    onClick={() => {
                      trackEvent('add_to_cart', { productId: product.id, price: product.price });
                      onAddToCart({
                        ...product,
                        customId: `${product.id}-catalog`,
                        quantity: 1,
                        price: product.price
                      });
                    }}
                    className="flex-1 py-2.5 px-4 bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border-2 border-[#1E1B18] text-xs font-semibold uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#E5A93C]" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => {
                      trackEvent('product_gallery_interaction', { productId: product.id });
                      onQuickView(product);
                    }}
                    className="p-2.5 rounded-full bg-white border border-[#E5DDCF] text-[#1E1B18] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
                    title="Quick View"
                    aria-label={`Quick view ${product.name}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
