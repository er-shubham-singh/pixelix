import React from 'react';
import InteractiveEstimatorSection from '../components/sections/InteractiveEstimatorSection';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function EstimatorPage({ onBookWithEstimator }) {
  return (
    <div className="pt-24 min-h-screen bg-cream-50 dark:bg-darkbg-base space-y-0 transition-colors">
      
      {/* Header Banner */}
      <section className="pt-8 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#FAF7F2] dark:bg-[#1C1816] text-[#827060] dark:text-[#D1C7BD] border border-[#EADBCC] dark:border-white/10 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#B29F8D]" />
          <span>INSTANT PROJECT ESTIMATOR</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#26211E] dark:text-[#FAF7F2] tracking-tight">
          Plan Your Project Scope & Investment
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#827060] dark:text-[#D1C7BD] leading-relaxed">
          Select the exact services your business needs to get an instant cost and delivery timeline breakdown. Direct founder-led execution by Sahil Prasad & Shubham Singh.
        </p>
      </section>

      {/* Main Interactive Estimator */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="animate-fade-in">
          <InteractiveEstimatorSection onBookWithEstimator={onBookWithEstimator} />
        </div>
      </section>

      {/* Guarantee & Transparency Footnote */}
      <section className="py-10 bg-white dark:bg-darkbg-surface border-t border-cream-200 dark:border-white/10 transition-colors mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-espresso-800 dark:text-cream-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>100% Transparent Indian SMB Pricing • Milestone Deliveries • Direct WhatsApp Support</span>
          </div>
          <p className="text-xs text-espresso-600 dark:text-cream-400">
            Estimates provide clear execution baselines. Need a bespoke multi-platform architecture or continuous growth retainer? Connect directly with Founders Sahil Prasad (+91 6354729042 · Vadodara) & Shubham Singh (+91 9559506650 · Haridwar).
          </p>
        </div>
      </section>
    </div>
  );
}
