import React from 'react';
import { ArrowLeft, Feather, ShieldCheck, FileText, Lock, Truck, Phone } from 'lucide-react';
import TermsPage from './TermsPage';
import PrivacyPolicyPage from './PrivacyPolicyPage';
import RefundPolicyPage from './RefundPolicyPage';
import ShippingPolicyPage from './ShippingPolicyPage';
import ContactUsPage from './ContactUsPage';
import GrievanceRedressalPage from './GrievanceRedressalPage';

export default function LegalLayout({ activePolicy, setActivePolicy, onClose }) {
  const policyTabs = [
    { id: 'terms', name: 'Terms & Conditions', icon: FileText, component: TermsPage },
    { id: 'privacy', name: 'Privacy Policy', icon: Lock, component: PrivacyPolicyPage },
    { id: 'refund', name: 'Refund & Cancellation', icon: ShieldCheck, component: RefundPolicyPage },
    { id: 'shipping', name: 'Shipping & Delivery', icon: Truck, component: ShippingPolicyPage },
    { id: 'grievance', name: 'Grievance Redressal', icon: ShieldCheck, component: GrievanceRedressalPage },
    { id: 'contact', name: 'Contact Us', icon: Phone, component: ContactUsPage }
  ];

  const currentTab = policyTabs.find((t) => t.id === activePolicy) || policyTabs[0];
  const ActiveComponent = currentTab.component;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B2520] font-sans flex flex-col">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DDCF] py-4 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-medium text-[#4A4138] hover:text-[#2B2520] px-4 py-2 rounded-full bg-white border border-[#E5DDCF] shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Store</span>
          </button>

          {/* Brand Mark */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#383129] flex items-center justify-center text-[#E5DDCF] shadow-sm">
              <Feather className="w-4 h-4 text-[#D9C4A1]" />
            </div>
            <span className="font-serif text-xl font-semibold tracking-wider text-[#2B2520]">
              JOURNALY
            </span>
          </div>

          <div className="w-24 hidden sm:block text-right">
            <span className="text-[10px] font-mono text-[#8C8072] uppercase tracking-wider">
              Legal Desk
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Sidebar Tabs */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 bg-white rounded-3xl border border-[#E5DDCF] p-4 sm:p-5 shadow-xs space-y-1.5">
              <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C6D46] font-medium border-b border-[#EFE8DD] mb-2">
                Compliance & Policies
              </div>

              {policyTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activePolicy === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActivePolicy(tab.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-[#2B2520] text-[#FAF7F2] shadow-xs'
                        : 'text-[#5E5448] hover:bg-[#FAF7F2] hover:text-[#2B2520]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#D9C4A1]' : 'text-[#8C6D46]'}`} />
                    <span className="truncate">{tab.name}</span>
                  </button>
                );
              })}

              <div className="pt-4 mt-3 border-t border-[#EFE8DD] px-3 text-[11px] text-[#8C8072] font-light">
                Securely encrypted & processed with Razorpay. All policies comply with RBI & global e-commerce guidelines.
              </div>
            </div>
          </aside>

          {/* Active Policy Content Box */}
          <main className="lg:col-span-8 bg-white rounded-3xl border border-[#E5DDCF] p-6 sm:p-12 shadow-xs">
            <ActiveComponent />
          </main>

        </div>
      </div>

      {/* Simple Legal Footer */}
      <footer className="border-t border-[#E5DDCF] py-6 text-center text-xs text-[#8C8072] bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© 2026 Journaly Bindery Ltd. All rights reserved.</span>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>PCI-DSS Certified</span>
            <span>•</span>
            <span>Razorpay Compliant</span>
            <span>•</span>
            <span>256-Bit SSL</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
