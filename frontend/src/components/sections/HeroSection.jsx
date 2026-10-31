import React from 'react';
import HeroSunsetScene from '../3d/HeroSunsetScene';
import Badge from '../common/Badge';
import { CONTACT_INFO } from '../../config/contact';
import { ArrowRight, Sparkles, CheckCircle2, Phone, Compass } from 'lucide-react';

export default function HeroSection({ onOpenInquiry }) {
  return (
    <section id="top" className="relative min-h-[90vh] flex items-center pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 overflow-hidden bg-warm-mesh">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-terracotta-300/30 dark:bg-terracotta-700/20 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-gold-sun/20 dark:bg-gold-sun/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography & CTAs (7 cols on md and up) */}
          <div className="md:col-span-7 space-y-5 text-center md:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2">
              <Badge variant="terracotta" className="px-3.5 py-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-terracotta-600 dark:text-terracotta-400 animate-pulse" />
                <span className="font-bold tracking-wide uppercase text-[10px] sm:text-[11px]">
                  Pixelix · Creative Partner & Growth Systems
                </span>
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-espresso-900 dark:text-white tracking-tight leading-[1.14]">
              Creative & Digital Solutions for{' '}
              <span className="text-gradient-sunset block sm:inline">Growing Businesses.</span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base lg:text-lg text-espresso-800/90 dark:text-cream-200/90 max-w-2xl font-normal leading-relaxed mx-auto md:mx-0">
              <span className="font-semibold text-espresso-900 dark:text-white">One partner. Many ways to grow.</span>{' '}
              Brand identity, bespoke digital products (web & apps, AI automation), marketplace growth (Amazon, Meesho, Flipkart), high-resolution visuals, and omnichannel campaigns — all engineered under one roof.
            </p>

            {/* Bullet Proof Points from PDF formatted as micro-cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 max-w-2xl mx-auto md:mx-0">
              <div className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white/75 dark:bg-white/5 border border-terracotta-200/60 dark:border-white/10 shadow-soft text-left backdrop-blur-sm">
                <div className="w-6 h-6 rounded-lg bg-terracotta-100 dark:bg-terracotta-900/50 flex items-center justify-center shrink-0 mt-0.5 text-terracotta-600 dark:text-terracotta-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-espresso-900 dark:text-white leading-snug">
                    5 Custom Vector Logos
                  </div>
                  <div className="text-[10px] text-espresso-600 dark:text-cream-400">
                    Themes, Brand Book & Identity Kit
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white/75 dark:bg-white/5 border border-terracotta-200/60 dark:border-white/10 shadow-soft text-left backdrop-blur-sm">
                <div className="w-6 h-6 rounded-lg bg-terracotta-100 dark:bg-terracotta-900/50 flex items-center justify-center shrink-0 mt-0.5 text-terracotta-600 dark:text-terracotta-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-espresso-900 dark:text-white leading-snug">
                    Marketplace Operations
                  </div>
                  <div className="text-[10px] text-espresso-600 dark:text-cream-400">
                    Amazon, Flipkart, Meesho, Quick-Com
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white/75 dark:bg-white/5 border border-terracotta-200/60 dark:border-white/10 shadow-soft text-left backdrop-blur-sm">
                <div className="w-6 h-6 rounded-lg bg-terracotta-100 dark:bg-terracotta-900/50 flex items-center justify-center shrink-0 mt-0.5 text-terracotta-600 dark:text-terracotta-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-espresso-900 dark:text-white leading-snug">
                    Web, App & AI Systems
                  </div>
                  <div className="text-[10px] text-espresso-600 dark:text-cream-400">
                    Modern Dev, 3D Motion & Agents
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white/75 dark:bg-white/5 border border-terracotta-200/60 dark:border-white/10 shadow-soft text-left backdrop-blur-sm">
                <div className="w-6 h-6 rounded-lg bg-terracotta-100 dark:bg-terracotta-900/50 flex items-center justify-center shrink-0 mt-0.5 text-terracotta-600 dark:text-terracotta-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-espresso-900 dark:text-white leading-snug">
                    Campaigns & Social PDFs
                  </div>
                  <div className="text-[10px] text-espresso-600 dark:text-cream-400">
                    5 Print Flyers & 5 Social Creatives
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3.5">
              <button
                onClick={onOpenInquiry}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-sm text-white bg-sunset-gradient shadow-sunset hover:shadow-sunset-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>Start a Conversation Today</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-sm text-espresso-800 dark:text-cream-100 bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-terracotta-200/80 dark:border-white/15 shadow-soft transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-terracotta-500" />
                <span>Explore All 16 Services</span>
              </a>
            </div>

            {/* Founders Fast Callout with clean badge chips */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-espresso-700 dark:text-cream-300">
                Direct Founders:
              </span>
              <a
                href={CONTACT_INFO.founders[0].telHref}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 dark:bg-white/5 border border-terracotta-200/60 dark:border-white/10 text-espresso-900 dark:text-cream-100 hover:text-terracotta-600 hover:border-terracotta-400 transition-all font-semibold text-xs shadow-xs"
              >
                <Phone className="w-3 h-3 text-terracotta-500" />
                <span>Vikas: {CONTACT_INFO.founders[0].phone}</span>
              </a>
              <a
                href={CONTACT_INFO.founders[1].telHref}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 dark:bg-white/5 border border-terracotta-200/60 dark:border-white/10 text-espresso-900 dark:text-cream-100 hover:text-terracotta-600 hover:border-terracotta-400 transition-all font-semibold text-xs shadow-xs"
              >
                <Phone className="w-3 h-3 text-terracotta-500" />
                <span>Shubham: {CONTACT_INFO.founders[1].phone}</span>
              </a>
            </div>

          </div>

          {/* Right Column: 3D Sunset Interactive Canvas (5 cols on md and up) */}
          <div className="md:col-span-5 relative flex items-center justify-center mt-4 md:mt-0">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] lg:max-w-[480px]">
              {/* Soft decorative glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-terracotta-500/20 via-gold/20 to-transparent blur-2xl pointer-events-none" />
              
              {/* Real Three.js Canvas */}
              <HeroSunsetScene />
            </div>
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-terracotta-200/60 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-4 rounded-2xl glass-card">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-terracotta-600 dark:text-terracotta-400">16+</div>
            <div className="text-xs font-semibold text-espresso-800 dark:text-cream-200 mt-0.5">Full-Spectrum Capabilities</div>
          </div>
          <div className="p-4 rounded-2xl glass-card">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-espresso-900 dark:text-white">5 Custom</div>
            <div className="text-xs font-semibold text-espresso-800 dark:text-cream-200 mt-0.5">Vector Logos & Brand Identity</div>
          </div>
          <div className="p-4 rounded-2xl glass-card">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-terracotta-600 dark:text-terracotta-400">Marketplaces</div>
            <div className="text-xs font-semibold text-espresso-800 dark:text-cream-200 mt-0.5">Amazon, Flipkart, Meesho, Shopify</div>
          </div>
          <div className="p-4 rounded-2xl glass-card">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-espresso-900 dark:text-white">24/7</div>
            <div className="text-xs font-semibold text-espresso-800 dark:text-cream-200 mt-0.5">Direct Founder & AI Care</div>
          </div>
        </div>

      </div>
    </section>
  );
}
