import { useEffect } from 'react';
import { useRouter } from '../utils/router';
import { PRODUCTS } from '../data/products';

const SITE_URL = 'https://journaly.in';

const ROUTE_SEO = {
  '/': {
    title: 'JOURNALY — 5-Minute Habit Journals & Life Record | India',
    description: 'Build an effortless 5-minute daily journaling habit with IntelligentLab researched questions. 9 out of 10 people build lasting habits. Free express delivery in India from ₹349.',
    keywords: '5 minute journal India, gratitude journal, manifestation journal, guided diary, IntelligentLab habit research, daily journaling habit, record life memories, Journaly',
    image: 'https://journaly.in/images/hero_journal_desk_1791006815772.jpg'
  },
  '/shop': {
    title: 'The Meadow Diary — 5-Minute Guided Habit Diary | JOURNALY India',
    description: 'The Meadow Diary (₹599) — “The secret of getting ahead is getting started.” Researched questions by IntelligentLab to quiet morning overthinking and record your life in 5 minutes. Free express delivery in India with 7-day returns.',
    keywords: 'the meadow diary, 5 minute journal India, guided habit diary, IntelligentLab research, daily journaling habit',
    image: 'https://journaly.in/images/journal-guided-meadow-front.jpg'
  },
  '/five-minute-habit': {
    title: 'The 5-Minute Daily Habit — IntelligentLab Researched Framework | JOURNALY',
    description: 'Discover how 3 minutes in the morning and 2 minutes in the evening helps 9 out of 10 people eliminate blank-page dread, quiet mental noise, and preserve life memories.',
    keywords: '5 minute journaling habit, journaling science, IntelligentLab research, how to build a journaling habit, morning routine',
    image: 'https://journaly.in/images/journal-floral-coffee-desk.png'
  },
  '/track-order': {
    title: 'Track Your Order — BlueDart & Delhivery Live Courier Tracking | JOURNALY',
    description: 'Track your JOURNALY order fulfillment and real-time shipment status across India via BlueDart Express and Delhivery Surface using your Order ID or phone number.',
    keywords: 'track journaly order, courier status, delivery tracking India, bluedart, delhivery',
    image: 'https://journaly.in/images/hero_journal_desk_1791006815772.jpg'
  },
  '/about': {
    title: 'Our Mission & IntelligentLab Partnership | JOURNALY',
    description: 'Learn why JOURNALY partners with IntelligentLab to design researched questions that remove cognitive friction and help you record the real story of your life.',
    keywords: 'about journaly, intelligentlab partnership, habit formation science, journaling philosophy',
    image: 'https://journaly.in/images/journal-floral-stand.png'
  },
  '/faq': {
    title: 'Frequently Asked Questions — 5-Minute Journaling Habit | JOURNALY',
    description: 'Answers to common questions about our 5-minute habit format, IntelligentLab research, hassle-free 7-day returns, and express delivery in India.',
    keywords: 'journaling questions, habit FAQ, 7 day return policy, shipping times India',
    image: 'https://journaly.in/images/journal-daisy-angle.jpg'
  },
  '/contact': {
    title: 'Contact Customer Support & Help Desk | JOURNALY India',
    description: 'Reach out to the JOURNALY support team for order inquiries, corporate partnerships, or habit guidance. Based in India with 24/7 email and WhatsApp support.',
    keywords: 'contact journaly, customer care, support email, phone number',
    image: 'https://journaly.in/images/hero_journal_desk_1791006815772.jpg'
  },
  '/business': {
    title: 'Corporate Gifting & Mindful Team Wellbeing | JOURNALY',
    description: 'Bring the 5-minute mental reset habit to your company. Custom brand embossing, bulk volume pricing, and nationwide dispatch across India.',
    keywords: 'corporate gifting India, employee mental wellbeing, custom branded journals, bulk diaries',
    image: 'https://journaly.in/images/journal-floral-gift-box.png'
  },
  '/privacy-policy': {
    title: 'Privacy Policy | JOURNALY India',
    description: 'Read the official privacy and data protection policy of JOURNALY India. We protect customer details and payment data with end-to-end encryption.',
    keywords: 'privacy policy, data protection, journaly terms'
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions of Service | JOURNALY India',
    description: 'Terms of service, purchasing conditions, and user rights for JOURNALY products and services across India.',
    keywords: 'terms of service, customer agreement, journaly legal'
  },
  '/shipping-delivery-policy': {
    title: 'Shipping & Delivery Policy — Express Courier India | JOURNALY',
    description: 'Fast, secure shipping across all Indian pincodes via BlueDart and Delhivery. Typical delivery within 3–5 business days.',
    keywords: 'shipping policy, delivery timeframe India, bluedart tracking'
  },
  '/refund-cancellation-policy': {
    title: 'Refund & Returns Policy | JOURNALY India',
    description: 'Our hassle-free 7-day return policy. If you change your mind, contact us within 7 days of delivery for a seamless return and full refund.',
    keywords: 'refund policy, cancellation, 7 day returns, journal returns'
  },
  '/admin': {
    title: 'Admin Fulfillment Portal | JOURNALY',
    description: 'Secure operational order fulfillment and tracking administration.',
    noIndex: true
  }
};

