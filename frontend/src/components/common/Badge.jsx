import React from 'react';

export default function Badge({
  children,
  variant = 'emerald', // 'emerald' | 'terracotta' | 'sage' | 'gold' | 'glass' | 'dark'
  className = ''
}) {
  const styles = {
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
    terracotta: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
    sage: 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/20',
    gold: 'bg-gold-light/40 text-gold-dark border border-gold/40',
    glass: 'bg-white/60 dark:bg-emerald-950/40 text-espresso-800 dark:text-cream-100 border border-white/80 dark:border-emerald-500/30 backdrop-blur-md shadow-sm',
    dark: 'bg-darkbg-card text-cream-100 border border-emerald-500/20'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${styles[variant] || styles.terracotta} ${className}`}>
      {children}
    </span>
  );
}
