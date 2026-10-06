import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_live_TicantP8tLQ9lL';
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'xHdjSeYx4o8VsKVq372fAL9M';

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
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const url = req.url?.split('?')[0];

  if (url === '/api/razorpay-config' && req.method === 'GET') {
    return sendJson(res, 200, {
      success: true,
      key_id: KEY_ID,
      store_name: 'JOURNALY',
      default_currency: 'INR'
    });
  }

  if (url === '/api/create-razorpay-order' && req.method === 'POST') {
    try {
      const body = await parseBody(req);
      const currency = body.currency || 'INR';
      const amount = Math.round(Number(body.amount || 0) * 100);

      if (!amount || amount <= 0) {
        return sendJson(res, 400, { error: 'Invalid order amount' });
      }

      const authHeader = 'Basic ' + Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString('base64');
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
        key_id: KEY_ID
      });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  if (url === '/api/verify-razorpay-payment' && req.method === 'POST') {
    try {
      const body = await parseBody(req);
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return sendJson(res, 400, { error: 'Missing required signature verification fields' });
      }

      const expectedSignature = crypto
        .createHmac('sha256', KEY_SECRET)
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

  // Serve static dist files if dist directory exists
  const distDir = path.join(__dirname, 'dist');
  if (fs.existsSync(distDir)) {
    let filePath = path.join(distDir, url === '/' ? 'index.html' : url);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(distDir, 'index.html');
    }
    const ext = path.extname(filePath);
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.mp4': 'video/mp4'
    };
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    try {
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      return res.end(content);
    } catch {
      res.writeHead(404);
      return res.end('Not Found');
    }
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`JOURNALY Razorpay server listening on port ${PORT}`);
});
