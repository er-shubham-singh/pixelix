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
      <section className="py-20 bg-cream-100/60 dark:bg-darkbg-base border-t border-b border-cream-200 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              EXPLORE MORE PAGES
            </span>
            <h2 className="text-3xl font-extrabold text-espresso-900 dark:text-white font-display">
              Dive Deeper into CoreCodeX Systems
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Teaser 1: Deliverables & 5 Logo Themes */}
            <div
              onClick={() => onNavigatePage('deliverables')}
              className="glass-card p-6 rounded-3xl cursor-pointer hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:text-white transition-all shadow-inner">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-espresso-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors font-display">
                  Deliverables & Logos
                </h3>
                <p className="text-xs text-espresso-700 dark:text-cream-300 leading-relaxed">
                  5 Custom Vector Logos, 5 Print Collaterals, and Social Media PDF kits.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-cream-200 dark:border-white/10 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>View Deliverables</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Teaser 2: Project Scope & Cost Estimator */}
            <div
              onClick={() => onNavigatePage('estimator')}
              className="glass-card p-6 rounded-3xl cursor-pointer hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] transition-all group flex flex-col justify-between border border-emerald-500/30"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-gold-light/50 dark:bg-amber-950/40 text-gold-dark dark:text-amber-400 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:text-white transition-all shadow-inner">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-espresso-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors font-display">
                  Project Scope Estimator
                </h3>
                <p className="text-xs text-espresso-700 dark:text-cream-300 leading-relaxed">
                  Bundle websites, marketplace listings, e-commerce, and marketing with live pricing and timelines.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-cream-200 dark:border-white/10 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Estimate Project Scope</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Teaser 3: Virtual 3D Property Tours */}
            <div
              onClick={() => onNavigatePage('virtual-tours')}
              className="glass-card p-6 rounded-3xl cursor-pointer hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:text-white transition-all shadow-inner">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-espresso-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors font-display">
                  Virtual 3D Tours
                </h3>
                <p className="text-xs text-espresso-700 dark:text-cream-300 leading-relaxed">
                  Interactive 3D model flat walkthroughs, 360° panoramas, and commercial architectural renders.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-cream-200 dark:border-white/10 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Launch 3D Tours</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Teaser 4: Proven Portfolio / Case Studies */}
            <div
              onClick={() => onNavigatePage('portfolio')}
              className="glass-card p-6 rounded-3xl cursor-pointer hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:text-white transition-all shadow-inner">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-espresso-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors font-display">
                  Case Studies & Metrics
                </h3>
                <p className="text-xs text-espresso-700 dark:text-cream-300 leading-relaxed">
                  Real client success stories in D2C e-commerce, real estate leads, and AI chatbots.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-cream-200 dark:border-white/10 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Explore Client Work</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Quick Consultation Banner */}
      <section className="py-16 bg-cream-100/60 dark:bg-darkbg-base transition-colors border-t border-cream-200 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] p-8 sm:p-12 text-center space-y-5 bg-white/95 dark:bg-gradient-to-r dark:from-[#02140D] dark:via-[#052015] dark:to-[#02140D] border border-emerald-500/20 dark:border-emerald-500/30 shadow-xl dark:shadow-[0_0_60px_-15px_rgba(16,185,129,0.25)] transition-colors">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Founder Access</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-espresso-900 dark:text-white tracking-tight">
              Ready to Build What's Next?
            </h2>
            <p className="text-sm text-espresso-700 dark:text-cream-300 max-w-xl mx-auto leading-relaxed">
              Connect directly with Founder Sahil Prasad (+91 6354729042 · Vadodara, Gujarat) to start your project.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onOpenInquiry()}
                className="px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-[#26211E] hover:bg-[#3D332B] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Start Your Project Consultation
              </button>
              <button
                onClick={() => onNavigatePage('contact')}
                className="px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm text-espresso-900 dark:text-cream-100 bg-cream-100 hover:bg-cream-200 dark:bg-white/10 dark:hover:bg-white/15 border border-emerald-500/20 dark:border-white/20 transition-all cursor-pointer"
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
