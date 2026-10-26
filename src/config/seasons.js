/**
 * Seasonal campaign calendar for Journaly.
 *
 * Festival dates are public calendar facts, not production or delivery promises.
 * Feature windows decide when a season is shown on the homepage and in the nav.
 * `orderByLeadDays` is the only source of "Order by <date> for <season>".
 * Leave it null until you choose a campaign deadline. Null hides that sentence.
 * It is not a confirmed production lead time.
 *
 * Diwali main day is Lakshmi Puja for New Delhi, from Drik Panchang
 * (https://www.drikpanchang.com/festivals/lakshmipuja/festivals-lakshmipuja-timings.html),
 * cross-checked with the Farmers' Almanac Diwali table:
 *   2026-11-08, 2027-10-29, 2028-10-17
 *
 * Holi dates are the India gazetted holiday from timeanddate.com
 * (https://www.timeanddate.com/holidays/india/holi):
 *   2026-03-04, 2027-03-22, 2028-03-11
 * Some panchang sources place the Holi colour day in 2027 on 23 March and
 * Holika Dahan on 22 March. Edit the table if you want the colour day instead.
 */

export const FESTIVALS = {
  diwali: [
    { year: 2026, date: '2026-11-08' },
    { year: 2027, date: '2027-10-29' },
    { year: 2028, date: '2028-10-17' }
  ],
  holi: [
    { year: 2026, date: '2026-03-04' },
    { year: 2027, date: '2027-03-22' },
    { year: 2028, date: '2028-03-11' }
  ]
};

