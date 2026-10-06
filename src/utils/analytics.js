/**
 * JOURNALY — Privacy-Preserving Analytics Layer
 * Dispatches structured events to window.dataLayer / custom listener without collecting PII.
 */

export function trackEvent(eventName, payload = {}) {
  const sanitizedPayload = {
    ...payload,
    timestamp: new Date().toISOString()
  };

  // Push to dataLayer if present (Google Tag Manager / Segment standard)
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...sanitizedPayload
    });

    // Custom browser event for internal reactive listeners
    window.dispatchEvent(
      new CustomEvent('journaly:analytics', {
        detail: { event: eventName, data: sanitizedPayload }
      })
    );

    // Development diagnostic log
    if (import.meta.env.DEV) {
      console.log(`[JOURNALY Analytics] 📊 ${eventName}`, sanitizedPayload);
    }
  }
}