export default function SEOHead() {
  const { currentPath, params } = useRouter();

  useEffect(() => {
    // 1. Determine active page metadata
    let pageMeta = ROUTE_SEO[currentPath];

    // Handle dynamic product pages: /product/:id
    if (!pageMeta && currentPath.startsWith('/product/')) {
      const prodId = params.productId || currentPath.replace('/product/', '').split('/')[0];
      const product = PRODUCTS.find((p) => p.id === prodId || p.slug === prodId);

      if (product) {
        pageMeta = {
          title: `${product.name} (₹${product.price}) | JOURNALY`,
          description: `${product.subtitle} Researched questions by IntelligentLab. 9/10 people build a lasting daily habit. Free express delivery in India with hassle-free 7-day returns.`,
          keywords: `${product.name}, 5 minute habit, ${product.category} journal, buy online India, ₹${product.price}`,
          image: `${SITE_URL}${product.image}`,
          isProduct: true,
          product
        };
      }
    }

    if (!pageMeta) {
      pageMeta = ROUTE_SEO['/'];
    }

    // 2. Update document.title
    if (pageMeta.title) {
      document.title = pageMeta.title;
    }

    // 3. Helper to update or create meta tags
    const setMetaTag = (selector, attribute, value, content) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, value);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 4. Helper to update canonical link
    const setCanonical = (href) => {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Update primary meta tags
    if (pageMeta.description) {
      setMetaTag('meta[name="description"]', 'name', 'description', pageMeta.description);
    }
    if (pageMeta.keywords) {
      setMetaTag('meta[name="keywords"]', 'name', 'keywords', pageMeta.keywords);
    }

    // Update robots directive (Disallow admin indexing)
    if (pageMeta.noIndex) {
      setMetaTag('meta[name="robots"]', 'name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // Update Canonical URL
    const canonicalUrl = `${SITE_URL}${currentPath === '/' ? '' : currentPath}`;
    setCanonical(canonicalUrl);

    // Update Open Graph tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', pageMeta.title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', pageMeta.description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    if (pageMeta.image) {
      setMetaTag('meta[property="og:image"]', 'property', 'og:image', pageMeta.image);
    }

    // Update Twitter Cards
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', pageMeta.title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', pageMeta.description);
    if (pageMeta.image) {
      setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', pageMeta.image);
    }

    // 5. Dynamic Route Schema (Product Specific)
    let dynamicSchemaScript = document.getElementById('route-dynamic-schema');
    if (!dynamicSchemaScript) {
      dynamicSchemaScript = document.createElement('script');
      dynamicSchemaScript.id = 'route-dynamic-schema';
      dynamicSchemaScript.type = 'application/ld+json';
      document.head.appendChild(dynamicSchemaScript);
    }

    if (pageMeta.isProduct && pageMeta.product) {
      const p = pageMeta.product;
      const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        image: `${SITE_URL}${p.image}`,
        description: p.description,
        sku: p.id,
        brand: {
          '@type': 'Brand',
          name: 'JOURNALY'
        },
        offers: {
          '@type': 'Offer',
          url: canonicalUrl,
          priceCurrency: 'INR',
          price: p.price,
          availability: p.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          itemCondition: 'https://schema.org/NewCondition',
          priceValidUntil: '2027-12-31',
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'IN',
            returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
            merchantReturnDays: 7,
            returnMethod: 'https://schema.org/ReturnByMail',
            returnFees: 'https://schema.org/FreeReturn'
          },
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: '0',
              currency: 'INR'
            },
            shippingDestination: {
              '@type': 'DefinedRegion',
              addressCountry: 'IN'
            },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              handlingTime: {
                '@type': 'QuantitativeValue',
                minValue: 0,
                maxValue: 1,
                unitCode: 'DAY'
              },
              transitTime: {
                '@type': 'QuantitativeValue',
                minValue: 2,
                maxValue: 4,
                unitCode: 'DAY'
              }
            }
          }
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: p.rating,
          reviewCount: p.reviewCount,
          bestRating: 5,
          worstRating: 1
        }
      };
      dynamicSchemaScript.text = JSON.stringify(productSchema);
    } else {
      // Breadcrumb list for standard pages
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL
          },
          ...(currentPath !== '/'
            ? [
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: pageMeta.title.split('—')[0].trim(),
                  item: canonicalUrl
                }
              ]
            : [])
        ]
      };
      dynamicSchemaScript.text = JSON.stringify(breadcrumbSchema);
    }
  }, [currentPath, params]);

  return null;
}
