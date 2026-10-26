import { MessageCircle } from 'lucide-react';
import SiteLink from '../SiteLink';
import { WHATSAPP_CHAT_URL } from '../../utils/whatsappQuote';
import { trackFunnel } from '../../utils/funnel';

export function StickyQuoteBar() {
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-30 border-t border-[#E5DDCF] bg-[#FAF7F2]/95 backdrop-blur px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-2 gap-2">
        <SiteLink
          href="/business"
          onClick={() => trackFunnel('cta_click', { cta: 'sticky_quote' })}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1E1B18] text-[#FAF7F2] text-[11px] font-semibold uppercase tracking-widest"
        >
          Get a quote
        </SiteLink>
        <a
          href={WHATSAPP_CHAT_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackFunnel('whatsapp_opened', { cta: 'sticky_whatsapp' })}
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border-2 border-[#1E1B18] bg-white text-[11px] font-semibold uppercase tracking-widest"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#E5A93C]" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_CHAT_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackFunnel('whatsapp_opened', { cta: 'floating' })}
      aria-label="Chat on WhatsApp"
      className="hidden md:inline-flex fixed bottom-6 right-6 z-30 min-h-11 items-center gap-2 rounded-full bg-[#1E1B18] text-[#FAF7F2] px-4 py-3 text-xs font-semibold uppercase tracking-widest shadow-lg"
    >
      <MessageCircle className="w-4 h-4 text-[#E5A93C]" aria-hidden="true" />
      WhatsApp
    </a>
  );
}
