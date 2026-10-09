# JOURNALY — Complete Native Shopify Mode Setup

This directory contains everything required to run **JOURNALY (journaly.in)** 100% natively on Shopify.

---

## Step 1: Point Your Domain (`journaly.in`) to Shopify

Vercel has been completely removed and paused. Now point your domain DNS directly to Shopify:

1. Log into your domain registrar (Hostinger / DNS Management).
2. Update/Add these two DNS records:
   - **A Record**:
     - Host: `@` (or leave blank)
     - Points to: `23.227.38.65` (Shopify's IP)
     - TTL: `300` (or 1/2 hour)
   - **CNAME Record**:
     - Host: `www`
     - Points to: `shops.myshopify.com`
     - TTL: `300` (or 1/2 hour)
3. In **Shopify Admin**:
   - Go to **Settings > Domains**.
   - Click **Connect existing domain**.
   - Enter `journaly.in`.
   - Click **Verify connection**.
   - Set `journaly.in` (or `www.journaly.in`) as your **Primary domain**. Shopify will automatically issue a free SSL certificate.

---

## Step 2: Import All 7 Products (1-Click)

The file `shopify_products_export.csv` contains all 7 products with full descriptions, pricing, inventory, and **36 hosted high-resolution images** served via GitHub Raw:

1. In **Shopify Admin**, click **Products** in the left sidebar.
2. Click **Import** (top right).
3. Select `shopify_products_export.csv`.
4. Click **Upload and continue** -> **Import products**.

All 7 editions will be created:
- The Daisy Journal (₹599 / Compare ₹799)
- The Bloom Journal (₹349 / Compare ₹499)
- The Coral Intention (₹499 / Compare ₹699)
- The Calm Haven (₹599 / Compare ₹799)
- The Contour Diary (₹599 / Compare ₹799)
- The Sage Botanica (₹349 / Compare ₹499)
- The Lavender Intention (₹499 / Compare ₹699)

---

## Step 3: Add Brand Pages & Policies

### Pages (`shopify_assets/PAGES/`)
Go to **Online Store > Pages > Add page**:
- **About Us & Science:** Paste HTML from `PAGES/about-us.html` (Title: *About & Habit Science*)
- **FAQ:** Paste HTML from `PAGES/faq.html` (Title: *Frequently Asked Questions*)
- **Track Order:** Paste HTML from `PAGES/track-order.html` (Title: *Track Order*)

### Store Policies (`shopify_assets/POLICIES/`)
Go to **Settings > Policies**:
- **Refund Policy:** Paste from `POLICIES/refund-policy.html` (7-day returns)
- **Shipping Policy:** Paste from `POLICIES/shipping-policy.html` (Free shipping via BlueDart & Delhivery)
- **Terms of Service:** Paste from `POLICIES/terms-of-service.html`
- **Privacy Policy:** Paste from `POLICIES/privacy-policy.html`

### Brand Styling (`shopify_assets/THEME/`)
Go to **Online Store > Themes > Customize**:
- Click **Theme settings** (gear icon) -> **Custom CSS**.
- Paste the CSS from `THEME/journaly-brand-styles.css`.
- This applies the cream `#FAF7F2` backdrop, elegant serif headings, and signature white buttons with dark borders (`border: 2px solid #1E1B18`).

---

## Step 4: Contact Details Configured Across All Files
- **Customer Care Email:** saifulbusiness47@gmail.com
- **WhatsApp & Phone Support:** +91 96998 97763
