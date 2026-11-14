import React from 'react';
import Badge from '../components/common/Badge';
import WhyPixelixSection from '../components/sections/WhyPixelixSection';
import DeliverablesShowcase from '../components/sections/DeliverablesShowcase';
import { CONTACT_INFO } from '../config/contact';
import { Sparkles, Phone } from 'lucide-react';

export default function AboutPage({ onOpenInquiry }) {
  return (
    <div className="pt-24 min-h-screen bg-cream-50 dark:bg-darkbg-base space-y-0 transition-colors">
      {/* About Hero Header */}
      <section className="py-16 bg-cream-100 dark:bg-darkbg-surface border-b border-cream-200 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <Badge variant="terracotta" className="text-xs">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-600 dark:text-terracotta-400" />
            <span>About CoreCodeX</span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-espresso-900 dark:text-white tracking-tight font-display">
            Creative Partner & Business Growth Systems
          </h1>
          <p className="text-base text-espresso-700 dark:text-cream-300 leading-relaxed">
            CoreCodeX was started by two friends, Sahil Prasad and Shubham Singh, bridging the gap between tactile, human-centered brand design and engineering-grade digital execution.
          </p>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-white dark:bg-darkbg-base transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600 dark:text-terracotta-400">LEADERSHIP</span>
            <h2 className="text-3xl font-bold text-espresso-900 dark:text-white font-display mt-1">Direct Founder Collaboration</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {CONTACT_INFO.founders.map((f, idx) => (
              <div key={idx} className="p-7 sm:p-8 rounded-3xl bg-cream-50 dark:bg-darkbg-card border border-cream-200 dark:border-white/10 space-y-4 hover:border-terracotta-400 transition-all shadow-sm hover:shadow-sunset/20">
                <div className="flex items-start justify-between gap-4">
                  <div className="relative">
                    {f.image ? (
                      <img
                        src={f.image}
                        alt={f.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-top border-2 border-[#B29F8D]/40 dark:border-white/10 shadow-md"
                      />
                    ) : (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-sunset-gradient text-white flex items-center justify-center font-display font-bold text-xl shadow-sunset">
                        {f.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-darkbg-card flex items-center justify-center text-[9px] text-white font-black" title="Verified Founder">
                      ✓
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cream-200/80 dark:bg-darkbg-surface text-espresso-800 dark:text-cream-200 border border-cream-300/60 dark:border-white/10">
                    {f.address}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-espresso-900 dark:text-white font-display">{f.name}</h3>
                  <div className="text-xs font-semibold text-terracotta-600 dark:text-terracotta-400">{f.role}</div>
                </div>
                <p className="text-xs text-espresso-700 dark:text-cream-300 leading-relaxed">
                  Dedicated to delivering high-impact business outcomes with complete transparency and hands-on execution.
                </p>
                <div className="pt-2 border-t border-cream-200 dark:border-white/10 flex items-center justify-between">
                  <a href={f.telHref} className="text-xs font-bold text-espresso-900 dark:text-cream-200 hover:text-terracotta-600 dark:hover:text-terracotta-400 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-terracotta-500" />
                    <span>{f.phone}</span>
                  </a>
                  <a
                    href={f.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    WhatsApp →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyPixelixSection onOpenInquiry={onOpenInquiry} />
      <DeliverablesShowcase onOpenInquiry={onOpenInquiry} />
    </div>
  );
}