const DATED_PAGES = [
  {
    id: 'diwali',
    path: '/diwali-corporate-gifts',
    name: 'Diwali',
    navLabel: 'Diwali gifts',
    crumb: 'Diwali corporate gifts',
    festivalKey: 'diwali',
    daysBefore: 55,
    daysAfter: 0,
    orderByLeadDays: null,
    title: 'Diwali Corporate Gifts | Branded Journals | Journaly',
    description: 'Branded journals as Diwali corporate gifts for clients and teams in India. Share the quantity and the date you have in mind. Journaly replies with a quote on WhatsApp.',
    keywords: 'Diwali corporate gifts, Diwali branded journals, corporate gifts India, custom journals for businesses India',
    h1: 'Diwali corporate gifts, as branded journals',
    intro: 'A journal stays on a desk after the hamper is unpacked. Tell us how many you need and the date you are working towards. We reply on WhatsApp with a quote. This page does not publish a price, a minimum, or a lead time.',
    faqs: [
      {
        q: 'Can Journaly make journals as Diwali gifts?',
        a: 'Yes. Send the quantity, the branding you want, and the date you have in mind. Journaly replies with a quote on WhatsApp. No standard Diwali lead time is published.'
      },
      {
        q: 'What can be printed for a Diwali order?',
        a: 'You can ask for a logo on the cover and a note, greeting, or agenda inside. Foil, blind deboss, and UV print are confirmed in the quote, not assumed on this page.'
      },
      {
        q: 'Does this page promise delivery before Diwali?',
        a: 'No. The Diwali date on this page is the festival calendar date. Your deadline is part of the quote. Journaly confirms what is possible when you write.'
      }
    ]
  },
  {
    id: 'new-year',
    path: '/new-year-corporate-diaries',
    name: 'New Year',
    navLabel: 'New Year diaries',
    crumb: 'New Year corporate diaries',
    month: 1,
    day: 1,
    years: [2026, 2027, 2028],
    daysBefore: 31,
    daysAfter: 7,
    orderByLeadDays: null,
    title: 'New Year Corporate Diaries | Branded Journals | Journaly',
    description: 'New Year corporate diaries and branded journals for teams and clients in India. Share a quantity and deadline. Journaly replies with a quote on WhatsApp.',
    keywords: 'New Year corporate diaries, New Year branded journals, corporate gifts India, custom journals for businesses India',
    h1: 'New Year corporate diaries for teams and clients',
    intro: 'Start the year with a diary that carries your name, not a generic cover. Share the quantity and the date you need them considered by. The quote comes back on WhatsApp.',
    faqs: [
      {
        q: 'Are New Year diaries different from other custom journals?',
        a: 'The occasion is the brief. You can ask for a year greeting, a planner opening, or a plain branded diary. The specification is confirmed in the quote.'
      },
      {
        q: 'When should we send a New Year enquiry?',
        a: 'Send it when you know the quantity and the date you are aiming for. Journaly does not publish an order-by deadline until that date is set in the seasonal calendar.'
      },
      {
        q: 'Can the inside pages include a company note?',
        a: 'Yes. A welcome line, a year note, or an agenda can be part of the brief. Send the wording with the quote request.'
      }
    ]
  },
  {
    id: 'holi',
    path: '/holi-corporate-gifts',
    name: 'Holi',
    navLabel: 'Holi gifts',
    crumb: 'Holi corporate gifts',
    festivalKey: 'holi',
    daysBefore: 40,
    daysAfter: 0,
    orderByLeadDays: null,
    title: 'Holi Corporate Gifts | Branded Journals | Journaly',
    description: 'Branded journals for Holi corporate gifting in India. Tell Journaly the quantity and your date. The quote is sent on WhatsApp.',
    keywords: 'Holi corporate gifts, Holi branded notebooks, corporate gifts India, custom journals for businesses India',
    h1: 'Holi corporate gifts that stay on a desk',
    intro: 'Holi gifting does not have to be only colour and sweets. A branded journal is something people keep. Tell us the quantity and the date you are planning around.',
    faqs: [
      {
        q: 'Which Holi date does this page use?',
        a: 'The page uses the India gazetted Holi holiday in the seasonal calendar for 2026, 2027, and 2028. That date is a planning marker. It is not a delivery promise.'
      },
      {
        q: 'Can the cover avoid festival clichés?',
        a: 'Yes. Describe the cover you want, or send a logo and ask for a restrained mark. The proof is agreed before production.'
      },
      {
        q: 'Do you publish Holi gift prices here?',
        a: 'No. Custom-order prices are quoted. If a price estimator is shown elsewhere, it stays blank until a real price table is added.'
      }
    ]
  },
  {
    id: 'womens-day',
    path: '/womens-day-corporate-gifts',
    name: "Women's Day",
    navLabel: "Women's Day",
    crumb: "Women's Day corporate gifts",
    month: 3,
    day: 8,
    years: [2026, 2027, 2028],
    daysBefore: 35,
    daysAfter: 0,
    orderByLeadDays: null,
    title: "Women's Day Corporate Gifts | Branded Journals | Journaly",
    description: "Branded journals for Women's Day corporate gifts in India. Share the quantity and deadline. Journaly replies with a quote on WhatsApp.",
    keywords: "Women's Day corporate gifts, International Women's Day journals, corporate gifts India, branded notebooks",
    h1: "Women's Day gifts your team can keep",
    intro: "International Women's Day is 8 March. A branded journal can carry a short note from the company. Tell us the quantity and the date you have in mind, and we will quote it.",
    faqs: [
      {
        q: "Is 8 March a fixed date on this page?",
        a: "Yes. Women's Day is 8 March each year. The campaign window around it is configuration. Your own deadline still has to be confirmed in the quote."
      },
      {
        q: 'Can we include a printed note inside?',
        a: 'Yes. Send the note with the enquiry. Length and placement are confirmed before production.'
      },
      {
        q: 'Is a sample available?',
        a: 'You can request a sample kit from the quote form. Journaly confirms what a sample includes when replying. Nothing is promised on this page.'
      }
    ]
  },
  {
    id: 'financial-year',
    path: '/financial-year-end-gifts',
    name: 'Financial year-end',
    navLabel: 'Year-end gifts',
    crumb: 'Financial year-end gifts',
    month: 3,
    day: 31,
    years: [2026, 2027, 2028],
    daysBefore: 44,
    daysAfter: 0,
    orderByLeadDays: null,
    title: 'Financial Year-End Gifts | Branded Journals | Journaly',
    description: 'Branded journals for financial year-end gifts in India. The Indian financial year ends on 31 March. Ask Journaly for a quote on WhatsApp.',
    keywords: 'financial year end gifts, year-end corporate gifts India, branded journals, custom notebooks bulk',
    h1: 'Financial year-end gifts for clients and teams',
    intro: 'The Indian financial year ends on 31 March. Teams often use that week to thank clients and close the year. A branded journal can be part of that gift. Send the quantity and your date.',
    faqs: [
      {
        q: 'Why 31 March?',
        a: 'That is the last day of the Indian financial year. The page uses it as the occasion date. It is not a last date to place an order unless you set one in the calendar config.'
      },
      {
        q: 'Can this be a client gift rather than an employee gift?',
        a: 'Yes. Say which it is in the quote. Packaging and the inside note can follow that choice, and both are confirmed in the quote.'
      },
      {
        q: 'Will you invoice the company?',
        a: 'Ask for the invoice details you need in the quote. A GST invoice is not shown as a site-wide promise until that option is turned on in the business config.'
      }
    ]
  },
  {
    id: 'independence-day',
    path: '/independence-day-corporate-gifts',
    name: 'Independence Day',
    navLabel: 'Independence Day',
    crumb: 'Independence Day corporate gifts',
    month: 8,
    day: 15,
    years: [2026, 2027, 2028],
    daysBefore: 45,
    daysAfter: 0,
    orderByLeadDays: null,
    title: 'Independence Day Corporate Gifts | Branded Journals | Journaly',
    description: 'Branded journals for Independence Day corporate gifts in India. 15 August is the occasion. Share a quantity and deadline for a WhatsApp quote.',
    keywords: 'Independence Day corporate gifts, 15 August branded journals, corporate gifts India, custom notebooks',
    h1: 'Independence Day gifts, made as journals',
    intro: 'Independence Day is 15 August. Companies mark it with something people can use afterwards. Tell us the quantity, the branding, and the date you are working towards.',
    faqs: [
      {
        q: 'Do the journals have to use a tricolour cover?',
        a: 'No. Describe the cover you want. A small occasion line inside is enough for many teams. The design is agreed before production.'
      },
      {
        q: 'Is 15 August the delivery date?',
        a: '15 August is the occasion. Delivery depends on the quote and the date you send. This page does not guarantee a delivery day.'
      },
      {
        q: 'Who is this for inside a company?',
        a: 'HR, admin, marketing, and procurement teams use it for employee gifts or a client note. Say which audience in the enquiry.'
      }
    ]
  }
];

