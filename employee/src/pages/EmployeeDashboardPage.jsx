import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  fetchTodayLog,
  submitDailyWorkLog,
  fetchMonthlyAttendance,
  applyLeave,
  fetchMyLeaves,
  clockIn,
  clockOut
} from '../services/employeeApi';
import CircularGauge from '../components/charts/CircularGauge';
import AttendanceCalendarGrid from '../components/attendance/AttendanceCalendarGrid';
import AttendanceBarChart from '../components/charts/AttendanceBarChart';
import confetti from 'canvas-confetti';
import {
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Lock,
  Send,
  PlusCircle,
  FileText,
  TrendingUp,
  ShieldCheck,
  CalendarCheck2,
  CheckSquare,
  Square,
  Megaphone,
  User,
  Trash2,
  Sparkles,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  Briefcase,
  Sun,
  Moon,
  Edit3,
  RefreshCw
} from 'lucide-react';
import { ENV } from '../config/env';

export default function EmployeeDashboardPage({
  activeTab: propActiveTab,
  setActiveTab: propSetActiveTab,
  isLeaveModalOpen: propIsLeaveOpen,
  setIsLeaveModalOpen: propSetIsLeaveOpen,
  onStatusChange,
  onLeavesCountChange
}) {
  const { user } = useAuth();

  const [localActiveTab, setLocalActiveTab] = useState('dashboard');
  const activeTab = propActiveTab !== undefined ? propActiveTab : localActiveTab;
  const setActiveTab = propSetActiveTab !== undefined ? propSetActiveTab : setLocalActiveTab;

  const [localIsLeaveModalOpen, setLocalIsLeaveModalOpen] = useState(false);
  const isLeaveModalOpen = propIsLeaveOpen !== undefined ? propIsLeaveOpen : localIsLeaveModalOpen;
  const setIsLeaveModalOpen = propSetIsLeaveOpen !== undefined ? propSetIsLeaveOpen : setLocalIsLeaveModalOpen;

  const getTodayStr = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const todayStr = getTodayStr();
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const isSelectedDateToday = selectedDate === todayStr;
  const isPastDate = selectedDate < todayStr;
  const isFutureDate = selectedDate > todayStr;

  // Work log state
  const [workSummary, setWorkSummary] = useState('');
  const [logStatus, setLogStatus] = useState('present');
  const [isSubmittingLog, setIsSubmittingLog] = useState(false);
  const [logMessage, setLogMessage] = useState({ text: '', type: '' });

  const getCurrentTimeFormatted = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Morning Clock-In & Evening Clock-Out State
  const [clockInTime, setClockInTime] = useState('');
  const [editableClockInTime, setEditableClockInTime] = useState(() => getCurrentTimeFormatted());
  const [morningNotes, setMorningNotes] = useState('');

  const [clockOutTime, setClockOutTime] = useState('');
  const [editableClockOutTime, setEditableClockOutTime] = useState(() => getCurrentTimeFormatted());

  const [totalHours, setTotalHours] = useState(0);
  const [attendanceStage, setAttendanceStage] = useState('not_started'); // 'not_started' | 'clocked_in' | 'clocked_out'
  const [shiftType, setShiftType] = useState('full_time'); // 'full_time' (8h) or 'part_time' (4h)
  const [shiftHours, setShiftHours] = useState(8);
  const [isClockingIn, setIsClockingIn] = useState(false);
  const [isClockingOut, setIsClockingOut] = useState(false);

  // Monthly stats state
  const currentMonthStr = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
  const [selectedMonth, setSelectedMonth] = useState(currentMonthStr);
  const [monthlyData, setMonthlyData] = useState({
    summary: {
      totalDaysInMonth: 30,
      elapsedDays: 1,
      totalWorkingDays: 1,
      presentDays: 0,
      leaveDays: 0,
      attendancePercentage: 0
    },
    records: []
  });

  // Leave state
  const [leavesList, setLeavesList] = useState([]);
  const [leaveForm, setLeaveForm] = useState({
    startDate: todayStr,
    endDate: todayStr,
    reason: '',
    type: 'casual'
  });
  const [isSubmittingLeave, setIsSubmittingLeave] = useState(false);
  const [leaveMessage, setLeaveMessage] = useState({ text: '', type: '' });

  // Daily Tasks Checklist State
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('pixelix_employee_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 'tsk-1', title: 'Upload Amazon A+ Content for AromaKraft', category: 'E-Commerce', priority: 'high', completed: true },
      { id: 'tsk-2', title: 'Verify Meesho Safe-T Claims & Returns Sheet', category: 'Dispatch', priority: 'urgent', completed: false },
      { id: 'tsk-3', title: 'Export 5 Vector Logo PDF assets for Client Review', category: 'Design', priority: 'normal', completed: true },
      { id: 'tsk-4', title: 'Push React 3D Sunset Component build to staging', category: 'Development', priority: 'high', completed: false },
      { id: 'tsk-5', title: 'Submit Daily Work Log before 7:00 PM', category: 'Admin', priority: 'urgent', completed: false }
    ];
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('General');
  const [newTaskPriority, setNewTaskPriority] = useState('normal');

  // Company Announcements (Synced from Admin)
  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('pixelix_admin_announcements');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'ann-1',
        title: 'Diwali & Festive Delivery Schedules for Marketplace Sellers',
        category: 'Holiday Notice',
        target: 'All Personnel',
        date: '2026-10-30',
        isPinned: true,
        content: 'All Amazon & Flipkart listing batches must be submitted by 5 PM to guarantee carrier pickup. Telecalling team will operate until 7 PM.'
      },
      {
        id: 'ann-2',
        title: 'Q4 Performance Incentive Plan Announcement',
        category: 'Bonus & Incentives',
        target: 'All Personnel',
        date: '2026-10-28',
        isPinned: true,
        content: 'Pixelix is introducing monthly performance bonuses for error-free marketplace catalogs and rapid website milestone deliveries.'
      },
      {
        id: 'ann-3',
        title: 'New 3D Web & React Optimization Standards',
        category: 'Guidelines',
        target: 'Developers',
        date: '2026-10-25',
        isPinned: false,
        content: 'Please ensure all Three.js canvas contexts dispose geometry and materials on unmount to optimize client browser RAM.'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('pixelix_employee_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    loadTodayLog();
    loadAttendance(selectedMonth);
    loadLeaves();
  }, [selectedMonth]);

  const loadTodayLog = async () => {
    try {
      const data = await fetchTodayLog();
      if (data.employmentType) setShiftType(data.employmentType);
      if (data.shiftHours) setShiftHours(data.shiftHours);
      if (data.record) {
        setWorkSummary(data.record.workSummary || '');
        setMorningNotes(data.record.morningNotes || '');
        setLogStatus(data.record.status || 'present');
        setClockInTime(data.record.clockInTime || '');
        setEditableClockInTime(data.record.clockInTime || getCurrentTimeFormatted());
        setClockOutTime(data.record.clockOutTime || '');
        setEditableClockOutTime(data.record.clockOutTime || getCurrentTimeFormatted());
        setTotalHours(data.record.totalHours || 0);
        const stage = data.record.attendanceStage || (data.record.clockOutTime ? 'clocked_out' : data.record.clockInTime ? 'clocked_in' : 'not_started');
        setAttendanceStage(stage);
        if (data.record.shiftType) setShiftType(data.record.shiftType);
        if (onStatusChange) onStatusChange(stage === 'clocked_out' ? 'present' : 'clocked_in');
      } else {
        setClockInTime('');
        setEditableClockInTime(getCurrentTimeFormatted());
        setClockOutTime('');
        setEditableClockOutTime(getCurrentTimeFormatted());
        setMorningNotes('');
        setTotalHours(0);
        setAttendanceStage('not_started');
        if (onStatusChange) onStatusChange('pending');
      }
    } catch (e) {
      console.warn('Failed to load today log', e);
    }
  };

  const handleClockIn = async () => {
    setIsClockingIn(true);
    setLogMessage({ text: '', type: '' });
    const timeToSend = (editableClockInTime || '').trim() || getCurrentTimeFormatted();
    const res = await clockIn({
      clockInTime: timeToSend,
      morningNotes: morningNotes.trim()
    });
    setIsClockingIn(false);
    if (res.ok) {
      setAttendanceStage('clocked_in');
      const recordedTime = res.data?.clockInTime || timeToSend;
      setClockInTime(recordedTime);
      setEditableClockInTime(recordedTime);
      setLogMessage({
        text: res.message || `Morning punch-in recorded at ${recordedTime}! You are now eligible to punch out.`,
        type: 'success'
      });
      if (onStatusChange) onStatusChange('clocked_in');
      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
      } catch (err) {}
      loadAttendance(selectedMonth);
    } else {
      setLogMessage({ text: res.message || 'Failed to punch in.', type: 'error' });
    }
  };

  const handleClockOut = async () => {
    if (!workSummary.trim()) {
      setLogMessage({
        text: 'Please write your completed work summary inside the evening card before punching out.',
        type: 'error'
      });
      return;
    }
    setIsClockingOut(true);
    setLogMessage({ text: '', type: '' });
    const timeToSend = (editableClockOutTime || '').trim() || getCurrentTimeFormatted();
    const res = await clockOut({
      clockOutTime: timeToSend,
      workSummary: workSummary.trim()
    });
    setIsClockingOut(false);
    if (res.ok) {
      setAttendanceStage('clocked_out');
      const recordedOutTime = res.data?.clockOutTime || timeToSend;
      setClockOutTime(recordedOutTime);
      setEditableClockOutTime(recordedOutTime);
      if (res.data?.totalHours !== undefined) setTotalHours(res.data.totalHours);
      if (res.data?.status) setLogStatus(res.data.status);
      setLogMessage({
        text: res.message || `Evening punch-out completed at ${recordedOutTime}! Attendance locked.`,
        type: 'success'
      });
      if (onStatusChange) onStatusChange('present');
      try {
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      } catch (err) {}
      loadAttendance(selectedMonth);
    } else {
      setLogMessage({ text: res.message || 'Failed to punch out.', type: 'error' });
    }
  };

  const loadAttendance = async (month) => {
    try {
      const data = await fetchMonthlyAttendance(month);
      if (data && data.summary) {
        setMonthlyData(data);
      }
    } catch (e) {
      console.warn('Attendance load error', e);
    }
  };

  const loadLeaves = async () => {
    try {
      const data = await fetchMyLeaves();
      setLeavesList(data);
      const pendingCount = data.filter(l => l.status === 'pending').length;
      if (onLeavesCountChange) onLeavesCountChange(pendingCount);
    } catch (e) {
      console.warn('Leaves load error', e);
    }
  };

  // Synchronize timesheet records with approved leaves for full visibility
  const displayTableRecords = React.useMemo(() => {
    const list = [...(monthlyData.records || [])];
    const existingDates = new Set(list.map((r) => r.date));

    if (selectedMonth && leavesList && leavesList.length > 0) {
      leavesList
        .filter((l) => l.status === 'approved')
        .forEach((leave) => {
          const start = new Date(leave.startDate + 'T00:00:00');
          const end = new Date(leave.endDate + 'T00:00:00');
          for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
            const y = dt.getFullYear();
            const m = String(dt.getMonth() + 1).padStart(2, '0');
            const d = String(dt.getDate()).padStart(2, '0');
            const dStr = `${y}-${m}-${d}`;
            if (dStr.startsWith(selectedMonth) && !existingDates.has(dStr)) {
              existingDates.add(dStr);
              list.push({
                date: dStr,
                shiftType,
                clockInTime: '',
                clockOutTime: '',
                totalHours: 0,
                status: 'leave',
                workSummary: `Official Leave Approved (${leave.type || 'Casual'}): ${leave.reason || 'Granted by Admin'}`
              });
            }
          }
        });
    }

    return list.sort((a, b) => b.date.localeCompare(a.date));
  }, [monthlyData.records, leavesList, selectedMonth, shiftType]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setLogMessage({ text: '', type: '' });

    if (newDate === todayStr) {
      loadTodayLog();
    } else {
      const match = monthlyData.records.find(r => r.date === newDate);
      if (match) {
        setWorkSummary(match.workSummary || '');
        setMorningNotes(match.morningNotes || '');
        setClockInTime(match.clockInTime || '');
        setEditableClockInTime(match.clockInTime || '');
        setClockOutTime(match.clockOutTime || '');
        setEditableClockOutTime(match.clockOutTime || '');
        setTotalHours(match.totalHours || 0);
        setAttendanceStage(match.attendanceStage || (match.clockOutTime ? 'clocked_out' : match.clockInTime ? 'clocked_in' : 'not_started'));
        setLogStatus(match.status || 'present');
      } else {
        setWorkSummary('');
        setMorningNotes('');
        setClockInTime('');
        setEditableClockInTime('');
        setClockOutTime('');
        setEditableClockOutTime('');
        setTotalHours(0);
        setAttendanceStage('not_started');
        setLogStatus('present');
      }
    }
  };

  const handleLogSubmit = async (e) => {
    e.preventDefault();

    if (!workSummary.trim()) {
      setLogMessage({ text: 'Please enter a description of what you accomplished today.', type: 'error' });
      return;
    }

    if (!isSelectedDateToday) {
      setLogMessage({ text: 'Cannot edit past date records. Past logs are permanently locked.', type: 'error' });
      return;
    }

    setIsSubmittingLog(true);
    setLogMessage({ text: '', type: '' });

    const res = await submitDailyWorkLog({
      date: selectedDate,
      workSummary: workSummary.trim(),
      status: logStatus
    });

    setIsSubmittingLog(false);

    if (res.ok) {
      setLogMessage({
        text: res.message || 'Daily work summary and attendance recorded successfully!',
        type: 'success'
      });
      if (onStatusChange) onStatusChange('present');
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      } catch (err) {}
      loadAttendance(selectedMonth);
    } else {
      setLogMessage({
        text: res.message || 'Failed to submit daily work log.',
        type: 'error'
      });
    }
  };

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    if (!leaveForm.reason.trim()) {
      setLeaveMessage({ text: 'Please provide a valid reason for leave.', type: 'error' });
      return;
    }

    setIsSubmittingLeave(true);
    setLeaveMessage({ text: '', type: '' });

    const res = await applyLeave(leaveForm);
    setIsSubmittingLeave(false);

    if (res.ok) {
      setLeaveMessage({
        text: 'Leave application submitted successfully! Awaiting owner confirmation.',
        type: 'success'
      });
      setLeaveForm({
        startDate: todayStr,
        endDate: todayStr,
        reason: '',
        type: 'casual'
      });
      loadLeaves();
      setTimeout(() => {
        setIsLeaveModalOpen(false);
        setLeaveMessage({ text: '', type: '' });
      }, 1500);
    } else {
      setLeaveMessage({ text: res.message || 'Failed to submit leave.', type: 'error' });
    }
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const next = !t.completed;
        if (next) {
          try { confetti({ particleCount: 25, spread: 40 }); } catch (e) {}
        }
        return { ...t, completed: next };
      }
      return t;
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const task = {
      id: `tsk-${Date.now()}`,
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      priority: newTaskPriority,
      completed: false
    };

    setTasks([...tasks, task]);
    setNewTaskTitle('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const summary = monthlyData.summary || {};
  const completedTasksCount = tasks.filter(t => t.completed).length;
  const taskProgress = tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-6">

      {/* ========================================================
          TAB 1: WORKSPACE DASHBOARD OVERVIEW
         ======================================================== */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6 animate-fade-in">
          {/* Welcome Profile Banner */}
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-terracotta-500 to-amber-500 text-white flex items-center justify-center font-bold text-2xl shadow-sm">
                {user?.name?.charAt(0) || 'E'}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-espresso-900 dark:text-cream-100 font-serif">
                    Welcome back, {user?.name || 'Staff Member'}!
                  </h2>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-terracotta-100 dark:bg-terracotta-900/60 text-terracotta-700 dark:text-terracotta-300 border border-terracotta-200 dark:border-terracotta-800">
                    {user?.domain || 'General Staff'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-espresso-500 dark:text-cream-400 mt-1 flex flex-wrap items-center gap-3">
                  <span><strong>ID:</strong> {user?.employeeId || 'PX-EMP-1001'}</span>
                  <span>•</span>
                  <span><strong>Email:</strong> {user?.email}</span>
                  <span>•</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Active Staff Roster
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('work-log')}
                className="px-4 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                {!clockInTime ? (
                  <>
                    <Sun className="w-4 h-4" />
                    <span>Punch In (Morning)</span>
                  </>
                ) : !clockOutTime ? (
                  <>
                    <Moon className="w-4 h-4" />
                    <span>Eligible to Punch Out</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Shift Completed ({totalHours}h)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Key Metric Stats & Circular Gauge */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gauge Column */}
            <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 shadow-xs flex flex-col items-center justify-center text-center">
              <h3 className="text-sm font-bold text-espresso-900 dark:text-cream-100 mb-2">
                Monthly Turnout Reliability
              </h3>
              <CircularGauge
                value={summary.attendancePercentage || 0}
                label="Attendance Rate"
                color="#C84523"
                size={170}
              />
              <p className="text-xs text-espresso-500 dark:text-cream-400 mt-3">
                Calculated across {summary.totalWorkingDays || 1} billable working days
              </p>
            </div>

            {/* Quick Metrics (2 cols) */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase font-bold text-espresso-500 block mb-1">
                    Present Days
                  </span>
                  <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                    {summary.presentDays || 0} Days
                  </span>
                </div>
                <p className="text-xs text-espresso-400 mt-2">Verified work summaries logged</p>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase font-bold text-espresso-500 block mb-1">
                    Approved Leaves
                  </span>
                  <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                    {summary.leaveDays || 0} Days
                  </span>
                </div>
                <p className="text-xs text-espresso-400 mt-2">Signed off by management</p>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase font-bold text-espresso-500 block mb-1">
                    Working Days Elapsed
                  </span>
                  <span className="text-3xl font-extrabold text-espresso-900 dark:text-cream-100 font-mono">
                    {summary.elapsedDays || 1} / {summary.totalDaysInMonth || 30}
                  </span>
                </div>
                <p className="text-xs text-espresso-400 mt-2">Days elapsed this calendar month</p>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase font-bold text-espresso-500 block mb-1">
                    Daily Task Progress
                  </span>
                  <span className="text-3xl font-extrabold text-terracotta-600 dark:text-terracotta-400 font-mono">
                    {taskProgress}%
                  </span>
                </div>
                <p className="text-xs text-espresso-400 mt-2">
                  {completedTasksCount} of {tasks.length} deliverables checked off
                </p>
              </div>
            </div>
          </div>

          {/* Quick Announcement Banner */}
          {announcements.length > 0 && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-terracotta-600 via-amber-600 to-terracotta-700 text-white shadow-md flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-white" />
                  <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                    Agency Notice
                  </span>
                </div>
                <h4 className="font-bold text-base font-serif">{announcements[0].title}</h4>
                <p className="text-xs text-white/90 leading-relaxed max-w-3xl">
                  {announcements[0].content}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('notice-board')}
                className="px-3.5 py-2 rounded-xl bg-white text-terracotta-700 font-bold text-xs shrink-0 hover:bg-cream-100 transition-colors"
              >
                View All
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          TAB 2: DAILY WORK LOG & CHECK-IN
         ======================================================== */}
      {activeTab === 'work-log' && (
        <div className="space-y-6 animate-fade-in">
          {/* Header */}
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                <Clock className="w-5 h-5 text-terracotta-500" />
                Daily Work Summary & Mandatory Check-in
              </h3>
              <p className="text-xs text-espresso-500 dark:text-cream-400">
                Log completed tasks, marketplace listings, and code deliverables for daily attendance credit
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-espresso-700 dark:text-cream-300">
                Log Date:
              </label>
              <input
                type="date"
                value={selectedDate}
                max={todayStr}
                onChange={(e) => handleDateChange(e.target.value)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-espresso-900 dark:text-cream-100 focus:outline-none"
              />
            </div>
          </div>

          {/* Feedback Toast */}
          {logMessage.text && (
            <div
              className={`p-4 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all shadow-xs ${
                logMessage.type === 'success'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border border-red-300'
              }`}
            >
              {logMessage.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}
              <span>{logMessage.text}</span>
            </div>
          )}

          {/* Shift Badge & Dual-Punch Info */}
          <div className="p-4 sm:p-5 rounded-3xl bg-cream-50 dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-terracotta-100 dark:bg-terracotta-900/40 text-terracotta-600 dark:text-terracotta-400 flex items-center justify-center font-bold shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-espresso-500 dark:text-cream-400">
                    Your Assigned Shift:
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-terracotta-500 text-white shadow-2xs">
                    {shiftHours || (shiftType === 'part_time' ? 4 : 8)}h · {shiftType === 'part_time' ? 'Part-Time' : 'Full-Time'}
                  </span>
                </div>
                <p className="text-[11px] text-espresso-600 dark:text-cream-300 mt-0.5">
                  {shiftType === 'part_time'
                    ? '4-hour shift schedule. Complete ≥ 3.5 hrs to earn full-day present credit.'
                    : '8-hour shift schedule. Complete ≥ 7.5 hrs to earn full-day present credit (≥ 3.5 hrs for half day).'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                attendanceStage === 'clocked_out'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : attendanceStage === 'clocked_in'
                  ? 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
              }`}>
                {attendanceStage === 'clocked_out'
                  ? '✓ Shift Completed & Present'
                  : attendanceStage === 'clocked_in'
                  ? '● On-Duty · Clocked In'
                  : '⏳ Pending Morning Clock-In'}
              </span>
            </div>
          </div>

          {/* DUAL PUNCH STATION (Morning Punch In + Evening Punch Out) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CARD 1: MORNING PUNCH-IN */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shadow-2xs">
                      <Sun className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-1.5">
                        <span>Step 1: Morning Punch-In</span>
                      </h4>
                      <p className="text-[11px] text-espresso-400">Punch in before starting daily tasks</p>
                    </div>
                  </div>
                  {clockInTime ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[11px] font-mono font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{clockInTime}</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-[10px] font-bold">
                      Action Required
                    </span>
                  )}
                </div>

                {/* Current Editable Time Section */}
                <div className="p-3.5 rounded-2xl bg-cream-50 dark:bg-darkbg-base border border-cream-200 dark:border-darkbg-border space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-espresso-700 dark:text-cream-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-terracotta-500" />
                      <span>Punch-In Time (Editable)</span>
                    </label>
                    {!clockInTime && (
                      <button
                        type="button"
                        onClick={() => setEditableClockInTime(getCurrentTimeFormatted())}
                        className="text-[10px] font-bold text-terracotta-600 dark:text-terracotta-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Set to Now</span>
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      disabled={!isSelectedDateToday || isPastDate || !!clockInTime}
                      value={editableClockInTime}
                      onChange={(e) => setEditableClockInTime(e.target.value)}
                      placeholder="e.g. 09:30 AM"
                      className="w-full px-3.5 py-2 rounded-xl border border-cream-300 dark:border-darkbg-border bg-white dark:bg-darkbg-card font-mono text-sm font-bold text-espresso-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-terracotta-500 disabled:opacity-80"
                    />
                  </div>
                  <p className="text-[10px] text-espresso-400">
                    Pre-filled with current time. You can edit this timestamp if your work started earlier.
                  </p>
                </div>

                {/* Description / Morning Plan directly in Card 1 */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-espresso-700 dark:text-cream-300">
                    Morning Plan & Description (In Card)
                  </label>
                  <textarea
                    rows={3}
                    disabled={!isSelectedDateToday || isPastDate || !!clockInTime}
                    value={morningNotes}
                    onChange={(e) => setMorningNotes(e.target.value)}
                    placeholder="Brief description of today's morning plan (e.g. 20 Amazon listings for Client X, React 3D bugfix, 4 outreach calls)..."
                    className="w-full p-3 rounded-2xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-terracotta-500 leading-relaxed disabled:opacity-80"
                  />
                </div>
              </div>

              {/* Button Area */}
              <div className="pt-2">
                {!clockInTime ? (
                  <button
                    type="button"
                    disabled={!isSelectedDateToday || isClockingIn}
                    onClick={handleClockIn}
                    className="w-full py-3 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
                  >
                    {isClockingIn ? (
                      <span>Recording Morning Punch...</span>
                    ) : (
                      <>
                        <Sun className="w-4 h-4" />
                        <span>Punch In Now (Morning)</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Clocked in at <strong>{clockInTime}</strong></span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded-full">
                      Eligible for Punch-Out →
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* CARD 2: EVENING PUNCH-OUT & WORK SUMMARY */}
            <div className={`p-6 sm:p-7 rounded-3xl bg-white dark:bg-darkbg-card border shadow-xs flex flex-col justify-between space-y-5 transition-all ${
              !clockInTime
                ? 'border-cream-200 dark:border-darkbg-border opacity-75'
                : 'border-terracotta-300/80 dark:border-terracotta-700/60'
            }`}>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold shadow-2xs">
                      <Moon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-1.5">
                        <span>Step 2: Evening Punch-Out</span>
                      </h4>
                      <p className="text-[11px] text-espresso-400">Submit deliverables & finalize attendance</p>
                    </div>
                  </div>
                  {clockOutTime ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[11px] font-mono font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{clockOutTime}</span>
                    </span>
                  ) : clockInTime ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-bold animate-pulse">
                      ● Eligible to Punch Out
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-cream-200 dark:bg-darkbg-base text-espresso-500 dark:text-cream-400 text-[10px] font-bold">
                      🔒 Locked
                    </span>
                  )}
                </div>

                {/* Locked Notice if NOT yet clocked in */}
                {!clockInTime ? (
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-300 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <Lock className="w-4 h-4 shrink-0" />
                      <span>Not Eligible for Punch-Out Yet</span>
                    </div>
                    <p className="text-[11px] text-amber-700 dark:text-amber-400">
                      You must record your Morning Punch-In (Step 1) before you become eligible to punch out in the evening.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Current Editable Evening Time Section */}
                    <div className="p-3.5 rounded-2xl bg-cream-50 dark:bg-darkbg-base border border-cream-200 dark:border-darkbg-border space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-espresso-700 dark:text-cream-300 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-terracotta-500" />
                          <span>Punch-Out Time (Editable)</span>
                        </label>
                        {!clockOutTime && (
                          <button
                            type="button"
                            onClick={() => setEditableClockOutTime(getCurrentTimeFormatted())}
                            className="text-[10px] font-bold text-terracotta-600 dark:text-terracotta-400 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Set to Now</span>
                          </button>
                        )}
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          disabled={!isSelectedDateToday || isPastDate || !!clockOutTime}
                          value={editableClockOutTime}
                          onChange={(e) => setEditableClockOutTime(e.target.value)}
                          placeholder="e.g. 06:30 PM"
                          className="w-full px-3.5 py-2 rounded-xl border border-cream-300 dark:border-darkbg-border bg-white dark:bg-darkbg-card font-mono text-sm font-bold text-espresso-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-terracotta-500 disabled:opacity-80"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-espresso-500 dark:text-cream-400">
                        <span>Shift Target: <strong>{shiftHours || (shiftType === 'part_time' ? 4 : 8)}h ({shiftType === 'part_time' ? 'Part-Time' : 'Full-Time'})</strong></span>
                        {totalHours > 0 && <span className="font-mono font-bold text-terracotta-600 dark:text-terracotta-400">Total: {totalHours} hrs</span>}
                      </div>
                    </div>

                    {/* Description / Completed Deliverables Work Summary directly in Card 2 */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-espresso-700 dark:text-cream-300">
                          Evening Work Summary Description (In Card)
                        </label>
                        <span className="text-[10px] text-terracotta-600 dark:text-terracotta-400 font-bold">
                          Required for Punch-Out
                        </span>
                      </div>
                      <textarea
                        rows={4}
                        disabled={!isSelectedDateToday || isPastDate}
                        value={workSummary}
                        onChange={(e) => setWorkSummary(e.target.value)}
                        placeholder="List what you accomplished today (e.g. Uploaded 20 Amazon listings, processed Flipkart returns, created 5 social creatives, answered client calls)..."
                        className="w-full p-3 rounded-2xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-terracotta-500 leading-relaxed disabled:opacity-80"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Button Area */}
              <div className="pt-2">
                {!clockInTime ? (
                  <div className="py-3 px-4 rounded-2xl bg-cream-100 dark:bg-darkbg-base border border-cream-200 dark:border-darkbg-border text-center text-xs font-semibold text-espresso-500">
                    🔒 Punch In in the Morning to Unlock Evening Punch-Out
                  </div>
                ) : !clockOutTime ? (
                  <button
                    type="button"
                    disabled={!isSelectedDateToday || isClockingOut || !workSummary.trim()}
                    onClick={handleClockOut}
                    className="w-full py-3 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
                  >
                    {isClockingOut ? (
                      <span>Recording Evening Punch...</span>
                    ) : (
                      <>
                        <Moon className="w-4 h-4" />
                        <span>Punch Out & Submit Daily Attendance</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Clocked out at <strong>{clockOutTime}</strong> ({totalHours}h worked)</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/50 px-2.5 py-0.5 rounded-full">
                      {logStatus === 'present' ? 'Present (Full Day)' : 'Half Day'}
                    </span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: MONTHLY TIMESHEETS & ATTENDANCE CALENDAR
         ======================================================== */}
      {activeTab === 'attendance' && (
        <div className="space-y-6 animate-fade-in">
          {/* Square Monthly Attendance Calendar Grid */}
          <AttendanceCalendarGrid
            selectedMonth={selectedMonth}
            onMonthChange={(newMonth) => {
              setSelectedMonth(newMonth);
              loadAttendance(newMonth);
            }}
            records={monthlyData.records || []}
            leavesList={leavesList || []}
            shiftType={shiftType}
            targetHours={shiftHours}
          />

          {/* Calendar Day-by-Day Table */}
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl overflow-hidden shadow-xs">
            <div className="p-5 sm:p-6 border-b border-cream-200 dark:border-darkbg-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-sm text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-terracotta-500" />
                  Monthly Detailed Timesheet ({selectedMonth})
                </h4>
                <p className="text-xs text-espresso-500 dark:text-cream-400">
                  Itemized morning punch-ins, evening checkouts, deliverables summaries, and leave approvals
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cream-100 dark:bg-darkbg-base text-espresso-700 dark:text-cream-300 border border-cream-200 dark:border-darkbg-border self-start sm:self-auto">
                {displayTableRecords.length} recorded {displayTableRecords.length === 1 ? 'day' : 'days'}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-cream-100 dark:bg-darkbg-elevated border-b border-cream-200 dark:border-darkbg-border text-espresso-600 dark:text-cream-300 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Date</th>
                    <th className="p-4">Shift Type</th>
                    <th className="p-4">Morning In</th>
                    <th className="p-4">Evening Out</th>
                    <th className="p-4">Total Worked</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Work Summary Recorded</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-200 dark:divide-darkbg-border">
                  {displayTableRecords.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-espresso-400 italic">
                        No recorded logs for {selectedMonth}.
                      </td>
                    </tr>
                  ) : (
                    displayTableRecords.map((rec) => (
                      <tr key={rec.date} className="hover:bg-cream-50 dark:hover:bg-darkbg-base/40">
                        <td className="p-4 font-mono font-bold text-espresso-900 dark:text-cream-100 whitespace-nowrap">
                          {rec.date}
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cream-200 dark:bg-darkbg-base text-espresso-700 dark:text-cream-300 border border-cream-300 dark:border-darkbg-border">
                            {rec.shiftType === 'part_time' ? '4h Part-Time' : '8h Full-Time'}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-espresso-700 dark:text-cream-300 whitespace-nowrap">
                          {rec.clockInTime ? (
                            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{rec.clockInTime}</span>
                          ) : (
                            <span className="text-espresso-400 italic">—</span>
                          )}
                        </td>
                        <td className="p-4 font-mono text-espresso-700 dark:text-cream-300 whitespace-nowrap">
                          {rec.clockOutTime ? (
                            <span className="text-indigo-700 dark:text-indigo-400 font-semibold">{rec.clockOutTime}</span>
                          ) : (
                            <span className="text-espresso-400 italic">—</span>
                          )}
                        </td>
                        <td className="p-4 font-mono font-bold text-espresso-900 dark:text-cream-100 whitespace-nowrap">
                          {rec.totalHours ? `${rec.totalHours} hrs` : rec.clockOutTime ? 'Logged' : '—'}
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            rec.status === 'present'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : rec.status === 'leave'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                          }`}>
                            {rec.status === 'present' ? 'Present (Full)' : rec.status === 'leave' ? 'Approved Leave' : 'Half Day'}
                          </span>
                        </td>
                        <td className="p-4 text-espresso-700 dark:text-cream-300 max-w-xs truncate">
                          {rec.workSummary || <span className="italic text-espresso-400">No summary</span>}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: LEAVE APPLICATIONS & BALANCE
         ======================================================== */}
      {activeTab === 'leaves' && (
        <div className="space-y-6 animate-fade-in">
          {/* Header */}
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                <CalendarCheck2 className="w-5 h-5 text-terracotta-500" />
                Leave Applications & Absence Quota
              </h3>
              <p className="text-xs text-espresso-500 dark:text-cream-400">
                Submit leaves and track approvals with management review feedback
              </p>
            </div>
            <button
              onClick={() => setIsLeaveModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-sm active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              Apply For Leave
            </button>
          </div>

          {/* Leave Quota Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs">
              <span className="text-[11px] uppercase font-bold text-espresso-500 block mb-1">
                Casual Leave Quota
              </span>
              <span className="text-2xl font-extrabold text-espresso-900 dark:text-cream-100 font-mono">
                12 Days / Year
              </span>
              <p className="text-xs text-espresso-400 mt-1">For personal and family commitments</p>
            </div>
            <div className="p-5 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs">
              <span className="text-[11px] uppercase font-bold text-espresso-500 block mb-1">
                Sick / Medical Leave
              </span>
              <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                7 Days / Year
              </span>
              <p className="text-xs text-espresso-400 mt-1">Supported by doctor prescription</p>
            </div>
            <div className="p-5 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs">
              <span className="text-[11px] uppercase font-bold text-espresso-500 block mb-1">
                Emergency Absence
              </span>
              <span className="text-2xl font-extrabold text-terracotta-600 dark:text-terracotta-400 font-mono">
                Special Review
              </span>
              <p className="text-xs text-espresso-400 mt-1">Direct approval from founders</p>
            </div>
          </div>

          {/* Leaves History Table */}
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-cream-100 dark:bg-darkbg-elevated border-b border-cream-200 dark:border-darkbg-border text-espresso-600 dark:text-cream-300 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Start Date</th>
                    <th className="p-4">End Date</th>
                    <th className="p-4">Leave Type</th>
                    <th className="p-4">Reason Given</th>
                    <th className="p-4">Approval Status</th>
                    <th className="p-4">Owner Review Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-200 dark:divide-darkbg-border">
                  {leavesList.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-espresso-400 italic">
                        No leave applications submitted yet.
                      </td>
                    </tr>
                  ) : (
                    leavesList.map((leave) => (
                      <tr key={leave._id} className="hover:bg-cream-50 dark:hover:bg-darkbg-base/40">
                        <td className="p-4 font-mono font-bold text-espresso-900 dark:text-cream-100">
                          {leave.startDate}
                        </td>
                        <td className="p-4 font-mono font-bold text-espresso-900 dark:text-cream-100">
                          {leave.endDate}
                        </td>
                        <td className="p-4 capitalize font-semibold text-espresso-700 dark:text-cream-300">
                          {leave.type}
                        </td>
                        <td className="p-4 text-espresso-800 dark:text-cream-200 max-w-xs">
                          {leave.reason}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            leave.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : leave.status === 'rejected'
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 animate-pulse'
                          }`}>
                            {leave.status}
                          </span>
                        </td>
                        <td className="p-4 text-xs italic text-terracotta-600 dark:text-terracotta-400">
                          {leave.reviewNotes || <span className="text-espresso-400 not-italic">Pending review</span>}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 5: MY DAILY DELIVERABLES & TASKS
         ======================================================== */}
      {activeTab === 'tasks' && (
        <div className="space-y-6 animate-fade-in">
          {/* Header */}
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-terracotta-500" />
                My Daily Deliverables & Action Checklist
              </h3>
              <p className="text-xs text-espresso-500 dark:text-cream-400">
                Track personal deliverables for client projects, marketplace listings, and designs
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-espresso-700 dark:text-cream-300">
                {completedTasksCount} of {tasks.length} Completed ({taskProgress}%)
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-cream-200 dark:bg-darkbg-elevated h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-terracotta-500 to-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${taskProgress}%` }}
            />
          </div>

          {/* Add Task Input Form */}
          <form
            onSubmit={handleAddTask}
            className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs"
          >
            <input
              type="text"
              placeholder="Add a new deliverable (e.g. Design 5 Social Media Flyers)..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-1 min-w-[200px] px-3 py-2 rounded-xl text-xs bg-cream-50 dark:bg-darkbg-base border border-cream-300 dark:border-darkbg-border text-espresso-900 dark:text-cream-100 focus:outline-none"
            />
            <select
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-cream-50 dark:bg-darkbg-base border border-cream-300 dark:border-darkbg-border text-espresso-900 dark:text-cream-100 focus:outline-none"
            >
              <option value="E-Commerce">E-Commerce</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Dispatch">Dispatch</option>
              <option value="General">General</option>
            </select>
            <select
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-cream-50 dark:bg-darkbg-base border border-cream-300 dark:border-darkbg-border text-espresso-900 dark:text-cream-100 focus:outline-none"
            >
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Add Task
            </button>
          </form>

          {/* Tasks Checklist */}
          <div className="space-y-2.5">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleToggleTask(task.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  task.completed
                    ? 'bg-cream-50/60 dark:bg-darkbg-base/40 border-cream-200 dark:border-darkbg-border opacity-70'
                    : 'bg-white dark:bg-darkbg-card border-cream-200 dark:border-darkbg-border shadow-xs hover:border-terracotta-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-espresso-300 dark:text-cream-400 shrink-0" />
                  )}
                  <div>
                    <span className={`text-xs font-semibold ${
                      task.completed ? 'line-through text-espresso-400 dark:text-cream-400' : 'text-espresso-900 dark:text-cream-100'
                    }`}>
                      {task.title}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold text-terracotta-600 dark:text-terracotta-400">
                        {task.category}
                      </span>
                      <span className="text-espresso-300">•</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        task.priority === 'urgent'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                          : task.priority === 'high'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-cream-200 text-espresso-700 dark:bg-darkbg-elevated dark:text-cream-300'
                      }`}>
                        {task.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTask(task.id);
                  }}
                  className="text-espresso-400 hover:text-red-500 p-1"
                  title="Remove Task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 6: NOTICE BOARD & HOLIDAY CALENDAR
         ======================================================== */}
      {activeTab === 'notice-board' && (
        <div className="space-y-6 animate-fade-in">
          {/* Header */}
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 shadow-xs flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-terracotta-500" />
                Company Notice Board & 2026 Holidays
              </h3>
              <p className="text-xs text-espresso-500 dark:text-cream-400">
                Official management broadcasts, festival holidays, and operational guidelines
              </p>
            </div>
          </div>

          {/* Announcements Feed */}
          <div className="space-y-4">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {ann.isPinned && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-[10px] font-bold">
                        PINNED NOTICE
                      </span>
                    )}
                    <h4 className="font-bold text-base text-espresso-900 dark:text-cream-100 font-serif">
                      {ann.title}
                    </h4>
                  </div>
                  <span className="text-[10px] text-espresso-400 font-mono">{ann.date}</span>
                </div>
                <p className="text-xs text-espresso-700 dark:text-cream-300 leading-relaxed">
                  {ann.content}
                </p>
                <div className="text-[10px] font-semibold text-terracotta-600 dark:text-terracotta-400 pt-1">
                  Target Audience: {ann.target}
                </div>
              </div>
            ))}
          </div>

          {/* 2026 Holiday Calendar Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-espresso-900 dark:text-cream-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-terracotta-500" />
              Official 2026 National & Festival Holiday List
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              {[
                { name: 'Republic Day', date: 'Jan 26, 2026', day: 'Monday' },
                { name: 'Holi Festival', date: 'Mar 17, 2026', day: 'Tuesday' },
                { name: 'Independence Day', date: 'Aug 15, 2026', day: 'Saturday' },
                { name: 'Gandhi Jayanti', date: 'Oct 02, 2026', day: 'Friday' },
                { name: 'Diwali (Deepavali)', date: 'Nov 08, 2026', day: 'Sunday' },
                { name: 'Christmas Day', date: 'Dec 25, 2026', day: 'Friday' }
              ].map((h, i) => (
                <div key={i} className="p-3 rounded-2xl bg-cream-50 dark:bg-darkbg-base border border-cream-200/60 dark:border-darkbg-border flex items-center justify-between">
                  <div>
                    <div className="font-bold text-espresso-900 dark:text-cream-100">{h.name}</div>
                    <div className="text-[10px] text-espresso-400">{h.day}</div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-terracotta-600 dark:text-terracotta-400">
                    {h.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 7: MY PROFILE & CREDENTIALS
         ======================================================== */}
      {activeTab === 'profile' && (
        <div className="space-y-6 animate-fade-in">
          {/* Header */}
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 shadow-xs">
            <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
              <User className="w-5 h-5 text-terracotta-500" />
              Staff Profile & Credentials
            </h3>
            <p className="text-xs text-espresso-500 dark:text-cream-400">
              Verified personnel information, department assignment, and security details
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personnel Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-terracotta-500 to-amber-500 text-white flex items-center justify-center font-bold text-2xl shadow-sm">
                  {user?.name?.charAt(0) || 'E'}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-espresso-900 dark:text-cream-100 font-serif">
                    {user?.name}
                  </h4>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-terracotta-100 dark:bg-terracotta-900/60 text-terracotta-700 dark:text-terracotta-300 border border-terracotta-200">
                    {user?.domain || 'General Staff'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-espresso-700 dark:text-cream-300 pt-2 border-t border-cream-200 dark:border-darkbg-border">
                <div><strong>Employee ID:</strong> <span className="font-mono">{user?.employeeId || 'PX-EMP-1001'}</span></div>
                <div><strong>Official Email:</strong> {user?.email}</div>
                <div><strong>Contact Phone:</strong> {user?.phone || '+91 Not Provided'}</div>
                <div><strong>Status:</strong> <span className="text-emerald-600 dark:text-emerald-400 font-bold">Active Staff Member</span></div>
              </div>
            </div>

            {/* Direct Founder Assistance */}
            <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs space-y-4">
              <h4 className="font-bold text-sm text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-terracotta-500" />
                Agency Support & Founder Hotline
              </h4>
              <p className="text-xs text-espresso-500 dark:text-cream-400">
                For urgent leave emergencies, salary queries, or client escalations:
              </p>
              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-2xl bg-cream-50 dark:bg-darkbg-base border border-cream-200/60 dark:border-darkbg-border flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-espresso-900 dark:text-cream-100">Vikas Chauhan</div>
                    <div className="text-[10px] text-espresso-400">Co-Founder & Director</div>
                  </div>
                  <a
                    href="tel:+917056063863"
                    className="px-3 py-1 rounded-xl bg-terracotta-500 text-white text-xs font-bold"
                  >
                    +91 7056063863
                  </a>
                </div>

                <div className="p-3 rounded-2xl bg-cream-50 dark:bg-darkbg-base border border-cream-200/60 dark:border-darkbg-border flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-espresso-900 dark:text-cream-100">Shubham Singh</div>
                    <div className="text-[10px] text-espresso-400">Co-Founder & Operations Head</div>
                  </div>
                  <a
                    href="tel:+919559506650"
                    className="px-3 py-1 rounded-xl bg-terracotta-500 text-white text-xs font-bold"
                  >
                    +91 95595 06650
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: APPLY FOR LEAVE
         ======================================================== */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2 font-serif">
                <CalendarCheck2 className="w-5 h-5 text-amber-500" />
                Apply For Leave
              </h3>
              <button
                onClick={() => setIsLeaveModalOpen(false)}
                className="text-espresso-400 hover:text-espresso-700 dark:hover:text-cream-100 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-espresso-500 dark:text-cream-400 mb-4">
              Submit your absence request. Management will be notified for verification and approval.
            </p>

            {leaveMessage.text && (
              <div
                className={`mb-4 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  leaveMessage.type === 'success'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300'
                }`}
              >
                {leaveMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{leaveMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleLeaveSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={leaveForm.endDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                  Leave Classification
                </label>
                <select
                  value={leaveForm.type}
                  onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs font-semibold text-espresso-900 dark:text-cream-100 focus:outline-none"
                >
                  <option value="casual">Casual Leave</option>
                  <option value="sick">Sick / Medical Leave</option>
                  <option value="emergency">Emergency Absence</option>
                  <option value="half_day">Half Day Leave</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                  Reason for Absence
                </label>
                <textarea
                  rows={3}
                  placeholder="State the reason clearly for executive approval..."
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-cream-200 dark:border-darkbg-border">
                <button
                  type="button"
                  onClick={() => setIsLeaveModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-cream-300 dark:border-darkbg-border text-xs font-semibold text-espresso-700 dark:text-cream-300 hover:bg-cream-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingLeave}
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 text-xs flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
                >
                  {isSubmittingLeave ? 'Submitting...' : 'Send Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
