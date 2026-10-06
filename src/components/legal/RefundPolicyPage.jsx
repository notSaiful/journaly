import React from 'react';
import { ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="space-y-8 text-[#4A4138] leading-relaxed text-sm sm:text-base font-light">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C6D46] block mb-2 font-medium">
          Customer Assurance
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2B2520] tracking-tight">
          Refund & Cancellation Policy
        </h1>
        <p className="text-xs font-mono text-[#8C8072] mt-2">
          Effective Date: October 3, 2026 • Last Updated: October 2026
        </p>
      </div>

      {/* 7-Day Hassle-Free Returns Highlight */}
      <div className="bg-[#FAF7F2] border border-[#E5DDCF] rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-[#8C6D46]">
          <ShieldCheck className="w-5 h-5 text-[#8C6D46]" />
          <span className="font-mono text-xs uppercase tracking-wider font-semibold">
            Hassle-Free 7-Day Returns
          </span>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          Simple, straightforward returns if you change your mind.
        </h3>
        <p className="text-xs sm:text-sm text-[#6A6054]">
          We want you to feel complete confidence with every order. If you change your mind or wish to return your journal, simply email us at care@journaly.in within 7 days of delivery. Our concierge team will assist you with a swift, hassle-free return and full refund via Razorpay.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          1. Order Cancellation Policy
        </h2>
        <p>
          We pride ourselves on swift fulfillment. However, we understand plans change:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
          <li><strong className="text-[#2B2520] font-medium">Before Dispatch:</strong> You may cancel any order within <strong className="text-[#2B2520]">12 hours of placement</strong> or before the order has been handed to the courier partner by writing to <a href="mailto:care@journaly.in" className="text-[#8C6D46] underline">care@journaly.in</a> with your Order ID. A 100% full refund will be processed immediately.</li>
          <li><strong className="text-[#2B2520] font-medium">After Dispatch:</strong> Once an order has shipped, it cannot be intercepted in transit. Please refer to our returns procedure below upon receipt.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          2. Standard Returns (Accessories & Unopened Items)
        </h2>
        <p>
          For solid brass pens, leather slipcases, or non-customized journals, we offer a <strong className="text-[#2B2520] font-medium">14-day hassle-free return window</strong> from the date of physical delivery:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
          <li>Item must be unused, in original packaging with seals intact.</li>
          <li>To initiate a return, email <a href="mailto:care@journaly.in" className="text-[#8C6D46] underline">care@journaly.in</a> with your receipt or proof of purchase.</li>
          <li>We will provide a pre-paid return shipping label or arrange reverse pickup.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          3. Damaged, Defective, or Incorrect Deliveries
        </h2>
        <p>
          Each journal undergoes stringent three-stage quality inspection. In the unlikely scenario your order arrives damaged during transit or contains a defect in binding or paper ruling:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
          <li>Notify us within <strong className="text-[#2B2520]">7 calendar days of receipt</strong> with photos of the damaged item and packaging.</li>
          <li>We will immediately dispatch a complimentary replacement via priority express shipping or issue a 100% refund, based on your preference.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          4. Refund Processing & Razorpay Settlement Timelines
        </h2>
        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E5DDCF] space-y-2">
          <div className="flex items-center gap-2 text-[#2B2520] font-medium text-sm">
            <Clock className="w-4 h-4 text-[#8C6D46]" />
            <span>Turnaround Time: 5 to 7 Business Days</span>
          </div>
          <p className="text-xs sm:text-sm text-[#6A6054]">
            Once your refund is approved, it is submitted directly to our payment processing gateway, <strong className="text-[#2B2520]">Razorpay</strong>. The refund will be credited back to the customer's original method of payment (bank account, credit/debit card, or UPI ID) within <strong className="text-[#2B2520]">5 to 7 working days</strong>, depending on your card issuer or banking institution's clearing cycles.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          5. Contact For Refund Assistance
        </h2>
        <p>
          For any questions concerning refunds, order cancellations, or replacement tracking, please reach out directly:
        </p>
        <div className="text-xs sm:text-sm space-y-1">
          <p><strong className="text-[#2B2520] font-medium">Concierge Email:</strong> <a href="mailto:care@journaly.in" className="text-[#8C6D46] underline">care@journaly.in</a></p>
          <p><strong className="text-[#2B2520] font-medium">Customer Support Desk:</strong> +44 20 7946 0912 / +91 80 4718 2900</p>
          <p><strong className="text-[#2B2520] font-medium">Hours:</strong> Monday – Saturday, 9:00 AM – 6:00 PM</p>
        </div>
      </section>
    </div>
  );
}
