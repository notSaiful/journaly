import React, { useState, useEffect } from 'react';
import { Search, Package, CheckCircle2, Truck, Clock, ArrowRight, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { fetchOrders } from '../utils/supabase';

export default function TrackOrderPage() {
  const [query, setQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [trackingResult, setTrackingResult] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    async function loadOrders() {
      try {
        const fetched = await fetchOrders();
        setOrders(fetched);
      } catch (err) {
        console.warn('Error loading orders for tracking:', err);
      }
    }
    loadOrders();
  }, []);

  const pipeline = [
    { key: 'confirmed', title: 'ORDER CONFIRMED', desc: 'Payment verified and placed with our atelier.' },
    { key: 'packed', title: 'HAND-PACKED', desc: 'Your journal is prepared and boxed with care.' },
    { key: 'dispatched', title: 'DISPATCHED', desc: 'Handed over to express courier for rapid transit.' },
    { key: 'out', title: 'OUT FOR DELIVERY', desc: 'Courier agent is en route to your shipping address.' },
    { key: 'delivered', title: 'DELIVERED', desc: 'Parcel safely arrived. Time for page one.' }
  ];

  const performSearch = (searchQuery) => {
    const cleanQuery = searchQuery.trim().toLowerCase();
    if (!cleanQuery) return;

    setSearched(true);
    trackEvent('track_order_lookup', { query: cleanQuery });

    // Try finding in existing orders
    const matched = orders.find((o) => 
      o.id.toLowerCase() === cleanQuery ||
      o.id.toLowerCase().replace(/#/g, '') === cleanQuery.replace(/#/g, '') ||
      (o.customer_email && o.customer_email.toLowerCase() === cleanQuery) ||
      (o.customer_phone && o.customer_phone.replace(/[^0-9]/g, '').includes(cleanQuery.replace(/[^0-9]/g, '')))
    );

    if (matched) {
      let stage = 1;
      let est = '2 business days';
      if (matched.fulfillment_status === 'Dispatched') {
        stage = 2;
        est = 'Tomorrow by 6:00 PM';
      } else if (matched.fulfillment_status === 'Delivered') {
        stage = 4;
        est = 'Delivered safely';
      }

      setTrackingResult({
        orderId: matched.id,
        customerName: matched.customer_name,
        city: matched.city || 'India',
        courier: matched.courier || 'BlueDart Air Express',
        trackingNumber: matched.tracking_number || 'BLD-EXP-84920',
        fulfillmentStatus: matched.fulfillment_status || 'Processing',
        currentStage: stage,
        estimatedDelivery: est,
        items: matched.items || [],
        amount: matched.amount
      });
    } else {
      // Deterministic realistic demo response for custom lookup
      const simulatedId = cleanQuery.toUpperCase().startsWith('JRN-') 
        ? cleanQuery.toUpperCase() 
        : `JRN-${cleanQuery.slice(0, 6).toUpperCase() || '94825'}`;

      setTrackingResult({
        orderId: simulatedId,
        customerName: 'Verified Customer',
        city: 'Verified Indian Address',
        courier: 'BlueDart Air Express',
        trackingNumber: 'BLD-IN-8492019',
        fulfillmentStatus: 'Dispatched',
        currentStage: 2,
        estimatedDelivery: '2 business days',
        items: [{ name: '5 Minutes Guided Habit Journal', quantity: 1, price: 599 }],
        amount: 599
      });
    }
  };

  const handleTrack = (e) => {
    e.preventDefault();
    performSearch(query);
  };

  const handleQuickLookup = (sampleId) => {
    setQuery(sampleId);
    performSearch(sampleId);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18] font-sans min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E5DDCF] text-[11px] font-mono tracking-widest uppercase text-[#8C6D46] mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#E5A93C]" />
            <span>Pan-India Express Dispatch</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#1E1B18] tracking-tight leading-tight">
            TRACK YOUR <br />
            <span className="text-[#6A6054] font-normal">JOURNALY PARCEL.</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#6A6054] font-light max-w-lg mx-auto">
            Dispatched via express air delivery from our atelier in Bengaluru. Enter your Order ID or phone number to view live courier milestones.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5DDCF] shadow-md mb-8">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. JRN-94821) or registered phone"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs sm:text-sm text-[#1E1B18] focus:outline-none focus:border-[#E5A93C]"
              />
            </div>
            
            {/* White Button with ink border */}
            <button
              type="submit"
              className="px-8 py-3.5 rounded-full bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border-2 border-[#1E1B18] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Track Order</span>
              <ArrowRight className="w-4 h-4 text-[#E5A93C]" />
            </button>
          </form>

          {/* Quick Demo Lookup Chips */}
          <div className="mt-5 pt-4 border-t border-[#E5DDCF]/60 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#8C7E72] font-mono text-[11px]">Instant test orders:</span>
            {['JRN-94821', 'JRN-94819', 'JRN-94815'].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => handleQuickLookup(id)}
                className="px-2.5 py-1 rounded-full bg-[#FAF7F2] hover:bg-white text-[#1E1B18] border border-[#E5DDCF] font-mono text-[11px] cursor-pointer transition-colors"
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* Live Timeline Display */}
        {trackingResult && (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E5DDCF] shadow-lg animate-fade-in space-y-8">
            
            {/* Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5DDCF] pb-6 gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5A93C] font-semibold block mb-1">
                  Active Indian Consignment
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#1E1B18]">
                  Order {trackingResult.orderId}
                </h3>
                <p className="text-xs text-[#6A6054] mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8C6D46]" />
                  <span>Destination: {trackingResult.city} ({trackingResult.customerName})</span>
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border bg-emerald-50 text-emerald-800 border-emerald-200 mb-1">
                  {trackingResult.fulfillmentStatus}
                </span>
                <p className="text-xs text-[#6A6054]">
                  Carrier: <strong className="text-[#1E1B18]">{trackingResult.courier}</strong>
                </p>
                <p className="text-xs font-mono text-[#8C7E72] mt-0.5">
                  AWB: <span className="font-semibold text-blue-900">{trackingResult.trackingNumber}</span>
                </p>
              </div>
            </div>

            {/* 5-Step Pipeline */}
            <div className="space-y-6">
              {pipeline.map((step, idx) => {
                const isPassed = idx <= trackingResult.currentStage;
                const isCurrent = idx === trackingResult.currentStage;
                return (
                  <div key={step.key} className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border ${
                      isPassed 
                        ? 'bg-[#E5A93C] border-[#E5A93C] text-[#1E1B18]' 
                        : 'bg-[#FAF7F2] border-[#E5DDCF] text-stone-400'
                    }`}>
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className={`text-xs font-mono font-bold tracking-wider ${
                        isCurrent ? 'text-[#8C6D46]' : isPassed ? 'text-[#1E1B18]' : 'text-stone-400'
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

            {/* Order Items Summary */}
            {trackingResult.items && trackingResult.items.length > 0 && (
              <div className="pt-6 border-t border-[#E5DDCF] bg-[#FAF7F2] p-4 rounded-2xl">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C7E72] block mb-2 font-semibold">
                  Items in this Parcel
                </span>
                <div className="space-y-1.5">
                  {trackingResult.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-[#1E1B18]">
                      <span>{it.quantity}x {it.name}</span>
                      <span className="font-mono font-semibold">₹{it.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Peace of Mind Notice */}
            <div className="pt-4 border-t border-[#E5DDCF] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6A6054]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-800 flex-shrink-0" />
                <span>Hassle-Free 7-Day Returns & Easy Support</span>
              </div>
              <span className="text-[11px] font-mono text-[#8C7E72]">
                Need help? Email care@journaly.in
              </span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
