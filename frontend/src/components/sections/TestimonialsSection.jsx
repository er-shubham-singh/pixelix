import React, { useState } from 'react';
import Badge from '../common/Badge';
import {
  TESTIMONIAL_TOPICS,
  TESTIMONIALS_DATA
} from '../../data/testimonialsData';
import { CONTACT_INFO } from '../../config/contact';
import {
  Star,
  ShieldCheck,
  Phone,
  MessageCircle,
  ArrowRight,
  Store,
  Code2,
  Palette,
  Bot,
  TrendingUp,
  Sparkles,
  Award
} from 'lucide-react';

const TOPIC_ICONS = {
  Store,
  Code2,
  Palette,
  Bot,
  TrendingUp
};

export default function TestimonialsSection({ onOpenInquiry }) {
  const [activeTopic, setActiveTopic] = useState('ecom');

  const currentTopicMeta = TESTIMONIAL_TOPICS.find((t) => t.id === activeTopic) || TESTIMONIAL_TOPICS[0];
  const reviews = TESTIMONIALS_DATA[activeTopic] || TESTIMONIALS_DATA.ecom;

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-cream-100/60 dark:bg-darkbg-base border-t border-b border-cream-200 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Glow Container (Directly Matching Reference Image 4: Nexora "What Our Clients Say") */}
        <div className="p-6 sm:p-10 md:p-12 rounded-[2.5rem] bg-gradient-to-b from-espresso-950/90 via-espresso-900/95 to-espresso-950/90 text-white border border-emerald-500/25 shadow-[0_0_60px_-15px_rgba(16,185,129,0.2)] dark:shadow-[0_0_80px_-20px_rgba(16,185,129,0.25)] relative overflow-hidden">
          
          {/* Subtle Ambient Glow Orbs */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/15 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-24 right-10 w-80 h-48 bg-terracotta-500/15 rounded-full blur-[90px] pointer-events-none" />

          {/* Section Header (Image 4 Style) */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Testimonials</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
              What Our Clients Say
            </h2>

            <p className="text-xs sm:text-sm text-cream-200/80 max-w-2xl mx-auto leading-relaxed">
              Discover how Pixelix has scaled businesses across India and beyond. Hear directly from verified founders about their measurable growth and transformation.
            </p>

            {/* Social Proof Rating Pill */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-white border border-white/10 shadow-soft">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span>4.9 / 5.0 Star Rating</span>
                <span className="text-white/30">•</span>
                <span className="text-emerald-400">85+ Verified Brands</span>
              </div>
            </div>
          </div>

          {/* 5 Domain Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar relative z-10">
            {TESTIMONIAL_TOPICS.map((topic) => {
              const Icon = TOPIC_ICONS[topic.icon] || Store;
              const isActive = activeTopic === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveTopic(topic.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)] scale-105'
                      : 'bg-white/5 border border-white/10 text-cream-200 hover:border-emerald-500/40 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{topic.shortLabel}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-cream-300'
                    }`}
                  >
                    {topic.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Reviews Cards Grid (Directly Matching Reference Image 4) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
            {reviews.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3.5">
                  {/* Highlight Quote (Image 4 Signature) */}
                  <div className="text-base sm:text-lg font-bold text-white font-display leading-snug">
                    "<span className="text-emerald-400 font-extrabold">{rev.company}</span>'s {rev.serviceUsed.toLowerCase()} transformation."
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-[13px] text-cream-200/80 leading-relaxed italic">
                    "{rev.review}"
                  </p>
                </div>

                {/* Client Profile Footer (Image 4 Style) */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      className="w-10 h-10 rounded-full object-cover border border-emerald-500/40 shrink-0 shadow-sm"
                    />
                    <div>
                      <div className="text-xs font-extrabold text-white flex items-center gap-1.5">
                        <span>{rev.name}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </div>
                      <div className="text-[11px] text-cream-300/80 leading-tight">
                        {rev.role}, <strong className="text-cream-100">{rev.company}</strong>
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
                    {rev.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout & Founders Direct Connect inside Glow Container */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left relative z-10">
            <div>
              <div className="text-sm font-extrabold text-white flex items-center justify-center md:justify-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Ready for similar verified outcomes?</span>
              </div>
              <p className="text-xs text-cream-200/70 mt-0.5">
                Speak directly with Founders Vikas (+91 7056063863) & Shubham (+91 95595 06650)
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <a
                href="https://wa.me/917056063863?text=Hi%20Pixelix%20Team,%20I%20would%20like%20to%20discuss%20my%20business%20growth%20requirements."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-soft transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Founders</span>
              </a>

              <button
                onClick={() => onOpenInquiry && onOpenInquiry(currentTopicMeta.label)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all cursor-pointer"
              >
                <span>Explore All {reviews.length} Reviews & Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

