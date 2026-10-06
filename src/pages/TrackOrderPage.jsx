import React, { useState } from 'react';
import { Search, Package, CheckCircle2, Truck, Clock, ArrowRight } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export default function TrackOrderPage() {
  const [query, setQuery] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  const pipeline = [
    { key: 'confirmed', title: 'ORDER CONFIRMED', desc: 'We’ve got it.' },
    { key: 'packed', title: 'PACKED', desc: 'Your journal is getting ready in our bindery.' },
    { key: 'shipped', title: 'SHIPPED', desc: 'It’s on the move via express courier.' },
    { key: 'out', title: 'OUT FOR DELIVERY', desc: 'Almost there. Expected today.' },
    { key: 'delivered', title: 'DELIVERED', desc: 'Time for page one.' }
  ];

  const handleTrack = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    trackEvent('track_order', { query });

    // Deterministic simulation based on query length for realistic demonstration
    setTrackingResult({
      orderId: query.startsWith('#') ? query : `#JRN-${query.slice(0, 5).toUpperCase() || '84920'}`,
      courier: 'BlueDart Air Express / DHL International',
      currentStage: 2, // Shipped
      estimatedDelivery: '2 business days',
      destination: 'Verified Shipping Address'
    });
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18] font-sans min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-3">
            Courier Status & Dispatch
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#1E1B18] tracking-tight leading-tight">
            YOUR JOURNAL <br />
            <span className="text-[#6A6054] font-normal">IS ON ITS WAY.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#6A6054] font-light">
            Good things take a little time.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E5DDCF] shadow-lg mb-12">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. #JRN-8492) or Email"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-sm focus:outline-none focus:border-[#E5A93C]"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 rounded-full bg-[#1E1B18] hover:bg-[#332C26] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Track Order</span>
              <ArrowRight className="w-4 h-4 text-[#E5A93C]" />
            </button>
          </form>
        </div>

        {/* Live Timeline Display */}
        {trackingResult && (
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E5DDCF] shadow-xl animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5DDCF] pb-6 mb-8 gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5A93C] font-semibold block mb-1">
                  Tracking Active
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#1E1B18]">
                  Order {trackingResult.orderId}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-[#6A6054] block">Carrier: {trackingResult.courier}</span>
                <span className="text-xs font-semibold text-emerald-800 block mt-0.5">
                  Estimated Arrival: {trackingResult.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* 5-Step Pipeline */}
            <div className="space-y-6">
              {pipeline.map((step, idx) => {
                const isPassed = idx <= trackingResult.currentStage;
                const isCurrent = idx === trackingResult.currentStage;
                return (
                  <div key={step.key} className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isPassed ? 'bg-[#E5A93C] text-[#141312]' : 'bg-stone-100 text-stone-400'
                    }`}>
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className={`text-xs font-mono font-bold tracking-wider ${
                        isCurrent ? 'text-[#E5A93C]' : isPassed ? 'text-[#1E1B18]' : 'text-stone-400'
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#6A6054] mt-0.5 font-light">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
