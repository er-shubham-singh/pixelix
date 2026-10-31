import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  fetchCompanyAnalytics,
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  fetchAllLeaves,
  updateLeaveStatus,
  fetchDailyAttendance,
  fetchSiteInquiries,
  updateInquiryStatus,
  deleteInquiry
} from '../services/ownerApi';
import CircularGauge from '../components/charts/CircularGauge';
import DonutChart from '../components/charts/DonutChart';
import Badge from '../components/common/Badge';
import confetti from 'canvas-confetti';
import {
  Building2,
  Users,
  CalendarCheck2,
  Inbox,
  CheckCircle2,
  XCircle,
  Clock,
  PlusCircle,
  Mail,
  Search,
  Trash2,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const DOMAIN_OPTIONS = [
  'Full Stack Developer',
  'App Developer',
  'Telecaller',
  'HR',
  'Social Media Handling',
  'Graphic Design',
  'Lead Generation',
  'UI/UX Designer',
  'Digital Marketing',
  'SEO Specialist',
  'Content Creator',
  'Project Manager',
  'E-Commerce Operations',
  'Listing & Cataloging',
  'Dispatch & Logistics',
  'Other'
];

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const [analytics, setAnalytics] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [leaveFilter, setLeaveFilter] = useState('');
  const [inquiries, setInquiries] = useState([]);
  const [inquiryFilter, setInquiryFilter] = useState('');
  const [dailyOversight, setDailyOversight] = useState({ summary: {}, oversight: [] });
  const [oversightDate, setOversightDate] = useState(() => new Date().toISOString().split('T')[0]);

  const [actionFeedback, setActionFeedback] = useState({ text: '', type: '' });

  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [newEmployeeForm, setNewEmployeeForm] = useState({
    name: '',
    email: '',
    password: '',
    domain: 'Full Stack Developer',
    phone: ''
  });
  const [isCreatingEmployee, setIsCreatingEmployee] = useState(false);
  const [createEmployeeResult, setCreateEmployeeResult] = useState(null);

  const [reviewNotesMap, setReviewNotesMap] = useState({});
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [employeeDomainFilter, setEmployeeDomainFilter] = useState('all');

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [analyticsData, empData, leavesData, inquiriesData, dailyData] = await Promise.all([
        fetchCompanyAnalytics(),
        fetchEmployees(),
        fetchAllLeaves(leaveFilter),
        fetchSiteInquiries(inquiryFilter),
        fetchDailyAttendance(oversightDate)
      ]);

      if (analyticsData) setAnalytics(analyticsData);
      if (empData) setEmployees(empData);
      if (leavesData) setLeaves(leavesData);
      if (inquiriesData) setInquiries(inquiriesData);
      if (dailyData) setDailyOversight(dailyData);
    } catch (e) {
      console.warn('Dashboard fetch error', e);
    }
  };

  const handleCreateEmployeeSubmit = async (e) => {
    e.preventDefault();
    setIsCreatingEmployee(true);
    setCreateEmployeeResult(null);

    const res = await createEmployee(newEmployeeForm);
    setIsCreatingEmployee(false);

    if (res.ok) {
      setCreateEmployeeResult({
        success: true,
        message: res.message,
        emailDelivered: res.emailDelivered,
        simulatedEmail: res.simulatedEmail
      });
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch (err) {}

      setNewEmployeeForm({
        name: '',
        email: '',
        password: '',
        domain: 'Full Stack Developer',
        phone: ''
      });
      const updatedEmps = await fetchEmployees();
      setEmployees(updatedEmps);
      const updatedAnalytics = await fetchCompanyAnalytics();
      setAnalytics(updatedAnalytics);

      setTimeout(() => {
        setIsEmployeeModalOpen(false);
        setCreateEmployeeResult(null);
      }, 2500);
    } else {
      setCreateEmployeeResult({
        success: false,
        message: res.message || 'Failed to create employee.'
      });
    }
  };

  const handleUpdateLeave = async (leaveId, status) => {
    const notes = reviewNotesMap[leaveId] || '';
    const res = await updateLeaveStatus(leaveId, { status, reviewNotes: notes });

    if (res.ok) {
      setActionFeedback({
        text: `Leave request ${status} successfully. Nodemailer notification dispatched.`,
        type: 'success'
      });
      const updatedLeaves = await fetchAllLeaves(leaveFilter);
      setLeaves(updatedLeaves);
      const updatedAnalytics = await fetchCompanyAnalytics();
      setAnalytics(updatedAnalytics);
    } else {
      setActionFeedback({
        text: res.message || 'Action failed',
        type: 'error'
      });
    }
    setTimeout(() => setActionFeedback({ text: '', type: '' }), 4000);
  };

  const handleInquiryStatusChange = async (inquiryId, newStatus) => {
    const res = await updateInquiryStatus(inquiryId, { status: newStatus });
    if (res.ok) {
      const updated = await fetchSiteInquiries(inquiryFilter);
      setInquiries(updated);
      const updatedAnalytics = await fetchCompanyAnalytics();
      setAnalytics(updatedAnalytics);
    }
  };

  const handleDeleteEmployee = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove employee ${name}?`)) {
      await deleteEmployee(id);
      const updated = await fetchEmployees();
      setEmployees(updated);
      const updatedAnalytics = await fetchCompanyAnalytics();
      setAnalytics(updatedAnalytics);
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      emp.email.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      (emp.employeeId && emp.employeeId.toLowerCase().includes(employeeSearch.toLowerCase()));
    const matchesDomain =
      employeeDomainFilter === 'all' || emp.domain === employeeDomainFilter;
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 min-h-screen">
      
      {/* 1. Executive Top Header */}
      <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-terracotta-600 via-terracotta-500 to-amber-500 text-white flex items-center justify-center font-bold text-2xl shadow-md shadow-terracotta-500/20">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-espresso-900 dark:text-cream-100 font-serif">
                Owner Master Control Center
              </h1>
              <Badge variant="amber">Director</Badge>
            </div>
            <p className="text-xs sm:text-sm text-espresso-500 dark:text-cream-300/80 mt-1 flex flex-wrap items-center gap-3">
              <span>Director: <strong>{user?.name || 'Pixelix Leadership'}</strong></span>
              <span>•</span>
              <span>Email: <strong>{user?.email}</strong></span>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Live Subdomain Connected
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEmployeeModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-terracotta-500/20 active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          Create Employee Account
        </button>
      </div>

      {actionFeedback.text && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all ${
            actionFeedback.type === 'success'
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300'
              : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border border-red-300'
          }`}
        >
          {actionFeedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span>{actionFeedback.text}</span>
        </div>
      )}

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-cream-200 dark:border-darkbg-border custom-scrollbar">
        {[
          { id: 'overview', label: 'Overview & Circular Graphs', icon: TrendingUp },
          { id: 'employees', label: `Employees (${employees.length})`, icon: Users },
          { id: 'leaves', label: `Leave Approvals (${leaves.filter(l => l.status === 'pending').length} Pending)`, icon: CalendarCheck2 },
          { id: 'attendance', label: 'Daily Work Logs Oversight', icon: Clock },
          { id: 'website', label: `Website Leads (${inquiries.length})`, icon: Inbox }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-terracotta-500 text-white shadow-md shadow-terracotta-500/20'
                  : 'bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border text-espresso-700 dark:text-cream-300 hover:text-espresso-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & CIRCULAR GRAPHS */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-sm">
              <span className="text-xs uppercase font-bold text-espresso-500 dark:text-cream-300/70 block mb-1">
                Total Employees
              </span>
              <span className="text-3xl font-extrabold text-espresso-900 dark:text-cream-100 font-mono">
                {analytics?.employees?.total || employees.length}
              </span>
              <p className="text-[11px] text-espresso-400 dark:text-cream-300/50 mt-1">
                {analytics?.employees?.active || employees.length} active personnel
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-sm">
              <span className="text-xs uppercase font-bold text-espresso-500 dark:text-cream-300/70 block mb-1">
                Today's Turnout Rate
              </span>
              <span className="text-3xl font-extrabold text-terracotta-600 dark:text-terracotta-400 font-mono">
                {analytics?.todayAttendance?.turnoutPercentage || 0}%
              </span>
              <p className="text-[11px] text-espresso-400 dark:text-cream-300/50 mt-1">
                {analytics?.todayAttendance?.present || 0} logged present today
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-sm">
              <span className="text-xs uppercase font-bold text-espresso-500 dark:text-cream-300/70 block mb-1">
                Pending Leave Requests
              </span>
              <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                {leaves.filter(l => l.status === 'pending').length}
              </span>
              <p className="text-[11px] text-espresso-400 dark:text-cream-300/50 mt-1">
                Awaiting owner confirmation
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-sm">
              <span className="text-xs uppercase font-bold text-espresso-500 dark:text-cream-300/70 block mb-1">
                Website Leads
              </span>
              <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                {analytics?.website?.totalInquiries || inquiries.length}
              </span>
              <p className="text-[11px] text-espresso-400 dark:text-cream-300/50 mt-1">
                {analytics?.website?.newInquiries || 0} new incoming inquiries
              </p>
            </div>
          </div>

          {/* Circular Graphs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2 mb-1">
                  <CalendarCheck2 className="w-5 h-5 text-terracotta-500" />
                  Today's Attendance Breakdown (Circular Graph)
                </h3>
                <p className="text-xs text-espresso-500 dark:text-cream-300/70 mb-6">
                  Real-time ratio of present vs on-leave vs pending logs
                </p>
              </div>

              <DonutChart
                data={analytics?.todayAttendance?.donutSegments || [
                  { label: 'Present', count: 2, color: '#C84523' },
                  { label: 'Approved Leave', count: 0, color: '#D4A373' },
                  { label: 'Pending Log', count: 1, color: '#8E7A70' }
                ]}
                centerLabel="Total Staff"
                size={210}
                strokeWidth={26}
              />
              <div className="mt-4 pt-4 border-t border-cream-200 dark:border-darkbg-border text-center text-xs text-espresso-500 dark:text-cream-300/60">
                Hover over circular segments to view exact counts and percentages.
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5 text-terracotta-500" />
                  Domain & Department Breakdown (Circular Graph)
                </h3>
                <p className="text-xs text-espresso-500 dark:text-cream-300/70 mb-6">
                  Personnel allocation across development, telecalling, marketing & HR
                </p>
              </div>

              <DonutChart
                data={(analytics?.domainDistribution || []).map(d => ({
                  label: d.domain,
                  count: d.count
                }))}
                centerLabel="Domains"
                size={210}
                strokeWidth={26}
              />
              <div className="mt-4 pt-4 border-t border-cream-200 dark:border-darkbg-border text-center text-xs text-espresso-500 dark:text-cream-300/60">
                Distribution across all assigned operational roles.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EMPLOYEE MANAGEMENT */}
      {activeTab === 'employees' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-espresso-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={employeeSearch}
                  onChange={(e) => setEmployeeSearch(e.target.value)}
                  placeholder="Search by name, email, or employee ID..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs font-medium text-espresso-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
                />
              </div>

              <select
                value={employeeDomainFilter}
                onChange={(e) => setEmployeeDomainFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs font-semibold text-espresso-800 dark:text-cream-200 focus:outline-none"
              >
                <option value="all">All Domains</option>
                {DOMAIN_OPTIONS.map((dom) => (
                  <option key={dom} value={dom}>
                    {dom}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setIsEmployeeModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Add New Employee
            </button>
          </div>

          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-cream-100 dark:bg-darkbg-base text-espresso-700 dark:text-cream-300 border-b border-cream-200 dark:border-darkbg-border font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Employee</th>
                    <th className="p-4">Domain / Role</th>
                    <th className="p-4">ID & Contact</th>
                    <th className="p-4">Month Attendance</th>
                    <th className="p-4">Today's Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-200 dark:divide-darkbg-border">
                  {filteredEmployees.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-espresso-400 italic">
                        No employees found matching filter.
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees.map((emp) => {
                      const todayPresent = emp.currentMonthStats?.todayStatus === 'present';
                      const todayLeave = emp.currentMonthStats?.todayStatus === 'leave';
                      return (
                        <tr key={emp._id} className="hover:bg-cream-50 dark:hover:bg-darkbg-base/50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-terracotta-100 dark:bg-terracotta-900/50 text-terracotta-700 dark:text-terracotta-300 flex items-center justify-center font-bold text-sm">
                                {emp.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-bold text-espresso-900 dark:text-cream-100 text-sm">
                                  {emp.name}
                                </div>
                                <div className="text-espresso-500 dark:text-cream-300/70 font-mono text-[11px]">
                                  {emp.email}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-terracotta-50 dark:bg-terracotta-950/40 text-terracotta-700 dark:text-terracotta-300 border border-terracotta-200 dark:border-terracotta-800">
                              {emp.domain}
                            </span>
                          </td>

                          <td className="p-4 font-mono text-espresso-600 dark:text-cream-300">
                            <div>{emp.employeeId || 'Assigned'}</div>
                            <div className="text-[10px] text-espresso-400">{emp.phone || 'No phone'}</div>
                          </td>

                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-terracotta-600 dark:text-terracotta-400">
                                {emp.currentMonthStats?.presentDays || 0}d Present
                              </span>
                              <span className="text-espresso-300">•</span>
                              <span className="text-amber-600 dark:text-amber-400">
                                {emp.currentMonthStats?.leaveDays || 0}d Leave
                              </span>
                            </div>
                          </td>

                          <td className="p-4">
                            {todayPresent && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 font-semibold text-[10px]">
                                <CheckCircle2 className="w-3 h-3" /> Present Today
                              </span>
                            )}
                            {todayLeave && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 font-semibold text-[10px]">
                                On Leave
                              </span>
                            )}
                            {!todayPresent && !todayLeave && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cream-200 text-espresso-600 dark:bg-darkbg-elevated dark:text-cream-400 font-medium text-[10px]">
                                Pending Log
                              </span>
                            )}
                          </td>

                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteEmployee(emp._id, emp.name)}
                              title="Remove Employee"
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LEAVE APPROVALS */}
      {activeTab === 'leaves' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center gap-2">
            {['', 'pending', 'approved', 'rejected'].map((st) => (
              <button
                key={st}
                onClick={async () => {
                  setLeaveFilter(st);
                  const updated = await fetchAllLeaves(st);
                  setLeaves(updated);
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  leaveFilter === st
                    ? 'bg-terracotta-500 text-white shadow-sm'
                    : 'bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border text-espresso-700 dark:text-cream-300'
                }`}
              >
                {st === '' ? 'All Requests' : st}
              </button>
            ))}
          </div>

          {leaves.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl text-espresso-500 italic text-sm">
              No leave applications matching the filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {leaves.map((lv) => {
                const isPending = lv.status === 'pending';
                const isApproved = lv.status === 'approved';
                const isRejected = lv.status === 'rejected';

                return (
                  <div
                    key={lv._id}
                    className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-sm flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-espresso-900 dark:text-cream-100">
                            {lv.user?.name || 'Employee'}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-terracotta-100 dark:bg-terracotta-900/50 text-terracotta-700 dark:text-terracotta-300 font-medium">
                            {lv.user?.domain}
                          </span>
                        </div>

                        {isPending && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Awaiting Review
                          </span>
                        )}
                        {isApproved && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Approved & Marked
                          </span>
                        )}
                        {isRejected && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300">
                            Rejected
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-espresso-600 dark:text-cream-300 space-y-1">
                        <div>
                          <strong>Dates:</strong>{' '}
                          <span className="font-mono font-bold text-espresso-900 dark:text-cream-100">
                            {lv.startDate} to {lv.endDate}
                          </span>{' '}
                          <span className="text-[10px] uppercase font-semibold text-espresso-400">
                            ({lv.type})
                          </span>
                        </div>
                        <div>
                          <strong>Reason:</strong> {lv.reason}
                        </div>
                        {lv.reviewNotes && (
                          <div className="italic text-espresso-500 dark:text-cream-300/70 pt-1">
                            <strong>Note sent:</strong> {lv.reviewNotes}
                          </div>
                        )}
                      </div>
                    </div>

                    {isPending ? (
                      <div className="pt-3 border-t border-cream-200 dark:border-darkbg-border space-y-3">
                        <input
                          type="text"
                          placeholder="Optional management note (included in email)..."
                          value={reviewNotesMap[lv._id] || ''}
                          onChange={(e) =>
                            setReviewNotesMap({ ...reviewNotesMap, [lv._id]: e.target.value })
                          }
                          className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 placeholder-espresso-400 focus:outline-none"
                        />
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => handleUpdateLeave(lv._id, 'rejected')}
                            className="px-4 py-2 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-bold transition-all flex items-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Reject & Email
                          </button>
                          <button
                            onClick={() => handleUpdateLeave(lv._id, 'approved')}
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1 active:scale-95"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Approve, Mark & Email
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-[11px] text-espresso-400 text-right">
                        Reviewed: {new Date(lv.reviewedAt || lv.updatedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: DAILY ATTENDANCE & WORK LOGS OVERSIGHT */}
      {activeTab === 'attendance' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                <Clock className="w-5 h-5 text-terracotta-500" />
                Inspect Daily Activity by Date
              </h3>
              <p className="text-xs text-espresso-500 dark:text-cream-300/70">
                View submitted daily work summaries and attendance markers for any selected date
              </p>
            </div>

            <div className="flex items-center gap-2 bg-cream-100 dark:bg-darkbg-base p-1.5 rounded-xl border border-cream-300 dark:border-darkbg-border">
              <input
                type="date"
                value={oversightDate}
                onChange={async (e) => {
                  const newDate = e.target.value;
                  setOversightDate(newDate);
                  const res = await fetchDailyAttendance(newDate);
                  setDailyOversight(res);
                }}
                className="bg-transparent text-xs font-semibold text-espresso-900 dark:text-cream-100 focus:outline-none pr-2 cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-3">
            {dailyOversight.oversight.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl text-espresso-500 italic text-sm">
                No personnel records found for {oversightDate}.
              </div>
            ) : (
              dailyOversight.oversight.map((item, idx) => {
                const isPresent = item.status === 'present';
                const isLeave = item.status === 'leave';
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="font-bold text-sm text-espresso-900 dark:text-cream-100">
                          {item.employee?.name}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cream-200 dark:bg-darkbg-elevated text-espresso-700 dark:text-cream-300">
                          {item.employee?.domain}
                        </span>
                        <span className="text-[10px] font-mono text-espresso-400">
                          ({item.employee?.employeeId})
                        </span>

                        {isPresent && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                            Present
                          </span>
                        )}
                        {isLeave && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
                            Approved Leave
                          </span>
                        )}
                        {!isPresent && !isLeave && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-cream-200 text-espresso-600 dark:bg-darkbg-elevated dark:text-cream-400">
                            Not Logged
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-espresso-700 dark:text-cream-300 bg-cream-50 dark:bg-darkbg-base p-3 rounded-xl border border-cream-200/60 dark:border-darkbg-border">
                        {item.workSummary ? (
                          item.workSummary
                        ) : (
                          <span className="italic text-espresso-400 dark:text-cream-300/40">
                            No work description logged for this date.
                          </span>
                        )}
                      </p>
                    </div>

                    {item.clockInTime && (
                      <div className="text-[11px] font-mono text-espresso-500 dark:text-cream-300/70 whitespace-nowrap">
                        Clocked: {item.clockInTime}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 5: WEBSITE FRONTEND CONTROL & CLIENT INQUIRIES */}
      {activeTab === 'website' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                <Inbox className="w-5 h-5 text-terracotta-500" />
                Frontend Client Inquiries & Estimator Leads
              </h3>
              <p className="text-xs text-espresso-500 dark:text-cream-300/70">
                Track client consultation bookings and website contact requests
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-terracotta-50 dark:bg-terracotta-950/40 text-terracotta-600 dark:text-terracotta-400 border border-terracotta-200">
              {inquiries.length} Inquiries Logged
            </span>
          </div>

          {inquiries.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl text-espresso-500 italic text-sm">
              No website inquiries yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inquiries.map((inq) => (
                <div
                  key={inq._id}
                  className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-sm flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-espresso-900 dark:text-cream-100">
                        {inq.name}
                      </span>
                      <select
                        value={inq.status}
                        onChange={(e) => handleInquiryStatusChange(inq._id, e.target.value)}
                        className="text-[10px] font-bold px-2 py-1 rounded-lg border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base focus:outline-none"
                      >
                        <option value="new">New Lead</option>
                        <option value="in_progress">In Progress</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Closed / Won</option>
                      </select>
                    </div>

                    <div className="text-xs text-espresso-600 dark:text-cream-300 space-y-1 font-mono">
                      <div>📧 {inq.email}</div>
                      {inq.phone && <div>📞 {inq.phone}</div>}
                      {inq.service && (
                        <div className="font-sans font-semibold text-terracotta-600 dark:text-terracotta-400 pt-1">
                          Service: {inq.service}
                        </div>
                      )}
                    </div>

                    {inq.message && (
                      <p className="mt-2 text-xs text-espresso-700 dark:text-cream-200 bg-cream-50 dark:bg-darkbg-base p-3 rounded-xl border border-cream-200/60 dark:border-darkbg-border">
                        "{inq.message}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-cream-200 dark:border-darkbg-border text-[11px] text-espresso-400">
                    <span>Received: {new Date(inq.createdAt).toLocaleDateString()}</span>
                    <button
                      onClick={async () => {
                        if (window.confirm('Delete this inquiry?')) {
                          await deleteInquiry(inq._id);
                          const updated = await fetchSiteInquiries(inquiryFilter);
                          setInquiries(updated);
                        }
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 6. Create Employee Modal with Nodemailer Integration */}
      {isEmployeeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                <Users className="w-5 h-5 text-terracotta-500" />
                Enroll New Employee
              </h3>
              <button
                onClick={() => setIsEmployeeModalOpen(false)}
                className="text-espresso-400 hover:text-espresso-700 dark:hover:text-cream-100 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-espresso-500 dark:text-cream-300/70 mb-5">
              Enter employee credentials and assign their domain. Upon creation, Nodemailer will automatically dispatch credentials to their email.
            </p>

            {createEmployeeResult && (
              <div
                className={`mb-4 p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  createEmployeeResult.success
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300'
                }`}
              >
                {createEmployeeResult.success ? (
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                )}
                <span>{createEmployeeResult.message}</span>
              </div>
            )}

            <form onSubmit={handleCreateEmployeeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={newEmployeeForm.name}
                  onChange={(e) => setNewEmployeeForm({ ...newEmployeeForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                  Corporate / Personal Email (for credential dispatch)
                </label>
                <input
                  type="email"
                  placeholder="rahul@pixelix.co.in"
                  value={newEmployeeForm.email}
                  onChange={(e) => setNewEmployeeForm({ ...newEmployeeForm, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                    Assign Domain / Role
                  </label>
                  <select
                    value={newEmployeeForm.domain}
                    onChange={(e) =>
                      setNewEmployeeForm({ ...newEmployeeForm, domain: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs font-semibold text-espresso-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
                  >
                    {DOMAIN_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                    Initial Password
                  </label>
                  <input
                    type="password"
                    placeholder="Min 6 characters"
                    value={newEmployeeForm.password}
                    onChange={(e) =>
                      setNewEmployeeForm({ ...newEmployeeForm, password: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                  Contact Phone (Optional)
                </label>
                <input
                  type="text"
                  placeholder="+91 98765 00000"
                  value={newEmployeeForm.phone}
                  onChange={(e) => setNewEmployeeForm({ ...newEmployeeForm, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-cream-200 dark:border-darkbg-border">
                <button
                  type="button"
                  onClick={() => setIsEmployeeModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-cream-300 dark:border-darkbg-border text-xs font-semibold text-espresso-700 dark:text-cream-300 hover:bg-cream-100 dark:hover:bg-darkbg-elevated"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingEmployee}
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-terracotta-500 hover:bg-terracotta-600 text-xs flex items-center gap-1.5 shadow-md shadow-terracotta-500/20 active:scale-95 disabled:opacity-50"
                >
                  {isCreatingEmployee ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Dispatching Email & Creating...
                    </span>
                  ) : (
                    <>
                      <Mail className="w-3.5 h-3.5" />
                      Create & Email Credentials
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

