import React from 'react';

export default function CircularGauge({
  percentage = 0,
  size = 180,
  strokeWidth = 14,
  label = 'Attendance Rate',
  sublabel = '',
  gradientId = 'employeeTerracottaGauge',
  startColor = '#C84523',
  endColor = '#E9C46A'
}) {
  const safePercent = Math.min(100, Math.max(0, Math.round(percentage)));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (safePercent / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90 origin-center drop-shadow-md"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={startColor} />
              <stop offset="100%" stopColor={endColor} />
            </linearGradient>
          </defs>

          {/* Background Track Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-cream-300 dark:text-darkbg-elevated/70"
          />

          {/* Foreground Animated Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
          <span className="text-3xl font-extrabold text-espresso-900 dark:text-cream-100 tracking-tight font-mono">
            {safePercent}%
          </span>
          <span className="text-xs uppercase tracking-wider font-semibold text-terracotta-600 dark:text-terracotta-400 mt-0.5">
            {safePercent >= 85 ? 'Excellent' : safePercent >= 70 ? 'On Track' : 'Needs Focus'}
          </span>
        </div>
      </div>

      {label && (
        <div className="mt-3 text-center">
          <p className="text-sm font-bold text-espresso-800 dark:text-cream-100">{label}</p>
          {sublabel && (
            <p className="text-xs text-espresso-500 dark:text-cream-300/70 mt-0.5">{sublabel}</p>
          )}
        </div>
      )}
    </div>
  );
}

