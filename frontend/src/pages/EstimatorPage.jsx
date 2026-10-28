import React from 'react';
import InteractiveEstimatorSection from '../components/sections/InteractiveEstimatorSection';
import Badge from '../components/common/Badge';
import { Calculator, ShieldCheck } from 'lucide-react';

export default function EstimatorPage({ onBookWithEstimator }) {
  return (
    <div className="pt-24 min-h-screen bg-cream-50 dark:bg-darkbg-base space-y-0 transition-colors">
      {/* Header Banner */}
      <section className="py-14 bg-cream-100 dark:bg-darkbg-surface border-b border-cream-200 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <Badge variant="terracotta" className="text-xs">
            <Calculator className="w-3.5 h-3.5" />
            <span>Scope & Pricing Transparency</span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-espresso-900 dark:text-white tracking-tight font-display">
            Interactive Scope & Pricing Calculator
          </h1>
          <p className="text-base text-espresso-700 dark:text-cream-300 leading-relaxed">
            Select your exact engineering, brand identity, or marketplace requirements for a real-time turnaround and cost calculation.
          </p>
        </div>
      </section>

      {/* Estimator Widget Section */}
      <InteractiveEstimatorSection onBookWithEstimator={onBookWithEstimator} />

      {/* Guarantee Notes */}
      <section className="py-12 bg-white dark:bg-darkbg-surface border-t border-cream-200 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-espresso-800 dark:text-cream-200">
            <ShieldCheck className="w-4 h-4 text-terracotta-600 dark:text-terracotta-400" />
            <span>Guaranteed Milestones • Zero Platform Lock-in • Weekly Progress Demos</span>
          </div>
          <p className="text-xs text-espresso-600 dark:text-cream-400">
            Estimates provide typical execution baselines. Custom enterprise architectures or bespoke LLM pipelines can be tailored during your introductory strategy call.
          </p>
        </div>
      </section>
    </div>
  );
}
