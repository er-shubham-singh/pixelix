import React from 'react';
import Floating3DCard from '../3d/Floating3DCard';
import { Sparkles, MonitorSmartphone, ShoppingCart, Camera, Megaphone, Bot, ArrowRight } from 'lucide-react';

export default function ApproachSection({ onSelectCategory }) {
  const approachPillars = [
    {
      category: 'brand-identity',
      title: 'Brand Identity',
      subtitle: 'Identity that people remember',
      desc: 'Logo systems, identity kits, business cards, letterheads, and digital ID cards.',
      deliverable: '5 Custom Vector Logos in PDF',
      icon: Sparkles,
      color: 'from-terracotta-500 to-sunset'
    },
    {
      category: 'digital-products',
      title: 'Digital Products',
      subtitle: 'Built for real business performance',
      desc: 'Website development, mobile app development, performance optimization, and SEO search growth.',
      deliverable: 'Custom React & Cross-Platform Code',
      icon: MonitorSmartphone,
      color: 'from-espresso-800 to-terracotta-700'
    },
    {
      category: 'marketplace-growth',
      title: 'Marketplaces',
      subtitle: 'From catalog to checkout',
      desc: 'End-to-end catalog management and product listing support for Amazon, Meesho, and Flipkart.',
      deliverable: 'A+ Content & Listing Setup',
      icon: ShoppingCart,
      color: 'from-gold-dark to-terracotta-600'
    },
    {
      category: 'product-visuals',
      title: 'Product Visuals',
      subtitle: 'Visuals that help people choose',
      desc: 'Clean cut-outs, background removal, color retouching, high-res upscaling, and packaging specs.',
      deliverable: 'High-Res Studio Cut-outs',
      icon: Camera,
      color: 'from-sage-dark to-espresso-800'
    },
    {
      category: 'campaigns',
      title: 'Campaigns',
      subtitle: 'Work on screen and on paper',
      desc: 'Digital marketing strategies, promotional assets, pamphlets, menus, catalogs, and offline banners.',
      deliverable: '5 Flyers, Brochures & Banners in PDF',
      icon: Megaphone,
      color: 'from-sunset to-terracotta-700'
    },
    {
      category: 'ai-solutions',
      title: 'AI Solutions',
      subtitle: 'Intelligent automation & 24/7 care',
      desc: 'Custom LLM integrations, automated data pipelines, and omnichannel WhatsApp & Web chatbots.',
      deliverable: '24/7 Conversational Engine',
      icon: Bot,
      color: 'from-terracotta-700 to-gold'
    }
  ];

  return (
    <section id="approach" className="py-24 bg-cream-100 dark:bg-darkbg-base relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600 dark:text-terracotta-400">
            THE PIXELIX APPROACH
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-espresso-900 dark:text-white tracking-tight font-display">
            One partner. Many ways to grow.
          </h2>
          <p className="text-sm sm:text-base text-espresso-700 dark:text-cream-300 leading-relaxed">
            Brand identity, digital products, AI, marketplaces, visuals, and campaigns — all coordinated under one unified standard.
          </p>
        </div>

        {/* 6 Pillars 3D Tilt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approachPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Floating3DCard key={idx} intensity={10} className="h-full">
                <div
                  onClick={() => onSelectCategory && onSelectCategory(pillar.category)}
                  className="h-full glass-card p-7 rounded-3xl cursor-pointer hover:border-terracotta-400/60 dark:hover:border-terracotta-400/50 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Icon and Category Label */}
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pillar.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-terracotta-600 dark:text-terracotta-300 bg-terracotta-50 dark:bg-terracotta-900/50 px-3 py-1 rounded-full border border-terracotta-200/60 dark:border-terracotta-800/60">
                        {pillar.title}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-espresso-900 dark:text-white group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400 transition-colors font-display">
                        {pillar.subtitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-espresso-700/90 dark:text-cream-300/90 mt-2 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>

                  {/* Deliverable Badge */}
                  <div className="mt-6 pt-4 border-t border-cream-200/80 dark:border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-espresso-600 dark:text-cream-200 bg-cream-200/70 dark:bg-white/10 px-2.5 py-1 rounded-lg">
                      {pillar.deliverable}
                    </span>
                    <span className="text-xs font-bold text-terracotta-600 dark:text-terracotta-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Floating3DCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
