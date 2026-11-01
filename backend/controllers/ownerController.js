import User from '../models/UserModel.js';
import Attendance from '../models/AttendanceModel.js';
import Leave from '../models/LeaveModel.js';
import Inquiry from '../models/InquiryModel.js';
import Service from '../models/ServiceModel.js';
import { ENV } from '../config/env.js';
import { sendEmployeeCredentialsEmail, sendLeaveStatusEmail } from '../services/emailService.js';
import { getLocalDateString } from './employeeController.js';

// Helper to iterate date range
function getDateRangeArray(startDateStr, endDateStr) {
  const dates = [];
  const curr = new Date(startDateStr);
  const end = new Date(endDateStr);

  while (curr <= end) {
    const y = curr.getFullYear();
    const m = String(curr.getMonth() + 1).padStart(2, '0');
    const d = String(curr.getDate()).padStart(2, '0');
    dates.push(`${y}-${m}-${d}`);
    curr.setDate(curr.getDate() + 1);
  }
  return dates;
}

/**
 * ==========================================
 * EMPLOYEE MANAGEMENT
 * ==========================================
 */

/**
 * @desc   Create New Employee & Dispatch Nodemailer Credentials
 * @route  POST /api/owner/employees
 * @access Private (Owner)
 */
export async function createEmployee(req, res) {
  try {
    const { name, email, password, domain, phone, employmentType = 'full_time', shiftHours = 8 } = req.body;

    if (!name || !email || !password || !domain) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, password, and domain are required.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user exists
    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    // Generate unique employee ID (PX-1001+)
    const count = await User.countDocuments();
    const employeeId = `PX-EMP-${1000 + count + 1}`;

    const newEmployee = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password, // pre-save hook will hash this
      domain,
      role: 'employee',
      employeeId,
      phone: phone || '',
      employmentType,
      shiftHours: employmentType === 'part_time' ? 4 : (Number(shiftHours) || 8),
      status: 'active'
    });

    // Send credentials email via Nodemailer
    const emailResult = await sendEmployeeCredentialsEmail({
      to: cleanEmail,
      name: newEmployee.name,
      email: cleanEmail,
      password, // plain text password sent to user
      domain: newEmployee.domain,
      employeeId: newEmployee.employeeId,
      portalUrl: ENV.EMPLOYEE_URL || 'https://employee.pixelix.co.in'
    });

    return res.status(201).json({
      success: true,
      message: `Employee ${newEmployee.name} created successfully (${newEmployee.employmentType === 'part_time' ? '4h Part-Time' : '8h Full-Time'}). Credentials dispatched via email.`,
      emailDelivered: emailResult.success,
      simulatedEmail: emailResult.simulated || false,
      employee: {
        _id: newEmployee._id,
        name: newEmployee.name,
        email: newEmployee.email,
        domain: newEmployee.domain,
        employeeId: newEmployee.employeeId,
        phone: newEmployee.phone,
        employmentType: newEmployee.employmentType,
        shiftHours: newEmployee.shiftHours,
        status: newEmployee.status,
        joinedDate: newEmployee.joinedDate
      }
    });
  } catch (error) {
    console.error('Create employee error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create employee',
      error: error.message
    });
  }
}

/**
 * @desc   Get All Employees with Current Month Stats
 * @route  GET /api/owner/employees
 * @access Private (Owner)
 */
