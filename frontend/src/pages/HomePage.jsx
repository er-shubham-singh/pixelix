import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import ApproachSection from '../components/sections/ApproachSection';
import ServicesSection from '../components/sections/ServicesSection';
import WhyPixelixSection from '../components/sections/WhyPixelixSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import Badge from '../components/common/Badge';
import { ArrowRight, Calculator, FileCheck, Award, Sparkles } from 'lucide-react';

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
      <section className="py-20 bg-cream-100 dark:bg-darkbg-base border-t border-b border-cream-200 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600 dark:text-terracotta-400">
              EXPLORE MORE PAGES
            </span>
            <h2 className="text-3xl font-extrabold text-espresso-900 dark:text-white font-display">
              Dive Deeper into Pixelix Systems
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Teaser 1: Deliverables & 5 Logo Themes */}
            <div
              onClick={() => onNavigatePage('deliverables')}
              className="glass-card p-7 rounded-3xl cursor-pointer hover:border-terracotta-400/60 dark:hover:border-terracotta-400/50 hover:shadow-sunset transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-terracotta-50 dark:bg-terracotta-900/40 text-terracotta-600 dark:text-terracotta-400 flex items-center justify-center group-hover:bg-sunset-gradient group-hover:text-white transition-all shadow-inner">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-espresso-900 dark:text-white group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400 transition-colors font-display">
                  Deliverables & 5 Logo Themes
                </h3>
                <p className="text-xs text-espresso-700 dark:text-cream-300 leading-relaxed">
                  5 Custom Vector Logos in PDF, 5 Print Collaterals, and 5 Social Media PDFs extracted from our theme specs.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-cream-200 dark:border-white/10 flex items-center justify-between text-xs font-bold text-terracotta-600 dark:text-terracotta-400">
                <span>View All Deliverable Kits</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Teaser 2: Interactive Project Estimator */}
            <div
              onClick={() => onNavigatePage('estimator')}
              className="glass-card p-7 rounded-3xl cursor-pointer hover:border-terracotta-400/60 dark:hover:border-terracotta-400/50 hover:shadow-sunset transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-gold-light/50 dark:bg-amber-950/40 text-gold-dark dark:text-amber-400 flex items-center justify-center group-hover:bg-sunset-gradient group-hover:text-white transition-all shadow-inner">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-espresso-900 dark:text-white group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400 transition-colors font-display">
                  Interactive Scope Estimator
                </h3>
                <p className="text-xs text-espresso-700 dark:text-cream-300 leading-relaxed">
                  Pick and bundle custom websites, apps, logos, or marketplace listings for instant cost and turnaround calculation.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-cream-200 dark:border-white/10 flex items-center justify-between text-xs font-bold text-terracotta-600 dark:text-terracotta-400">
                <span>Calculate Project Scope</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Teaser 3: Proven Portfolio / Case Studies */}
            <div
              onClick={() => onNavigatePage('portfolio')}
              className="glass-card p-7 rounded-3xl cursor-pointer hover:border-terracotta-400/60 dark:hover:border-terracotta-400/50 hover:shadow-sunset transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-sage-light/50 dark:bg-emerald-950/40 text-sage-dark dark:text-emerald-400 flex items-center justify-center group-hover:bg-sunset-gradient group-hover:text-white transition-all shadow-inner">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-espresso-900 dark:text-white group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400 transition-colors font-display">
                  Case Studies & Metrics
                </h3>
                <p className="text-xs text-espresso-700 dark:text-cream-300 leading-relaxed">
                  Real client success stories in D2C e-commerce, restaurant hospitality launch campaigns, and AI chatbots.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-cream-200 dark:border-white/10 flex items-center justify-between text-xs font-bold text-terracotta-600 dark:text-terracotta-400">
                <span>Explore Client Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Quick Consultation Banner */}
      <section className="py-16 bg-espresso-900 text-cream-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <Badge variant="terracotta" className="text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Founder Access</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Ready to Build What's Next?
          </h2>
          <p className="text-sm text-cream-300 max-w-xl mx-auto leading-relaxed">
            Connect directly with Vikas Chauhan (+91 7056063863) & Shubham Singh (+91 95595 06650) to start your project.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenInquiry()}
              className="px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-sunset-gradient shadow-sunset hover:shadow-sunset-lg hover:scale-105 transition-all cursor-pointer"
            >
              Start Your Project Consultation
            </button>
            <button
              onClick={() => onNavigatePage('contact')}
              className="px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm text-cream-100 bg-white/10 hover:bg-white/15 border border-white/20 transition-all cursor-pointer"
            >
              Visit Contact Page
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
