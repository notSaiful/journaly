import React, { useState } from 'react';
import { Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export default function BusinessPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    quantity: '50-100',
    useCase: 'Employee Onboarding',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    trackEvent('business_lead', { company: formData.company, quantity: formData.quantity });
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18] font-sans min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-4xl mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-3">
            B2B, Institutional & Corporate Gifting
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#1E1B18] tracking-tight leading-tight">
            MAKE YOUR BRAND <br />
            PART OF SOMETHING <br />
            <span className="text-[#6A6054] font-normal">WORTH KEEPING.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#6A6054] font-light max-w-xl">
            Custom guided journals for teams, colleges, events, and meaningful executive gifting.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {[
            'Employee Onboarding',
            'Employee Appreciation',
            'Colleges & Graduations',
            'Conferences & Summits',
            'Boutique Hospitality',
            'Executive Events'
          ].map((item) => (
            <div key={item} className="p-4 rounded-xl bg-white border border-[#E5DDCF] shadow-xs">
              <span className="text-xs font-serif font-medium text-[#1E1B18] block mb-1">
                {item}
              </span>
              <span className="text-[10px] text-[#8C7E72] font-mono uppercase tracking-wider block">
                Custom Foil Available
              </span>
            </div>
          ))}
        </div>

        {/* Inquiry Form Stage */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#E5DDCF] shadow-xl max-w-3xl mx-auto">
          {submitted ? (
            <div className="text-center py-10">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto mb-4" />
              <h3 className="font-serif text-3xl font-normal text-[#1E1B18] mb-2">
                Inquiry Received.
              </h3>
              <p className="text-sm text-[#6A6054] font-light max-w-md mx-auto">
                Thank you for reaching out. Our atelier concierge will prepare a tailored proposal and volume quotation within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-[#E5DDCF] pb-4 mb-6">
                <h3 className="font-serif text-2xl font-normal text-[#1E1B18]">
                  Request an Institutional Quote
                </h3>
                <p className="text-xs text-[#6A6054] font-light mt-1">
                  Custom blind deboss, gold foil logo stamping, and bespoke interior tip-ins starting at 25 units.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#1E1B18] block mb-1.5 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-sm focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#1E1B18] block mb-1.5 font-medium">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-sm focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#1E1B18] block mb-1.5 font-medium">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-sm focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#1E1B18] block mb-1.5 font-medium">
                    Estimated Quantity
                  </label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-sm focus:outline-none focus:border-[#E5A93C]"
                  >
                    <option value="25-50">25 – 50 Units</option>
                    <option value="50-100">50 – 100 Units</option>
                    <option value="100-250">100 – 250 Units</option>
                    <option value="250-500">250 – 500 Units</option>
                    <option value="500+">500+ Units (Fully Bespoke)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#1E1B18] block mb-1.5 font-medium">
                  Project Notes & Timeline
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about your event, delivery date, or custom branding requirements..."
                  className="w-full px-4 py-3 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-sm focus:outline-none focus:border-[#E5A93C]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#1E1B18] hover:bg-[#332C26] text-[#FAF7F2] text-xs font-semibold uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 text-[#E5A93C]" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
