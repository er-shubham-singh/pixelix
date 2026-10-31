import { apiRequest } from './apiClient';

export async function submitDailyWorkLog({ date, workSummary, status = 'present' }) {
  const result = await apiRequest('/employee/work-log', {
    method: 'POST',
    body: JSON.stringify({ date, workSummary, status })
  });

  return {
    ok: result.ok,
    status: result.status,
    message: result.data?.message || (result.ok ? 'Work log updated' : 'Failed to update work log'),
    isLocked: result.data?.isLocked || false,
    data: result.data?.data
  };
}

export async function fetchTodayLog() {
  const result = await apiRequest('/employee/work-log/today');
  if (result.ok && result.data) {
    return result.data;
  }
  return { today: new Date().toISOString().split('T')[0], isEditable: true, record: null };
}

export async function fetchMonthlyAttendance(month) {
  const endpoint = month ? `/employee/attendance?month=${month}` : '/employee/attendance';
  const result = await apiRequest(endpoint);
  if (result.ok && result.data) {
    return result.data;
  }
  return {
    month: month || '',
    summary: {
      totalDaysInMonth: 30,
      elapsedDays: 1,
      totalWorkingDays: 1,
      presentDays: 0,
      leaveDays: 0,
      attendancePercentage: 0
    },
    records: []
  };
}

export async function applyLeave({ startDate, endDate, reason, type = 'casual' }) {
  const result = await apiRequest('/employee/leaves', {
    method: 'POST',
    body: JSON.stringify({ startDate, endDate, reason, type })
  });

  return {
    ok: result.ok,
    message: result.data?.message || (result.ok ? 'Leave applied' : 'Failed to submit leave'),
    data: result.data?.data
  };
}

export async function fetchMyLeaves() {
  const result = await apiRequest('/employee/leaves');
  if (result.ok && result.data) {
    return result.data.data || [];
  }
  return [];
}

