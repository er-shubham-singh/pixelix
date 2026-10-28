import React from 'react';
import Modal from './Modal';
import Badge from './Badge';
import { CheckCircle2, ArrowRight, Layers, Sparkles } from 'lucide-react';

export default function ServiceDetailModal({ service, isOpen, onClose, onBookService }) {
  if (!service) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={service.title}
      subtitle={service.badge}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Short & Full Description */}
        <div className="space-y-3">
          <p className="text-base font-medium text-espresso-800 dark:text-cream-100 leading-relaxed">
            {service.shortDescription}
          </p>
          <div className="p-4 rounded-2xl bg-cream-100 dark:bg-darkbg-surface border border-cream-200/80 dark:border-white/10 text-sm text-espresso-700 dark:text-cream-300 leading-relaxed">
            {service.fullDescription}
          </div>
        </div>

        {/* Deliverables Section */}
        {service.deliverables && service.deliverables.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-terracotta-600 dark:text-terracotta-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-terracotta-500" />
              <span>What You Receive (Deliverables)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.deliverables.map((d, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-darkbg-surface border border-cream-200 dark:border-white/10 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-terracotta-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-espresso-800 dark:text-cream-200 font-medium leading-snug">{d}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Core Architectural Features */}
        {service.features && service.features.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-espresso-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-espresso-700 dark:text-cream-400" />
              <span>Key Pillars & Execution Focus</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {service.features.map((f, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-cream-50 dark:bg-darkbg-surface border border-cream-200 dark:border-white/10">
                  <div className="font-bold text-xs text-espresso-900 dark:text-white mb-1">{f.title}</div>
                  <div className="text-[11px] text-espresso-700 dark:text-cream-300 leading-relaxed">{f.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies / Tools */}
        {service.technologies && service.technologies.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-semibold text-espresso-700 dark:text-cream-300">Technologies & Platforms:</div>
            <div className="flex flex-wrap gap-1.5">
              {service.technologies.map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-cream-200/80 dark:bg-white/10 text-[11px] font-medium text-espresso-800 dark:text-cream-200">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA Footer */}
        <div className="pt-4 border-t border-cream-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-espresso-700 dark:text-cream-400">
            Backed by Pixelix quality guarantee & direct founder execution.
          </div>
          <button
            onClick={() => {
              onClose();
              onBookService(service.title);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full font-bold text-xs text-white bg-sunset-gradient shadow-sunset hover:shadow-sunset-lg hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Request Proposal For {service.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Modal>
  );
}
