import React from 'react';
import Floating3DCard from '../3d/Floating3DCard';
import Badge from '../common/Badge';
import {
  Sparkles,
  ArrowUpRight,
  Compass,
  Layers,
  Palette,
  Target,
  Camera,
  Code2,
  Share2,
  Store
} from 'lucide-react';

export default function ApproachSection({ onSelectCategory }) {
  const bentoCards = [
    {
      category: 'brand-identity',
      title: 'Visual Identity',
      theme: 'cream',
      icon: Palette,
      badge: '5 Vector Themes',
      desc: 'We design timeless visual systems that feel right, stand out, and stay relevant over time. Includes 5 full vector logo concepts, typography rules, and master PDFs.'
    },
    {
      category: 'brand-identity',
      title: 'Brand Strategy & Moat',
      theme: 'terracotta',
      icon: Target,
      badge: 'Market Positioning',
      desc: 'We define your brand direction, category moat, and target messaging to help you stand out and scale with unfair advantage.'
    },
    {
      category: 'product-visuals',
      title: 'Creative Direction & Visuals',
      theme: 'cream',
      icon: Camera,
      badge: 'High-Res Studio',
      desc: 'Shaping the tone, high-resolution product cut-outs, packaging renders, and lifestyle visuals that command premium customer trust.'
    },
    {
      category: 'digital-products',
      title: 'Web & App Design',
      theme: 'cream',
      icon: Code2,
      badge: 'React & 3D Motion',
      desc: 'Designing and developing blazingly fast, responsive, conversion-focused websites and mobile apps with custom interactive 3D elements.'
    },
    {
      category: 'campaigns',
      title: 'Motion & Content',
      theme: 'terracotta',
      icon: Share2,
      badge: 'Social + Print PDFs',
      desc: 'From high-converting ad reels and 5 social PDF creatives to offline menus and flyers that capture attention and tell your story.'
    },
    {
      category: 'ecom-operations',
      title: 'Marketplaces & Logistics',
      theme: 'espresso',
      icon: Store,
      badge: 'Amazon, Flipkart, Meesho',
      desc: 'Catalog to checkout: automated order processing, multi-variant listings, Safe-T claim reimbursements, and dispatch SLAs.'
    }
  ];

  return (
    <section id="approach" className="py-16 sm:py-20 bg-cream-100/70 dark:bg-darkbg-base relative overflow-hidden transition-colors border-t border-cream-200/80 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Inspired by Image 2: "How we build high-performing brands") */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <Badge variant="terracotta" className="px-3 py-1 text-[10px] sm:text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Pixelix Standard</span>
              </Badge>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-espresso-900 dark:text-white tracking-tight font-display">
              How We Build <span className="text-gradient-sunset">High-Performing Brands.</span>
            </h2>
            
            <p className="text-xs sm:text-sm text-espresso-700/90 dark:text-cream-300 leading-relaxed">
              We don't offer a rigid checklist — we combine the right creative, technical, and marketplace tools to solve your specific goals with speed and measurable results.
            </p>
          </div>

          <div className="text-xs font-semibold text-espresso-600 dark:text-cream-400 max-w-xs self-start lg:self-auto bg-white/70 dark:bg-white/5 p-3 rounded-2xl border border-terracotta-200/50 dark:border-white/10">
            You don't need everything — just what works. Explore our 6 core pillars below.
          </div>
        </div>

        {/* Bento Grid with High-Contrast Theming (Matching Reference Image 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {bentoCards.map((card, idx) => {
            const Icon = card.icon;
            const isTerracotta = card.theme === 'terracotta';
            const isEspresso = card.theme === 'espresso';

            let cardStyles = '';
            let textStyles = '';
            let arrowStyles = '';
            let badgeStyles = '';

            if (isTerracotta) {
              cardStyles = 'ios-glass-terracotta text-white shadow-sunset hover:shadow-sunset-lg hover:scale-[1.02]';
              textStyles = 'text-white/95';
              arrowStyles = 'bg-white/20 text-white group-hover:bg-white group-hover:text-terracotta-600 shadow-sm';
              badgeStyles = 'bg-white/20 text-white border-white/30 backdrop-blur-md';
            } else if (isEspresso) {
              cardStyles = 'glass-card-dark text-white border border-terracotta-500/40 shadow-soft hover:scale-[1.02]';
              textStyles = 'text-cream-300';
              arrowStyles = 'bg-white/10 text-cream-100 group-hover:bg-terracotta-500 group-hover:text-white shadow-sm';
              badgeStyles = 'bg-terracotta-900/60 text-terracotta-300 border-terracotta-500/30 backdrop-blur-md';
            } else {
              cardStyles = 'ios-glass-card text-espresso-900 dark:text-white border border-cream-300/80 dark:border-white/10 hover:border-terracotta-400/60 hover:scale-[1.02]';
              textStyles = 'text-espresso-700 dark:text-cream-300';
              arrowStyles = 'bg-cream-200/80 dark:bg-white/10 text-espresso-800 dark:text-cream-100 group-hover:bg-sunset-gradient group-hover:text-white shadow-sm';
              badgeStyles = 'bg-cream-100 dark:bg-white/5 text-terracotta-600 dark:text-terracotta-400 border-terracotta-200/60 dark:border-white/10 backdrop-blur-md';
            }

            return (
              <Floating3DCard key={idx} intensity={8} className="h-full">
                <div
                  onClick={() => onSelectCategory && onSelectCategory(card.category)}
                  className={`h-full p-6 sm:p-7 rounded-3xl cursor-pointer transition-all duration-300 group flex flex-col justify-between ${cardStyles}`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Title, Badge, and Circular Arrow Button */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full border mb-2 ${badgeStyles}`}>
                          {card.badge}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-extrabold font-display leading-tight">
                          {card.title}
                        </h3>
                      </div>

                      {/* Top-Right Circular Arrow Button (Signature Image 2 element) */}
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${arrowStyles}`}>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className={`text-xs sm:text-[13px] leading-relaxed ${textStyles}`}>
                      {card.desc}
                    </p>
                  </div>

                  {/* Bottom Icon / Action */}
                  <div className="pt-5 mt-4 border-t border-current/10 flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4 opacity-80" />
                      <span>Explore Capability</span>
                    </span>
                    <span className="text-[11px] opacity-70 group-hover:opacity-100 transition-opacity">
                      Click to View →
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
