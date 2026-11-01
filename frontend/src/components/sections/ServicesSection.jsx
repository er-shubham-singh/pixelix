import React, { useState, useMemo } from 'react';
import Floating3DCard from '../3d/Floating3DCard';
import Badge from '../common/Badge';
import {
  Globe,
  Smartphone,
  Cpu,
  MessageSquareCode,
  TrendingUp,
  Sparkles,
  ShoppingBag,
  Image,
  Megaphone,
  Share2,
  Search,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  PackageCheck,
  FileSpreadsheet,
  Truck,
  RotateCcw,
  Boxes,
  Store,
  Receipt
} from 'lucide-react';

const iconMap = {
  Globe,
  Smartphone,
  Cpu,
  MessageSquareCode,
  TrendingUp,
  Sparkles,
  ShoppingBag,
  Image,
  Megaphone,
  Share2,
  PackageCheck,
  FileSpreadsheet,
  Truck,
  RotateCcw,
  Boxes,
  Store,
  Receipt
};

export default function ServicesSection({
  services = [],
  selectedCategory = 'all',
  onSelectCategory,
  onViewServiceDetail,
  onBookService,
  isFeaturedOnly = false,
  maxDisplay = 4,
  onNavigateToAll
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: `All Services (${services.length || 16})` },
    { id: 'ecom-operations', label: 'E-Com Operations & Logistics' },
    { id: 'marketplace-growth', label: 'Marketplace Growth' },
    { id: 'digital-products', label: 'Digital Products' },
    { id: 'ai-solutions', label: 'AI & Chatbots' },
    { id: 'brand-identity', label: 'Brand Identity' },
    { id: 'product-visuals', label: 'Product Visuals' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'content-systems', label: 'Content Systems' },
  ];

  const filteredServices = useMemo(() => {
    let result = services.filter(service => {
      const matchesCategory = isFeaturedOnly || selectedCategory === 'all' || service.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q ||
        service.title.toLowerCase().includes(q) ||
        service.shortDescription.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    if (isFeaturedOnly) {
      const featured = result.filter(s => s.featured);
      return (featured.length >= maxDisplay ? featured : result).slice(0, maxDisplay);
    }

    return result;
  }, [services, selectedCategory, searchQuery, isFeaturedOnly, maxDisplay]);

  return (
    <section id="services" className={`py-14 sm:py-16 relative transition-colors ${isFeaturedOnly ? 'bg-cream-100/60 dark:bg-darkbg-base' : 'bg-cream-50 dark:bg-darkbg-surface'}`}>
      {/* Decorative ambient lights */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-terracotta-400/10 dark:bg-terracotta-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-gold/15 dark:bg-gold/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (Inspired by Image 2: "How we build high-performing brands") */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600 dark:text-terracotta-400">
              {isFeaturedOnly ? 'HOW WE BUILD' : 'COMPREHENSIVE CAPABILITIES (10 SERVICES)'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-espresso-900 dark:text-white tracking-tight font-display">
              {isFeaturedOnly ? (
                <>
                  How We Build <span className="text-gradient-sunset">High-Performing Brands.</span>
                </>
              ) : (
                'Complete Digital, Branding & Marketplace Suite'
              )}
            </h2>
            <p className="text-sm sm:text-base text-espresso-700 dark:text-cream-300 leading-relaxed">
              {isFeaturedOnly
                ? 'We don’t offer a bloated list of services — we combine the exact high-impact pillars needed to scale your revenue and build customer trust.'
                : 'From custom codebases to print-ready PDF master deliverables, explore our ten core service pillars.'}
            </p>
          </div>

          {/* Search Box (Only on Full Page) */}
          {!isFeaturedOnly && (
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search capabilities..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-darkbg-card border border-cream-300 dark:border-white/10 text-xs text-espresso-900 dark:text-cream-100 focus:outline-none focus:border-terracotta-500 shadow-sm"
              />
              <Search className="w-4 h-4 text-terracotta-500 absolute left-3.5 top-3.5" />
            </div>
          )}

          {/* If Featured Only: View All Button in Header */}
          {isFeaturedOnly && onNavigateToAll && (
            <button
              onClick={onNavigateToAll}
              className="px-6 py-3 rounded-full font-bold text-xs text-espresso-900 dark:text-cream-100 bg-white dark:bg-white/10 hover:bg-cream-200 dark:hover:bg-white/15 border border-cream-300 dark:border-white/15 shadow-sm transition-all flex items-center gap-2 self-start md:self-auto group cursor-pointer"
            >
              <span>View All 10 Services</span>
              <ArrowRight className="w-4 h-4 text-terracotta-600 dark:text-terracotta-400 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* Category Pill Filters (Only on Full Page) */}
        {!isFeaturedOnly && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-espresso-900 dark:bg-terracotta-500 text-cream-50 shadow-md'
                    : 'bg-white dark:bg-white/10 text-espresso-700 dark:text-cream-200 hover:bg-cream-200 dark:hover:bg-white/20 border border-cream-200 dark:border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* ========================================================
            FEATURED VIEW: BENTO GRID (Directly Matching Reference Image 2)
           ======================================================== */}
        {isFeaturedOnly ? (
          <div className="space-y-5">
            {/* TOP ROW: 3 Pillars (Cream, Terracotta Solid, Cream) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* CARD 1: Cream - Visual Identity */}
              <div
                onClick={() => {
                  const match = services.find(s => s.title.toLowerCase().includes('brand') || s.slug?.includes('brand')) || services[0];
                  onViewServiceDetail(match);
                }}
                className="p-7 rounded-3xl bg-cream-50 dark:bg-darkbg-card border border-cream-300/80 dark:border-white/10 hover:border-terracotta-400/60 shadow-soft hover:shadow-sunset/20 transition-all cursor-pointer flex flex-col justify-between group min-h-[250px]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl font-extrabold text-espresso-900 dark:text-cream-100 font-display">
                    Visual<br />identity
                  </span>
                  <div className="w-10 h-10 rounded-full bg-espresso-900 text-cream-100 dark:bg-white dark:text-espresso-900 flex items-center justify-center group-hover:bg-terracotta-500 group-hover:text-white transition-all shadow-sm">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
                <div className="space-y-3 mt-6">
                  <p className="text-xs text-espresso-600 dark:text-cream-300 leading-relaxed">
                    We design visual systems that feel right, stand out, and stay relevant over time. Includes 5 Vector Logo PDF suites and complete brand kit.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cream-200 dark:bg-darkbg-base text-espresso-800 dark:text-cream-200">5 Vector Logos</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cream-200 dark:bg-darkbg-base text-espresso-800 dark:text-cream-200">Brand Kit</span>
                  </div>
                </div>
              </div>

              {/* CARD 2: Solid Terracotta Orange - Brand Strategy & Marketplace */}
              <div
                onClick={() => {
                  const match = services.find(s => s.title.toLowerCase().includes('amazon') || s.slug?.includes('amazon') || s.title.toLowerCase().includes('marketplace')) || services[1];
                  onViewServiceDetail(match);
                }}
                className="p-7 rounded-3xl bg-terracotta-600 text-white shadow-soft hover:shadow-sunset-lg hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between group min-h-[250px]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl font-extrabold text-white font-display">
                    Brand<br />strategy & E-Com
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:bg-white group-hover:text-terracotta-600 transition-all shadow-sm">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
                <div className="space-y-3 mt-6">
                  <p className="text-xs text-white/90 leading-relaxed">
                    We define your marketplace direction, cataloging, and daily operations to help you stand out and grow on Amazon, Flipkart & Meesho.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white">Amazon & Flipkart</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white">A+ Listings</span>
                  </div>
                </div>
              </div>

              {/* CARD 3: Cream - Creative Direction & 3D Web */}
              <div
                onClick={() => {
                  const match = services.find(s => s.title.toLowerCase().includes('web') || s.slug?.includes('web')) || services[2];
                  onViewServiceDetail(match);
                }}
                className="p-7 rounded-3xl bg-cream-50 dark:bg-darkbg-card border border-cream-300/80 dark:border-white/10 hover:border-terracotta-400/60 shadow-soft hover:shadow-sunset/20 transition-all cursor-pointer flex flex-col justify-between group min-h-[250px]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl font-extrabold text-espresso-900 dark:text-cream-100 font-display">
                    Creative<br />direction & Web
                  </span>
                  <div className="w-10 h-10 rounded-full bg-espresso-900 text-cream-100 dark:bg-white dark:text-espresso-900 flex items-center justify-center group-hover:bg-terracotta-500 group-hover:text-white transition-all shadow-sm">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
                <div className="space-y-3 mt-6">
                  <p className="text-xs text-espresso-600 dark:text-cream-300 leading-relaxed">
                    Shaping the tone, message, and visual feel of your brand across high-converting React, Next.js, and interactive 3D platforms.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cream-200 dark:bg-darkbg-base text-espresso-800 dark:text-cream-200">Interactive 3D</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cream-200 dark:bg-darkbg-base text-espresso-800 dark:text-cream-200">Modern Dev</span>
                  </div>
                </div>
              </div>

            </div>

            {/* BOTTOM ROW: Manifesto Banner + Web Design + Motion & Content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              
              {/* Center Manifesto Banner (Image 2 style callout) */}
              <div className="md:col-span-4 p-7 rounded-3xl bg-cream-200/70 dark:bg-darkbg-card/70 border border-cream-300/70 dark:border-white/10 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta-600 dark:text-terracotta-400">
                    THE PIXELIX PROMISE
                  </span>
                  <h4 className="text-lg sm:text-xl font-extrabold text-espresso-900 dark:text-white font-display leading-snug">
                    "You don't need everything — just what works."
                  </h4>
                </div>
                <p className="text-xs text-espresso-600 dark:text-cream-400 mt-4 leading-relaxed">
                  We don't offer a fixed generic set of services — we combine the exact tools to solve your specific goals with focused ROI.
                </p>
              </div>

              {/* CARD 4: Cream - AI Automations */}
              <div
                onClick={() => {
                  const match = services.find(s => s.title.toLowerCase().includes('ai') || s.slug?.includes('ai')) || services[3];
                  onViewServiceDetail(match);
                }}
                className="md:col-span-4 p-7 rounded-3xl bg-cream-50 dark:bg-darkbg-card border border-cream-300/80 dark:border-white/10 hover:border-terracotta-400/60 shadow-soft hover:shadow-sunset/20 transition-all cursor-pointer flex flex-col justify-between group min-h-[230px]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl font-extrabold text-espresso-900 dark:text-cream-100 font-display">
                    AI agents &<br />automation
                  </span>
                  <div className="w-10 h-10 rounded-full bg-espresso-900 text-cream-100 dark:bg-white dark:text-espresso-900 flex items-center justify-center group-hover:bg-terracotta-500 group-hover:text-white transition-all shadow-sm">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
                <div className="space-y-3 mt-6">
                  <p className="text-xs text-espresso-600 dark:text-cream-300 leading-relaxed">
                    Designing intelligent conversational chatbots, automated WhatsApp intake agents, and CRM sync to capture and engage users 24/7.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cream-200 dark:bg-darkbg-base text-espresso-800 dark:text-cream-200">WhatsApp AI</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cream-200 dark:bg-darkbg-base text-espresso-800 dark:text-cream-200">Lead Qualifier</span>
                  </div>
                </div>
              </div>

              {/* CARD 5: Solid Terracotta Orange - Motion & Content */}
              <div
                onClick={() => {
                  const match = services.find(s => s.title.toLowerCase().includes('campaign') || s.slug?.includes('campaign') || s.title.toLowerCase().includes('visual')) || services[4] || services[0];
                  onViewServiceDetail(match);
                }}
                className="md:col-span-4 p-7 rounded-3xl bg-terracotta-600 text-white shadow-soft hover:shadow-sunset-lg hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between group min-h-[230px]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl font-extrabold text-white font-display">
                    Motion &<br />content
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:bg-white group-hover:text-terracotta-600 transition-all shadow-sm">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
                <div className="space-y-3 mt-6">
                  <p className="text-xs text-white/90 leading-relaxed">
                    From motion design to content — we create visuals that capture attention and tell your story across 5 print flyers & 5 social media PDFs.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white">5 Print PDFs</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white">5 Social Visuals</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* Full Page Catalog Grid with Search and Category Filter */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => {
              const IconComponent = iconMap[service.iconName] || Globe;
              return (
                <Floating3DCard key={service.slug} intensity={8} className="h-full">
                  <div className="h-full glass-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between border border-white dark:border-white/10 hover:border-terracotta-400/50 hover:shadow-sunset transition-all duration-300 group">
                    <div>
                      {/* Top Tag & Icon */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-terracotta-50 dark:bg-terracotta-900/40 border border-terracotta-200/80 dark:border-terracotta-700/50 text-terracotta-600 dark:text-terracotta-400 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:bg-sunset-gradient group-hover:text-white transition-all duration-300">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <Badge variant="terracotta" className="text-[10px] font-bold">
                          {service.badge}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-espresso-900 dark:text-white group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400 transition-colors font-display">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-espresso-700 dark:text-cream-300 mt-2 leading-relaxed line-clamp-3">
                        {service.shortDescription}
                      </p>

                      {/* Key Deliverables Highlights */}
                      {service.deliverables && service.deliverables.length > 0 && (
                        <div className="mt-4 space-y-1.5 pt-3 border-t border-cream-200/60 dark:border-white/10">
                          <div className="text-[10px] uppercase font-bold tracking-wider text-terracotta-600 dark:text-terracotta-400">
                            Included:
                          </div>
                          {service.deliverables.slice(0, 2).map((del, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-1.5 text-xs text-espresso-800 dark:text-cream-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-terracotta-500 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{del}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 pt-4 border-t border-cream-200/80 dark:border-white/10 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onViewServiceDetail(service)}
                        className="text-xs font-bold text-espresso-800 dark:text-cream-300 hover:text-terracotta-600 dark:hover:text-terracotta-400 transition-colors cursor-pointer"
                      >
                        Reviews & Details
                      </button>
                      <button
                        onClick={() => onViewServiceDetail(service)}
                        className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-sunset-gradient shadow-sm hover:shadow-sunset hover:scale-105 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                  </div>
                </Floating3DCard>
              );
            })}
          </div>
        )}

        {/* Featured Teaser Bottom Banner */}
        {isFeaturedOnly && onNavigateToAll && (
          <div className="mt-12 text-center">
            <button
              onClick={onNavigateToAll}
              className="px-8 py-3.5 rounded-full font-bold text-sm text-white bg-sunset-gradient shadow-sunset hover:shadow-sunset-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2.5 cursor-pointer"
            >
              <span>Explore All 10 Services (Marketplaces, Visuals, Print & More)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {!isFeaturedOnly && filteredServices.length === 0 && (
          <div className="py-16 text-center space-y-3">
            <p className="text-sm text-espresso-700 dark:text-cream-300">No services match your search query "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); onSelectCategory('all'); }}
              className="text-xs font-bold text-terracotta-600 underline cursor-pointer"
            >
              Reset filters & search
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
