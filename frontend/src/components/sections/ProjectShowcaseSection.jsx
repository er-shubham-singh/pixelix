import React from 'react';
import Floating3DCard from '../3d/Floating3DCard';
import Badge from '../common/Badge';
import { FALLBACK_PROJECTS } from '../../services/serviceDataFallback';
import { ExternalLink, TrendingUp, Award, ArrowUpRight } from 'lucide-react';

export default function ProjectShowcaseSection({ onOpenInquiry }) {
  return (
    <section id="portfolio" className="py-24 bg-white dark:bg-darkbg-base relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600 dark:text-terracotta-400">
              PROVEN CASE STUDIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-espresso-900 dark:text-white tracking-tight font-display">
              Work That Moves Businesses Forward
            </h2>
            <p className="text-sm sm:text-base text-espresso-700 dark:text-cream-300 leading-relaxed">
              Real projects engineered across e-commerce, hospitality, and healthcare combining tactile visual branding with high-speed digital architecture.
            </p>
          </div>

          <button
            onClick={onOpenInquiry}
            className="px-6 py-3 rounded-full font-bold text-xs text-espresso-900 dark:text-cream-100 bg-cream-200 dark:bg-white/10 hover:bg-cream-300 dark:hover:bg-white/20 transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
          >
            <span>Discuss Similar Project</span>
            <ArrowUpRight className="w-4 h-4 text-terracotta-600 dark:text-terracotta-400" />
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FALLBACK_PROJECTS.map((project) => (
            <Floating3DCard key={project.id} intensity={8} className="h-full">
              <div className="h-full rounded-3xl bg-cream-50 dark:bg-darkbg-card border border-cream-200 dark:border-white/10 overflow-hidden flex flex-col justify-between hover:border-terracotta-400/60 dark:hover:border-terracotta-400/50 hover:shadow-sunset transition-all duration-300 group">
                
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/90 via-espresso-900/30 to-transparent" />
                  
                  {/* Category Pill on Image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-white/90 dark:bg-espresso-900/90 backdrop-blur-md text-espresso-900 dark:text-cream-100 text-[11px] font-bold">
                      {project.client}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-espresso-900 dark:text-white group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400 transition-colors font-display">
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
                        <div className="text-sm font-extrabold text-terracotta-600 dark:text-terracotta-400 font-display">{metric.value}</div>
                        <div className="text-[10px] text-espresso-600 dark:text-cream-400 font-medium leading-tight">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded-md bg-cream-200/80 dark:bg-white/10 text-[10px] font-medium text-espresso-700 dark:text-cream-200">
                        {tag}
                      </span>
                    ))}
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
