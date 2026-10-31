import React from 'react';

export default function AttendanceBarChart({ records = [], days = 14 }) {
  const today = new Date();
  const dateList = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${day}`;
    const dayName = d.toLocaleDateString('en-US', { weekday: 'narrow' });
    const isSunday = d.getDay() === 0;

    const matchedRecord = records.find(r => r.date === dateStr);
    dateList.push({
      dateStr,
      dayNum: day,
      dayName,
      isSunday,
      record: matchedRecord || null,
      status: matchedRecord ? matchedRecord.status : (isSunday ? 'weekend' : 'absent')
    });
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-terracotta-500 hover:bg-terracotta-600';
      case 'leave':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'half_day':
        return 'bg-orange-400 hover:bg-orange-500';
      case 'holiday':
      case 'weekend':
        return 'bg-cream-300 dark:bg-darkbg-elevated/40';
      default:
        return 'bg-cream-200 dark:bg-darkbg-elevated/20';
    }
  };

  const getStatusLabel = (item) => {
    if (item.status === 'present') return 'Present';
    if (item.status === 'leave') return 'Approved Leave';
    if (item.status === 'half_day') return 'Half Day';
    if (item.isSunday) return 'Sunday Off';
    return 'Not Logged';
  };

  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-1.5 sm:gap-2 h-36 pt-6 pb-2 px-1">
        {dateList.map((item, idx) => {
          const heightPercent = item.status === 'present' ? '85%' : item.status === 'leave' ? '60%' : item.status === 'half_day' ? '45%' : '15%';
          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
            >
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 bg-espresso-900 text-cream-100 dark:bg-cream-100 dark:text-espresso-900 text-[10px] rounded px-2 py-1 shadow-lg whitespace-nowrap">
                <span className="font-bold">{item.dateStr}</span>: {getStatusLabel(item)}
                {item.record?.workSummary && (
                  <p className="max-w-[140px] truncate text-[9px] opacity-80">{item.record.workSummary}</p>
                )}
              </div>

              <div
                style={{ height: heightPercent }}
                className={`w-full max-w-[28px] rounded-t-md transition-all duration-300 ${getStatusColor(item.status)}`}
              />

              <div className="mt-2 text-center">
                <span className="text-[10px] block font-mono text-espresso-600 dark:text-cream-300">
                  {item.dayNum}
                </span>
                <span className="text-[9px] block text-espresso-400 dark:text-cream-300/50 -mt-0.5">
                  {item.dayName}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-espresso-600 dark:text-cream-300 pt-3 border-t border-cream-200 dark:border-darkbg-elevated/40 mt-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-terracotta-500" />
          <span>Present</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span>Approved Leave</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cream-300 dark:bg-darkbg-elevated" />
          <span>Weekend / Off</span>
        </div>
      </div>
    </div>
  );
}

