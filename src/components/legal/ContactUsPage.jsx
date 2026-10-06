import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="space-y-10 text-[#4A4138] leading-relaxed text-sm sm:text-base font-light">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C6D46] block mb-2 font-medium">
          Merchant Information & Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2B2520] tracking-tight">
          Contact Us
        </h1>
        <p className="text-[#6A6054] text-sm sm:text-base font-light mt-2 max-w-2xl">
          We are here to assist with order tracking, bespoke foil stamping inquiries, bulk corporate gifting, or refund requests.
        </p>
      </div>

      {/* Official Business Information Cards (Required by Razorpay) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Merchant Legal Identity */}
        <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E5DDCF] space-y-4">
          <h3 className="font-serif text-lg font-medium text-[#2B2520] border-b border-[#E5DDCF] pb-3">
            Merchant & Operational Details
          </h3>
          
          <div className="space-y-3 text-xs sm:text-sm">
            <div>
              <span className="text-[11px] font-mono uppercase text-[#8C8072] block">Legal Entity Name</span>
              <strong className="text-[#2B2520] font-medium text-sm">Journaly Bindery Ltd.</strong>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase text-[#8C8072] block">Brand Name</span>
              <span className="text-[#2B2520] font-medium">Journaly</span>
            </div>

            <div className="flex items-start gap-3 pt-1">
              <MapPin className="w-4 h-4 text-[#8C6D46] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-mono uppercase text-[#8C8072] block">Registered Atelier Address</span>
                <p className="text-[#2B2520]">
                  72 Berkeley Square, Mayfair, London, W1J 6ER, United Kingdom
                </p>
                <p className="text-[#6A6054] text-xs mt-1">
                  Regional Distribution Hub: 100 Feet Road, Indiranagar, Bengaluru, KA 560038, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Support Desk */}
        <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E5DDCF] space-y-4">
          <h3 className="font-serif text-lg font-medium text-[#2B2520] border-b border-[#E5DDCF] pb-3">
            Customer Support Channels
          </h3>
          
          <div className="space-y-3.5 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#8C6D46] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-mono uppercase text-[#8C8072] block">Concierge & Refund Desk</span>
                <a href="mailto:support@journaly.com" className="text-[#2B2520] font-medium hover:text-[#8C6D46] underline">
                  support@journaly.com
                </a>
                <p className="text-[#6A6054] text-xs">Response time: Within 24 business hours</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#8C6D46] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-mono uppercase text-[#8C8072] block">Helpline & WhatsApp Support</span>
                <p className="text-[#2B2520] font-medium">+44 20 7946 0912 / +91 80 4718 2900</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#8C6D46] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-mono uppercase text-[#8C8072] block">Working Hours</span>
                <p className="text-[#2B2520]">Monday to Saturday: 9:00 AM – 6:00 PM</p>
                <p className="text-[#6A6054] text-xs">Closed on public bank holidays</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Contact Concierge Form */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E5DDCF] shadow-xs">
        <div className="max-w-2xl mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#2B2520] tracking-tight">
            Send a Message to the Atelier
          </h2>
          <p className="text-xs sm:text-sm text-[#6A6054] font-light mt-1">
            Fill in the details below and our team will get back to you promptly.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-[#F4EFE6] border border-[#E5DDCF] text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#4B6B55] mx-auto" />
            <h3 className="font-serif text-2xl font-medium text-[#2B2520]">
              Message Received
            </h3>
            <p className="text-xs sm:text-sm text-[#6A6054] max-w-md mx-auto">
              Thank you for contacting Journaly. A member of our concierge desk will respond to <strong>{formData.email}</strong> within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', orderNumber: '', subject: 'General Inquiry', message: '' });
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#2B2520] text-[#FAF7F2] text-xs font-medium hover:bg-[#433A33] transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#2B2520] mb-1.5 font-mono uppercase tracking-wider">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clara Montgomery"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E5DDCF] text-sm text-[#2B2520] focus:outline-none focus:border-[#8C6D46]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2B2520] mb-1.5 font-mono uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="clara@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E5DDCF] text-sm text-[#2B2520] focus:outline-none focus:border-[#8C6D46]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#2B2520] mb-1.5 font-mono uppercase tracking-wider">
                  Order Number (If applicable)
                </label>
                <input
                  type="text"
                  placeholder="e.g. JNL-9482"
                  value={formData.orderNumber}
                  onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E5DDCF] text-sm text-[#2B2520] focus:outline-none focus:border-[#8C6D46]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2B2520] mb-1.5 font-mono uppercase tracking-wider">
                  Inquiry Topic
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E5DDCF] text-sm text-[#2B2520] focus:outline-none focus:border-[#8C6D46]"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order Tracking">Order & Delivery Tracking</option>
                  <option value="Refund Request">Refund & Returns Assistance</option>
                  <option value="Monogram Query">Custom Monogram Inquiry</option>
                  <option value="Corporate Gifting">Corporate & Bulk Gifting</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#2B2520] mb-1.5 font-mono uppercase tracking-wider">
                Your Message *
              </label>
              <textarea
                required
                rows={4}
                placeholder="How may our concierge assist your writing journey?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E5DDCF] text-sm text-[#2B2520] focus:outline-none focus:border-[#8C6D46] resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 bg-[#2B2520] hover:bg-[#433A33] text-[#FAF7F2] text-xs font-medium rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5 text-[#D9C4A1]" />
              <span>Submit Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
