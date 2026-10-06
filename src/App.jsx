import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductQuickView from './components/ProductQuickView';
import QuizModal from './components/QuizModal';
import LegalLayout from './components/legal/LegalLayout';
import SEOHead from './components/SEOHead';

// Home Flow (Clean Minimalist Beige Story Flow)
import HomeHero from './components/home/HomeHero';
import DnaProductCarousel from './components/DnaProductCarousel';
import HomeMemoryStory from './components/home/HomeMemoryStory';
import HomeHabitPositioning from './components/home/HomeHabitPositioning';
import HomeSocialProof from './components/home/HomeSocialProof';
import HomeFaq from './components/home/HomeFaq';
import HomeFinalCall from './components/home/HomeFinalCall';

// Dedicated Route Pages
import FiveMinuteHabitPage from './pages/FiveMinuteHabitPage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BusinessPage from './pages/BusinessPage';
import AboutPage from './pages/AboutPage';
import TrackOrderPage from './pages/TrackOrderPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import AdminPortalPage from './pages/AdminPortalPage';

import { RouterProvider, useRouter } from './utils/router';
import { PRODUCTS } from './data/products';
import { Sparkles } from 'lucide-react';

function AppContent() {
  const { currentPath, navigate } = useRouter();
  const [currency, setCurrency] = useState('INR');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quickViewData, setQuickViewData] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const [cartItems, setCartItems] = useState([
    {
      ...PRODUCTS[0],
      customId: 'daisy-default',
      customImage: '/images/journal-daisy-front.jpg',
      paperRuling: 'Daily Guided Prompts',
      quantity: 1,
      price: PRODUCTS[0]?.price || 599
    }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleAddToCart = (item) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.customId && i.customId === item.customId
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: (next[existingIndex].quantity || 1) + (item.quantity || 1)
        };
        return next;
      }
      return [...prev, item];
    });
    showToast(`Added "${item.name}" to your bag`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (customId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(customId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.customId === customId ? { ...i, quantity: newQty } : i))
    );
  };

  const handleRemoveItem = (customId) => {
    setCartItems((prev) => prev.filter((i) => i.customId !== customId));
  };

  const handleAddUpsell = (product) => {
    handleAddToCart({
      ...product,
      customId: `${product.id}-upsell`,
      quantity: 1,
      price: product.price
    });
  };

  const handleOrderComplete = () => {
    setCartItems([]);
  };

  const cartTotalCount = cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0);

  // Check if current path is a legal compliance page
  const isLegalRoute = [
    '/terms-and-conditions',
    '/privacy-policy',
    '/refund-cancellation-policy',
    '/shipping-delivery-policy',
    '/grievance-redressal'
  ].includes(currentPath);

  if (isLegalRoute) {
    let activePolicy = 'terms';
    if (currentPath === '/privacy-policy') activePolicy = 'privacy';
    else if (currentPath === '/refund-cancellation-policy') activePolicy = 'refund';
    else if (currentPath === '/shipping-delivery-policy') activePolicy = 'shipping';
    else if (currentPath === '/grievance-redressal') activePolicy = 'grievance';

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
        activePolicy={activePolicy}
        setActivePolicy={handleLegalTabChange}
        onClose={() => navigate('/')}
      />
    );
  }

  // Route selector
  const renderPage = () => {
    if (currentPath === '/five-minute-habit') {
      return <FiveMinuteHabitPage onAddToCart={handleAddToCart} />;
    }
    if (currentPath === '/shop') {
      return (
        <ShopPage
          onAddToCart={handleAddToCart}
          onQuickView={(product, color) => setQuickViewData({ product, color })}
        />
      );
    }
    if (currentPath === '/collections') {
      navigate('/shop');
      return null;
    }
    if (currentPath.startsWith('/product/')) {
      return <ProductDetailPage onAddToCart={handleAddToCart} />;
    }
    if (currentPath === '/personalise' || currentPath === '/gifts') {
      navigate('/shop');
      return null;
    }
    if (currentPath === '/business') {
      return <BusinessPage />;
    }
    if (currentPath === '/about') {
      return <AboutPage />;
    }
    if (currentPath === '/track-order') {
      return <TrackOrderPage />;
    }
    if (currentPath === '/order-success') {
      return <OrderSuccessPage />;
    }
    if (currentPath === '/faq') {
      return <FaqPage />;
    }
    if (currentPath === '/contact') {
      return <ContactPage />;
    }
    if (currentPath === '/admin') {
      return <AdminPortalPage />;
    }

    // Default: Minimalist Beige Homepage Flow
    return (
      <>
        {/* Scene 1: Home Hero with authentic video & natural brightness */}
        <HomeHero
          onExplore={() => navigate('/shop')}
          onStartHabit={() => navigate('/five-minute-habit')}
        />

        {/* Product Carousel: Simple horizontal moving carousel with editions */}
        <DnaProductCarousel
          onAddToCart={handleAddToCart}
          onQuickView={(product, color) => setQuickViewData({ product, color })}
        />

        {/* Scene 2: Memory Story — Clean Beige */}
        <HomeMemoryStory />

        {/* Scene 3: Habit Positioning — Full size image, no button */}
        <HomeHabitPositioning />

        {/* Scene 4: Video Testimonials Section (Normal brightness, beige) */}
        <HomeSocialProof />

        {/* Scene 5: Frequently Asked Questions — Beige Accordion */}
        <HomeFaq />

        {/* Scene 6: Final Call — Beige */}
        <HomeFinalCall
          onShop={() => navigate('/shop')}
        />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1B18] font-sans flex flex-col selection:bg-[#E5A93C]/20 selection:text-[#1E1B18]">
      {/* Dynamic SEO & Schema Engine */}
      <SEOHead />


      {/* 2. Primary Navigation */}
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* 3. Main Route Content */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* 4. Minimalist Editorial Footer (All Beige) */}
      <Footer />

      {/* Full-Page Cart with Direct Razorpay Payment */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddUpsell={handleAddUpsell}
      />

      {/* Quick View Modal */}
      {quickViewData && (
        <ProductQuickView
          product={quickViewData.product}
          initialColor={quickViewData.color}
          onClose={() => setQuickViewData(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 60s Journal Matcher Quiz */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1E1B18] text-[#FAF7F2] px-5 py-3 rounded-full shadow-xl border border-stone-800 flex items-center gap-2.5 text-xs font-medium animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#E5A93C]" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-xs text-[#E5A93C] underline font-semibold cursor-pointer"
          >
            View Bag
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
