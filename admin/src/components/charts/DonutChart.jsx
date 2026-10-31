import React, { useState } from 'react';

const DEFAULT_COLORS = [
  '#C84523', // Terracotta Primary
  '#D4A373', // Warm Sand / Gold
  '#E9C46A', // Golden Horizon
  '#2A9D8F', // Teal / Success
  '#E76F51', // Burnt Orange
  '#457B9D', // Steel Blue
  '#9B5DE5', // Purple
  '#F15BB5', // Rose Pink
  '#00BBF9', // Cyan
  '#8E7A70'  // Neutral Charcoal
];

export default function DonutChart({
  data = [],
  title = '',
  size = 200,
  strokeWidth = 24,
  centerLabel = 'Total'
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const total = data.reduce((acc, curr) => acc + (curr.count || 0), 0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;
  const segments = data.map((item, idx) => {
    const value = item.count || 0;
    const fraction = total > 0 ? value / total : 0;
    const strokeDash = fraction * circumference;
    const offset = cumulativeOffset;
    cumulativeOffset += strokeDash;
    const color = item.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
    const percentage = total > 0 ? Math.round(fraction * 100) : 0;

    return {
      ...item,
      strokeDash,
      offset,
      color,
      percentage
    };
  });

  const activeItem = hoveredIdx !== null ? segments[hoveredIdx] : null;

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
      {/* SVG Ring */}
      <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90 origin-center"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-cream-200 dark:text-darkbg-elevated/40"
          />

          {total > 0 &&
            segments.map((seg, idx) => {
              if (seg.strokeDash <= 0) return null;
              const isHovered = hoveredIdx === idx;
              return (
                <circle
                  key={idx}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={seg.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={`${seg.strokeDash} ${circumference}`}
                  strokeDashoffset={-seg.offset}
                  className="transition-all duration-200 cursor-pointer"
                  style={{
                    opacity: hoveredIdx !== null && !isHovered ? 0.45 : 1
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              );
            })}
        </svg>

        {/* Center Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          {activeItem ? (
            <>
              <span className="text-2xl font-bold font-mono text-espresso-900 dark:text-cream-100">
                {activeItem.count}
              </span>
              <span className="text-xs font-semibold text-terracotta-600 dark:text-terracotta-400 max-w-[90px] truncate">
                {activeItem.percentage}%
              </span>
            </>
          ) : (
            <>
              <span className="text-2xl font-bold font-mono text-espresso-900 dark:text-cream-100">
                {total}
              </span>
              <span className="text-xs uppercase tracking-wider text-espresso-500 dark:text-cream-300/70">
                {centerLabel}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2 min-w-[180px] max-h-56 overflow-y-auto pr-2 custom-scrollbar">
        {data.length === 0 ? (
          <p className="text-xs text-espresso-400 italic">No records to display</p>
        ) : (
          segments.map((seg, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${
                hoveredIdx === idx
                  ? 'bg-cream-200 dark:bg-darkbg-elevated font-semibold'
                  : 'hover:bg-cream-100 dark:hover:bg-darkbg-card'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="text-espresso-800 dark:text-cream-200 truncate max-w-[130px]">
                  {seg.label || seg.domain}
                </span>
              </div>
              <span className="font-mono text-espresso-600 dark:text-cream-300 ml-2">
                {seg.count} <span className="text-[10px] opacity-70">({seg.percentage}%)</span>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

