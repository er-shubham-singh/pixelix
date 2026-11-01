import React, { useState, useEffect } from 'react';
import {
  fetchCalculatorConfig,
  updateCalculatorConfig
} from '../../services/ownerApi';
import { Hammer, Save, CheckCircle2, RotateCcw, AlertCircle, Sparkles } from 'lucide-react';

export default function ConstructionConfigAdmin() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    setLoading(true);
    const data = await fetchCalculatorConfig();
    if (data) setConfig(data);
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });
    const res = await updateCalculatorConfig(config);
    setSaving(false);
    if (res.ok) {
      setMessage({ text: 'Construction rates & factors updated successfully!', type: 'success' });
      if (res.config) setConfig(res.config);
    } else {
      setMessage({ text: res.message || 'Failed to update rates', type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-espresso-500 dark:text-cream-400">
        Loading Construction Configuration...
      </div>
    );
  }

  if (!config) {
    return (
      <div className="p-8 text-center text-rose-500">
        Could not load calculator configuration.
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-200 dark:border-darkbg-border">
        <div>
          <h3 className="text-xl font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2 font-serif">
            <Hammer className="w-5 h-5 text-terracotta-500" />
            Real Estate Construction Calculator Rates & Formulas
          </h3>
          <p className="text-xs text-espresso-500 dark:text-cream-400">
            Control live material rates, consumption factors per sq.ft, labour charges, and contingency percentages
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
        </button>
      </div>

      {message.text && (
        <div
          className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
              : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
          }`}
        >
          {message.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Base Material Rates */}
        <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border space-y-4 shadow-xs">
          <h4 className="text-sm font-bold uppercase tracking-wider text-espresso-900 dark:text-cream-100">
            1. Current Market Material Rates (INR)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-espresso-700 dark:text-cream-300 mb-1">
                Brick Rate (₹ / piece)
              </label>
              <input
                type="number"
                step="0.5"
                value={config.materialRates?.brickRatePerUnit || 9}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    materialRates: { ...config.materialRates, brickRatePerUnit: parseFloat(e.target.value) || 0 }
                  })
                }
                className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base font-mono font-bold text-espresso-900 dark:text-cream-100"
              />
            </div>

            <div>
              <label className="block font-bold text-espresso-700 dark:text-cream-300 mb-1">
                Cement Rate (₹ / 50kg bag)
              </label>
              <input
                type="number"
                step="10"
                value={config.materialRates?.cementRatePerBag || 380}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    materialRates: { ...config.materialRates, cementRatePerBag: parseFloat(e.target.value) || 0 }
                  })
                }
                className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base font-mono font-bold text-espresso-900 dark:text-cream-100"
              />
            </div>

            <div>
              <label className="block font-bold text-espresso-700 dark:text-cream-300 mb-1">
                TMT Steel Rate (₹ / KG)
              </label>
              <input
                type="number"
                step="1"
                value={config.materialRates?.steelRatePerKg || 72}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    materialRates: { ...config.materialRates, steelRatePerKg: parseFloat(e.target.value) || 0 }
                  })
                }
                className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base font-mono font-bold text-espresso-900 dark:text-cream-100"
              />
            </div>
          </div>
        </div>

        {/* 2. Material Consumption Factors */}
        <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border space-y-4 shadow-xs">
          <h4 className="text-sm font-bold uppercase tracking-wider text-espresso-900 dark:text-cream-100">
            2. Consumption Factors (Quantity Required per Square Foot)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-espresso-700 dark:text-cream-300 mb-1">
                Bricks per Sq. Ft.
              </label>
              <input
                type="number"
                step="0.5"
                value={config.consumptionFactors?.bricksPerSqFt || 8}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    consumptionFactors: { ...config.consumptionFactors, bricksPerSqFt: parseFloat(e.target.value) || 0 }
                  })
                }
                className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base font-mono font-bold text-espresso-900 dark:text-cream-100"
              />
            </div>

            <div>
              <label className="block font-bold text-espresso-700 dark:text-cream-300 mb-1">
                Cement Bags per Sq. Ft.
              </label>
              <input
                type="number"
                step="0.05"
                value={config.consumptionFactors?.cementBagsPerSqFt || 0.4}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    consumptionFactors: { ...config.consumptionFactors, cementBagsPerSqFt: parseFloat(e.target.value) || 0 }
                  })
                }
                className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base font-mono font-bold text-espresso-900 dark:text-cream-100"
              />
            </div>

            <div>
              <label className="block font-bold text-espresso-700 dark:text-cream-300 mb-1">
                Steel (KG) per Sq. Ft.
              </label>
              <input
                type="number"
                step="0.1"
                value={config.consumptionFactors?.steelKgPerSqFt || 3.5}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    consumptionFactors: { ...config.consumptionFactors, steelKgPerSqFt: parseFloat(e.target.value) || 0 }
                  })
                }
                className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base font-mono font-bold text-espresso-900 dark:text-cream-100"
              />
            </div>
          </div>
        </div>

        {/* 3. Contingency & Coverage Defaults */}
        <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border space-y-4 shadow-xs">
          <h4 className="text-sm font-bold uppercase tracking-wider text-espresso-900 dark:text-cream-100">
            3. Project Assumptions & Contingency
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-espresso-700 dark:text-cream-300 mb-1">
                Default Coverage Percentage (%)
              </label>
              <input
                type="number"
                value={config.coveragePercentDefault || 70}
                onChange={(e) => setConfig({ ...config, coveragePercentDefault: parseInt(e.target.value, 10) || 70 })}
                className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base font-mono font-bold text-espresso-900 dark:text-cream-100"
              />
            </div>

            <div>
              <label className="block font-bold text-espresso-700 dark:text-cream-300 mb-1">
                Contingency Margin (%)
              </label>
              <input
                type="number"
                value={config.contingencyPercent || 5}
                onChange={(e) => setConfig({ ...config, contingencyPercent: parseFloat(e.target.value) || 5 })}
                className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base font-mono font-bold text-espresso-900 dark:text-cream-100"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-espresso-700 dark:text-cream-300 mb-1 text-xs">
              Public Calculator Disclaimer Notice
            </label>
            <textarea
              rows={3}
              value={config.disclaimerText || ''}
              onChange={(e) => setConfig({ ...config, disclaimerText: e.target.value })}
              className="w-full p-3 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

