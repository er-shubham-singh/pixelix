import React, { useState, useEffect } from 'react';
import InteractiveEstimatorSection from '../components/sections/InteractiveEstimatorSection';
import RealEstateConstructionCalculator from '../components/calculator/RealEstateConstructionCalculator';
import { ShieldCheck, Laptop, Building2 } from 'lucide-react';

export default function EstimatorPage({ initialMode = 'construction', onBookWithEstimator }) {
  // Mode switcher: 'tech' (Digital/Web/3D/Apps) vs 'construction' (House/Bricks/Cement/Steel)
  const [calculatorMode, setCalculatorMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash || '';
      if (hash.includes('tech-estimator') || hash.includes('digital-calculator')) return 'tech';
      if (hash.includes('real-estate') || hash.includes('construction') || hash.includes('calculator')) return 'construction';
    }
    return initialMode || 'construction';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '';
      if (hash.includes('tech-estimator') || hash.includes('digital-calculator')) {
        setCalculatorMode('tech');
      } else if (hash.includes('real-estate') || hash.includes('construction') || hash.includes('calculator')) {
        setCalculatorMode('construction');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-cream-50 dark:bg-darkbg-base space-y-0 transition-colors">
      
      {/* ========================================================
          CLEAN MODE SWITCHER (Direct & Minimalist)
         ======================================================== */}
      <section className="pt-6 pb-2 px-4 max-w-7xl mx-auto flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-darkbg-surface border border-cream-300 dark:border-white/10 shadow-sm max-w-full">
          
          {/* Option 1: Real Estate & Construction Calculator */}
          <button
            type="button"
            onClick={() => setCalculatorMode('construction')}
            className={`flex items-center gap-2.5 px-5 sm:px-7 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              calculatorMode === 'construction'
                ? 'bg-terracotta-500 text-white shadow-sm'
                : 'text-espresso-700 dark:text-cream-300 hover:text-espresso-950 dark:hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <span>Real Estate Construction & Bricks</span>
          </button>

          {/* Option 2: Tech & Digital Solutions Estimator */}
          <button
            type="button"
            onClick={() => setCalculatorMode('tech')}
            className={`flex items-center gap-2.5 px-5 sm:px-7 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              calculatorMode === 'tech'
                ? 'bg-terracotta-500 text-white shadow-sm'
                : 'text-espresso-700 dark:text-cream-300 hover:text-espresso-950 dark:hover:text-white'
            }`}
          >
            <Laptop className="w-4 h-4 shrink-0" />
            <span>Tech, Software & 3D Web</span>
          </button>
        </div>
      </section>

      {/* Main Content Area Based on Active Switch Mode */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {calculatorMode === 'construction' ? (
          <div className="animate-fade-in">
            <RealEstateConstructionCalculator
              onRequestQuote={(calcData) => {
                if (onBookWithEstimator) onBookWithEstimator(calcData);
              }}
            />
          </div>
        ) : (
          <div className="animate-fade-in">
            <InteractiveEstimatorSection onBookWithEstimator={onBookWithEstimator} />
          </div>
        )}
      </section>

      {/* Guarantee & Transparency Footnote */}
      <section className="py-10 bg-white dark:bg-darkbg-surface border-t border-cream-200 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-espresso-800 dark:text-cream-200">
            <ShieldCheck className="w-4 h-4 text-terracotta-600 dark:text-terracotta-400" />
            <span>Guaranteed Transparency • Configurable Material Indexes • Live WhatsApp Support</span>
          </div>
          <p className="text-xs text-espresso-600 dark:text-cream-400">
            Estimates provide typical execution baselines. For custom architectural drawings, structural approvals, or bespoke software architectures, connect directly with our founders.
          </p>
        </div>
      </section>
    </div>
  );
}
