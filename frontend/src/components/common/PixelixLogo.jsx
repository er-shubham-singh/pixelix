import React from 'react';

export default function PixelixLogo({
  variant = 'full', // 'full' | 'mark' | 'white'
  size = 'md',     // 'sm' | 'md' | 'lg'
  className = ''
}) {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-2xl', sub: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-3xl', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Sunset Pixel 3D Mark (Logo 01 from theme.pdf) */}
      <div className={`relative ${currentSize.icon} rounded-xl bg-gradient-to-br from-[#F4A261] via-[#E07A5F] to-[#C84523] p-[2px] shadow-sunset flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
        {/* Soft dimensional inner bevel */}
        <div className="w-full h-full rounded-[10px] bg-gradient-to-tr from-[#C84523] to-[#FCE7DF] flex items-center justify-center relative">
          <span className="font-display font-extrabold text-white text-[13px] tracking-tighter drop-shadow-sm">
            PX
          </span>
          {/* Subtle light refraction corner */}
          <div className="absolute top-0 right-0 w-3 h-3 bg-white/40 rounded-bl-full pointer-events-none" />
        </div>
      </div>

      {variant !== 'mark' && (
        <div className="flex flex-col">
          <span className={`font-display font-bold tracking-tight leading-none ${
            variant === 'white' ? 'text-white' : 'text-espresso-900'
          } ${currentSize.text}`}>
            Pixelix
          </span>
          <span className={`font-sans tracking-widest uppercase font-semibold text-terracotta-600 ${currentSize.sub}`}>
            Creative Partner
          </span>
        </div>
      )}
    </div>
  );
}