const EVERGREEN_PAGES = [
  {
    id: 'onboarding',
    path: '/employee-onboarding-kits',
    evergreen: true,
    name: 'Employee onboarding',
    navLabel: 'Onboarding kits',
    crumb: 'Employee onboarding kits',
    title: 'Employee Onboarding Kits | Branded Journals | Journaly',
    description: 'Branded journals for employee onboarding and welcome kits in India. Add a note for the first week. Journaly quotes the run on WhatsApp.',
    keywords: 'employee onboarding kits, employee welcome kit notebooks, branded journals India, custom logo notebooks bulk',
    h1: 'Journals for employee onboarding kits',
    intro: 'A welcome kit is one of the first objects a new hire keeps. A journal with your mark and a short note gives the first week a place to land. Tell us the hiring volume and the date of the next cohort.',
    faqs: [
      {
        q: 'Can onboarding journals be reordered through the year?',
        a: 'Ask for that in the quote. Repeat runs depend on the specification you approve. This page does not publish a standing price.'
      },
      {
        q: 'What goes inside an onboarding journal?',
        a: 'Teams usually ask for a welcome note, the first-week plan, or lined pages. Send the copy you want. Blank journals are fine too.'
      },
      {
        q: 'Is there a minimum hiring batch?',
        a: 'No minimum is published. Share the quantity you expect, or say you are unsure. The quote will say what Journaly can take on.'
      }
    ]
  },
  {
    id: 'conference',
    path: '/conference-event-notebooks',
    evergreen: true,
    name: 'Conferences',
    navLabel: 'Event notebooks',
    crumb: 'Conference notebooks',
    title: 'Conference and Event Notebooks | Journaly',
    description: 'Branded notebooks for conferences, offsites, and summits in India. Put the agenda in the opening pages. Request a quote on WhatsApp.',
    keywords: 'conference notebooks, event branded journals, summit notebooks India, custom logo notebooks bulk',
    h1: 'Notebooks for conferences and events',
    intro: 'One notebook for the room, with the agenda where people will actually look. Share the headcount, the event date, and how you want the cover marked.',
    faqs: [
      {
        q: 'Can the agenda be printed in the opening pages?',
        a: 'Yes. Send the agenda with the enquiry. Page count and layout are confirmed before production.'
      },
      {
        q: 'Do you publish event-notebook prices?',
        a: 'No. Headcount, page count, branding, and deadline change the quote. Ask on WhatsApp and Journaly will reply with a number.'
      },
      {
        q: 'Can notebooks be packed for handout at registration?',
        a: 'Ask for handout packing in the brief. What is included is confirmed in the quote, not on this page.'
      }
    ]
  }
];

