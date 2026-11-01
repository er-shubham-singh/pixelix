import React, { useState, useEffect, useMemo } from 'react';
import {
  Building2,
  Layers,
  Ruler,
  Percent,
  Download,
  RotateCcw,
  Send,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  FileText,
  Hammer
} from 'lucide-react';
import { ENV } from '../../config/env';

// Fallback rates if backend API is offline or loading
const FALLBACK_CONFIG = {
  coveragePercentDefault: 70,
  contingencyPercent: 5,
  consumptionFactors: {
    bricksPerSqFt: 8,
    cementBagsPerSqFt: 0.4,
    steelKgPerSqFt: 3.5
  },
  materialRates: {
    brickRatePerUnit: 9,
    cementRatePerBag: 380,
    steelRatePerKg: 72
  },
  qualityTiers: {
    basic: {
      name: 'Basic / Economy',
      ratePerSqFt: 1350,
      materialMultiplier: 0.88,
      labourPerSqFt: 320,
      otherExpensesPerSqFt: 250,
      description: 'Standard red bricks, OPC 43 grade cement, Fe 415 TMT steel, basic ceramic tiles and fittings.'
    },
    standard: {
      name: 'Standard / Recommended',
      ratePerSqFt: 1750,
      materialMultiplier: 1.0,
      labourPerSqFt: 400,
      otherExpensesPerSqFt: 350,
      description: 'High-density clay/fly-ash bricks, PPC cement, Fe 500 TMT steel, vitrified tiles, branded fittings.'
    },
    premium: {
      name: 'Premium / Luxury',
      ratePerSqFt: 2450,
      materialMultiplier: 1.25,
      labourPerSqFt: 550,
      otherExpensesPerSqFt: 520,
      description: 'AAC blocks / machine bricks, premium PPC/OPC, Fe 550D TMT, Italian marble/granite, smart electricals.'
    }
  },
  disclaimerText:
    'These calculations are approximate estimates based on configurable material rates and construction assumptions. Actual costs may vary depending on location, design, structural requirements, material quality, and labour charges. Contact our team for a detailed quotation.'
};

