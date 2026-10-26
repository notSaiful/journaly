import { BUSINESS, confirmedLegalEntity } from '../config/business';
import { LegalEntityName, ParentBrandLine } from '../components/b2b/BrandFacts';
import { Breadcrumbs, CtaPair, Eyebrow } from '../components/b2b/Marketing';

export default function AboutPage() {
  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <Breadcrumbs items={[{ label: 'About' }]} />
        <Eyebrow>The brand</Eyebrow>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.1]">
          Journaly makes custom journals for businesses.
        </h1>
        <div className="mt-6 space-y-4 text-base text-[#6A6054] font-light leading-relaxed">
          <p>
            Journaly is its own brand. Companies, colleges, and organisers use it when they need notebooks and diaries with their logo and their pages, for gifts, welcome kits, events, and bulk orders across India.
          </p>
          <p>
            {BUSINESS.ownerName ? `${BUSINESS.ownerName} leads Journaly. ` : null}
            {confirmedLegalEntity() ? <>The legal entity named on this site is <LegalEntityName className="text-[#1E1B18]" />.</> : null}
          </p>
          <ParentBrandLine className="block text-[#1E1B18] underline underline-offset-4" />
          <p>
            The minimum order is 50 journals. A standard lead time, client names, and certifications are not published, because they are not confirmed. Ask in the quote and we will answer with what we can actually do.
          </p>
          <p>
            Journaly takes custom orders for businesses. Quantity, branding, and timing are agreed in the quote.
          </p>
        </div>
        <CtaPair quoteLabel="Talk to Journaly" />
      </div>
    </div>
  );
}
