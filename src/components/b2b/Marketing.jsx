import { ArrowRight, MessageCircle } from 'lucide-react';
import SiteLink from '../SiteLink';
import { BUSINESS } from '../../config/business';
import { WHATSAPP_CHAT_URL } from '../../utils/whatsappQuote';

export const primaryButtonClass =
  'inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#1E1B18] hover:bg-[#3A342C] text-[#FAF7F2] text-xs font-semibold uppercase tracking-widest transition-colors';

export const secondaryButtonClass =
  'inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border-2 border-[#1E1B18] text-xs font-semibold uppercase tracking-widest transition-colors';

export function Eyebrow({ children }) {
  return (
    <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#7C5A1E] font-semibold block mb-3">
      {children}
    </span>
  );
}

export function CtaPair({ quoteLabel = 'Get a quote', onDark = false }) {
  const primary = onDark
    ? 'inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#FAF7F2] hover:bg-white text-[#1E1B18] text-xs font-semibold uppercase tracking-widest transition-colors'
    : primaryButtonClass;
  const secondary = onDark
    ? 'inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-4 rounded-full bg-transparent hover:bg-white/10 text-[#FAF7F2] border-2 border-[#FAF7F2] text-xs font-semibold uppercase tracking-widest transition-colors'
    : secondaryButtonClass;
  const icon = onDark ? 'text-[#1E1B18]' : 'text-[#E5A93C]';
  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-3">
      <SiteLink href="/business" className={primary}>
        <span>{quoteLabel}</span>
        <ArrowRight className={`w-4 h-4 ${icon}`} aria-hidden="true" />
      </SiteLink>
      <a href={WHATSAPP_CHAT_URL} target="_blank" rel="noopener noreferrer" className={secondary}>
        <MessageCircle className="w-4 h-4 text-[#E5A93C]" aria-hidden="true" />
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  );
}

export function Breadcrumbs({ items }) {
  if (!items?.length) return null;
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono uppercase tracking-wider text-[#6A6054]">
        <li>
          <SiteLink href="/" className="hover:text-[#1E1B18]">Home</SiteLink>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {item.href ? (
              <SiteLink href={item.href} className="hover:text-[#1E1B18]">{item.label}</SiteLink>
            ) : (
              <span className="text-[#1E1B18]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function FaqList({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.q} className="group bg-white rounded-2xl border border-[#E5DDCF] px-5 py-1 shadow-xs">
          <summary className="cursor-pointer list-none py-4 font-medium text-[#1E1B18] flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <span className="text-[#7C5A1E] text-xl leading-none group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
          </summary>
          <p className="pb-5 text-sm text-[#6A6054] font-light leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function WhatsAppNote() {
  return (
    <p className="text-sm text-[#6A6054] font-light">
      WhatsApp {BUSINESS.whatsappDisplay}. You press Send. We reply with a quote.
    </p>
  );
}
