import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Question',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    trackEvent('contact_submit', { subject: formData.subject });
    setSent(true);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1E1B18] font-sans min-h-screen py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-semibold block mb-3">
            Atelier Concierge
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#1E1B18] tracking-tight leading-tight">
            TALK TO A HUMAN.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#6A6054] font-light max-w-xl mx-auto">
            Questions about an order, product, gift or bulk requirement? You’re in the right place.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Merchant Contact Details (Required for Razorpay Merchant Verification) */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-[#E5DDCF] shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5A93C] font-semibold block mb-1">
                Legal Entity
              </span>
              <h3 className="font-serif text-xl font-medium text-[#1E1B18]">
                Journaly Bindery Ltd.
              </h3>
            </div>

            <div className="space-y-4 text-xs text-[#6A6054]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E5A93C] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1E1B18] block">Registered Atelier Address:</span>
                  <p className="mt-0.5 leading-relaxed">
                    Plot 42, Craft Guild District, Outer Ring Road, Bengaluru, Karnataka, 560103, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#E5A93C] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1E1B18] block">Customer Support Email:</span>
                  <p className="mt-0.5">care@journaly.store</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#E5A93C] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1E1B18] block">Helpline:</span>
                  <p className="mt-0.5">+91 (080) 4120-8492</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#E5A93C] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1E1B18] block">Operating Hours:</span>
                  <p className="mt-0.5">Monday to Friday • 9:00 AM – 6:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#E5DDCF] shadow-xl">
            {sent ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto mb-4" />
                <h3 className="font-serif text-3xl font-normal text-[#1E1B18] mb-2">
                  Message Dispatched.
                </h3>
                <p className="text-xs sm:text-sm text-[#6A6054] font-light max-w-sm mx-auto">
                  A member of our binder support team will respond within 4 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-[#1E1B18] block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs focus:outline-none focus:border-[#E5A93C]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-[#1E1B18] block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs focus:outline-none focus:border-[#E5A93C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#1E1B18] block mb-1">
                    Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs focus:outline-none focus:border-[#E5A93C]"
                  >
                    <option value="Order Tracking">Order & Shipping Inquiries</option>
                    <option value="Personalisation">Custom Monogramming Assistance</option>
                    <option value="Product Details">Paper & Binding Specifications</option>
                    <option value="Corporate">Bulk / Corporate Gifting</option>
                    <option value="General">Other Question</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#1E1B18] block mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5DDCF] bg-[#FAF7F2] text-xs focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-white hover:bg-[#F4EFE6] text-[#1E1B18] border-2 border-[#1E1B18] text-xs font-semibold uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-4 h-4 text-[#E5A93C]" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
