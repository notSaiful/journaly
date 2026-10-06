import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, ShieldCheck, Truck, Sparkles, ArrowLeft, ChevronDown, CheckCircle2, Award, Heart } from 'lucide-react';
import { PRODUCTS, FAQS_FOR_PRODUCTS, REVIEWS } from '../data/products';
import { useRouter } from '../utils/router';
import { trackEvent } from '../utils/analytics';

export default function ProductDetailPage({ onAddToCart }) {
  const { params, navigate } = useRouter();
  
  // Find product by id or slug, or fallback to first product
  const product = PRODUCTS.find((p) => p.id === params.productId || p.slug === params.productId) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    setOpenFaqIndex(0);
  }, [product.id]);

  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const activeImage = galleryImages[activeImageIndex] || product.image;

  // Filter reviews relevant to this product or show all curated reviews
  const productReviews = REVIEWS;

  const handleAdd = () => {
    trackEvent('add_to_cart', {
      productId: product.id,
      quantity,
      price: product.price
    });

    onAddToCart({
      ...product,
      customId: `${product.id}-direct`,
      quantity,
      price: product.price
    });
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18] font-sans min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigate('/shop')}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#6A6054] hover:text-[#1E1B18] mb-8 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </button>

        {/* ABOVE THE FOLD: Gallery & Purchase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Gallery Column (7 Cols on Desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto no-scrollbar sm:max-h-[560px]">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImageIndex(idx);
                    trackEvent('product_gallery_interaction', { imageIndex: idx });
                  }}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#E5A93C] shadow-md ring-1 ring-[#E5A93C]' : 'border-[#E5DDCF] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 rounded-3xl overflow-hidden border border-[#E5DDCF] bg-white shadow-xl relative aspect-[4/5] max-h-[620px]">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 left-4 bg-[#FAF7F2]/95 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-[#1E1B18] border border-[#E5DDCF] shadow-xs">
                {product.badge}
              </div>
            </div>

          </div>

          {/* Buy Box Column (5 Cols on Desktop) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#8C7E72] mb-1.5 uppercase tracking-widest">
                <span>{product.category}</span>
                <span>•</span>
                <span className="text-emerald-700 font-medium">In Stock ({product.stockLeft} left)</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#1E1B18] leading-tight">
                {product.name}
              </h1>

              <p className="text-sm sm:text-base text-[#8C6D46] mt-2 font-normal italic">
                "{product.tagline}"
              </p>

              <p className="text-xs sm:text-sm text-[#6A6054] font-light mt-2 leading-relaxed">
                {product.subtitle}
              </p>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center justify-between py-4 border-y border-[#E5DDCF]/80">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-medium text-[#1E1B18]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono text-stone-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs font-mono text-[#8C7E72]">
                  (approx. ₹{Math.round(product.price * 83).toLocaleString('en-IN')})
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <div className="flex text-[#E5A93C]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-medium text-[#1E1B18]">{product.rating}</span>
                <span className="text-[#8C7E72]">({product.reviewCount})</span>
              </div>
            </div>

            {/* INTELLIGENTLAB RESEARCH HIGHLIGHT (KEY VALUE PROP) */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#F4EFE6] to-[#FAF7F2] border border-[#E5DDCF] shadow-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#E5A93C]/15 text-[#1E1B18] flex-shrink-0 mt-0.5">
                  <Award className="w-5 h-5 text-[#8C6D46]" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#1E1B18] text-[#FAF7F2] font-semibold">
                      Research Partner: IntelligentLab
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-[#1E1B18]">
                    9/10 people build a lasting habit of journaling using this format.
                  </h4>
                  <p className="text-xs text-[#6A6054] font-light leading-relaxed">
                    The questions inside are researched questions provided by IntelligentLab to help you effortlessly build daily habits and reflect on your real life without blank-page intimidation.
                  </p>
                </div>
              </div>
            </div>

            {/* Product Key Points */}
            <div className="space-y-2 text-xs text-[#4A4138]">
              {product.features?.slice(0, 4).map((f, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#345941] flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            {/* Quantity & Add to Bag */}
            <div className="flex items-center gap-3 pt-3">
              <div className="flex items-center border border-[#E5DDCF] rounded-full bg-white px-3 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-stone-400 hover:text-[#1E1B18] px-2 text-sm cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="text-xs font-mono font-medium px-2 text-[#1E1B18]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-stone-400 hover:text-[#1E1B18] px-2 text-sm cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 px-6 rounded-full bg-[#1E1B18] hover:bg-[#332C26] text-[#FAF7F2] text-xs font-semibold uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#E5A93C]" />
                <span>Add to Bag — ${product.price * quantity}</span>
              </button>
            </div>

            {/* Reassurance Badges */}
            <div className="pt-4 border-t border-[#E5DDCF]/80 grid grid-cols-2 gap-3 text-[11px] text-[#6A6054]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-800 flex-shrink-0" />
                <span>60-Day Empty Book Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-800 flex-shrink-0" />
                <span>Dispatched within 24h</span>
              </div>
            </div>

          </div>

        </div>

        {/* PDP HABIT RITUAL & PHILOSOPHY */}
        <section className="py-16 border-t border-[#E5DDCF]">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-3">
              The Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1E1B18] leading-tight">
              NOT ANOTHER BLANK NOTEBOOK.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#6A6054] font-light leading-relaxed max-w-2xl mx-auto">
              The page already knows how to begin. IntelligentLab researched questions help you pause, notice what mattered, and record your real life in five unhurried minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E5DDCF] shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5A93C] block mb-2 font-semibold">Morning (3 Mins)</span>
              <h3 className="font-serif text-xl font-medium text-[#1E1B18] mb-2">Start with what is already good.</h3>
              <p className="text-xs text-[#6A6054] font-light leading-relaxed">
                Notice three small things. Choose one intention. Quiet morning noise before the world rushes in.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5DDCF] shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5A93C] block mb-2 font-semibold">Evening (2 Mins)</span>
              <h3 className="font-serif text-xl font-medium text-[#1E1B18] mb-2">End by keeping what was real.</h3>
              <p className="text-xs text-[#6A6054] font-light leading-relaxed">
                A quiet win. A moment worth remembering. Something to look forward to tomorrow.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5DDCF] shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5A93C] block mb-2 font-semibold">The Habit</span>
              <h3 className="font-serif text-xl font-medium text-[#1E1B18] mb-2">9 out of 10 sustain it.</h3>
              <p className="text-xs text-[#6A6054] font-light leading-relaxed">
                Unlike blank pages that induce fatigue, structured questions remove friction and turn journaling into a natural ritual.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5DDCF] shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5A93C] block mb-2 font-semibold">Your Keepsake</span>
              <h3 className="font-serif text-xl font-medium text-[#1E1B18] mb-2">Record your real life.</h3>
              <p className="text-xs text-[#6A6054] font-light leading-relaxed">
                Photos capture how things looked; your journal captures how things felt. A tangible record of your days.
              </p>
            </div>
          </div>
        </section>

        {/* SPECIFICATIONS */}
        {product.specs && (
          <section className="py-16 border-t border-[#E5DDCF]">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-2">
                  Mindful Details
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E1B18]">
                  BUILT FOR EVERYDAY LIFE.
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-8 rounded-3xl border border-[#E5DDCF] shadow-md">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5DDCF]/60 flex items-start justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#8C7E72] capitalize">
                      {k}
                    </span>
                    <span className="text-xs font-medium text-[#1E1B18] text-right ml-4">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CUSTOMER REVIEWS SECTION */}
        <section className="py-16 border-t border-[#E5DDCF]">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-2">
                  Real Experiences
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E1B18]">
                  Loved by Daily Journalers
                </h2>
                <p className="text-xs sm:text-sm text-[#6A6054] mt-1">
                  Over {product.reviewCount?.toLocaleString() || '1,400'} verified journalers building habits that stick.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-[#E5DDCF] shadow-xs">
                <div className="flex text-[#E5A93C]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-serif text-xl font-bold text-[#1E1B18]">{product.rating}</span>
                <span className="text-xs text-[#8C7E72]">/ 5.0 overall rating</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {productReviews.map((rev) => (
                <div key={rev.id} className="p-6 rounded-2xl bg-white border border-[#E5DDCF] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex text-[#E5A93C]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-[#8C7E72]">{rev.date}</span>
                    </div>

                    <h4 className="font-medium text-sm text-[#1E1B18] mb-2 leading-snug">
                      "{rev.title}"
                    </h4>

                    <p className="text-xs text-[#6A6054] font-light leading-relaxed mb-4">
                      {rev.content}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5DDCF]/70 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-[#1E1B18]">{rev.author}</p>
                      <p className="text-[10px] text-[#8C7E72]">{rev.role}</p>
                    </div>
                    {rev.verified && (
                      <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
        <section className="py-16 border-t border-[#E5DDCF]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-2">
                Clarity & Confidence
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E1B18]">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-[#6A6054] mt-2">
                Everything you need to know about the format, IntelligentLab questions, and delivery.
              </p>
            </div>

            <div className="space-y-3">
              {FAQS_FOR_PRODUCTS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-[#E5DDCF] bg-white overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F2] transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="font-serif text-base font-medium text-[#1E1B18]">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#8C7E72] transition-transform duration-300 flex-shrink-0 ${
                          isOpen ? 'rotate-180 text-[#1E1B18]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#6A6054] font-light leading-relaxed border-t border-[#E5DDCF]/40 bg-[#FAF7F2]/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
