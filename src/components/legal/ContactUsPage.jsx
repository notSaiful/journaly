import { BUSINESS, confirmedLegalEntity } from '../../config/business';

export default function ContactUsPage() {
  const legal = confirmedLegalEntity();
  return (
    <div className="space-y-8 text-[#4A4138] leading-relaxed text-sm sm:text-base font-light">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C6D46] block mb-2 font-medium">
          Enquiries
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2B2520] tracking-tight">
          Contact
        </h1>
      </div>
      <p>
        {BUSINESS.brandName}{legal ? ` (${legal})` : ''} replies to custom journal enquiries on WhatsApp {BUSINESS.whatsappDisplay} and at {BUSINESS.contactEmail}. The quote form is at /business. A street address is not published.
      </p>
    </div>
  );
}
