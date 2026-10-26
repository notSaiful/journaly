import { useState } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { BUSINESS } from '../config/business';
import { LegalEntityName, ParentBrandLine } from '../components/b2b/BrandFacts';
import { Breadcrumbs, CtaPair, Eyebrow, primaryButtonClass } from '../components/b2b/Marketing';
import { trackEvent } from '../utils/analytics';
import { buildWhatsAppUrl, openWhatsAppUrl } from '../utils/whatsappQuote';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !email.includes('@') || !message.trim()) {
      setError('Add your name, a valid email, and a short message.');
      return;
    }
    const text = [
      'Journaly enquiry',
      '',
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Message: ${message.trim()}`
    ].join('\n');
    const url = buildWhatsAppUrl(text);
    trackEvent('contact_submit', { subject: 'whatsapp' });
    setWhatsappUrl(url);
    setError('');
    openWhatsAppUrl(url);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <Breadcrumbs items={[{ label: 'Contact' }]} />
        <Eyebrow>Contact</Eyebrow>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight">Talk to Journaly about a business order.</h1>
        <p className="mt-4 max-w-2xl text-[#6A6054] font-light leading-relaxed">
          For a custom journal quote, the quote form is the direct path. You can also message WhatsApp or email. A message from this page opens WhatsApp. It is sent only when you press Send.
        </p>

        <div className="mt-10 grid lg:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DDCF] space-y-4">
            <h2 className="text-xl font-medium">Reach us</h2>
            <p className="text-sm text-[#6A6054] font-light">
              Brand: {BUSINESS.brandName}
              <br />
              Legal entity: <LegalEntityName />
            </p>
            <ParentBrandLine className="block text-sm underline underline-offset-4" />
            <a href={`https://wa.me/${BUSINESS.whatsappE164}`} className="flex items-center gap-2 text-sm hover:underline" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 text-[#E5A93C]" aria-hidden="true" />
              WhatsApp {BUSINESS.whatsappDisplay}
            </a>
            <a href={`mailto:${BUSINESS.contactEmail}`} className="flex items-center gap-2 text-sm hover:underline">
              <Mail className="w-4 h-4 text-[#E5A93C]" aria-hidden="true" />
              {BUSINESS.contactEmail}
            </a>
            <p className="text-sm text-[#6A6054] font-light">India. A street address is not published.</p>
            <CtaPair quoteLabel="Get a quote" />
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DDCF]">
            {whatsappUrl ? (
              <div>
                <h2 className="text-xl font-medium">Press Send in WhatsApp</h2>
                <p className="mt-3 text-sm text-[#6A6054] font-light">
                  Your message is filled in. If WhatsApp did not open, use the button below.
                </p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${primaryButtonClass} mt-6`}>
                  Open WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <h2 className="text-xl font-medium">Send a note on WhatsApp</h2>
                <label className="block text-xs font-mono uppercase tracking-wider" htmlFor="contact-name">Name</label>
                <input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-sm" required />
                <label className="block text-xs font-mono uppercase tracking-wider" htmlFor="contact-email">Email</label>
                <input id="contact-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-sm" required />
                <label className="block text-xs font-mono uppercase tracking-wider" htmlFor="contact-message">Message</label>
                <textarea id="contact-message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-sm" required />
                {error ? <p role="alert" className="text-xs text-[#8B3A3A]">{error}</p> : null}
                <button type="submit" className={primaryButtonClass}>Continue in WhatsApp</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
