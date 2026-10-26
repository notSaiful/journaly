import { CtaPair, Eyebrow } from '../components/b2b/Marketing';
import SiteLink from '../components/SiteLink';

export default function NotFoundPage() {
  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18] min-h-[70vh]">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <Eyebrow>404</Eyebrow>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight">This page is not on Journaly.</h1>
        <p className="mt-4 text-[#6A6054] font-light leading-relaxed">
          The link may be old. If you want custom journals for a business, ask for a quote. Ready-made journals are in the shop.
        </p>
        <CtaPair />
        <p className="mt-6 text-sm">
          <SiteLink href="/shop" className="underline underline-offset-4">Ready-made journals</SiteLink>
        </p>
      </div>
    </div>
  );
}
