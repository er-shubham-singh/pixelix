import React from 'react';

/**
 * PixelixLoader
 * A high-end, responsive loader component with branded Ivory, Champagne Pearl,
 * and Charcoal-Taupe aesthetic rings, glowing pulse aura, and subtle indeterminate progress track.
 *
 * @param {'fullscreen' | 'page' | 'card' | 'inline'} variant - Layout mode
 * @param {'sm' | 'md' | 'lg' | 'xl'} size - Spinner size
 * @param {string} text - Primary loading label
 * @param {string} subtext - Optional secondary explanatory text
 * @param {string} className - Optional container styling
 */
export default function PixelixLoader({
  variant = 'page',
  size = 'md',
  text,
  subtext,
  className = ''
}) {
  // Inline Spinner for buttons, badges, or compact rows
  if (variant === 'inline') {
    const inlineSizes = {
      xs: 'w-3.5 h-3.5',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };
    const s = inlineSizes[size] || inlineSizes.sm;
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        <span className="relative flex items-center justify-center">
          <span className={`${s} border-2 border-current/20 rounded-full`} />
          <span className={`absolute ${s} border-2 border-transparent border-t-current rounded-full animate-spin`} />
        </span>
        {text && <span className="text-xs font-semibold">{text}</span>}
      </span>
    );
  }

  // Size configurations for section/card/page/fullscreen
  const dimensions = {
    sm: {
      outer: 'w-10 h-10',
      middle: 'w-7 h-7',
      center: 'w-3.5 h-3.5',
      text: 'text-xs',
      sub: 'text-[10px]'
    },
    md: {
      outer: 'w-16 h-16',
      middle: 'w-11 h-11',
      center: 'w-6 h-6',
      text: 'text-sm font-bold',
      sub: 'text-xs'
    },
    lg: {
      outer: 'w-24 h-24',
      middle: 'w-16 h-16',
      center: 'w-8 h-8',
      text: 'text-base font-bold',
      sub: 'text-xs'
    },
    xl: {
      outer: 'w-32 h-32',
      middle: 'w-22 h-22',
      center: 'w-11 h-11',
      text: 'text-lg font-bold',
      sub: 'text-sm'
    }
  };

  const dim = dimensions[size] || (variant === 'card' ? dimensions.md : dimensions.lg);

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center gap-4 text-center select-none">
      {/* Dynamic Animated Spinner Core */}
      <div className="relative flex items-center justify-center">
        {/* Glow backdrop pulse */}
        <div
          className={`absolute ${dim.outer} rounded-full bg-gradient-to-tr from-[#D8C8B4]/30 via-[#B29F8D]/25 to-[#827060]/20 blur-md animate-pulse`}
        />

        {/* Outer Ring: Conic gradient spin */}
        <div
          className={`${dim.outer} rounded-full border-2 border-transparent border-t-[#B29F8D] border-r-[#D8C8B4] border-b-[#827060]/40 animate-spin`}
          style={{ animationDuration: '1.2s' }}
        />

        {/* Middle Ring: Reverse dash spin */}
        <div
          className={`absolute ${dim.middle} rounded-full border-2 border-dashed border-[#827060]/25 dark:border-white/20 border-t-[#D8C8B4] border-l-[#B29F8D] animate-spin`}
          style={{ animationDirection: 'reverse', animationDuration: '2s' }}
        />

        {/* Center glowing diamond */}
        <div
          className={`absolute ${dim.center} rounded-lg bg-gradient-to-br from-[#26211E] to-[#827060] text-white shadow-md shadow-black/20 flex items-center justify-center transform rotate-45 animate-pulse`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#FAF7F2] -rotate-45" />
        </div>
      </div>

      {/* Typography & Indeterminate Progress */}
      {(text || subtext) && (
        <div className="space-y-1.5 max-w-xs px-2">
          {text && (
            <div className={`${dim.text} text-espresso-900 dark:text-cream-100 tracking-tight font-serif`}>
              {text}
            </div>
          )}
          {subtext && (
            <p className={`${dim.sub} text-espresso-600 dark:text-cream-300/70 leading-relaxed font-sans`}>
              {subtext}
            </p>
          )}

          {/* Sleek indeterminate animated gradient bar */}
          <div className="pt-1.5 flex justify-center">
            <div className="h-1 w-28 bg-[#EDE7DD] dark:bg-darkbg-border rounded-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#B29F8D] via-[#D8C8B4] to-[#827060] rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (variant === 'fullscreen') {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-[#FAF7F2]/90 dark:bg-darkbg-base/90 backdrop-blur-md transition-all duration-300 ${className}`}
      >
        <div className="p-8 rounded-3xl bg-white/90 dark:bg-darkbg-card/90 border border-[#D6CCC2]/60 dark:border-darkbg-border/60 shadow-2xl backdrop-blur-sm">
          {spinnerContent}
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div
        className={`min-h-[180px] p-6 flex items-center justify-center rounded-2xl bg-white/50 dark:bg-darkbg-card/30 border border-dashed border-[#D6CCC2] dark:border-darkbg-border ${className}`}
      >
        {spinnerContent}
      </div>
    );
  }

  // Default: page layout
  return (
    <div className={`min-h-[50vh] flex items-center justify-center p-6 ${className}`}>
      {spinnerContent}
    </div>
  );
}
