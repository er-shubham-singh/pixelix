import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function PixelixLogo({ size = 'md', variant = 'full', className = '' }) {
  let isDarkMode = false;
  try {
    const theme = useTheme();
    isDarkMode = theme?.isDark ?? false;
  } catch (e) {
    isDarkMode = false;
  }

  if (variant === 'white' || variant === 'dark') {
    isDarkMode = true;
  } else if (variant === 'light') {
    isDarkMode = false;
  }

  const sizeClasses = {
    sm: 'h-7 sm:h-8',
    md: 'h-8 sm:h-9',
    lg: 'h-10 sm:h-12',
    xl: 'h-12 sm:h-14'
  };

  const chosenHeight = sizeClasses[size] || sizeClasses.md;
  const logoSrc = isDarkMode ? '/dark-mode-logo.png' : '/light-mode-logo.png';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="Pixelix"
        className={`${chosenHeight} w-auto object-contain transition-opacity duration-200 hover:opacity-90`}
        draggable={false}
      />
    </div>
  );
}
