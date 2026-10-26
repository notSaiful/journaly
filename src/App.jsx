import { useState } from 'react';
import CartDrawer from './components/CartDrawer';
import ProductQuickView from './components/ProductQuickView';
import SEOHead from './components/SEOHead';
import SiteFrame from './components/SiteFrame';
import { RouterProvider } from './utils/router';
import { Sparkles } from 'lucide-react';

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewData, setQuickViewData] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleAddToCart = (item) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.customId && i.customId === item.customId);
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
      setCartItems((prev) => prev.filter((i) => i.customId !== customId));
      return;
    }
    setCartItems((prev) => prev.map((i) => (i.customId === customId ? { ...i, quantity: newQty } : i)));
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

  const cartTotalCount = cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1B18] font-sans flex flex-col selection:bg-[#E5A93C]/20 selection:text-[#1E1B18]">
      <SEOHead />
      <SiteFrame
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onAddToCart={handleAddToCart}
        onQuickView={(product, color) => setQuickViewData({ product, color })}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddUpsell={handleAddUpsell}
      />

      {quickViewData ? (
        <ProductQuickView
          product={quickViewData.product}
          initialColor={quickViewData.color}
          onClose={() => setQuickViewData(null)}
          onAddToCart={handleAddToCart}
        />
      ) : null}

      {toastMessage ? (
        <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1E1B18] text-[#FAF7F2] px-5 py-3 rounded-full shadow-xl flex items-center gap-2.5 text-xs font-medium">
          <Sparkles className="w-4 h-4 text-[#E5A93C]" aria-hidden="true" />
          <span>{toastMessage}</span>
          <button type="button" onClick={() => setIsCartOpen(true)} className="ml-2 text-xs text-[#E5A93C] underline font-semibold cursor-pointer">
            View Bag
          </button>
        </div>
      ) : null}

    </div>
  );
}

export default function App({ initialPath } = {}) {
  return (
    <RouterProvider initialPath={initialPath}>
      <AppContent />
    </RouterProvider>
  );
}
