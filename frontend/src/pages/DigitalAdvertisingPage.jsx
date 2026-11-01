import React, { useState } from 'react';
import Badge from '../components/common/Badge';
import {
  Megaphone,
  Target,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  HelpCircle,
  MessageCircle,
  Send,
  ShieldCheck,
  Zap,
  Globe,
  Share2,
  Users,
  Building2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ENV } from '../config/env';

export default function DigitalAdvertisingPage() {
  const [activeTab, setActiveTab] = useState('meta_realestate');
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '', business: '', budget: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleOpenConsultation = (pkg) => {
    setSelectedPackage(pkg);
    setConsultModalOpen(true);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        name: leadForm.name,
        phone: leadForm.phone,
        email: leadForm.email,
        service: 'digital_advertising',
        projectLocation: leadForm.business,
        budgetRange: leadForm.budget,
        sourcePage: 'Digital Advertising Page',
        notes: `Requested Package: ${selectedPackage?.name || 'General Ads Consultation'}. Notes: ${leadForm.notes}`
      };
      const res = await fetch(`${ENV.API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setConsultModalOpen(false);
          setSubmitSuccess(false);
          setLeadForm({ name: '', phone: '', email: '', business: '', budget: '', notes: '' });
        }, 2200);
      }
    } catch (e) {
      alert('Could not submit inquiry. Please click WhatsApp to connect immediately.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppAds = () => {
    const phone = '919876543210';
    const msg = `Hello Pixelix Performance Team!
I am interested in running Meta / Google Lead Generation Ads for my business / real estate project.
Please share campaign packages, verified case studies, and introductory consultation availability.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const adPackages = [
    {
      id: 'pkg-starter',
      name: 'Launch Accelerator',
      price: '₹24,999',
      period: '/ month',
      adSpendReco: 'Recommended Ad Spend: ₹30k - ₹60k/mo',
      desc: 'Ideal for single residential project launches or local service businesses seeking verified inquiries.',
      features: [
        'Meta Ads (Facebook & Instagram Feed/Stories)',
        'Up to 6 Bespoke Creative Video & Carousel Creatives',
        'Instant Lead Form + WhatsApp Automated Routing',
        'Weekly Performance & CPL Optimization Reports',
        'Lead Verification & Spam Filtering Script'
      ],
      popular: false
    },
    {
      id: 'pkg-growth',
      name: 'Real Estate Growth Engine',
      price: '₹44,999',
      period: '/ month',
      adSpendReco: 'Recommended Ad Spend: ₹80k - ₹2.5L/mo',
      desc: 'High-volume buyer acquisition designed for builders, high-ticket villa developments, and top consultants.',
      features: [
        'Omnichannel: Meta Lead Ads + Google Search (High-Intent PPC)',
        '15 High-Converting Ad Creatives with 3D Walkthrough snippets',
        'Landing Page / Micro-funnel Conversion Rate Optimization',
        'Direct CRM Integration (HubSpot, LeadSquared, Google Sheets)',
        'Bi-weekly Strategic Review & A/B Copy Testing'
      ],
      popular: true
    },
    {
      id: 'pkg-enterprise',
      name: 'Omnichannel Dominance',
      price: '₹79,999',
      period: '/ month',
      adSpendReco: 'Recommended Ad Spend: ₹3L+/mo',
      desc: 'Full-scale advertising dominance for multi-tower projects, township launches, or national enterprises.',
      features: [
        'Full Google Suite (Search, Display, YouTube TrueView, Discovery)',
        'Full Meta Suite + Retargeting + NRI Geo-Targeting',
        'Unlimited Creative Production & 3D Render Graphics',
        'Dedicated Performance Director & Real-Time Slack Access',
        'Custom AI Lead Qualification Bot Integration'
      ],
      popular: false
    }
  ];

  const faqs = [
    {
      q: 'How does Pixelix verify that leads are genuine property buyers?',
      a: 'We implement multi-step OTP verification or high-intent qualifying questions (budget qualification, purchase timeframe, and location preference) directly inside Meta & Google instant lead forms, keeping junk inquiries under 8%.'
    },
    {
      q: 'Do you provide the ad creative designs and 3D renders?',
      a: 'Yes! As an end-to-end creative and technology studio, Pixelix crafts high-resolution 3D walkthrough snippets, cinematic aerial composites, and persuasive regional Hindi/English ad copy tailored to your target audience.'
    },
    {
      q: 'How fast can our campaigns go live?',
      a: 'Standard onboarding and funnel setup take 3 to 5 business days, including ad account structuring, pixel tracking validation, creative asset production, and CRM webhook testing.'
    },
    {
      q: 'Are ad spend budgets included in the management fee?',
      a: 'No. The management fee covers creative strategy, copy, ad design, technical integration, and daily campaign bid optimization. Ad spend is billed directly by Meta and Google to your billing credit card.'
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-cream-50 dark:bg-darkbg-base transition-colors space-y-16">
      {/* 1. Hero Header */}
      <section className="py-14 bg-gradient-to-b from-cream-100 to-cream-50 dark:from-darkbg-surface dark:to-darkbg-base border-b border-cream-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl space-y-4">
          <Badge variant="terracotta" className="text-xs inline-flex">
            <Megaphone className="w-3.5 h-3.5" />
            <span>Performance Growth & Lead Acquisition</span>
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-espresso-900 dark:text-cream-100 tracking-tight font-display">
            Targeted Digital & Real Estate Advertising
          </h1>
          <p className="text-sm sm:text-base text-espresso-700 dark:text-cream-300 leading-relaxed max-w-2xl mx-auto">
            High-intent Meta (Instagram & Facebook) Lead Ads and Google Search PPC engineered specifically for real estate developers, commercial builders, and growing brands.
          </p>

          <div className="pt-3 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleWhatsAppAds}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discuss Campaign on WhatsApp</span>
            </button>
            <button
              onClick={() => handleOpenConsultation(null)}
              className="px-6 py-3 rounded-2xl bg-espresso-900 dark:bg-cream-100 text-cream-100 dark:text-espresso-900 font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-terracotta-600 dark:hover:bg-terracotta-400 transition-colors"
            >
              <span>Book Free Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Three Pillars Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-white/10 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-espresso-900 dark:text-cream-100 font-serif">
              Meta Ads (Instagram & FB)
            </h3>
            <p className="text-xs text-espresso-600 dark:text-cream-300 leading-relaxed">
              Target local high-net-worth individuals, NRI property investors, and active homebuyers using precision location, interest, and Lookalike demographic modeling.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-white/10 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-espresso-900 dark:text-cream-100 font-serif">
              Google Search & Display PPC
            </h3>
            <p className="text-xs text-espresso-600 dark:text-cream-300 leading-relaxed">
              Capture ready-to-buy search traffic typing "flats for sale in Lucknow", "commercial office space near me", or specific project keywords with high-converting landing pages.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-white/10 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-terracotta-500/10 text-terracotta-600 flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-espresso-900 dark:text-cream-100 font-serif">
              Real Estate Funnel Automation
            </h3>
            <p className="text-xs text-espresso-600 dark:text-cream-300 leading-relaxed">
              Every incoming lead triggers an automated WhatsApp brochure dispatch, instant SMS alert to your sales telecallers, and automated Google Sheet / CRM synchronization.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Transparent Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="espresso" className="text-xs inline-flex">
            <span>Transparent Tiered Retainers</span>
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-espresso-900 dark:text-cream-100 font-serif">
            Campaign Management Packages
          </h2>
          <p className="text-xs sm:text-sm text-espresso-600 dark:text-cream-300">
            Predictable monthly retainers. No hidden markups on your media ad budget.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {adPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-7 sm:p-8 rounded-3xl border flex flex-col justify-between transition-all relative ${
                pkg.popular
                  ? 'border-terracotta-500 bg-white dark:bg-darkbg-card shadow-xl ring-2 ring-terracotta-500 scale-[1.02]'
                  : 'border-cream-200 dark:border-white/10 bg-white dark:bg-darkbg-card shadow-sm hover:shadow-md'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-terracotta-500 text-white shadow-sm">
                  ★ Most Popular for Builders
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-espresso-900 dark:text-cream-100 font-serif">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-espresso-500 dark:text-cream-400 mt-1 min-h-[36px]">
                    {pkg.desc}
                  </p>
                </div>

                <div className="py-2 border-y border-cream-100 dark:border-white/5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold font-mono text-espresso-950 dark:text-cream-100">
                      {pkg.price}
                    </span>
                    <span className="text-xs font-semibold text-espresso-500 dark:text-cream-400">
                      {pkg.period}
                    </span>
                  </div>
                  <div className="text-[11px] font-medium text-terracotta-600 dark:text-terracotta-400 mt-1 font-mono">
                    {pkg.adSpendReco}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-[11px] uppercase font-bold text-espresso-400 dark:text-cream-400 tracking-wider">
                    Package Deliverables:
                  </div>
                  {pkg.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-espresso-800 dark:text-cream-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-cream-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => handleOpenConsultation(pkg)}
                  className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    pkg.popular
                      ? 'bg-terracotta-500 hover:bg-terracotta-600 text-white shadow-sm'
                      : 'border border-cream-300 dark:border-white/15 text-espresso-900 dark:text-cream-100 hover:bg-cream-100 dark:hover:bg-darkbg-elevated'
                  }`}
                >
                  <span>Select {pkg.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-espresso-900 dark:text-cream-100 font-serif">
            Digital Advertising FAQs
          </h2>
          <p className="text-xs text-espresso-600 dark:text-cream-300">
            Answers to common questions about real estate lead acquisition, conversion rates, and billing.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-terracotta-500 shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-espresso-600 dark:text-cream-300 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Performance Disclaimer */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="p-4 rounded-2xl bg-cream-100/70 dark:bg-darkbg-card border border-cream-300 dark:border-white/10 text-xs text-espresso-600 dark:text-cream-400 text-center leading-relaxed">
          <strong>Advertising Disclosure: </strong>
          Ad performance, Cost Per Lead (CPL), and inquiry volumes depend on market demand, location pricing, project tier, media budget, and client telecalling response speed. Pixelix optimizes for authentic high-intent inquiries and does not guarantee speculative secondary sales returns.
        </div>
      </section>

      {/* Consultation Modal */}
      {consultModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-darkbg-card border border-cream-300 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-cream-200 dark:border-white/10">
              <div>
                <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 font-serif">
                  Book Advertising Strategy Call
                </h3>
                <p className="text-xs text-espresso-500 dark:text-cream-400">
                  {selectedPackage ? selectedPackage.name : 'Custom Growth Consultation'}
                </p>
              </div>
              <button
                onClick={() => setConsultModalOpen(false)}
                className="w-8 h-8 rounded-full bg-cream-100 dark:bg-darkbg-elevated text-espresso-600 dark:text-cream-300 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-base text-espresso-900 dark:text-cream-100">
                  Strategy Session Scheduled!
                </h4>
                <p className="text-xs text-espresso-600 dark:text-cream-400 max-w-xs mx-auto">
                  Our performance advertising lead will connect with you on WhatsApp within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="mt-4 space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-espresso-700 dark:text-cream-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    placeholder="e.g. Sunil Verma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-espresso-700 dark:text-cream-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-espresso-700 dark:text-cream-300 mb-1">
                      Target Monthly Ad Spend
                    </label>
                    <select
                      value={leadForm.budget}
                      onChange={(e) => setLeadForm({ ...leadForm, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50 dark:bg-darkbg-base text-xs font-semibold text-espresso-900 dark:text-cream-100"
                    >
                      <option value="₹30k - ₹60k">₹30k - ₹60k / mo</option>
                      <option value="₹60k - ₹1.5L">₹60k - ₹1.5L / mo</option>
                      <option value="₹1.5L - ₹3L">₹1.5L - ₹3L / mo</option>
                      <option value="₹3L+">₹3L+ / mo (Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-espresso-700 dark:text-cream-300 mb-1">
                    Company / Project Name
                  </label>
                  <input
                    type="text"
                    value={leadForm.business}
                    onChange={(e) => setLeadForm({ ...leadForm, business: e.target.value })}
                    placeholder="e.g. Skyline Residency / Verma Real Estate"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-cream-200 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setConsultModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-cream-300 dark:border-white/10 text-xs font-semibold text-espresso-700 dark:text-cream-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs shadow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? 'Booking...' : 'Confirm Call'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

