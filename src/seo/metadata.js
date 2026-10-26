import { BUSINESS, confirmedLegalEntity, parentBrandLink } from '../config/business';
import { SEASON_PAGES } from '../config/seasons';
import { B2B_FAQS, HOME_FAQS } from '../content/b2bFaq';
import { GUIDES, GUIDE_PUBLISHED } from '../content/guides';

const SITE = BUSINESS.siteUrl;

export const DEFAULT_IMAGE = {
  path: '/images/branded-journal.svg',
  alt: 'Placeholder journal covers with a logo mark, for a custom business order'
};

function abs(path) {
  if (!path) return `${SITE}${DEFAULT_IMAGE.path}`;
  if (path.startsWith('http')) return path;
  return `${SITE}${path.startsWith('/') ? path : `/${path}`}`;
}

function route(partial) {
  return {
    image: DEFAULT_IMAGE.path,
    imageAlt: DEFAULT_IMAGE.alt,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    changefreq: 'monthly',
    priority: '0.6',
    ...partial
  };
}

const STATIC_ROUTES = [
  route({
    path: '/',
    title: 'Custom Journals for Businesses in India | Journaly',
    description: 'Journaly makes custom branded journals and notebooks for businesses in India. Share your quantity and deadline and we will reply with a quote on WhatsApp.',
    keywords: 'custom journals for businesses India, corporate branded journals, custom logo notebooks bulk, corporate diary printing, personalised corporate gifts India',
    priority: '1.0',
    changefreq: 'weekly',
    crumbs: []
  }),
  route({
    path: '/corporate-gifting',
    title: 'Corporate Gifting Journals for Teams and Events | Journaly',
    description: 'Branded journals for corporate gifts, employee welcome kits, conferences, Diwali, and New Year. Tell Journaly the quantity and deadline for a quote.',
    keywords: 'personalised corporate gifts India, employee welcome kit notebooks, New Year corporate diaries, corporate branded journals, Diwali corporate gifts',
    priority: '0.9',
    crumbs: ['Corporate gifting']
  }),
  route({
    path: '/customization',
    title: 'Custom Logo Notebooks and Branded Diaries | Journaly',
    description: 'Specify covers, foil, blind deboss, UV print, inner pages, and packaging. Journaly quotes custom logo notebooks for bulk orders across India.',
    keywords: 'custom logo notebooks bulk, corporate diary printing, corporate branded journals, custom journals for businesses India',
    priority: '0.9',
    crumbs: ['Customization']
  }),
  route({
    path: '/business',
    title: 'Request a Custom Journal Quote | Journaly',
    description: 'Request a quote for custom journals. Add your quantity, deadline, and branding. The form opens WhatsApp so you can send it to Journaly.',
    keywords: 'custom journal quote India, corporate branded journals, custom logo notebooks bulk, corporate diary printing',
    priority: '0.9',
    changefreq: 'weekly',
    crumbs: ['Request a quote']
  }),
  route({
    path: '/about',
    title: 'About Journaly | Custom Journals for Businesses',
    description: 'Journaly is the brand behind custom journals for businesses in India. Read who operates the brand and how to ask for a quote.',
    keywords: `Journaly, custom journals for businesses India${confirmedLegalEntity() ? `, ${confirmedLegalEntity()}` : ''}`,
    priority: '0.7',
    crumbs: ['About']
  }),
  route({
    path: '/contact',
    title: 'Contact Journaly for a Business Journal Quote',
    description: `Contact Journaly on WhatsApp ${BUSINESS.whatsappDisplay} or by email for custom journals, corporate gifts, and bulk notebook orders in India.`,
    keywords: 'contact Journaly, custom journal quote India, corporate branded journals',
    priority: '0.7',
    crumbs: ['Contact']
  }),
  route({
    path: '/guides',
    title: 'Guides for Custom Corporate Journals in India | Journaly',
    description: 'Buyer guides for custom journals in India: employee gifts, onboarding kits, Diwali gifts, and logo printing methods. Prices and lead times are confirmed in a quote.',
    keywords: 'custom journals for businesses India, corporate gifting guides, employee welcome kit notebooks, Diwali corporate gifts, logo journals',
    priority: '0.8',
    changefreq: 'weekly',
    crumbs: ['Guides'],
    guideIndex: true
  }),
  route({
    path: '/faq',
    title: 'Custom Journal FAQ for Businesses | Journaly',
    description: 'Answers on pricing, minimums, lead times, logo branding, inside pages, and India-wide delivery for custom Journaly journals. Unpublished facts are called out.',
    keywords: 'custom journals for businesses India, corporate diary printing, employee welcome kit notebooks',
    priority: '0.8',
    crumbs: ['FAQ']
  }),
  route({
    path: '/admin',
    title: 'Admin | Journaly',
    description: 'Private list of custom-journal quote leads.',
    robots: 'noindex, nofollow',
    noIndex: true,
    crumbs: ['Admin']
  }),
  route({
    path: '/privacy-policy',
    title: 'Privacy Policy | Journaly',
    description: 'How Journaly handles personal information sent with a custom journal enquiry.',
    keywords: 'Journaly privacy policy',
    priority: '0.3',
    crumbs: ['Privacy policy']
  }),
  route({
    path: '/terms-and-conditions',
    title: 'Terms and Conditions | Journaly',
    description: 'Terms for using the Journaly website and requesting a custom journal order.',
    keywords: 'Journaly terms and conditions',
    priority: '0.3',
    crumbs: ['Terms']
  }),
  route({
    path: '/shipping-delivery-policy',
    title: 'Shipping and Delivery Policy | Journaly',
    description: 'How delivery for a custom Journaly order is confirmed in the quote.',
    keywords: 'Journaly shipping policy',
    priority: '0.3',
    crumbs: ['Shipping']
  }),
  route({
    path: '/refund-cancellation-policy',
    title: 'Refund and Cancellation Policy | Journaly',
    description: 'Cancellation and refund terms for custom Journaly orders. Unpublished windows are confirmed in the quote.',
    keywords: 'Journaly refund policy',
    priority: '0.3',
    crumbs: ['Refunds']
  }),
  route({
    path: '/grievance-redressal',
    title: 'Grievance Redressal | Journaly',
    description: 'How to raise a grievance with Journaly.',
    keywords: 'Journaly grievance redressal',
    priority: '0.3',
    crumbs: ['Grievance redressal']
  }),
  route({
    path: '/404',
    title: 'Page Not Found | Journaly',
    description: 'That page is not on Journaly. Request a quote for custom journals.',
    robots: 'noindex, nofollow',
    noIndex: true,
    crumbs: ['Page not found']
  })
];

