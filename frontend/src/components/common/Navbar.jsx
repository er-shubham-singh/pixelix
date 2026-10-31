import React, { useState, useEffect } from 'react';
import PixelixLogo from './PixelixLogo';
import { useThemeMode } from '../../context/ThemeContext';
import {
  Menu,
  X,
  Sun,
  Moon,
  PhoneCall,
  ArrowUpRight,
  MessageCircle,
  ChevronRight
} from 'lucide-react';
import { CONTACT_INFO } from '../../config/contact';

export default function Navbar({ onOpenInquiry, activePage = 'home', setActivePage }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useThemeMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'deliverables', label: 'Deliverables' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'estimator', label: 'Estimator' },
    { id: 'about', label: 'Why Pixelix' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    if (setActivePage) {
      setActivePage(id);
      window.location.hash = id;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'glass-nav py-3 shadow-soft' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center focus:outline-none cursor-pointer"
            >
              <PixelixLogo size="md" variant={isDark ? 'white' : 'full'} />
            </button>

            {/* Desktop Nav Items (visible on lg: >=1024px) */}
            <nav className="hidden lg:flex items-center gap-1 glass-card px-4 py-1.5 rounded-full shadow-sm">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                    activePage === link.id
                      ? 'bg-terracotta-500 text-white shadow-sm'
                      : 'text-espresso-800 dark:text-cream-200 hover:text-terracotta-600 dark:hover:text-terracotta-400 hover:bg-cream-200/60 dark:hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right Action Controls (Adaptive across mobile, tablet, and desktop) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Mode Switch (Icon Only) */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all border cursor-pointer shadow-sm bg-cream-200/80 hover:bg-cream-300 text-espresso-800 border-terracotta-200/60 dark:bg-espresso-800 dark:hover:bg-espresso-700 dark:text-cream-100 dark:border-white/15"
                title={isDark ? "Switch to Normal (Warm Cream) Mode" : "Switch to Dark Mode"}
                aria-label="Toggle Theme Mode"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-terracotta-600" />
                )}
              </button>

              {/* Consultation CTA (Visible on sm and up) */}
              <button
                onClick={onOpenInquiry}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-sunset-gradient shadow-sunset hover:shadow-sunset-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile/Tablet Menu Hamburger Button (Always visible on all screens < 1024px) */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl text-espresso-800 dark:text-cream-100 hover:bg-cream-200/80 dark:hover:bg-espresso-800 border border-terracotta-200/50 dark:border-white/10 transition-colors cursor-pointer flex items-center justify-center"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile/Tablet Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-espresso-900/60 dark:bg-black/80 backdrop-blur-sm z-50 transition-opacity animate-in fade-in duration-300 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile/Tablet Fixed-Height Side Drawer (Opens Left-to-Right) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[82vw] max-w-[340px] h-full bg-cream-50 dark:bg-darkbg-surface border-r border-cream-300 dark:border-white/10 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'
        }`}
        aria-label="Mobile Navigation Drawer"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-cream-200 dark:border-white/10 flex items-center justify-between">
          <PixelixLogo size="sm" variant={isDark ? 'white' : 'full'} />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-xl text-espresso-700 dark:text-cream-300 hover:bg-cream-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Navigation Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-1.5">
          <div className="text-[10px] uppercase font-bold tracking-widest text-espresso-500 dark:text-cream-400 mb-2 px-3">
            Menu Navigation
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3.5 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-between cursor-pointer ${
                activePage === link.id
                  ? 'bg-sunset-gradient text-white shadow-sunset'
                  : 'text-espresso-800 dark:text-cream-200 hover:bg-cream-200/70 dark:hover:bg-white/10'
              }`}
            >
              <span>{link.label}</span>
              <ChevronRight
                className={`w-4 h-4 transition-transform ${
                  activePage === link.id ? 'translate-x-1 text-white' : 'text-espresso-400 dark:text-cream-400'
                }`}
              />
            </button>
          ))}

          {/* Theme Mode Toggle inside Drawer */}
          <div className="pt-4 mt-3 border-t border-cream-200 dark:border-white/10">
            <div className="text-[10px] uppercase font-bold tracking-widest text-espresso-500 dark:text-cream-400 mb-2 px-1">
              Display Mode
            </div>
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-white/10 text-xs font-bold text-espresso-800 dark:text-cream-100 cursor-pointer shadow-sm hover:border-terracotta-400 transition-colors"
            >
              <span className="flex items-center gap-2">
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-terracotta-600" />}
                <span>{isDark ? 'Dark Theme (Active)' : 'Warm Cream (Active)'}</span>
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-cream-200 dark:bg-white/10 text-terracotta-600 dark:text-terracotta-400 font-semibold">
                Switch
              </span>
            </button>
          </div>
        </div>

        {/* Drawer Bottom Actions & Founders Contact */}
        <div className="p-5 border-t border-cream-200 dark:border-white/10 bg-cream-100/70 dark:bg-darkbg-card space-y-3">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenInquiry();
            }}
            className="w-full py-3 rounded-xl font-bold text-xs text-white bg-sunset-gradient text-center shadow-sunset hover:shadow-sunset-lg transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Direct Founders Quick Links */}
          <div className="grid grid-cols-2 gap-2 text-center">
            <a
              href={`tel:${CONTACT_INFO.founders[0].phone}`}
              className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-cream-200 dark:border-white/10 text-[11px] font-semibold text-espresso-800 dark:text-cream-200 hover:text-terracotta-600 transition-colors flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-3 h-3 text-terracotta-500" />
              <span>Call Vikas</span>
            </a>
            <a
              href={`https://wa.me/917056063863`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200/50 dark:border-green-800/40 text-[11px] font-semibold text-green-700 dark:text-green-400 transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="text-center text-[10px] text-espresso-500 dark:text-cream-400 pt-1">
            Official Agency • {CONTACT_INFO.domain}
          </div>
        </div>
      </aside>
    </>
  );
}
