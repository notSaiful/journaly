import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Lock, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRouter } from '../utils/router';
import { trackEvent } from '../utils/analytics';
import { openRazorpayCheckout } from '../utils/razorpay';
import { UPSELLS } from '../data/products';
import { saveOrder } from '../utils/supabase';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onAddUpsell,
  onProceedToCheckout
}) {
  const { navigate } = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // Minimal Shipping Information
  const [shippingInfo, setShippingInfo] = useState({
    fullName: 'Mohammad Saiful',
    phone: '+91 98765 43210',
    email: 'saiful@example.com',
    address: 'Flat 402, Green Glen Layout, Bellandur',
    city: 'Bengaluru',
    postalCode: '560103',
    state: 'Karnataka'
  });

  if (!isOpen) return null;

  // Price calculations (Conversion rate: 1 USD = 83 INR)
  const USD_TO_INR = 83;
  const subtotalUsd = cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const totalInr = Math.round(subtotalUsd * USD_TO_INR);
  const totalItemCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  // Direct Pay with Razorpay Gateway
  const handlePayWithRazorpay = async (e) => {
    if (e) e.preventDefault();

    if (cartItems.length === 0) return;

    setIsProcessing(true);
    setPaymentError(null);

    const chargeAmount = totalInr;

    trackEvent('begin_checkout', {
      items_count: totalItemCount,
      value: chargeAmount,
      currency: 'INR'
    });

    const success = await openRazorpayCheckout({
      amount: chargeAmount,
      currency: 'INR',
      name: 'JOURNALY',
      description: `Order of ${totalItemCount} Habit Journal${totalItemCount > 1 ? 's' : ''}`,
      prefill: {
        name: shippingInfo.fullName,
        email: shippingInfo.email,
        contact: shippingInfo.phone.replace(/[^0-9+]/g, '')
      },
      notes: {
        shipping_address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.state}`,
        item_count: totalItemCount
      },
      onSuccess: async (paymentData) => {
        setIsProcessing(false);
        const orderId = paymentData.orderId || `JRN-${Math.floor(100000 + Math.random() * 900000)}`;

        if (typeof window !== 'undefined') {
          sessionStorage.setItem('last_order_id', orderId);
          sessionStorage.setItem('last_payment_id', paymentData.paymentId || 'pay_live_verified');
          sessionStorage.setItem('last_order_amount', chargeAmount.toString());
          sessionStorage.setItem('last_order_currency', 'INR');
        }

        // Persist order to Supabase and LocalStorage for Admin Portal
        try {
          await saveOrder({
            id: orderId,
            customer_name: shippingInfo.fullName,
            customer_email: shippingInfo.email,
            customer_phone: shippingInfo.phone,
            shipping_address: shippingInfo.address,
            city: shippingInfo.city,
            postal_code: shippingInfo.postalCode,
            items: cartItems.map((it) => ({
              name: it.name,
              quantity: it.quantity || 1,
              price: Math.round((it.price || 36) * USD_TO_INR)
            })),
            amount: chargeAmount,
            currency: 'INR',
            payment_id: paymentData.paymentId || 'pay_live_verified',
            payment_status: 'PAID',
            fulfillment_status: 'Processing',
            courier: '',
            tracking_number: ''
          });
        } catch (saveErr) {
          console.warn('Failed to save order to Supabase:', saveErr);
        }

        // Trigger celebratory confetti
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E5A93C', '#2B2520', '#345941', '#FAF7F2']
        });

        // Close cart overlay and route to Thank You page
        onClose();
        navigate('/order-success');
      },
      onError: (err) => {
        setIsProcessing(false);
        const errorMsg = err?.description || err?.message || 'Payment could not be completed. Please try again.';
        setPaymentError(errorMsg);
      },
      onDismiss: () => {
        setIsProcessing(false);
      }
    });

    if (!success) {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FAF7F2] text-[#1E1B18] font-sans animate-fade-in flex flex-col min-h-screen">
      
      {/* Top Bar Covering Full Width */}
      <header className="sticky top-0 z-10 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DDCF] px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-6 bg-[#E5A93C] rounded-xs shadow-xs" />
          <span className="font-serif text-xl sm:text-2xl tracking-[0.18em] font-medium text-[#1E1B18]">
            JOURNALY
          </span>
          <span className="text-stone-300 mx-1 hidden sm:inline">•</span>
          <span className="text-xs uppercase tracking-widest text-[#6A6054] font-mono hidden sm:inline">
            Shopping Bag ({totalItemCount})
          </span>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5DDCF] bg-white hover:bg-[#F4EFE6] text-xs uppercase tracking-wider font-medium text-[#1E1B18] transition-all cursor-pointer shadow-xs active:scale-95"
          aria-label="Continue Shopping"
        >
          <span>Continue Browsing</span>
          <X className="w-4 h-4 text-[#6A6054]" />
        </button>
      </header>

      {/* Main Full-Page Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {cartItems.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#EFE8DD] text-[#8C7E72] flex items-center justify-center mb-5">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-medium text-[#1E1B18] mb-2">
              Your bag is currently empty.
            </h2>
            <p className="text-sm text-[#6A6054] font-light mb-8">
              Start your daily practice with one of our guided habit editions.
            </p>
            <button
              onClick={() => {
                onClose();
                navigate('/shop');
              }}
              className="px-8 py-3.5 rounded-full bg-[#1E1B18] hover:bg-[#332C26] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DDCF]">
                <h1 className="text-xl sm:text-2xl font-medium text-[#1E1B18]">
                  Your Selection
                </h1>
                <span className="text-xs font-mono text-[#6A6054]">
                  {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.customId || item.id}
                    className="p-5 rounded-2xl bg-white border border-[#E5DDCF] shadow-xs flex gap-5 items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.customImage || item.image}
                        alt={item.name}
                        className="w-20 h-24 object-cover rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] flex-shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5A93C] font-semibold block mb-0.5">
                          Guided Habit Edition
                        </span>
                        <h3 className="font-medium text-base text-[#1E1B18] leading-snug">
                          {item.name}
                        </h3>
                        <p className="text-sm font-semibold text-[#1E1B18] mt-2">
                          ₹{Math.round((item.price || 36) * USD_TO_INR).toLocaleString('en-IN')}
                          <span className="text-xs text-[#8C7E72] font-normal ml-1">
                            (${item.price || 36})
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Quantity Adjustment & Remove */}
                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      <button
                        onClick={() => onRemoveItem(item.customId)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2 border border-[#E5DDCF] rounded-full px-2.5 py-1 bg-[#FAF7F2]">
                        <button
                          onClick={() => onUpdateQuantity(item.customId, (item.quantity || 1) - 1)}
                          className="p-1 text-[#6A6054] hover:text-[#1E1B18] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-semibold px-1">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.customId, (item.quantity || 1) + 1)}
                          className="p-1 text-[#6A6054] hover:text-[#1E1B18] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Free Express Shipping Notice */}
              <div className="p-4 rounded-xl bg-[#F4EFE6] border border-[#E5DDCF] flex items-center justify-between text-xs text-[#6A6054]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#345941]" />
                  <span>Complimentary Insured Express Delivery across India & Global</span>
                </div>
                <span className="font-mono text-[#345941] font-semibold">FREE</span>
              </div>

            </div>

            {/* Right Column: Minimal Checkout & Direct Razorpay Payment */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DDCF] shadow-md sticky top-24">
                
                <div className="border-b border-[#E5DDCF] pb-4 mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E5A93C] font-semibold block mb-1">
                    Instant Secure Checkout
                  </span>
                  <h2 className="text-xl font-medium text-[#1E1B18]">
                    Shipping & Payment
                  </h2>
                </div>

                {/* Minimal Delivery Inputs */}
                <form onSubmit={handlePayWithRazorpay} className="space-y-4 mb-6">
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#6A6054] block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={shippingInfo.fullName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs text-[#1E1B18] focus:outline-none focus:border-[#E5A93C]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#6A6054] block mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        placeholder="+91..."
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs text-[#1E1B18] focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#6A6054] block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={shippingInfo.email}
                        onChange={handleInputChange}
                        placeholder="you@email.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs text-[#1E1B18] focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#6A6054] block mb-1">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      placeholder="House/Street/Flat No."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs text-[#1E1B18] focus:outline-none focus:border-[#E5A93C]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#6A6054] block mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs text-[#1E1B18] focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#6A6054] block mb-1">
                        PIN / Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={shippingInfo.postalCode}
                        onChange={handleInputChange}
                        placeholder="560103"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs text-[#1E1B18] focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>
                  </div>

                  {/* Summary Breakdown */}
                  <div className="pt-4 border-t border-[#E5DDCF] space-y-2 text-xs text-[#6A6054]">
                    <div className="flex justify-between">
                      <span>Subtotal ({totalItemCount} items)</span>
                      <span>₹{totalInr.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Express Atelier Shipping</span>
                      <span className="text-[#345941] font-semibold">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-[#1E1B18] pt-2 border-t border-[#E5DDCF]">
                      <span>Total Amount</span>
                      <span>₹{totalInr.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Payment Error message */}
                  {paymentError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                      {paymentError}
                    </div>
                  )}

                  {/* No Cash On Delivery Notice */}
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DDCF] text-[11px] text-[#6A6054] flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-[#E5A93C]" />
                    <span>No cash on delivery. 100% online payment via Razorpay.</span>
                  </div>

                  {/* Single Direct Razorpay Payment Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 rounded-full bg-[#1E1B18] hover:bg-[#332C26] text-[#FAF7F2] text-xs font-semibold uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#E5A93C]" />
                        <span>Opening Razorpay Gateway...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5 text-[#E5A93C]" />
                        <span>Pay ₹{totalInr.toLocaleString('en-IN')} via Razorpay</span>
                      </>
                    )}
                  </button>

                  {/* Razorpay Trust Seal */}
                  <div className="pt-3 text-center">
                    <p className="text-[10px] text-[#8C7E72] font-mono">
                      UPI • Google Pay • PhonePe • Credit/Debit Cards • NetBanking
                    </p>
                    <p className="text-[10px] text-emerald-800 font-mono mt-1 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Razorpay 256-bit Bank Grade Security
                    </p>
                  </div>

                </form>

              </div>
            </div>

          </div>
        )}
      </main>

    </div>
  );
}
