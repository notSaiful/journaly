/**
 * Automated Shopify Admin Sync Script
 * 
 * Usage:
 *   node scripts/sync-to-shopify-api.js <myshopify-store-domain> <admin-access-token>
 * 
 * Or set environment variables:
 *   SHOPIFY_STORE_DOMAIN=yourstore.myshopify.com
 *   SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxx
 *   node scripts/sync-to-shopify-api.js
 */

import { PRODUCTS } from '../src/data/products.js';

const domain = process.argv[2] || process.env.SHOPIFY_STORE_DOMAIN || process.env.VITE_SHOPIFY_STORE_DOMAIN;
const token = process.argv[3] || process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!domain || !token) {
  console.log(`
======================================================
  JOURNALY -> SHOPIFY DIRECT API SYNC
======================================================

To automatically create all 7 products in Shopify via API, run:
  node scripts/sync-to-shopify-api.js <your-store>.myshopify.com <admin-access-token>

Requirements:
  1. Store domain (e.g. journaly-store.myshopify.com)
  2. Shopify Admin Access Token (starts with shpat_...)
     Obtained from Shopify Admin > Settings > Apps and sales channels > Develop apps > Create an app > Configure Admin API scopes (write_products) > Install app

Alternatively, you can 1-click import the pre-built CSV file:
  File path: shopify_products_export.csv
  Direct URL: https://journaly.in/shopify_products_export.csv
======================================================
  `);
  process.exit(0);
}

const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
const API_URL = `https://${cleanDomain}/admin/api/2024-01/products.json`;

async function syncProducts() {
  console.log(`Connecting to Shopify Store: ${cleanDomain}...`);

  for (const product of PRODUCTS) {
    console.log(`\nUploading: ${product.name} (₹${product.price})...`);

    const bodyHtml = `
<p><strong>${product.tagline}</strong></p>
<p>${product.description}</p>
<h3>IntelligentLab Research Highlight</h3>
<p><em>${product.researchHighlight.stat} ${product.researchHighlight.claim}.</em> ${product.researchHighlight.summary}</p>
<h3>Key Benefits</h3>
<ul>${product.valuePoints.map((v) => `<li><strong>${v.title}:</strong> ${v.desc}</li>`).join('')}</ul>
<h3>Specifications</h3>
<ul>${Object.entries(product.specs).map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`).join('')}</ul>
<h3>Features</h3>
<ul>${product.features.map((f) => `<li>${f}</li>`).join('')}</ul>
<p><strong>Shipping:</strong> Free express courier delivery across India via BlueDart and Delhivery.</p>
<p><strong>Returns:</strong> Hassle-free 7-day returns if you change your mind.</p>
    `.trim();

    const images = (product.images || [product.image]).map((img) => ({
      src: img.startsWith('http') ? img : `https://journaly.in${img}`
    }));

    const payload = {
      product: {
        title: `${product.name} — 5-Minute Habit Journal`,
        body_html: bodyHtml,
        vendor: 'JOURNALY',
        product_type: product.category === 'gratitude' ? 'Gratitude Journal' : product.category === 'manifestation' ? 'Manifestation Journal' : 'Guided Journal',
        tags: `journal, 5-minute habit, IntelligentLab, ${product.category}, India`,
        status: 'active',
        images: images,
        variants: [
          {
            price: product.price.toFixed(2),
            compare_at_price: product.originalPrice ? product.originalPrice.toFixed(2) : null,
            sku: product.id,
            inventory_management: 'shopify',
            inventory_quantity: 50,
            weight: 350,
            weight_unit: 'g',
            requires_shipping: true,
            taxable: true
          }
        ]
      }
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': token
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.product) {
        console.log(`✓ Created: ${data.product.title} (ID: ${data.product.id}, Variant ID: ${data.product.variants[0]?.id})`);
      } else {
        console.error(`✗ Error creating ${product.name}:`, JSON.stringify(data.errors || data));
      }
    } catch (err) {
      console.error(`✗ Network error for ${product.name}:`, err.message);
    }
  }

  console.log('\nSync operation complete!');
}

syncProducts();
