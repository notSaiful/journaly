import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleQuoteLead } from './api/quote-lead.js';
import { legacyRedirect } from './src/config/legacyRedirects.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;

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
    'Access-Control-Allow-Headers': 'Content-Type, x-admin-token'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-admin-token'
    });
    return res.end();
  }

  const requestUrl = req.url || '/';
  const url = requestUrl.split('?')[0];
  const destination = legacyRedirect(url);
  if (destination) {
    const query = requestUrl.includes('?') ? requestUrl.slice(requestUrl.indexOf('?')) : '';
    res.writeHead(308, { Location: `${destination}${query}` });
    return res.end();
  }

  if (url === '/api/quote-lead' && (req.method === 'GET' || req.method === 'POST')) {
    try {
      const body = req.method === 'POST' ? await parseBody(req) : {};
      const result = await handleQuoteLead({
        method: req.method,
        body,
        headers: req.headers,
        env: process.env
      });
      return sendJson(res, result.status, result.json);
    } catch {
      return sendJson(res, 200, { ok: false, stored: false, reason: 'request_failed' });
    }
  }

  const distDir = path.join(__dirname, 'dist');
  if (fs.existsSync(distDir)) {
    let filePath = path.join(distDir, url === '/' ? 'index.html' : url);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    if (!fs.existsSync(filePath)) {
      const notFound = path.join(distDir, '404.html');
      filePath = fs.existsSync(notFound) ? notFound : path.join(distDir, 'index.html');
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
      '.webp': 'image/webp',
      '.xml': 'application/xml',
      '.txt': 'text/plain'
    };
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    const status = path.basename(filePath) === '404.html' && url !== '/404' && url !== '/404.html' ? 404 : 200;

    try {
      const content = fs.readFileSync(filePath);
      res.writeHead(status, { 'Content-Type': contentType });
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
  console.log(`Journaly server listening on port ${PORT}`);
});
