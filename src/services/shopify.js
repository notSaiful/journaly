/**
 * JOURNALY — Shopify Headless Storefront & Checkout Integration
 *
 * Supports:
 * 1. Shopify Storefront GraphQL API (cartCreate -> instant checkout redirect)
 * 2. Shopify Direct Cart Permalinks (https://{domain}/cart/{variantId}:{qty})
 * 3. Graceful fallback to Razorpay Live if Shopify credentials are not yet configured
 */

const STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '';
const STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
const SHOPIFY_API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-07';

export function isShopifyConfigured() {
  return Boolean(STORE_DOMAIN && STORE_DOMAIN.trim() !== '');
}

export function getCleanShopifyDomain() {
  if (!STORE_DOMAIN) return '';
  return STORE_DOMAIN.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

/**
 * Creates a Shopify Cart via Storefront GraphQL API or Cart Permalink and returns checkout URL.
 */
export async function createShopifyCheckout(cartItems = []) {
  const domain = getCleanShopifyDomain();
  if (!domain) {
    throw new Error('Shopify store domain is not configured.');
  }

  // Format line items for Shopify
  const lines = cartItems
    .map((item) => {
      const variantId = item.shopifyVariantId || import.meta.env.VITE_SHOPIFY_VARIANT_ID;
      const merchandiseId = variantId?.toString().startsWith('gid://')
        ? variantId
        : variantId
        ? `gid://shopify/ProductVariant/${variantId}`
        : null;

      return {
        merchandiseId,
        quantity: item.quantity || 1
      };
    })
    .filter((line) => line.merchandiseId !== null);

  // If Storefront token exists, use Storefront GraphQL API
  if (STOREFRONT_ACCESS_TOKEN && lines.length > 0) {
    const mutation = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            code
            field
            message
          }
        }
      }
    `;

    try {
      const res = await fetch(`https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN
        },
        body: JSON.stringify({
          query: mutation,
          variables: { input: { lines } }
        })
      });

      const json = await res.json();
      if (json?.data?.cartCreate?.cart?.checkoutUrl) {
        return json.data.cartCreate.cart.checkoutUrl;
      }
    } catch (e) {
      console.warn('Storefront API call error, falling back to permalink:', e);
    }
  }

  // Fallback to official Cart Permalink: https://{domain}/cart/{variantId}:{qty}
  const defaultVariantId = import.meta.env.VITE_SHOPIFY_VARIANT_ID;
  const validItems = cartItems
    .map((item) => ({
      id: item.shopifyVariantId || defaultVariantId,
      quantity: item.quantity || 1
    }))
    .filter((it) => Boolean(it.id));

  if (validItems.length > 0) {
    const segments = validItems.map((it) => `${it.id}:${it.quantity}`).join(',');
    return `https://${domain}/cart/${segments}`;
  }

  return `https://${domain}/cart`;
}
