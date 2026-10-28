import React from 'react';
import HeroSunsetScene from '../3d/HeroSunsetScene';
import Badge from '../common/Badge';
import { CONTACT_INFO } from '../../config/contact';
import { ArrowRight, Sparkles, CheckCircle2, Phone, Compass } from 'lucide-react';

export default function HeroSection({ onOpenInquiry }) {
  return (
    <section id="top" className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-warm-mesh">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-terracotta-300/30 dark:bg-terracotta-700/20 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-gold-sun/20 dark:bg-gold-sun/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2">
              <Badge variant="terracotta" className="px-3.5 py-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-terracotta-600 animate-pulse" />
                <span className="font-bold tracking-wide uppercase text-[11px]">
                  Pixelix · Creative Partner & Business Growth Systems
                </span>
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-espresso-900 dark:text-white tracking-tight leading-[1.12]">
              Creative & Digital Solutions for <span className="text-gradient-sunset">Growing Businesses.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-espresso-700/90 dark:text-cream-200/90 max-w-2xl font-normal leading-relaxed">
              <span className="font-semibold text-espresso-900 dark:text-white">One partner. Many ways to grow.</span>{' '}
              Brand identity, bespoke digital products (web & apps, AI automation, chatbots), marketplace growth (Amazon, Meesho, Flipkart), high-resolution visuals, and omnichannel campaigns — all engineered under one roof.
            </p>

            {/* Bullet Proof Points from PDF */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-espresso-800 dark:text-cream-200 font-medium max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-terracotta-500 shrink-0" />
                <span>5 Custom Vector Logos & Full Identity Kit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-terracotta-500 shrink-0" />
                <span>Catalog to Checkout (Amazon, Meesho, Flipkart)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-terracotta-500 shrink-0" />
                <span>Modern Web & App Dev with 3D Motion</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-terracotta-500 shrink-0" />
                <span>5 Print Flyers & 5 Social Creative PDFs</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenInquiry}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm text-white bg-sunset-gradient shadow-sunset hover:shadow-sunset-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>Start a Conversation Today</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto px-7 py-4 rounded-full font-bold text-sm text-espresso-800 dark:text-cream-100 bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-terracotta-200/80 dark:border-white/15 shadow-soft transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-terracotta-500" />
                <span>Explore Capabilities</span>
              </a>
            </div>

            {/* Founders Fast Callout */}
            <div className="pt-3 flex items-center justify-center lg:justify-start gap-4 text-xs text-espresso-700 dark:text-cream-300">
              <span className="font-semibold text-terracotta-600 dark:text-terracotta-400">Direct Founders:</span>
              <a href={CONTACT_INFO.founders[0].telHref} className="hover:underline flex items-center gap-1 font-medium">
                <Phone className="w-3 h-3 text-terracotta-500" />
                Vikas Chauhan ({CONTACT_INFO.founders[0].phone})
              </a>
              <span className="hidden sm:inline text-cream-400 dark:text-espresso-700">•</span>
              <a href={CONTACT_INFO.founders[1].telHref} className="hidden sm:flex hover:underline items-center gap-1 font-medium">
                Shubham Singh ({CONTACT_INFO.founders[1].phone})
              </a>
            </div>

          </div>

          {/* Right Column: 3D Sunset Interactive Canvas (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[480px]">
              {/* Soft decorative glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-terracotta-500/20 via-gold/20 to-transparent blur-2xl pointer-events-none" />
              
              {/* Real Three.js Canvas */}
              <HeroSunsetScene />
            </div>
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-16 pt-8 border-t border-terracotta-200/50 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl glass-card">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-terracotta-600 dark:text-terracotta-400">10+</div>
            <div className="text-xs font-semibold text-espresso-700 dark:text-cream-300 mt-0.5">Integrated Capabilities</div>
          </div>
          <div className="p-4 rounded-2xl glass-card">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-espresso-900 dark:text-white">5 Vector</div>
            <div className="text-xs font-semibold text-espresso-700 dark:text-cream-300 mt-0.5">Logos & PDF Identity Kit</div>
          </div>
          <div className="p-4 rounded-2xl glass-card">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-terracotta-600 dark:text-terracotta-400">3 Big</div>
            <div className="text-xs font-semibold text-espresso-700 dark:text-cream-300 mt-0.5">Marketplaces (Amazon, Meesho, Flipkart)</div>
          </div>
          <div className="p-4 rounded-2xl glass-card">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-espresso-900 dark:text-white">24/7</div>
            <div className="text-xs font-semibold text-espresso-700 dark:text-cream-300 mt-0.5">Intelligent AI & Care</div>
          </div>
        </div>

      </div>
    </section>
  );
}
