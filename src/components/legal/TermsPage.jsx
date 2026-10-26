import { BUSINESS, confirmedLegalEntity, hasFact } from '../../config/business';

export default function TermsPage() {
  const legal = confirmedLegalEntity();
  const payment = hasFact(BUSINESS.policy?.paymentTerms) ? BUSINESS.policy.paymentTerms : null;
  return (
    <div className="space-y-8 text-[#4A4138] leading-relaxed text-sm sm:text-base font-light">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C6D46] block mb-2 font-medium">
          Custom orders
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2B2520] tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-xs font-mono text-[#8C8072] mt-2">
          For using the {BUSINESS.brandName} website and requesting a custom journal order
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">Who you are dealing with</h2>
        <p>
          {BUSINESS.brandName} makes custom branded journals and notebooks for businesses in India.
          {legal ? ` The legal entity named on this site is ${legal}.` : ' A legal entity name is not published.'}
          {BUSINESS.ownerName ? ` ${BUSINESS.ownerName} leads ${BUSINESS.brandName}.` : null}
        </p>
        <p>
          Using this website means you accept these terms, the privacy policy, the shipping policy, and the refund and cancellation policy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">How a quote becomes an order</h2>
        <p>
          Pages describe what you can ask for: covers, branding, inner pages, and packaging. They do not publish a price list, a minimum order, or a lead time unless a figure is explicitly shown from configuration. A WhatsApp or email reply is a quote. Nothing is ordered until you approve it.
        </p>
        {payment ? <p>Payment terms: {payment}</p> : (
          <p>Payment terms are confirmed in the quote. This website does not take payment.</p>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">Your logo and your copy</h2>
        <p>
          You confirm that you have the right to use the logo, name, and inner-page copy you send. The logo preview on this site stays in your browser. It is not uploaded.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">Site content</h2>
        <p>
          Text, layout, and the {BUSINESS.brandName} name on this website belong to {legal || BUSINESS.brandName}. Cover drawings on the site are placeholders for a logo. They are not photographs of a client order.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">Liability</h2>
        <p>
          A custom order is limited to the brief you approve. {BUSINESS.brandName} is not liable for indirect or consequential loss arising from use of the website. The remedy for a run that does not match the approved brief is handled under the refund and cancellation policy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">Law</h2>
        <p>
          These terms are governed by the laws of India. A registered address and a specific court are not published.
          {hasFact(BUSINESS.policy?.registeredAddress) ? ` Registered address: ${BUSINESS.policy.registeredAddress}.` : null}
        </p>
      </section>
    </div>
  );
}
