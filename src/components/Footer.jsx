import { BUSINESS } from '../config/business';
import { SEASON_PAGES } from '../config/seasons';

const COPYRIGHT_YEAR = new Date().getFullYear();
import { LegalEntityName, ParentBrandLine } from './b2b/BrandFacts';
import SiteLink from './SiteLink';
import { WHATSAPP_CHAT_URL } from '../utils/whatsappQuote';

export default function Footer() {
  return (
    <footer className="bg-[#F4EFE6] text-[#1E1B18] border-t border-[#E5DDCF] pt-14 pb-24 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-10 border-b border-[#E5DDCF] flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#7C5A1E] font-semibold">Custom journals</p>
            <p className="mt-3 text-2xl sm:text-3xl font-medium tracking-tight">Tell us the quantity and the deadline.</p>
          </div>
          <SiteLink href="/business" className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#1E1B18] text-[#FAF7F2] text-xs font-semibold uppercase tracking-widest">
            Get a quote
          </SiteLink>
        </div>

        <div className="pt-8">
          <h2 className="text-xs font-mono uppercase tracking-widest mb-3">Occasions</h2>
          <ul className="flex flex-wrap gap-x-5 text-sm text-[#6A6054]">
            {SEASON_PAGES.map((page) => (
              <li key={page.path}>
                <SiteLink href={page.path} className="inline-flex items-center min-h-11 hover:text-[#1E1B18]">{page.navLabel}</SiteLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
          <div className="space-y-3">
            <p className="text-xl tracking-[0.18em] font-medium">JOURNALY</p>
            <p className="text-[#6A6054] font-light leading-relaxed">
              Custom branded journals and notebooks for businesses in India. Every order is quoted.
            </p>
            <p className="text-xs text-[#6A6054]">
              Brand: {BUSINESS.brandName}
              <br />
              <LegalEntityName />
            </p>
            <ParentBrandLine className="block text-xs underline underline-offset-4" />
            <div className="text-sm text-[#6A6054] flex flex-col items-start">
              <a className="inline-flex items-center min-h-11 underline underline-offset-4" href={WHATSAPP_CHAT_URL} target="_blank" rel="noopener noreferrer">WhatsApp {BUSINESS.whatsappDisplay}</a>
              <a className="inline-flex items-center min-h-11 underline underline-offset-4" href={`mailto:${BUSINESS.contactEmail}`}>{BUSINESS.contactEmail}</a>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest mb-4">For businesses</h2>
            <ul className="space-y-2.5 text-[#6A6054]">
              <li><SiteLink href="/corporate-gifting" className="hover:text-[#1E1B18]">Corporate gifting</SiteLink></li>
              <li><SiteLink href="/customization" className="hover:text-[#1E1B18]">Customization</SiteLink></li>
              <li><SiteLink href="/business" className="hover:text-[#1E1B18]">Request a quote</SiteLink></li>
              <li><SiteLink href="/faq" className="hover:text-[#1E1B18]">FAQ</SiteLink></li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest mb-4">Company</h2>
            <ul className="space-y-2.5 text-[#6A6054]">
              <li><SiteLink href="/about" className="hover:text-[#1E1B18]">About</SiteLink></li>
              <li><SiteLink href="/contact" className="hover:text-[#1E1B18]">Contact</SiteLink></li>
              <li><SiteLink href="/grievance-redressal" className="hover:text-[#1E1B18]">Grievance redressal</SiteLink></li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest mb-4">Policies</h2>
            <ul className="space-y-2.5 text-[#6A6054]">
              <li><SiteLink href="/shipping-delivery-policy" className="hover:text-[#1E1B18]">Shipping</SiteLink></li>
              <li><SiteLink href="/refund-cancellation-policy" className="hover:text-[#1E1B18]">Refunds</SiteLink></li>
              <li><SiteLink href="/privacy-policy" className="hover:text-[#1E1B18]">Privacy</SiteLink></li>
              <li><SiteLink href="/terms-and-conditions" className="hover:text-[#1E1B18]">Terms</SiteLink></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#E5DDCF] flex flex-col sm:flex-row gap-3 sm:items-center justify-between text-[11px] text-[#6A6054]">
          <p>© {COPYRIGHT_YEAR} {BUSINESS.brandName}. <LegalEntityName /></p>
          <p>Quotes on WhatsApp. This website does not take payment.</p>
        </div>
      </div>
    </footer>
  );
}
