import React from 'react';

export default function Badge({
  children,
  variant = 'terracotta', // 'terracotta' | 'sage' | 'gold' | 'glass' | 'dark'
  className = ''
}) {
  const styles = {
    terracotta: 'bg-terracotta-50 text-terracotta-700 border border-terracotta-200/80',
    sage: 'bg-sage-light/40 text-sage-dark border border-sage/40',
    gold: 'bg-gold-light/40 text-gold-dark border border-gold/40',
    glass: 'bg-white/60 text-espresso-800 border border-white/80 backdrop-blur-md shadow-sm',
    dark: 'bg-espresso-900 text-cream-100 border border-espresso-700'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${styles[variant] || styles.terracotta} ${className}`}>
      {children}
    </span>
  );
}
