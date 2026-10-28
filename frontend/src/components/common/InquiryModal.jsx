import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { submitInquiry } from '../../services/inquiryApi';
import { CONTACT_INFO } from '../../config/contact';
import confetti from 'canvas-confetti';
import { CheckCircle2, Send, PhoneCall } from 'lucide-react';

export default function InquiryModal({ isOpen, onClose, preselectedService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    service: '',
    budget: '₹25,000 - ₹50,000',
    timeline: 'Within 1 Month',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resultMsg, setResultMsg] = useState('');

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    } else if (!formData.service) {
      setFormData(prev => ({ ...prev, service: 'Website Development' }));
    }
  }, [preselectedService, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const result = await submitInquiry(formData);
    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      setResultMsg(result.message);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore if canvas not supported
      }
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  const serviceOptions = [
    'Website Development',
    'Mobile App Development',
    'AI Integration & Automation',
    'Intelligent Chatbot Solutions',
    'SEO & Search Growth',
    'Brand Identity (5 Vector Logos)',
    'Amazon, Meesho & Flipkart Listing',
    'Product Visuals & Retouching',
    'Campaigns (Screen & Print Collaterals)',
    'Content Systems & Social Media'
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={submitted ? handleReset : onClose}
      title="Start Your Project Consultation"
      subtitle="Direct touch with founders Vikas Chauhan & Shubham Singh"
      maxWidth="max-w-2xl"
    >
      {submitted ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-terracotta-100 dark:bg-terracotta-900/50 text-terracotta-600 dark:text-terracotta-400 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h4 className="text-2xl font-bold text-espresso-900 dark:text-white font-display">
            Consultation Request Confirmed!
          </h4>
          <p className="text-espresso-700 dark:text-cream-300 text-sm max-w-md mx-auto">
            {resultMsg || 'Thank you for reaching out to Pixelix. Our tech & strategy leads will review your requirements and reach out shortly.'}
          </p>
          <div className="p-4 rounded-2xl bg-cream-100 dark:bg-darkbg-surface border border-cream-300 dark:border-white/10 max-w-sm mx-auto text-xs text-espresso-800 dark:text-cream-200 space-y-1">
            <div className="font-semibold text-terracotta-600 dark:text-terracotta-400">Need urgent discussion? Call us now:</div>
            <div>Vikas: {CONTACT_INFO.founders[0].phone}</div>
            <div>Shubham: {CONTACT_INFO.founders[1].phone}</div>
          </div>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-full font-bold text-xs text-white bg-sunset-gradient shadow-sunset cursor-pointer"
          >
            Close Window
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                Your Name <span className="text-terracotta-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Aman Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-surface text-sm text-espresso-900 dark:text-white focus:outline-none focus:border-terracotta-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                Business / Brand Name
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="e.g. Acme Studio"
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-surface text-sm text-espresso-900 dark:text-white focus:outline-none focus:border-terracotta-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                Email Address <span className="text-terracotta-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-surface text-sm text-espresso-900 dark:text-white focus:outline-none focus:border-terracotta-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                Phone / WhatsApp <span className="text-terracotta-600">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-surface text-sm text-espresso-900 dark:text-white focus:outline-none focus:border-terracotta-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                Target Service <span className="text-terracotta-600">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-surface text-xs text-espresso-900 dark:text-white focus:outline-none focus:border-terracotta-500"
              >
                {serviceOptions.map((s, idx) => (
                  <option key={idx} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                Budget Scope
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-surface text-xs text-espresso-900 dark:text-white focus:outline-none focus:border-terracotta-500"
              >
                <option value="₹15,000 - ₹35,000">₹15,000 - ₹35,000</option>
                <option value="₹35,000 - ₹75,000">₹35,000 - ₹75,000</option>
                <option value="₹75,000 - ₹1,50,000">₹75,000 - ₹1,50,000</option>
                <option value="₹1,50,000+ Enterprise">₹1,50,000+ Enterprise</option>
                <option value="Custom / Undecided">Custom / Undecided</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                Timeline
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-surface text-xs text-espresso-900 dark:text-white focus:outline-none focus:border-terracotta-500"
              >
                <option value="Urgent (1-2 Weeks)">Urgent (1-2 Weeks)</option>
                <option value="Within 1 Month">Within 1 Month</option>
                <option value="2-3 Months">2-3 Months</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
              Project Description / Goals <span className="text-terracotta-600">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you want to build or scale (e.g. modern website with 3D animation, brand identity kit, Amazon listing, or WhatsApp AI bot)..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-surface text-sm text-espresso-900 dark:text-white focus:outline-none focus:border-terracotta-500 resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-between gap-4">
            <span className="text-[11px] text-espresso-600 dark:text-cream-400">
              🔒 Confidential. Direct founder review.
            </span>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-full font-bold text-xs text-white bg-sunset-gradient shadow-sunset hover:shadow-sunset-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Submitting...' : 'Submit Consultation Request'}</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
