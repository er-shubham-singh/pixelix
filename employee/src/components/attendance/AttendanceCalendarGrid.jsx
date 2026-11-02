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
  Sparkles,
  XCircle,
  PlusCircle,
  ArrowRight,
  Info
} from 'lucide-react';

export default function AttendanceCalendarGrid({
  selectedMonth,
  onMonthChange,
  records = [],
  leavesList = [],
  shiftType = 'full_time',
  targetHours = 8,
  onRequestLeaveDate
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

  // Parse calendar days (All 7 days Mon-Sun are enabled active working days; no hardcoded holidays)
  const calendarCells = useMemo(() => {
    if (!selectedMonth) return [];
    const [year, month] = selectedMonth.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();

    // Day of week for the 1st of this month (Monday = 0, Tuesday = 1, ..., Sunday = 6)
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

      // Determine state (Pixelix operates 7 days a week; every day is active unless on approved leave)
      let state = 'future';
      let stateLabel = 'Working Day';
      let hoursWorked = 0;

      if (approvedLeave) {
        state = 'approved_leave';
        const typeLabel = approvedLeave.type === 'weekly_off' ? 'Weekly Off' : (approvedLeave.type || 'Leave');
        stateLabel = `Approved Leave (${typeLabel})`;
      } else if (record) {
        hoursWorked = record.totalHours || 0;
        const hasClockOut = Boolean(record.clockOutTime && (record.attendanceStage === 'clocked_out' || record.clockOutTime));
        const hasClockInOnly = Boolean(record.clockInTime && !hasClockOut);

        if (record.status === 'leave') {
          state = 'approved_leave';
          stateLabel = 'Approved Leave';
        } else if (hasClockOut) {
          if (record.status === 'half_day') {
            state = 'half_day';
            stateLabel = 'Half Day (4h)';
          } else {
            state = 'present';
            stateLabel = 'Present (Full Day)';
          }
        } else if (hasClockInOnly) {
          state = 'on_duty';
          stateLabel = 'Active On-Duty';
        } else {
          state = record.status || 'present';
          stateLabel = record.status === 'half_day' ? 'Half Day' : 'Present';
        }
      } else if (pendingLeave) {
        state = 'pending_leave';
        stateLabel = 'Leave Applied (Pending Review)';
      } else if (isPast) {
        state = 'absent';
        stateLabel = 'Absent / Not Logged';
      } else {
        state = 'future';
        stateLabel = isToday ? "Today's Work Day" : 'Upcoming Work Day';
      }

      return {
        ...cell,
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

  // Aggregate monthly counts (Daily operations with 1 flexible leave per week)
  const monthStats = useMemo(() => {
    let presentCount = 0;
    let halfDayCount = 0;
    let approvedLeaveCount = 0;
    let absentCount = 0;
    let totalWorkingDaysElapsed = 0;

    calendarCells.forEach((c) => {
      if (!c.isCurrentMonth) return;
      if (c.state === 'present') presentCount++;
      if (c.state === 'half_day') halfDayCount++;
      if (c.state === 'approved_leave') approvedLeaveCount++;
      if (c.state === 'absent') absentCount++;
      if (c.isPast || c.isToday) totalWorkingDaysElapsed++;
    });

    const effectivePresent = presentCount + (halfDayCount * 0.5) + approvedLeaveCount;
    const turnoutRate = totalWorkingDaysElapsed > 0
      ? Math.min(100, Math.round((effectivePresent / totalWorkingDaysElapsed) * 100))
      : 100;

    return {
      presentCount,
      halfDayCount,
      approvedLeaveCount,
      absentCount,
      totalWorkingDaysElapsed,
      turnoutRate
    };
  }, [calendarCells]);

  // Inspected Cell Data
  const inspectedCell = useMemo(() => {
    return calendarCells.find((c) => c.dateStr === inspectedDateStr) || null;
  }, [calendarCells, inspectedDateStr]);

  // Styling helper for square box based on state with rich, vibrant backgrounds and borders
  const getSquareStyles = (cell) => {
    const isSelected = cell.dateStr === inspectedDateStr;
    const baseSelectedRing = isSelected
      ? 'ring-4 ring-terracotta-500 ring-offset-2 dark:ring-offset-darkbg-card shadow-lg scale-[1.03] z-20'
      : 'hover:shadow-md hover:scale-[1.01]';

    if (!cell.isCurrentMonth) {
      return `bg-cream-100/30 dark:bg-darkbg-base/20 border border-cream-200/50 dark:border-darkbg-border/30 opacity-35 ${baseSelectedRing}`;
    }

    switch (cell.state) {
      case 'present':
        return `bg-emerald-50/90 dark:bg-emerald-950/60 border-2 border-emerald-500 dark:border-emerald-400 text-emerald-950 dark:text-emerald-100 shadow-xs shadow-emerald-500/10 ${baseSelectedRing}`;
      case 'absent':
        return `bg-rose-50/90 dark:bg-rose-950/60 border-2 border-rose-400 dark:border-rose-500 text-rose-950 dark:text-rose-100 shadow-xs shadow-rose-500/10 ${baseSelectedRing}`;
      case 'approved_leave':
        return `bg-violet-50/90 dark:bg-violet-950/60 border-2 border-violet-500 dark:border-violet-400 text-violet-950 dark:text-violet-100 shadow-xs shadow-violet-500/10 ${baseSelectedRing}`;
      case 'pending_leave':
        return `bg-amber-50/90 dark:bg-amber-950/50 border-2 border-dashed border-amber-500 dark:border-amber-400 text-amber-950 dark:text-amber-100 shadow-xs shadow-amber-500/10 ${baseSelectedRing}`;
      case 'on_duty':
        return `bg-sky-50/95 dark:bg-sky-950/65 border-2 border-sky-500 dark:border-sky-400 text-sky-950 dark:text-sky-100 shadow-xs shadow-sky-500/20 animate-pulse ${baseSelectedRing}`;
      case 'half_day':
        return `bg-orange-50/90 dark:bg-orange-950/60 border-2 border-orange-500 dark:border-orange-400 text-orange-950 dark:text-orange-100 shadow-xs shadow-orange-500/10 ${baseSelectedRing}`;
      case 'future':
      default:
        return `bg-cream-50/70 dark:bg-darkbg-elevated/40 hover:bg-white dark:hover:bg-darkbg-elevated border-2 border-cream-200 dark:border-darkbg-border hover:border-terracotta-400 text-espresso-800 dark:text-cream-200 ${baseSelectedRing}`;
    }
  };

  // Day Number Badge styling (colorful circular/rounded tile for every date)
  const getDayNumberBadge = (cell) => {
    if (cell.isToday) {
      return (
        <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-terracotta-500 text-white flex items-center justify-center font-black text-xs sm:text-sm shadow-xs ring-2 ring-terracotta-300">
          {cell.dayNum}
        </span>
      );
    }
    if (!cell.isCurrentMonth) {
      return (
        <span className="text-xs sm:text-sm font-bold text-espresso-400/50 dark:text-cream-400/40">
          {cell.dayNum}
        </span>
      );
    }
    switch (cell.state) {
      case 'present':
        return (
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs sm:text-sm shadow-2xs">
            {cell.dayNum}
          </span>
        );
      case 'absent':
        return (
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-rose-500 text-white flex items-center justify-center font-black text-xs sm:text-sm shadow-2xs">
            {cell.dayNum}
          </span>
        );
      case 'approved_leave':
        return (
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-violet-600 text-white flex items-center justify-center font-black text-xs sm:text-sm shadow-2xs">
            {cell.dayNum}
          </span>
        );
      case 'pending_leave':
        return (
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-black text-xs sm:text-sm shadow-2xs">
            {cell.dayNum}
          </span>
        );
      case 'on_duty':
        return (
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center font-black text-xs sm:text-sm shadow-2xs">
            {cell.dayNum}
          </span>
        );
      case 'half_day':
        return (
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center font-black text-xs sm:text-sm shadow-2xs">
            {cell.dayNum}
          </span>
        );
      default:
        return (
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-cream-200/90 dark:bg-darkbg-elevated text-espresso-800 dark:text-cream-200 flex items-center justify-center font-black text-xs sm:text-sm border border-cream-300 dark:border-darkbg-border">
            {cell.dayNum}
          </span>
        );
    }
  };

  // Status Badge inside cell
  const getPillBadge = (cell) => {
    switch (cell.state) {
      case 'present':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-black bg-emerald-600 text-white shadow-2xs">
            <CheckCircle2 className="w-2.5 h-2.5 flex-shrink-0" />
            <span className="truncate">{cell.hoursWorked ? `${cell.hoursWorked}h` : 'Present'}</span>
          </span>
        );
      case 'absent':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-black bg-rose-500 text-white shadow-2xs">
            <XCircle className="w-2.5 h-2.5 flex-shrink-0" />
            <span className="truncate">Absent</span>
          </span>
        );
      case 'approved_leave':
        const leaveLabel = cell.approvedLeave?.type === 'weekly_off' ? 'Weekly Off' : (cell.approvedLeave?.type || 'Leave');
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-black bg-violet-600 text-white shadow-2xs">
            <CalendarCheck2 className="w-2.5 h-2.5 flex-shrink-0" />
            <span className="truncate capitalize">{leaveLabel}</span>
          </span>
        );
      case 'pending_leave':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold bg-amber-500 text-white shadow-2xs">
            <Clock className="w-2.5 h-2.5 flex-shrink-0" />
            <span className="truncate">Applied</span>
          </span>
        );
      case 'on_duty':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-black bg-sky-600 text-white shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="truncate">On Duty</span>
          </span>
        );
      case 'half_day':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-orange-500 text-white shadow-2xs">
            <AlertCircle className="w-2.5 h-2.5 flex-shrink-0" />
            <span className="truncate">{cell.hoursWorked ? `${cell.hoursWorked}h` : 'Half'}</span>
          </span>
        );
      case 'future':
      default:
        return (
          <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-semibold text-espresso-500 dark:text-cream-400">
            <Briefcase className="w-2 h-2 flex-shrink-0 text-espresso-400" />
            <span>Work Day</span>
          </span>
        );
    }
  };

  // All 7 days active (Mon-Sun)
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
                  Current Month
                </span>
              )}
            </div>
            <p className="text-xs text-espresso-500 dark:text-cream-400">
              Interactive 7-Day Operations Calendar • Click any day to inspect details or apply for weekly off
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

      {/* 2. Company Operations & 1-Leave/Week Policy Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-terracotta-500/10 via-amber-500/10 to-violet-500/10 dark:from-terracotta-950/30 dark:via-amber-950/20 dark:to-violet-950/30 border border-terracotta-200 dark:border-terracotta-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2.5 text-xs text-espresso-800 dark:text-cream-100">
          <Sparkles className="w-4 h-4 text-terracotta-500 flex-shrink-0 mt-0.5 sm:mt-0" />
          <span>
            <strong>Pixelix 7-Day Company Operations:</strong> Our services run daily with no fixed weekend closures. Every employee is permitted <strong>1 flexible leave per week</strong>. Submit your leave application for any day; once approved by management, your date turns to an <strong>Official Approved Leave (Violet)</strong>.
          </span>
        </div>
        {onRequestLeaveDate && (
          <button
            onClick={() => onRequestLeaveDate(todayStr)}
            className="px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto shrink-0 transition-all shadow-xs active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Apply For Leave</span>
          </button>
        )}
      </div>

      {/* 3. Monthly Summary Metrics Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Present Days */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-center gap-3 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-2xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
              Present Days
            </div>
            <div className="text-base font-black text-emerald-950 dark:text-emerald-100">
              {monthStats.presentCount} <span className="text-[10px] font-normal text-emerald-700 dark:text-emerald-400">logged</span>
            </div>
          </div>
        </div>

        {/* Absent / Missed Days */}
        <div className="p-3.5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 flex items-center gap-3 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-2xs">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-rose-800 dark:text-rose-300">
              Absent / Missed
            </div>
            <div className="text-base font-black text-rose-950 dark:text-rose-100">
              {monthStats.absentCount} <span className="text-[10px] font-normal text-rose-700 dark:text-rose-400">days</span>
            </div>
          </div>
        </div>

        {/* Approved Leaves (including 1 Weekly Off per week) */}
        <div className="p-3.5 rounded-2xl bg-violet-50/80 dark:bg-violet-950/40 border border-violet-300 dark:border-violet-800 flex items-center gap-3 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-2xs">
            <CalendarCheck2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-violet-800 dark:text-violet-300">
              Approved Leaves / Off
            </div>
            <div className="text-base font-black text-violet-950 dark:text-violet-100">
              {monthStats.approvedLeaveCount} <span className="text-[10px] font-normal text-violet-700 dark:text-violet-400">days</span>
            </div>
          </div>
        </div>

        {/* Turnout Percentage */}
        <div className="p-3.5 rounded-2xl bg-cream-100/80 dark:bg-darkbg-elevated border border-cream-300 dark:border-darkbg-border flex items-center gap-3 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-terracotta-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-2xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-espresso-700 dark:text-cream-300">
              Attendance Score
            </div>
            <div className="text-base font-black text-espresso-950 dark:text-cream-100">
              {monthStats.turnoutRate}%
            </div>
          </div>
        </div>
      </div>

      {/* 4. 7-Day Calendar Grid of Vibrant Rounded Squares */}
      <div className="space-y-2">
        {/* Weekday Column Headers (All 7 Days Equal and Enabled) */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5 text-center">
          {weekdays.map((day) => (
            <div
              key={day}
              className="py-2.5 text-[11px] sm:text-xs font-black uppercase tracking-wider rounded-xl text-espresso-800 dark:text-cream-100 bg-cream-100 dark:bg-darkbg-elevated border border-cream-200/80 dark:border-darkbg-border shadow-2xs"
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
                className={`w-full aspect-square min-h-[76px] sm:min-h-[96px] p-1.5 sm:p-2.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${getSquareStyles(
                  cell
                )}`}
              >
                {/* Top: Day Number Colorful Badge + Today Label */}
                <div className="flex items-start justify-between w-full">
                  {getDayNumberBadge(cell)}

                  {cell.isToday && (
                    <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-terracotta-500 text-white shadow-2xs">
                      Today
                    </span>
                  )}
                </div>

                {/* Middle: Status Pill Badge */}
                <div className="my-auto w-full flex items-center justify-start overflow-hidden">
                  {cell.isCurrentMonth && getPillBadge(cell)}
                </div>

                {/* Bottom: Timestamps or Descriptive status note */}
                <div className="w-full text-[9px] font-mono leading-tight truncate">
                  {cell.record?.clockInTime && cell.record?.clockOutTime ? (
                    <span className="text-emerald-700 dark:text-emerald-300 font-semibold hidden sm:inline">
                      {cell.record.clockInTime.split(' ')[0]} - {cell.record.clockOutTime.split(' ')[0]}
                    </span>
                  ) : cell.record?.clockInTime ? (
                    <span className="text-sky-600 dark:text-sky-400 font-semibold hidden sm:inline">
                      In {cell.record.clockInTime.split(' ')[0]}
                    </span>
                  ) : cell.state === 'approved_leave' ? (
                    <span className="text-violet-700 dark:text-violet-300 font-medium hidden sm:inline">
                      Approved Off
                    </span>
                  ) : cell.state === 'absent' ? (
                    <span className="text-rose-600 dark:text-rose-400 font-medium hidden sm:inline">
                      Unlogged
                    </span>
                  ) : cell.state === 'pending_leave' ? (
                    <span className="text-amber-600 dark:text-amber-400 font-medium hidden sm:inline">
                      Under Review
                    </span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Inspected Date Breakdown Card */}
      {inspectedCell && (
        <div className="mt-4 p-5 rounded-3xl bg-cream-50 dark:bg-darkbg-elevated border border-cream-300 dark:border-darkbg-border animate-fade-in space-y-4">
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

            {/* Status Badge & Action */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-3 py-1 rounded-xl text-xs font-bold border ${
                  inspectedCell.state === 'present'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : inspectedCell.state === 'half_day'
                    ? 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300'
                    : inspectedCell.state === 'on_duty'
                    ? 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300'
                    : inspectedCell.state === 'approved_leave'
                    ? 'bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-950/60 dark:text-violet-300'
                    : inspectedCell.state === 'pending_leave'
                    ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
                    : inspectedCell.state === 'absent'
                    ? 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
                    : 'bg-cream-200 text-espresso-700 border-cream-300 dark:bg-darkbg-base dark:text-cream-300'
                }`}
              >
                {inspectedCell.stateLabel}
              </span>

              {/* Action Button: Apply for Weekly Off on this date if future or today without leave */}
              {onRequestLeaveDate && (inspectedCell.state === 'future' || inspectedCell.state === 'absent' || (inspectedCell.isToday && inspectedCell.state !== 'approved_leave')) && (
                <button
                  type="button"
                  onClick={() => onRequestLeaveDate(inspectedCell.dateStr)}
                  className="px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs active:scale-95"
                >
                  <CalendarCheck2 className="w-3.5 h-3.5" />
                  <span>Apply for Weekly Off ({inspectedCell.dateStr})</span>
                </button>
              )}
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
            <div className="p-4 rounded-2xl bg-violet-500/10 dark:bg-violet-950/40 border border-violet-300 dark:border-violet-700 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-violet-900 dark:text-violet-200">
                <CalendarCheck2 className="w-4 h-4 text-violet-600" />
                <span>Official Approved Leave Record</span>
              </div>
              <p className="text-xs text-violet-800 dark:text-violet-300">
                <strong>Reason / Classification:</strong> {inspectedCell.approvedLeave.type === 'weekly_off' ? 'Weekly Off (1 Day per Week Policy)' : inspectedCell.approvedLeave.reason || 'Personal Leave'}
              </p>
              <p className="text-[10px] text-violet-700/80 dark:text-violet-400/80">
                Approved Period: {inspectedCell.approvedLeave.startDate} to {inspectedCell.approvedLeave.endDate}
              </p>
            </div>
          )}

          {inspectedCell.pendingLeave && (
            <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Leave Application Awaiting Executive Approval</span>
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                <strong>Reason:</strong> {inspectedCell.pendingLeave.reason || 'Weekly Off Application'}
              </p>
              <p className="text-[10px] text-amber-700/80 dark:text-amber-400/80">
                Submitted on: {inspectedCell.pendingLeave.startDate} to {inspectedCell.pendingLeave.endDate}
              </p>
            </div>
          )}

          {inspectedCell.record?.workSummary && (
            <div className="p-4 rounded-2xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-espresso-800 dark:text-cream-200">
                <FileText className="w-4 h-4 text-terracotta-500" />
                <span>Submitted Deliverables Summary</span>
              </div>
              <p className="text-xs text-espresso-700 dark:text-cream-300 whitespace-pre-wrap leading-relaxed">
                {inspectedCell.record.workSummary}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 6. Comprehensive Calendar Color Legend */}
      <div className="pt-4 border-t border-cream-200 dark:border-darkbg-border flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <span className="font-bold text-espresso-700 dark:text-cream-300 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-terracotta-500" />
          Color Status Key:
        </span>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Present */}
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-emerald-600 border border-emerald-500 inline-block shadow-2xs" />
            <span className="text-[11px] font-bold text-espresso-800 dark:text-cream-200">Present</span>
          </div>

          {/* Absent */}
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-rose-500 border border-rose-400 inline-block shadow-2xs" />
            <span className="text-[11px] font-bold text-espresso-800 dark:text-cream-200">Absent / Missed</span>
          </div>

          {/* Approved Leave */}
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-violet-600 border border-violet-500 inline-block shadow-2xs" />
            <span className="text-[11px] font-bold text-espresso-800 dark:text-cream-200">Approved Weekly Off</span>
          </div>

          {/* Pending Leave */}
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-amber-500 border border-amber-400 inline-block shadow-2xs" />
            <span className="text-[11px] font-bold text-espresso-800 dark:text-cream-200">Pending Review</span>
          </div>

          {/* On Duty */}
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-sky-600 border border-sky-500 inline-block shadow-2xs" />
            <span className="text-[11px] font-bold text-espresso-800 dark:text-cream-200">On Duty</span>
          </div>

          {/* Half Day */}
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-orange-500 border border-orange-400 inline-block shadow-2xs" />
            <span className="text-[11px] font-bold text-espresso-800 dark:text-cream-200">Half Day</span>
          </div>

          {/* Active Work Day */}
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-cream-200 dark:bg-darkbg-elevated border border-cream-300 dark:border-darkbg-border inline-block" />
            <span className="text-[11px] font-medium text-espresso-600 dark:text-cream-300">Upcoming Work Day</span>
          </div>
        </div>
      </div>
    </div>
  );
}
