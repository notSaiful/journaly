import React, { createContext, useContext, useState, useEffect } from 'react';
import { trackEvent } from './analytics';

const RouterContext = createContext({
  currentPath: '/',
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
  const [params, setParams] = useState(() => getParamsForPath(getInitialPath()));

  useEffect(() => {
    const handlePopState = () => {
      const path = pathFromLocation();
      setCurrentPath(path);
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
    if (typeof window !== 'undefined') {
      if (replace) {
        window.history.replaceState({}, '', path);
      } else {
        window.history.pushState({}, '', path);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentPath(path);
    setParams(getParamsForPath(path));
    trackEvent('page_view', { path });
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate, params }}>
      {children}
    </RouterContext.Provider>
  );
}
