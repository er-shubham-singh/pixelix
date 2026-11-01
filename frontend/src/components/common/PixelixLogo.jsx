import React from 'react';
import { useThemeMode } from '../../context/ThemeContext';

export default function PixelixLogo({
  variant = 'full', // 'full' | 'mark' | 'white' | 'dark' | 'light'
  size = 'md',     // 'sm' | 'md' | 'lg' | 'xl'
  className = '',
  isDark: propIsDark
}) {
  let isDarkMode = false;
  try {
    const theme = useThemeMode();
    isDarkMode = theme?.isDark ?? false;
  } catch (e) {
    isDarkMode = false;
  }

  if (propIsDark !== undefined) {
    isDarkMode = propIsDark;
  } else if (variant === 'white' || variant === 'dark') {
    isDarkMode = true;
  } else if (variant === 'light') {
    isDarkMode = false;
  }

  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-9 sm:h-11',
    lg: 'h-12 sm:h-14',
    xl: 'h-14 sm:h-18'
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
        onError={(e) => {
          if (isDarkMode && !e.target.dataset.tried) {
            e.target.dataset.tried = 'true';
            e.target.src = '/dark mode logo.png';
          } else if (!isDarkMode && !e.target.dataset.tried) {
            e.target.dataset.tried = 'true';
            e.target.src = '/light mode logo.png';
          }
        }}
      />
    </div>
  );
}
