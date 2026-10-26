import { BUSINESS, confirmedLegalEntity, hasFact } from '../../config/business';

export default function GrievanceRedressalPage() {
  const legal = confirmedLegalEntity();
  const officer = hasFact(BUSINESS.policy?.grievanceOfficerName) ? BUSINESS.policy.grievanceOfficerName : null;
  const address = hasFact(BUSINESS.policy?.registeredAddress) ? BUSINESS.policy.registeredAddress : null;
  return (
    <div className="space-y-8 text-[#4A4138] leading-relaxed text-sm sm:text-base font-light">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C6D46] block mb-2 font-medium">
          Enquiries
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2B2520] tracking-tight">
          Grievance Redressal
        </h1>
        <p className="text-xs font-mono text-[#8C8072] mt-2">
          How to raise a concern about a {BUSINESS.brandName} custom order
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">Write to the published contact</h2>
        <p>
          Email <a href={`mailto:${BUSINESS.contactEmail}`} className="text-[#8C6D46] underline">{BUSINESS.contactEmail}</a> or WhatsApp {BUSINESS.whatsappDisplay}. Include the company name, the quote details, and what you need resolved.
        </p>
        <p>
          {officer ? `Named grievance officer: ${officer}.` : 'A separate grievance officer is not named on this site.'}
          {legal ? ` Legal entity named on this site: ${legal}.` : null}
          {address ? ` Address: ${address}.` : ' A street address is not published.'}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#2B2520]">What happens next</h2>
        <p>
          Journaly replies on the same email or WhatsApp thread. A response-time promise is not published. If the concern is about a run that does not match the approved brief, include photographs so the remedy can be agreed.
        </p>
      </section>
    </div>
  );
}
