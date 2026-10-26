import QuoteLeadsPanel from '../components/admin/QuoteLeadsPanel';

export default function AdminPortalPage() {
  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#7C5A1E] font-semibold">Journaly</p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-medium tracking-tight">Quote leads</h1>
        <p className="mt-3 max-w-2xl text-sm text-[#6A6054] font-light leading-relaxed">
          Business quote requests that reached the backup. WhatsApp still opens when the backup is not configured.
        </p>
        <div className="mt-8">
          <QuoteLeadsPanel />
        </div>
      </div>
    </div>
  );
}
