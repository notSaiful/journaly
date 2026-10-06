import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Download, Sparkles } from 'lucide-react';
import { useRouter } from '../utils/router';

export default function OrderSuccessPage() {
  const { navigate } = useRouter();
  const [orderInfo] = useState(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const urlOrder = searchParams.get('order_id');
      const urlPay = searchParams.get('payment_id');
      const savedOrder = sessionStorage.getItem('last_order_id');
      const savedPay = sessionStorage.getItem('last_payment_id');
      const savedAmount = sessionStorage.getItem('last_order_amount');
      const savedCurrency = sessionStorage.getItem('last_order_currency') || 'INR';

      return {
        orderId: urlOrder || savedOrder || '#JRN-94821',
        paymentId: urlPay || savedPay || 'pay_live_verified',
        amount: savedAmount,
        currency: savedCurrency
      };
    }
    return {
      orderId: '#JRN-94821',
      paymentId: 'pay_live_verified',
      amount: null,
      currency: 'INR'
    };
  });

  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18] font-sans min-h-screen py-20 sm:py-28 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#345941] flex items-center justify-center mx-auto mb-6 shadow-xs border border-emerald-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-2">
          Order Confirmed & Payment Verified
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#1E1B18] tracking-tight mb-4">
          IT’S YOURS.
        </h1>

        <p className="text-base sm:text-lg text-[#6A6054] font-light leading-relaxed mb-8">
          Your journal is on its way to becoming something only you could make.
        </p>

        <div className="p-6 rounded-2xl bg-white border border-[#E5DDCF] shadow-md text-left mb-8 space-y-3.5">
          <div className="flex items-center justify-between text-xs font-mono text-[#8C7E72] border-b border-[#E5DDCF] pb-3">
            <span>Reference: <strong className="text-[#1A1816]">{orderInfo.orderId}</strong></span>
            <span className="text-[#345941] flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Razorpay Verified</span>
            </span>
          </div>

          {orderInfo.paymentId && (
            <div className="flex items-center justify-between text-xs font-mono text-[#6A6054] border-b border-[#E5DDCF] pb-3">
              <span>Razorpay Payment ID:</span>
              <span className="text-[#1A1816] font-semibold">{orderInfo.paymentId}</span>
            </div>
          )}

          {orderInfo.amount && (
            <div className="flex items-center justify-between text-xs font-mono text-[#6A6054] border-b border-[#E5DDCF] pb-3">
              <span>Amount Paid:</span>
              <span className="text-[#1A1816] font-semibold">
                {orderInfo.currency === 'INR' ? `₹${Number(orderInfo.amount).toLocaleString('en-IN')}` : `$${orderInfo.amount}`}
              </span>
            </div>
          )}

          <p className="text-xs text-[#6A6054] font-light leading-relaxed">
            We will hand-stamp and dispatch your journal within 24 hours from our atelier. A live tracking notification has been dispatched to your email.
          </p>
        </div>

        {/* Digital Bonus Guide */}
        <div className="bg-[#FAF3E8] p-4 rounded-2xl border border-[#E8DDCA] flex items-center justify-between gap-4 text-left mb-8">
          <div>
            <span className="text-xs font-bold text-[#735C3E] block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8C6D46]" />
              <span>Instant Ritual Guide (PDF)</span>
            </span>
            <p className="text-[11px] text-[#8C6D46] font-light">
              Start your 5-minute clarity practice right away while your parcel is in transit.
            </p>
          </div>
          <button
            onClick={() => alert("Downloading 'Five_Minutes_Today_Framework.pdf'...")}
            className="px-3.5 py-2 bg-[#1A1816] hover:bg-[#2E2824] text-[#FAF7F2] rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/track-order')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1E1B18] hover:bg-[#332C26] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Track My Order</span>
            <ArrowRight className="w-4 h-4 text-[#E5A93C]" />
          </button>

          <button
            onClick={() => navigate('/shop')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white border border-[#E5DDCF] hover:bg-[#FAF7F2] text-xs font-mono uppercase tracking-wider text-[#1E1B18] transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
}
