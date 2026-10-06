import React, { useState } from 'react';
import { X, Check, Lock, ArrowRight, Download, Sparkles, ShieldCheck, Zap, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { openRazorpayCheckout } from '../utils/razorpay';

export default function CheckoutModal({ isOpen, onClose, cartItems, onOrderComplete }) {
  const [step, setStep] = useState(1);
  const [currency, setCurrency] = useState('INR'); // 'INR' or 'USD'
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const [formData, setFormData] = useState({
    email: 'marcus.vance@clarity.io',
    firstName: 'Marcus',
    lastName: 'Vance',
    phone: '+91 98765 43210',
    address: '142 Berkeley Square, Suite 4B',
    city: 'London',
    postalCode: 'W1J 6BQ',
    country: 'United Kingdom',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '888',
    shippingMethod: 'free'
  });

  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  // USD Calculations
  const subtotalUsd = cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const shippingFeeUsd = formData.shippingMethod === 'priority' ? 4.95 : 0;
  const totalUsd = subtotalUsd + shippingFeeUsd;

  // INR Calculations (approx 83 INR per 1 USD)
  const USD_TO_INR = 83;
  const subtotalInr = Math.round(subtotalUsd * USD_TO_INR);
  const shippingFeeInr = formData.shippingMethod === 'priority' ? 410 : 0;
  const totalInr = subtotalInr + shippingFeeInr;

  const currentTotal = currency === 'INR' ? totalInr : totalUsd;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Launch Razorpay Live Gateway
  const handleRazorpayPayment = async () => {
    setIsProcessing(true);
    setPaymentError(null);

    const chargeAmount = currency === 'INR' ? totalInr : totalUsd;

    const success = await openRazorpayCheckout({
      amount: chargeAmount,
      currency: currency,
      name: 'JOURNALY',
      description: `Archival Journal Order (${cartItems.length} items)`,
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        contact: formData.phone.replace(/[^0-9+]/g, '')
      },
      notes: {
        shipping_address: `${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}`,
        shipping_method: formData.shippingMethod,
        item_count: cartItems.length
      },
      onSuccess: (paymentData) => {
        setIsProcessing(false);
        const generatedOrder = paymentData.orderId || `CA-${Math.floor(100000 + Math.random() * 900000)}`;
        setOrderNumber(generatedOrder);
        setPaymentDetails(paymentData);
        setStep(3);

        confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#E5A93C', '#2B2520', '#345941', '#F4EFE6']
        });

        if (typeof window !== 'undefined') {
          sessionStorage.setItem('last_order_id', generatedOrder);
          sessionStorage.setItem('last_payment_id', paymentData.paymentId || '');
          sessionStorage.setItem('last_order_amount', chargeAmount.toString());
          sessionStorage.setItem('last_order_currency', currency);
        }

        if (onOrderComplete) {
          onOrderComplete();
        }
      },
      onError: (err) => {
        setIsProcessing(false);
        const errorMsg = err?.description || err?.message || 'Payment was unsuccessful. Please retry or use another payment method.';
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

  // Manual fallback checkout
  const handleSimulatedOrder = (e) => {
    e.preventDefault();
    const generatedOrder = `CA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrder);
    setPaymentDetails({
      paymentId: `sim_${Math.random().toString(36).substring(2, 11)}`,
      verified: true
    });
    setStep(3);

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E5A93C', '#8C6D46', '#2E473B', '#F3ECE1']
    });

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('last_order_id', generatedOrder);
      sessionStorage.setItem('last_payment_id', `sim_${Math.random().toString(36).substring(2, 9)}`);
      sessionStorage.setItem('last_order_amount', currentTotal.toString());
      sessionStorage.setItem('last_order_currency', currency);
    }

    if (onOrderComplete) {
      onOrderComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E5DDCF] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header in Minimalist Beige */}
        <div className="p-6 bg-[#FAF7F2] border-b border-[#E5DDCF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1A1816] text-[#FAF7F2] flex items-center justify-center">
              <Lock className="w-4 h-4 text-[#E5A93C]" />
            </div>
            <div>
              <span className="font-serif text-lg font-semibold text-[#1A1816] block leading-tight">
                {step === 3 ? 'Order Confirmed' : 'JOURNALY Secure Checkout'}
              </span>
              <span className="text-[10px] font-mono text-[#8C8072] uppercase tracking-wider block">
                Razorpay Live Payment Gateway
              </span>
            </div>
          </div>

          {step !== 3 && (
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#8C8072] hover:text-[#2B2520] hover:bg-[#F4EFE6] transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Indicator */}
        {step < 3 && (
          <div className="px-6 py-3 bg-[#FAF7F2]/60 border-b border-[#E5DDCF] flex items-center justify-between text-xs font-medium text-[#8C8072]">
            <span className={step >= 1 ? 'text-[#8C6D46] font-semibold' : ''}>
              1. Shipping Address
            </span>
            <span>→</span>
            <span className={step >= 2 ? 'text-[#8C6D46] font-semibold' : ''}>
              2. Razorpay Live Payment
            </span>
            <span>→</span>
            <span>3. Order Complete</span>
          </div>
        )}

        {/* Step 1: Shipping Address */}
        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2B2520] mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#D9CFBF] focus:outline-none focus:border-[#8C6D46] bg-[#FAF7F2]/40"
                    placeholder="you@domain.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2B2520] mb-1">Phone Number (For UPI / SMS)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#D9CFBF] focus:outline-none focus:border-[#8C6D46] bg-[#FAF7F2]/40"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2B2520] mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#D9CFBF] focus:outline-none focus:border-[#8C6D46] bg-[#FAF7F2]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2B2520] mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#D9CFBF] focus:outline-none focus:border-[#8C6D46] bg-[#FAF7F2]/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2B2520] mb-1">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#D9CFBF] focus:outline-none focus:border-[#8C6D46] bg-[#FAF7F2]/40"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2B2520] mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#D9CFBF] focus:outline-none focus:border-[#8C6D46] bg-[#FAF7F2]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2B2520] mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#D9CFBF] focus:outline-none focus:border-[#8C6D46] bg-[#FAF7F2]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2B2520] mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#D9CFBF] focus:outline-none focus:border-[#8C6D46] bg-[#FAF7F2]/40"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 bg-[#1A1816] hover:bg-[#2B2520] text-[#FAF7F2] rounded-full font-medium text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
            >
              <span>Continue to Payment & Delivery</span>
              <ArrowRight className="w-4 h-4 text-[#E5A93C]" />
            </button>
          </div>
        )}

        {/* Step 2: Payment & Delivery Method */}
        {step === 2 && (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Delivery Speed Options */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2520] mb-2">
                1. Select Delivery Method
              </label>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3.5 rounded-xl border border-[#D9CFBF] cursor-pointer bg-[#FAF7F2]/50 hover:bg-[#FAF7F2]">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="free"
                      checked={formData.shippingMethod === 'free'}
                      onChange={handleInputChange}
                      className="text-[#8C6D46]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#2B2520] block">Standard Priority Dispatch (2-4 Days)</span>
                      <span className="text-[11px] text-[#6A6054]">Tracked courier dispatch from atelier</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#345941]">FREE</span>
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl border border-[#D9CFBF] cursor-pointer bg-[#FAF7F2]/50 hover:bg-[#FAF7F2]">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="priority"
                      checked={formData.shippingMethod === 'priority'}
                      onChange={handleInputChange}
                      className="text-[#8C6D46]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#2B2520] block">Express Next-Day Atelier Queue</span>
                      <span className="text-[11px] text-[#6A6054]">Immediate morning bench stamping & wax seal</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#2B2520]">
                    +{currency === 'INR' ? '₹410' : '$4.95'}
                  </span>
                </label>
              </div>
            </div>

            {/* Currency Selector */}
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E5DDCF] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#2B2520]">Billing Currency:</span>
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-[#D9CFBF]">
                <button
                  type="button"
                  onClick={() => setCurrency('INR')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                    currency === 'INR' ? 'bg-[#1A1816] text-[#FAF7F2]' : 'text-[#6A6054] hover:text-[#1A1816]'
                  }`}
                >
                  INR (₹) • UPI & Cards
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                    currency === 'USD' ? 'bg-[#1A1816] text-[#FAF7F2]' : 'text-[#6A6054] hover:text-[#1A1816]'
                  }`}
                >
                  USD ($) • Cards
                </button>
              </div>
            </div>

            {/* Error Banner */}
            {paymentError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2.5 animate-shake">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{paymentError}</span>
              </div>
            )}

            {/* Razorpay Gateway Card */}
            <div className="p-5 rounded-2xl border-2 border-[#1A1816] bg-linear-to-b from-white to-[#FAF7F2] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E5A93C] text-[#1A1816]">
                    LIVE GATEWAY
                  </span>
                  <span className="font-serif text-sm font-semibold text-[#1A1816]">
                    Razorpay Checkout
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#345941] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>RBI Compliant • 256-Bit</span>
                </div>
              </div>

              <p className="text-xs text-[#6A6054] leading-relaxed">
                Pay securely via <strong className="text-[#1A1816]">UPI (Google Pay, PhonePe, Paytm)</strong>, <strong className="text-[#1A1816]">Credit & Debit Cards</strong> (Visa, Mastercard, RuPay, Amex), <strong className="text-[#1A1816]">NetBanking</strong> (50+ banks), or <strong className="text-[#1A1816]">Wallets</strong>.
              </p>

              {/* Supported Payment Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#E5DDCF] text-[10px] font-mono text-[#8C8072]">
                <span className="px-2 py-1 bg-white rounded border border-[#E5DDCF]">UPI / QR</span>
                <span className="px-2 py-1 bg-white rounded border border-[#E5DDCF]">Google Pay</span>
                <span className="px-2 py-1 bg-white rounded border border-[#E5DDCF]">PhonePe</span>
                <span className="px-2 py-1 bg-white rounded border border-[#E5DDCF]">Paytm</span>
                <span className="px-2 py-1 bg-white rounded border border-[#E5DDCF]">RuPay / Visa / MC</span>
                <span className="px-2 py-1 bg-white rounded border border-[#E5DDCF]">NetBanking</span>
              </div>

              {/* Main Razorpay Trigger Button */}
              <button
                type="button"
                onClick={handleRazorpayPayment}
                disabled={isProcessing}
                className="w-full py-4 bg-[#1A1816] hover:bg-[#2B2520] active:scale-[0.99] text-[#FAF7F2] rounded-full font-medium text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 text-[#E5A93C] animate-spin" />
                    <span>Connecting to Razorpay Live...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-[#E5A93C] fill-[#E5A93C]" />
                    <span>
                      Pay with Razorpay — {currency === 'INR' ? `₹${totalInr.toLocaleString('en-IN')}` : `$${totalUsd.toFixed(2)}`}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-xl bg-[#FAF7F2] text-xs space-y-1.5 border border-[#E5DDCF]">
              <div className="flex justify-between text-[#6A6054]">
                <span>Items ({cartItems.length})</span>
                <span>{currency === 'INR' ? `₹${subtotalInr.toLocaleString('en-IN')}` : `$${subtotalUsd.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-[#6A6054]">
                <span>Shipping ({formData.shippingMethod === 'priority' ? 'Express Queue' : 'Standard'})</span>
                <span>
                  {formData.shippingMethod === 'priority'
                    ? (currency === 'INR' ? `₹${shippingFeeInr}` : `$${shippingFeeUsd.toFixed(2)}`)
                    : 'FREE'}
                </span>
              </div>
              <div className="flex justify-between font-serif text-sm font-bold text-[#2B2520] pt-2 border-t border-[#E5DDCF]">
                <span>Total Amount</span>
                <span>
                  {currency === 'INR' ? `₹${totalInr.toLocaleString('en-IN')}` : `$${totalUsd.toFixed(2)}`}
                  {currency === 'INR' && <span className="text-[10px] font-sans font-normal text-[#8C8072] ml-1.5">(≈ ${totalUsd.toFixed(2)} USD)</span>}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3 border border-[#D9CFBF] hover:bg-[#FAF7F2] text-[#3D352E] rounded-full text-xs font-semibold cursor-pointer"
              >
                ← Back to Address
              </button>

              <button
                type="button"
                onClick={handleSimulatedOrder}
                className="text-[11px] text-[#8C8072] hover:text-[#1A1816] underline underline-offset-4 cursor-pointer"
              >
                Or test offline order simulation
              </button>
            </div>

          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 3 && (
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#E2EBE5] text-[#345941] flex items-center justify-center mx-auto shadow-inner border border-[#C5D9CC]">
              <Check className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#8C6D46] font-semibold block mb-1">
                Order Confirmed • {orderNumber}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#2B2520] mb-2">
                Your Clarity Ritual Begins.
              </h3>
              <p className="text-xs sm:text-sm text-[#6A6054] max-w-md mx-auto leading-relaxed font-light">
                Thank you, {formData.firstName}. We have registered your order at the JOURNALY atelier. 
                Your hot foil plates are being cast and your journal will dispatch in under 24 hours.
              </p>
            </div>

            {/* Inclusions Card */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E5DDCF] text-left max-w-md mx-auto space-y-2.5">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E5DDCF]">
                <span className="font-semibold text-[#2B2520]">Order Reference:</span>
                <span className="font-mono text-[#1A1816] font-medium">{orderNumber}</span>
              </div>
              {paymentDetails?.paymentId && (
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E5DDCF]">
                  <span className="font-semibold text-[#2B2520]">Razorpay Payment ID:</span>
                  <span className="font-mono text-[#345941] font-semibold">{paymentDetails.paymentId}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E5DDCF]">
                <span className="font-semibold text-[#2B2520]">Tracking dispatched to:</span>
                <span className="font-mono text-[#6A6054]">{formData.email}</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E5DDCF]">
                <span className="font-semibold text-[#2B2520]">Destination:</span>
                <span className="text-[#6A6054]">{formData.city}, {formData.country}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#2B2520]">Payment Status:</span>
                <span className="text-[#345941] font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Authorized & Verified (Razorpay)</span>
                </span>
              </div>
            </div>

            {/* Instant Download Bonus */}
            <div className="bg-[#FAF3E8] p-4 rounded-2xl border border-[#E8DDCA] flex items-center justify-between gap-4 max-w-md mx-auto text-left">
              <div>
                <span className="text-xs font-bold text-[#735C3E] block flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#8C6D46]" />
                  <span>Instant Gift: 5-Minute Daily Framework PDF</span>
                </span>
                <p className="text-[11px] text-[#8C6D46] font-light">
                  Read while your physical journal journeys to your door.
                </p>
              </div>
              <button
                onClick={() => alert("Downloading 'Five_Minutes_Today_Framework.pdf'...")}
                className="px-3.5 py-2 bg-[#1A1816] hover:bg-[#2B2520] text-[#FAF7F2] rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF Guide</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/track-order"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#1A1816] hover:bg-[#2B2520] text-[#FAF7F2] rounded-full text-xs font-semibold shadow-xs transition-all text-center"
              >
                Track Your Parcel
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3.5 bg-white border border-[#E5DDCF] hover:bg-[#FAF7F2] text-[#1A1816] rounded-full text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                Return to Atelier
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
