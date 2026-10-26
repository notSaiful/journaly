/**
 * Custom-order price estimator.
 *
 * Choice lists are categories a buyer can ask about. They are not prices.
 * `ranges` is the only price table. Leave it empty until real prices are confirmed.
 * An empty table hides every rupee amount and sends the buyer to WhatsApp.
 *
 * Each range row, once you have prices:
 * { journalType, quantityTier, brandingMethod, min, max }
 * journalType matches JOURNAL_TYPES[].id
 * quantityTier matches a quantity option value from the quote form (for example "50-100")
 * brandingMethod matches a branding option label from the quote form
 * min and max are numbers in INR, per journal, before you decide tax treatment
 */

export const JOURNAL_TYPES = [
  { id: 'notebook', label: 'Notebook' },
  { id: 'diary', label: 'Diary' },
  { id: 'planner', label: 'Planner' },
  { id: 'unsure', label: 'Not sure yet' }
];

export const PRICE_RANGES = [];

export function findPriceRange({ journalType, quantityTier, brandingMethod } = {}) {
  if (!journalType || !quantityTier || !brandingMethod) return null;
  const match = PRICE_RANGES.find((row) =>
    row
    && row.journalType === journalType
    && row.quantityTier === quantityTier
    && row.brandingMethod === brandingMethod
    && Number.isFinite(Number(row.min))
    && Number.isFinite(Number(row.max))
  );
  if (!match) return null;
  return { min: Number(match.min), max: Number(match.max), currency: 'INR' };
}

export function formatInrRange(range) {
  if (!range) return '';
  const format = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });
  return `${format.format(range.min)} – ${format.format(range.max)}`;
}
