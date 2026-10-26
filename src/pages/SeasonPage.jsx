import { pageByPath, nextInstance, formatSeasonDate, bannerCopy } from '../config/seasons';
import { useFeaturedSeason } from '../utils/useFeaturedSeason';
import { Breadcrumbs, CtaPair, Eyebrow, FaqList } from '../components/b2b/Marketing';
import NotFoundPage from './NotFoundPage';

const VIEWED_ON = new Date();

export default function SeasonPage({ path }) {
  const page = pageByPath(path);
  const featured = useFeaturedSeason();
  if (!page) return <NotFoundPage />;
  const instance = page.evergreen ? null : nextInstance(page, VIEWED_ON);
  const showingFeature = featured && featured.pageId === page.id;
  const calendarLine = instance
    ? `${page.name} date used on this page: ${formatSeasonDate(instance.eventDate)}. This is a calendar date, not a delivery promise.`
    : '';

  return (
    <div className="bg-[#FAF7F2]">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <Breadcrumbs items={[{ label: page.crumb }]} />
        <Eyebrow>{page.evergreen ? 'Always available' : 'Seasonal'}</Eyebrow>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.08]">{page.h1}</h1>
        <p className="mt-5 text-base sm:text-lg text-[#6A6054] font-light leading-relaxed">{page.intro}</p>
        {showingFeature ? (
          <p className="mt-4 text-sm font-medium" data-season={featured.id}>{bannerCopy(featured)}</p>
        ) : null}
        {calendarLine ? <p className="mt-4 text-sm text-[#6A6054]">{calendarLine}</p> : null}
        <CtaPair quoteLabel="Get a quote" />
      </article>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" aria-labelledby="season-faq-heading">
        <h2 id="season-faq-heading" className="text-3xl font-medium tracking-tight mb-6">Questions about this order</h2>
        <FaqList items={page.faqs || []} />
      </section>
    </div>
  );
}
