import React from 'react';
import Floating3DCard from '../3d/Floating3DCard';
import Badge from '../common/Badge';
import { FALLBACK_PROJECTS } from '../../services/serviceDataFallback';
import { Sparkles, ArrowUpRight, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function ProjectShowcaseSection({ onOpenInquiry }) {
  return (
    <section id="portfolio" className="py-16 sm:py-20 bg-white dark:bg-darkbg-base relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <Badge variant="terracotta" className="px-3 py-1 text-[10px] sm:text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Client Deliveries</span>
              </Badge>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#26211E] dark:text-white tracking-tight font-display">
              Real Work. <span className="text-[#827060] dark:text-[#D8C8B4]">Delivered & Live.</span>
            </h2>
            
            <p className="text-xs sm:text-sm text-espresso-700/90 dark:text-cream-300 leading-relaxed">
              Explore authentic websites and systems delivered by CoreCodeX founders Sahil & Shubham. Each project represents live client production with real-world traffic and business outcomes.
            </p>
          </div>

          <button
            onClick={onOpenInquiry}
            className="px-6 py-3 rounded-full font-bold text-xs text-white bg-[#26211E] hover:bg-[#3D332B] shadow-[0_4px_16px_rgba(38,33,30,0.25)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <span>Discuss Your Project Scope</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* 2x2 Editorial Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {FALLBACK_PROJECTS.map((project) => (
            <Floating3DCard key={project.id} intensity={6} className="h-full">
              <div
                className="h-full rounded-3xl bg-[#FAF7F2] dark:bg-[#1C1815] border border-[#D6CCC2]/70 dark:border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#B29F8D] dark:hover:border-[#B29F8D] shadow-[0_4px_25px_rgba(38,33,30,0.06)] hover:shadow-[0_12px_35px_rgba(38,33,30,0.12)] transition-all duration-300 group"
              >
                {/* Image Container with Screenshot */}
                <div className="relative h-60 sm:h-64 overflow-hidden bg-[#26211E]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181513]/90 via-[#181513]/30 to-transparent" />
                  
                  {/* Top Bar on Image: Verified Badge & Live Site Link */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 dark:bg-[#231F1C]/95 backdrop-blur-md text-[#26211E] dark:text-[#FAF7F2] text-[11px] font-bold shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{project.client}</span>
                    </span>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title={`Visit ${project.client} live site`}
                        className="w-10 h-10 rounded-full bg-white/95 dark:bg-[#231F1C]/95 text-[#26211E] dark:text-white flex items-center justify-center shadow-md hover:bg-[#26211E] hover:text-[#FAF7F2] dark:hover:bg-[#FAF7F2] dark:hover:text-[#26211E] transition-all duration-300 cursor-pointer shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Bottom Tagline on Image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs text-[#FAF7F2] line-clamp-1 font-medium drop-shadow-sm">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#827060] dark:text-[#B29F8D]">
                        Delivered by CoreCodeX
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#26211E] dark:text-white group-hover:text-[#827060] dark:group-hover:text-[#D8C8B4] transition-colors font-display">
                      {project.title}
                    </h3>
                    <p className="text-xs text-espresso-700 dark:text-cream-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics Box */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white dark:bg-[#231F1C] border border-[#D6CCC2]/70 dark:border-white/10 text-center shadow-xs">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-base sm:text-lg font-extrabold text-[#26211E] dark:text-[#FAF7F2] font-display">
                          {metric.value}
                        </div>
                        <div className="text-[10px] text-[#827060] dark:text-[#C7B9A4] font-semibold leading-tight">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags & Action Strip */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#D6CCC2]/70 dark:border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-full bg-[#EDE7DD] dark:bg-white/10 text-[10px] font-semibold text-[#5C5046] dark:text-[#D5C9BD]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#26211E] dark:text-white hover:text-[#827060] dark:hover:text-[#D8C8B4] underline underline-offset-2 transition-colors cursor-pointer"
                        >
                          <span>Visit Live Site</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => onOpenInquiry && onOpenInquiry(project.title)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#827060] dark:text-[#B29F8D] hover:underline cursor-pointer"
                      >
                        <span>Scope</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
