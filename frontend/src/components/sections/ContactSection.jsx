import React, { useState } from 'react';
import Badge from '../common/Badge';
import { CONTACT_INFO } from '../../config/contact';
import { submitInquiry } from '../../services/inquiryApi';
import confetti from 'canvas-confetti';
import { Phone, Mail, Globe, Send, MessageCircle, CheckCircle2, MapPin, Sparkles } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Website Development',
    businessName: '',
    budget: '₹35,000 - ₹75,000',
    timeline: 'Within 1 Month',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await submitInquiry(formData);
    setLoading(false);
    if (result.success) {
      setSuccessMsg(result.message);
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch (e) {}
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Website Development',
        businessName: '',
        budget: '₹35,000 - ₹75,000',
        timeline: 'Within 1 Month',
        message: ''
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-cream-100 dark:bg-darkbg-base relative overflow-hidden transition-colors">
      {/* Decorative ambient elements */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-terracotta-200/40 dark:bg-terracotta-900/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <Badge variant="terracotta" className="text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pixelix · Next Step</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-espresso-900 dark:text-white tracking-tight font-display">
            Let's Build What's Next
          </h2>
          <p className="text-sm sm:text-base text-espresso-700 dark:text-cream-300 leading-relaxed">
            Start a conversation today · Creative · Digital · Growth
          </p>
        </div>

        {/* 2 Columns: Direct Founders Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Founder Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-card p-8 rounded-3xl border border-cream-300 dark:border-white/10 space-y-6 shadow-soft">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600 dark:text-terracotta-400">
                  Direct Founder Access
                </span>
                <h3 className="text-2xl font-bold text-espresso-900 dark:text-white font-display mt-1">
                  Speak Directly with Leadership
                </h3>
                <p className="text-xs sm:text-sm text-espresso-700 dark:text-cream-300 mt-2 leading-relaxed">
                  No junior intermediaries. You collaborate directly with the creators and technical architects responsible for your delivery.
                </p>
              </div>

              {/* Founder Cards */}
              <div className="space-y-4">
                {CONTACT_INFO.founders.map((founder, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-darkbg-card border border-cream-200/90 dark:border-white/10 shadow-sm flex items-center justify-between gap-4 group hover:border-terracotta-400 transition-all">
                    <div>
                      <div className="font-bold text-sm text-espresso-900 dark:text-white">{founder.name}</div>
                      <div className="text-xs text-terracotta-600 dark:text-terracotta-400 font-medium">{founder.role}</div>
                      <div className="text-xs text-espresso-700 dark:text-cream-300 mt-1 font-semibold">{founder.phone}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={founder.whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 hover:bg-green-100 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <a
                        href={founder.telHref}
                        className="p-2.5 rounded-xl bg-terracotta-50 dark:bg-terracotta-900/40 text-terracotta-700 dark:text-terracotta-400 hover:bg-terracotta-100 transition-colors"
                        title="Direct Call"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Digital Coordinates */}
              <div className="pt-4 border-t border-cream-200 dark:border-white/10 space-y-2 text-xs text-espresso-800 dark:text-cream-300">
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-terracotta-600 dark:text-terracotta-400" />
                  <span className="font-semibold text-espresso-900 dark:text-white">Official Domain:</span>
                  <a href={`https://${CONTACT_INFO.domain}`} target="_blank" rel="noreferrer" className="text-terracotta-600 dark:text-terracotta-400 hover:underline">
                    {CONTACT_INFO.domain}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-terracotta-600 dark:text-terracotta-400" />
                  <span>Pan-India Operations (Remote & On-site Delivery)</span>
                </div>
              </div>
            </div>

            {/* Response Time Guarantee */}
            <div className="p-5 rounded-3xl bg-terracotta-50 dark:bg-terracotta-900/30 border border-terracotta-200/80 dark:border-terracotta-800/40 flex items-center gap-3 text-xs text-terracotta-900 dark:text-terracotta-200">
              <CheckCircle2 className="w-6 h-6 text-terracotta-600 dark:text-terracotta-400 shrink-0" />
              <div>
                <span className="font-bold">Guaranteed 24-Hour Turnaround:</span> Every inquiry receives a formal preliminary response and scope breakdown within 1 business day.
              </div>
            </div>

          </div>

          {/* Right Column: In-page Consultation Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-darkbg-surface p-8 sm:p-10 rounded-3xl border border-cream-300 dark:border-white/10 shadow-soft transition-colors">
              
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-espresso-900 dark:text-white font-display">
                  Send a Project Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-espresso-700 dark:text-cream-300 mt-1">
                  Tell us about your brand vision, target timeline, or marketplace requirements.
                </p>
              </div>

              {successMsg && (
                <div className="p-4 rounded-2xl bg-terracotta-50 dark:bg-terracotta-900/40 border border-terracotta-300 dark:border-terracotta-700 text-terracotta-800 dark:text-terracotta-200 text-xs font-medium mb-6 flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-terracotta-600 dark:text-terracotta-400 shrink-0 mt-0.5" />
                  <div>{successMsg}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                      Full Name <span className="text-terracotta-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Vikas Chauhan"
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-card text-xs sm:text-sm text-espresso-900 dark:text-white focus:outline-none focus:border-terracotta-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                      Business or Brand
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="e.g. Pixelix Labs"
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-card text-xs sm:text-sm text-espresso-900 dark:text-white focus:outline-none focus:border-terracotta-500"
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
                      placeholder="name@business.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-card text-xs sm:text-sm text-espresso-900 dark:text-white focus:outline-none focus:border-terracotta-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                      Phone Number <span className="text-terracotta-600">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 7056063863"
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-card text-xs sm:text-sm text-espresso-900 dark:text-white focus:outline-none focus:border-terracotta-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                      Primary Service
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-card text-xs text-espresso-900 dark:text-white focus:outline-none focus:border-terracotta-500"
                    >
                      <option value="Website Development">Website Development</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="AI Integration & Automation">AI Integration & Automation</option>
                      <option value="Intelligent Chatbot Solutions">Intelligent Chatbot Solutions</option>
                      <option value="SEO & Search Growth">SEO & Search Growth</option>
                      <option value="Brand Identity (5 Vector Logos)">Brand Identity (5 Logos)</option>
                      <option value="Amazon/Meesho/Flipkart Growth">Marketplace Listing</option>
                      <option value="Product Visuals & Retouching">Product Visuals</option>
                      <option value="Screen & Print Campaigns">Screen & Print Campaigns</option>
                      <option value="Content Systems & Social Media">Content & Social Media</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                      Budget Expectation
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-card text-xs text-espresso-900 dark:text-white focus:outline-none focus:border-terracotta-500"
                    >
                      <option value="₹15,000 - ₹35,000">₹15,000 - ₹35,000</option>
                      <option value="₹35,000 - ₹75,000">₹35,000 - ₹75,000</option>
                      <option value="₹75,000 - ₹1,50,000">₹75,000 - ₹1,50,000</option>
                      <option value="₹1,50,000+ Enterprise">₹1,50,000+ Enterprise</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                      Desired Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-card text-xs text-espresso-900 dark:text-white focus:outline-none focus:border-terracotta-500"
                    >
                      <option value="Urgent (1-2 Weeks)">Urgent (1-2 Weeks)</option>
                      <option value="Within 1 Month">Within 1 Month</option>
                      <option value="2-3 Months">2-3 Months</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                    Tell us about your project <span className="text-terracotta-600">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your current state, target goals, deliverables required, or any specific inspirations..."
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-card text-xs sm:text-sm text-espresso-900 dark:text-white focus:outline-none focus:border-terracotta-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-espresso-500 dark:text-cream-400">
                    Your data is strictly confidential.
                  </span>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-sunset-gradient shadow-sunset hover:shadow-sunset-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{loading ? 'Submitting...' : 'Send Consultation Inquiry'}</span>
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
