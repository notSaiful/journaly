import { BUSINESS, confirmedLegalEntity } from '../../config/business';

export default function PrivacyPolicyPage() {
  const legal = confirmedLegalEntity();
  return (
    <div className="space-y-8 text-[#4A4138] leading-relaxed text-sm sm:text-base font-light">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C6D46] block mb-2 font-medium">
          Enquiries
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2B2520] tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-[#8C8072] mt-2">
          How {BUSINESS.brandName} handles details you send with a business enquiry
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">Who holds the information</h2>
        <p>
          {BUSINESS.brandName}
          {legal ? `, ${legal},` : ''} uses the details below to reply to custom-journal enquiries. Contact {BUSINESS.contactEmail} for a copy, a correction, or a deletion request.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">What the quote form sends</h2>
        <p>The quote form asks for:</p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
          <li>Name, phone number, and quantity.</li>
          <li>Optional company, email, deadline, city, and notes about branding or pages.</li>
        </ul>
        <p>
          Submitting the form opens WhatsApp with that text filled in. The message is sent only when you press Send in WhatsApp. A copy may also be stored for follow-up when the lead backup is configured. If that backup is not configured, the WhatsApp message is the only copy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">What stays on your device</h2>
        <p>
          The logo preview draws your file in the browser. The file is not uploaded. The site may remember which hero line you were shown, in local storage, when that test is turned on. It is off unless configured.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">How the details are used</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
          <li>To reply with a quote and to produce an order you approve.</li>
          <li>To contact you about that enquiry on WhatsApp, phone, or email.</li>
        </ul>
        <p>
          Journaly does not sell these details. Payment card numbers are not collected on this website, because the site does not take payment.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">Page measurements</h2>
        <p>
          The site can record which page and which button were used, without your name or phone number, in the browser. A third-party analytics account is not required for the site to function, and none is named here.
        </p>
      </section>
    </div>
  );
}
