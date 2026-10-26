import { useState } from 'react';

const REASONS = {
  missing_env: 'Lead backup is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, then run supabase/migrations/20261026120000_quote_leads.sql.',
  missing_admin_token: 'Set QUOTE_LEADS_ADMIN_TOKEN on the server, then enter the same token here to list leads.',
  unauthorized: 'That token was not accepted.',
  read_failed: 'The quote_leads table could not be read. Check that the migration has been applied.',
  request_failed: 'The lead service did not respond.'
};

export default function QuoteLeadsPanel() {
  const [token, setToken] = useState(() => {
    try {
      return sessionStorage.getItem('journaly-quote-admin-token') || '';
    } catch {
      return '';
    }
  });
  const [leads, setLeads] = useState([]);
  const [message, setMessage] = useState('Quote requests are backed up when the server env vars are set. WhatsApp still works without them.');
  const [loading, setLoading] = useState(false);

  const load = async (event) => {
    event?.preventDefault();
    setLoading(true);
    try {
      sessionStorage.setItem('journaly-quote-admin-token', token);
    } catch {
      // Session storage can be blocked. The request still uses the typed token.
    }
    try {
      const response = await fetch('/api/quote-lead', {
        headers: token ? { 'x-admin-token': token } : {}
      });
      const data = await response.json().catch(() => ({}));
      if (data.ok && Array.isArray(data.leads)) {
        setLeads(data.leads);
        setMessage(data.leads.length ? `${data.leads.length} recent quote leads.` : 'No quote leads stored yet.');
      } else {
        setLeads([]);
        setMessage(REASONS[data.reason] || 'Leads could not be loaded.');
      }
    } catch {
      setLeads([]);
      setMessage(REASONS.request_failed);
    }
    setLoading(false);
  };

  return (
    <section className="mb-10 rounded-3xl border border-[#E5DDCF] bg-white p-5 sm:p-6" aria-labelledby="quote-leads-heading">
      <h2 id="quote-leads-heading" className="text-xl font-medium">Quote leads</h2>
      <p className="mt-2 text-sm text-[#6A6054] font-light max-w-3xl">{message}</p>
      <form onSubmit={load} className="mt-4 flex flex-col sm:flex-row gap-2">
        <label className="sr-only" htmlFor="quote-admin-token">Admin token</label>
        <input
          id="quote-admin-token"
          type="password"
          autoComplete="off"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          placeholder="QUOTE_LEADS_ADMIN_TOKEN"
          className="min-h-11 flex-1 px-4 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-sm"
        />
        <button type="submit" disabled={loading} className="min-h-11 px-5 rounded-full bg-[#1E1B18] text-[#FAF7F2] text-xs font-semibold uppercase tracking-widest cursor-pointer disabled:opacity-60">
          {loading ? 'Loading' : 'Show leads'}
        </button>
      </form>
      {leads.length ? (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="text-[10px] font-mono uppercase tracking-wider text-[#6A6054]">
              <tr>
                <th className="py-2 pr-3">When</th>
                <th className="py-2 pr-3">Name</th>
                <th className="py-2 pr-3">Phone</th>
                <th className="py-2 pr-3">Qty</th>
                <th className="py-2 pr-3">Company</th>
                <th className="py-2 pr-3">Step</th>
                <th className="py-2 pr-3">Sample</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-[#E5DDCF]">
                  <td className="py-2 pr-3 whitespace-nowrap">{lead.created_at ? new Date(lead.created_at).toLocaleString('en-IN') : ''}</td>
                  <td className="py-2 pr-3">{lead.name}</td>
                  <td className="py-2 pr-3">{lead.phone}</td>
                  <td className="py-2 pr-3">{lead.quantity}</td>
                  <td className="py-2 pr-3">{lead.company}</td>
                  <td className="py-2 pr-3">{lead.step}</td>
                  <td className="py-2 pr-3">{lead.sample_kit ? 'Yes' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}
