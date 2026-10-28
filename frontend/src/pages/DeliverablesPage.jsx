import React from 'react';
import DeliverablesShowcase from '../components/sections/DeliverablesShowcase';
import Badge from '../components/common/Badge';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function DeliverablesPage({ onOpenInquiry }) {
  return (
    <div className="pt-24 min-h-screen bg-cream-50 dark:bg-darkbg-base space-y-0 transition-colors">
      {/* Header Banner */}
      <section className="py-14 bg-cream-100 dark:bg-darkbg-surface border-b border-cream-200 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <Badge variant="terracotta" className="text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guaranteed Deliverables Specification</span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-espresso-900 dark:text-white tracking-tight font-display">
            Production-Ready Asset Kits & Deliverables
          </h1>
          <p className="text-base text-espresso-700 dark:text-cream-300 leading-relaxed">
            Clear, quantifiable deliverables extracted from our brand specification. Receive complete vector masters, commercial rights, and high-resolution files.
          </p>
        </div>
      </section>

      {/* Main Deliverables Showcase Section */}
      <DeliverablesShowcase onOpenInquiry={onOpenInquiry} />

      {/* Action Banner */}
      <section className="py-16 bg-espresso-900 dark:bg-darkbg-surface text-cream-100 border-t border-espresso-800 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Need a custom deliverable kit tailored to your brand?
          </h3>
          <p className="text-sm text-cream-300 max-w-xl mx-auto">
            Speak directly with Vikas Chauhan & Shubham Singh to finalize your identity and campaign specifications.
          </p>
          <button
            onClick={onOpenInquiry}
            className="px-8 py-3.5 rounded-full font-bold text-sm text-white bg-sunset-gradient shadow-sunset hover:scale-105 transition-transform inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Request Custom Deliverable Scope</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
