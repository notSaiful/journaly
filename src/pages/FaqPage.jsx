import { B2B_FAQS } from '../content/b2bFaq';
import { Breadcrumbs, CtaPair, Eyebrow, FaqList } from '../components/b2b/Marketing';

export default function FaqPage() {
  const categories = [...new Set(B2B_FAQS.map((item) => item.category))];

  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <Breadcrumbs items={[{ label: 'FAQ' }]} />
        <Eyebrow>FAQ</Eyebrow>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight">Questions about custom journals</h1>
        <p className="mt-4 text-[#6A6054] font-light leading-relaxed">
          If a number is not listed, it is not confirmed. We would rather say that than guess a minimum, a lead time, or a price.
        </p>
        <div className="mt-10 space-y-10">
          {categories.map((category) => (
            <section key={category} aria-labelledby={`faq-${category}`}>
              <h2 id={`faq-${category}`} className="text-2xl font-medium mb-4">{category}</h2>
              <FaqList items={B2B_FAQS.filter((item) => item.category === category)} />
            </section>
          ))}
        </div>
        <div className="mt-12">
          <CtaPair />
        </div>
      </div>
    </div>
  );
}
