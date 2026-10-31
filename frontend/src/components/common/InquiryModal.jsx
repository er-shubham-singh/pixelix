import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import { submitInquiry } from '../../services/inquiryApi';
import { CONTACT_INFO } from '../../config/contact';
import {
  TESTIMONIAL_TOPICS,
  TESTIMONIALS_DATA,
  getTopicIdForService
} from '../../data/testimonialsData';
import confetti from 'canvas-confetti';
import {
  Star,
  CheckCircle2,
  Send,
  Phone,
  PhoneCall,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Store,
  Code2,
  Palette,
  Bot,
  TrendingUp,
  Award,
  ChevronDown
} from 'lucide-react';

const TOPIC_ICONS = {
  Store,
  Code2,
  Palette,
  Bot,
  TrendingUp
};

export default function InquiryModal({ isOpen, onClose, preselectedService = '' }) {
  // Active topic tab for client reviews
  const [selectedTopic, setSelectedTopic] = useState('ecom');
  
  // Quick form state
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
  const formSectionRef = useRef(null);

  // Sync preselectedService to topic tab & form service
  useEffect(() => {
    if (preselectedService) {
      const topicId = getTopicIdForService(preselectedService);
      setSelectedTopic(topicId);
      setFormData(prev => ({ ...prev, service: preselectedService }));
    } else {
      setSelectedTopic('ecom');
      if (!formData.service) {
        setFormData(prev => ({ ...prev, service: 'E-Commerce Operations & Amazon Growth' }));
      }
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
          particleCount: 90,
          spread: 75,
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

  const scrollToForm = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeReviews = TESTIMONIALS_DATA[selectedTopic] || TESTIMONIALS_DATA.ecom;
  const currentTopicMeta = TESTIMONIAL_TOPICS.find(t => t.id === selectedTopic) || TESTIMONIAL_TOPICS[0];

  return (
    <Modal
      isOpen={isOpen}
      onClose={submitted ? handleReset : onClose}
      title="Verified Client Reviews & Direct Consultation"
      subtitle="See real results achieved by fellow brands before requesting your scope"
      maxWidth="max-w-4xl"
    >
      {submitted ? (
        <div className="py-10 text-center space-y-5 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-terracotta-100 dark:bg-terracotta-900/50 text-terracotta-600 dark:text-terracotta-400 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-1.5">
            <h4 className="text-2xl font-bold text-espresso-900 dark:text-white font-display">
              Consultation Request Received!
            </h4>
            <p className="text-sm text-espresso-700 dark:text-cream-300 max-w-md mx-auto">
              {resultMsg || 'Founders Vikas Chauhan and Shubham Singh will personally review your requirements and reach out within 4 business hours.'}
            </p>
          </div>

          {/* Instant Call Out */}
          <div className="p-4 rounded-2xl bg-cream-100 dark:bg-darkbg-card border border-terracotta-200/60 dark:border-white/10 max-w-md mx-auto space-y-2">
            <div className="text-xs font-bold text-espresso-900 dark:text-white flex items-center justify-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-terracotta-500" />
              <span>Need Immediate Discussion? Call Founders Directly:</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-xs font-semibold">
              <a href="tel:+917056063863" className="text-terracotta-600 hover:underline">
                Vikas: +91 7056063863
              </a>
              <span className="text-cream-400">•</span>
              <a href="tel:+919559506650" className="text-terracotta-600 hover:underline">
                Shubham: +91 95595 06650
              </a>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-sunset-gradient shadow-sunset hover:scale-105 transition-all cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 max-h-[78vh] overflow-y-auto pr-1 sm:pr-2">
          
          {/* Header Social Proof Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-terracotta-500/10 via-gold/10 to-transparent border border-terracotta-300/40 dark:border-terracotta-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                  alt="Client avatar"
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-darkbg-card object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80"
                  alt="Client avatar"
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-darkbg-card object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80"
                  alt="Client avatar"
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-darkbg-card object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-extrabold text-espresso-900 dark:text-white">
                    4.9 / 5.0 Rating
                  </span>
                </div>
                <div className="text-[11px] text-espresso-600 dark:text-cream-300">
                  85+ Indian & Global Brands Scaled Across 5 Domains
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta-600 dark:text-terracotta-400 hover:text-terracotta-700 underline underline-offset-4 cursor-pointer shrink-0"
            >
              <span>Skip to Direct Contact & Form</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Topic Selector Tabs (The 5 Core Domains) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-espresso-600 dark:text-cream-400">
                Select Domain to View Reviews ({currentTopicMeta.count} Verified Clients)
              </span>
              <span className="text-[11px] font-semibold text-terracotta-600 dark:text-terracotta-400">
                {currentTopicMeta.tagline}
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {TESTIMONIAL_TOPICS.map((topic) => {
                const IconComponent = TOPIC_ICONS[topic.icon] || Store;
                const isSelected = selectedTopic === topic.id;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => {
                      setSelectedTopic(topic.id);
                      setFormData(prev => ({
                        ...prev,
                        service: topic.label
                      }));
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-sunset-gradient text-white shadow-sunset'
                        : 'bg-white/80 dark:bg-white/5 border border-terracotta-200/50 dark:border-white/10 text-espresso-800 dark:text-cream-200 hover:border-terracotta-300 hover:bg-cream-100 dark:hover:bg-white/10'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{topic.shortLabel}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-cream-200 dark:bg-white/10 text-espresso-600 dark:text-cream-300'}`}>
                      {topic.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4-5 Customer Reviews Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {activeReviews.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white/80 dark:bg-darkbg-card border border-cream-300 dark:border-white/10 shadow-soft flex flex-col justify-between hover:border-terracotta-400/50 transition-all space-y-3"
              >
                {/* Review Header: Avatar, Name, Company, Rating */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      className="w-10 h-10 rounded-full object-cover border border-terracotta-200 dark:border-white/10 shrink-0"
                    />
                    <div>
                      <div className="text-xs font-bold text-espresso-900 dark:text-white flex items-center gap-1.5">
                        <span>{item.name}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-terracotta-500 shrink-0" title="Verified Pixelix Client" />
                      </div>
                      <div className="text-[11px] text-espresso-600 dark:text-cream-400">
                        {item.role} · <span className="font-semibold text-espresso-800 dark:text-cream-200">{item.company}</span>
                      </div>
                      <div className="text-[10px] text-espresso-400 dark:text-cream-500">
                        {item.location}
                      </div>
                    </div>
                  </div>

                  {/* Rating Stars & Badge */}
                  <div className="text-right shrink-0">
                    <div className="flex text-amber-500 justify-end">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-terracotta-50 dark:bg-terracotta-900/40 text-terracotta-600 dark:text-terracotta-400 border border-terracotta-200/60 dark:border-white/10">
                      {item.metric}
                    </span>
                  </div>
                </div>

                {/* Review Quote */}
                <p className="text-xs text-espresso-700 dark:text-cream-200/90 leading-relaxed italic bg-cream-50/60 dark:bg-white/5 p-2.5 rounded-xl border border-cream-200/60 dark:border-white/5">
                  "{item.review}"
                </p>

                {/* Service Tag */}
                <div className="flex items-center justify-between text-[10px] pt-1 border-t border-cream-200 dark:border-white/5 text-espresso-500 dark:text-cream-400">
                  <span>Scope: <strong className="text-espresso-800 dark:text-cream-200">{item.serviceUsed}</strong></span>
                  <span className="text-terracotta-500 font-semibold">100% Verified</span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Divider to Scroll Down */}
          <div ref={formSectionRef} className="pt-4 border-t border-terracotta-200/60 dark:border-white/10 space-y-4">
            
            {/* Direct Founder Access Header */}
            <div className="text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta-600 dark:text-terracotta-400">
                NEXT STEP · ZERO DELAY
              </span>
              <h4 className="text-xl font-extrabold text-espresso-900 dark:text-white font-display">
                Ready to Get Similar Results for Your Brand?
              </h4>
              <p className="text-xs text-espresso-600 dark:text-cream-300 max-w-lg mx-auto">
                No middleman or junior sales pitch. You speak directly with agency founders Vikas Chauhan & Shubham Singh.
              </p>
            </div>

            {/* Direct Quick Contact Buttons (Call & WhatsApp) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <a
                href={CONTACT_INFO.founders[0].telHref}
                className="p-3 rounded-2xl bg-white dark:bg-darkbg-card border border-terracotta-200/70 dark:border-white/10 hover:border-terracotta-400 shadow-soft flex items-center justify-center gap-2 text-xs font-bold text-espresso-900 dark:text-white hover:text-terracotta-600 transition-all cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-full bg-terracotta-50 dark:bg-terracotta-900/40 text-terracotta-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>Call Vikas ({CONTACT_INFO.founders[0].phone})</span>
              </a>

              <a
                href={CONTACT_INFO.founders[1].telHref}
                className="p-3 rounded-2xl bg-white dark:bg-darkbg-card border border-terracotta-200/70 dark:border-white/10 hover:border-terracotta-400 shadow-soft flex items-center justify-center gap-2 text-xs font-bold text-espresso-900 dark:text-white hover:text-terracotta-600 transition-all cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-full bg-terracotta-50 dark:bg-terracotta-900/40 text-terracotta-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>Call Shubham ({CONTACT_INFO.founders[1].phone})</span>
              </a>

              <a
                href="https://wa.me/917056063863?text=Hi%20Pixelix%20Team,%20I%20reviewed%20your%20client%20case%20studies%20and%20would%20like%20to%20discuss%20my%20project%20scope."
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-soft flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Founders Directly</span>
              </a>
            </div>

            {/* OR Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-cream-300 dark:border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-cream-50 dark:bg-darkbg-surface px-3 text-[11px] font-bold text-espresso-500 dark:text-cream-400">
                  Or Fill Quick Project Brief (Callback in 4 Hours)
                </span>
              </div>
            </div>

            {/* Quick Consultation Form */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-5 rounded-2xl bg-cream-100/70 dark:bg-darkbg-card border border-cream-300 dark:border-white/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-darkbg-base border border-cream-300 dark:border-white/10 focus:outline-none focus:border-terracotta-500 text-espresso-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-darkbg-base border border-cream-300 dark:border-white/10 focus:outline-none focus:border-terracotta-500 text-espresso-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                    Work Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. rahul@brand.com"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-darkbg-base border border-cream-300 dark:border-white/10 focus:outline-none focus:border-terracotta-500 text-espresso-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                    Brand / Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="e.g. Aura Naturals"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-darkbg-base border border-cream-300 dark:border-white/10 focus:outline-none focus:border-terracotta-500 text-espresso-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                    Service Domain Required
                  </label>
                  <input
                    type="text"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    placeholder="e.g. Amazon & Meesho Operations, Web Dev"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-darkbg-base border border-cream-300 dark:border-white/10 focus:outline-none focus:border-terracotta-500 text-espresso-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                    Estimated Budget Bracket
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-darkbg-base border border-cream-300 dark:border-white/10 focus:outline-none focus:border-terracotta-500 text-espresso-900 dark:text-white"
                  >
                    <option value="₹15,000 - ₹30,000">₹15,000 - ₹30,000 (Starter / Retainer)</option>
                    <option value="₹30,000 - ₹60,000">₹30,000 - ₹60,000 (Growth Tier)</option>
                    <option value="₹60,000 - ₹1,20,000">₹60,000 - ₹1,20,000 (Full-Spectrum)</option>
                    <option value="₹1,20,000+">₹1,20,000+ (Enterprise Multi-Channel)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-espresso-800 dark:text-cream-200 mb-1">
                  Brief Project Summary / Current Pain Point
                </label>
                <textarea
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="e.g. We want to scale our orders on Amazon & Meesho and need A+ cataloging plus dispatch management..."
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-darkbg-base border border-cream-300 dark:border-white/10 focus:outline-none focus:border-terracotta-500 text-espresso-900 dark:text-white resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <div className="text-[11px] text-espresso-600 dark:text-cream-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-terracotta-500" />
                  <span>Strict NDA · No Spam · Handled Directly by Founders</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-7 py-3 rounded-full text-xs font-bold text-white bg-sunset-gradient shadow-sunset hover:shadow-sunset-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Request Founder Callback</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>

        </div>
      )}
    </Modal>
  );
}
