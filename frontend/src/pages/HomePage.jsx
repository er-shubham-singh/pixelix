import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import ApproachSection from '../components/sections/ApproachSection';
import ServicesSection from '../components/sections/ServicesSection';
import WhyPixelixSection from '../components/sections/WhyPixelixSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import Badge from '../components/common/Badge';
import { ArrowRight, Calculator, FileCheck, Award, Sparkles, Compass, Building2 } from 'lucide-react';

export default function HomePage({
  services,
  selectedCategory,
  onSelectCategory,
  onViewServiceDetail,
  onBookService,
  onOpenInquiry,
  onNavigatePage
}) {
  return (
    <div className="space-y-0">
      
      {/* 1. Hero with Interactive 3D Sunset Pixel */}
      <HeroSection onOpenInquiry={() => onOpenInquiry()} />

      {/* 2. The Pixelix Approach: 6 Pillars Overview */}
      <ApproachSection
        onSelectCategory={(catId) => {
          if (onSelectCategory) onSelectCategory(catId);
          if (onNavigatePage) onNavigatePage('services');
        }}
      />

      {/* 3. Limited Featured Services (Max 4 items on Home Page) */}
      <ServicesSection
        services={services}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        onViewServiceDetail={onViewServiceDetail}
        onBookService={onBookService}
        isFeaturedOnly={true}
        maxDisplay={4}
        onNavigateToAll={() => onNavigatePage('services')}
      />

      {/* 4. Client Testimonials & Social Proof (5 Domains, 25 Verified Reviews) */}
      <TestimonialsSection onOpenInquiry={onOpenInquiry} />

      {/* 5. Why Pixelix Difference (Think, Build, Move forward) */}
      <WhyPixelixSection onOpenInquiry={() => onOpenInquiry()} />

      {/* 5. Fast Teasers for Dedicated Sub-pages (Deliverables, Estimator, Portfolio) */}
      <section className="py-20 bg-white dark:bg-[#1E1A17] border-t-2 border-[#E5DDD2] dark:border-white/10 transition-colors shadow-[0_-1px_0_0_rgba(178,159,141,0.15)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Mobile Section Index Ribbon */}
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] dark:bg-white/10 border border-[#D6CCC2] dark:border-white/10 text-[#827060] dark:text-[#D5C9BD] text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              <span>05 · EXPLORE ECOSYSTEM</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-[#D6CCC2]/70 to-transparent dark:from-white/10" />
          </div>

          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#827060] dark:text-[#D5C9BD]">
              SPECIALIZED PLATFORMS & PORTALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#26211E] dark:text-white font-display">
              Dive Deeper into CoreCodeX Systems
            </h2>
            <p className="text-xs sm:text-sm text-espresso-700 dark:text-cream-300">
              Interactive tools, deliverable breakdowns, and 3D virtual experiences ready to inspect.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Teaser 1: Deliverables & 5 Logo Themes */}
            <div
              onClick={() => onNavigatePage('deliverables')}
              className="p-6 rounded-3xl bg-[#FAF7F2] dark:bg-[#231F1C] border-2 border-emerald-500/30 hover:border-emerald-500 border-l-4 border-l-emerald-500 cursor-pointer shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100/70 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#26211E] dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors font-display">
                  Deliverables & Logos
                </h3>
                <p className="text-xs text-espresso-700 dark:text-cream-300 leading-relaxed">
                  5 Custom Vector Logos, 5 Print Collaterals, and Social Media PDF kits.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#D6CCC2]/60 dark:border-white/10 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>View Deliverables</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Teaser 2: Project Scope & Cost Estimator */}
            <div
              onClick={() => onNavigatePage('estimator')}
              className="p-6 rounded-3xl bg-[#FAF7F2] dark:bg-[#231F1C] border-2 border-amber-500/30 hover:border-amber-500 border-l-4 border-l-amber-500 cursor-pointer shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-100/70 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all shadow-inner">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#26211E] dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors font-display">
                  Project Scope Estimator
                </h3>
                <p className="text-xs text-espresso-700 dark:text-cream-300 leading-relaxed">
                  Bundle websites, marketplace listings, e-commerce, and marketing with live pricing and timelines.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#D6CCC2]/60 dark:border-white/10 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
                <span>Estimate Project Scope</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Teaser 3: Virtual 3D Property Tours */}
            <div
              onClick={() => onNavigatePage('virtual-tours')}
              className="p-6 rounded-3xl bg-[#FAF7F2] dark:bg-[#231F1C] border-2 border-sky-500/30 hover:border-sky-500 border-l-4 border-l-sky-500 cursor-pointer shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-sky-100/70 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-all shadow-inner">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#26211E] dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors font-display">
                  Virtual 3D Tours
                </h3>
                <p className="text-xs text-espresso-700 dark:text-cream-300 leading-relaxed">
                  Interactive 3D model flat walkthroughs, 360° panoramas, and commercial architectural renders.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#D6CCC2]/60 dark:border-white/10 flex items-center justify-between text-xs font-bold text-sky-600 dark:text-sky-400">
                <span>Launch 3D Tours</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Teaser 4: Proven Portfolio / Case Studies */}
            <div
              onClick={() => onNavigatePage('portfolio')}
              className="p-6 rounded-3xl bg-[#FAF7F2] dark:bg-[#231F1C] border-2 border-[#827060]/30 hover:border-[#827060] border-l-4 border-l-[#827060] cursor-pointer shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-[#EDE7DD] dark:bg-white/10 text-[#827060] dark:text-[#D5C9BD] flex items-center justify-center group-hover:bg-[#26211E] group-hover:text-white transition-all shadow-inner">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#26211E] dark:text-white group-hover:text-[#827060] dark:group-hover:text-[#D5C9BD] transition-colors font-display">
                  Case Studies & Metrics
                </h3>
                <p className="text-xs text-espresso-700 dark:text-cream-300 leading-relaxed">
                  Real client success stories across FinTech, D2C fashion, hourly hotel booking, and entertainment.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#D6CCC2]/60 dark:border-white/10 flex items-center justify-between text-xs font-bold text-[#827060] dark:text-[#D5C9BD]">
                <span>Explore Client Work</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Quick Consultation Banner */}
      <section className="py-16 bg-[#F2ECE1] dark:bg-[#141210] transition-colors border-t-2 border-[#DDD2C4] dark:border-white/10 shadow-[0_-1px_0_0_rgba(178,159,141,0.2)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] p-8 sm:p-12 text-center space-y-5 bg-[#231F1C] text-white border-2 border-[#3E3630] shadow-2xl transition-colors">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#FAF7F2] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#B29F8D]" />
              <span>Direct Founder Access</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Ready to Build What's Next?
            </h2>
            <p className="text-sm text-[#D5C9BD] max-w-xl mx-auto leading-relaxed">
              Connect directly with Founders Sahil Prasad (+91 6354729042 · Vadodara) & Shubham Singh (+91 9559506650 · Haridwar) to start your project.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onOpenInquiry()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm text-[#181513] bg-[#FAF7F2] hover:bg-[#EAE2D7] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Start Your Project Consultation
              </button>
              <button
                onClick={() => onNavigatePage('contact')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm text-[#FAF7F2] bg-white/10 hover:bg-white/15 border border-white/20 transition-all cursor-pointer"
              >
                Visit Contact Page
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
