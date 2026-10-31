import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  fetchTodayLog,
  submitDailyWorkLog,
  fetchMonthlyAttendance,
  applyLeave,
  fetchMyLeaves
} from '../services/employeeApi';
import CircularGauge from '../components/charts/CircularGauge';
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
  CalendarCheck2
} from 'lucide-react';

export default function EmployeeDashboardPage() {
  const { user } = useAuth();

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
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    startDate: todayStr,
    endDate: todayStr,
    reason: '',
    type: 'casual'
  });
  const [isSubmittingLeave, setIsSubmittingLeave] = useState(false);
  const [leaveMessage, setLeaveMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    loadTodayLog();
    loadAttendance(selectedMonth);
    loadLeaves();
  }, [selectedMonth]);

  const loadTodayLog = async () => {
    try {
      const data = await fetchTodayLog();
      if (data.record) {
        setWorkSummary(data.record.workSummary || '');
        setLogStatus(data.record.status || 'present');
      }
    } catch (e) {
      console.warn('Failed to load today log', e);
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
    } catch (e) {
      console.warn('Leaves load error', e);
    }
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setLogMessage({ text: '', type: '' });

    if (newDate === todayStr) {
      loadTodayLog();
    } else {
      const match = monthlyData.records.find(r => r.date === newDate);
      if (match) {
        setWorkSummary(match.workSummary || '');
        setLogStatus(match.status || 'present');
      } else {
        setWorkSummary('');
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

  const summary = monthlyData.summary || {};

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 min-h-screen">
      
      {/* 1. Header with Employee Profile */}
      <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-terracotta-500 to-amber-500 text-white flex items-center justify-center font-bold text-2xl shadow-md shadow-terracotta-500/20">
            {user?.name?.charAt(0) || 'E'}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-espresso-900 dark:text-cream-100 font-serif">
                {user?.name || 'Employee Workspace'}
              </h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-terracotta-100 dark:bg-terracotta-900/60 text-terracotta-700 dark:text-terracotta-300 border border-terracotta-200 dark:border-terracotta-800">
                {user?.domain || 'General Staff'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-espresso-500 dark:text-cream-300/80 mt-1 flex flex-wrap items-center gap-3">
              <span><strong>ID:</strong> {user?.employeeId || 'PX-EMP'}</span>
              <span>•</span>
              <span><strong>Email:</strong> {user?.email}</span>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active Personnel
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsLeaveModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm shadow-amber-500/20 active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          Apply For Leave
        </button>
      </div>

      {/* 2. Monthly Attendance Counting & Circular Gauge Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Circular Attendance Gauge */}
        <div className="lg:col-span-5 bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-terracotta-500" />
                Monthly Attendance
              </h2>
              <p className="text-xs text-espresso-500 dark:text-cream-300/70">
                Official attendance counting for the month
              </p>
            </div>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs font-semibold text-espresso-800 dark:text-cream-200 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
            />
          </div>

          <div className="py-2">
            <CircularGauge
              percentage={summary.attendancePercentage || 0}
              size={190}
              strokeWidth={16}
              label={`${summary.presentDays || 0} Days Attended`}
              sublabel={`Out of ${summary.totalWorkingDays || 1} Working Days Elapsed`}
            />
          </div>

          <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-cream-200 dark:border-darkbg-border text-center">
            <div className="p-2.5 rounded-xl bg-cream-50 dark:bg-darkbg-base border border-cream-200 dark:border-darkbg-border">
              <span className="text-[10px] uppercase font-bold text-espresso-500 dark:text-cream-300/70 block">
                Days Present
              </span>
              <span className="text-lg font-extrabold text-terracotta-600 dark:text-terracotta-400 font-mono">
                {summary.presentDays || 0}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-cream-50 dark:bg-darkbg-base border border-cream-200 dark:border-darkbg-border">
              <span className="text-[10px] uppercase font-bold text-espresso-500 dark:text-cream-300/70 block">
                Leaves Taken
              </span>
              <span className="text-lg font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                {summary.leaveDays || 0}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-cream-50 dark:bg-darkbg-base border border-cream-200 dark:border-darkbg-border">
              <span className="text-[10px] uppercase font-bold text-espresso-500 dark:text-cream-300/70 block">
                Total Month
              </span>
              <span className="text-lg font-extrabold text-espresso-800 dark:text-cream-200 font-mono">
                {summary.totalDaysInMonth || 30}d
              </span>
            </div>
          </div>
        </div>

        {/* Right: Daily Attendance Bar Chart & Policy Notice */}
        <div className="lg:col-span-7 bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                  <CalendarCheck2 className="w-5 h-5 text-terracotta-500" />
                  Recent 14-Day Activity Log
                </h3>
                <p className="text-xs text-espresso-500 dark:text-cream-300/70">
                  Daily presence markers and confirmed leave tracking
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-terracotta-600 dark:text-terracotta-400 bg-terracotta-50 dark:bg-terracotta-950/40 px-2.5 py-1 rounded-md border border-terracotta-200 dark:border-terracotta-800">
                Today: {todayStr}
              </span>
            </div>

            <div className="py-2">
              <AttendanceBarChart records={monthlyData.records || []} days={14} />
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-cream-100 dark:bg-darkbg-base border border-cream-200 dark:border-darkbg-border text-xs text-espresso-700 dark:text-cream-300 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-terracotta-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Daily Work Logging Policy:</span> Employees can create and freely modify their daily work summary for the active date. Once midnight passes and a new date begins, past day logs lock automatically and become permanent records.
            </div>
          </div>
        </div>
      </div>

      {/* 3. Daily Work Logging Section (Core Requirement) */}
      <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-cream-200 dark:border-darkbg-border">
          <div>
            <h2 className="text-xl font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-terracotta-500" />
              Daily Attendance & Work Summary Logger
            </h2>
            <p className="text-xs sm:text-sm text-espresso-600 dark:text-cream-300/80 mt-1">
              Select date, specify your contributions, and record your presence.
            </p>
          </div>

          {/* Date Selector */}
          <div className="flex items-center gap-2 bg-cream-100 dark:bg-darkbg-base p-1.5 rounded-xl border border-cream-300 dark:border-darkbg-border">
            <Calendar className="w-4 h-4 text-terracotta-500 ml-2" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="bg-transparent text-sm font-semibold text-espresso-900 dark:text-cream-100 focus:outline-none pr-2 cursor-pointer"
            />
          </div>
        </div>

        <div className="my-5">
          {isPastDate && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>
                <strong>Locked Record:</strong> This work summary is for a past date ({selectedDate}). Only the current active date can be updated.
              </span>
            </div>
          )}

          {isFutureDate && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-xs text-red-800 dark:text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>
                Cannot submit work logs for future dates. Please select today's date ({todayStr}).
              </span>
            </div>
          )}

          {isSelectedDateToday && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>Active Workday:</strong> You can submit or edit your work summary anytime before midnight today.
              </span>
            </div>
          )}

          {logMessage.text && (
            <div
              className={`mt-3 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                logMessage.type === 'success'
                  ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300'
                  : 'bg-red-100 dark:bg-red-950/50 text-red-800 dark:text-red-300 border border-red-300'
              }`}
            >
              {logMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              {logMessage.text}
            </div>
          )}
        </div>

        {/* Work Log Form */}
        <form onSubmit={handleLogSubmit} className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <label className="text-xs font-bold text-espresso-700 dark:text-cream-300 uppercase tracking-wider">
              What did you accomplish today?
            </label>

            <div className="flex items-center gap-2">
              <span className="text-xs text-espresso-500 dark:text-cream-300/70">Status:</span>
              <select
                value={logStatus}
                disabled={!isSelectedDateToday}
                onChange={(e) => setLogStatus(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs font-semibold text-espresso-800 dark:text-cream-200 focus:outline-none focus:ring-1 focus:ring-terracotta-500 disabled:opacity-60"
              >
                <option value="present">Present (Full Day)</option>
                <option value="half_day">Half Day</option>
              </select>
            </div>
          </div>

          <textarea
            rows={4}
            value={workSummary}
            disabled={!isSelectedDateToday}
            onChange={(e) => setWorkSummary(e.target.value)}
            placeholder={
              isSelectedDateToday
                ? `e.g. Worked on ${user?.domain || 'daily domain deliverables'}. Completed tasks, handled client outreach, closed follow-ups...`
                : 'No work summary submitted for this date.'
            }
            className="w-full p-4 rounded-2xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-sm text-espresso-900 dark:text-cream-100 placeholder-espresso-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
          />

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-espresso-400 dark:text-cream-300/50">
              {isSelectedDateToday ? 'Editable until midnight today.' : 'Read-only view.'}
            </span>

            <button
              type="submit"
              disabled={!isSelectedDateToday || isSubmittingLog}
              className="py-3 px-6 rounded-xl font-bold text-white bg-terracotta-500 hover:bg-terracotta-600 active:scale-95 transition-all shadow-md shadow-terracotta-500/20 flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmittingLog ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving Log...
                </span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {workSummary ? 'Update Today\'s Work Summary' : 'Submit Daily Attendance & Log'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 4. Leave Applications Tracking & History */}
      <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-cream-200 dark:border-darkbg-border">
          <div>
            <h2 className="text-xl font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-terracotta-500" />
              My Leave Requests & Confirmation Status
            </h2>
            <p className="text-xs sm:text-sm text-espresso-600 dark:text-cream-300/80 mt-1">
              When approved by the owner, dates are automatically marked on your attendance calendar.
            </p>
          </div>
          <button
            onClick={() => setIsLeaveModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            New Leave Request
          </button>
        </div>

        {leavesList.length === 0 ? (
          <div className="text-center py-10 text-espresso-500 dark:text-cream-300/60 text-sm italic">
            No leave applications submitted yet. Click "New Leave Request" above if you need time off.
          </div>
        ) : (
          <div className="space-y-3">
            {leavesList.map((lv) => {
              const isApproved = lv.status === 'approved';
              const isRejected = lv.status === 'rejected';
              return (
                <div
                  key={lv._id}
                  className="p-4 rounded-2xl border border-cream-200 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-espresso-900 dark:text-cream-100 font-mono">
                        {lv.startDate} {lv.startDate !== lv.endDate ? `to ${lv.endDate}` : ''}
                      </span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-cream-200 dark:bg-darkbg-elevated text-espresso-700 dark:text-cream-300">
                        {lv.type}
                      </span>
                      {isApproved && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Owner Approved
                        </span>
                      )}
                      {isRejected && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300">
                          Rejected
                        </span>
                      )}
                      {!isApproved && !isRejected && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Pending Owner Confirmation
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-espresso-600 dark:text-cream-300/80 mt-1.5">
                      <strong>Reason:</strong> {lv.reason}
                    </p>
                    {lv.reviewNotes && (
                      <p className="text-xs text-espresso-500 dark:text-cream-300/60 mt-1 italic">
                        <strong>Management Note:</strong> {lv.reviewNotes}
                      </p>
                    )}
                  </div>

                  <div className="text-[11px] text-espresso-400 dark:text-cream-300/40 text-right sm:self-center">
                    Applied: {new Date(lv.createdAt || lv.appliedAt).toLocaleDateString()}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Apply for Leave Modal */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-terracotta-500" />
                Apply for Leave
              </h3>
              <button
                onClick={() => setIsLeaveModalOpen(false)}
                className="text-espresso-400 hover:text-espresso-700 dark:hover:text-cream-100 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-espresso-500 dark:text-cream-300/70 mb-5">
              Submit your date request. Once confirmed by the owner, your attendance calendar will be automatically updated and email notification will be sent.
            </p>

            {leaveMessage.text && (
              <div
                className={`mb-4 p-3 rounded-xl text-xs font-semibold ${
                  leaveMessage.type === 'success'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300'
                }`}
              >
                {leaveMessage.text}
              </div>
            )}

            <form onSubmit={handleLeaveSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs font-semibold text-espresso-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
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
                    className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs font-semibold text-espresso-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                  Leave Category
                </label>
                <select
                  value={leaveForm.type}
                  onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs font-semibold text-espresso-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
                >
                  <option value="casual">Casual Leave</option>
                  <option value="sick">Sick Leave</option>
                  <option value="emergency">Emergency / Urgent</option>
                  <option value="vacation">Planned Vacation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                  Reason for Leave
                </label>
                <textarea
                  rows={3}
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  placeholder="Please state the purpose of your leave request..."
                  className="w-full p-3 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 placeholder-espresso-400 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsLeaveModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-cream-300 dark:border-darkbg-border text-xs font-semibold text-espresso-700 dark:text-cream-300 hover:bg-cream-100 dark:hover:bg-darkbg-elevated"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingLeave}
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 disabled:opacity-50"
                >
                  {isSubmittingLeave ? 'Submitting...' : 'Send Request to Owner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

