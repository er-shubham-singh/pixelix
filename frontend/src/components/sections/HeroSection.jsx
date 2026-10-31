import React from 'react';
import HeroSunsetScene from '../3d/HeroSunsetScene';
import { CONTACT_INFO } from '../../config/contact';
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Star,
  ShieldCheck,
  Store,
  Code2,
  Palette,
  Bot,
  Boxes,
  PackageCheck,
  Share2
} from 'lucide-react';

export default function HeroSection({ onOpenInquiry }) {
  return (
    <section id="top" className="relative pt-24 sm:pt-28 pb-10 sm:pb-12 overflow-hidden bg-warm-mesh">
      {/* Decorative ambient sunset lighting beam */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-terracotta-500/20 via-gold/15 to-transparent blur-[120px] pointer-events-none -rotate-12" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-terracotta-300/20 dark:bg-terracotta-700/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clean, Spacious Typography & Primary CTAs (7 cols) */}
          <div className="md:col-span-7 space-y-6 text-center md:text-left">
            
            {/* Single Elegant Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ios-glass-pill shadow-xs">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-[11px] font-bold text-espresso-900 dark:text-white">
                4.9 / 5.0 Rated · 85+ Brands Scaled
              </span>
              <span className="w-1 h-1 rounded-full bg-terracotta-500" />
              <span className="text-[11px] text-terracotta-600 dark:text-terracotta-400 font-semibold">
                Growth Partner
              </span>
            </div>

            {/* Main Heading with Balanced Line Heights */}
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-espresso-900 dark:text-white tracking-tight leading-[1.15]">
              Creative & Digital Solutions <br className="hidden sm:inline" />
              for <span className="text-gradient-sunset">Growing Businesses.</span>
            </h1>

            {/* Concise, Scannable Subheading */}
            <p className="text-sm sm:text-base lg:text-lg text-espresso-700/90 dark:text-cream-200/90 max-w-xl font-normal leading-relaxed mx-auto md:mx-0">
              One creative partner for brand identity, high-converting marketplaces (Amazon, Flipkart, Meesho), and modern web & AI engineering — all under one roof.
            </p>

            {/* Clean Horizontal Proof Points */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 text-xs font-semibold text-espresso-800 dark:text-cream-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-terracotta-500 shrink-0" />
                <span>5 Vector Logo Themes & Brand Kit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-terracotta-500 shrink-0" />
                <span>Amazon, Flipkart & Meesho Operations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-terracotta-500 shrink-0" />
                <span>Modern 3D Web & Mobile Apps</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-1 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3.5">
              <button
                onClick={onOpenInquiry}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm text-white bg-sunset-gradient shadow-sunset hover:shadow-sunset-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Start a Conversation Today</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-sm text-espresso-800 dark:text-cream-100 ios-glass hover:bg-white/80 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-soft"
              >
                <Compass className="w-4 h-4 text-terracotta-500" />
                <span>Explore All 16 Services</span>
              </a>
            </div>

            {/* Minimalist Founder Involvement Trust Link */}
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-espresso-600 dark:text-cream-400">
              <ShieldCheck className="w-3.5 h-3.5 text-terracotta-500" />
              <span>Direct founder involvement:</span>
              <a
                href={CONTACT_INFO.founders[0].telHref}
                className="text-espresso-800 dark:text-cream-200 hover:text-terracotta-600 font-semibold underline underline-offset-2"
              >
                Vikas Chauhan
              </a>
              <span>&</span>
              <a
                href={CONTACT_INFO.founders[1].telHref}
                className="text-espresso-800 dark:text-cream-200 hover:text-terracotta-600 font-semibold underline underline-offset-2"
              >
                Shubham Singh
              </a>
            </div>

          </div>

          {/* Right Column: 3D Ecosystem Hub with Floating Animated Service Chips (5 cols) */}
          <div className="md:col-span-5 relative flex items-center justify-center py-6 sm:py-8">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[460px]">
              
              {/* Ambient radial glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-terracotta-500/25 via-gold/20 to-transparent blur-3xl pointer-events-none" />

              {/* ORBITAL SERVICE CHIPS - Scattered organically around the 3D Sphere (Not in two columns) */}

              {/* CHIP 1: Top-Left of Center - Amazon & Flipkart */}
              <div
                onClick={() => onOpenInquiry && onOpenInquiry('Amazon, Meesho & Flipkart Listing')}
                className="absolute -top-2.5 left-[8%] sm:left-[14%] z-20 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full ios-glass-card hover:border-terracotta-400/60 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-soft animate-float-1 group whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 group-hover:scale-125 transition-transform" />
                <Store className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="text-[11px] sm:text-xs font-semibold text-espresso-900 dark:text-cream-100">
                  Amazon & Flipkart
                </span>
              </div>

              {/* CHIP 2: Upper-Right Diagonal - 3D Web & Apps */}
              <div
                onClick={() => onOpenInquiry && onOpenInquiry('Website Development')}
                className="absolute top-[8%] right-0 sm:-right-6 lg:-right-8 z-20 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full ios-glass-card hover:border-terracotta-400/60 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-soft animate-float-2 group whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 group-hover:scale-125 transition-transform" />
                <Code2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span className="text-[11px] sm:text-xs font-semibold text-espresso-900 dark:text-cream-100">
                  3D Web & Apps
                </span>
              </div>

              {/* CHIP 3: Mid-Upper Left Outer - 5 Vector Logos */}
              <div
                onClick={() => onOpenInquiry && onOpenInquiry('Brand Identity (5 Vector Logos)')}
                className="absolute top-[28%] -left-2 sm:-left-8 lg:-left-12 z-20 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full ios-glass-card hover:border-terracotta-400/60 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-soft animate-float-3 group whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 shrink-0 group-hover:scale-125 transition-transform" />
                <Palette className="w-3.5 h-3.5 text-terracotta-600 dark:text-terracotta-400 shrink-0" />
                <span className="text-[11px] sm:text-xs font-semibold text-espresso-900 dark:text-cream-100">
                  5 Vector Logos
                </span>
              </div>

              {/* CHIP 4: Center-Mid Right Inner - AI Automations */}
              <div
                onClick={() => onOpenInquiry && onOpenInquiry('AI Integration & Automation')}
                className="absolute top-[46%] right-2 sm:-right-3 lg:-right-5 z-20 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full ios-glass-card hover:border-terracotta-400/60 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-soft animate-float-4 group whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 group-hover:scale-125 transition-transform" />
                <Bot className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                <span className="text-[11px] sm:text-xs font-semibold text-espresso-900 dark:text-cream-100">
                  AI Automations
                </span>
              </div>

              {/* CHIP 5: Lower-Mid Left - Order & Catalog */}
              <div
                onClick={() => onOpenInquiry && onOpenInquiry('Catalog & Order Management')}
                className="absolute top-[64%] -left-1 sm:-left-6 lg:-left-9 z-20 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full ios-glass-card hover:border-terracotta-400/60 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-soft animate-float-1 group whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 group-hover:scale-125 transition-transform" />
                <Boxes className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
                <span className="text-[11px] sm:text-xs font-semibold text-espresso-900 dark:text-cream-100">
                  Order & Catalog
                </span>
              </div>

              {/* CHIP 6: Lower-Right Diagonal - Logistics & Dispatch */}
              <div
                onClick={() => onOpenInquiry && onOpenInquiry('Dispatch & Logistics Management')}
                className="absolute top-[74%] right-0 sm:-right-5 lg:-right-7 z-20 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full ios-glass-card hover:border-terracotta-400/60 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-soft animate-float-2 group whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 group-hover:scale-125 transition-transform" />
                <PackageCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-[11px] sm:text-xs font-semibold text-espresso-900 dark:text-cream-100">
                  Logistics & Dispatch
                </span>
              </div>

              {/* CHIP 7: Bottom Left-Center - Social Creatives */}
              <div
                onClick={() => onOpenInquiry && onOpenInquiry('Campaigns (Screen & Print Collaterals)')}
                className="absolute -bottom-2.5 left-[12%] sm:left-[20%] z-20 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full ios-glass-card hover:border-terracotta-400/60 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-soft animate-float-3 group whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 group-hover:scale-125 transition-transform" />
                <Share2 className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 shrink-0" />
                <span className="text-[11px] sm:text-xs font-semibold text-espresso-900 dark:text-cream-100">
                  Social Creatives
                </span>
              </div>

              {/* Three.js Interactive Ecosystem Hub */}
              <HeroSunsetScene />
            </div>
          </div>

        </div>

        {/* Bottom Metrics Bar with iOS Frosted Glass */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-terracotta-200/60 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
          <div className="p-3.5 sm:p-4 rounded-2xl ios-glass-card">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-terracotta-600 dark:text-terracotta-400">16+</div>
            <div className="text-xs font-semibold text-espresso-800 dark:text-cream-200 mt-0.5">Full-Spectrum Capabilities</div>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl ios-glass-card">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-espresso-900 dark:text-white">5 Custom</div>
            <div className="text-xs font-semibold text-espresso-800 dark:text-cream-200 mt-0.5">Vector Logos & Brand Identity</div>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl ios-glass-card">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-terracotta-600 dark:text-terracotta-400">Marketplaces</div>
            <div className="text-xs font-semibold text-espresso-800 dark:text-cream-200 mt-0.5">Amazon, Flipkart, Meesho, Shopify</div>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl ios-glass-card">
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-espresso-900 dark:text-white">24/7</div>
            <div className="text-xs font-semibold text-espresso-800 dark:text-cream-200 mt-0.5">Direct Founder & AI Care</div>
          </div>
        </div>

      </div>
    </section>
  );
}
