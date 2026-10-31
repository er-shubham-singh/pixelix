import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserCheck, Lock, Mail, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import Badge from '../components/common/Badge';
import PixelixLogo from '../components/common/PixelixLogo';

export default function EmployeeLoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide corporate email and password');
      return;
    }

    setLoading(true);
    setError('');

    const res = await login(email, password);
    setLoading(false);

    if (!res.success) {
      setError(res.message || 'Login failed. Please verify credentials.');
    }
  };

  const fillDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Form Card */}
        <div className="lg:col-span-7 bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="mb-6">
            <PixelixLogo size="md" />
            <div className="mt-4">
              <Badge variant="terracotta" className="mb-2">
                <UserCheck className="w-3.5 h-3.5 inline mr-1" />
                Employee Workforce Portal
              </Badge>
              <h1 className="text-2xl font-bold text-espresso-900 dark:text-cream-100 font-serif">
                Employee Workspace Sign In
              </h1>
              <p className="text-xs text-espresso-500 dark:text-cream-300/70 mt-1">
                Mark daily attendance, submit work summaries, and track leave requests.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1.5">
                Corporate Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-espresso-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aarav.dev@pixelix.co.in"
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
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying Credentials...
                </span>
              ) : (
                <>
                  <span>Sign In to Employee Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Demo Accounts & Guide */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-cream-50 dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-terracotta-600 dark:text-terracotta-400 mb-3">
              <Sparkles className="w-4 h-4" />
              Demo Employee Profiles
            </div>
            <p className="text-xs text-espresso-600 dark:text-cream-300 mb-4">
              Click any profile below to fill credentials and log into employee workspace:
            </p>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => fillDemo('aarav.dev@pixelix.co.in', 'Employee@2026')}
                className="w-full text-left p-3 rounded-xl border border-cream-200 dark:border-darkbg-border bg-white dark:bg-darkbg-base hover:border-terracotta-400 dark:hover:border-terracotta-500 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-espresso-900 dark:text-cream-100">
                      Aarav Sharma
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 font-medium">
                      Full Stack Dev
                    </span>
                  </div>
                  <p className="text-[11px] text-espresso-500 dark:text-cream-300/70 font-mono">
                    aarav.dev@pixelix.co.in
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-espresso-400 group-hover:text-terracotta-500 group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                type="button"
                onClick={() => fillDemo('priya.lead@pixelix.co.in', 'Employee@2026')}
                className="w-full text-left p-3 rounded-xl border border-cream-200 dark:border-darkbg-border bg-white dark:bg-darkbg-base hover:border-terracotta-400 dark:hover:border-terracotta-500 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-espresso-900 dark:text-cream-100">
                      Priya Verma
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium">
                      Telecaller
                    </span>
                  </div>
                  <p className="text-[11px] text-espresso-500 dark:text-cream-300/70 font-mono">
                    priya.lead@pixelix.co.in
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-espresso-400 group-hover:text-terracotta-500 group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                type="button"
                onClick={() => fillDemo('rohan.social@pixelix.co.in', 'Employee@2026')}
                className="w-full text-left p-3 rounded-xl border border-cream-200 dark:border-darkbg-border bg-white dark:bg-darkbg-base hover:border-terracotta-400 dark:hover:border-terracotta-500 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-espresso-900 dark:text-cream-100">
                      Rohan Mehta
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-medium">
                      Social Media
                    </span>
                  </div>
                  <p className="text-[11px] text-espresso-500 dark:text-cream-300/70 font-mono">
                    rohan.social@pixelix.co.in
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-espresso-400 group-hover:text-terracotta-500 group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300/90 leading-relaxed">
            <span className="font-bold">🔐 Security Policy:</span> New employee accounts are created by the company Owner. When registered, login details are automatically delivered via Nodemailer to the employee's inbox.
          </div>
        </div>

      </div>
    </div>
  );
}