export async function getEmployees(req, res) {
  try {
    const today = new Date();
    const currentYearMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    const todayDateStr = getLocalDateString(today);

    const employees = await User.find({ role: 'employee' }).sort({ createdAt: -1 });

    // Fetch month's attendance records to enrich each employee's profile
    const monthRegex = new RegExp(`^${currentYearMonth}`);
    const monthRecords = await Attendance.find({ date: { $regex: monthRegex } });

    const enrichedEmployees = employees.map(emp => {
      const empRecords = monthRecords.filter(r => r.user.toString() === emp._id.toString());
      const presentCount = empRecords.filter(r => r.status === 'present').length;
      const leaveCount = empRecords.filter(r => r.status === 'leave').length;
      const todayRecord = empRecords.find(r => r.date === todayDateStr);

      return {
        _id: emp._id,
        name: emp.name,
        email: emp.email,
        domain: emp.domain,
        employeeId: emp.employeeId,
        phone: emp.phone,
        employmentType: emp.employmentType || 'full_time',
        shiftHours: emp.shiftHours || (emp.employmentType === 'part_time' ? 4 : 8),
        status: emp.status,
        joinedDate: emp.joinedDate,
        createdAt: emp.createdAt,
        currentMonthStats: {
          presentDays: presentCount,
          leaveDays: leaveCount,
          todayStatus: todayRecord ? todayRecord.status : 'not_logged',
          todayWorkSummary: todayRecord ? todayRecord.workSummary : '',
          todayClockInTime: todayRecord ? todayRecord.clockInTime : null,
          todayClockOutTime: todayRecord ? todayRecord.clockOutTime : null,
          todayTotalHours: todayRecord ? todayRecord.totalHours : 0,
          todayStage: todayRecord ? todayRecord.attendanceStage : 'not_started'
        }
      };
    });

    return res.json({
      success: true,
      count: enrichedEmployees.length,
      employees: enrichedEmployees
    });
  } catch (error) {
    console.error('Get employees error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc   Update Employee Details
 * @route  PUT /api/owner/employees/:id
 * @access Private (Owner)
 */
export async function updateEmployee(req, res) {
  try {
    const { name, domain, phone, status, password, employmentType, shiftHours } = req.body;
    const employee = await User.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    if (name) employee.name = name.trim();
    if (domain) employee.domain = domain;
    if (phone !== undefined) employee.phone = phone;
    if (status) employee.status = status;
    if (employmentType) {
      employee.employmentType = employmentType;
      employee.shiftHours = employmentType === 'part_time' ? 4 : 8;
    }
    if (shiftHours) employee.shiftHours = Number(shiftHours);
    if (password && password.length >= 6) {
      employee.password = password; // pre-save will rehash
    }

    await employee.save();

    return res.json({
      success: true,
      message: 'Employee updated successfully',
      employee: {
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        domain: employee.domain,
        employeeId: employee.employeeId,
        phone: employee.phone,
        employmentType: employee.employmentType,
        shiftHours: employee.shiftHours,
        status: employee.status
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc   Delete / Deactivate Employee
 * @route  DELETE /api/owner/employees/:id
 * @access Private (Owner)
 */
export async function deleteEmployee(req, res) {
  try {
    const employee = await User.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    if (employee.role === 'owner') {
      return res.status(403).json({ success: false, message: 'Cannot delete owner account' });
    }

    await User.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Employee account removed' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * ==========================================
 * LEAVE APPROVAL & NODEMAILER NOTIFICATIONS
 * ==========================================
 */

/**
 * @desc   Get All Leaves with Optional Status Filter
 * @route  GET /api/owner/leaves
 * @access Private (Owner)
 */
export async function getAllLeaves(req, res) {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const leaves = await Leave.find(filter)
      .populate('user', 'name email domain employeeId phone')
      .populate('reviewedBy', 'name')
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: leaves.length,
      data: leaves
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc   Approve or Reject Leave (Marks Attendance & Dispatches Email)
 * @route  PUT /api/owner/leaves/:id/status
 * @access Private (Owner)
 */
export async function updateLeaveStatus(req, res) {
  try {
    const { status, reviewNotes } = req.body; // status: 'approved' | 'rejected'

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either 'approved' or 'rejected'"
      });
    }

    const leave = await Leave.findById(req.params.id).populate('user', 'name email domain');

    if (!leave) {
      return res.status(404).json({ success: false, message: 'Leave request not found' });
    }

    leave.status = status;
    leave.reviewedBy = req.user._id;
    leave.reviewedAt = new Date();
    if (reviewNotes) leave.reviewNotes = reviewNotes.trim();

    await leave.save();

    // If APPROVED, mark attendance for all days in the date range as 'leave'
    let datesMarked = [];
    if (status === 'approved') {
      datesMarked = getDateRangeArray(leave.startDate, leave.endDate);

      for (const dateStr of datesMarked) {
        await Attendance.findOneAndUpdate(
          { user: leave.user._id, date: dateStr },
          {
            user: leave.user._id,
            date: dateStr,
            status: 'leave',
            workSummary: `Approved Leave (${leave.type}): ${leave.reason}`,
            leaveRef: leave._id
          },
          { upsert: true, new: true }
        );
      }
    }

    // Send notification email to employee via Nodemailer
    const emailResult = await sendLeaveStatusEmail({
      to: leave.user.email,
      name: leave.user.name,
      status,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason,
      reviewNotes: reviewNotes || ''
    });

    return res.json({
      success: true,
      message: `Leave request has been ${status}. Notification email sent to ${leave.user.email}.`,
      datesMarked: datesMarked.length,
      emailDelivered: emailResult.success,
      simulatedEmail: emailResult.simulated || false,
      leave
    });
  } catch (error) {
    console.error('Update leave status error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * ==========================================
 * DAILY ATTENDANCE & WORK OVERSIGHT
 * ==========================================
 */

/**
 * @desc   Get Attendance & Daily Descriptions for Any Given Date
 * @route  GET /api/owner/attendance/daily
 * @access Private (Owner)
 */
export async function getDailyAttendanceOversight(req, res) {
  try {
    const selectedDate = req.query.date || getLocalDateString();

    const employees = await User.find({ role: 'employee' }).select('name email domain employeeId status employmentType shiftHours');
    const records = await Attendance.find({ date: selectedDate });

    const oversight = employees.map(emp => {
      const rec = records.find(r => r.user.toString() === emp._id.toString());
      return {
        employee: emp,
        hasLogged: !!rec,
        status: rec ? rec.status : 'not_logged',
        workSummary: rec ? rec.workSummary : '',
        morningNotes: rec ? rec.morningNotes : '',
        clockInTime: rec ? rec.clockInTime : null,
        clockOutTime: rec ? rec.clockOutTime : null,
        totalHours: rec ? rec.totalHours : 0,
        shiftType: rec?.shiftType || emp.employmentType || 'full_time',
        attendanceStage: rec?.attendanceStage || (rec ? 'clocked_out' : 'not_started'),
        updatedAt: rec ? rec.updatedAt : null
      };
    });

    const presentCount = oversight.filter(o => o.status === 'present').length;
    const leaveCount = oversight.filter(o => o.status === 'leave').length;
    const pendingCount = oversight.filter(o => o.status === 'not_logged').length;

    return res.json({
      success: true,
      date: selectedDate,
      summary: {
        totalEmployees: employees.length,
        presentCount,
        leaveCount,
        pendingCount,
        turnoutPercentage: employees.length > 0 ? Math.round((presentCount / employees.length) * 100) : 0
      },
      oversight
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * ==========================================
 * ANALYTICS & CIRCULAR GRAPH METRICS
 * ==========================================
 */

/**
 * @desc   Comprehensive Company & Website Analytics for Circular and Metric Charts
 * @route  GET /api/owner/analytics
 * @access Private (Owner)
 */
export async function getCompanyAnalytics(req, res) {
  try {
    const today = new Date();
    const todayStr = getLocalDateString(today);
    const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;

    // 1. Employee Counts
    const totalEmployees = await User.countDocuments({ role: 'employee' });
    const activeEmployees = await User.countDocuments({ role: 'employee', status: 'active' });

    // 2. Domain Distribution (for Circular Donut Graph)
    const domainCounts = await User.aggregate([
      { $match: { role: 'employee' } },
      { $group: { _id: '$domain', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const domainDistribution = domainCounts.map(item => ({
      domain: item._id || 'Unassigned',
      count: item.count,
      percentage: totalEmployees > 0 ? Math.round((item.count / totalEmployees) * 100) : 0
    }));

    // 3. Today Attendance Stats (for Circular Donut Graph)
    const todayRecords = await Attendance.find({ date: todayStr });
    const presentToday = todayRecords.filter(r => r.status === 'present').length;
    const leaveToday = todayRecords.filter(r => r.status === 'leave').length;
    const halfDayToday = todayRecords.filter(r => r.status === 'half_day').length;
    const pendingToday = Math.max(0, totalEmployees - (presentToday + leaveToday + halfDayToday));

    const todayAttendanceDonut = [
      { label: 'Present', count: presentToday, color: '#C84523' },
      { label: 'Approved Leave', count: leaveToday, color: '#D4A373' },
      { label: 'Half Day', count: halfDayToday, color: '#E9C46A' },
      { label: 'Pending Log', count: pendingToday, color: '#8E7A70' }
    ];

    // 4. Pending Leave Requests Count
    const pendingLeavesCount = await Leave.countDocuments({ status: 'pending' });

    // 5. Website Frontend Inquiries Stats
    const totalInquiries = await Inquiry.countDocuments();
    const newInquiries = await Inquiry.countDocuments({ status: 'new' });
    const inProgressInquiries = await Inquiry.countDocuments({ status: 'in_progress' });
    const resolvedInquiries = await Inquiry.countDocuments({ status: 'resolved' });

    // 6. Services Count
    const totalServices = await Service.countDocuments();
    const activeServices = await Service.countDocuments({ isActive: true });

    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      employees: {
        total: totalEmployees,
        active: activeEmployees,
        inactive: totalEmployees - activeEmployees
      },
      domainDistribution,
      todayAttendance: {
        date: todayStr,
        present: presentToday,
        leave: leaveToday,
        pending: pendingToday,
        turnoutPercentage: totalEmployees > 0 ? Math.round((presentToday / totalEmployees) * 100) : 0,
        donutSegments: todayAttendanceDonut
      },
      leaves: {
        pendingRequests: pendingLeavesCount
      },
      website: {
        totalInquiries,
        newInquiries,
        inProgressInquiries,
        resolvedInquiries,
        totalServices,
        activeServices
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * ==========================================
 * FRONTEND WEBSITE CONTROL (INQUIRIES & SERVICES)
 * ==========================================
 */

/**
 * @desc   Get All Website Inquiries with Filtering
 * @route  GET /api/owner/site/inquiries
 * @access Private (Owner)
 */
export async function getSiteInquiries(req, res) {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc   Update Inquiry Status (new -> contacted -> in_progress -> resolved)
 * @route  PUT /api/owner/site/inquiries/:id
 * @access Private (Owner)
 */
export async function updateInquiryStatus(req, res) {
  try {
    const { status, notes } = req.body;
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    if (status) inquiry.status = status;
    if (notes !== undefined) inquiry.notes = notes;

    await inquiry.save();
    return res.json({ success: true, message: 'Inquiry updated successfully', data: inquiry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc   Delete Inquiry
 * @route  DELETE /api/owner/site/inquiries/:id
 * @access Private (Owner)
 */
export async function deleteInquiry(req, res) {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Inquiry removed' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