export default function RealEstateConstructionCalculator({ onRequestQuote }) {
  // Input states
  const [plotArea, setPlotArea] = useState(1200);
  const [unit, setUnit] = useState('sq_ft'); // 'sq_ft' | 'sq_yd'
  const [coveragePercent, setCoveragePercent] = useState(70);
  const [floors, setFloors] = useState(2);
  const [quality, setQuality] = useState('standard'); // 'basic' | 'standard' | 'premium'
  const [customBuiltUpArea, setCustomBuiltUpArea] = useState('');
  const [useCustomBuiltUp, setUseCustomBuiltUp] = useState(false);

  // Config & quotation modal state
  const [config, setConfig] = useState(FALLBACK_CONFIG);
  const [isLoadingConfig, setIsLoadingConfig] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ name: '', phone: '', email: '', location: '', notes: '' });
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  // Fetch admin rates on mount
  useEffect(() => {
    async function fetchConfig() {
      setIsLoadingConfig(true);
      try {
        const res = await fetch(`${ENV.API_BASE_URL}/api/real-estate/calculator/config`);
        if (res.ok) {
          const data = await res.json();
          if (data?.config) setConfig(data.config);
        }
      } catch (e) {
        // Fallback silently kept
      } finally {
        setIsLoadingConfig(false);
      }
    }
    fetchConfig();
  }, []);

  // Calculation Logic (Formula strictly follows development specification)
  const calculation = useMemo(() => {
    const rawPlot = Math.max(0, parseFloat(plotArea) || 0);

    // 1 Square Yard = 9 Square Feet
    const plotAreaSqFt = unit === 'sq_yd' ? rawPlot * 9 : rawPlot;
    const effectiveCoverage = Math.min(100, Math.max(10, parseFloat(coveragePercent) || 70));
    const effectiveFloors = Math.max(1, parseInt(floors, 10) || 1);

    // Built-up Area = Plot Area × Coverage Percentage × Number of Floors
    let builtUpArea = 0;
    if (useCustomBuiltUp && customBuiltUpArea && parseFloat(customBuiltUpArea) > 0) {
      builtUpArea = parseFloat(customBuiltUpArea);
    } else {
      builtUpArea = Math.round(plotAreaSqFt * (effectiveCoverage / 100) * effectiveFloors);
    }

    const tier = config.qualityTiers?.[quality] || config.qualityTiers?.standard || FALLBACK_CONFIG.qualityTiers.standard;
    const multiplier = tier.materialMultiplier || 1.0;

    const factors = config.consumptionFactors || FALLBACK_CONFIG.consumptionFactors;
    const rates = config.materialRates || FALLBACK_CONFIG.materialRates;

    // Materials
    const bricksCount = Math.round(builtUpArea * (factors.bricksPerSqFt || 8) * multiplier);
    const cementBags = Math.round(builtUpArea * (factors.cementBagsPerSqFt || 0.4) * multiplier);
    const steelKg = Math.round(builtUpArea * (factors.steelKgPerSqFt || 3.5) * multiplier);

    const brickCost = Math.round(bricksCount * (rates.brickRatePerUnit || 9));
    const cementCost = Math.round(cementBags * (rates.cementRatePerBag || 380));
    const steelCost = Math.round(steelKg * (rates.steelRatePerKg || 72));
    const totalMaterialCost = brickCost + cementCost + steelCost;

    // Labour & Other
    const labourCost = Math.round(builtUpArea * (tier.labourPerSqFt || 400));
    const otherExpenses = Math.round(builtUpArea * (tier.otherExpensesPerSqFt || 350));

    // Contingency
    const subtotal = totalMaterialCost + labourCost + otherExpenses;
    const contingencyPercent = config.contingencyPercent || 5;
    const contingencyAmount = Math.round(subtotal * (contingencyPercent / 100));

    const totalEstimatedCost = subtotal + contingencyAmount;
    const costPerSqFt = builtUpArea > 0 ? Math.round(totalEstimatedCost / builtUpArea) : 0;

    return {
      rawPlot,
      plotAreaSqFt,
      effectiveCoverage,
      effectiveFloors,
      builtUpArea,
      tier,
      bricksCount,
      cementBags,
      steelKg,
      brickCost,
      cementCost,
      steelCost,
      totalMaterialCost,
      labourCost,
      otherExpenses,
      contingencyPercent,
      contingencyAmount,
      totalEstimatedCost,
      costPerSqFt
    };
  }, [plotArea, unit, coveragePercent, floors, quality, customBuiltUpArea, useCustomBuiltUp, config]);

  // Reset Handler
  const handleReset = () => {
    setPlotArea(1200);
    setUnit('sq_ft');
    setCoveragePercent(70);
    setFloors(2);
    setQuality('standard');
    setCustomBuiltUpArea('');
    setUseCustomBuiltUp(false);
  };

  // WhatsApp Contact Direct Link
  const handleWhatsAppContact = () => {
    const phone = '919876543210';
    const msg = `Hello Pixelix Team!
I calculated a construction estimate on your website:
• Plot Area: ${calculation.rawPlot} ${unit === 'sq_yd' ? 'Sq Yards' : 'Sq Feet'}
• Estimated Built-up Area: ${calculation.builtUpArea.toLocaleString('en-IN')} Sq Ft (${calculation.effectiveFloors} Floors)
• Quality Level: ${calculation.tier.name}
• Estimated Total Cost: ₹${calculation.totalEstimatedCost.toLocaleString('en-IN')} (approx ₹${calculation.costPerSqFt}/sq.ft)
• Required Materials: ${calculation.bricksCount.toLocaleString('en-IN')} Bricks, ${calculation.cementBags.toLocaleString('en-IN')} Cement Bags, ${calculation.steelKg.toLocaleString('en-IN')} KG Steel.

Please share a detailed architectural quotation for my project.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  // Printable Estimate PDF Trigger
  const handlePrintPDF = () => {
    window.print();
  };

  // Submit Detailed Quotation to Backend Leads API
  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setQuoteSubmitting(true);
    try {
      const payload = {
        name: quoteForm.name,
        phone: quoteForm.phone,
        email: quoteForm.email,
        service: 'real_estate_calculator',
        projectLocation: quoteForm.location,
        sourcePage: 'Real Estate Smart Cost Calculator',
        calculatorData: {
          plotArea: calculation.rawPlot,
          unit,
          coveragePercent: calculation.effectiveCoverage,
          floors: calculation.effectiveFloors,
          builtUpArea: calculation.builtUpArea,
          qualityTier: quality,
          totalCost: calculation.totalEstimatedCost,
          materialCost: calculation.totalMaterialCost,
          labourCost: calculation.labourCost,
          bricks: calculation.bricksCount,
          cementBags: calculation.cementBags,
          steelKg: calculation.steelKg
        },
        notes: quoteForm.notes
      };

      const res = await fetch(`${ENV.API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setQuoteSuccess(true);
        setTimeout(() => {
          setIsQuoteModalOpen(false);
          setQuoteSuccess(false);
          setQuoteForm({ name: '', phone: '', email: '', location: '', notes: '' });
        }, 2200);
      }
    } catch (err) {
      alert('Could not submit quotation. Please try contacting us on WhatsApp directly.');
    } finally {
      setQuoteSubmitting(false);
    }
  };

  // Percentage distribution for cost breakdown bar
  const materialShare = calculation.totalEstimatedCost > 0
    ? Math.round((calculation.totalMaterialCost / calculation.totalEstimatedCost) * 100)
    : 50;
  const labourShare = calculation.totalEstimatedCost > 0
    ? Math.round((calculation.labourCost / calculation.totalEstimatedCost) * 100)
    : 25;
  const otherShare = calculation.totalEstimatedCost > 0
    ? Math.round(((calculation.otherExpenses + calculation.contingencyAmount) / calculation.totalEstimatedCost) * 100)
    : 25;

  return (
    <div className="w-full space-y-8">
      {/* 1. Main Calculator Inputs & Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ========================================================
            LEFT COLUMN: PARAMETER INPUTS (7 Cols)
           ======================================================== */}
        <div className="lg:col-span-7 bg-white dark:bg-darkbg-surface border border-cream-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-cream-200 dark:border-white/10">
            <div>
              <h3 className="text-xl font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2 font-serif">
                <Hammer className="w-5 h-5 text-terracotta-500" />
                Construction Parameters
              </h3>
              <p className="text-xs text-espresso-500 dark:text-cream-400 mt-0.5">
                Configure your plot dimensions, unit type, floors, and construction quality grade
              </p>
            </div>
            <button
              onClick={handleReset}
              title="Reset parameters to defaults"
              className="px-3 py-1.5 rounded-xl border border-cream-300 dark:border-white/10 text-xs font-semibold text-espresso-600 dark:text-cream-300 hover:bg-cream-100 dark:hover:bg-darkbg-elevated flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Input 1: Plot Area & Unit Switcher */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-espresso-700 dark:text-cream-200 flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-terracotta-500" />
                <span>Plot Area Dimension</span>
              </label>

              {/* Unit Toggle: Sq Ft vs Sq Yards */}
              <div className="inline-flex rounded-xl p-1 bg-cream-100 dark:bg-darkbg-base border border-cream-200 dark:border-white/10 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setUnit('sq_ft')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    unit === 'sq_ft'
                      ? 'bg-terracotta-500 text-white shadow-2xs'
                      : 'text-espresso-600 dark:text-cream-400 hover:text-espresso-900'
                  }`}
                >
                  Sq. Feet (sq ft)
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('sq_yd')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    unit === 'sq_yd'
                      ? 'bg-terracotta-500 text-white shadow-2xs'
                      : 'text-espresso-600 dark:text-cream-400 hover:text-espresso-900'
                  }`}
                >
                  Sq. Yards (Gaj)
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="number"
                min="100"
                max="100000"
                step="10"
                value={plotArea}
                onChange={(e) => setPlotArea(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-cream-300 dark:border-white/15 bg-cream-50/70 dark:bg-darkbg-base text-espresso-900 dark:text-cream-100 text-base font-bold font-mono focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                placeholder="e.g. 1200"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-espresso-400 dark:text-cream-400">
                {unit === 'sq_yd' ? 'Square Yards (1 sq yd = 9 sq ft)' : 'Square Feet'}
              </span>
            </div>

            {unit === 'sq_yd' && (
              <p className="text-[11px] text-terracotta-600 dark:text-terracotta-400 font-medium">
                ⚡ Converted: {calculation.rawPlot} sq yards = <strong>{calculation.plotAreaSqFt.toLocaleString('en-IN')} sq ft</strong>
              </p>
            )}
          </div>

          {/* Input 2: Land Coverage Percentage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold uppercase tracking-wider text-espresso-700 dark:text-cream-200 flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-terracotta-500" />
                <span>Land Coverage Percentage</span>
              </label>
              <span className="font-mono font-bold text-terracotta-600 dark:text-terracotta-400">
                {coveragePercent}% of plot
              </span>
            </div>

            <input
              type="range"
              min="30"
              max="100"
              step="5"
              value={coveragePercent}
              onChange={(e) => setCoveragePercent(e.target.value)}
              className="w-full h-2 bg-cream-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-terracotta-500"
            />
            <div className="flex justify-between text-[10px] text-espresso-400 dark:text-cream-400 font-mono">
              <span>30% (Open Garden)</span>
              <span>70% (Standard Bylaw)</span>
              <span>100% (Full Plot)</span>
            </div>
          </div>

          {/* Input 3: Number of Floors */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-espresso-700 dark:text-cream-200 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-terracotta-500" />
              <span>Number of Floors (Storeys)</span>
            </label>

            <div className="grid grid-cols-5 gap-2">
              {[
                { val: 1, label: 'G (1)' },
                { val: 2, label: 'G+1 (2)' },
                { val: 3, label: 'G+2 (3)' },
                { val: 4, label: 'G+3 (4)' },
                { val: 5, label: 'G+4 (5)' }
              ].map((f) => (
                <button
                  key={f.val}
                  type="button"
                  onClick={() => setFloors(f.val)}
                  className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    floors === f.val
                      ? 'border-terracotta-500 bg-terracotta-50 dark:bg-terracotta-950/40 text-terracotta-700 dark:text-terracotta-300 ring-1 ring-terracotta-500'
                      : 'border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-base text-espresso-700 dark:text-cream-300 hover:border-cream-400'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input 4: Construction Quality Grade */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-espresso-700 dark:text-cream-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
              <span>Construction Quality Grade</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'basic',
                  title: 'Basic / Economy',
                  rate: '₹1,350 / sq.ft',
                  desc: 'Standard red bricks, OPC 43 cement, Fe 415 steel.'
                },
                {
                  id: 'standard',
                  title: 'Standard / Recommended',
                  rate: '₹1,750 / sq.ft',
                  desc: 'High-grade bricks, PPC cement, Fe 500 TMT steel, vitrified tiles.'
                },
                {
                  id: 'premium',
                  title: 'Premium / Luxury',
                  rate: '₹2,450 / sq.ft',
                  desc: 'AAC blocks, Fe 550D TMT, Italian marble, smart automation.'
                }
              ].map((q) => (
                <div
                  key={q.id}
                  onClick={() => setQuality(q.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    quality === q.id
                      ? 'border-terracotta-500 bg-terracotta-50/70 dark:bg-terracotta-950/40 ring-2 ring-terracotta-500 shadow-xs'
                      : 'border-cream-200 dark:border-white/10 bg-cream-50/40 dark:bg-darkbg-base hover:border-cream-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-espresso-900 dark:text-cream-100">{q.title}</span>
                    {quality === q.id && <CheckCircle2 className="w-4 h-4 text-terracotta-600 shrink-0" />}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-terracotta-600 dark:text-terracotta-400 block mt-1">
                    {q.rate}
                  </span>
                  <p className="text-[10px] text-espresso-500 dark:text-cream-400 mt-1 leading-snug">
                    {q.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Optional: Custom Built-up Area Toggle */}
          <div className="pt-2 border-t border-cream-200 dark:border-white/10">
            <button
              type="button"
              onClick={() => setUseCustomBuiltUp(!useCustomBuiltUp)}
              className="text-xs font-semibold text-terracotta-600 dark:text-terracotta-400 hover:underline flex items-center gap-1.5"
            >
              <span>{useCustomBuiltUp ? '− Use formula built-up area' : '+ Enter custom built-up area directly'}</span>
            </button>

            {useCustomBuiltUp && (
              <div className="mt-3 animate-fade-in">
                <input
                  type="number"
                  placeholder="Enter exact built-up area in Sq. Ft."
                  value={customBuiltUpArea}
                  onChange={(e) => setCustomBuiltUpArea(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 dark:border-white/15 bg-cream-50 dark:bg-darkbg-base text-xs font-mono font-bold text-espresso-900 dark:text-cream-100"
                />
              </div>
            )}
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN: RESULTS & DETAILED ESTIMATE BREAKDOWN (5 Cols)
           ======================================================== */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Total Cost Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-espresso-900 via-espresso-850 to-espresso-950 text-white shadow-xl space-y-5 border border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-white/15">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-cream-300 block">
                  Estimated Total Construction Cost
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-terracotta-400 mt-1">
                  ₹{calculation.totalEstimatedCost.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-cream-300/80 block uppercase">Avg Rate</span>
                <span className="text-sm font-mono font-bold text-cream-100">
                  ₹{calculation.costPerSqFt}/sq.ft
                </span>
              </div>
            </div>

            {/* Built-up area pill */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-cream-300 block mb-0.5">Built-up Area</span>
                <span className="text-lg font-mono font-black text-white">
                  {calculation.builtUpArea.toLocaleString('en-IN')}{' '}
                  <span className="text-xs font-normal text-cream-300">sq.ft</span>
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-cream-300 block mb-0.5">Quality Tier</span>
                <span className="text-sm font-bold text-terracotta-300 truncate block">
                  {calculation.tier.name}
                </span>
              </div>
            </div>

            {/* Visual Graphical Cost Distribution Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px] font-bold text-cream-200">
                <span>Cost Distribution</span>
                <span>100% Comprehensive</span>
              </div>
              <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden flex">
                <div style={{ width: `${materialShare}%` }} className="bg-terracotta-500 h-full" title={`Materials: ${materialShare}%`} />
                <div style={{ width: `${labourShare}%` }} className="bg-amber-400 h-full" title={`Labour: ${labourShare}%`} />
                <div style={{ width: `${otherShare}%` }} className="bg-sky-400 h-full" title={`Finishes & Contingency: ${otherShare}%`} />
              </div>
              <div className="flex justify-between text-[9px] text-cream-300/80 pt-1 font-mono">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-terracotta-500" /> Materials ({materialShare}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> Labour ({labourShare}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-sky-400" /> Finishes ({otherShare}%)
                </span>
              </div>
            </div>

            {/* Quick Action CTA buttons */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleWhatsAppContact}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp Quote</span>
              </button>
              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-terracotta-500 hover:bg-terracotta-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5 shrink-0" />
                <span>Request Quotation</span>
              </button>
            </div>
          </div>

          {/* Itemized Materials & Construction Expenses Card */}
          <div className="bg-white dark:bg-darkbg-surface border border-cream-200 dark:border-white/10 rounded-3xl p-6 shadow-sm space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-espresso-900 dark:text-cream-100 flex items-center justify-between">
              <span>Itemized Quantity & Cost Breakdown</span>
              <span className="text-[10px] font-mono text-espresso-400 dark:text-cream-400 font-normal">Approximate</span>
            </h4>

            <div className="divide-y divide-cream-100 dark:divide-white/5 text-xs">
              
              {/* Bricks */}
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-espresso-900 dark:text-cream-100">Estimated Bricks</div>
                  <div className="text-[11px] text-espresso-500 dark:text-cream-400 font-mono">
                    {calculation.bricksCount.toLocaleString('en-IN')} units
                  </div>
                </div>
                <div className="font-mono font-bold text-espresso-900 dark:text-cream-100">
                  ₹{calculation.brickCost.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Cement */}
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-espresso-900 dark:text-cream-100">Cement Bags (50kg)</div>
                  <div className="text-[11px] text-espresso-500 dark:text-cream-400 font-mono">
                    {calculation.cementBags.toLocaleString('en-IN')} bags
                  </div>
                </div>
                <div className="font-mono font-bold text-espresso-900 dark:text-cream-100">
                  ₹{calculation.cementCost.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Steel */}
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-espresso-900 dark:text-cream-100">TMT Steel (Fe 500/550)</div>
                  <div className="text-[11px] text-espresso-500 dark:text-cream-400 font-mono">
                    {calculation.steelKg.toLocaleString('en-IN')} KG
                  </div>
                </div>
                <div className="font-mono font-bold text-espresso-900 dark:text-cream-100">
                  ₹{calculation.steelCost.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Labour */}
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-espresso-900 dark:text-cream-100">Labour & Masonry</div>
                  <div className="text-[11px] text-espresso-500 dark:text-cream-400 font-mono">
                    Contractor, curing, structural team
                  </div>
                </div>
                <div className="font-mono font-bold text-espresso-900 dark:text-cream-100">
                  ₹{calculation.labourCost.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Other Expenses & Contingency */}
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-espresso-900 dark:text-cream-100">Finishes, Plumbing & Electric</div>
                  <div className="text-[11px] text-espresso-500 dark:text-cream-400 font-mono">
                    Flooring, sanitary, wiring, contingency ({calculation.contingencyPercent}%)
                  </div>
                </div>
                <div className="font-mono font-bold text-espresso-900 dark:text-cream-100">
                  ₹{(calculation.otherExpenses + calculation.contingencyAmount).toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Download PDF button */}
            <button
              type="button"
              onClick={handlePrintPDF}
              className="w-full mt-2 py-2.5 rounded-xl border border-cream-300 dark:border-white/15 text-espresso-700 dark:text-cream-300 hover:bg-cream-100 dark:hover:bg-darkbg-elevated font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Estimate PDF Receipt</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Mandatory Disclaimer Notice */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700/60 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <span className="font-bold">Estimation Disclaimer: </span>
          {config.disclaimerText || FALLBACK_CONFIG.disclaimerText}
        </div>
      </div>

      {/* 3. Detailed Quotation Request Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-darkbg-card border border-cream-300 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-cream-200 dark:border-white/10">
              <div>
                <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 font-serif">
                  Request Official Quotation
                </h3>
                <p className="text-xs text-espresso-500 dark:text-cream-400">
                  Pixelix Real Estate & Engineering Division
                </p>
              </div>
              <button
                onClick={() => setIsQuoteModalOpen(false)}
                className="w-8 h-8 rounded-full bg-cream-100 dark:bg-darkbg-elevated text-espresso-600 dark:text-cream-300 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {quoteSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-bold text-base text-espresso-900 dark:text-cream-100">
                  Quotation Request Received!
                </h4>
                <p className="text-xs text-espresso-600 dark:text-cream-400 max-w-xs mx-auto">
                  Our structural engineers and 3D visualization team will contact you within 4 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="mt-4 space-y-4">
                <div className="p-3 rounded-2xl bg-cream-50 dark:bg-darkbg-base border border-cream-200 dark:border-white/10 text-xs font-mono space-y-1">
                  <div className="text-[10px] uppercase font-bold text-espresso-500">Selected Estimate Snapshot</div>
                  <div className="flex justify-between font-bold text-espresso-900 dark:text-cream-100">
                    <span>Built-up: {calculation.builtUpArea} sq ft ({calculation.tier.name})</span>
                    <span className="text-terracotta-600">₹{calculation.totalEstimatedCost.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-espresso-700 dark:text-cream-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={quoteForm.name}
                    onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                    placeholder="e.g. Ramesh Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-espresso-700 dark:text-cream-300 mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-espresso-700 dark:text-cream-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      placeholder="e.g. ramesh@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-espresso-700 dark:text-cream-300 mb-1">
                    Plot / Project Location
                  </label>
                  <input
                    type="text"
                    value={quoteForm.location}
                    onChange={(e) => setQuoteForm({ ...quoteForm, location: e.target.value })}
                    placeholder="City, State (e.g. Lucknow, Uttar Pradesh)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-espresso-700 dark:text-cream-300 mb-1">
                    Special Requirements or Floor Plan Notes
                  </label>
                  <textarea
                    rows={2}
                    value={quoteForm.notes}
                    onChange={(e) => setQuoteForm({ ...quoteForm, notes: e.target.value })}
                    placeholder="Mention if you also require 3D virtual walkthroughs, architectural drawings, or structural approvals..."
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300 dark:border-white/10 bg-cream-50/50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-cream-200 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsQuoteModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-cream-300 dark:border-white/10 text-xs font-semibold text-espresso-700 dark:text-cream-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={quoteSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                  >
                    {quoteSubmitting ? 'Submitting...' : 'Send Quotation Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

