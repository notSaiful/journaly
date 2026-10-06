import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import crypto from 'node:crypto'

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function razorpayApiPlugin() {
  const handler = async (req, res, next) => {
    const url = req.url?.split('?')[0];
    
    if (url === '/api/razorpay-config' && req.method === 'GET') {
      return sendJson(res, 200, {
        success: true,
        key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_TicantP8tLQ9lL',
        store_name: 'JOURNALY',
        default_currency: 'INR'
      });
    }

    if (url === '/api/create-razorpay-order' && req.method === 'POST') {
      try {
        const body = await parseBody(req);
        const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_live_TicantP8tLQ9lL';
        const keySecret = process.env.RAZORPAY_KEY_SECRET || 'xHdjSeYx4o8VsKVq372fAL9M';
        const currency = body.currency || 'INR';
        const amount = Math.round(Number(body.amount || 0) * 100);

        if (!amount || amount <= 0) {
          return sendJson(res, 400, { error: 'Invalid order amount' });
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
          return sendJson(res, response.status, { 
            error: data.error?.description || 'Failed to create Razorpay order', 
            details: data 
          });
        }

        return sendJson(res, 200, {
          success: true,
          order: data,
          key_id: keyId
        });
      } catch (err) {
        return sendJson(res, 500, { error: err.message });
      }
    }

    if (url === '/api/verify-razorpay-payment' && req.method === 'POST') {
      try {
        const body = await parseBody(req);
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
        const keySecret = process.env.RAZORPAY_KEY_SECRET || 'xHdjSeYx4o8VsKVq372fAL9M';

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
          return sendJson(res, 400, { error: 'Missing required signature verification fields' });
        }

        const expectedSignature = crypto
          .createHmac('sha256', keySecret)
          .update(`${razorpay_order_id}|${razorpay_payment_id}`)
          .digest('hex');

        const isValid = expectedSignature === razorpay_signature;

        if (isValid) {
          return sendJson(res, 200, {
            success: true,
            verified: true,
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id
          });
        } else {
          return sendJson(res, 400, {
            success: false,
            verified: false,
            error: 'Invalid payment signature'
          });
        }
      } catch (err) {
        return sendJson(res, 500, { error: err.message });
      }
    }

    next();
  };

  return {
    name: 'razorpay-api-plugin',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), razorpayApiPlugin()],
})
