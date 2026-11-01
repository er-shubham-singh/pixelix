import React from 'react';
import AttendanceCalendarGrid from '../attendance/AttendanceCalendarGrid';

export default function AttendanceBarChart({
  records = [],
  selectedMonth = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`,
  onMonthChange = () => {},
  leavesList = [],
  shiftType = 'full_time',
  targetHours = 8
}) {
  return (
    <AttendanceCalendarGrid
      selectedMonth={selectedMonth}
      onMonthChange={onMonthChange}
      records={records}
      leavesList={leavesList}
      shiftType={shiftType}
      targetHours={targetHours}
    />
  );
}
