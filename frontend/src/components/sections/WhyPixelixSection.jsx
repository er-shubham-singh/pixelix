import React from 'react';
import Floating3DCard from '../3d/Floating3DCard';
import { useLanguage } from '../../context/LanguageContext';
import { CONTACT_INFO } from '../../config/contact';
import { Brain, Code2, Rocket, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function WhyPixelixSection({ onOpenInquiry }) {
  const { isHindi } = useLanguage();

  const steps = [
    {
      num: '01',
      icon: Brain,
      titleEn: 'Think',
      titleHi: 'सोच',
      subtitleEn: 'Creative & Market Intelligence',
      subtitleHi: 'क्रिएटिव सोच और रणनीति',
      descEn: 'We analyze your target market, competitors, and buyer psychology to design a brand identity and positioning that stands out.',
      descHi: 'हम आपके लक्षित बाजार, प्रतिस्पर्धियों और खरीदार मनोविज्ञान का विश्लेषण करते हैं ताकि आपकी ब्रांड पहचान सबसे अलग दिखे।'
    },
    {
      num: '02',
      icon: Code2,
      titleEn: 'Build',
      titleHi: 'बनाएं',
      subtitleEn: 'Digital Execution & Architecture',
      subtitleHi: 'आधुनिक डिजिटल निर्माण',
      descEn: 'We engineer lightning-fast websites, mobile apps, 3D interactive graphics, and AI integrations with clean, scalable code.',
      descHi: 'हम आधुनिक तकनीक (React, Vite, Node, AI चैटबॉट्स) का उपयोग कर तेज़ और स्केलेबल डिजिटल प्लेटफॉर्म बनाते हैं।'
    },
    {
      num: '03',
      icon: Rocket,
      titleEn: 'Move forward',
      titleHi: 'आगे बढ़ें',
      subtitleEn: 'Practical Growth & Scaling',
      subtitleHi: 'निरंतर बिज़नेस ग्रोथ',
      descEn: 'From catalog to checkout on Amazon/Meesho/Flipkart and multi-channel campaigns, we ensure continuous revenue momentum.',
      descHi: 'मार्केटप्लेस लिस्टिंग, कैटलॉग ऑप्टिमाइजेशन और डिजिटल-प्रिंट कैंपेन के ज़रिए बिक्री और ग्राहकों की संख्या बढ़ाएं।'
    }
  ];

  return (
    <section className="py-24 bg-espresso-900 text-cream-100 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta-700/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-400">
            {isHindi ? 'द पिक्सेलिरिक्स डिफ़रेंस' : 'THE PIXELIX DIFFERENCE'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {isHindi ? 'Pixelix क्यों चुनें?' : 'Why Pixelix?'}
          </h2>
          <p className="text-sm sm:text-base text-cream-300 leading-relaxed">
            {isHindi
              ? 'क्रिएटिव सोच, डिजिटल एक्ज़ीक्यूशन और बिज़नेस सपोर्ट — एक भरोसेमंद टीम के साथ।'
              : 'Creative thinking, digital execution, and practical business support in one flexible team.'}
          </p>
        </div>

        {/* 3 Step Progression Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Floating3DCard key={idx} intensity={12} className="h-full">
                <div className="h-full glass-card-dark p-8 rounded-3xl border border-white/10 hover:border-terracotta-500/50 transition-all flex flex-col justify-between group">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-terracotta-500/20 border border-terracotta-500/30 text-terracotta-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-terracotta-500 group-hover:text-white transition-all duration-300">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="font-display text-4xl font-extrabold text-white/10 group-hover:text-terracotta-400/30 transition-colors">
                        {step.num}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs uppercase font-bold tracking-wider text-terracotta-400">
                        {isHindi ? step.subtitleHi : step.subtitleEn}
                      </div>
                      <h3 className="text-2xl font-bold text-white mt-1 font-display">
                        {isHindi ? step.titleHi : step.titleEn}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-cream-300/90 leading-relaxed">
                      {isHindi ? step.descHi : step.descEn}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-cream-400">
                    <span>Phase 0{idx + 1} Execution</span>
                    <HeartHandshake className="w-4 h-4 text-terracotta-400" />
                  </div>
                </div>
              </Floating3DCard>
            );
          })}
        </div>

        {/* Bottom Quote Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-terracotta-900/60 via-espresso-800 to-terracotta-900/60 border border-terracotta-500/30 text-center max-w-4xl mx-auto space-y-4">
          <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            "{isHindi
              ? 'पहले आइडिया से अंतिम एसेट तक, Pixelix आपके बिज़नेस को आगे बढ़ाने में मदद करता है।'
              : 'From first idea to final asset, Pixelix helps you move forward.'}"
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onOpenInquiry}
              className="px-7 py-3 rounded-full font-bold text-xs text-white bg-sunset-gradient shadow-sunset hover:scale-105 transition-transform flex items-center gap-2"
            >
              <span>{isHindi ? 'अभी शुरुआत करें' : 'Work With Pixelix Today'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
