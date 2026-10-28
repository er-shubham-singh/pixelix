import React from 'react';
import ProjectShowcaseSection from '../components/sections/ProjectShowcaseSection';
import Badge from '../components/common/Badge';
import { Award } from 'lucide-react';

export default function PortfolioPage({ onOpenInquiry }) {
  return (
    <div className="pt-24 min-h-screen bg-cream-50 dark:bg-darkbg-base space-y-0 transition-colors">
      {/* Header Banner */}
      <section className="py-14 bg-cream-100 dark:bg-darkbg-surface border-b border-cream-200 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <Badge variant="terracotta" className="text-xs">
            <Award className="w-3.5 h-3.5" />
            <span>Proven Agency Case Studies</span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-espresso-900 dark:text-white tracking-tight font-display">
            Selected Works & Case Studies
          </h1>
          <p className="text-base text-espresso-700 dark:text-cream-300 leading-relaxed">
            Explore tangible results across D2C commerce, omni-channel hospitality campaigns, and intelligent healthcare automation.
          </p>
        </div>
      </section>

      {/* Main Project Showcase */}
      <ProjectShowcaseSection onOpenInquiry={onOpenInquiry} />

      {/* Client Trust Stats */}
      <section className="py-16 bg-cream-100 dark:bg-darkbg-surface border-t border-cream-200 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-white/10 shadow-sm space-y-2">
              <div className="text-4xl font-extrabold text-terracotta-600 dark:text-terracotta-400 font-display">100%</div>
              <div className="text-xs font-bold text-espresso-900 dark:text-white uppercase tracking-wide">Client Satisfaction</div>
              <p className="text-xs text-espresso-700 dark:text-cream-300">Direct founder involvement on every production milestone.</p>
            </div>
            <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-white/10 shadow-sm space-y-2">
              <div className="text-4xl font-extrabold text-espresso-900 dark:text-white font-display">3.4x</div>
              <div className="text-xs font-bold text-espresso-900 dark:text-white uppercase tracking-wide">Average Order Growth</div>
              <p className="text-xs text-espresso-700 dark:text-cream-300">Multi-marketplace listing optimization across Amazon, Meesho & Flipkart.</p>
            </div>
            <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-white/10 shadow-sm space-y-2">
              <div className="text-4xl font-extrabold text-terracotta-600 dark:text-terracotta-400 font-display">&lt; 10s</div>
              <div className="text-xs font-bold text-espresso-900 dark:text-white uppercase tracking-wide">Chatbot Response Time</div>
              <p className="text-xs text-espresso-700 dark:text-cream-300">Bilingual 24/7 conversational customer intake agents.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
