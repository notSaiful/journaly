import { useEffect } from 'react';
import { useRouter } from '../utils/router';
import { buildJsonLd, getMetaForPath } from '../seo/metadata';

function setMeta(selector, attribute, value, content) {
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export default function SEOHead() {
  const { currentPath } = useRouter();

  useEffect(() => {
    const meta = getMetaForPath(currentPath);
    document.title = meta.title;
    setMeta('meta[name="description"]', 'name', 'description', meta.description);
    setMeta('meta[name="keywords"]', 'name', 'keywords', meta.keywords || '');
    setMeta('meta[name="robots"]', 'name', 'robots', meta.robots);
    setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', meta.path === '/' ? 'https://journaly.in/' : `https://journaly.in${meta.path}`);
    if (meta.image) {
      const image = meta.image.startsWith('http') ? meta.image : `https://journaly.in${meta.image}`;
      setMeta('meta[property="og:image"]', 'property', 'og:image', image);
      setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);
    }
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const canonicalHref = meta.noIndex ? 'https://journaly.in/' : (meta.path === '/' ? 'https://journaly.in/' : `https://journaly.in${meta.path}`);
    canonical.setAttribute('href', canonicalHref);

    let schema = document.getElementById('route-schema');
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'route-schema';
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(buildJsonLd(meta));
  }, [currentPath]);

  return null;
}
