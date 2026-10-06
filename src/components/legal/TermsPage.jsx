import React from 'react';

export default function TermsPage() {
  return (
    <div className="space-y-8 text-[#4A4138] leading-relaxed text-sm sm:text-base font-light">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C6D46] block mb-2 font-medium">
          Legal Agreement
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2B2520] tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-xs font-mono text-[#8C8072] mt-2">
          Effective Date: October 3, 2026 • Last Updated: October 2026
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          1. Introduction & Acceptance
        </h2>
        <p>
          Welcome to <strong className="text-[#2B2520] font-medium">Journaly</strong> ("Website", "Store", "we", "us", or "our"), operated by <strong className="text-[#2B2520] font-medium">Journaly Bindery Ltd.</strong>. By browsing, accessing, or placing an order on our website, you ("User", "Customer", "you") agree to be bound by these Terms & Conditions, along with our Privacy Policy, Shipping Policy, and Refund Policy.
        </p>
        <p>
          If you do not agree with any portion of these terms, please refrain from using our website or purchasing our products.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          2. Products & Accuracy of Information
        </h2>
        <p>
          We take extreme care in presenting the photography and specifications (dimensions, page counts, prompts, binding, and finishes) of our journals accurately. Slight natural artisanal variations in cover texture and foil stamping may occur.
        </p>
        <p>
          We reserve the right to limit the sales of our products to any geographic region or person, and to modify product prices without prior notice.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          3. Payment Processing & Razorpay Gateway
        </h2>
        <p>
          All online commercial transactions on Journaly are executed through certified, PCI-DSS compliant payment gateways, primarily <strong className="text-[#2B2520] font-medium">Razorpay Software Private Limited</strong> ("Razorpay").
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
          <li>We accept all major Credit/Debit Cards (Visa, Mastercard, American Express), Net Banking, UPI (Google Pay, PhonePe, Paytm), and authorized digital wallets.</li>
          <li>Your sensitive payment credentials (card numbers, CVV, OTP) are processed directly on Razorpay's encrypted servers and are never stored or accessible by Journaly.</li>
          <li>In the event of a declined or failed payment where funds were debited, the transaction will automatically be reconciled by Razorpay within 3–5 business days.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          4. Orders, Cancellations & Fulfillment
        </h2>
        <p>
          Receipt of an electronic order confirmation does not constitute our final acceptance of an order. We reserve the right to accept or decline your order for reasons including inventory stock shortages, inaccuracies in pricing, or flagged fraudulent payment behavior.
        </p>
        <p>
          Orders can be cancelled before dispatch (typically within 12 hours of order placement) by contacting our concierge team at <a href="mailto:support@journaly.com" className="text-[#8C6D46] underline">support@journaly.com</a>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          5. Intellectual Property
        </h2>
        <p>
          All content published on Journaly—including text, editorial imagery, product designs, video films, logos, and digital typography—is the exclusive intellectual property of Journaly Bindery Ltd. and is protected by international copyright, trademark, and trade dress laws.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          6. Limitation of Liability
        </h2>
        <p>
          In no scenario shall Journaly Bindery Ltd., its directors, employees, or affiliates be held liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our products or services, beyond the total purchase price paid for the specific order.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          7. Governing Law & Jurisdiction
        </h2>
        <p>
          These Terms and any individual agreements whereby we deliver products shall be governed by and construed in accordance with the applicable laws of the registered jurisdiction, with exclusive jurisdiction resting in the competent courts thereof.
        </p>
      </section>
    </div>
  );
}
