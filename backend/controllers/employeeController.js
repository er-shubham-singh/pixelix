import Attendance from '../models/AttendanceModel.js';
import Leave from '../models/LeaveModel.js';

// Helper to get formatted date string 'YYYY-MM-DD' in local timezone
export function getLocalDateString(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper to parse time string like "09:30 AM", "9:30 AM", "18:30", "6:30 PM" to Date
export function parseTimeStringToDate(timeStr, baseDateStr) {
  if (!timeStr) return null;
  const trimmed = timeStr.trim().toUpperCase();
  const isPM = trimmed.includes('PM');
  const isAM = trimmed.includes('AM');
  const clean = trimmed.replace('AM', '').replace('PM', '').trim();
  const parts = clean.split(':');
  if (parts.length >= 2) {
    let hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    if (!isNaN(hours) && !isNaN(minutes)) {
      if (isPM && hours < 12) hours += 12;
      if (isAM && hours === 12) hours = 0;
      const [y, m, d] = (baseDateStr || getLocalDateString()).split('-').map(Number);
      const date = new Date(y, m - 1, d, hours, minutes, 0, 0);
      if (!isNaN(date.getTime())) return date;
    }
  }
  return null;
}

/**
 * @desc   Clock In (Morning Check-in)
 * @route  POST /api/employee/clock-in
 * @access Private (Employee)
 */
export async function clockIn(req, res) {
  try {
    const { customTime, clockInTime: reqClockInTime, morningNotes, description } = req.body;
    const userId = req.user._id;
    const today = getLocalDateString();
    const now = new Date();
    const rawTime = (customTime || reqClockInTime || '').trim();
    const parsedDate = rawTime ? parseTimeStringToDate(rawTime, today) : null;
    const clockInTimeStr = rawTime || now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const clockInTimestamp = parsedDate || now;
    const shiftType = req.user.employmentType || 'full_time';
    const notes = (morningNotes || description || '').trim();

    let record = await Attendance.findOne({ user: userId, date: today });

    if (!record) {
      record = await Attendance.create({
        user: userId,
        date: today,
        clockInTime: clockInTimeStr,
        clockInTimestamp,
        morningNotes: notes,
        shiftType,
        attendanceStage: 'clocked_in',
        status: 'present'
      });
    } else {
      record.clockInTime = clockInTimeStr;
      record.clockInTimestamp = clockInTimestamp;
      if (notes) record.morningNotes = notes;
      record.attendanceStage = 'clocked_in';
      record.shiftType = shiftType;
      await record.save();
    }

    return res.json({
      success: true,
      message: `Good morning! Clocked in successfully at ${clockInTimeStr}. You are now eligible for evening punch-out!`,
      data: record
    });
  } catch (error) {
    console.error('Clock-in error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc   Clock Out (Evening Checkout) & Calculate Hours
 * @route  POST /api/employee/clock-out
 * @access Private (Employee)
 */
export async function clockOut(req, res) {
  try {
    const { workSummary, description, customTime, clockOutTime: reqClockOutTime } = req.body;
    const summary = (workSummary || description || '').trim();
    const userId = req.user._id;
    const today = getLocalDateString();
    const now = new Date();
    const rawOutTime = (customTime || reqClockOutTime || '').trim();
    const parsedOutDate = rawOutTime ? parseTimeStringToDate(rawOutTime, today) : null;
    const clockOutTimeStr = rawOutTime || now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const clockOutTimestamp = parsedOutDate || now;
    const shiftType = req.user.employmentType || 'full_time';

    let record = await Attendance.findOne({ user: userId, date: today });

    if (!record) {
      const defaultIn = new Date(clockOutTimestamp.getTime() - (shiftType === 'part_time' ? 4 : 8) * 3600000);
      record = new Attendance({
        user: userId,
        date: today,
        clockInTime: defaultIn.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        clockInTimestamp: defaultIn,
        shiftType
      });
    }

    // Calculate worked hours from clockIn to clockOut
    let inTime = record.clockInTimestamp ? new Date(record.clockInTimestamp) : null;
    if (!inTime && record.clockInTime) {
      inTime = parseTimeStringToDate(record.clockInTime, today);
    }
    if (!inTime) {
      inTime = new Date(clockOutTimestamp.getTime() - (shiftType === 'part_time' ? 4 : 8) * 3600000);
    }

    const diffMs = clockOutTimestamp.getTime() - inTime.getTime();
    const diffHours = Math.max(0.1, diffMs / (1000 * 60 * 60));
    const totalHours = Math.round(diffHours * 100) / 100;

    record.clockOutTime = clockOutTimeStr;
    record.clockOutTimestamp = clockOutTimestamp;
    record.totalHours = totalHours;
    record.attendanceStage = 'clocked_out';
    if (summary) {
      record.workSummary = summary;
    }

    // Automated Present / Half Day determination based on shift type:
    // Full time needs 7.5h for full day; Part time needs 3.5h for full day
    if (shiftType === 'part_time') {
      if (totalHours >= 3.5) {
        record.status = 'present';
      } else {
        record.status = 'half_day';
      }
    } else {
      if (totalHours >= 7.5) {
        record.status = 'present';
      } else if (totalHours >= 3.5) {
        record.status = 'half_day';
      } else {
        record.status = 'half_day';
      }
    }

    await record.save();

    return res.json({
      success: true,
      message: `Clocked out successfully at ${clockOutTimeStr}! Completed ${totalHours} hours. Status: ${record.status === 'present' ? 'Present (Full Day)' : 'Half Day'}.`,
      data: record
    });
  } catch (error) {
    console.error('Clock-out error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc   Log or Update Daily Attendance & Work Description
 * @route  POST /api/employee/work-log
 * @access Private (Employee)
 */
export async function submitDailyWorkLog(req, res) {
  try {
    const { date, workSummary, status = 'present' } = req.body;
    const userId = req.user._id;
    const today = getLocalDateString();
    const now = new Date();
    const nowTimeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const shiftType = req.user.employmentType || 'full_time';

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a date'
      });
    }

    if (!workSummary || workSummary.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a short description of what you accomplished today'
      });
    }

    // STRICT DATE LOCKING:
    // Past dates cannot be created or updated once the day has ended
    if (date < today) {
      return res.status(403).json({
        success: false,
        isLocked: true,
        message: `Work logs for past dates (${date}) are permanently locked. You can only record or edit activities for today's active date (${today}).`
      });
    }

    if (date > today) {
      return res.status(400).json({
        success: false,
        message: 'Cannot log attendance or work summary for future dates.'
      });
    }

    // Check if an entry already exists for today
    let record = await Attendance.findOne({ user: userId, date });

    if (record) {
      record.workSummary = workSummary.trim();
      if (!record.clockOutTime) {
        record.clockOutTime = nowTimeStr;
        record.clockOutTimestamp = now;
      }
      if (record.clockInTimestamp) {
        const inTime = new Date(record.clockInTimestamp);
        const diffHours = Math.max(0.1, (now.getTime() - inTime.getTime()) / (1000 * 60 * 60));
        record.totalHours = Math.round(diffHours * 100) / 100;
      }
      record.attendanceStage = 'clocked_out';
      if (status) record.status = status;
      await record.save();

      return res.json({
        success: true,
        message: "Today's work summary has been updated successfully.",
        data: record
      });
    } else {
      // Create new attendance record for today
      record = await Attendance.create({
        user: userId,
        date,
        workSummary: workSummary.trim(),
        clockInTime: '09:30 AM',
        clockOutTime: nowTimeStr,
        clockInTimestamp: new Date(now.getTime() - (shiftType === 'part_time' ? 4 : 8) * 3600000),
        clockOutTimestamp: now,
        totalHours: shiftType === 'part_time' ? 4 : 8,
        shiftType,
        attendanceStage: 'clocked_out',
        status
      });

      return res.status(201).json({
        success: true,
        message: "Attendance and daily work summary recorded successfully.",
        data: record
      });
    }
  } catch (error) {
    console.error('Work log submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to record daily work log',
      error: error.message
    });
  }
}

/**
 * @desc   Get Today's Work Log & Lock Status
 * @route  GET /api/employee/work-log/today
 * @access Private (Employee)
 */
export async function getTodayLog(req, res) {
  try {
    const today = getLocalDateString();
    const record = await Attendance.findOne({ user: req.user._id, date: today });

    return res.json({
      success: true,
      today,
      isEditable: true,
      employmentType: req.user.employmentType || 'full_time',
      shiftHours: req.user.shiftHours || (req.user.employmentType === 'part_time' ? 4 : 8),
      record: record || null
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc   Get Attendance History & Monthly Stats with Circular Gauge Metrics
 * @route  GET /api/employee/attendance
 * @access Private (Employee)
 */
export async function getMonthlyAttendance(req, res) {
  try {
    const today = new Date();
    const currentYearMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    const selectedMonth = req.query.month || currentYearMonth; // format 'YYYY-MM'

    // Fetch all attendance records for selected month
    const regex = new RegExp(`^${selectedMonth}`);
    const records = await Attendance.find({
      user: req.user._id,
      date: { $regex: regex }
    }).sort({ date: -1 });

    // Calculate days count
    const [yearStr, monthStr] = selectedMonth.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const totalDaysInMonth = new Date(year, month, 0).getDate();

    // Elapsed days in month (if current month, elapsed up to today; if past month, all days)
    const isCurrentMonth = selectedMonth === currentYearMonth;
    const elapsedDays = isCurrentMonth ? today.getDate() : totalDaysInMonth;

    const presentDays = records.filter(r => r.status === 'present').length;
    const leaveDays = records.filter(r => r.status === 'leave').length;
    const halfDays = records.filter(r => r.status === 'half_day').length;

    // Working days estimate excluding Sundays
    let totalWorkingDays = 0;
    for (let d = 1; d <= elapsedDays; d++) {
      const dayOfWeek = new Date(year, month - 1, d).getDay();
      if (dayOfWeek !== 0) { // not Sunday
        totalWorkingDays++;
      }
    }

    const effectivePresent = presentDays + (halfDays * 0.5);
    const attendancePercentage = totalWorkingDays > 0
      ? Math.min(100, Math.round((effectivePresent / totalWorkingDays) * 100))
      : 0;

    return res.json({
      success: true,
      month: selectedMonth,
      summary: {
        totalDaysInMonth,
        elapsedDays,
        totalWorkingDays,
        presentDays,
        leaveDays,
        halfDays,
        attendancePercentage,
        today: getLocalDateString()
      },
      records
    });
  } catch (error) {
    console.error('Fetch attendance error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc   Apply for Leave
 * @route  POST /api/employee/leaves
 * @access Private (Employee)
 */
export async function applyLeave(req, res) {
  try {
    const { startDate, endDate, reason, type = 'casual' } = req.body;
    const userId = req.user._id;

    if (!startDate || !endDate || !reason) {
      return res.status(400).json({
        success: false,
        message: 'Please provide start date, end date, and reason for leave'
      });
    }

    if (endDate < startDate) {
      return res.status(400).json({
        success: false,
        message: 'End date cannot be earlier than start date'
      });
    }

    const leave = await Leave.create({
      user: userId,
      startDate,
      endDate,
      reason: reason.trim(),
      type,
      status: 'pending'
    });

    return res.status(201).json({
      success: true,
      message: 'Leave application submitted successfully. Awaiting owner confirmation.',
      data: leave
    });
  } catch (error) {
    console.error('Apply leave error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc   Get Employee Leave Applications
 * @route  GET /api/employee/leaves
 * @access Private (Employee)
 */
export async function getMyLeaves(req, res) {
  try {
    const leaves = await Leave.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json({
      success: true,
      count: leaves.length,
      data: leaves
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

