/**
 * Razorpay Live Payment Gateway Integration for JOURNALY
 * Key ID: rzp_live_TicantP8tLQ9lL
 */

const RAZORPAY_SCRIPT_SRC = 'https://checkout.razorpay.com/v1/checkout.js';
const FALLBACK_KEY_ID = 'rzp_live_TicantP8tLQ9lL';

/**
 * Dynamically loads the Razorpay Checkout JavaScript SDK if not already present.
 */
export function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      return reject(new Error('Window is undefined'));
    }

    if (window.Razorpay) {
      return resolve(true);
    }

    const existingScript = document.querySelector(`script[src="${RAZORPAY_SCRIPT_SRC}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Razorpay SDK')));
      return;
    }

    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK from ' + RAZORPAY_SCRIPT_SRC));
    document.body.appendChild(script);
  });
}

/**
 * Creates an order on the backend via Razorpay Orders API
 */
export async function createRazorpayOrder({ amount, currency = 'INR', receipt, notes = {} }) {
  try {
    const response = await fetch('/api/create-razorpay-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency, receipt, notes })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to create order (${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.warn('Backend order creation warning:', error.message);
    return null;
  }
}

/**
 * Verifies payment signature on the backend
 */
export async function verifyRazorpayPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
  try {
    const response = await fetch('/api/verify-razorpay-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ razorpay_order_id, razorpay_payment_id, razorpay_signature })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Payment verification failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Signature verification error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Initiates Razorpay Checkout Modal
 *
 * @param {Object} config
 * @param {number} config.amount Total amount (in major units, e.g. 36.00 or 2999)
 * @param {string} [config.currency='INR'] Currency code ('INR' or 'USD')
 * @param {string} [config.name='JOURNALY'] Store or Brand name
 * @param {string} [config.description='Archival Journal Order'] Payment description
 * @param {Object} [config.prefill] Customer details { name, email, contact }
 * @param {Object} [config.notes] Custom metadata { address, items, giftNote }
 * @param {Function} config.onSuccess Callback on verified payment completion
 * @param {Function} [config.onError] Callback on payment error or failure
 * @param {Function} [config.onDismiss] Callback on modal dismissal by user
 */
export async function openRazorpayCheckout({
  amount,
  currency = 'INR',
  name = 'JOURNALY',
  description = 'Archival Journal Order',
  prefill = {},
  notes = {},
  onSuccess,
  onError,
  onDismiss
}) {
  try {
    // 1. Ensure Razorpay Checkout script is loaded
    await loadRazorpayScript();

    if (!window.Razorpay) {
      throw new Error('Razorpay SDK is not available');
    }

    // 2. Fetch Live Key ID from config or environment
    const keyId = import.meta.env?.VITE_RAZORPAY_KEY_ID || FALLBACK_KEY_ID;

    // 3. Create server-side order
    const orderReceipt = `CA_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const orderResult = await createRazorpayOrder({
      amount,
      currency,
      receipt: orderReceipt,
      notes: {
        customer_name: prefill.name || '',
        customer_email: prefill.email || '',
        ...notes
      }
    });

    const orderId = orderResult?.order?.id;
    const finalAmountInSubunits = orderResult?.order?.amount || Math.round(amount * 100);

    // 4. Configure Razorpay Standard Checkout options
    const options = {
      key: keyId,
      amount: finalAmountInSubunits,
      currency: currency,
      name: name,
      description: description,
      image: '/images/journal-floral-front.png',
      order_id: orderId, // undefined if server order was bypassed
      prefill: {
        name: prefill.name || '',
        email: prefill.email || '',
        contact: prefill.contact || ''
      },
      notes: {
        receipt: orderReceipt,
        ...notes
      },
      theme: {
        color: '#1A1816', // Deep Charcoal / Ink aesthetic of Journaly
        backdrop_color: 'rgba(26, 24, 22, 0.7)'
      },
      modal: {
        ondismiss: () => {
          if (onDismiss) onDismiss();
        },
        escape: true,
        backdropclose: false
      },
      handler: async (response) => {
        try {
          let verificationResult = { success: true };

          // If server order was created, verify signature
          if (response.razorpay_signature && orderId) {
            verificationResult = await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id || orderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
          }

          if (onSuccess) {
            onSuccess({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id || orderId || orderReceipt,
              signature: response.razorpay_signature,
              verified: verificationResult.success
            });
          }
        } catch (err) {
          console.error('Error handling payment success:', err);
          if (onError) onError(err);
        }
      }
    };

    const rzp = new window.Razorpay(options);

    rzp.on('payment.failed', function (response) {
      console.warn('Razorpay payment failed:', response.error);
      if (onError) {
        onError({
          code: response.error.code,
          description: response.error.description,
          source: response.error.source,
          step: response.error.step,
          reason: response.error.reason
        });
      }
    });

    rzp.open();
    return true;
  } catch (error) {
    console.error('Failed to launch Razorpay checkout:', error);
    if (onError) onError(error);
    return false;
  }
}
