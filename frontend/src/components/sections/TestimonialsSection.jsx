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
    <section id="reviews" className="py-20 bg-cream-100/60 dark:bg-darkbg-base border-t border-b border-cream-200 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2">
            <Badge variant="terracotta" className="px-3.5 py-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-600 dark:text-terracotta-400" />
              <span className="font-bold tracking-wide uppercase text-[11px]">
                Proven Track Record · 85+ Happy Founders
              </span>
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-espresso-900 dark:text-white font-display tracking-tight">
            See How Brands <span className="text-gradient-sunset">Scale with Pixelix.</span>
          </h2>

          <p className="text-sm sm:text-base text-espresso-700/90 dark:text-cream-200/90 max-w-2xl mx-auto leading-relaxed">
            Real feedback and verified business results from Indian D2C brands, manufacturing exporters, enterprise startups, and retail leaders.
          </p>

          {/* Social Proof Rating Pill */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-bold text-espresso-900 dark:text-white shadow-soft">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span>4.9 / 5.0 Star Rating</span>
              <span className="text-cream-400 dark:text-white/20">•</span>
              <span className="text-terracotta-600 dark:text-terracotta-400">100% Client Satisfaction</span>
            </div>
          </div>
        </div>

        {/* 5 Domain Switcher Tabs */}
        <div className="flex items-center justify-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {TESTIMONIAL_TOPICS.map((topic) => {
            const Icon = TOPIC_ICONS[topic.icon] || Store;
            const isActive = activeTopic === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-sunset-gradient text-white shadow-sunset scale-105'
                    : 'bg-white/80 dark:bg-white/5 border border-terracotta-200/50 dark:border-white/10 text-espresso-800 dark:text-cream-200 hover:border-terracotta-300 hover:bg-cream-100 dark:hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{topic.shortLabel}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-cream-200 dark:bg-white/10 text-espresso-600 dark:text-cream-300'
                  }`}
                >
                  {topic.count} Clients
                </span>
              </button>
            );
          })}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 sm:p-6 rounded-3xl bg-white/85 dark:bg-darkbg-card border border-cream-300 dark:border-white/10 shadow-soft hover:shadow-sunset/20 hover:border-terracotta-400/60 transition-all flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                {/* Header: Photo, Name, Rating, Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-terracotta-200/80 dark:border-white/10 shadow-sm shrink-0"
                    />
                    <div>
                      <div className="text-sm font-extrabold text-espresso-900 dark:text-white flex items-center gap-1.5">
                        <span>{rev.name}</span>
                        <ShieldCheck className="w-4 h-4 text-terracotta-500 shrink-0" />
                      </div>
                      <div className="text-xs text-espresso-600 dark:text-cream-400 leading-tight">
                        {rev.role} · <strong className="text-espresso-800 dark:text-cream-200">{rev.company}</strong>
                      </div>
                      <div className="text-[10px] text-espresso-400 dark:text-cream-500 mt-0.5">
                        {rev.location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stars and Metric Banner */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-terracotta-50 dark:bg-terracotta-900/40 text-terracotta-600 dark:text-terracotta-400 border border-terracotta-200/60 dark:border-white/10">
                    {rev.metric}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-[13px] text-espresso-700 dark:text-cream-200/90 leading-relaxed italic bg-cream-50/70 dark:bg-white/5 p-3 rounded-2xl border border-cream-200/60 dark:border-white/5">
                  "{rev.review}"
                </p>
              </div>

              {/* Footer Scope */}
              <div className="pt-3 border-t border-cream-200 dark:border-white/5 flex items-center justify-between text-xs text-espresso-500 dark:text-cream-400">
                <span className="truncate pr-2">
                  Scope: <strong className="text-espresso-800 dark:text-cream-200">{rev.serviceUsed}</strong>
                </span>
                <span className="text-terracotta-500 font-bold shrink-0 text-[10px] uppercase tracking-wide">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout & Founders Direct Connect */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/90 via-cream-50/90 to-terracotta-50/50 dark:from-darkbg-card dark:to-darkbg-base border border-terracotta-200/80 dark:border-white/10 shadow-soft text-center space-y-5">
          <div className="space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600 dark:text-terracotta-400">
              READY FOR SIMILAR MEASURABLE GROWTH?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-espresso-900 dark:text-white font-display">
              Talk Directly with Founders Vikas & Shubham
            </h3>
            <p className="text-xs sm:text-sm text-espresso-600 dark:text-cream-300">
              Get an honest appraisal of your catalog, website, or marketing needs without sales fluff.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={CONTACT_INFO.founders[0].telHref}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white dark:bg-white/5 border border-terracotta-200 dark:border-white/10 text-espresso-900 dark:text-white hover:text-terracotta-600 hover:border-terracotta-400 font-bold text-xs shadow-xs transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-terracotta-500" />
              <span>Call Vikas ({CONTACT_INFO.founders[0].phone})</span>
            </a>

            <a
              href={CONTACT_INFO.founders[1].telHref}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white dark:bg-white/5 border border-terracotta-200 dark:border-white/10 text-espresso-900 dark:text-white hover:text-terracotta-600 hover:border-terracotta-400 font-bold text-xs shadow-xs transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-terracotta-500" />
              <span>Call Shubham ({CONTACT_INFO.founders[1].phone})</span>
            </a>

            <a
              href="https://wa.me/917056063863?text=Hi%20Pixelix%20Team,%20I%20would%20like%20to%20discuss%20my%20business%20growth%20requirements."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-xs shadow-soft transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Founders</span>
            </a>

            <button
              onClick={() => onOpenInquiry && onOpenInquiry(currentTopicMeta.label)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sunset-gradient text-white font-bold text-xs shadow-sunset hover:shadow-sunset-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Explore All Verified Reviews & Inquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