STATIC_ROUTES.push(...GUIDES.map((guide) => route({
  path: guide.path,
  title: guide.title,
  description: guide.description,
  keywords: guide.keywords,
  priority: '0.7',
  changefreq: 'monthly',
  crumbs: ['Guides', guide.crumb],
  faqs: guide.faqs,
  article: {
    headline: guide.h1,
    datePublished: GUIDE_PUBLISHED,
    dateModified: GUIDE_PUBLISHED
  }
})));

STATIC_ROUTES.push(...SEASON_PAGES.map((page) => route({
  path: page.path,
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  priority: page.evergreen ? '0.7' : '0.8',
  changefreq: 'weekly',
  crumbs: [page.crumb],
  faqs: page.faqs
})));

export function getMetaForPath(pathname) {
  const path = !pathname || pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  if (path === '/404') return STATIC_ROUTES.find((item) => item.path === '/404');
  return STATIC_ROUTES.find((item) => item.path === path) || STATIC_ROUTES.find((item) => item.path === '/404');
}

export function prerenderPaths() {
  return STATIC_ROUTES.map((item) => item.path);
}

export function sitemapPaths() {
  return prerenderPaths().filter((path) => !getMetaForPath(path).noIndex && path !== '/404');
}

function organizationNode() {
  const legal = confirmedLegalEntity();
  const parent = parentBrandLink();
  const node = {
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: BUSINESS.brandName,
    url: `${SITE}/`,
    logo: abs(DEFAULT_IMAGE.path),
    description: 'Journaly makes custom branded journals and notebooks for businesses in India, including corporate gifts, welcome kits, events, and bulk orders.',
    email: BUSINESS.contactEmail,
    telephone: `+${BUSINESS.whatsappE164}`,
    areaServed: { '@type': 'Country', name: 'India' },
    brand: { '@type': 'Brand', name: BUSINESS.brandName },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${BUSINESS.whatsappE164}`,
      contactType: 'sales',
      email: BUSINESS.contactEmail,
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi']
    }
  };
  if (legal) node.legalName = legal;
  if (BUSINESS.ownerName) {
    node.founder = { '@type': 'Person', name: BUSINESS.ownerName };
  }
  if (parent) {
    node.parentOrganization = { '@type': 'Organization', name: parent.label, url: parent.href };
  }
  return node;
}

function breadcrumbNode(meta) {
  const items = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` }
  ];
  const crumbs = meta.crumbs || [];
  crumbs.forEach((name, index) => {
    const isLast = index === crumbs.length - 1;
    const entry = {
      '@type': 'ListItem',
      position: index + 2,
      name
    };
    if (isLast) entry.item = abs(meta.path === '/' ? '/' : meta.path);
    else if (name === 'Guides') entry.item = `${SITE}/guides`;
    items.push(entry);
  });
  if (crumbs.length === 0) return null;
  return { '@type': 'BreadcrumbList', '@id': `${abs(meta.path)}#breadcrumb`, itemListElement: items };
}

