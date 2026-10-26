import assert from 'node:assert/strict';
import { bannerCopy, getFeaturedSeason, formatSeasonDate } from '../src/config/seasons.js';
import { findPriceRange, PRICE_RANGES } from '../src/config/pricing.js';
import { handleQuoteLead } from '../api/quote-lead.js';
import { buildInstitutionalQuoteUrl, validateQuoteStep1 } from '../src/utils/whatsappQuote.js';

const diwali = getFeaturedSeason(new Date(2026, 9, 26));
assert.equal(diwali.pageId, 'diwali', `expected Diwali before 8 Nov 2026, got ${diwali?.pageId}`);
assert.equal(diwali.status, 'active');
assert.equal(diwali.eventDate, '2026-11-08');
assert.equal(diwali.orderBy, null);
assert.doesNotMatch(bannerCopy(diwali), /Order by/);

const newYear = getFeaturedSeason(new Date(2026, 11, 15));
assert.equal(newYear.pageId, 'new-year', `expected New Year on 15 Dec 2026, got ${newYear?.pageId}`);
assert.equal(newYear.eventDate, '2027-01-01');

const midYear = getFeaturedSeason(new Date(2026, 5, 15));
assert.equal(midYear.pageId, 'independence-day', `expected Independence Day mid-year, got ${midYear?.pageId}`);
assert.equal(midYear.status, 'upcoming');

const withDeadline = bannerCopy({ ...diwali, orderBy: '2026-10-18' });
assert.equal(withDeadline, `Order by ${formatSeasonDate('2026-10-18')} for Diwali`);

assert.equal(PRICE_RANGES.length, 0);
assert.equal(findPriceRange({ journalType: 'notebook', quantityTier: '50-99', brandingMethod: 'Gold foil logo' }), null);

const step1 = validateQuoteStep1({ name: 'Asha', phone: '9699897763', quantity: '50-99' });
assert.equal(step1, null);
const belowMinimum = validateQuoteStep1({ name: 'Asha', phone: '9699897763', quantity: '25-50' });
assert.equal(belowMinimum.field, 'quantity');
const quote = buildInstitutionalQuoteUrl({
  name: 'Asha',
  phone: '9699897763',
  quantity: '50-99',
  sampleKit: true,
  journalType: 'Notebook'
});
assert.match(quote.url, /^https:\/\/wa\.me\/919699897763\?text=/);
assert.match(decodeURIComponent(quote.url), /Sample kit: Requested/);
assert.match(decodeURIComponent(quote.url), /Journal type: Notebook/);
assert.doesNotMatch(decodeURIComponent(quote.url), /Company:/);

const missingEnv = await handleQuoteLead({
  method: 'POST',
  body: { name: 'Asha', phone: '9699897763', quantity: '50-99' },
  env: {}
});
assert.equal(missingEnv.status, 200);
assert.equal(missingEnv.json.stored, false);
assert.equal(missingEnv.json.reason, 'missing_env');

const listWithoutToken = await handleQuoteLead({ method: 'GET', headers: {}, env: {} });
assert.equal(listWithoutToken.json.reason, 'missing_admin_token');
assert.deepEqual(listWithoutToken.json.leads, []);

const invalid = await handleQuoteLead({ method: 'POST', body: { notes: 'no name' }, env: {} });
assert.equal(invalid.json.reason, 'invalid');

console.log(JSON.stringify({
  beforeDiwali: { id: diwali.id, status: diwali.status, copy: bannerCopy(diwali) },
  beforeNewYear: { id: newYear.id, status: newYear.status, copy: bannerCopy(newYear) },
  midYear: { id: midYear.id, status: midYear.status, copy: bannerCopy(midYear) },
  orderByExample: withDeadline,
  leadBackupWithoutEnv: missingEnv.json
}, null, 2));
