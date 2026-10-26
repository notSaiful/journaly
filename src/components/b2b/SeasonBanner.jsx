import SiteLink from '../SiteLink';
import { bannerCopy, formatSeasonDate } from '../../config/seasons';
import { trackFunnel } from '../../utils/funnel';
import { useFeaturedSeason } from '../../utils/useFeaturedSeason';

export default function SeasonBanner() {
  const season = useFeaturedSeason();
  if (!season) return null;
  const copy = bannerCopy(season);
  return (
    <div className="bg-[#1E1B18] text-[#FAF7F2]" data-season={season.id} data-season-status={season.status}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-sm">
          <span className="font-medium">{copy}</span>
          {season.eventDate ? (
            <span className="text-[#E7DFD4]"> · {formatSeasonDate(season.eventDate)}</span>
          ) : null}
        </p>
        <SiteLink
          href={season.path}
          onClick={() => trackFunnel('cta_click', { cta: 'season_banner', season: season.id })}
          className="text-xs font-semibold uppercase tracking-widest text-[#E5A93C] underline underline-offset-4 shrink-0"
        >
          {season.navLabel}
        </SiteLink>
      </div>
    </div>
  );
}
