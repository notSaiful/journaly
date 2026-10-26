import SiteLink from '../components/SiteLink';
import { Breadcrumbs, CtaPair, Eyebrow } from '../components/b2b/Marketing';
import { GUIDES } from '../content/guides';

export default function GuidesIndexPage() {
  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <Breadcrumbs items={[{ label: 'Guides' }]} />
        <Eyebrow>For buyers</Eyebrow>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.1]">
          Guides for buying custom journals in India
        </h1>
        <p className="mt-5 text-base sm:text-lg text-[#6A6054] font-light leading-relaxed">
          Practical notes for HR, founders, admin, procurement, and the people who run events. They explain how to brief a custom journal. They do not publish a price, a minimum order, or a lead time. Those come back in the quote.
        </p>
        <CtaPair quoteLabel="Get a quote" />
        <div className="mt-12 space-y-4">
          {GUIDES.map((guide) => (
            <article key={guide.path} className="rounded-3xl border border-[#E5DDCF] bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-medium tracking-tight">
                <SiteLink href={guide.path} className="hover:underline underline-offset-4">{guide.h1}</SiteLink>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#6A6054] font-light leading-relaxed">{guide.description}</p>
              <SiteLink href={guide.path} className="inline-block mt-4 text-xs font-semibold uppercase tracking-widest underline underline-offset-4">
                Read the guide
              </SiteLink>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
