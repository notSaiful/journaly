import { BUSINESS, hasFact } from '../../config/business';

function Term({ label, value }) {
  if (!hasFact(value)) {
    return (
      <p>
        {label} is confirmed in the quote before an order is approved. It is not published on this page.
      </p>
    );
  }
  return (
    <p>
      {label}: {value}
    </p>
  );
}

export default function RefundPolicyPage() {
  const policy = BUSINESS.policy || {};
  return (
    <div className="space-y-8 text-[#4A4138] leading-relaxed text-sm sm:text-base font-light">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C6D46] block mb-2 font-medium">
          Custom orders
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2B2520] tracking-tight">
          Refund & Cancellation Policy
        </h1>
        <p className="text-xs font-mono text-[#8C8072] mt-2">
          For branded journal orders placed with {BUSINESS.brandName}
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">How an order is agreed</h2>
        <p>
          Journaly makes custom journals for businesses. A quote on WhatsApp or email is a proposal. Production starts after you approve that quote.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">Cancellation</h2>
        <Term label="The cancellation window" value={policy.cancellationWindow} />
        <p>
          Ask to change or cancel a brief before you approve production. After approval, what can still change is part of the quote conversation. Write to{' '}
          <a href={`mailto:${BUSINESS.contactEmail}`} className="text-[#8C6D46] underline">{BUSINESS.contactEmail}</a>
          {' '}or WhatsApp {BUSINESS.whatsappDisplay}.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">Returns and refunds</h2>
        <Term label="The return window" value={policy.returnWindow} />
        <p>
          Journals are made to the brief you approve, including your logo and inner pages. A general change-of-mind return is not published. If a run does not match the approved brief, contact Journaly with the order details and photographs. The remedy is agreed in that conversation.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">Payment</h2>
        <Term label="Payment terms" value={policy.paymentTerms} />
        <p>
          Journaly does not take card payments on this website. The quote states how an approved order is paid.
        </p>
      </section>
    </div>
  );
}
