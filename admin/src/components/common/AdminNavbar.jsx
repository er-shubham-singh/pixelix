import React from 'react';
import PixelixLogo from './PixelixLogo';
import { useThemeMode } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Sun, Moon, LogOut, ExternalLink, ShieldAlert, Building2 } from 'lucide-react';
import { ENV } from '../../config/env';

export default function AdminNavbar() {
  const { isDark, toggleTheme } = useThemeMode();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-darkbg-surface/80 backdrop-blur-md border-b border-cream-200 dark:border-darkbg-border py-3.5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <PixelixLogo size="sm" />
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            Owner & Admin Control
          </span>
        </div>

        {/* Quick External Links & Actions */}
        <div className="flex items-center gap-3">
          
          {/* Main Website Link */}
          <a
            href={ENV.MAIN_SITE_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-espresso-600 dark:text-cream-300 hover:text-terracotta-600 dark:hover:text-terracotta-400 px-3 py-1.5 rounded-xl hover:bg-cream-100 dark:hover:bg-darkbg-elevated transition-colors"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Employee Portal Link */}
          <a
            href={ENV.EMPLOYEE_SITE_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-espresso-600 dark:text-cream-300 hover:text-terracotta-600 dark:hover:text-terracotta-400 px-3 py-1.5 rounded-xl hover:bg-cream-100 dark:hover:bg-darkbg-elevated transition-colors"
          >
            <span>Employee Subdomain</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all border cursor-pointer bg-cream-200/80 hover:bg-cream-300 text-espresso-800 border-terracotta-200/60 dark:bg-darkbg-elevated dark:hover:bg-espresso-700 dark:text-cream-100 dark:border-white/10"
            title={isDark ? "Switch to Normal Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-terracotta-600" />}
          </button>

          {/* Director Profile / Logout */}
          {user && (
            <div className="flex items-center gap-2 pl-2 border-l border-cream-300 dark:border-darkbg-border">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-espresso-900 dark:text-cream-100 truncate max-w-[120px]">
                  {user.name}
                </div>
                <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold truncate max-w-[120px]">
                  Company Owner
                </div>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-xl text-espresso-600 dark:text-cream-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

