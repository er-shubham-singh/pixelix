import Attendance from '../models/AttendanceModel.js';
import Leave from '../models/LeaveModel.js';

// Helper to get formatted date string 'YYYY-MM-DD' in local timezone
export function getLocalDateString(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
      // If today's record already exists, allow editing the description
      record.workSummary = workSummary.trim();
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

