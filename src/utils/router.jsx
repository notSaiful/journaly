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

export function RouterProvider({ children }) {
  const getInitialPath = () => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      // Handle legacy hash routing for compliance crawlers
      if (hash === '#terms' || hash === '#/terms-and-conditions') return '/terms-and-conditions';
      if (hash === '#privacy' || hash === '#/privacy-policy') return '/privacy-policy';
      if (hash === '#refund' || hash === '#refund-policy' || hash === '#/refund-cancellation-policy') return '/refund-cancellation-policy';
      if (hash === '#shipping' || hash === '#shipping-policy' || hash === '#/shipping-delivery-policy') return '/shipping-delivery-policy';
      if (hash === '#contact' || hash === '#contact-us' || hash === '#/contact') return '/contact';
      if (hash === '#grievance' || hash === '#grievance-redressal' || hash === '#/grievance-redressal') return '/grievance-redressal';
      if (hash === '#faq' || hash === '#/faq') return '/faq';
      return window.location.pathname || '/';
    }
    return '/';
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
      const hash = window.location.hash.toLowerCase();
      let path = window.location.pathname || '/';
      if (hash === '#terms' || hash === '#/terms-and-conditions') path = '/terms-and-conditions';
      else if (hash === '#privacy' || hash === '#/privacy-policy') path = '/privacy-policy';
      else if (hash === '#refund' || hash === '#refund-policy' || hash === '#/refund-cancellation-policy') path = '/refund-cancellation-policy';
      else if (hash === '#shipping' || hash === '#shipping-policy' || hash === '#/shipping-delivery-policy') path = '/shipping-delivery-policy';
      else if (hash === '#contact' || hash === '#contact-us' || hash === '#/contact') path = '/contact';
      else if (hash === '#grievance' || hash === '#grievance-redressal' || hash === '#/grievance-redressal') path = '/grievance-redressal';
      else if (hash === '#faq' || hash === '#/faq') path = '/faq';

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
