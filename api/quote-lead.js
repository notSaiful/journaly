/**
 * Vercel serverless backup for quote requests.
 * POST /api/quote-lead inserts into public.quote_leads.
 * GET  /api/quote-lead lists recent rows for /admin when QUOTE_LEADS_ADMIN_TOKEN matches.
 *
 * Missing env vars or a missing table return a soft failure. Callers must ignore it.
 *
 * Env:
 *   SUPABASE_URL or VITE_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (server only — never prefix with VITE_)
 *   QUOTE_LEADS_ADMIN_TOKEN     (required only to list leads)
 */

const LIMITS = {
  name: 80,
  phone: 32,
  quantity: 40,
  company: 120,
  email: 120,
  use_case: 80,
  branding: 80,
  deadline: 80,
  notes: 1000,
  season: 80,
  source_page: 160,
  step: 20,
  journal_type: 80,
  quantity_tier: 80,
  branding_method: 80
};

function clip(value, max) {
  let cleaned = '';
  for (const char of String(value ?? '')) {
    cleaned += char.charCodeAt(0) < 32 ? ' ' : char;
  }
  return cleaned.trim().slice(0, max);
}

function header(headers, name) {
  if (!headers) return '';
  if (typeof headers.get === 'function') return headers.get(name) || '';
  const direct = headers[name] ?? headers[name.toLowerCase()] ?? '';
  return Array.isArray(direct) ? String(direct[0] || '') : String(direct || '');
}

function leadRow(body) {
  return {
    name: clip(body.name, LIMITS.name),
    phone: clip(body.phone, LIMITS.phone),
    quantity: clip(body.quantity, LIMITS.quantity),
    company: clip(body.company, LIMITS.company),
    email: clip(body.email, LIMITS.email),
    use_case: clip(body.use_case ?? body.useCase, LIMITS.use_case),
    branding: clip(body.branding, LIMITS.branding),
    deadline: clip(body.deadline, LIMITS.deadline),
    notes: clip(body.notes, LIMITS.notes),
    sample_kit: Boolean(body.sample_kit ?? body.sampleKit),
    season: clip(body.season, LIMITS.season),
    source_page: clip(body.source_page ?? body.sourcePage, LIMITS.source_page),
    step: clip(body.step, LIMITS.step),
    journal_type: clip(body.journal_type ?? body.journalType, LIMITS.journal_type),
    quantity_tier: clip(body.quantity_tier ?? body.quantityTier, LIMITS.quantity_tier),
    branding_method: clip(body.branding_method ?? body.brandingMethod, LIMITS.branding_method)
  };
}

function supabaseEnv(env) {
  const url = String(env.SUPABASE_URL || env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
  const key = String(env.SUPABASE_SERVICE_ROLE_KEY || '');
  if (!url || !key || url.includes('your-project-id') || url.includes('xyzcompany')) return null;
  return { url, key };
}

async function insertLead(body, env) {
  const row = leadRow(body);
  if (!row.name || !row.phone) {
    return { status: 200, json: { ok: false, stored: false, reason: 'invalid' } };
  }
  const supabase = supabaseEnv(env);
  if (!supabase) {
    return { status: 200, json: { ok: false, stored: false, reason: 'missing_env' } };
  }
  try {
    const response = await fetch(`${supabase.url}/rest/v1/quote_leads`, {
      method: 'POST',
      headers: {
        apikey: supabase.key,
        Authorization: `Bearer ${supabase.key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(row)
    });
    if (!response.ok) {
      return { status: 200, json: { ok: false, stored: false, reason: 'insert_failed' } };
    }
    return { status: 200, json: { ok: true, stored: true } };
  } catch {
    return { status: 200, json: { ok: false, stored: false, reason: 'request_failed' } };
  }
}

async function listLeads(headers, env) {
  const expected = String(env.QUOTE_LEADS_ADMIN_TOKEN || '');
  if (!expected) {
    return { status: 200, json: { ok: false, stored: false, reason: 'missing_admin_token', leads: [] } };
  }
  const provided = header(headers, 'x-admin-token');
  if (provided !== expected) {
    return { status: 401, json: { ok: false, reason: 'unauthorized', leads: [] } };
  }
  const supabase = supabaseEnv(env);
  if (!supabase) {
    return { status: 200, json: { ok: false, stored: false, reason: 'missing_env', leads: [] } };
  }
  try {
    const response = await fetch(
      `${supabase.url}/rest/v1/quote_leads?select=id,created_at,name,phone,quantity,company,email,use_case,branding,deadline,notes,sample_kit,season,source_page,step,journal_type,quantity_tier,branding_method&order=created_at.desc&limit=50`,
      {
        headers: {
          apikey: supabase.key,
          Authorization: `Bearer ${supabase.key}`
        }
      }
    );
    if (!response.ok) {
      return { status: 200, json: { ok: false, stored: false, reason: 'read_failed', leads: [] } };
    }
    const leads = await response.json();
    return { status: 200, json: { ok: true, stored: true, leads: Array.isArray(leads) ? leads : [] } };
  } catch {
    return { status: 200, json: { ok: false, stored: false, reason: 'request_failed', leads: [] } };
  }
}

export async function handleQuoteLead({ method, body = {}, headers = {}, env = process.env } = {}) {
  if (method === 'OPTIONS') return { status: 200, json: { ok: true } };
  if (method === 'GET') return listLeads(headers, env);
  if (method === 'POST') return insertLead(body, env);
  return { status: 405, json: { ok: false, stored: false, reason: 'method' } };
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-token');
  const result = await handleQuoteLead({
    method: req.method,
    body: req.method === 'POST' ? await readBody(req) : {},
    headers: req.headers,
    env: process.env
  });
  res.status(result.status).json(result.json);
}
