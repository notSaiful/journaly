import { useRouter } from './router';
import { LOADED_SEASON, getFeaturedSeason, readPreviewDate } from '../config/seasons';

export function useFeaturedSeason() {
  const { search } = useRouter();
  const preview = readPreviewDate(search || '');
  if (preview) return getFeaturedSeason(preview);
  return LOADED_SEASON;
}
