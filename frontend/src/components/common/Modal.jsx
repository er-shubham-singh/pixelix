import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, subtitle, children, maxWidth = 'max-w-2xl' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-espresso-900/60 dark:bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Content (iOS Glass Sheet) */}
      <div className={`relative w-full ${maxWidth} bg-white/92 dark:bg-darkbg-card/92 backdrop-blur-2xl rounded-3xl shadow-[0_25px_60px_-15px_rgba(28,25,23,0.35)] border border-white/70 dark:border-white/15 overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col transition-colors`}>
        {/* Header */}
        <div className="p-6 border-b border-cream-200/80 dark:border-white/10 bg-cream-50/80 dark:bg-darkbg-surface/80 backdrop-blur-md flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-espresso-900 dark:text-white font-display">{title}</h3>
            {subtitle && <p className="text-xs sm:text-sm text-espresso-700/80 dark:text-cream-300 mt-1">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-cream-200/60 hover:bg-cream-300 dark:bg-white/10 dark:hover:bg-white/20 text-espresso-800 dark:text-cream-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-espresso-800 dark:text-cream-100">
          {children}
        </div>
      </div>
    </div>
  );
}
