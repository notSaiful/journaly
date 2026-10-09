import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PRODUCTS } from '../src/data/products.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const escapeCsv = (str) => {
  if (str === null || str === undefined) return '';
  const s = String(str);
  if (s.includes('"') || s.includes(',') || s.includes('\n') || s.includes('\r')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
};

const headers = [
  'Handle',
  'Title',
  'Body (HTML)',
  'Vendor',
  'Product Category',
  'Type',
  'Tags',
  'Published',
  'Option1 Name',
  'Option1 Value',
  'Option2 Name',
  'Option2 Value',
  'Option3 Name',
  'Option3 Value',
  'Variant SKU',
  'Variant Grams',
  'Variant Inventory Tracker',
  'Variant Inventory Qty',
  'Variant Inventory Policy',
  'Variant Fulfillment Service',
  'Variant Price',
  'Variant Compare At Price',
  'Variant Requires Shipping',
  'Variant Taxable',
  'Variant Barcode',
  'Image Src',
  'Image Position',
  'Image Alt Text',
  'Gift Card',
  'SEO Title',
  'SEO Description',
  'Google Shopping / Google Product Category',
  'Google Shopping / Gender',
  'Google Shopping / Age Group',
  'Google Shopping / MPN',
  'Google Shopping / Condition',
  'Google Shopping / Custom Product',
  'Google Shopping / Custom Label 0',
  'Google Shopping / Custom Label 1',
  'Google Shopping / Custom Label 2',
  'Google Shopping / Custom Label 3',
  'Google Shopping / Custom Label 4',
  'Variant Image',
  'Variant Weight Unit',
  'Variant Tax Code',
  'Cost per item',
  'Status'
];

const rows = [];

PRODUCTS.forEach((product) => {
  const handle = product.slug || product.id;

  // Build clean HTML description
  const bodyHtml = `
<p><strong>${product.tagline}</strong></p>
<p>${product.description}</p>

<h3>IntelligentLab Research Highlight</h3>
<p><em>${product.researchHighlight.stat} ${product.researchHighlight.claim}.</em> ${product.researchHighlight.summary}</p>

<h3>Key Benefits</h3>
<ul>
${product.valuePoints.map((v) => `  <li><strong>${v.title}:</strong> ${v.desc}</li>`).join('\n')}
</ul>

<h3>Specifications</h3>
<ul>
${Object.entries(product.specs).map(([k, v]) => `  <li><strong>${k}:</strong> ${v}</li>`).join('\n')}
</ul>

<h3>Features</h3>
<ul>
${product.features.map((f) => `  <li>${f}</li>`).join('\n')}
</ul>

<p><strong>Shipping:</strong> Free express courier delivery across India via BlueDart and Delhivery.</p>
<p><strong>Returns:</strong> Hassle-free 7-day returns if you change your mind.</p>
`.trim();

  const tags = [
    'journal',
    '5-minute habit',
    'IntelligentLab',
    product.category,
    'India',
    'stationery',
    'self-care'
  ].join(', ');

  const images = (product.images && product.images.length > 0) ? product.images : [product.image];

  images.forEach((img, index) => {
    const isFirstRow = index === 0;
    const fullImageUrl = img.startsWith('http') 
      ? img 
      : `https://raw.githubusercontent.com/notSaiful/journaly/main/public${img}`;

    if (isFirstRow) {
      rows.push([
        handle,                                              // Handle
        `${product.name} — 5-Minute Habit Journal`,          // Title
        bodyHtml,                                            // Body (HTML)
        'JOURNALY',                                          // Vendor
        'Office Supplies > Stationery & Notebooks > Notebooks & Notepads', // Product Category
        product.category === 'gratitude' ? 'Gratitude Journal' : product.category === 'manifestation' ? 'Manifestation Journal' : 'Guided Journal', // Type
        tags,                                                // Tags
        'true',                                              // Published
        'Title',                                             // Option1 Name
        'Default Title',                                     // Option1 Value
        '',                                                  // Option2 Name
        '',                                                  // Option2 Value
        '',                                                  // Option3 Name
        '',                                                  // Option3 Value
        product.id,                                          // Variant SKU
        '350',                                               // Variant Grams
        'shopify',                                           // Variant Inventory Tracker
        '50',                                                // Variant Inventory Qty
        'deny',                                              // Variant Inventory Policy
        'manual',                                            // Variant Fulfillment Service
        product.price.toFixed(2),                            // Variant Price
        product.originalPrice ? product.originalPrice.toFixed(2) : '', // Variant Compare At Price
        'true',                                              // Variant Requires Shipping
        'true',                                              // Variant Taxable
        '',                                                  // Variant Barcode
        fullImageUrl,                                        // Image Src
        String(index + 1),                                   // Image Position
        `${product.name} cover - JOURNALY`,                  // Image Alt Text
        'false',                                             // Gift Card
        `${product.name} (₹${product.price}) | JOURNALY`,    // SEO Title
        `${product.subtitle} Free express delivery across India with 7-day returns.`, // SEO Description
        '',                                                  // Google Shopping / Google Product Category
        '',                                                  // Gender
        '',                                                  // Age Group
        '',                                                  // MPN
        'new',                                               // Condition
        '',                                                  // Custom Product
        '',                                                  // Custom Label 0
        '',                                                  // Custom Label 1
        '',                                                  // Custom Label 2
        '',                                                  // Custom Label 3
        '',                                                  // Custom Label 4
        '',                                                  // Variant Image
        'g',                                                 // Variant Weight Unit
        '',                                                  // Variant Tax Code
        '',                                                  // Cost per item
        'active'                                             // Status
      ]);
    } else {
      // Subsequent image rows only need Handle, Image Src, Image Position, Image Alt Text
      rows.push([
        handle,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        fullImageUrl,
        String(index + 1),
        `${product.name} angle ${index + 1} - JOURNALY`,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      ]);
    }
  });
});

const csvContent = [
  headers.map(escapeCsv).join(','),
  ...rows.map((row) => row.map(escapeCsv).join(','))
].join('\n');

const publicCsvPath = path.resolve(__dirname, '../public/shopify_products_export.csv');
const rootCsvPath = path.resolve(__dirname, '../shopify_products_export.csv');

fs.writeFileSync(publicCsvPath, csvContent, 'utf-8');
fs.writeFileSync(rootCsvPath, csvContent, 'utf-8');

console.log(`Generated Shopify CSV with ${rows.length} rows across ${PRODUCTS.length} products!`);
console.log(`Written to:`);
console.log(`  1. ${publicCsvPath}`);
console.log(`  2. ${rootCsvPath}`);
