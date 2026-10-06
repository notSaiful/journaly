import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function GrievanceRedressalPage() {
  return (
    <div className="space-y-8 text-[#2B2520] font-sans">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-[#8C6D46] block mb-2">
          Consumer Protection Compliance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal tracking-tight">
          Grievance Redressal Policy
        </h1>
        <p className="text-xs text-[#6A6054] font-mono mt-1">
          Effective Date: October 3, 2026 • In accordance with IT Act 2000 and Consumer Protection Rules
        </p>
      </div>

      <div className="p-4 rounded-xl bg-[#F4EFE6] border border-[#E5DDCF] flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-[#8C6D46] flex-shrink-0" />
        <p className="text-xs text-[#2B2520] leading-relaxed">
          JOURNALY is committed to resolving customer concerns swiftly and transparently. We provide a structured three-tier redressal mechanism.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-serif text-xl text-[#1E1B18] font-medium">1. Grievance Officer Contact Details</h2>
        <p className="text-xs sm:text-sm text-[#6A6054] leading-relaxed">
          If your issue is not resolved by our frontline support team, you may directly escalate your matter to our designated Grievance Officer:
        </p>
        <div className="p-5 rounded-xl bg-white border border-[#E5DDCF] text-xs space-y-2">
          <p><strong>Name of Officer:</strong> Mr. Raghavan Nair</p>
          <p><strong>Designation:</strong> Head of Compliance & Customer Advocacy</p>
          <p><strong>Legal Entity:</strong> Journaly Bindery Ltd.</p>
          <p><strong>Address:</strong> Plot 42, Craft Guild District, Outer Ring Road, Bengaluru, Karnataka, 560103, India</p>
          <p><strong>Direct Escalation Email:</strong> <span className="font-mono text-[#8C6D46]">grievance@journaly.store</span></p>
          <p><strong>Dedicated Helpline:</strong> +91 (080) 4120-8495 (Mon–Fri, 10:00 AM – 5:00 PM IST)</p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl text-[#1E1B18] font-medium">2. Escalation & Resolution Timelines</h2>
        <ul className="list-disc pl-5 text-xs sm:text-sm text-[#6A6054] space-y-2 leading-relaxed">
          <li><strong>Acknowledgment:</strong> Every grievance ticket will be acknowledged within <strong>48 hours</strong> with a unique tracking ticket ID.</li>
          <li><strong>Investigation:</strong> Our compliance team will audit the order history, communication records, and courier logs.</li>
          <li><strong>Resolution:</strong> The grievance will be redressed and closed within a maximum period of <strong>30 calendar days</strong> from the receipt date.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl text-[#1E1B18] font-medium">3. Payment & Chargeback Assistance</h2>
        <p className="text-xs sm:text-sm text-[#6A6054] leading-relaxed">
          For transaction failures, duplicate debits, or refund processing delays via Razorpay, our officer coordinates directly with Razorpay’s risk operations team to ensure funds are reversed to your issuing bank within 5 to 7 business days.
        </p>
      </section>
    </div>
  );
}
