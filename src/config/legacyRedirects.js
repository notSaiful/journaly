/**
 * Old consumer URLs. Vercel, the Vite preview server, and the local static
 * server all send these to a business page with a 308.
 */
const RULES = [
  { to: '/business', match: (path) => path === '/quote' || path === '/order-success' || path.startsWith('/order-success/') },
  { to: '/customization', match: (path) => path === '/shop' || path.startsWith('/shop/') || path === '/product' || path.startsWith('/product/') || path === '/collections' || path.startsWith('/collections/') || path === '/personalise' || path.startsWith('/personalise/') || path === '/personalize' || path.startsWith('/personalize/') },
  { to: '/corporate-gifting', match: (path) => path === '/gifts' || path.startsWith('/gifts/') },
  { to: '/', match: (path) => path === '/five-minute-habit' || path.startsWith('/five-minute-habit/') },
  { to: '/contact', match: (path) => path === '/track-order' || path.startsWith('/track-order/') }
];

export function legacyRedirect(pathname) {
  const raw = String(pathname || '/').split('?')[0].split('#')[0];
  const path = raw.length > 1 && raw.endsWith('/') ? raw.slice(0, -1) : raw || '/';
  const rule = RULES.find((item) => item.match(path));
  return rule ? rule.to : null;
}
