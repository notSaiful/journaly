import SiteLink from '../components/SiteLink';
import { Breadcrumbs, CtaPair, Eyebrow, FaqList } from '../components/b2b/Marketing';
import { GUIDE_PUBLISHED } from '../content/guides';

function renderInline(text) {
  const nodes = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match = pattern.exec(text);
  let index = 0;
  while (match) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    nodes.push(
      <SiteLink key={`${match[2]}-${index}`} href={match[2]} className="text-[#1E1B18] underline underline-offset-4">
        {match[1]}
      </SiteLink>
    );
    last = match.index + match[0].length;
    index += 1;
    match = pattern.exec(text);
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function GuideArticlePage({ guide }) {
  return (
    <article className="bg-[#FAF7F2] text-[#1E1B18]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <Breadcrumbs items={[{ label: 'Guides', href: '/guides' }, { label: guide.crumb }]} />
        <Eyebrow>Guide</Eyebrow>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.1]">{guide.h1}</h1>
        <p className="mt-4 text-sm text-[#6A6054]">
          By Journaly · <time dateTime={GUIDE_PUBLISHED}>26 October 2026</time>
        </p>
        <aside className="mt-8 rounded-3xl border border-[#E5DDCF] bg-white p-6 sm:p-8">
          <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-[#7C5A1E]">In short</h2>
          <p className="mt-3 text-base text-[#1E1B18] font-light leading-relaxed">{guide.tldr}</p>
        </aside>
        <div className="mt-10 space-y-5 text-base text-[#3A342C] font-light leading-relaxed">
          {guide.blocks.map((block, index) => {
            if (block.h2) {
              return <h2 key={index} className="pt-6 text-2xl sm:text-3xl font-medium tracking-tight text-[#1E1B18]">{block.h2}</h2>;
            }
            if (block.h3) {
              return <h3 key={index} className="pt-2 text-xl font-medium tracking-tight text-[#1E1B18]">{block.h3}</h3>;
            }
            return <p key={index}>{renderInline(block.p)}</p>;
          })}
        </div>
        <section className="mt-14" aria-labelledby="guide-faq-heading">
          <h2 id="guide-faq-heading" className="text-2xl sm:text-3xl font-medium tracking-tight">Questions buyers ask</h2>
          <div className="mt-6">
            <FaqList items={guide.faqs} />
          </div>
        </section>
        <section className="mt-14 rounded-3xl bg-[#1E1B18] text-[#FAF7F2] px-6 sm:px-10 py-10" aria-labelledby="guide-cta-heading">
          <h2 id="guide-cta-heading" className="text-2xl sm:text-3xl font-medium tracking-tight">Ask for a quote</h2>
          <p className="mt-3 text-[#E7DFD4] font-light leading-relaxed max-w-xl">
            Send the quantity, the date you need the journals, and how the logo should be applied. The form opens WhatsApp. The message is sent only when you press Send.
          </p>
          <CtaPair quoteLabel="Get a quote" onDark />
        </section>
        <section className="mt-12" aria-labelledby="guide-related-heading">
          <h2 id="guide-related-heading" className="text-xl font-medium">Keep reading</h2>
          <ul className="mt-4 space-y-2">
            {guide.related.map((item) => (
              <li key={item.href}>
                <SiteLink href={item.href} className="text-[#1E1B18] underline underline-offset-4">{item.label}</SiteLink>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
