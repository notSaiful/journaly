import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { handleQuoteLead } from './api/quote-lead.js'
import { legacyRedirect } from './src/config/legacyRedirects.js'

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

function siteApiPlugin() {
  const handler = async (req, res, next) => {
    const url = req.url || '/';
    const pathname = url.split('?')[0];
    const destination = legacyRedirect(pathname);
    if (destination) {
      const query = url.includes('?') ? url.slice(url.indexOf('?')) : '';
      res.statusCode = 308;
      res.setHeader('Location', `${destination}${query}`);
      res.end();
      return;
    }

    if (pathname === '/api/quote-lead' && (req.method === 'GET' || req.method === 'POST' || req.method === 'OPTIONS')) {
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

    next();
  };

  return {
    name: 'site-api-plugin',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    }
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteApiPlugin()],
})
