/**
 * Vercel Serverless Function: Create Razorpay Order
 * Endpoint: POST /api/create-razorpay-order
 */

async function getParsedBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

export default async function handler(req, res) {
  // CORS & Preflight headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = await getParsedBody(req);

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_TicantP8tLQ9lL';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'xHdjSeYx4o8VsKVq372fAL9M';

    const currency = body.currency || 'INR';
    const amount = Math.round(Number(body.amount || 0) * 100);

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid order amount' });
    }

    const authHeader = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt: body.receipt || `CA_${Date.now()}`,
        notes: body.notes || {}
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Razorpay API error response:', data);
      return res.status(response.status).json({
        error: data.error?.description || 'Failed to create Razorpay order',
        details: data
      });
    }

    return res.status(200).json({
      success: true,
      order: data,
      key_id: keyId
    });
  } catch (err) {
    console.error('Create Razorpay order error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
