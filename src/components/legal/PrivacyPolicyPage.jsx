import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8 text-[#4A4138] leading-relaxed text-sm sm:text-base font-light">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C6D46] block mb-2 font-medium">
          Data Protection & Security
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2B2520] tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-[#8C8072] mt-2">
          Effective Date: October 3, 2026 • Last Updated: October 2026
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          1. Overview
        </h2>
        <p>
          At <strong className="text-[#2B2520] font-medium">Journaly</strong> ("we", "our", or "us"), safeguarding your personal information is paramount to our craftsmanship ethos. This Privacy Policy details how we collect, process, utilize, and protect your information when you visit or make a purchase from our store.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          2. Information We Collect
        </h2>
        <p>When you browse or purchase from Journaly, we collect:</p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
          <li><strong className="text-[#2B2520] font-medium">Order Identification Information:</strong> Full name, shipping destination address, billing address, contact phone number, and email address.</li>
          <li><strong className="text-[#2B2520] font-medium">Device & Browsing Metrics:</strong> IP address, browser type, time zone, and interactions with our visual journals to ensure optimal site rendering.</li>
          <li><strong className="text-[#2B2520] font-medium">Customization Data:</strong> Personalized monogram initials, selected paper formats, and custom foil choices.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          3. Payment Security & Razorpay Integration
        </h2>
        <p>
          We do <strong className="text-[#2B2520] font-medium">NOT</strong> collect, view, or store your complete Credit/Debit card numbers, CVV codes, or net banking passwords.
        </p>
        <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5DDCF] space-y-2 text-xs sm:text-sm">
          <p className="font-medium text-[#2B2520]">Razorpay Security Standard Compliance:</p>
          <p>
            All payment processing is handled through <strong className="text-[#2B2520]">Razorpay</strong>, which is certified under <strong className="text-[#2B2520]">PCI-DSS Level 1</strong> (the highest global standard for secure electronic transaction processing). All payment data is encrypted using industry-standard TLS/SSL encryption during transit.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          4. How We Utilize Your Data
        </h2>
        <p>We use collected customer information solely for:</p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
          <li>Fulfilling, stamping, and dispatching your journal orders.</li>
          <li>Transmitting order confirmation notices, shipping tracking links, and delivery SMS updates.</li>
          <li>Facilitating transaction receipts, invoices, and authorized refund requests.</li>
          <li>Preventing transactional fraud and safeguarding website integrity.</li>
          <li>Delivering our Morning Reflection letter (only if explicitly opted-in; unsubscribe anytime).</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          5. Third-Party Disclosures
        </h2>
        <p>
          We only share necessary customer data with trusted third parties essential for providing our service:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
          <li><strong className="text-[#2B2520] font-medium">Payment Gateways:</strong> Razorpay for payment authorization and refund execution.</li>
          <li><strong className="text-[#2B2520] font-medium">Logistics Partners:</strong> DHL Express, BlueDart, FedEx, and national postal carriers for physical parcel delivery.</li>
        </ul>
        <p>We never sell, rent, or trade your personal data to advertising brokers or external marketing networks.</p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          6. Your Rights & Data Retention
        </h2>
        <p>
          You have the right to request access to the personal data we hold about you, request corrections, or request deletion of your account records. To exercise these rights, please email our Data Protection Officer at <a href="mailto:saifulbusiness47@gmail.com" className="text-[#8C6D46] underline">saifulbusiness47@gmail.com</a>.
        </p>
      </section>
    </div>
  );
}
