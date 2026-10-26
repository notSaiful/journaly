import React, { createContext, useContext, useState, useEffect } from 'react';
import { trackFunnel } from './funnel';

const RouterContext = createContext({
  currentPath: '/',
  search: '',
  navigate: () => {},
  params: {}
});

export function useRouter() {
  return useContext(RouterContext);
}

function normalizePath(path) {
  if (!path) return '/';
  const withoutQuery = String(path).split('?')[0].split('#')[0];
  if (withoutQuery.length > 1 && withoutQuery.endsWith('/')) return withoutQuery.slice(0, -1);
  return withoutQuery || '/';
}

function splitHref(path) {
  const raw = String(path || '/');
  const noHash = raw.split('#')[0];
  const [pathname, query = ''] = noHash.split('?');
  return {
    pathname: normalizePath(pathname),
    search: query ? `?${query}` : ''
  };
}

function pathFromLocation() {
  if (typeof window === 'undefined') return '/';
  const hash = window.location.hash.toLowerCase();
  if (hash === '#terms' || hash === '#/terms-and-conditions') return '/terms-and-conditions';
  if (hash === '#privacy' || hash === '#/privacy-policy') return '/privacy-policy';
  if (hash === '#refund' || hash === '#refund-policy' || hash === '#/refund-cancellation-policy') return '/refund-cancellation-policy';
  if (hash === '#shipping' || hash === '#shipping-policy' || hash === '#/shipping-delivery-policy') return '/shipping-delivery-policy';
  if (hash === '#contact' || hash === '#contact-us' || hash === '#/contact') return '/contact';
  if (hash === '#grievance' || hash === '#grievance-redressal' || hash === '#/grievance-redressal') return '/grievance-redressal';
  if (hash === '#faq' || hash === '#/faq') return '/faq';
  return normalizePath(window.location.pathname || '/');
}

export function RouterProvider({ children, initialPath }) {
  const getInitialPath = () => {
    if (typeof initialPath === 'string') return normalizePath(initialPath);
    return pathFromLocation();
  };

  const getParamsForPath = (path) => {
    if (path.startsWith('/product/')) {
      const id = path.replace('/product/', '').split('/')[0];
      return { productId: id };
    }
    return {};
  };

  const [currentPath, setCurrentPath] = useState(getInitialPath);
  const [search, setSearch] = useState(() => (typeof window === 'undefined' ? '' : window.location.search || ''));
  const [params, setParams] = useState(() => getParamsForPath(getInitialPath()));

  useEffect(() => {
    const handlePopState = () => {
      const path = pathFromLocation();
      setCurrentPath(path);
      setSearch(window.location.search || '');
      setParams(getParamsForPath(path));
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (path, replace = false) => {
    const next = splitHref(path);
    if (typeof window !== 'undefined') {
      const href = `${next.pathname}${next.search}`;
      if (replace) window.history.replaceState({}, '', href);
      else window.history.pushState({}, '', href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentPath(next.pathname);
    setSearch(next.search);
    setParams(getParamsForPath(next.pathname));
  };

  useEffect(() => {
    trackFunnel('page_view', { path: currentPath });
  }, [currentPath]);

  return (
    <RouterContext.Provider value={{ currentPath, search, navigate, params }}>
      {children}
    </RouterContext.Provider>
  );
}
