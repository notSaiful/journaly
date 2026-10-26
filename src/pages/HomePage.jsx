import SiteLink from '../components/SiteLink';
import { CtaPair, Eyebrow, FaqList, WhatsAppNote } from '../components/b2b/Marketing';
import { HOME_FAQS } from '../content/b2bFaq';

const USE_CASES = [
  { title: 'Corporate gifting', text: 'A journal people keep on a desk after the hamper is gone.', href: '/corporate-gifting#client-gifts' },
  { title: 'Welcome kits', text: 'A branded notebook for the first week, with your note inside.', href: '/corporate-gifting#welcome-kits' },
  { title: 'Events and conferences', text: 'One notebook for the room, with the agenda in the opening pages.', href: '/corporate-gifting#events' },
  { title: 'Diwali and New Year', text: 'Seasonal gifts for clients and teams, quoted around your date.', href: '/corporate-gifting#festive' },
  { title: 'Colleges and cohorts', text: 'A shared journal for a batch, a course, or an orientation.', href: '/corporate-gifting#cohorts' },
  { title: 'Bulk orders across India', text: 'Tell us the city and the quantity. Delivery is part of the quote.', href: '/corporate-gifting#india' }
];

const OPTIONS = [
  { title: 'Covers', text: 'Colour, material, and finish. Tell us what you have in mind and we confirm what we can make.' },
  { title: 'Branding', text: 'Ask for foil stamping, blind deboss, or UV print, and send the logo with the brief.' },
  { title: 'Inner pages', text: 'A welcome note, an agenda, prompts, or pages you write. Blank and lined are fine too.' },
  { title: 'Packaging', text: 'Handout packs, gift presentation, or bulk cartons. We confirm the options in the quote.' }
];

const STEPS = [
  { n: '01', title: 'Brief', text: 'Quantity, deadline, branding, and the city in India. If you are unsure of the quantity, say so.' },
  { n: '02', title: 'Design proof', text: 'We show the cover and the inside approach before production, so you can see the direction.' },
  { n: '03', title: 'Production', text: 'We make the run to the brief you approved. We do not publish a standard lead time.' },
  { n: '04', title: 'Delivery', text: 'Shipped for delivery across India to the address you give us.' }
];

export default function HomePage() {
  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-6">
          <Eyebrow>Custom journals for businesses</Eyebrow>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-medium tracking-tight leading-[1.08]">
            Custom branded journals for businesses in India.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#6A6054] font-light max-w-xl leading-relaxed">
            Notebooks and diaries with your logo and your inside pages. For corporate gifts, employee welcome kits, events, and New Year gifting. Tell us the quantity and deadline. We reply with a quote.
          </p>
          <CtaPair />
          <p className="mt-4">
            <WhatsAppNote />
          </p>
        </div>
        <div className="lg:col-span-6">
          <div className="rounded-3xl overflow-hidden border border-[#E5DDCF] bg-white shadow-xl">
            <img
              src="/images/journal-collection-hero.webp"
              alt="A stack of Journaly notebooks that can be branded for a business order"
              width="960"
              height="536"
              fetchPriority="high"
              decoding="async"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" aria-labelledby="use-cases-heading">
        <div className="max-w-2xl mb-8">
          <Eyebrow>Use cases</Eyebrow>
          <h2 id="use-cases-heading" className="text-3xl sm:text-4xl font-medium tracking-tight">Where businesses use them</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {USE_CASES.map((item) => (
            <SiteLink key={item.title} href={item.href} className="block p-6 rounded-2xl bg-white border border-[#E5DDCF] hover:border-[#1E1B18] transition-colors">
              <h3 className="font-medium text-lg">{item.title}</h3>
              <p className="mt-2 text-sm text-[#6A6054] font-light leading-relaxed">{item.text}</p>
            </SiteLink>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-[#E5DDCF]" aria-labelledby="customize-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-2xl mb-8">
            <Eyebrow>Customization</Eyebrow>
            <h2 id="customize-heading" className="text-3xl sm:text-4xl font-medium tracking-tight">Your cover, your mark, your pages</h2>
            <p className="mt-3 text-[#6A6054] font-light">Nothing here is a published price list. Each option is something you can ask for in the quote.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OPTIONS.map((item) => (
              <article key={item.title} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDCF]">
                <h3 className="font-medium">{item.title}</h3>
                <p className="mt-2 text-sm text-[#6A6054] font-light leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
          <SiteLink href="/customization" className="inline-block mt-6 text-xs font-semibold uppercase tracking-widest text-[#1E1B18] underline underline-offset-4">
            See customization options
          </SiteLink>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20" aria-labelledby="process-heading">
        <div className="max-w-2xl mb-8">
          <Eyebrow>How it works</Eyebrow>
          <h2 id="process-heading" className="text-3xl sm:text-4xl font-medium tracking-tight">Brief, proof, production, delivery</h2>
        </div>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step) => (
            <li key={step.n} className="p-6 rounded-2xl bg-white border border-[#E5DDCF]">
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#7C5A1E]">{step.n}</span>
              <h3 className="mt-3 text-xl font-medium">{step.title}</h3>
              <p className="mt-2 text-sm text-[#6A6054] font-light leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 grid lg:grid-cols-2 gap-10 items-center" aria-labelledby="why-heading">
        <div>
          <Eyebrow>Why Journaly</Eyebrow>
          <h2 id="why-heading" className="text-3xl sm:text-4xl font-medium tracking-tight">A business order, not a guess</h2>
          <ul className="mt-6 space-y-4 text-sm text-[#6A6054] font-light leading-relaxed">
            <li>Made for HR, admin, marketing, procurement, and founders who need a branded journal, not a one-off diary.</li>
            <li>You see the cover and inside approach before the run is produced.</li>
            <li>The conversation stays on WhatsApp, from the first brief to the quote.</li>
            <li>If you need a journal today, the ready-made shop lists its own prices. Those prices are not custom-order prices.</li>
          </ul>
          <SiteLink href="/shop" className="inline-block mt-6 text-xs font-semibold uppercase tracking-widest underline underline-offset-4">
            Ready-made journals
          </SiteLink>
        </div>
        <img
          src="/images/journal-daisy-gift-box.jpg"
          alt="A Journaly journal beside a gift box, the kind of object used for corporate gifting"
          width="1200"
          height="900"
          loading="lazy"
          decoding="async"
          className="w-full h-auto rounded-3xl border border-[#E5DDCF] object-cover aspect-[5/4]"
        />
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" aria-labelledby="faq-heading">
        <Eyebrow>FAQ</Eyebrow>
        <h2 id="faq-heading" className="text-3xl sm:text-4xl font-medium tracking-tight mb-6">Questions, answered plainly</h2>
        <FaqList items={HOME_FAQS} />
        <SiteLink href="/faq" className="inline-block mt-6 text-xs font-semibold uppercase tracking-widest underline underline-offset-4">
          All questions
        </SiteLink>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto rounded-3xl bg-[#1E1B18] text-[#FAF7F2] px-6 sm:px-12 py-12 sm:py-16">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight max-w-xl">Tell us the quantity and the deadline.</h2>
          <p className="mt-3 text-[#E7DFD4] font-light max-w-lg">We will reply with a quote for custom journals. If a number is not published on this site, we will not invent it.</p>
          <CtaPair quoteLabel="Get a quote" onDark />
        </div>
      </section>
    </div>
  );
}
