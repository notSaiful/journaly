import { BUSINESS, hasFact } from '../../config/business';

function items() {
  const rows = [];
  if (hasFact(BUSINESS.minimumOrderQuantity)) {
    rows.push({ id: 'moq', label: 'Minimum order', value: String(BUSINESS.minimumOrderQuantity) });
  }
  if (hasFact(BUSINESS.leadTime)) {
    rows.push({ id: 'lead', label: 'Lead time', value: String(BUSINESS.leadTime) });
  }
  if (BUSINESS.gstInvoice === true) {
    rows.push({ id: 'gst', label: 'GST invoice', value: 'Available on custom orders' });
  }
  if (BUSINESS.panIndiaDelivery === true) {
    rows.push({ id: 'india', label: 'Delivery', value: 'Across India' });
  }
  return rows;
}

export default function TrustStrip() {
  const rows = items();
  if (!rows.length) return null;
  return (
    <section aria-label="Order facts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {rows.map((row) => (
          <div key={row.id} className="rounded-2xl border border-[#E5DDCF] bg-white px-4 py-4">
            <dt className="text-[10px] font-mono uppercase tracking-wider text-[#7C5A1E]">{row.label}</dt>
            <dd className="mt-1 text-sm font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
