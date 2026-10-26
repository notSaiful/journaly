import { Breadcrumbs, CtaPair, Eyebrow, WhatsAppNote } from '../components/b2b/Marketing';

const BLOCKS = [
  {
    id: 'covers',
    title: 'Covers',
    text: 'Tell us the colour, the material you have in mind, and whether the journal should feel like a gift or a daily work book. We confirm what we can make in the quote. Cover specifications are not published as a fixed menu.'
  },
  {
    id: 'branding',
    title: 'Logo and branding',
    text: 'Custom logo notebooks can be requested with foil stamping, blind deboss, or UV print. Send the logo and say where it should sit. If you need another method, describe it. The quote will say what we can actually produce.'
  },
  {
    id: 'pages',
    title: 'Inner page layouts',
    text: 'Corporate diary printing can include your welcome note, an event agenda, prompts, lined pages, or blank pages. Send the copy or a rough layout. We do not assume a page count until the quote.'
  },
  {
    id: 'packaging',
    title: 'Packaging',
    text: 'Ask for packs that can be handed out, a gift presentation, or bulk cartons for an office. Packaging choices are confirmed in the quote, not from a catalogue on this page.'
  }
];

export default function CustomizationPage() {
  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <Breadcrumbs items={[{ label: 'Customization' }]} />
        <Eyebrow>Covers, branding, pages</Eyebrow>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.1]">
          Customization for logo notebooks and corporate diaries.
        </h1>
        <p className="mt-5 text-base sm:text-lg text-[#6A6054] font-light leading-relaxed">
          A custom journal for a business is the cover people see, the mark you choose, and the pages they open. Describe what you need. Journaly replies with what is possible and what it costs.
        </p>
        <CtaPair quoteLabel="Send a customization brief" />
        <div className="mt-4"><WhatsAppNote /></div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-6">
        {BLOCKS.map((item) => (
          <article key={item.id} id={item.id} className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DDCF]">
            <h2 className="text-2xl font-medium tracking-tight">{item.title}</h2>
            <p className="mt-3 text-sm sm:text-base text-[#6A6054] font-light leading-relaxed">{item.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
