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
import ShopPage from '../pages/ShopPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import FiveMinuteHabitPage from '../pages/FiveMinuteHabitPage';
import TrackOrderPage from '../pages/TrackOrderPage';
import OrderSuccessPage from '../pages/OrderSuccessPage';
import AdminPortalPage from '../pages/AdminPortalPage';
import NotFoundPage from '../pages/NotFoundPage';

const ALIASES = {
  '/quote': '/business',
  '/collections': '/shop',
  '/personalise': '/shop',
  '/gifts': '/shop'
};

function legalPolicy(path) {
  if (path === '/terms-and-conditions') return 'terms';
  if (path === '/privacy-policy') return 'privacy';
  if (path === '/refund-cancellation-policy') return 'refund';
  if (path === '/shipping-delivery-policy') return 'shipping';
  if (path === '/grievance-redressal') return 'grievance';
  return null;
}

function PageSwitch({ path, onAddToCart, onQuickView }) {
  if (path === '/' ) return <HomePage />;
  if (path === '/corporate-gifting') return <CorporateGiftingPage />;
  if (path === '/customization') return <CustomizationPage />;
  if (path === '/business') return <BusinessPage />;
  if (path === '/about') return <AboutPage />;
  if (path === '/contact') return <ContactPage />;
  if (path === '/faq') return <FaqPage />;
  if (path === '/shop') return <ShopPage onAddToCart={onAddToCart} onQuickView={onQuickView} />;
  if (path.startsWith('/product/')) return <ProductDetailPage onAddToCart={onAddToCart} />;
  if (path === '/five-minute-habit') return <FiveMinuteHabitPage onAddToCart={onAddToCart} />;
  if (path === '/track-order') return <TrackOrderPage />;
  if (path === '/order-success') return <OrderSuccessPage />;
  if (path === '/admin') return <AdminPortalPage />;
  if (path === '/404') return <NotFoundPage />;
  return <NotFoundPage />;
}

export default function SiteFrame({ cartCount = 0, onOpenCart = () => {}, onAddToCart = () => {}, onQuickView = () => {} }) {
  const { currentPath, navigate } = useRouter();
  const alias = ALIASES[currentPath];

  useEffect(() => {
    if (alias) navigate(alias, true);
  }, [alias, navigate]);

  const path = alias || currentPath;
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
      <LegalLayout
        activePolicy={policy}
        setActivePolicy={handleLegalTabChange}
        onClose={() => navigate('/')}
      />
    );
  }

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded-full">
        Skip to content
      </a>
      <Navbar cartCount={cartCount} onOpenCart={onOpenCart} />
      <main id="main" className="flex-1">
        <PageSwitch path={path} onAddToCart={onAddToCart} onQuickView={onQuickView} />
      </main>
      <Footer />
    </>
  );
}
