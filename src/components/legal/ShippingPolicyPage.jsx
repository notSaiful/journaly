import { BUSINESS, hasFact } from '../../config/business';

export default function ShippingPolicyPage() {
  const windowText = hasFact(BUSINESS.policy?.deliveryWindow) ? BUSINESS.policy.deliveryWindow : null;
  return (
    <div className="space-y-8 text-[#4A4138] leading-relaxed text-sm sm:text-base font-light">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C6D46] block mb-2 font-medium">
          Custom orders
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2B2520] tracking-tight">
          Shipping & Delivery Policy
        </h1>
        <p className="text-xs font-mono text-[#8C8072] mt-2">
          For branded journal orders placed with {BUSINESS.brandName}
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">Delivery is part of the quote</h2>
        <p>
          Tell Journaly the delivery city in India and the date you need the journals. The quote confirms whether that date is possible. A standard dispatch time is not published.
        </p>
        {windowText ? <p>Published delivery window: {windowText}</p> : (
          <p>A delivery window is confirmed in the quote. It is not published on this page.</p>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">Address and tracking</h2>
        <p>
          The delivery address is the one you give with the order. When a consignment number exists, Journaly shares it on the same WhatsApp or email thread. This site does not offer a public order-tracking page.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">If a delivery needs a change</h2>
        <p>
          Write to <a href={`mailto:${BUSINESS.contactEmail}`} className="text-[#8C6D46] underline">{BUSINESS.contactEmail}</a> or WhatsApp {BUSINESS.whatsappDisplay} with the company name and the quote details. Address changes before dispatch are handled in that conversation.
        </p>
      </section>
    </div>
  );
}
