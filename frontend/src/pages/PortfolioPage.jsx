import React from 'react';
import ProjectShowcaseSection from '../components/sections/ProjectShowcaseSection';
import Badge from '../components/common/Badge';
import { Award } from 'lucide-react';

export default function PortfolioPage({ onOpenInquiry }) {
  return (
    <div className="pt-24 min-h-screen bg-[#FAF7F2] dark:bg-darkbg-base space-y-0 transition-colors">
      {/* Header Banner */}
      <section className="py-14 bg-[#F7F4EE] dark:bg-darkbg-surface border-b border-[#D6CCC2]/70 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <Badge variant="terracotta" className="text-xs">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Agency Case Studies</span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#26211E] dark:text-white tracking-tight font-display">
            Selected Works & Delivered Platforms
          </h1>
          <p className="text-base text-espresso-700 dark:text-cream-300 leading-relaxed">
            Explore live digital platforms delivered by CoreCodeX founders Sahil & Shubham — spanning high-frequency FinTech management, D2C fashion stores, hourly hotel booking engines, and premier wedding entertainment platforms.
          </p>
        </div>
      </section>

      {/* Main Project Showcase */}
      <ProjectShowcaseSection onOpenInquiry={onOpenInquiry} />

      {/* Client Trust Stats */}
      <section className="py-16 bg-[#F7F4EE] dark:bg-darkbg-surface border-t border-[#D6CCC2]/70 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-[#D6CCC2]/70 dark:border-white/10 shadow-sm space-y-2">
              <div className="text-4xl font-extrabold text-[#26211E] dark:text-[#FAF7F2] font-display">100%</div>
              <div className="text-xs font-bold text-[#26211E] dark:text-white uppercase tracking-wide">Client Delivery Record</div>
              <p className="text-xs text-espresso-700 dark:text-cream-300">Direct founder involvement by Sahil Prasad & Shubham Singh on every milestone.</p>
            </div>
            <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-[#D6CCC2]/70 dark:border-white/10 shadow-sm space-y-2">
              <div className="text-4xl font-extrabold text-[#827060] dark:text-[#D8C8B4] font-display">4 Live</div>
              <div className="text-xs font-bold text-[#26211E] dark:text-white uppercase tracking-wide">Production Portals</div>
              <p className="text-xs text-espresso-700 dark:text-cream-300">PaxTechs, Fluteon, StayByHour (N Hotels), and Great Popular Band.</p>
            </div>
            <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-[#D6CCC2]/70 dark:border-white/10 shadow-sm space-y-2">
              <div className="text-4xl font-extrabold text-[#26211E] dark:text-[#FAF7F2] font-display">99.9%</div>
              <div className="text-xs font-bold text-[#26211E] dark:text-white uppercase tracking-wide">Production SLA & Uptime</div>
              <p className="text-xs text-espresso-700 dark:text-cream-300">Ultra-low latency architectures, high-converting checkouts, and instant lead funnels.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
