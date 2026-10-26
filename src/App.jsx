import SEOHead from './components/SEOHead';
import SiteFrame from './components/SiteFrame';
import { RouterProvider } from './utils/router';

function AppContent() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1B18] font-sans flex flex-col selection:bg-[#E5A93C]/20 selection:text-[#1E1B18]">
      <SEOHead />
      <SiteFrame />
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
