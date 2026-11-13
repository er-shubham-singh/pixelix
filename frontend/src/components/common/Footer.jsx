import React, { useState } from 'react';
import PixelixLogo from './PixelixLogo';
import { CONTACT_INFO } from '../../config/contact';
import { useLanguage } from '../../context/LanguageContext';
import { subscribeNewsletter } from '../../services/inquiryApi';
import { Phone, Mail, Globe, Send, CheckCircle2, ShieldCheck, Heart, MapPin } from 'lucide-react';

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
    <footer className="relative bg-[#181513] text-[#FAF7F2] overflow-hidden pt-16 sm:pt-20 pb-12 border-t border-[#3E3630]/70 shadow-[0_-20px_50px_-20px_rgba(24,21,19,0.5)]">
      {/* Background ambient lighting in champagne & taupe tones */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D8C8B4]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#B29F8D]/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Banner Box */}
        <div className="rounded-[2.5rem] p-8 md:p-12 mb-16 bg-[#231F1C] border border-[#3E3630] shadow-[0_10px_40px_rgba(0,0,0,0.35)] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="text-xs uppercase tracking-widest font-bold text-[#B29F8D]">
              {isHindi ? 'अगला कदम' : 'CoreCodeX · Next Step'}
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              {isHindi ? 'आइए मिलकर बनाएं कुछ खास' : "Let's build what's next."}
            </h3>
            <p className="text-[#D5C9BD] text-sm sm:text-base leading-relaxed">
              {isHindi
                ? 'आज ही बातचीत शुरू करें। पहले आइडिया से अंतिम एसेट तक, CoreCodeX आपके बिज़नेस को आगे बढ़ाने में मदद करता है।'
                : 'From first idea to final asset, CoreCodeX helps you move forward. Speak directly with Founder Sahil Prasad today.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenInquiry}
              className="px-8 py-3.5 rounded-full font-bold text-sm text-[#181513] bg-[#FAF7F2] hover:bg-[#EAE2D7] shadow-md hover:scale-105 active:scale-95 transition-all text-center cursor-pointer"
            >
              {isHindi ? 'बातचीत शुरू करें' : 'Start a Conversation Today'}
            </button>
            <a
              href={CONTACT_INFO.founders[0].whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full font-bold text-sm text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[#3E3630]/70">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div onClick={() => handleNav('home')} className="cursor-pointer">
              <PixelixLogo variant="white" size="lg" />
            </div>
            <p className="text-[#C7B9A4] text-sm leading-relaxed pr-4">
              {isHindi
                ? 'बढ़ते व्यवसायों के लिए क्रिएटिव और डिजिटल समाधान। ब्रांडिंग, डिजिटल प्रोडक्ट, AI, मार्केटप्लेस, विजुअल्स और कैंपेन — सब कुछ एक ही छत के नीचे।'
                : 'Creative & Digital Solutions for Growing Businesses. Brand identity, digital products, AI, marketplaces, visuals, and omni-channel campaigns — all under one roof.'}
            </p>
            <div className="space-y-1 text-xs text-[#827060] dark:text-[#C7B9A4]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B29F8D]" />
                <span>Registered Agency • CoreCodeX • {CONTACT_INFO.domain}</span>
              </div>
              <div className="flex items-center gap-2 text-[#C7B9A4]">
                <MapPin className="w-4 h-4 text-[#B29F8D]" />
                <span>Vadodara, Gujarat, India</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {isHindi ? 'पेज नेविगेशन' : 'Site Pages'}
            </h4>
            <ul className="space-y-2 text-xs text-[#C7B9A4]">
              <li><button onClick={() => handleNav('home')} className="hover:text-white transition-colors cursor-pointer">Home Overview</button></li>
              <li><button onClick={() => handleNav('services')} className="hover:text-white transition-colors cursor-pointer">All 16 Services & E-Com Catalog</button></li>
              <li><button onClick={() => handleNav('deliverables')} className="hover:text-white transition-colors cursor-pointer">Deliverables & 5 Logo Themes</button></li>
              <li><button onClick={() => handleNav('portfolio')} className="hover:text-white transition-colors cursor-pointer">Case Studies & Metrics</button></li>
              <li><button onClick={() => handleNav('estimator')} className="hover:text-white transition-colors cursor-pointer">Construction & Scope Calculator</button></li>
              <li><button onClick={() => handleNav('virtual-tours')} className="hover:text-white transition-colors cursor-pointer">3D Virtual Property Tours</button></li>
              <li><button onClick={() => handleNav('digital-advertising')} className="hover:text-white transition-colors cursor-pointer">Digital & Real Estate Ads</button></li>
              <li><button onClick={() => handleNav('about')} className="hover:text-white transition-colors cursor-pointer">Why CoreCodeX & Founders</button></li>
              <li><button onClick={() => handleNav('contact')} className="hover:text-white transition-colors cursor-pointer">Direct Contact & Form</button></li>
            </ul>
          </div>

          {/* Col 3: Direct Owner Contact (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {isHindi ? 'सीधा संपर्क' : 'Direct Owner Contact'}
            </h4>
            <div className="space-y-3 text-xs text-[#C7B9A4]">
              <div className="p-3 rounded-2xl bg-[#231F1C] border border-[#3E3630] shadow-xs">
                <div className="font-bold text-white text-xs">{CONTACT_INFO.founders[0].name}</div>
                <div className="text-[11px] text-[#B29F8D] mb-1">{CONTACT_INFO.founders[0].role}</div>
                <a href={CONTACT_INFO.founders[0].telHref} className="hover:underline flex items-center gap-1.5 text-[#FAF7F2] font-medium">
                  <Phone className="w-3 h-3 text-[#B29F8D]" />
                  <span>{CONTACT_INFO.founders[0].phone}</span>
                </a>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-[#C7B9A4]">
                  <MapPin className="w-3 h-3 text-[#B29F8D]" />
                  <span>Vadodara, Gujarat</span>
                </div>
              </div>
              <div className="pt-1 text-[11px] text-[#827060] dark:text-[#C7B9A4] flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#D8C8B4]" />
                <span>{CONTACT_INFO.domain}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {isHindi ? 'ग्रोथ इनसाइट्स' : 'CoreCodeX Insights'}
            </h4>
            <p className="text-xs text-[#C7B9A4]">
              {isHindi
                ? 'डिजिटल ग्रोथ, AI ऑटोमेशन और ब्रांडिंग की रणनीतियां अपने इनबॉक्स में पाएं।'
                : 'Get periodic insights on digital engineering, brand growth, and marketplace strategies.'}
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#B29F8D]/15 border border-[#B29F8D]/30 text-xs text-[#FAF7F2]">
                <CheckCircle2 className="w-4 h-4 text-[#B29F8D]" />
                <span>Subscribed! Welcome to CoreCodeX.</span>
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
                    className="w-full px-4 py-2.5 rounded-xl bg-[#231F1C] border border-[#3E3630] text-xs text-white placeholder-[#827060] focus:outline-none focus:border-[#B29F8D] shadow-xs"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#B29F8D] hover:bg-[#827060] text-white rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#827060] dark:text-[#C7B9A4] gap-4">
          <p>© {new Date().getFullYear()} CoreCodeX Creative Partner & Business Growth Systems. Vadodara, Gujarat. All rights reserved.</p>
          <div className="flex items-center gap-1 text-[#827060] dark:text-[#C7B9A4]">
            <span>Built with precision &</span>
            <Heart className="w-3.5 h-3.5 text-[#B29F8D] fill-[#B29F8D]" />
            <span>for growing businesses</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
