import React from 'react';
import HeroSunsetScene from '../3d/HeroSunsetScene';
import { CONTACT_INFO } from '../../config/contact';
import {
  ArrowRight,
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
    <section id="top" className="relative pt-28 xs:pt-32 sm:pt-36 md:pt-36 pb-12 sm:pb-16 overflow-hidden bg-warm-mesh">
      {/* Decorative ambient cashmere lighting beam (Ivory & Taupe Silk aesthetic) */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-[#D8C8B4]/25 via-[#B29F8D]/15 to-transparent blur-[120px] pointer-events-none -rotate-12" />
      <div className="absolute top-1/4 -left-16 w-80 h-80 bg-[#B29F8D]/15 dark:bg-[#B29F8D]/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Clean, Spacious Typography & Primary CTAs (7 cols) - Rendered 2nd on mobile, 1st on desktop */}
          <div className="order-2 md:order-1 md:col-span-7 space-y-6 text-center md:text-left">

            {/* Single Elegant Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ios-glass-pill border border-[#D6CCC2]/70 dark:border-white/10 shadow-xs">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-[11px] font-bold text-espresso-900 dark:text-cream-100">
                4.9 / 5.0 Rated · 30+ Brands Scaled
              </span>
              <span className="w-1 h-1 rounded-full bg-[#B29F8D]" />
              <span className="text-[11px] text-[#827060] dark:text-[#C7B9A4] font-semibold">
                Growth Partner
              </span>
            </div>

            {/* Main Heading with Balanced Line Heights */}
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#26211E] dark:text-white tracking-tight leading-[1.15]">
              Creative & Digital Solutions <br className="hidden sm:inline" />
              for <span className="text-[#26211E] dark:text-cream-100">Growing Businesses.</span>
            </h1>

            {/* Concise, Scannable Subheading */}
            <p className="text-sm sm:text-base lg:text-lg text-espresso-800/90 dark:text-cream-200/90 max-w-xl font-normal leading-relaxed mx-auto md:mx-0">
              One creative partner for brand identity, high-converting marketplaces (Amazon, Flipkart, Meesho), and modern web & AI engineering — all under one roof.
            </p>

            {/* CTAs - Clean, Spacious, Identical to Reference Image */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <button
                onClick={onOpenInquiry}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm text-white bg-[#26211E] hover:bg-[#3D332B] shadow-[0_4px_16px_rgba(38,33,30,0.25)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Start a Conversation Today</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-sm text-[#26211E] dark:text-[#F7F4EE] bg-white/70 dark:bg-white/5 border border-[#D6CCC2] dark:border-white/15 hover:border-[#B29F8D] hover:bg-white dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Compass className="w-4 h-4 text-[#827060] dark:text-[#C7B9A4]" />
                <span>Explore All 16 Services</span>
              </a>
            </div>

            {/* Minimalist Founder Involvement Trust Link */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-espresso-700 dark:text-cream-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#827060] dark:text-[#C7B9A4]" />
              <span>Direct founder involvement:</span>
              <a
                href={CONTACT_INFO.founders[0].telHref}
                className="text-espresso-900 dark:text-cream-200 hover:text-[#827060] dark:hover:text-[#D5C9BD] font-semibold underline underline-offset-2"
              >
                Sahil Prasad
              </a>
              <span className="text-[#827060] dark:text-[#C7B9A4]">({CONTACT_INFO.founders[0].phone} · Vadodara, Gujarat)</span>
            </div>

          </div>

          {/* Right Column: 3D Ecosystem Hub with Floating Animated Service Chips (5 cols) - Rendered 1st on mobile, 2nd on desktop */}
          <div className="order-1 md:order-2 md:col-span-5 relative flex items-center justify-center pt-6 pb-2 sm:py-4">
            <div className="relative w-full max-w-[320px] xs:max-w-[350px] sm:max-w-[380px] md:max-w-[420px] mx-auto">

              {/* Ambient radial glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D8C8B4]/25 via-[#B29F8D]/15 to-transparent blur-3xl pointer-events-none" />

              {/* Connector lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-60 -z-5" viewBox="0 0 400 400" fill="none">
                <line x1="80" y1="40" x2="200" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-[#B29F8D]/40" />
                <line x1="320" y1="50" x2="200" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-[#B29F8D]/40" />
                <line x1="30" y1="140" x2="200" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-[#B29F8D]/40" />
                <line x1="370" y1="180" x2="200" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-[#B29F8D]/40" />
                <line x1="40" y1="260" x2="200" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-[#B29F8D]/40" />
                <line x1="360" y1="290" x2="200" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-[#B29F8D]/40" />
                <line x1="160" y1="370" x2="200" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-[#B29F8D]/40" />
              </svg>

              {/* ORBITAL SERVICE CHIPS - "10 Ivory & Taupe" Charcoal capsules with white text */}

              {/* CHIP 1: Top-Left - Amazon & Flipkart */}
              <div
                onClick={() => onOpenInquiry && onOpenInquiry('Amazon, Meesho & Flipkart Listing')}
                className="absolute top-0 left-1 sm:left-6 z-20 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full bg-[#26211E] text-white border border-[#443B34] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 animate-float-1 group whitespace-nowrap"
              >
                <Store className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D8C8B4] shrink-0" />
                <span className="text-[10px] sm:text-xs font-medium sm:font-semibold text-white">
                  Amazon & Flipkart
                </span>
              </div>

              {/* CHIP 2: Upper-Right - 3D Web & Apps */}
              <div
                onClick={() => onOpenInquiry && onOpenInquiry('Website Development')}
                className="absolute top-2 right-1 sm:right-4 z-20 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full bg-[#26211E] text-white border border-[#443B34] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 animate-float-2 group whitespace-nowrap"
              >
                <Code2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D8C8B4] shrink-0" />
                <span className="text-[10px] sm:text-xs font-medium sm:font-semibold text-white">
                  3D Web & Apps
                </span>
              </div>

              {/* CHIP 3: Mid Left - 5 Vector Logos */}
              <div
                onClick={() => onOpenInquiry && onOpenInquiry('Brand Identity (5 Vector Logos)')}
                className="absolute top-[30%] left-0 sm:left-1 z-20 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full bg-[#26211E] text-white border border-[#443B34] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 animate-float-3 group whitespace-nowrap"
              >
                <Palette className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D8C8B4] shrink-0" />
                <span className="text-[10px] sm:text-xs font-medium sm:font-semibold text-white">
                  5 Vector Logos
                </span>
              </div>

              {/* CHIP 4: Mid Right - AI Automations */}
              <div
                onClick={() => onOpenInquiry && onOpenInquiry('AI Integration & Automation')}
                className="absolute top-[44%] right-0 sm:right-2 z-20 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full bg-[#26211E] text-white border border-[#443B34] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 animate-float-4 group whitespace-nowrap"
              >
                <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D8C8B4] shrink-0" />
                <span className="text-[10px] sm:text-xs font-medium sm:font-semibold text-white">
                  AI Automations
                </span>
              </div>

              {/* CHIP 5: Lower-Mid Left - Order & Catalog */}
              <div
                onClick={() => onOpenInquiry && onOpenInquiry('Catalog & Order Management')}
                className="absolute top-[62%] left-0.5 sm:left-3 z-20 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full bg-[#26211E] text-white border border-[#443B34] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 animate-float-1 group whitespace-nowrap"
              >
                <Boxes className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D8C8B4] shrink-0" />
                <span className="text-[10px] sm:text-xs font-medium sm:font-semibold text-white">
                  Order & Catalog
                </span>
              </div>

              {/* CHIP 6: Lower-Right - Logistics & Dispatch */}
              <div
                onClick={() => onOpenInquiry && onOpenInquiry('Dispatch & Logistics Management')}
                className="absolute top-[72%] right-0.5 sm:right-3 z-20 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full bg-[#26211E] text-white border border-[#443B34] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 animate-float-2 group whitespace-nowrap"
              >
                <PackageCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D8C8B4] shrink-0" />
                <span className="text-[10px] sm:text-xs font-medium sm:font-semibold text-white">
                  Logistics & Dispatch
                </span>
              </div>

              {/* CHIP 7: Bottom Center - Social Creatives */}
              <div
                onClick={() => onOpenInquiry && onOpenInquiry('Campaigns (Screen & Print Collaterals)')}
                className="absolute bottom-0 left-[14%] sm:left-[24%] z-20 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full bg-[#26211E] text-white border border-[#443B34] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 animate-float-3 group whitespace-nowrap"
              >
                <Share2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D8C8B4] shrink-0" />
                <span className="text-[10px] sm:text-xs font-medium sm:font-semibold text-white">
                  Social Creatives
                </span>
              </div>

              {/* CHIP 8: Bottom-Right 3D Ecosystem Hub Pill */}
              <div className="absolute bottom-1 right-0.5 sm:right-2 z-20 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/80 dark:bg-black/50 border border-[#D5C9BD] dark:border-white/20 text-[#5C534B] dark:text-[#D5C9BD] text-[9px] sm:text-[10px] font-semibold flex items-center gap-1 sm:gap-1.5 shadow-xs whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B29F8D] animate-ping" />
                <span>3D Ecosystem Hub</span>
              </div>

              {/* Three.js Interactive Ecosystem Hub */}
              <HeroSunsetScene />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
