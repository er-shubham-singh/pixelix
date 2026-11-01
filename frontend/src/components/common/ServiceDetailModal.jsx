import React from 'react';
import Modal from './Modal';
import Badge from './Badge';
import { CONTACT_INFO } from '../../config/contact';
import {
  TESTIMONIALS_DATA,
  TESTIMONIAL_TOPICS,
  getTopicIdForService
} from '../../data/testimonialsData';
import {
  CheckCircle2,
  ArrowRight,
  Layers,
  Sparkles,
  Star,
  ShieldCheck,
  Phone,
  MessageCircle,
  Award
} from 'lucide-react';

export default function ServiceDetailModal({ service, isOpen, onClose, onBookService }) {
  if (!service) return null;

  const topicId = getTopicIdForService(service.title || service.category);
  const topicReviews = TESTIMONIALS_DATA[topicId] || TESTIMONIALS_DATA.ecom;
  const topicMeta = TESTIMONIAL_TOPICS.find(t => t.id === topicId) || TESTIMONIAL_TOPICS[0];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={service.title}
      subtitle={service.badge || `${topicMeta.label} · Pixelix Production Suite`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6 max-h-[78vh] overflow-y-auto pr-1 sm:pr-2">
        {/* Short & Full Description */}
        <div className="space-y-2.5">
          <p className="text-sm sm:text-base font-semibold text-espresso-900 dark:text-cream-100 leading-relaxed">
            {service.shortDescription}
          </p>
          <div className="p-4 rounded-2xl bg-cream-50 dark:bg-darkbg-surface border border-cream-200/80 dark:border-white/10 text-xs sm:text-sm text-espresso-700 dark:text-cream-300 leading-relaxed">
            {service.fullDescription}
          </div>
        </div>

        {/* ========================================================
            CLIENT REVIEWS FIRST (Builds 100% Trust Before Contact)
           ======================================================== */}
        <div className="space-y-3.5 pt-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-cream-200 dark:border-white/10 pb-2.5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600 dark:text-terracotta-400">
                  Client Reviews & Results
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-[10px] font-bold">
                  ★ 5.0 Rated ({topicReviews.length} Verified Brands)
                </span>
              </div>
              <p className="text-xs text-espresso-500 dark:text-cream-400 mt-0.5">
                Real founders who scaled their business using our {topicMeta.shortLabel} systems
              </p>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-espresso-600 dark:text-cream-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>100% Verified Outcomes</span>
            </div>
          </div>

          {/* 4 to 5 Customer Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {topicReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-white/10 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                        className="w-10 h-10 rounded-full object-cover border border-terracotta-200 dark:border-white/10 shrink-0"
                      />
                      <div>
                        <div className="text-xs font-extrabold text-espresso-900 dark:text-white flex items-center gap-1">
                          <span>{rev.name}</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-terracotta-500 shrink-0" />
                        </div>
                        <div className="text-[11px] text-espresso-600 dark:text-cream-300">
                          {rev.role} · <strong className="text-espresso-800 dark:text-cream-200">{rev.company}</strong>
                        </div>
                        <div className="text-[10px] text-espresso-400 dark:text-cream-500">
                          {rev.location}
                        </div>
                      </div>
                    </div>

                    <div className="flex text-amber-500 shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-espresso-700 dark:text-cream-200 italic leading-relaxed bg-cream-50 dark:bg-darkbg-base p-2.5 rounded-xl border border-cream-200/60 dark:border-white/5">
                    "{rev.review}"
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-cream-100 dark:border-white/5 text-espresso-500 dark:text-cream-400">
                  <span className="font-semibold text-terracotta-600 dark:text-terracotta-400">
                    Result: {rev.metric}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
                    Verified Work
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables Section */}
        {service.deliverables && service.deliverables.length > 0 && (
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-terracotta-600 dark:text-terracotta-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-terracotta-500" />
              <span>Included Deliverables & Production Kits</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.deliverables.map((d, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-cream-50 dark:bg-darkbg-surface border border-cream-200 dark:border-white/10 shadow-2xs">
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-espresso-900 dark:text-white flex items-center gap-2">
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

        {/* ========================================================
            DIRECT FOUNDER CONTACT & INQUIRY FOOTER
           ======================================================== */}
        <div className="pt-5 border-t border-cream-200 dark:border-white/10 space-y-4">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-terracotta-500/10 via-amber-500/10 to-transparent border border-terracotta-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-espresso-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-terracotta-500" />
                <span>Speak Directly with Founders Vikas & Shubham</span>
              </div>
              <p className="text-[11px] text-espresso-600 dark:text-cream-300 mt-0.5">
                Zero sales pressure. Direct execution consultation for {service.title}.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <a
                href={CONTACT_INFO.founders[0].telHref}
                className="px-3 py-1.5 rounded-full bg-white dark:bg-darkbg-card border border-terracotta-200 dark:border-white/10 text-xs font-bold text-espresso-900 dark:text-white hover:text-terracotta-600 flex items-center gap-1.5 shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-terracotta-500" />
                <span>Vikas</span>
              </a>
              <a
                href={CONTACT_INFO.founders[1].telHref}
                className="px-3 py-1.5 rounded-full bg-white dark:bg-darkbg-card border border-terracotta-200 dark:border-white/10 text-xs font-bold text-espresso-900 dark:text-white hover:text-terracotta-600 flex items-center gap-1.5 shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-terracotta-500" />
                <span>Shubham</span>
              </a>
              <a
                href={`https://wa.me/917056063863?text=Hi%20Pixelix,%20I%20am%20interested%20in%20your%20${encodeURIComponent(service.title)}%20services.`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-green-500 hover:bg-green-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <span className="text-xs text-espresso-500 dark:text-cream-400">
              Deliverables backed by Pixelix 100% milestone guarantee.
            </span>

            <button
              onClick={() => {
                onClose();
                onBookService(service.title);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full font-bold text-xs text-white bg-sunset-gradient shadow-sunset hover:shadow-sunset-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request Detailed Scope & Proposal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </Modal>
  );
}
