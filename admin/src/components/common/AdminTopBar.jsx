import React, { useState, useEffect } from 'react';
import { useThemeMode } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  Sun,
  Moon,
  Search,
  Clock,
  Bell,
  ExternalLink,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { ENV } from '../../config/env';

export default function AdminTopBar({
  activeTab,
  onToggleSidebar,
  searchTerm,
  setSearchTerm
}) {
  const { isDark, toggleTheme } = useThemeMode();
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tabTitles = {
    overview: { name: 'Executive Overview', path: 'Dashboard / KPIs & Analytics' },
    employees: { name: 'Staff & Team Directory', path: 'Workforce / Personnel Management' },
    attendance: { name: 'Daily Work Logs & Oversight', path: 'Workforce / Real-time Timecards' },
    leaves: { name: 'Leave Approvals Queue', path: 'Workforce / Absence Requests' },
    inquiries: { name: 'Website CRM Leads', path: 'Operations / Inbound Client Inquiries' },
    operations: { name: 'E-Commerce & Service Tasks', path: 'Operations / Marketplace Board' },
    equity: { name: '15% Strategic Equity Offer', path: 'Legal & Corporate / Ownership Letter' },
    announcements: { name: 'Company Broadcasts', path: 'System / Internal Notice Board' },
    payroll: { name: 'Monthly Payroll Calculator', path: 'Management / Working Days & Pay' },
    settings: { name: 'Portal Security & Config', path: 'System / Organization Settings' }
  };

  const currentTabInfo = tabTitles[activeTab] || { name: 'Admin Console', path: 'Pixelix HQ' };

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-darkbg-surface/80 backdrop-blur-md border-b border-cream-200 dark:border-darkbg-border h-16 transition-colors duration-300">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Toggle & Breadcrumbs */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-espresso-600 dark:text-cream-300 hover:bg-cream-100 dark:hover:bg-darkbg-elevated transition-colors"
            title="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex flex-col truncate">
            <span className="text-[10px] uppercase font-bold tracking-wider text-espresso-400 dark:text-cream-400/70 truncate hidden sm:block">
              {currentTabInfo.path}
            </span>
            <h1 className="text-sm sm:text-base font-extrabold text-espresso-900 dark:text-cream-100 font-serif leading-tight truncate">
              {currentTabInfo.name}
            </h1>
          </div>
        </div>

        {/* Center: Search Bar (Visible on md and up) */}
        <div className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-md mx-2">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-espresso-400 dark:text-cream-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Quick search staff, leads, logs..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-cream-50 dark:bg-darkbg-elevated border border-cream-200 dark:border-darkbg-border text-espresso-900 dark:text-cream-100 placeholder-espresso-400 focus:outline-none focus:border-terracotta-500 transition-colors"
            />
          </div>
        </div>

        {/* Right: Live Clock, Theme Toggle & Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Real-time Clock Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cream-100 dark:bg-darkbg-elevated text-xs font-semibold text-espresso-700 dark:text-cream-300 border border-cream-200 dark:border-darkbg-border">
            <Clock className="w-3.5 h-3.5 text-terracotta-600 dark:text-terracotta-400" />
            <span>
              {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
            <span className="w-1 h-1 rounded-full bg-terracotta-500" />
            <span className="font-mono text-terracotta-600 dark:text-terracotta-400 font-bold">
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all border cursor-pointer bg-cream-100 hover:bg-cream-200 text-espresso-800 border-cream-300 dark:bg-darkbg-elevated dark:hover:bg-espresso-800 dark:text-cream-100 dark:border-white/10"
            title={isDark ? "Switch to Normal Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-terracotta-600" />}
          </button>

          {/* Public Portal Shortcut */}
          <a
            href={ENV.MAIN_SITE_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-terracotta-50 dark:bg-terracotta-950/40 text-terracotta-700 dark:text-terracotta-300 border border-terracotta-200 dark:border-terracotta-800 text-xs font-bold hover:bg-terracotta-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
            <span>Website</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
          </a>
        </div>

      </div>
    </header>
  );
}

