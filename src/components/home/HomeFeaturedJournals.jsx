import React from 'react';
import { ArrowRight, ShoppingBag, Eye, Star } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useRouter } from '../../utils/router';
import { trackEvent } from '../../utils/analytics';

export default function HomeFeaturedJournals({ onAddToCart, onQuickView }) {
  const { navigate } = useRouter();

  // Curate 3 flagship journals first
  const featured = [
    PRODUCTS[0], // 5 Minutes Gratitude Journal
    PRODUCTS[3], // The Architect's Dot-Grid
    PRODUCTS[4]  // The Wabi-Sabi Raw Linen Journal
  ];

  const descriptors = [
    { label: 'Gratitude', desc: 'For noticing what was already good.' },
    { label: 'Everyday', desc: 'For the in-between moments.' },
    { label: 'College', desc: 'For the years everyone says go too fast.' },
    { label: 'Travel', desc: 'For everything the photos leave out.' },
    { label: 'Relationships', desc: 'For the stories only you two know.' },
    { label: 'New Beginnings', desc: 'For the version of you that’s just getting started.' }
  ];

  const handleProductClick = (product) => {
    trackEvent('view_product', { productId: product.id, name: product.name });
    navigate(`/product/${product.id}`);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#FAF7F2] border-b border-[#E5DDCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-3">
              The Flagships
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#1E1B18] tracking-tight leading-tight">
              DESIGNS FOR <br />
              <span className="text-[#6A6054] font-normal">EVERY CHAPTER.</span>
            </h2>
            <p className="mt-3 text-base text-[#6A6054] font-light max-w-md">
              Same ritual. Different story.
            </p>
          </div>

          <button
            onClick={() => {
              trackEvent('collection_view', { source: 'featured_header' });
              navigate('/shop');
            }}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1E1B18] hover:text-[#E5A93C] transition-colors pb-1 border-b border-[#1E1B18] self-start md:self-end cursor-pointer group"
          >
            <span>Explore All Journals</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Featured Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#E5DDCF] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Product Image Frame */}
              <div
                onClick={() => handleProductClick(product)}
                className="relative aspect-[4/5] bg-[#F4EFE6] overflow-hidden cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-[#FAF7F2]/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-[#1E1B18] border border-[#E5DDCF] shadow-xs">
                  {product.badge}
                </div>

                {/* Price Pill */}
                <div className="absolute bottom-4 right-4 bg-[#1E1B18]/90 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-mono font-medium text-[#FAF7F2] shadow-sm">
                  ${product.price}
                </div>
              </div>

              {/* Product Info & Action */}
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
                    onClick={() => handleProductClick(product)}
                    className="font-serif text-xl sm:text-2xl font-medium text-[#1E1B18] group-hover:text-[#E5A93C] transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6A6054] font-light mt-1.5 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-5 mt-4 border-t border-[#E5DDCF]/80">
                  <button
                    onClick={() => {
                      trackEvent('add_to_cart', { productId: product.id, price: product.price });
                      onAddToCart({
                        ...product,
                        customId: `${product.id}-flagship`,
                        quantity: 1,
                        price: product.price,
                        selectedColor: product.colors[0].name
                      });
                    }}
                    className="flex-1 py-2.5 px-4 bg-[#1E1B18] hover:bg-[#332C26] text-[#FAF7F2] text-xs font-medium uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95"
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

        {/* Curated Chapter Descriptors Strip */}
        <div className="mt-16 pt-12 border-t border-[#E5DDCF] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {descriptors.map((item) => (
            <div key={item.label} className="text-left">
              <span className="text-xs font-serif font-medium text-[#1E1B18] block">
                {item.label}
              </span>
              <p className="text-[11px] text-[#6A6054] font-light mt-1 leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
