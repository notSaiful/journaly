import { useEffect } from 'react';
import { useRouter } from '../utils/router';
import Navbar from './Navbar';
import Footer from './Footer';
import LegalLayout from './legal/LegalLayout';
import HomePage from '../pages/HomePage';
import CorporateGiftingPage from '../pages/CorporateGiftingPage';
import CustomizationPage from '../pages/CustomizationPage';
import BusinessPage from '../pages/BusinessPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import FaqPage from '../pages/FaqPage';
import AdminPortalPage from '../pages/AdminPortalPage';
import NotFoundPage from '../pages/NotFoundPage';
import SeasonPage from '../pages/SeasonPage';
import SeasonBanner from './b2b/SeasonBanner';
import { FloatingWhatsApp, StickyQuoteBar } from './b2b/ConversionBars';
import { pageByPath } from '../config/seasons';
import { legacyRedirect } from '../config/legacyRedirects';

function legalPolicy(path) {
  if (path === '/terms-and-conditions') return 'terms';
  if (path === '/privacy-policy') return 'privacy';
  if (path === '/refund-cancellation-policy') return 'refund';
  if (path === '/shipping-delivery-policy') return 'shipping';
  if (path === '/grievance-redressal') return 'grievance';
  return null;
}

function PageSwitch({ path }) {
  if (path === '/') return <HomePage />;
  if (path === '/corporate-gifting') return <CorporateGiftingPage />;
  if (path === '/customization') return <CustomizationPage />;
  if (path === '/business') return <BusinessPage />;
  if (path === '/about') return <AboutPage />;
  if (path === '/contact') return <ContactPage />;
  if (path === '/faq') return <FaqPage />;
  if (path === '/admin') return <AdminPortalPage />;
  if (pageByPath(path)) return <SeasonPage path={path} />;
  if (path === '/404') return <NotFoundPage />;
  return <NotFoundPage />;
}

export default function SiteFrame() {
  const { currentPath, search, navigate } = useRouter();
  const destination = legacyRedirect(currentPath);

  useEffect(() => {
    if (destination) navigate(search ? `${destination}${search}` : destination, true);
  }, [destination, navigate, search]);

  const path = destination || currentPath;
  const policy = legalPolicy(path);

  if (policy) {
    const handleLegalTabChange = (policyId) => {
      if (policyId === 'terms') navigate('/terms-and-conditions');
      else if (policyId === 'privacy') navigate('/privacy-policy');
      else if (policyId === 'refund') navigate('/refund-cancellation-policy');
      else if (policyId === 'shipping') navigate('/shipping-delivery-policy');
      else if (policyId === 'grievance') navigate('/grievance-redressal');
      else if (policyId === 'contact') navigate('/contact');
    };

    return (
      <>
        <LegalLayout
          activePolicy={policy}
          setActivePolicy={handleLegalTabChange}
          onClose={() => navigate('/')}
        />
        <StickyQuoteBar />
        <FloatingWhatsApp />
      </>
    );
  }

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded-full">
        Skip to content
      </a>
      <Navbar />
      {path === '/admin' ? null : <SeasonBanner />}
      <main id="main" className="flex-1 pb-20 md:pb-0">
        <PageSwitch path={path} />
      </main>
      <Footer />
      {path === '/admin' ? null : (
        <>
          <StickyQuoteBar />
          <FloatingWhatsApp />
        </>
      )}
    </>
  );
}
