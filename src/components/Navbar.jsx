import { useState } from 'react';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useRouter } from '../utils/router';
import { trackEvent } from '../utils/analytics';
import { trackFunnel } from '../utils/funnel';
import { useFeaturedSeason } from '../utils/useFeaturedSeason';
import SiteLink from './SiteLink';

const primaryLinks = [
  { label: 'Gifting', path: '/corporate-gifting' },
  { label: 'Customization', path: '/customization' },
  { label: 'About', path: '/about' },
  { label: 'FAQ', path: '/faq' }
];

export default function Navbar({ cartCount = 0, onOpenCart }) {
  const { currentPath, navigate } = useRouter();
  const season = useFeaturedSeason();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeAndGo = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const linkClass = (path) => {
    const active = currentPath === path;
    return `text-xs uppercase tracking-[0.16em] font-medium transition-colors py-1 relative ${
      active ? 'text-[#1E1B18] font-semibold' : 'text-[#6A6054] hover:text-[#1E1B18]'
    }`;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DDCF]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          <SiteLink href="/" className="group flex items-center gap-2.5 min-w-0" onClick={() => setMobileMenuOpen(false)}>
            <span className="w-2.5 h-6 bg-[#E5A93C] rounded-xs shrink-0" aria-hidden="true" />
            <span className="min-w-0">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.18em] font-medium text-[#1E1B18] block leading-none">
                JOURNALY
              </span>
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#6A6054] block mt-1">
                Custom journals
              </span>
            </span>
          </SiteLink>

          <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
            {primaryLinks.map((link) => (
              <SiteLink key={link.path} href={link.path} className={linkClass(link.path)} aria-current={currentPath === link.path ? 'page' : undefined}>
                {link.label}
                {currentPath === link.path ? <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#E5A93C] rounded-full" /> : null}
              </SiteLink>
            ))}
            {season ? (
              <SiteLink href={season.path} className={linkClass(season.path)} aria-current={currentPath === season.path ? 'page' : undefined} onClick={() => trackFunnel('cta_click', { cta: 'nav_season', season: season.id })}>
                {season.navLabel}
                {currentPath === season.path ? <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#E5A93C] rounded-full" /> : null}
              </SiteLink>
            ) : null}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <SiteLink
              href="/shop"
              className="hidden md:inline text-[11px] uppercase tracking-[0.14em] text-[#6A6054] hover:text-[#1E1B18]"
            >
              Shop
            </SiteLink>
            <SiteLink
              href="/business"
              onClick={() => trackFunnel('cta_click', { cta: 'nav_quote' })}
              className="hidden sm:inline-flex items-center min-h-11 px-4 py-2.5 rounded-full bg-[#1E1B18] text-[#FAF7F2] text-[11px] font-semibold uppercase tracking-widest hover:bg-[#3A342C]"
            >
              Get a quote
            </SiteLink>
            <button
              type="button"
              onClick={() => {
                trackEvent('view_cart', { count: cartCount });
                onOpenCart();
              }}
              className="group flex items-center gap-2 py-2 px-3 rounded-full bg-white border border-[#E5DDCF] hover:border-[#1E1B18] cursor-pointer"
              aria-label={`Shopping bag, ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4" aria-hidden="true" />
              <span className="w-5 h-5 rounded-full bg-[#1E1B18] text-[#FAF7F2] text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="lg:hidden p-2 rounded-lg cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen ? (
        <nav className="lg:hidden bg-[#FAF7F2] border-b border-[#E5DDCF] px-4 pt-2 pb-6" aria-label="Mobile">
          <SiteLink
            href="/business"
            onClick={() => setMobileMenuOpen(false)}
            className="mb-3 flex items-center justify-center px-4 py-3 rounded-full bg-[#1E1B18] text-[#FAF7F2] text-xs font-semibold uppercase tracking-widest"
          >
            Get a quote
          </SiteLink>
          {season ? (
            <button
              type="button"
              onClick={() => {
                trackFunnel('cta_click', { cta: 'nav_season', season: season.id });
                closeAndGo(season.path);
              }}
              className="w-full flex items-center justify-between py-3 px-2 text-left text-sm cursor-pointer"
            >
              <span>{season.navLabel}</span>
              <ArrowRight className="w-4 h-4 opacity-50" aria-hidden="true" />
            </button>
          ) : null}
          {primaryLinks.map((link) => (
            <button
              key={link.path}
              type="button"
              onClick={() => closeAndGo(link.path)}
              className="w-full flex items-center justify-between py-3 px-2 text-left text-sm cursor-pointer"
            >
              <span>{link.label}</span>
              <ArrowRight className="w-4 h-4 opacity-50" aria-hidden="true" />
            </button>
          ))}
          <button type="button" onClick={() => closeAndGo('/shop')} className="w-full text-left py-3 px-2 text-sm text-[#6A6054] cursor-pointer">
            Shop ready-made journals
          </button>
          <button type="button" onClick={() => closeAndGo('/contact')} className="w-full text-left py-3 px-2 text-sm text-[#6A6054] cursor-pointer">
            Contact
          </button>
          <button type="button" onClick={() => closeAndGo('/track-order')} className="w-full text-left py-3 px-2 text-sm text-[#6A6054] cursor-pointer">
            Track an order
          </button>
        </nav>
      ) : null}
    </header>
  );
}