function serviceNode() {
  return {
    '@type': 'Service',
    '@id': `${SITE}/#custom-journals`,
    name: 'Custom journals for businesses',
    serviceType: 'Custom branded journals and notebooks',
    provider: { '@id': `${SITE}/#organization` },
    areaServed: { '@type': 'Country', name: 'India' },
    description: 'Custom journals and notebooks for corporate gifting, employee onboarding, events, and bulk orders across India. Quantity, deadline, branding, and price are confirmed in a quote.',
    url: `${SITE}/`
  };
}

function articleNode(meta) {
  return {
    '@type': 'Article',
    '@id': `${abs(meta.path)}#article`,
    headline: meta.article.headline,
    description: meta.description,
    datePublished: meta.article.datePublished,
    dateModified: meta.article.dateModified,
    author: {
      '@type': 'Organization',
      name: BUSINESS.brandName,
      url: `${SITE}/`
    },
    publisher: { '@id': `${SITE}/#organization` },
    mainEntityOfPage: abs(meta.path),
    image: abs(meta.image),
    inLanguage: 'en-IN'
  };
}

function guideIndexNode() {
  return {
    '@type': 'CollectionPage',
    '@id': `${SITE}/guides#collection`,
    name: 'Guides for buying custom journals in India',
    url: `${SITE}/guides`,
    isPartOf: { '@id': `${SITE}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: GUIDES.map((guide, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: guide.h1,
        url: abs(guide.path)
      }))
    }
  };
}

function faqNode(items) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };
}

export function buildJsonLd(meta) {
  const graph = [organizationNode()];
  if (meta.path === '/') {
    graph.push({
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      name: BUSINESS.brandName,
      url: `${SITE}/`,
      publisher: { '@id': `${SITE}/#organization` },
      description: meta.description
    });
    graph.push(serviceNode());
    graph.push(faqNode(HOME_FAQS));
  }
  if (meta.path === '/corporate-gifting' || meta.path === '/customization' || meta.path === '/business') {
    graph.push({ ...serviceNode(), url: abs(meta.path) });
  }
  if (meta.path === '/faq') graph.push(faqNode(B2B_FAQS));
  if (meta.guideIndex) graph.push(guideIndexNode());
  if (meta.article) graph.push(articleNode(meta));
  if (meta.faqs?.length) {
    if (!meta.article) graph.push({ ...serviceNode(), url: abs(meta.path) });
    graph.push(faqNode(meta.faqs));
  }
  const crumbs = breadcrumbNode(meta);
  if (crumbs) graph.push(crumbs);
  return { '@context': 'https://schema.org', '@graph': graph };
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

export function buildHeadTags(pathname) {
  const meta = getMetaForPath(pathname);
  const url = meta.path === '/404' ? `${SITE}/` : abs(meta.path === '/' ? '/' : meta.path);
  const canonical = meta.path === '/404' ? `${SITE}/` : url;
  const image = abs(meta.image);
  const json = JSON.stringify(buildJsonLd(meta)).replace(/</g, '\\u003c');
  const lines = [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="keywords" content="${escapeAttr(meta.keywords || 'custom journals for businesses India, Journaly')}" />`,
    `<meta name="author" content="${escapeAttr(BUSINESS.brandName)}" />`,
    `<link rel="canonical" href="${escapeAttr(canonical)}" />`,
    `<meta name="robots" content="${escapeAttr(meta.robots)}" />`,
    `<meta name="theme-color" content="#FAF7F2" />`,
    `<meta property="og:type" content="${meta.article ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="${escapeAttr(BUSINESS.brandName)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:url" content="${escapeAttr(url)}" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:image" content="${escapeAttr(image)}" />`,
    `<meta property="og:image:alt" content="${escapeAttr(meta.imageAlt || DEFAULT_IMAGE.alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:url" content="${escapeAttr(url)}" />`,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(image)}" />`,
    `<link rel="alternate" type="text/plain" href="${SITE}/llms.txt" title="LLM context for Journaly" />`,
    `<script type="application/ld+json" id="route-schema">${json}</script>`
  ];
  if (meta.article) {
    lines.splice(
      lines.length - 1,
      0,
      `<meta property="article:published_time" content="${escapeAttr(meta.article.datePublished)}" />`,
      `<meta property="article:modified_time" content="${escapeAttr(meta.article.dateModified)}" />`,
      `<meta property="article:author" content="${escapeAttr(BUSINESS.brandName)}" />`
    );
  }
  if (meta.preload) {
    lines.splice(5, 0, `<link rel="preload" as="image" href="${escapeAttr(meta.preload)}" fetchpriority="high" />`);
  }
  return lines.join('\n    ');
}
