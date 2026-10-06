import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useRouter } from '../utils/router';
import { trackEvent } from '../utils/analytics';

export default function Footer({ onOpenLegal }) {
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      trackEvent('newsletter_signup', { email });
      setSubscribed(true);
    }
  };

  const handleLink = (path, policyId = null) => {
    if (policyId && onOpenLegal) {
      onOpenLegal(policyId);
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="bg-[#F4EFE6] text-[#1E1B18] border-t border-[#E5DDCF] pt-16 pb-12 font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Strip: One Thoughtful Question */}
        <div className="pb-14 border-b border-[#E5DDCF] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block">
              Sunday Reflection
            </span>
            <h3 className="text-2xl sm:text-3xl font-normal text-[#1E1B18]">
              ONE THOUGHTFUL QUESTION. <br />
              <span className="italic text-[#6A6054]">ONCE A WEEK.</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#6A6054] font-light max-w-md">
              A small reason to slow down, delivered to your inbox every Sunday morning.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="flex items-center gap-2.5 text-xs text-[#1E1B18] font-medium bg-[#FAF7F2] p-4 rounded-full border border-[#E5DDCF]">
                <Check className="w-4 h-4 text-[#E5A93C]" />
                <span>The first prompt will arrive this Sunday. Welcome to Journaly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md ml-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3.5 rounded-full bg-white text-xs border border-[#E5DDCF] text-[#1E1B18] placeholder-[#8C7E72] focus:outline-none focus:border-[#E5A93C]"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-white hover:bg-[#FAF7F2] text-[#1E1B18] border-2 border-[#1E1B18] rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Send Me the Prompt</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Brand Statement + Clean Columns */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-xs">
          
          {/* Brand Identity & Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-6 bg-[#E5A93C] rounded-xs" />
              <span className="text-2xl font-semibold tracking-[0.2em] text-[#1E1B18]">
                JOURNALY
              </span>
            </div>

            <p className="text-xl sm:text-2xl text-[#6A6054] font-light italic leading-snug">
              YOUR LIFE IS WORTH REMEMBERING.
            </p>

            <p className="text-[#6A6054] max-w-sm leading-relaxed font-light text-xs">
              IntelligentLab researched prompt journals engineered to help you build lasting daily habits and record your real life in 5 minutes.
            </p>

            <div className="pt-2 text-[11px] text-[#8C7E72] font-mono space-y-1">
              <p>Journaly Atelier • Bengaluru, India</p>
              <p>Concierge: care@journaly.in</p>
            </div>
          </div>

          {/* Column 1: SHOP (Personalise & Gifts removed) */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#1E1B18] font-semibold mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-[#6A6054]">
              <li>
                <button onClick={() => handleLink('/five-minute-habit')} className="hover:text-[#1E1B18] transition-colors cursor-pointer text-left">
                  The Five-Minute Habit
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/shop')} className="hover:text-[#1E1B18] transition-colors cursor-pointer text-left">
                  All Journals
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/track-order')} className="hover:text-[#1E1B18] transition-colors cursor-pointer text-left">
                  Track Your Order
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: HELP */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#1E1B18] font-semibold mb-4">
              HELP
            </h4>
            <ul className="space-y-2.5 text-[#6A6054]">
              <li>
                <button onClick={() => handleLink('/track-order')} className="hover:text-[#1E1B18] transition-colors cursor-pointer text-left">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/shipping-delivery-policy', 'shipping')} className="hover:text-[#1E1B18] transition-colors cursor-pointer text-left">
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/refund-cancellation-policy', 'refund')} className="hover:text-[#1E1B18] transition-colors cursor-pointer text-left">
                  Hassle-Free Returns
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/faq')} className="hover:text-[#1E1B18] transition-colors cursor-pointer text-left">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/contact')} className="hover:text-[#1E1B18] transition-colors cursor-pointer text-left">
                  Contact Atelier Support
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: ABOUT */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#1E1B18] font-semibold mb-4">
              ABOUT
            </h4>
            <ul className="space-y-2.5 text-[#6A6054]">
              <li>
                <button onClick={() => handleLink('/about')} className="hover:text-[#1E1B18] transition-colors cursor-pointer text-left">
                  The Origin Story
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/business')} className="hover:text-[#1E1B18] transition-colors cursor-pointer text-left">
                  Corporate & Atelier Gifts
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip: Legal & Razorpay Badges */}
        <div className="pt-8 border-t border-[#E5DDCF] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#8C7E72]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© {new Date().getFullYear()} JOURNALY. All rights reserved.</span>
            <button onClick={() => handleLink('/terms-and-conditions', 'terms')} className="hover:text-[#1E1B18] transition-colors cursor-pointer">
              Terms & Conditions
            </button>
            <button onClick={() => handleLink('/privacy-policy', 'privacy')} className="hover:text-[#1E1B18] transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => handleLink('/refund-cancellation-policy', 'refund')} className="hover:text-[#1E1B18] transition-colors cursor-pointer">
              Refund & Cancellation
            </button>
            <button onClick={() => handleLink('/shipping-delivery-policy', 'shipping')} className="hover:text-[#1E1B18] transition-colors cursor-pointer">
              Shipping & Delivery
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-[#6A6054]">Payments secured via Razorpay</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
