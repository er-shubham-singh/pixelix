import React from 'react';

export default function PixelixLogo({ size = 'md', variant = 'full' }) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const isWhite = variant === 'white';

  return (
    <div className="flex items-center gap-2 select-none group">
      <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-terracotta-700 via-terracotta-500 to-amber-500 p-0.5 shadow-md shadow-terracotta-500/20 group-hover:scale-105 transition-transform duration-300">
        <div className="w-full h-full bg-cream-100 dark:bg-darkbg-surface rounded-[10px] flex items-center justify-center">
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-terracotta-600 to-amber-500 text-base font-serif">
            P
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <span className={`font-extrabold tracking-tight font-serif ${sizeClasses[size]} ${isWhite ? 'text-white' : 'text-espresso-900 dark:text-cream-100'}`}>
          PIXELIX
        </span>
        <span className="text-[9px] font-bold tracking-widest uppercase text-amber-500 -mt-1">
          Executive
        </span>
      </div>
    </div>
  );
}

