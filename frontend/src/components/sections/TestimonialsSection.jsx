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
    <section id="reviews" className="py-16 sm:py-20 bg-[#F7F4EE]/60 dark:bg-darkbg-base border-t border-b border-[#D6CCC2]/60 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Glow Container */}
        <div className="p-6 sm:p-10 md:p-12 rounded-[2.5rem] bg-white dark:bg-[#1C1816] border border-[#D6CCC2]/70 dark:border-white/10 shadow-xl relative overflow-hidden transition-colors">
          
          {/* Subtle Ambient Glow Orbs */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#D8C8B4]/15 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-24 right-10 w-80 h-48 bg-[#B29F8D]/15 rounded-full blur-[90px] pointer-events-none" />

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EDE7DD] dark:bg-white/10 border border-[#DDD4C7] dark:border-white/10 text-[#827060] dark:text-[#D5C9BD] text-[11px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#B29F8D]" />
              <span>Testimonials</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#26211E] dark:text-white font-display tracking-tight">
              What Our Clients Say
            </h2>

            <p className="text-xs sm:text-sm text-espresso-700 dark:text-cream-200/80 max-w-2xl mx-auto leading-relaxed">
              Discover how CoreCodeX has scaled businesses across India and beyond. Hear directly from verified founders about their measurable growth and transformation.
            </p>

            {/* Social Proof Rating Pill */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDE7DD] dark:bg-white/10 backdrop-blur-md text-xs font-bold text-[#26211E] dark:text-white border border-[#DDD4C7] dark:border-white/10 shadow-xs">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span>4.9 / 5.0 Star Rating</span>
                <span className="text-[#827060]/40 dark:text-white/30">•</span>
                <span className="text-[#827060] dark:text-[#D8C8B4] font-extrabold">85+ Verified Brands</span>
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
                      ? 'bg-[#B29F8D] text-white shadow-xs scale-105'
                      : 'bg-[#EDE7DD]/70 dark:bg-white/5 border border-[#DDD4C7] dark:border-white/10 text-espresso-800 dark:text-cream-200 hover:border-[#B29F8D] hover:bg-[#EDE7DD] dark:hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{topic.shortLabel}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/80 dark:bg-white/10 text-espresso-800 dark:text-cream-300'
                    }`}
                  >
                    {topic.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Reviews Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
            {reviews.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-3xl bg-[#FAF7F2]/90 dark:bg-white/[0.04] backdrop-blur-xl border border-[#D6CCC2]/60 dark:border-white/10 hover:border-[#B29F8D] hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3.5">
                  {/* Highlight Quote */}
                  <div className="text-base sm:text-lg font-bold text-[#26211E] dark:text-white font-display leading-snug">
                    "<span className="text-[#827060] dark:text-[#D8C8B4] font-extrabold">{rev.company}</span>'s {rev.serviceUsed.toLowerCase()} transformation."
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-[13px] text-espresso-800 dark:text-cream-200/90 leading-relaxed italic">
                    "{rev.review}"
                  </p>
                </div>

                {/* Client Profile Footer */}
                <div className="pt-4 border-t border-[#D6CCC2]/60 dark:border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      className="w-10 h-10 rounded-full object-cover border border-[#D6CCC2] shrink-0 shadow-xs"
                    />
                    <div>
                      <div className="text-xs font-extrabold text-[#26211E] dark:text-white flex items-center gap-1.5">
                        <span>{rev.name}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-[#827060] dark:text-[#D8C8B4] shrink-0" />
                      </div>
                      <div className="text-[11px] text-espresso-600 dark:text-cream-300/80 leading-tight">
                        {rev.role}, <strong className="text-[#26211E] dark:text-cream-100">{rev.company}</strong>
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono font-bold text-[#827060] dark:text-[#D8C8B4] bg-[#EDE7DD] dark:bg-white/10 px-2 py-0.5 rounded-full border border-[#DDD4C7] dark:border-white/10 shrink-0">
                    {rev.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout & Founders Direct Connect inside Glow Container */}
          <div className="mt-10 pt-8 border-t border-[#D6CCC2]/60 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left relative z-10">
            <div>
              <div className="text-sm font-extrabold text-[#26211E] dark:text-white flex items-center justify-center md:justify-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#827060] dark:text-[#D8C8B4]" />
                <span>Ready for similar verified outcomes?</span>
              </div>
              <p className="text-xs text-espresso-600 dark:text-cream-200/70 mt-0.5">
                Speak directly with Founder Sahil Prasad (+91 6354729042 · Vadodara, Gujarat)
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <a
                href={CONTACT_INFO.founders[0].whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#26211E] hover:bg-[#3D332B] text-white font-bold text-xs shadow-xs transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#D8C8B4]" />
                <span>WhatsApp Founder</span>
              </a>

              <button
                onClick={() => onOpenInquiry && onOpenInquiry(currentTopicMeta.label)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#EDE7DD] hover:bg-[#DDD4C7] text-[#26211E] border border-[#DDD4C7] dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/20 dark:text-white font-bold text-xs transition-all cursor-pointer"
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
