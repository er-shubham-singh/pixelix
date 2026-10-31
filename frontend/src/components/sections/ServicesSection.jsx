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
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600 dark:text-terracotta-400">
              {isFeaturedOnly ? 'FEATURED CAPABILITIES' : 'COMPREHENSIVE CAPABILITIES (10 SERVICES)'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-espresso-900 dark:text-white tracking-tight font-display">
              {isFeaturedOnly
                ? 'Digital Products Built For Real Business'
                : 'Complete Digital, Branding & Marketplace Suite'}
            </h2>
            <p className="text-sm sm:text-base text-espresso-700 dark:text-cream-300 leading-relaxed">
              {isFeaturedOnly
                ? 'A curated preview of our high-impact systems. Explore our dedicated Services page for the full spectrum.'
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

        {/* Services 3D Card Grid */}
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
                      Details
                    </button>
                    <button
                      onClick={() => onBookService(service.title)}
                      className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-sunset-gradient shadow-sm hover:shadow-sunset hover:scale-105 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </div>
              </Floating3DCard>
            );
          })}
        </div>

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
