import React, { useState } from 'react';
import TerracottaOrbitCanvas from '../3d/TerracottaOrbitCanvas';
import Floating3DCard from '../3d/Floating3DCard';
import Badge from '../common/Badge';
import { PIXELIX_THEME } from '../../config/theme';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function DeliverablesShowcase({ onOpenInquiry }) {
  const [selectedConcept, setSelectedConcept] = useState('sunset-pixel');

  const activeThemeConcept = PIXELIX_THEME.logoConcepts.find(c => c.id === selectedConcept) || PIXELIX_THEME.logoConcepts[0];

  const primaryDeliverables = [
    {
      badge: 'Brand Identity Deliverable',
      title: '5 Custom Vector Logos',
      format: 'Professional Vector PDF & SVG Master',
      specs: 'Includes logo marks, vertical/horizontal lockups, monochrome variants, typography guidelines, and social avatar assets.',
      highlight: 'As featured in theme specification (Sunset Pixel, Terracotta Orbit, Cream Glass, Sage Bloom, Golden Horizon).'
    },
    {
      badge: 'Screen & Print Deliverable',
      title: '5 Flyers, Brochures & Offline Banners',
      format: 'High-Resolution 300 DPI PDF',
      specs: 'Print-ready CMYK layouts, folding specs for tri-folds, exhibition hoardings, menus, and digital PDF flyers.',
      highlight: 'Engineered to captivate both passing street traffic and high-end storefront visitors.'
    },
    {
      badge: 'Content Systems Deliverable',
      title: '5 Social Media Creative PDFs',
      format: 'Multi-Format Social Package',
      specs: 'Tailored for Instagram 1:1 feeds, 9:16 vertical stories/reels covers, Facebook widescreen banners, and profile graphics.',
      highlight: 'Consistent weekly content engine so your brand maintains active digital authority.'
    }
  ];

  return (
    <section id="deliverables" className="py-24 bg-white dark:bg-darkbg-base relative overflow-hidden transition-colors">
      {/* Background ambient accents */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-terracotta-100/60 dark:bg-terracotta-900/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600 dark:text-terracotta-400">
            OFFICIAL ASSET DELIVERABLES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-espresso-900 dark:text-white tracking-tight font-display">
            Clear, High-Resolution Deliverables You Own
          </h2>
          <p className="text-sm sm:text-base text-espresso-700 dark:text-cream-300 leading-relaxed">
            Zero ambiguity. Pixelix provides concrete, production-ready vector assets, high-resolution PDFs, and marketplace kits.
          </p>
        </div>

        {/* 3 Core Deliverables Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {primaryDeliverables.map((item, idx) => (
            <Floating3DCard key={idx} intensity={10} className="h-full">
              <div className="h-full glass-card p-8 rounded-3xl border border-cream-300/80 dark:border-white/10 flex flex-col justify-between hover:border-terracotta-400/60 dark:hover:border-terracotta-400/50 transition-all shadow-soft">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="terracotta" className="text-[10px]">
                      {item.badge}
                    </Badge>
                    <span className="text-xs font-bold text-espresso-500 dark:text-cream-300">0{idx + 1}</span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-espresso-900 dark:text-white font-display">
                      {item.title}
                    </h3>
                    <div className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-cream-200 dark:bg-white/10 text-espresso-800 dark:text-cream-200 text-[11px] font-semibold">
                      {item.format}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-espresso-700 dark:text-cream-300 leading-relaxed">
                    {item.specs}
                  </p>

                  <div className="p-3 rounded-2xl bg-terracotta-50/70 dark:bg-terracotta-900/40 border border-terracotta-200/50 dark:border-terracotta-700/50 text-[11px] text-terracotta-800 dark:text-terracotta-300 font-medium">
                    ✨ {item.highlight}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-cream-200 dark:border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-espresso-600 dark:text-cream-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-terracotta-600 dark:text-terracotta-400" />
                    <span>Commercial Rights</span>
                  </span>
                  <button
                    onClick={onOpenInquiry}
                    className="text-xs font-bold text-terracotta-600 dark:text-terracotta-400 hover:text-terracotta-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request Kit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Floating3DCard>
          ))}
        </div>

        {/* Interactive Theme & 5 Logo Concepts Showcase from theme.pdf */}
        <div className="bg-cream-100/90 dark:bg-darkbg-surface rounded-3xl p-8 sm:p-12 border border-cream-300 dark:border-white/10 transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Concept selector tabs (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-terracotta-600 dark:text-terracotta-400">
                THEME & COLOR COMBINATION (THEME.PDF)
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-espresso-900 dark:text-white font-display">
                5 Distinct Visual Identifiers
              </h3>
              <p className="text-xs sm:text-sm text-espresso-700 dark:text-cream-300 leading-relaxed">
                Explore the five curated brand identity directions defined in the Pixelix theme guide — from tactile terracotta sunsets to soft translucent glass.
              </p>

              <div className="space-y-2 pt-2">
                {PIXELIX_THEME.logoConcepts.map((concept) => (
                  <button
                    key={concept.id}
                    onClick={() => setSelectedConcept(concept.id)}
                    className={`w-full p-3.5 rounded-2xl text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      selectedConcept === concept.id
                        ? 'bg-white dark:bg-darkbg-card shadow-md border-l-4 border-terracotta-500 text-espresso-900 dark:text-white'
                        : 'bg-white/40 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 text-espresso-700 dark:text-cream-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-br ${concept.gradient}`} />
                      <span className="text-xs sm:text-sm font-bold">{concept.title}</span>
                    </div>
                    <span className="text-[10px] text-terracotta-600 dark:text-terracotta-400 font-semibold bg-terracotta-50 dark:bg-terracotta-900/50 px-2.5 py-0.5 rounded-full">
                      {concept.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Active Concept Interactive 3D Showcase (7 cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-darkbg-card rounded-3xl p-6 sm:p-8 border border-cream-200 dark:border-white/10 shadow-soft flex flex-col md:flex-row items-center gap-6 transition-colors">
              
              {/* 3D Orbit Canvas */}
              <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
                <TerracottaOrbitCanvas className="w-48 h-48" />
              </div>

              {/* Concept details */}
              <div className="space-y-3 flex-1 text-center md:text-left">
                <div className="inline-block">
                  <Badge variant="terracotta" className="text-xs">
                    {activeThemeConcept.badge}
                  </Badge>
                </div>
                <h4 className="text-2xl font-bold text-espresso-900 dark:text-white font-display">
                  {activeThemeConcept.title}
                </h4>
                <p className="text-xs sm:text-sm text-espresso-700 dark:text-cream-300 leading-relaxed">
                  "{activeThemeConcept.description}"
                </p>

                {/* Color swatches */}
                <div className="pt-2">
                  <div className="text-[10px] uppercase font-bold text-espresso-500 dark:text-cream-400 mb-1.5">Color Palette Tokens:</div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="w-6 h-6 rounded-lg bg-terracotta-500 shadow-sm" title="Sunset Terracotta (#C84523)" />
                    <span className="w-6 h-6 rounded-lg bg-gold-sun shadow-sm" title="Golden Sun (#E9C46A)" />
                    <span className="w-6 h-6 rounded-lg bg-sage shadow-sm" title="Sage Green (#7F9C8D)" />
                    <span className="w-6 h-6 rounded-lg bg-cream-100 border border-cream-300 shadow-sm" title="Warm Cream (#FAF6EE)" />
                    <span className="w-6 h-6 rounded-lg bg-espresso-900 shadow-sm" title="Warm Espresso (#1C1917)" />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={onOpenInquiry}
                    className="px-5 py-2.5 rounded-full font-bold text-xs text-white bg-sunset-gradient shadow-sunset hover:scale-105 transition-transform cursor-pointer"
                  >
                    Select this Theme for My Brand
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
