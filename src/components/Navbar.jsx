import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ArrowRight, Bookmark } from 'lucide-react';
import { useRouter } from '../utils/router';
import { trackEvent } from '../utils/analytics';

export default function Navbar({ cartCount = 0, onOpenCart }) {
  const { currentPath, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Homepage', path: '/' },
    { label: 'The Habit', path: '/five-minute-habit' },
    { label: 'Shop', path: '/shop' },
    { label: 'Collections', path: '/collections' },
    { label: 'About', path: '/about' }
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DDCF]/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Signature Tab */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('/')}
              className="text-left group flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-2.5 h-6 bg-[#E5A93C] rounded-xs shadow-xs transition-transform group-hover:scale-y-110" title="Journaly Signature Ribbon" />
              <div>
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.18em] font-medium text-[#1E1B18] block leading-none">
                  JOURNALY
                </span>
                <span className="text-[9px] uppercase tracking-[0.24em] text-[#6A6054] block mt-1 font-sans">
                  Daily Habit Journals
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-xs uppercase tracking-[0.16em] font-medium transition-colors py-1 relative cursor-pointer ${
                    isActive ? 'text-[#1E1B18] font-semibold' : 'text-[#6A6054] hover:text-[#1E1B18]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#E5A93C] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Utilities: Bag Icon & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                trackEvent('view_cart', { count: cartCount });
                onOpenCart();
              }}
              className="group flex items-center gap-2 py-2 px-3.5 rounded-full bg-white border border-[#E5DDCF] hover:border-[#1E1B18] hover:bg-[#F4EFE6] transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label={`Shopping Bag (${cartCount} items)`}
            >
              <ShoppingBag className="w-4 h-4 text-[#1E1B18] group-hover:text-[#E5A93C] transition-colors" />
              <span className="text-xs font-medium text-[#1E1B18] hidden sm:inline">Bag</span>
              <span className="w-5 h-5 rounded-full bg-[#1E1B18] text-[#FAF7F2] text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#1E1B18] hover:bg-[#EFE8DD] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E5DDCF] px-4 pt-4 pb-8 shadow-xl animate-fade-in">
          <div className="space-y-2 mb-6">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`w-full flex items-center justify-between py-3 px-4 rounded-lg text-sm tracking-wide text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#F4EFE6] font-semibold text-[#1E1B18] border-l-4 border-[#E5A93C]'
                      : 'text-[#6A6054] hover:bg-[#F4EFE6] hover:text-[#1E1B18]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E5DDCF]/80 flex flex-col gap-2 text-xs text-[#6A6054]">
            <button
              onClick={() => handleNavClick('/track-order')}
              className="text-left py-2 hover:text-[#1E1B18] transition-colors cursor-pointer"
            >
              Track Existing Order →
            </button>
            <button
              onClick={() => handleNavClick('/contact')}
              className="text-left py-2 hover:text-[#1E1B18] transition-colors cursor-pointer"
            >
              Contact Atelier Support →
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
