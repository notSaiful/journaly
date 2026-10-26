import { BUSINESS } from '../../config/business';
import { trackFunnel } from '../../utils/funnel';
import SiteLink from '../SiteLink';

function filled(list) {
  return Array.isArray(list) ? list.filter((item) => item && (item.src || item.quote || item.title || item.name)) : [];
}

export default function ProofSection() {
  const logos = filled(BUSINESS.clientLogos);
  const studies = filled(BUSINESS.caseStudies);
  const quotes = filled(BUSINESS.testimonials);
  const photos = filled(BUSINESS.portfolio);
  const hasProof = logos.length || studies.length || quotes.length || photos.length;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="proof-heading">
      {hasProof ? (
        <div className="mb-10">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#7C5A1E] font-semibold mb-3">Proof</p>
          <h2 id="proof-heading" className="text-3xl sm:text-4xl font-medium tracking-tight">Work we can show</h2>
        </div>
      ) : (
        <h2 id="proof-heading" className="sr-only">Samples</h2>
      )}

      {logos.length ? (
        <ul className="mb-8 flex flex-wrap items-center gap-4">
          {logos.map((logo) => (
            <li key={logo.name} className="h-14 px-4 rounded-xl border border-[#E5DDCF] bg-white flex items-center">
              {logo.src ? <img src={logo.src} alt={logo.alt || logo.name} className="h-8 w-auto" /> : <span className="text-sm">{logo.name}</span>}
            </li>
          ))}
        </ul>
      ) : null}

      {studies.length ? (
        <div className="mb-8 grid md:grid-cols-2 gap-4">
          {studies.map((study) => (
            <article key={study.title} className="rounded-2xl border border-[#E5DDCF] bg-white p-5">
              <h3 className="font-medium">{study.title}</h3>
              {study.body ? <p className="mt-2 text-sm text-[#6A6054] font-light">{study.body}</p> : null}
            </article>
          ))}
        </div>
      ) : null}

      {quotes.length ? (
        <div className="mb-8 grid md:grid-cols-2 gap-4">
          {quotes.map((item) => (
            <blockquote key={item.quote} className="rounded-2xl border border-[#E5DDCF] bg-white p-5">
              <p className="text-sm leading-relaxed">“{item.quote}”</p>
              {item.name ? <footer className="mt-3 text-xs text-[#6A6054]">{item.name}{item.role ? ` · ${item.role}` : ''}</footer> : null}
            </blockquote>
          ))}
        </div>
      ) : null}

      {photos.length ? (
        <div className="mb-8 grid sm:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <img key={photo.src} src={photo.src} alt={photo.alt || 'A Journaly journal from a past order'} loading="lazy" decoding="async" className="w-full h-48 object-cover rounded-2xl border border-[#E5DDCF]" />
          ))}
        </div>
      ) : null}

      <div className="rounded-3xl bg-[#1E1B18] text-[#FAF7F2] px-6 sm:px-10 py-8 sm:py-10">
        <h3 className="text-2xl sm:text-3xl font-medium tracking-tight">Request a sample kit</h3>
        <p className="mt-3 text-sm text-[#E7DFD4] font-light max-w-xl">
          Ask for a sample before a larger run. We confirm what the kit includes, and the cost if there is one, when we reply. This is a request, not an order.
        </p>
        <SiteLink
          href="/business?sample=1"
          onClick={() => trackFunnel('sample_requested', { cta: 'sample_kit' })}
          className="mt-6 inline-flex min-h-11 items-center justify-center px-6 py-3.5 rounded-full bg-[#FAF7F2] text-[#1E1B18] text-xs font-semibold uppercase tracking-widest"
        >
          Request a sample kit
        </SiteLink>
      </div>
    </section>
  );
}
