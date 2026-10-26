import { PRODUCTS } from '../data/products';
import { BUSINESS, confirmedLegalEntity, parentBrandLink } from '../config/business';
import { SEASON_PAGES } from '../config/seasons';
import { B2B_FAQS, HOME_FAQS } from '../content/b2bFaq';

const SITE = BUSINESS.siteUrl;

export const DEFAULT_IMAGE = {
  path: '/images/journal-collection-stacked.jpg',
  alt: 'A stack of Journaly notebooks prepared for a business order'
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
    path: '/faq',
    title: 'Custom Journal FAQ for Businesses | Journaly',
    description: 'Answers on pricing, minimums, lead times, logo branding, inside pages, and India-wide delivery for custom Journaly journals. Unpublished facts are called out.',
    keywords: 'custom journals for businesses India, corporate diary printing, employee welcome kit notebooks',
    priority: '0.8',
    crumbs: ['FAQ']
  }),
  route({
    path: '/shop',
    title: 'Ready-made Journals | Journaly Shop',
    description: 'Ready-made Journaly journals for individual buyers, with the prices listed on each product. Custom business orders are quoted separately.',
    keywords: 'ready-made journals India, Journaly shop, buy journal online India',
    image: '/images/journal-daisy-front.jpg',
    imageAlt: 'The Daisy Journal, a ready-made Journaly notebook',
    priority: '0.5',
    changefreq: 'weekly',
    crumbs: ['Ready-made journals']
  }),
  route({
    path: '/five-minute-habit',
    title: 'Ready-made Daily Journal Format | Journaly',
    description: 'A page about the ready-made Journaly journal format for individual buyers. Custom business orders are quoted separately.',
    keywords: 'Journaly ready-made journal, daily journal India',
    priority: '0.3',
    crumbs: ['Journal format']
  }),
  route({
    path: '/track-order',
    title: 'Track a Journaly Order',
    description: 'Track a Journaly shop order with your order id or phone number.',
    keywords: 'track Journaly order, order status',
    priority: '0.4',
    crumbs: ['Track order']
  }),
  route({
    path: '/order-success',
    title: 'Order Received | Journaly',
    description: 'Confirmation for a Journaly shop checkout.',
    robots: 'noindex, nofollow',
    noIndex: true,
    crumbs: ['Order received']
  }),
  route({
    path: '/admin',
    title: 'Admin | Journaly',
    description: 'Private order administration.',
    robots: 'noindex, nofollow',
    noIndex: true,
    crumbs: ['Admin']
  }),
  route({
    path: '/privacy-policy',
    title: 'Privacy Policy | Journaly',
    description: 'How Journaly handles personal information when you enquire or buy.',
    keywords: 'Journaly privacy policy',
    priority: '0.3',
    crumbs: ['Privacy policy']
  }),
  route({
    path: '/terms-and-conditions',
    title: 'Terms and Conditions | Journaly',
    description: 'Terms for using the Journaly website and buying ready-made journals.',
    keywords: 'Journaly terms and conditions',
    priority: '0.3',
    crumbs: ['Terms']
  }),
  route({
    path: '/shipping-delivery-policy',
    title: 'Shipping and Delivery Policy | Journaly',
    description: 'Shipping and delivery terms for Journaly shop orders.',
    keywords: 'Journaly shipping policy',
    priority: '0.3',
    crumbs: ['Shipping']
  }),
  route({
    path: '/refund-cancellation-policy',
    title: 'Refund and Cancellation Policy | Journaly',
    description: 'Refund and cancellation terms for Journaly shop orders.',
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
    description: 'That page is not on Journaly. Request a quote for custom journals, or visit the ready-made shop.',
    robots: 'noindex, nofollow',
    noIndex: true,
    crumbs: ['Page not found']
  })
];

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

function catalogProducts() {
  return PRODUCTS.filter((product) => product?.id && product.price && product.name && product.image);
}

function productRoute(product) {
  return route({
    path: `/product/${product.id}`,
    title: `${product.name} | Ready-made Journal | Journaly`,
    description: `${product.name} is a ready-made Journaly journal listed at ₹${product.price}. Custom branded journals for businesses are quoted separately.`,
    keywords: `${product.name}, ready-made journal India, Journaly`,
    image: product.image,
    imageAlt: `${product.name}, a ready-made Journaly journal`,
    priority: '0.5',
    changefreq: 'weekly',
    crumbs: ['Ready-made journals', product.name],
    product
  });
}

export function getMetaForPath(pathname) {
  const path = !pathname || pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  if (path === '/404') return STATIC_ROUTES.find((item) => item.path === '/404');
  const found = STATIC_ROUTES.find((item) => item.path === path);
  if (found) return found;
  if (path.startsWith('/product/')) {
    const id = path.split('/')[2];
    const product = catalogProducts().find((item) => item.id === id || item.slug === id);
    if (product) return productRoute(product);
  }
  return STATIC_ROUTES.find((item) => item.path === '/404');
}

export function prerenderPaths() {
  return [
    ...STATIC_ROUTES.map((item) => item.path),
    ...catalogProducts().map((product) => `/product/${product.id}`)
  ];
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
    else if (name === 'Ready-made journals') entry.item = `${SITE}/shop`;
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

function productNode(meta) {
  const product = meta.product;
  return {
    '@type': 'Product',
    name: product.name,
    image: abs(product.image),
    description: meta.description,
    sku: product.id,
    brand: { '@type': 'Brand', name: BUSINESS.brandName },
    offers: {
      '@type': 'Offer',
      url: abs(meta.path),
      priceCurrency: 'INR',
      price: String(product.price),
      availability: product.inStock === false ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition'
    }
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
  if (meta.faqs?.length) {
    graph.push({ ...serviceNode(), url: abs(meta.path) });
    graph.push(faqNode(meta.faqs));
  }
  if (meta.product) graph.push(productNode(meta));
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
    `<meta property="og:type" content="website" />`,
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
  if (meta.preload) {
    lines.splice(5, 0, `<link rel="preload" as="image" href="${escapeAttr(meta.preload)}" fetchpriority="high" />`);
  }
  return lines.join('\n    ');
}
