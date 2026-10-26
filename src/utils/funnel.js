import { trackEvent } from './analytics';
import { getFeaturedSeason, readPreviewDate, LOADED_SEASON } from '../config/seasons';

function activeSeasonId() {
  if (typeof window === 'undefined') return LOADED_SEASON?.id || 'none';
  const preview = readPreviewDate(window.location.search);
  const season = preview ? getFeaturedSeason(preview) : LOADED_SEASON;
  return season?.id || 'none';
}

export function trackFunnel(eventName, payload = {}) {
  const sourcePage = typeof window === 'undefined' ? '' : window.location.pathname;
  trackEvent(eventName, {
    season: activeSeasonId(),
    source_page: sourcePage,
    ...payload
  });
}
