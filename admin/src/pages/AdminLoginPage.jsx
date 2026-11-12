import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Building2, Lock, Mail, ArrowRight } from 'lucide-react';
import Badge from '../components/common/Badge';
import PixelixLogo from '../components/common/PixelixLogo';
import PixelixLoader from '../components/common/PixelixLoader';

export default function AdminLoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide director email and master password');
      return;
    }

    setLoading(true);
    setError('');

    const res = await login(email, password);
    setLoading(false);

    if (!res.success) {
      setError(res.message || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="mb-6 text-center flex flex-col items-center">
            <PixelixLogo size="md" />
            <div className="mt-4">
              <Badge variant="amber" className="mb-2">
                <Building2 className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                Owner Master Control
              </Badge>
              <h1 className="text-2xl font-bold text-espresso-900 dark:text-cream-100 font-serif">
                Executive Administration Sign In
              </h1>
              <p className="text-xs text-espresso-500 dark:text-cream-300/70 mt-1">
                Enter your executive credentials to access Pixelix master control.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1.5">
                Executive Owner Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-espresso-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@pixelix.co.in"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-sm text-espresso-900 dark:text-cream-100 placeholder-espresso-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-espresso-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-sm text-espresso-900 dark:text-cream-100 placeholder-espresso-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-6 rounded-xl font-bold text-white bg-terracotta-500 hover:bg-terracotta-600 active:scale-[0.99] transition-all duration-200 shadow-md shadow-terracotta-500/20 flex items-center justify-center gap-2 text-sm disabled:opacity-60"
            >
              {loading ? (
                <PixelixLoader variant="inline" size="sm" text="Verifying Executive Credentials..." />
              ) : (
                <>
                  <span>Sign In to Owner Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
