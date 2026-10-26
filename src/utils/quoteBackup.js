/**
 * Fire-and-forget copy of a quote. Failure must never block WhatsApp.
 */
export function backupQuoteLead(payload) {
  if (typeof fetch === 'undefined') return;
  const body = JSON.stringify(payload);
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' });
      if (navigator.sendBeacon('/api/quote-lead', blob)) return;
    }
  } catch {
    // Fall through to fetch.
  }
  fetch('/api/quote-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true
  }).catch(() => {});
}