export const SEASON_PAGES = [...DATED_PAGES.map((page) => ({ ...page, evergreen: false })), ...EVERGREEN_PAGES];

function pad(value) {
  return String(value).padStart(2, '0');
}

export function addDays(iso, days) {
  const [year, month, day] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function formatSeasonDate(iso) {
  if (!iso) return '';
  const [year, month, day] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function parseIso(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function eventDatesFor(page) {
  if (page.festivalKey) return FESTIVALS[page.festivalKey].map((item) => item.date);
  return page.years.map((year) => `${year}-${pad(page.month)}-${pad(page.day)}`);
}

export function seasonInstances(page = null) {
  const pages = page ? [page] : DATED_PAGES;
  return pages.flatMap((item) => eventDatesFor(item).map((eventDate) => {
    const orderBy = Number.isFinite(item.orderByLeadDays)
      ? addDays(eventDate, -Math.abs(item.orderByLeadDays))
      : null;
    return {
      id: `${item.id}-${eventDate.slice(0, 4)}`,
      pageId: item.id,
      path: item.path,
      name: item.name,
      navLabel: item.navLabel,
      eventDate,
      featureStart: addDays(eventDate, -Math.abs(item.daysBefore || 0)),
      featureEnd: addDays(eventDate, Math.abs(item.daysAfter || 0)),
      orderBy,
      status: 'scheduled'
    };
  }));
}

export function pageByPath(pathname) {
  const path = !pathname || pathname === '/' ? '/' : String(pathname).split('?')[0].replace(/\/$/, '') || '/';
  return SEASON_PAGES.find((page) => page.path === path) || null;
}

export function nextInstance(page, now = new Date()) {
  if (!page || page.evergreen) return null;
  const today = parseIso(toIso(now));
  const upcoming = seasonInstances(page)
    .filter((item) => parseIso(item.eventDate) >= today)
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate));
  if (upcoming.length) return upcoming[0];
  const all = seasonInstances(page).sort((a, b) => a.eventDate.localeCompare(b.eventDate));
  return all[all.length - 1] || null;
}

function toIso(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function getFeaturedSeason(now = new Date()) {
  const today = toIso(now);
  const instances = seasonInstances();
  const active = instances.filter((item) => item.featureStart <= today && today <= item.featureEnd);
  if (active.length) {
    const stillAhead = active.filter((item) => item.eventDate >= today);
    const pool = (stillAhead.length ? stillAhead : active).slice().sort((a, b) => a.eventDate.localeCompare(b.eventDate));
    return { ...pool[0], status: 'active' };
  }
  const upcoming = instances
    .filter((item) => item.featureStart > today)
    .sort((a, b) => a.featureStart.localeCompare(b.featureStart) || a.eventDate.localeCompare(b.eventDate));
  if (upcoming.length) return { ...upcoming[0], status: 'upcoming' };
  return null;
}

export function bannerCopy(season) {
  if (!season) return '';
  if (season.orderBy) return `Order by ${formatSeasonDate(season.orderBy)} for ${season.name}`;
  if (season.status === 'upcoming') return `${season.name} is next. Share your deadline and we will quote.`;
  return `${season.name} journals are open for a quote.`;
}

export function readPreviewDate(search = '') {
  const value = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search).get('on');
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return date;
}

export const LOADED_SEASON = getFeaturedSeason(new Date());
