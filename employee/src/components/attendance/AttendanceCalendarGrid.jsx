import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Clock,
  CalendarCheck2,
  Briefcase,
  FileText,
  ShieldCheck,
  Coffee,
  Sparkles
} from 'lucide-react';

export default function AttendanceCalendarGrid({
  selectedMonth,
  onMonthChange,
  records = [],
  leavesList = [],
  shiftType = 'full_time',
  targetHours = 8
}) {
  // Format helpers
  const getTodayStr = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const todayStr = getTodayStr();

  // Currently inspected date in the calendar (defaults to today if current month, or 1st day of month)
  const [inspectedDateStr, setInspectedDateStr] = useState(() => {
    const [y, m] = (selectedMonth || todayStr.slice(0, 7)).split('-');
    const currentYm = todayStr.slice(0, 7);
    if (`${y}-${m}` === currentYm) {
      return todayStr;
    }
    return `${y}-${m}-01`;
  });

  // Keep inspected date in sync if month changes and inspected date is outside the month
  React.useEffect(() => {
    if (selectedMonth && !inspectedDateStr.startsWith(selectedMonth)) {
      const currentYm = todayStr.slice(0, 7);
      if (selectedMonth === currentYm) {
        setInspectedDateStr(todayStr);
      } else {
        setInspectedDateStr(`${selectedMonth}-01`);
      }
    }
  }, [selectedMonth, inspectedDateStr, todayStr]);

  // Month navigation handlers
  const handlePrevMonth = () => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const prevDate = new Date(year, month - 2, 1);
    const prevMonthStr = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;
    onMonthChange(prevMonthStr);
  };

  const handleNextMonth = () => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const nextDate = new Date(year, month, 1);
    const nextMonthStr = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}`;
    onMonthChange(nextMonthStr);
  };

  const handleCurrentMonth = () => {
    const d = new Date();
    const curMonthStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    onMonthChange(curMonthStr);
  };

  // Human-readable month title (e.g., "October 2026")
  const monthDisplayTitle = useMemo(() => {
    if (!selectedMonth) return '';
    const [y, m] = selectedMonth.split('-').map(Number);
    const dateObj = new Date(yearOrZero(y), m - 1, 1);
    return dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, [selectedMonth]);

  function yearOrZero(y) {
    return isNaN(y) ? 2026 : y;
  }

  // Parse calendar days
  const calendarCells = useMemo(() => {
    if (!selectedMonth) return [];
    const [year, month] = selectedMonth.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();

    // Day of week for the 1st of this month
    // 0 = Sun, 1 = Mon, ..., 6 = Sat
    // We want Monday = 0, Tuesday = 1, ..., Sunday = 6
    const firstDay = new Date(year, month - 1, 1).getDay();
    const startPadding = (firstDay + 6) % 7; // Number of days from previous month

    const prevMonthDays = new Date(year, month - 1, 0).getDate();

    const cells = [];

    // 1. Previous Month Padding Cells
    for (let i = startPadding - 1; i >= 0; i--) {
      const dayNum = prevMonthDays - i;
      const prevM = month - 1 === 0 ? 12 : month - 1;
      const prevY = month - 1 === 0 ? year - 1 : year;
      const dateStr = `${prevY}-${String(prevM).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      cells.push({
        dateStr,
        dayNum,
        isCurrentMonth: false,
        isPrevMonth: true
      });
    }

    // 2. Current Month Days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({
        dateStr,
        dayNum: d,
        isCurrentMonth: true
      });
    }

    // 3. Next Month Padding Cells to fill 35 or 42 grid
    const totalCells = cells.length > 35 ? 42 : 35;
    const remaining = totalCells - cells.length;
    for (let d = 1; d <= remaining; d++) {
      const nextM = month + 1 === 13 ? 1 : month + 1;
      const nextY = month + 1 === 13 ? year + 1 : year;
      const dateStr = `${nextY}-${String(nextM).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({
        dateStr,
        dayNum: d,
        isCurrentMonth: false,
        isNextMonth: true
      });
    }

    // Annotate each cell with attendance, leave, and status info
    return cells.map((cell) => {
      const dateObj = new Date(cell.dateStr + 'T00:00:00');
      const dayOfWeek = dateObj.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
      const isSunday = dayOfWeek === 0;
      const isWeekend = isSunday; // Only Sunday is weekly off (Saturdays are active working days)
      const isToday = cell.dateStr === todayStr;
      const isPast = cell.dateStr < todayStr;
      const isFuture = cell.dateStr > todayStr;

      // Find attendance record
      const record = records.find((r) => r.date === cell.dateStr);

      // Find approved leave
      const approvedLeave = leavesList.find((l) => {
        if (l.status !== 'approved') return false;
        return cell.dateStr >= l.startDate && cell.dateStr <= l.endDate;
      });

      // Find pending leave
      const pendingLeave = !approvedLeave && leavesList.find((l) => {
        if (l.status !== 'pending') return false;
        return cell.dateStr >= l.startDate && cell.dateStr <= l.endDate;
      });

      // Determine state
      let state = 'future';
      let stateLabel = 'Upcoming';
      let hoursWorked = 0;

      if (approvedLeave) {
        state = 'approved_leave';
        stateLabel = `Approved Leave (${approvedLeave.type || 'Casual'})`;
      } else if (record) {
        hoursWorked = record.totalHours || 0;
        const hasClockOut = Boolean(record.clockOutTime && (record.attendanceStage === 'clocked_out' || record.clockOutTime));
        const hasClockInOnly = Boolean(record.clockInTime && !hasClockOut);

        if (hasClockOut) {
          if (record.status === 'half_day') {
            state = 'half_day';
            stateLabel = 'Half Day';
          } else {
            state = 'present';
            stateLabel = 'Present (Full Day)';
          }
        } else if (hasClockInOnly) {
          state = 'on_duty';
          stateLabel = 'Active On-Duty';
        } else if (record.status === 'leave') {
          state = 'approved_leave';
          stateLabel = 'Leave';
        } else {
          state = record.status || 'present';
          stateLabel = record.status === 'half_day' ? 'Half Day' : 'Present';
        }
      } else if (pendingLeave) {
        state = 'pending_leave';
        stateLabel = 'Pending Leave';
      } else if (isSunday) {
        state = 'weekend';
        stateLabel = 'Sunday Off';
      } else if (isPast) {
        state = 'absent';
        stateLabel = 'Not Logged';
      } else {
        state = 'future';
        stateLabel = 'Upcoming';
      }

      return {
        ...cell,
        isWeekend,
        isToday,
        isPast,
        isFuture,
        record,
        approvedLeave,
        pendingLeave,
        state,
        stateLabel,
        hoursWorked
      };
    });
  }, [selectedMonth, records, leavesList, todayStr]);

  // Aggregate monthly counts
  const monthStats = useMemo(() => {
    let presentCount = 0;
    let halfDayCount = 0;
    let approvedLeaveCount = 0;
    let weekendCount = 0;
    let totalWorkingDaysElapsed = 0;

    calendarCells.forEach((c) => {
      if (!c.isCurrentMonth) return;
      if (c.state === 'present') presentCount++;
      if (c.state === 'half_day') halfDayCount++;
      if (c.state === 'approved_leave') approvedLeaveCount++;
      if (c.isWeekend) weekendCount++;
      if (c.isPast && !c.isWeekend) totalWorkingDaysElapsed++;
    });

    const effectivePresent = presentCount + (halfDayCount * 0.5);
    const turnoutRate = totalWorkingDaysElapsed > 0
      ? Math.min(100, Math.round((effectivePresent / totalWorkingDaysElapsed) * 100))
      : 100;

    return {
      presentCount,
      halfDayCount,
      approvedLeaveCount,
      weekendCount,
      turnoutRate
    };
  }, [calendarCells]);

  // Inspected Cell Data
  const inspectedCell = useMemo(() => {
    return calendarCells.find((c) => c.dateStr === inspectedDateStr) || null;
  }, [calendarCells, inspectedDateStr]);

  // Styling helper for square box based on state
  const getSquareStyles = (cell) => {
    const isSelected = cell.dateStr === inspectedDateStr;
    const baseSelectedRing = isSelected
      ? 'ring-2 ring-terracotta-500 shadow-md scale-[1.02] z-10'
      : 'hover:shadow-sm hover:scale-[1.01]';

    if (!cell.isCurrentMonth) {
      return `bg-cream-100/30 dark:bg-darkbg-base/20 border-cream-200/60 dark:border-darkbg-border/40 opacity-40 ${baseSelectedRing}`;
    }

    switch (cell.state) {
      case 'present':
        return `bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500 text-emerald-950 dark:text-emerald-100 shadow-2xs ${baseSelectedRing}`;
      case 'half_day':
        return `bg-orange-50 dark:bg-orange-950/60 border-2 border-orange-500 text-orange-950 dark:text-orange-100 shadow-2xs ${baseSelectedRing}`;
      case 'on_duty':
        return `bg-sky-50 dark:bg-sky-950/60 border-2 border-sky-400 text-sky-950 dark:text-sky-100 shadow-2xs ${baseSelectedRing}`;
      case 'approved_leave':
        return `bg-amber-100/90 dark:bg-amber-950/70 border-2 border-amber-500 text-amber-950 dark:text-amber-100 shadow-2xs ${baseSelectedRing}`;
      case 'pending_leave':
        return `bg-amber-500/5 dark:bg-amber-950/20 border-dashed border-amber-300 text-amber-800 dark:text-amber-300 ${baseSelectedRing}`;
      case 'weekend':
        return `bg-cream-100/60 dark:bg-darkbg-base/50 border-cream-200 dark:border-darkbg-border text-espresso-400 dark:text-cream-400 ${baseSelectedRing}`;
      case 'absent':
        return `bg-rose-50/25 dark:bg-rose-950/20 border-dashed border-rose-200 dark:border-rose-900/50 text-rose-500 dark:text-rose-400 ${baseSelectedRing}`;
      default:
        return `bg-white dark:bg-darkbg-card border-dashed border-cream-200 dark:border-darkbg-border text-espresso-400 dark:text-cream-500/60 ${baseSelectedRing}`;
    }
  };

  const getPillBadge = (cell) => {
    switch (cell.state) {
      case 'present':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-black bg-emerald-600 text-white shadow-2xs">
            <CheckCircle2 className="w-2.5 h-2.5 flex-shrink-0" />
            <span className="truncate">{cell.hoursWorked ? `${cell.hoursWorked}h` : 'Present'}</span>
          </span>
        );
      case 'half_day':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-200">
            <AlertCircle className="w-2.5 h-2.5 flex-shrink-0 text-orange-600 dark:text-orange-400" />
            <span className="truncate">{cell.hoursWorked ? `${cell.hoursWorked}h` : 'Half'}</span>
          </span>
        );
      case 'on_duty':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            <span className="truncate">On Duty</span>
          </span>
        );
      case 'approved_leave':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-black bg-amber-500 text-white shadow-2xs">
            <CalendarCheck2 className="w-2.5 h-2.5 flex-shrink-0" />
            <span className="truncate capitalize">{cell.approvedLeave?.type || 'Leave'}</span>
          </span>
        );
      case 'pending_leave':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-semibold bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
            <Clock className="w-2.5 h-2.5 flex-shrink-0" />
            <span className="truncate">Pending</span>
          </span>
        );
      case 'weekend':
        return (
          <span className="text-[10px] font-medium text-espresso-400 dark:text-cream-400/70">
            Sunday Off
          </span>
        );
      case 'absent':
        return (
          <span className="text-[9px] font-semibold text-rose-500/80 dark:text-rose-400/80">
            Missed
          </span>
        );
      default:
        return null;
    }
  };

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
      {/* 1. Header with Month Title, Quick Past-Month Navigation & Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-cream-200 dark:border-darkbg-border">
        {/* Title and Navigation Arrows */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-terracotta-500/10 dark:bg-terracotta-500/20 text-terracotta-600 dark:text-terracotta-400 flex items-center justify-center flex-shrink-0">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-espresso-900 dark:text-cream-100 tracking-tight">
                {monthDisplayTitle}
              </h3>
              {selectedMonth === todayStr.slice(0, 7) && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-terracotta-100 text-terracotta-700 dark:bg-terracotta-950/70 dark:text-terracotta-300 border border-terracotta-200 dark:border-terracotta-800">
                  Current
                </span>
              )}
            </div>
            <p className="text-xs text-espresso-500 dark:text-cream-400">
              Interactive Square Grid • Click any square to view punch-in/out timestamps
            </p>
          </div>
        </div>

        {/* Navigation Controls: Prev Month, Next Month, Picker, Current */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Prev Month Button */}
          <button
            onClick={handlePrevMonth}
            title="Go to previous month"
            className="p-2 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base hover:bg-cream-100 dark:hover:bg-darkbg-elevated text-espresso-800 dark:text-cream-200 transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Month input selector */}
          <div className="relative">
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => onMonthChange(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-espresso-900 dark:text-cream-100 focus:outline-none cursor-pointer"
            />
          </div>

          {/* Quick Next Month Button */}
          <button
            onClick={handleNextMonth}
            title="Go to next month"
            className="p-2 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base hover:bg-cream-100 dark:hover:bg-darkbg-elevated text-espresso-800 dark:text-cream-200 transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Reset to Today/Current Month */}
          {selectedMonth !== todayStr.slice(0, 7) && (
            <button
              onClick={handleCurrentMonth}
              className="px-3 py-1.5 rounded-xl border border-terracotta-300 dark:border-terracotta-800 bg-terracotta-50 dark:bg-terracotta-950/40 text-terracotta-700 dark:text-terracotta-300 text-xs font-bold hover:bg-terracotta-100 dark:hover:bg-terracotta-900/50 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>This Month</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Monthly Summary Metrics Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Present Days */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
              Present Days
            </div>
            <div className="text-base font-black text-emerald-950 dark:text-emerald-100">
              {monthStats.presentCount} <span className="text-[10px] font-normal text-emerald-700 dark:text-emerald-400">days</span>
            </div>
          </div>
        </div>

        {/* Half Days */}
        <div className="p-3.5 rounded-2xl bg-orange-50/70 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-orange-800 dark:text-orange-300">
              Half Days
            </div>
            <div className="text-base font-black text-orange-950 dark:text-orange-100">
              {monthStats.halfDayCount} <span className="text-[10px] font-normal text-orange-700 dark:text-orange-400">days</span>
            </div>
          </div>
        </div>

        {/* Approved Leaves */}
        <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
            <CalendarCheck2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-amber-800 dark:text-amber-300">
              Approved Leaves
            </div>
            <div className="text-base font-black text-amber-950 dark:text-amber-100">
              {monthStats.approvedLeaveCount} <span className="text-[10px] font-normal text-amber-700 dark:text-amber-400">days</span>
            </div>
          </div>
        </div>

        {/* Turnout Percentage */}
        <div className="p-3.5 rounded-2xl bg-cream-100/70 dark:bg-darkbg-elevated border border-cream-300 dark:border-darkbg-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-terracotta-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-espresso-700 dark:text-cream-300">
              Turnout Score
            </div>
            <div className="text-base font-black text-espresso-950 dark:text-cream-100">
              {monthStats.turnoutRate}%
            </div>
          </div>
        </div>
      </div>

      {/* 3. 7-Day Calendar Grid of Rounded Squares */}
      <div className="space-y-2">
        {/* Weekday Column Headers */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5 text-center">
          {weekdays.map((day, idx) => (
            <div
              key={day}
              className={`py-2 text-[11px] sm:text-xs font-black uppercase tracking-wider rounded-xl ${
                idx === 6
                  ? 'text-espresso-400 dark:text-cream-400 bg-cream-100/50 dark:bg-darkbg-base/30'
                  : 'text-espresso-700 dark:text-cream-200 bg-cream-100 dark:bg-darkbg-elevated'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days Square Grid */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5">
          {calendarCells.map((cell) => {
            const isSelected = cell.dateStr === inspectedDateStr;
            return (
              <button
                key={cell.dateStr}
                type="button"
                onClick={() => setInspectedDateStr(cell.dateStr)}
                className={`w-full aspect-square min-h-[72px] sm:min-h-[92px] p-1.5 sm:p-2.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${getSquareStyles(
                  cell
                )}`}
              >
                {/* Top: Day Number + Today/Shift Badge */}
                <div className="flex items-start justify-between w-full">
                  <span
                    className={`font-mono text-xs sm:text-sm font-black ${
                      cell.isToday
                        ? 'w-6 h-6 rounded-lg bg-terracotta-500 text-white flex items-center justify-center'
                        : cell.isCurrentMonth
                        ? 'text-espresso-900 dark:text-cream-100'
                        : 'text-espresso-400/60 dark:text-cream-400/40'
                    }`}
                  >
                    {cell.dayNum}
                  </span>

                  {cell.isToday && (
                    <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[8px] font-black uppercase bg-terracotta-100 text-terracotta-700 dark:bg-terracotta-900/60 dark:text-terracotta-300">
                      Today
                    </span>
                  )}
                </div>

                {/* Middle: Status Pill Badge */}
                <div className="my-auto w-full flex items-center justify-start overflow-hidden">
                  {cell.isCurrentMonth && getPillBadge(cell)}
                </div>

                {/* Bottom: Timestamps if logged */}
                <div className="w-full text-[9px] font-mono leading-tight truncate">
                  {cell.record?.clockInTime && cell.record?.clockOutTime ? (
                    <span className="text-espresso-600 dark:text-cream-300 font-medium hidden sm:inline">
                      {cell.record.clockInTime.split(' ')[0]} - {cell.record.clockOutTime.split(' ')[0]}
                    </span>
                  ) : cell.record?.clockInTime ? (
                    <span className="text-sky-600 dark:text-sky-400 font-semibold hidden sm:inline">
                      In {cell.record.clockInTime.split(' ')[0]}
                    </span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Inspected Date Breakdown Card */}
      {inspectedCell && (
        <div className="mt-4 p-5 rounded-2xl bg-cream-50 dark:bg-darkbg-elevated border border-cream-300 dark:border-darkbg-border animate-fade-in space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cream-200 dark:border-darkbg-border">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600 dark:text-terracotta-400">
                  Inspected Date
                </span>
                <span className="text-xs font-mono font-black text-espresso-900 dark:text-cream-100">
                  {inspectedCell.dateStr}
                </span>
              </div>
              <h4 className="text-base font-bold text-espresso-950 dark:text-cream-100">
                {new Date(inspectedCell.dateStr + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </h4>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-xl text-xs font-bold border ${
                  inspectedCell.state === 'present'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : inspectedCell.state === 'half_day'
                    ? 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300'
                    : inspectedCell.state === 'on_duty'
                    ? 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300'
                    : inspectedCell.state === 'approved_leave'
                    ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
                    : inspectedCell.state === 'weekend'
                    ? 'bg-cream-200 text-espresso-700 border-cream-300 dark:bg-darkbg-base dark:text-cream-300'
                    : 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
                }`}
              >
                {inspectedCell.stateLabel}
              </span>
            </div>
          </div>

          {/* Time & Shift Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Morning In */}
            <div className="p-3 rounded-xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border">
              <span className="text-[10px] font-bold uppercase text-espresso-400 block mb-1">
                Morning Punch-In
              </span>
              <span className="font-mono font-black text-sm text-espresso-900 dark:text-cream-100">
                {inspectedCell.record?.clockInTime || '—'}
              </span>
            </div>

            {/* Evening Out */}
            <div className="p-3 rounded-xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border">
              <span className="text-[10px] font-bold uppercase text-espresso-400 block mb-1">
                Evening Punch-Out
              </span>
              <span className="font-mono font-black text-sm text-espresso-900 dark:text-cream-100">
                {inspectedCell.record?.clockOutTime || (inspectedCell.isToday && inspectedCell.record?.clockInTime ? 'Eligible for Punch-Out' : '—')}
              </span>
            </div>

            {/* Total Worked */}
            <div className="p-3 rounded-xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border">
              <span className="text-[10px] font-bold uppercase text-espresso-400 block mb-1">
                Total Worked
              </span>
              <span className="font-mono font-black text-sm text-terracotta-600 dark:text-terracotta-400">
                {inspectedCell.hoursWorked ? `${inspectedCell.hoursWorked} hrs` : '0.0 hrs'}
              </span>
            </div>

            {/* Shift Type */}
            <div className="p-3 rounded-xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border">
              <span className="text-[10px] font-bold uppercase text-espresso-400 block mb-1">
                Shift Designation
              </span>
              <span className="font-mono font-black text-xs text-espresso-800 dark:text-cream-200">
                {inspectedCell.record?.shiftType === 'part_time' || shiftType === 'part_time'
                  ? '4h Part-Time'
                  : '8h Full-Time'}
              </span>
            </div>
          </div>

          {/* Work Summary or Approved Leave Reason */}
          {inspectedCell.approvedLeave && (
            <div className="p-4 rounded-xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200">
                <CalendarCheck2 className="w-4 h-4 text-amber-600" />
                <span>Approved Leave Record</span>
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                <strong>Reason:</strong> {inspectedCell.approvedLeave.reason || 'Personal Leave'}
              </p>
              <p className="text-[10px] text-amber-700/80 dark:text-amber-400/80">
                Period: {inspectedCell.approvedLeave.startDate} to {inspectedCell.approvedLeave.endDate}
              </p>
            </div>
          )}

          {inspectedCell.record?.workSummary && (
            <div className="p-4 rounded-xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-espresso-800 dark:text-cream-200">
                <FileText className="w-4 h-4 text-terracotta-500" />
                <span>Submitted Deliverables Summary</span>
              </div>
              <p className="text-xs text-espresso-700 dark:text-cream-300 whitespace-pre-wrap leading-relaxed">
                {inspectedCell.record.workSummary}
              </p>
            </div>
          )}

          {inspectedCell.record?.morningNotes && (
            <div className="p-4 rounded-xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-espresso-800 dark:text-cream-200">
                <Briefcase className="w-4 h-4 text-sky-500" />
                <span>Morning Plan & Objectives</span>
              </div>
              <p className="text-xs text-espresso-700 dark:text-cream-300 whitespace-pre-wrap leading-relaxed">
                {inspectedCell.record.morningNotes}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 5. Calendar Color Legend */}
      <div className="pt-4 border-t border-cream-200 dark:border-darkbg-border flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-bold text-espresso-700 dark:text-cream-300 text-[11px] uppercase tracking-wider">
          Legend:
        </span>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-emerald-500/20 border border-emerald-400 inline-block" />
            <span className="text-[11px] font-medium text-espresso-800 dark:text-cream-200">Present (Checkout Verified)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-sky-500/20 border border-sky-400 inline-block" />
            <span className="text-[11px] font-medium text-espresso-800 dark:text-cream-200">Active On-Duty</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-orange-500/20 border border-orange-400 inline-block" />
            <span className="text-[11px] font-medium text-espresso-800 dark:text-cream-200">Half Day</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-amber-500/25 border border-amber-400 inline-block" />
            <span className="text-[11px] font-medium text-espresso-800 dark:text-cream-200">Approved Leave</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-cream-200 border border-cream-300 inline-block" />
            <span className="text-[11px] font-medium text-espresso-500 dark:text-cream-400">Sunday Off</span>
          </div>
        </div>
      </div>
    </div>
  );
}

