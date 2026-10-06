import React from 'react';
import { Truck, Clock, Globe, PackageCheck } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="space-y-8 text-[#4A4138] leading-relaxed text-sm sm:text-base font-light">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C6D46] block mb-2 font-medium">
          Dispatch & Logistics
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2B2520] tracking-tight">
          Shipping & Delivery Policy
        </h1>
        <p className="text-xs font-mono text-[#8C8072] mt-2">
          Effective Date: October 3, 2026 • Last Updated: October 2026
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E5DDCF] space-y-1">
          <div className="flex items-center gap-2 text-[#8C6D46] mb-1">
            <Clock className="w-4 h-4" />
            <span className="font-mono text-xs uppercase font-semibold">24-Hour Dispatch</span>
          </div>
          <p className="text-xs text-[#6A6054]">Orders packed and dispatched from our atelier within 24 business hours.</p>
        </div>

        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E5DDCF] space-y-1">
          <div className="flex items-center gap-2 text-[#8C6D46] mb-1">
            <Truck className="w-4 h-4" />
            <span className="font-mono text-xs uppercase font-semibold">Free Shipping $60+</span>
          </div>
          <p className="text-xs text-[#6A6054]">Complimentary tracked delivery on all orders over $60 or ₹1,999.</p>
        </div>

        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E5DDCF] space-y-1">
          <div className="flex items-center gap-2 text-[#8C6D46] mb-1">
            <Globe className="w-4 h-4" />
            <span className="font-mono text-xs uppercase font-semibold">Global Delivery</span>
          </div>
          <p className="text-xs text-[#6A6054]">Delivering to writers and thinkers across 45+ countries worldwide.</p>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          1. Order Processing Timelines
        </h2>
        <p>
          Each Journaly book is handled with meticulous atelier care:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
          <li><strong className="text-[#2B2520] font-medium">Standard Orders:</strong> Processed and packed within <strong className="text-[#2B2520]">24 business hours</strong>.</li>
          <li><strong className="text-[#2B2520] font-medium">Custom Foil Monogramming:</strong> Hot-foil stamped by hand in our workshop, then dispatched within <strong className="text-[#2B2520]">24 to 48 hours</strong>.</li>
          <li>Orders placed on weekends or public bank holidays will be processed the following business day.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          2. Estimated Delivery Windows
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border border-[#E5DDCF] rounded-2xl overflow-hidden">
            <thead className="bg-[#EFE8DD] text-[#2B2520] font-medium">
              <tr>
                <th className="p-3.5 border-b border-[#E5DDCF]">Destination Region</th>
                <th className="p-3.5 border-b border-[#E5DDCF]">Delivery Speed</th>
                <th className="p-3.5 border-b border-[#E5DDCF]">Shipping Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DDCF] bg-white">
              <tr>
                <td className="p-3.5 font-medium text-[#2B2520]">Domestic Metro Cities</td>
                <td className="p-3.5 text-[#6A6054]">2 – 4 Business Days</td>
                <td className="p-3.5 text-[#8C6D46] font-medium">FREE over $60 (or $4.95)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-[#2B2520]">Domestic Regional / Non-Metro</td>
                <td className="p-3.5 text-[#6A6054]">3 – 6 Business Days</td>
                <td className="p-3.5 text-[#8C6D46] font-medium">FREE over $60 (or $4.95)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-[#2B2520]">Express Priority Air</td>
                <td className="p-3.5 text-[#6A6054]">1 – 2 Business Days</td>
                <td className="p-3.5 text-[#2B2520] font-medium">$9.95 flat rate</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-[#2B2520]">International Express (DHL / FedEx)</td>
                <td className="p-3.5 text-[#6A6054]">4 – 8 Business Days</td>
                <td className="p-3.5 text-[#8C6D46] font-medium">FREE over $90 (or $14.95)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          3. Live Tracking Information
        </h2>
        <p>
          As soon as your parcel is handed over to our integrated courier network (BlueDart, Delhivery, DHL Express, or Royal Mail), an automated tracking notification containing your unique AWB tracking number and live tracing link will be dispatched via email and SMS.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          4. Non-Delivery & Failed Delivery Attempts
        </h2>
        <p>
          Our courier partners will attempt delivery up to three consecutive times. If a package is undeliverable due to an incorrect address, non-availability of the recipient, or refusal:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
          <li>Our customer care desk will proactively contact you to coordinate a re-attempt.</li>
          <li>If the parcel is returned to our atelier, we can arrange re-shipment or issue a refund per our refund guidelines.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">
          5. Logistics Support
        </h2>
        <p>
          To change a delivery address prior to dispatch or check consignment status, email <a href="mailto:saifulbusiness47@gmail.com" className="text-[#8C6D46] underline">saifulbusiness47@gmail.com</a> with your order number.
        </p>
      </section>
    </div>
  );
}
