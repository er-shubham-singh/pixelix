import React from 'react';
import Floating3DCard from '../3d/Floating3DCard';
import Badge from '../common/Badge';
import { FALLBACK_PROJECTS } from '../../services/serviceDataFallback';
import { Sparkles, ArrowUpRight, TrendingUp } from 'lucide-react';

export default function ProjectShowcaseSection({ onOpenInquiry }) {
  return (
    <section id="portfolio" className="py-16 sm:py-20 bg-white dark:bg-darkbg-base relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Inspired by Image 2 & 3: "Projects that drive results") */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <Badge variant="terracotta" className="px-3 py-1 text-[10px] sm:text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Client Works</span>
              </Badge>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-espresso-900 dark:text-white tracking-tight font-display">
              Projects That <span className="text-gradient-sunset">Drive Results.</span>
            </h2>
            
            <p className="text-xs sm:text-sm text-espresso-700/90 dark:text-cream-300 leading-relaxed">
              Real projects engineered across e-commerce, D2C retail, and modern digital platforms — merging tactile visual identity with conversion-focused performance.
            </p>
          </div>

          <button
            onClick={onOpenInquiry}
            className="px-6 py-3 rounded-full font-bold text-xs text-white bg-sunset-gradient shadow-sunset hover:shadow-sunset-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <span>Discuss Your Project Scope</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* 2x2 Editorial Portfolio Grid (Matching Reference Image 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {FALLBACK_PROJECTS.map((project) => (
            <Floating3DCard key={project.id} intensity={6} className="h-full">
              <div
                onClick={onOpenInquiry}
                className="h-full rounded-3xl bg-cream-50/90 dark:bg-darkbg-card border border-cream-300 dark:border-white/10 overflow-hidden flex flex-col justify-between hover:border-terracotta-400/60 dark:hover:border-terracotta-400/50 shadow-soft hover:shadow-sunset/20 transition-all duration-300 group cursor-pointer"
              >
                {/* Image Container with Warm Sunset Vignette */}
                <div className="relative h-60 sm:h-64 overflow-hidden bg-espresso-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/90 via-espresso-950/30 to-transparent" />
                  
                  {/* Top Bar on Image: Client Pill & Circular Arrow Button (Reference Image 3 signature) */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-darkbg-card/90 backdrop-blur-md text-espresso-900 dark:text-cream-100 text-[11px] font-bold shadow-sm">
                      {project.client}
                    </span>

                    <div className="w-10 h-10 rounded-full bg-white/90 dark:bg-darkbg-card/90 text-espresso-900 dark:text-cream-100 flex items-center justify-center shadow-md group-hover:bg-sunset-gradient group-hover:text-white transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Bottom Tagline on Image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs text-cream-200 line-clamp-1 font-medium">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-espresso-900 dark:text-white group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400 transition-colors font-display">
                      {project.title}
                    </h3>
                    <p className="text-xs text-espresso-700 dark:text-cream-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics Box */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white dark:bg-darkbg-surface border border-cream-200 dark:border-white/10 text-center">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-base sm:text-lg font-extrabold text-terracotta-600 dark:text-terracotta-400 font-display">
                          {metric.value}
                        </div>
                        <div className="text-[10px] text-espresso-600 dark:text-cream-400 font-semibold leading-tight">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags & Action Strip */}
                  <div className="flex items-center justify-between pt-2 border-t border-cream-200 dark:border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-full bg-cream-200/80 dark:bg-white/10 text-[10px] font-semibold text-espresso-800 dark:text-cream-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-bold text-terracotta-600 dark:text-terracotta-400 group-hover:underline flex items-center gap-1 shrink-0">
                      <span>View Scope</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </div>
            </Floating3DCard>
          ))}
        </div>

      </div>
    </section>
  );
}
