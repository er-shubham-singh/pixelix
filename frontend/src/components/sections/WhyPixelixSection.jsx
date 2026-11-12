import React from 'react';
import Floating3DCard from '../3d/Floating3DCard';
import { useLanguage } from '../../context/LanguageContext';
import { CONTACT_INFO } from '../../config/contact';
import { Brain, Code2, Rocket, ArrowRight, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

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
    <section id="why-pixelix" className="py-16 sm:py-20 bg-cream-100/50 dark:bg-darkbg-base relative overflow-hidden transition-colors border-t border-b border-cream-200 dark:border-white/10">
      {/* Background ambient luxury emerald glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -top-24 right-1/4 w-80 h-60 bg-emerald-400/10 dark:bg-[#10B981]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isHindi ? 'द पिक्सेलिरिक्स डिफ़रेंस' : 'THE PIXELIX DIFFERENCE'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-espresso-900 dark:text-white tracking-tight font-display">
            {isHindi ? 'Pixelix क्यों चुनें?' : 'Why Pixelix?'}
          </h2>

          <p className="text-xs sm:text-sm text-espresso-700 dark:text-cream-200/80 max-w-2xl mx-auto leading-relaxed">
            {isHindi
              ? 'क्रिएटिव सोच, डिजिटल एक्ज़ीक्यूशन और बिज़नेस सपोर्ट — एक भरोसेमंद टीम के साथ।'
              : 'Creative thinking, digital execution, and practical business support in one flexible team.'}
          </p>
        </div>

        {/* 3 Step Progression Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Floating3DCard key={idx} intensity={10} className="h-full">
                <div className="h-full glass-card dark:glass-card-dark p-7 sm:p-8 rounded-3xl border border-emerald-500/20 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/60 shadow-soft dark:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all flex flex-col justify-between group">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="font-display text-4xl font-extrabold text-espresso-900/10 dark:text-white/10 group-hover:text-emerald-600/30 dark:group-hover:text-emerald-400/30 transition-colors">
                        {step.num}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs uppercase font-bold tracking-wider text-emerald-700 dark:text-emerald-400">
                        {isHindi ? step.subtitleHi : step.subtitleEn}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-espresso-900 dark:text-white mt-1 font-display group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                        {isHindi ? step.titleHi : step.titleEn}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-[13px] text-espresso-700 dark:text-cream-200/80 leading-relaxed">
                      {isHindi ? step.descHi : step.descEn}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-emerald-500/15 dark:border-white/10 flex items-center justify-between text-xs text-espresso-500 dark:text-cream-400">
                    <span>Phase 0{idx + 1} Execution</span>
                    <HeartHandshake className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
              </Floating3DCard>
            );
          })}
        </div>

        {/* Bottom Quote Banner (Harmonized with Testimonials & Brand Aesthetic) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/95 dark:bg-gradient-to-r dark:from-[#02140D] dark:via-[#052015] dark:to-[#02140D] border border-emerald-500/20 dark:border-emerald-500/30 shadow-xl dark:shadow-[0_0_60px_-15px_rgba(16,185,129,0.25)] text-center max-w-4xl mx-auto space-y-5 transition-colors">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Dedicated Growth Execution</span>
          </div>

          <p className="text-lg sm:text-xl font-bold text-espresso-900 dark:text-white leading-relaxed font-display max-w-2xl mx-auto">
            "{isHindi
              ? 'पहले आइडिया से अंतिम एसेट तक, Pixelix आपके बिज़नेस को आगे बढ़ाने में मदद करता है।'
              : 'From first idea to final asset, Pixelix helps you move forward.'}"
          </p>

          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={onOpenInquiry}
              className="px-8 py-3.5 rounded-full font-extrabold text-xs sm:text-sm text-espresso-950 bg-gradient-to-r from-[#FBE29D] via-[#F5D485] to-[#D4A346] shadow-[0_0_20px_rgba(245,212,133,0.35)] hover:shadow-[0_0_30px_rgba(245,212,133,0.55)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{isHindi ? 'अभी शुरुआत करें' : 'Work With Pixelix Today'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
