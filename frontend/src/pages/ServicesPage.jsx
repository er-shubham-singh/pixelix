import React from 'react';
import ServicesSection from '../components/sections/ServicesSection';
import Badge from '../components/common/Badge';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function ServicesPage({
  services,
  selectedCategory,
  onSelectCategory,
  onViewServiceDetail,
  onBookService,
  onOpenInquiry
}) {
  return (
    <div className="pt-24 min-h-screen bg-cream-50 dark:bg-darkbg-base space-y-0 transition-colors">
      {/* Header Banner */}
      <section className="py-14 bg-cream-100 dark:bg-darkbg-surface border-b border-cream-200 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <Badge variant="terracotta" className="text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>All 10 Core Services</span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-espresso-900 dark:text-white tracking-tight font-display">
            Full Spectrum Digital & Growth Services
          </h1>
          <p className="text-base text-espresso-700 dark:text-cream-300 leading-relaxed">
            Browse our complete catalog of 10 specialized services. Filter by domain, inspect deliverables, and request custom proposals directly.
          </p>
        </div>
      </section>

      {/* Complete Services Catalog with Search & Filter */}
      <ServicesSection
        services={services}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        onViewServiceDetail={onViewServiceDetail}
        onBookService={onBookService}
        isFeaturedOnly={false}
      />

      {/* Callout */}
      <section className="py-14 bg-white dark:bg-darkbg-surface border-t border-cream-200 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h3 className="text-2xl font-bold font-display text-espresso-900 dark:text-white">
            Have multiple services in mind?
          </h3>
          <p className="text-sm text-espresso-700 dark:text-cream-300">
            Combine services into a single unified growth retainer or project package to optimize budget and delivery timelines.
          </p>
          <button
            onClick={() => onOpenInquiry('Bundled Services Package')}
            className="px-7 py-3 rounded-full font-bold text-xs text-white bg-sunset-gradient shadow-sunset hover:scale-105 transition-transform inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Consult on Bundled Package</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
}
