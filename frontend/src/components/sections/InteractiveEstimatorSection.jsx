import React, { useState, useMemo } from 'react';
import { Calculator, Check, ArrowRight, Sparkles, Clock, Layers } from 'lucide-react';

export default function InteractiveEstimatorSection({ onBookWithEstimator }) {
  const options = [
    { id: 'web', name: 'Custom Website Development', category: 'Engineering', price: 30000, days: 14 },
    { id: 'app', name: 'iOS & Android Mobile App', category: 'Engineering', price: 55000, days: 28 },
    { id: 'ai-chat', name: '24/7 AI WhatsApp/Web Chatbot', category: 'AI', price: 25000, days: 10 },
    { id: 'brand-kit', name: 'Brand Identity (5 Vector Logos + Kit)', category: 'Design', price: 20000, days: 7 },
    { id: 'listing-catalog', name: 'Product Listing & A+ Content (Amazon/Flipkart/Meesho)', category: 'E-Com Ops', price: 20000, days: 8 },
    { id: 'order-process', name: 'Order Creation & Daily Fulfillment Processing', category: 'E-Com Ops', price: 18000, days: 7 },
    { id: 'dispatch-logistics', name: 'Dispatch & Logistics Carrier Management', category: 'E-Com Ops', price: 16000, days: 6 },
    { id: 'rto-claims', name: 'Returns, RTO Reduction & Safe-T Claims Recovery', category: 'E-Com Ops', price: 15000, days: 7 },
    { id: 'inventory-sync', name: 'Multi-Channel Inventory Sync & FBA Inbounding', category: 'E-Com Ops', price: 18000, days: 7 },
    { id: 'ecom-full', name: 'Full E-Commerce Account Management Retainer', category: 'E-Com Ops', price: 35000, days: 30 },
    { id: 'visuals', name: 'Product Cut-outs & Retouching (20 Assets)', category: 'Design', price: 15000, days: 5 },
    { id: 'campaigns', name: '5 Print Flyers, Brochures & Banners', category: 'Marketing', price: 16000, days: 6 },
    { id: 'social', name: '5 Social Media Creative PDFs & Banners', category: 'Marketing', price: 14000, days: 5 },
  ];

  const [selectedIds, setSelectedIds] = useState(['web', 'brand-kit']);

  const toggleOption = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? (prev.length > 1 ? prev.filter(item => item !== id) : prev) : [...prev, id]
    );
  };

  const calculation = useMemo(() => {
    const selected = options.filter(o => selectedIds.includes(o.id));
    const totalPrice = selected.reduce((acc, curr) => acc + curr.price, 0);
    const maxDays = Math.max(...selected.map(o => o.days), 7);
    const totalDays = Math.round(maxDays + (selected.length - 1) * 3);

    return {
      totalPrice,
      totalDays,
      selectedCount: selected.length,
      names: selected.map(s => s.name).join(', ')
    };
  }, [selectedIds]);

  return (
    <div className="w-full relative transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* 2 Column Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Options Selection (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-espresso-600 dark:text-cream-400 mb-2">
              Select Services to Bundle:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {options.map((opt) => {
                const isSelected = selectedIds.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleOption(opt.id)}
                    className={`p-4 rounded-2xl cursor-pointer border transition-all duration-200 flex items-start gap-3 select-none ${
                      isSelected
                        ? 'bg-white dark:bg-darkbg-card border-terracotta-500 shadow-sunset ring-1 ring-terracotta-400'
                        : 'bg-white/60 dark:bg-darkbg-card/50 border-cream-300 dark:border-white/10 hover:bg-white dark:hover:bg-darkbg-card text-espresso-700 dark:text-cream-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected ? 'bg-terracotta-500 text-white' : 'border border-cream-300 dark:border-white/20 bg-cream-100 dark:bg-white/5'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-espresso-900 dark:text-white leading-snug">{opt.name}</div>
                      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-espresso-500 dark:text-cream-400">
                        <span className="bg-cream-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-espresso-800 dark:text-cream-200">{opt.category}</span>
                        <span>~{opt.days} days</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Live Summary Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 glass-card p-8 rounded-3xl border border-cream-300 dark:border-white/10 shadow-soft space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-cream-200 dark:border-white/10">
                <span className="font-bold text-xs uppercase tracking-wider text-terracotta-600 dark:text-terracotta-400">Estimate Breakdown</span>
                <span className="text-xs font-semibold text-espresso-600 dark:text-cream-300">{calculation.selectedCount} Selected</span>
              </div>

              {/* Price Estimate */}
              <div>
                <div className="text-xs font-medium text-espresso-600 dark:text-cream-300">Estimated Investment Range</div>
                <div className="text-3xl sm:text-4xl font-extrabold text-espresso-900 dark:text-white font-display mt-1">
                  ₹{calculation.totalPrice.toLocaleString('en-IN')}
                  <span className="text-sm font-normal text-espresso-500 dark:text-cream-400 ml-1.5">(Approx)</span>
                </div>
              </div>

              {/* Timeline Estimate */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-cream-200/60 dark:bg-white/10 border border-cream-300 dark:border-white/10 text-xs text-espresso-800 dark:text-cream-200">
                <Clock className="w-4 h-4 text-terracotta-500 shrink-0" />
                <div>
                  <span className="font-bold">Estimated Turnaround:</span> ~{calculation.totalDays} Business Days
                </div>
              </div>

              {/* Inclusions */}
              <div className="space-y-1.5 text-xs text-espresso-700 dark:text-cream-300">
                <div className="font-semibold text-espresso-900 dark:text-white">Included Standard Benefits:</div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-terracotta-500 shrink-0" />
                  <span>100% Commercial Source Code & Vector Ownership</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-terracotta-500 shrink-0" />
                  <span>Direct founder collaboration (Vikas & Shubham)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-terracotta-500 shrink-0" />
                  <span>Sub-second high-speed deployment setup</span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => onBookWithEstimator(calculation)}
                className="w-full py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-sunset-gradient shadow-sunset hover:shadow-sunset-lg hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Custom Proposal for this Scope</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-espresso-500 dark:text-cream-400">
                *Final quotation confirmed after requirement discovery session.
              </p>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
