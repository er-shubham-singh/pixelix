import React, { useState } from 'react';
import PixelixLogo from './PixelixLogo';
import { CONTACT_INFO } from '../../config/contact';
import { useLanguage } from '../../context/LanguageContext';
import { subscribeNewsletter } from '../../services/inquiryApi';
import { Phone, Mail, Globe, Send, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onOpenInquiry, onNavigatePage }) {
  const { isHindi } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    await subscribeNewsletter(email);
    setSubmitting(false);
    setSubscribed(true);
    setEmail('');
  };

  const handleNav = (pageId) => {
    if (onNavigatePage) {
      onNavigatePage(pageId);
    }
  };

  return (
    <footer className="relative bg-espresso-900 text-cream-100 overflow-hidden pt-20 pb-12 border-t border-espresso-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-terracotta-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-gold-sun/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Banner Box */}
        <div className="glass-card-dark p-8 md:p-12 rounded-3xl mb-16 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="text-xs uppercase tracking-widest font-bold text-terracotta-400">
              {isHindi ? 'अगला कदम' : 'Pixelix · Next Step'}
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {isHindi ? 'आइए मिलकर बनाएं कुछ खास' : "Let's build what's next."}
            </h3>
            <p className="text-cream-200/80 text-sm sm:text-base leading-relaxed">
              {isHindi
                ? 'आज ही बातचीत शुरू करें। पहले आइडिया से अंतिम एसेट तक, Pixelix आपके बिज़नेस को आगे बढ़ाने में मदद करता है।'
                : 'From first idea to final asset, Pixelix helps you move forward. Speak directly with our founders today.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenInquiry}
              className="px-8 py-3.5 rounded-full font-bold text-sm text-white bg-sunset-gradient shadow-sunset hover:shadow-sunset-lg hover:scale-105 transition-all text-center cursor-pointer"
            >
              {isHindi ? 'बातचीत शुरू करें' : 'Start a Conversation Today'}
            </button>
            <a
              href={`https://wa.me/917056063863`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full font-bold text-sm text-cream-100 bg-white/10 hover:bg-white/15 border border-white/20 transition-all text-center"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-espresso-800">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div onClick={() => handleNav('home')} className="cursor-pointer">
              <PixelixLogo variant="white" size="lg" />
            </div>
            <p className="text-cream-300 text-sm leading-relaxed pr-4">
              {isHindi
                ? 'बढ़ते व्यवसायों के लिए क्रिएटिव और डिजिटल समाधान। ब्रांडिंग, डिजिटल प्रोडक्ट, AI, मार्केटप्लेस, विजुअल्स और कैंपेन — सब कुछ एक ही छत के नीचे।'
                : 'Creative & Digital Solutions for Growing Businesses. Brand identity, digital products, AI, marketplaces, visuals, and omni-channel campaigns — all under one roof.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-cream-400">
              <ShieldCheck className="w-4 h-4 text-terracotta-400" />
              <span>Registered Creative Agency • {CONTACT_INFO.domain}</span>
            </div>
          </div>

          {/* Col 2: Services Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {isHindi ? 'पेज नेविगेशन' : 'Site Pages'}
            </h4>
            <ul className="space-y-2 text-xs text-cream-300">
              <li><button onClick={() => handleNav('home')} className="hover:text-terracotta-400 transition-colors cursor-pointer">Home Overview</button></li>
              <li><button onClick={() => handleNav('services')} className="hover:text-terracotta-400 transition-colors cursor-pointer">All 16 Services & E-Com Catalog</button></li>
              <li><button onClick={() => handleNav('deliverables')} className="hover:text-terracotta-400 transition-colors cursor-pointer">Deliverables & 5 Logo Themes</button></li>
              <li><button onClick={() => handleNav('portfolio')} className="hover:text-terracotta-400 transition-colors cursor-pointer">Case Studies & Metrics</button></li>
              <li><button onClick={() => handleNav('estimator')} className="hover:text-terracotta-400 transition-colors cursor-pointer">Construction & Scope Calculator</button></li>
              <li><button onClick={() => handleNav('virtual-tours')} className="hover:text-terracotta-400 transition-colors cursor-pointer">3D Virtual Property Tours</button></li>
              <li><button onClick={() => handleNav('digital-advertising')} className="hover:text-terracotta-400 transition-colors cursor-pointer">Digital & Real Estate Ads</button></li>
              <li><button onClick={() => handleNav('about')} className="hover:text-terracotta-400 transition-colors cursor-pointer">Why Pixelix & Founders</button></li>
              <li><button onClick={() => handleNav('contact')} className="hover:text-terracotta-400 transition-colors cursor-pointer">Direct Contact & Form</button></li>
            </ul>
          </div>

          {/* Col 3: Direct Founders Contact (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {isHindi ? 'सीधा संपर्क' : 'Direct Contact'}
            </h4>
            <div className="space-y-3 text-xs text-cream-300">
              {CONTACT_INFO.founders.map((f, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-espresso-800/60 border border-espresso-700">
                  <div className="font-semibold text-white">{f.name}</div>
                  <div className="text-[11px] text-terracotta-400 mb-1">{f.role.split('&')[0]}</div>
                  <a href={f.telHref} className="hover:underline flex items-center gap-1.5 text-cream-200">
                    <Phone className="w-3 h-3 text-terracotta-400" />
                    <span>{f.phone}</span>
                  </a>
                </div>
              ))}
              <div className="pt-1 text-[11px] text-cream-400 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-gold" />
                <span>{CONTACT_INFO.domain}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {isHindi ? 'ग्रोथ इनसाइट्स' : 'Pixelix Insights'}
            </h4>
            <p className="text-xs text-cream-300">
              {isHindi
                ? 'डिजिटल ग्रोथ, AI ऑटोमेशन और ब्रांडिंग की रणनीतियां अपने इनबॉक्स में पाएं।'
                : 'Get periodic insights on digital engineering, brand growth, and marketplace strategies.'}
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-terracotta-900/50 border border-terracotta-500/40 text-xs text-terracotta-200">
                <CheckCircle2 className="w-4 h-4 text-terracotta-400" />
                <span>Subscribed! Welcome to Pixelix.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter business email"
                    className="w-full px-4 py-2.5 rounded-xl bg-espresso-800 border border-espresso-700 text-xs text-white placeholder-cream-400 focus:outline-none focus:border-terracotta-500"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="absolute right-1 top-1 bottom-1 px-3 bg-terracotta-500 hover:bg-terracotta-600 rounded-lg text-white transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-400 gap-4">
          <p>© {new Date().getFullYear()} Pixelix Creative Partner & Business Growth Systems. All rights reserved.</p>
          <div className="flex items-center gap-1 text-cream-400">
            <span>Built with precision &</span>
            <Heart className="w-3.5 h-3.5 text-terracotta-500 fill-terracotta-500" />
            <span>for growing businesses</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
