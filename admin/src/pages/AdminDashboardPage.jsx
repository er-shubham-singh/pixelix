import React, { useState, useEffect, useMemo } from 'react';
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
import EquityOfferLetterTab from '../components/legal/EquityOfferLetterTab';
import ConstructionConfigAdmin from '../components/modules/ConstructionConfigAdmin';
import LeadsCRMAdmin from '../components/modules/LeadsCRMAdmin';
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
  AlertCircle,
  ShoppingBag,
  Megaphone,
  Calculator,
  Settings,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Edit3,
  KeyRound,
  Filter,
  Check,
  Phone,
  MessageCircle,
  FileSpreadsheet,
  Download,
  Send,
  Briefcase,
  Layers,
  Truck,
  RotateCcw
} from 'lucide-react';
import { ENV } from '../config/env';

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

export default function AdminDashboardPage({
  activeTab: propActiveTab,
  setActiveTab: propSetActiveTab,
  searchTerm = '',
  isEmployeeModalOpen: propIsModalOpen,
  setIsEmployeeModalOpen: propSetIsModalOpen,
  onCountsUpdate
}) {
  const { user } = useAuth();

  const [localActiveTab, setLocalActiveTab] = useState('overview');
  const activeTab = propActiveTab !== undefined ? propActiveTab : localActiveTab;
  const setActiveTab = propSetActiveTab !== undefined ? propSetActiveTab : setLocalActiveTab;

  const [localIsEmployeeModalOpen, setLocalIsEmployeeModalOpen] = useState(false);
  const isEmployeeModalOpen = propIsModalOpen !== undefined ? propIsModalOpen : localIsEmployeeModalOpen;
  const setIsEmployeeModalOpen = propSetIsModalOpen !== undefined ? propSetIsModalOpen : setLocalIsEmployeeModalOpen;

  const [analytics, setAnalytics] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [leaveFilter, setLeaveFilter] = useState('');
  const [inquiries, setInquiries] = useState([]);
  const [inquiryFilter, setInquiryFilter] = useState('');
  const [dailyOversight, setDailyOversight] = useState({ summary: {}, oversight: [] });
  const [oversightDate, setOversightDate] = useState(() => new Date().toISOString().split('T')[0]);

  const [actionFeedback, setActionFeedback] = useState({ text: '', type: '' });

  // Create Employee Form State
  const [newEmployeeForm, setNewEmployeeForm] = useState({
    name: '',
    email: '',
    password: '',
    domain: 'Full Stack Developer',
    phone: '',
    employmentType: 'full_time',
    shiftHours: 8
  });
  const [isCreatingEmployee, setIsCreatingEmployee] = useState(false);
  const [createEmployeeResult, setCreateEmployeeResult] = useState(null);

  // Edit / Reset Password Employee Modal State
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editEmployeeForm, setEditEmployeeForm] = useState({
    name: '',
    domain: '',
    phone: '',
    employmentType: 'full_time',
    shiftHours: 8,
    status: 'active',
    newPassword: ''
  });
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const [reviewNotesMap, setReviewNotesMap] = useState({});
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [employeeDomainFilter, setEmployeeDomainFilter] = useState('all');

  // E-Commerce & Service Operations State
  const [operations, setOperations] = useState(() => {
    const saved = localStorage.getItem('pixelix_admin_operations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'OPS-101',
        title: 'Amazon India A+ Cataloging (50 SKU Batch)',
        client: 'AromaKraft Herbals',
        platform: 'Amazon India',
        category: 'Marketplace Listing',
        assignedTo: 'Pooja Verma',
        status: 'in_progress',
        deadline: '2026-11-02',
        priority: 'high'
      },
      {
        id: 'OPS-102',
        title: 'Flipkart Brand Storefront & Listing Upload',
        client: 'Kavya Home Decor',
        platform: 'Flipkart',
        category: 'Marketplace Operations',
        assignedTo: 'Vikram Joshi',
        status: 'under_review',
        deadline: '2026-11-01',
        priority: 'urgent'
      },
      {
        id: 'OPS-103',
        title: 'Vector Brand Identity Kit (5 Logo Variations)',
        client: 'NeoCraft Furniture',
        platform: 'Screen & Print',
        category: 'Brand Identity',
        assignedTo: 'Ananya Roy',
        status: 'completed',
        deadline: '2026-10-30',
        priority: 'normal'
      },
      {
        id: 'OPS-104',
        title: 'Shopify Storefront with 3D Sunset Interactive Model',
        client: 'Solaris Apparel',
        platform: 'Web & Mobile',
        category: 'Web Development',
        assignedTo: 'Aman Patel',
        status: 'in_progress',
        deadline: '2026-11-05',
        priority: 'high'
      },
      {
        id: 'OPS-105',
        title: 'Safe-T Claim & Logistics Return Sync (Meesho)',
        client: 'TrendBazaar India',
        platform: 'Meesho',
        category: 'Dispatch & Logistics',
        assignedTo: 'Rohan Mehra',
        status: 'in_progress',
        deadline: '2026-11-01',
        priority: 'urgent'
      }
    ];
  });

  const [opsFilter, setOpsFilter] = useState('all');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [newTaskForm, setNewTaskForm] = useState({
    title: '',
    client: '',
    platform: 'Amazon India',
    category: 'Marketplace Listing',
    assignedTo: '',
    deadline: '',
    priority: 'normal'
  });

  // Announcements State
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

  const [newAnnouncementForm, setNewAnnouncementForm] = useState({
    title: '',
    category: 'General',
    target: 'All Personnel',
    content: '',
    isPinned: false
  });

  useEffect(() => {
    loadAllData();
  }, []);

  // Sync announcements to localStorage so employee notice board can read them
  useEffect(() => {
    localStorage.setItem('pixelix_admin_announcements', JSON.stringify(announcements));
  }, [announcements]);

  // Sync operations to localStorage
  useEffect(() => {
    localStorage.setItem('pixelix_admin_operations', JSON.stringify(operations));
  }, [operations]);

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
      if (empData) {
        setEmployees(empData);
        if (onCountsUpdate) onCountsUpdate({ employees: empData.length });
      }
      if (leavesData) {
        setLeaves(leavesData);
        const pendingCount = leavesData.filter(l => l.status === 'pending').length;
        if (onCountsUpdate) onCountsUpdate({ pendingLeaves: pendingCount });
      }
      if (inquiriesData) {
        setInquiries(inquiriesData);
        if (onCountsUpdate) onCountsUpdate({ inquiries: inquiriesData.length });
      }
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
      loadAllData();
    } else {
      setCreateEmployeeResult({
        success: false,
        message: res.message || 'Creation failed'
      });
    }
  };

  const handleOpenEditEmployee = (emp) => {
    setEditingEmployee(emp);
    setEditEmployeeForm({
      name: emp.name,
      domain: emp.domain,
      phone: emp.phone || '',
      employmentType: emp.employmentType || 'full_time',
      shiftHours: emp.shiftHours || (emp.employmentType === 'part_time' ? 4 : 8),
      status: emp.status || 'active',
      newPassword: ''
    });
  };

  const handleSaveEditEmployee = async (e) => {
    e.preventDefault();
    if (!editingEmployee) return;
    setIsSavingEdit(true);

    const payload = {
      name: editEmployeeForm.name,
      domain: editEmployeeForm.domain,
      phone: editEmployeeForm.phone,
      employmentType: editEmployeeForm.employmentType,
      shiftHours: editEmployeeForm.employmentType === 'part_time' ? 4 : (Number(editEmployeeForm.shiftHours) || 8),
      status: editEmployeeForm.status
    };
    if (editEmployeeForm.newPassword.trim()) {
      payload.password = editEmployeeForm.newPassword.trim();
    }

    const res = await updateEmployee(editingEmployee._id, payload);
    setIsSavingEdit(false);

    if (res.ok) {
      setActionFeedback({ text: `Employee profile updated successfully!`, type: 'success' });
      setEditingEmployee(null);
      loadAllData();
      setTimeout(() => setActionFeedback({ text: '', type: '' }), 4000);
    } else {
      setActionFeedback({ text: res.message || 'Failed to update employee.', type: 'error' });
    }
  };

  const handleDeleteEmployee = async (id, name) => {
    if (!window.confirm(`Are you certain you want to remove ${name}? This will archive their attendance records.`)) {
      return;
    }
    const res = await deleteEmployee(id);
    if (res.ok) {
      setActionFeedback({ text: `Employee ${name} removed.`, type: 'success' });
      loadAllData();
      setTimeout(() => setActionFeedback({ text: '', type: '' }), 4000);
    } else {
      setActionFeedback({ text: res.message || 'Failed to delete employee.', type: 'error' });
    }
  };

  const handleLeaveDecision = async (leaveId, status, employeeName) => {
    const reviewNotes = reviewNotesMap[leaveId] || '';
    const res = await updateLeaveStatus(leaveId, { status, reviewNotes });

    if (res.ok) {
      setActionFeedback({
        text: `Leave request for ${employeeName} marked as ${status.toUpperCase()}. Automated notification dispatched.`,
        type: 'success'
      });
      if (status === 'approved') {
        try { confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } }); } catch (e) {}
      }
      loadAllData();
      setTimeout(() => setActionFeedback({ text: '', type: '' }), 4000);
    } else {
      setActionFeedback({ text: res.message || 'Failed to update leave status', type: 'error' });
    }
  };

  const handleInquiryStatusChange = async (inquiryId, newStatus) => {
    const res = await updateInquiryStatus(inquiryId, { status: newStatus });
    if (res.ok) {
      setActionFeedback({ text: `Inquiry status changed to ${newStatus}`, type: 'success' });
      const updated = await fetchSiteInquiries(inquiryFilter);
      setInquiries(updated);
      setTimeout(() => setActionFeedback({ text: '', type: '' }), 3000);
    }
  };

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnouncementForm.title.trim() || !newAnnouncementForm.content.trim()) return;

    const newAnn = {
      id: `ann-${Date.now()}`,
      title: newAnnouncementForm.title.trim(),
      category: newAnnouncementForm.category,
      target: newAnnouncementForm.target,
      content: newAnnouncementForm.content.trim(),
      date: new Date().toISOString().split('T')[0],
      isPinned: newAnnouncementForm.isPinned
    };

    setAnnouncements([newAnn, ...announcements]);
    setNewAnnouncementForm({
      title: '',
      category: 'General',
      target: 'All Personnel',
      content: '',
      isPinned: false
    });
    setActionFeedback({ text: 'Company broadcast posted successfully! Visible to staff.', type: 'success' });
    setTimeout(() => setActionFeedback({ text: '', type: '' }), 3500);
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const handleCreateOperationsTask = (e) => {
    e.preventDefault();
    if (!newTaskForm.title.trim() || !newTaskForm.client.trim()) return;

    const task = {
      id: `OPS-${Math.floor(100 + Math.random() * 900)}`,
      title: newTaskForm.title.trim(),
      client: newTaskForm.client.trim(),
      platform: newTaskForm.platform,
      category: newTaskForm.category,
      assignedTo: newTaskForm.assignedTo || 'Unassigned',
      deadline: newTaskForm.deadline || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      priority: newTaskForm.priority,
      status: 'in_progress'
    };

    setOperations([task, ...operations]);
    setIsNewTaskModalOpen(false);
    setNewTaskForm({
      title: '',
      client: '',
      platform: 'Amazon India',
      category: 'Marketplace Listing',
      assignedTo: '',
      deadline: '',
      priority: 'normal'
    });
    setActionFeedback({ text: 'Operations task created and assigned!', type: 'success' });
    setTimeout(() => setActionFeedback({ text: '', type: '' }), 3500);
  };

  const handleUpdateOpsStatus = (id, newStatus) => {
    setOperations(operations.map(op => op.id === id ? { ...op, status: newStatus } : op));
  };

  // Filtered employees combining sidebar global search and local search
  const filteredEmployees = useMemo(() => {
    const q = (searchTerm || employeeSearch).toLowerCase().trim();
    return employees.filter((emp) => {
      const matchSearch =
        !q ||
        emp.name?.toLowerCase().includes(q) ||
        emp.email?.toLowerCase().includes(q) ||
        emp.domain?.toLowerCase().includes(q) ||
        emp.employeeId?.toLowerCase().includes(q);

      const matchDomain =
        employeeDomainFilter === 'all' || emp.domain === employeeDomainFilter;

      return matchSearch && matchDomain;
    });
  }, [employees, searchTerm, employeeSearch, employeeDomainFilter]);

  return (
    <div className="space-y-6">

      {/* Action Toast Feedback Banner */}
      {actionFeedback.text && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all shadow-sm ${
            actionFeedback.type === 'success'
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300'
              : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border border-red-300'
          }`}
        >
          {actionFeedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{actionFeedback.text}</span>
        </div>
      )}

      {/* ========================================================
          TAB 1: EXECUTIVE OVERVIEW & CIRCULAR GAUGES
         ======================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          {/* Top Key Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] uppercase font-bold text-espresso-500 dark:text-cream-400">
                  Total Staff
                </span>
                <Users className="w-4 h-4 text-terracotta-500" />
              </div>
              <span className="text-3xl font-extrabold text-espresso-900 dark:text-cream-100 font-mono">
                {analytics?.employees?.total || employees.length}
              </span>
              <p className="text-[11px] text-espresso-400 dark:text-cream-400 mt-1">
                {analytics?.employees?.active || employees.length} active personnel on roster
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] uppercase font-bold text-espresso-500 dark:text-cream-400">
                  Today's Turnout
                </span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <span className="text-3xl font-extrabold text-terracotta-600 dark:text-terracotta-400 font-mono">
                {analytics?.todayAttendance?.turnoutPercentage || 0}%
              </span>
              <p className="text-[11px] text-espresso-400 dark:text-cream-400 mt-1">
                {analytics?.todayAttendance?.presentCount || 0} clocked in of {employees.length}
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] uppercase font-bold text-espresso-500 dark:text-cream-400">
                  Pending Leaves
                </span>
                <CalendarCheck2 className="w-4 h-4 text-rose-500" />
              </div>
              <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                {leaves.filter((l) => l.status === 'pending').length}
              </span>
              <p className="text-[11px] text-espresso-400 dark:text-cream-400 mt-1">
                Awaiting executive sign-off
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] uppercase font-bold text-espresso-500 dark:text-cream-400">
                  Client Inquiries
                </span>
                <Inbox className="w-4 h-4 text-cyan-500" />
              </div>
              <span className="text-3xl font-extrabold text-espresso-900 dark:text-cream-100 font-mono">
                {inquiries.length}
              </span>
              <p className="text-[11px] text-espresso-400 dark:text-cream-400 mt-1">
                {inquiries.filter((i) => i.status === 'new').length} new inbound leads
              </p>
            </div>
          </div>

          {/* Circular Gauges and Department Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs flex flex-col items-center text-center">
              <h3 className="text-sm font-bold text-espresso-900 dark:text-cream-100 mb-2">
                Today's Staff Clock-in
              </h3>
              <CircularGauge
                value={analytics?.todayAttendance?.turnoutPercentage || 0}
                label="On-Duty"
                color="#D9532F"
                size={160}
              />
              <p className="text-xs text-espresso-500 dark:text-cream-400 mt-3">
                Calculated in real-time from daily employee work summaries
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs flex flex-col items-center text-center">
              <h3 className="text-sm font-bold text-espresso-900 dark:text-cream-100 mb-2">
                Month-to-Date Attendance
              </h3>
              <CircularGauge
                value={analytics?.monthStats?.averageAttendanceRate || 85}
                label="Avg Turnout"
                color="#D4A373"
                size={160}
              />
              <p className="text-xs text-espresso-500 dark:text-cream-400 mt-3">
                Target SLA: 90%+ across all operational departments
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs flex flex-col items-center text-center">
              <h3 className="text-sm font-bold text-espresso-900 dark:text-cream-100 mb-2">
                Department Distribution
              </h3>
              <DonutChart data={analytics?.domainBreakdown || []} size={160} />
              <p className="text-xs text-espresso-500 dark:text-cream-400 mt-3">
                Distribution across Developers, E-Com & Creative teams
              </p>
            </div>
          </div>

          {/* Quick Action Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-terracotta-600 via-amber-600 to-terracotta-700 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-extrabold font-serif">Quick Agency Administration</h4>
              <p className="text-xs text-white/90 mt-0.5">
                Manage employee onboarding, review pending leaves, or post company broadcasts.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsEmployeeModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-white text-terracotta-700 hover:bg-cream-100 text-xs font-bold transition-all shadow-xs"
              >
                + Add Employee
              </button>
              <button
                onClick={() => setActiveTab('leaves')}
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all"
              >
                Review Leaves ({leaves.filter(l => l.status === 'pending').length})
              </button>
              <button
                onClick={() => setActiveTab('announcements')}
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all"
              >
                Post Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: EMPLOYEES & STAFF DIRECTORY
         ======================================================== */}
      {activeTab === 'employees' && (
        <div className="space-y-6 animate-fade-in">
          {/* Header & Controls */}
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                <Users className="w-5 h-5 text-terracotta-500" />
                Staff Personnel & Department Roster
              </h3>
              <p className="text-xs text-espresso-500 dark:text-cream-400">
                Manage employees, domains, credentials, and monthly attendance
              </p>
            </div>
            <button
              onClick={() => setIsEmployeeModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Enroll Employee
            </button>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-espresso-400" />
              <input
                type="text"
                value={employeeSearch}
                onChange={(e) => setEmployeeSearch(e.target.value)}
                placeholder="Search staff by name, email, or employee ID..."
                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border text-espresso-900 dark:text-cream-100 focus:outline-none focus:border-terracotta-500"
              />
            </div>
            <select
              value={employeeDomainFilter}
              onChange={(e) => setEmployeeDomainFilter(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border text-espresso-800 dark:text-cream-200 focus:outline-none"
            >
              <option value="all">All Departments</option>
              {DOMAIN_OPTIONS.map((dom) => (
                <option key={dom} value={dom}>{dom}</option>
              ))}
            </select>
          </div>

          {/* Employees Table */}
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-cream-100 dark:bg-darkbg-elevated border-b border-cream-200 dark:border-darkbg-border text-espresso-600 dark:text-cream-300 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Personnel</th>
                    <th className="p-4">Department / Domain</th>
                    <th className="p-4">Staff ID & Contact</th>
                    <th className="p-4">Month Turnout</th>
                    <th className="p-4">Today's Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-200 dark:divide-darkbg-border">
                  {filteredEmployees.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-espresso-400 italic">
                        No employees found matching filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees.map((emp) => {
                      const todayPresent = emp.currentMonthStats?.todayStatus === 'present';
                      const todayLeave = emp.currentMonthStats?.todayStatus === 'leave';
                      return (
                        <tr key={emp._id} className="hover:bg-cream-50 dark:hover:bg-darkbg-base/40 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-terracotta-500 to-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                                {emp.name?.charAt(0) || 'E'}
                              </div>
                              <div>
                                <div className="font-bold text-espresso-900 dark:text-cream-100 text-sm">
                                  {emp.name}
                                </div>
                                <div className="text-espresso-500 dark:text-cream-400 font-mono text-[11px]">
                                  {emp.email}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="flex flex-col gap-1 items-start">
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-terracotta-50 dark:bg-terracotta-950/40 text-terracotta-700 dark:text-terracotta-300 border border-terracotta-200 dark:border-terracotta-800">
                                {emp.domain}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                emp.employmentType === 'part_time'
                                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                              }`}>
                                {emp.employmentType === 'part_time' ? '4h Part-Time' : '8h Full-Time'}
                              </span>
                            </div>
                          </td>

                          <td className="p-4 font-mono text-espresso-600 dark:text-cream-300">
                            <div>{emp.employeeId || 'PX-EMP'}</div>
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
                              <div className="flex flex-col gap-0.5">
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 font-semibold text-[10px]">
                                  <CheckCircle2 className="w-3 h-3" />
                                  {emp.currentMonthStats?.todayClockOutTime ? 'Shift Completed' : 'Clocked In'}
                                </span>
                                {emp.currentMonthStats?.todayClockInTime && (
                                  <span className="text-[10px] text-espresso-500 dark:text-cream-400 font-mono">
                                    In: {emp.currentMonthStats.todayClockInTime}
                                    {emp.currentMonthStats.todayClockOutTime ? ` · Out: ${emp.currentMonthStats.todayClockOutTime}` : ''}
                                  </span>
                                )}
                              </div>
                            )}
                            {todayLeave && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 font-semibold text-[10px]">
                                On Leave
                              </span>
                            )}
                            {!todayPresent && !todayLeave && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cream-200 text-espresso-600 dark:bg-darkbg-elevated dark:text-cream-400 font-medium text-[10px]">
                                Pending Clock-In
                              </span>
                            )}
                          </td>

                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenEditEmployee(emp)}
                                title="Edit Profile & Reset Password"
                                className="p-1.5 rounded-lg text-espresso-600 hover:text-terracotta-600 hover:bg-cream-100 dark:hover:bg-darkbg-elevated transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteEmployee(emp._id, emp.name)}
                                title="Remove Personnel"
                                className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
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

      {/* ========================================================
          TAB 3: DAILY WORK LOGS & OVERSIGHT
         ======================================================== */}
      {activeTab === 'attendance' && (
        <div className="space-y-6 animate-fade-in">
          {/* Date Selector Header */}
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                <Clock className="w-5 h-5 text-terracotta-500" />
                Daily Employee Work Summary & Time Oversight
              </h3>
              <p className="text-xs text-espresso-500 dark:text-cream-400">
                Inspect what each staff member accomplished on any chosen date
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-espresso-700 dark:text-cream-300">
                Select Date:
              </label>
              <input
                type="date"
                value={oversightDate}
                onChange={async (e) => {
                  setOversightDate(e.target.value);
                  const res = await fetchDailyAttendance(e.target.value);
                  setDailyOversight(res);
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-espresso-900 dark:text-cream-100 focus:outline-none"
              />
            </div>
          </div>

          {/* Oversight Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dailyOversight.oversight?.length === 0 ? (
              <div className="col-span-full p-12 text-center bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl text-espresso-400 italic text-sm">
                No attendance records for {oversightDate}.
              </div>
            ) : (
              dailyOversight.oversight?.map((rec) => (
                <div
                  key={rec.employeeId || rec.name}
                  className="p-5 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-espresso-900 dark:text-cream-100 text-sm">
                            {rec.employee?.name || rec.name}
                          </h4>
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                            (rec.shiftType || rec.employee?.employmentType) === 'part_time'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          }`}>
                            {(rec.shiftType || rec.employee?.employmentType) === 'part_time' ? '4h Part-Time' : '8h Full-Time'}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-terracotta-600 dark:text-terracotta-400">
                          {rec.employee?.domain || rec.domain}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        rec.status === 'present'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : rec.status === 'half_day'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : rec.status === 'leave'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                          : rec.clockInTime
                          ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 animate-pulse'
                          : 'bg-cream-200 text-espresso-600 dark:bg-darkbg-elevated dark:text-cream-400'
                      }`}>
                        {rec.status === 'present'
                          ? 'Present (Full Day)'
                          : rec.status === 'half_day'
                          ? 'Half Day (Short Hours)'
                          : rec.status === 'leave'
                          ? 'On Leave'
                          : rec.clockInTime
                          ? 'Active On-Duty'
                          : 'Pending Clock-In'}
                      </span>
                    </div>

                    {/* Clock In / Out Time Strip */}
                    <div className="mt-2.5 p-2.5 rounded-xl bg-cream-100/70 dark:bg-darkbg-elevated/40 border border-cream-200 dark:border-darkbg-border flex items-center justify-between text-[11px] font-mono">
                      <div>
                        <span className="text-espresso-400 font-sans text-[10px] block">Morning In</span>
                        <span className="font-bold text-espresso-800 dark:text-cream-200">
                          {rec.clockInTime || 'Pending'}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="text-espresso-400 font-sans text-[10px] block">Evening Out</span>
                        <span className="font-bold text-espresso-800 dark:text-cream-200">
                          {rec.clockOutTime || (rec.clockInTime ? 'Active' : 'Pending')}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-espresso-400 font-sans text-[10px] block">Duration</span>
                        <span className="font-bold text-terracotta-600 dark:text-terracotta-400">
                          {rec.totalHours ? `${rec.totalHours}h` : (rec.clockInTime ? 'In Progress' : '0h')}
                        </span>
                      </div>
                    </div>

                    {rec.morningNotes && (
                      <div className="mt-2.5 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-0.5">
                          Morning Target / Plan
                        </span>
                        <p className="text-xs text-amber-900 dark:text-amber-200">
                          {rec.morningNotes}
                        </p>
                      </div>
                    )}

                    <div className="mt-3 p-3 rounded-2xl bg-cream-50 dark:bg-darkbg-base border border-cream-200/60 dark:border-darkbg-border">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-espresso-400 block mb-1">
                        Evening Work Summary
                      </span>
                      <p className="text-xs text-espresso-800 dark:text-cream-200 whitespace-pre-wrap leading-relaxed">
                        {rec.workSummary || (
                          <span className="italic text-espresso-400">No work log entered yet.</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="text-[10px] text-espresso-400 flex items-center justify-between pt-2 border-t border-cream-200 dark:border-darkbg-border">
                    <span>ID: {rec.employeeId}</span>
                    <span>Clock-in: {rec.clockInTime || 'N/A'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: LEAVE APPROVALS & ABSENCE QUEUE
         ======================================================== */}
      {activeTab === 'leaves' && (
        <div className="space-y-6 animate-fade-in">
          {/* Header & Tabs */}
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                <CalendarCheck2 className="w-5 h-5 text-terracotta-500" />
                Staff Leave Applications & Absence Workflow
              </h3>
              <p className="text-xs text-espresso-500 dark:text-cream-400">
                Review and sign off on casual, sick, and emergency leaves
              </p>
            </div>
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-cream-100 dark:bg-darkbg-base border border-cream-200 dark:border-darkbg-border">
              {['', 'pending', 'approved', 'rejected'].map((st) => (
                <button
                  key={st}
                  onClick={async () => {
                    setLeaveFilter(st);
                    const res = await fetchAllLeaves(st);
                    setLeaves(res);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                    leaveFilter === st
                      ? 'bg-terracotta-500 text-white shadow-2xs'
                      : 'text-espresso-600 dark:text-cream-300 hover:text-espresso-900'
                  }`}
                >
                  {st || 'All'}
                </button>
              ))}
            </div>
          </div>

          {/* Leave Requests Cards */}
          <div className="space-y-4">
            {leaves.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl text-espresso-400 italic text-sm">
                No leave requests found.
              </div>
            ) : (
              leaves.map((leave) => {
                const isPending = leave.status === 'pending';
                const empName = leave.user?.name || 'Staff Member';
                return (
                  <div
                    key={leave._id}
                    className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-base text-espresso-900 dark:text-cream-100">
                          {empName}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cream-200 dark:bg-darkbg-elevated text-espresso-700 dark:text-cream-300">
                          {leave.user?.domain}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          leave.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : leave.status === 'rejected'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 animate-pulse'
                        }`}>
                          {leave.status}
                        </span>
                      </div>

                      <div className="text-xs text-espresso-600 dark:text-cream-300 flex items-center gap-2">
                        <span><strong>Duration:</strong> {leave.startDate} to {leave.endDate}</span>
                        <span>•</span>
                        <span><strong>Type:</strong> <span className="capitalize">{leave.type}</span></span>
                      </div>

                      <p className="text-xs text-espresso-800 dark:text-cream-200 bg-cream-50 dark:bg-darkbg-base p-3 rounded-2xl border border-cream-200/60 dark:border-darkbg-border">
                        <strong>Reason:</strong> "{leave.reason}"
                      </p>

                      {leave.reviewNotes && (
                        <p className="text-[11px] text-terracotta-600 dark:text-terracotta-400 italic">
                          Executive Feedback: "{leave.reviewNotes}"
                        </p>
                      )}
                    </div>

                    {isPending && (
                      <div className="flex flex-col gap-2 w-full md:w-auto shrink-0">
                        <input
                          type="text"
                          placeholder="Optional feedback / note..."
                          value={reviewNotesMap[leave._id] || ''}
                          onChange={(e) =>
                            setReviewNotesMap({ ...reviewNotesMap, [leave._id]: e.target.value })
                          }
                          className="px-3 py-1.5 rounded-xl text-xs bg-cream-50 dark:bg-darkbg-base border border-cream-300 dark:border-darkbg-border text-espresso-900 dark:text-cream-100"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleLeaveDecision(leave._id, 'approved', empName)}
                            className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                          >
                            <Check className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button
                            onClick={() => handleLeaveDecision(leave._id, 'rejected', empName)}
                            className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB: REAL ESTATE & SERVICES CRM / CONFIG
         ======================================================== */}
      {activeTab === 'leads' && (
        <LeadsCRMAdmin />
      )}

      {activeTab === 'construction-config' && (
        <ConstructionConfigAdmin />
      )}

      {/* ========================================================
          TAB 5: WEBSITE CRM LEADS & INBOUND INQUIRIES
         ======================================================== */}
      {(activeTab === 'inquiries' || activeTab === 'website') && (
        <div className="space-y-6 animate-fade-in">
          {/* Header */}
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                <Inbox className="w-5 h-5 text-terracotta-500" />
                Website Leads & Inbound Consultation Inquiries
              </h3>
              <p className="text-xs text-espresso-500 dark:text-cream-400">
                Track direct founder consultation requests and project estimator inquiries
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-terracotta-50 dark:bg-terracotta-950/40 text-terracotta-600 dark:text-terracotta-400 border border-terracotta-200 dark:border-terracotta-800">
              {inquiries.length} Total Leads
            </span>
          </div>

          {/* Inquiries Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inquiries.length === 0 ? (
              <div className="col-span-full p-12 text-center bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl text-espresso-400 italic text-sm">
                No customer inquiries logged yet.
              </div>
            ) : (
              inquiries.map((inq) => (
                <div
                  key={inq._id}
                  className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-base text-espresso-900 dark:text-cream-100">
                        {inq.name}
                      </span>
                      <select
                        value={inq.status}
                        onChange={(e) => handleInquiryStatusChange(inq._id, e.target.value)}
                        className="text-[11px] font-bold px-2.5 py-1 rounded-lg border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-espresso-900 dark:text-cream-100 focus:outline-none"
                      >
                        <option value="new">New Lead</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Discussion</option>
                        <option value="resolved">Converted / Won</option>
                      </select>
                    </div>

                    <div className="text-xs text-espresso-700 dark:text-cream-200 space-y-1 font-mono">
                      <div>📧 {inq.email}</div>
                      {inq.phone && <div>📞 {inq.phone}</div>}
                      {inq.service && (
                        <div className="font-sans font-semibold text-terracotta-600 dark:text-terracotta-400 pt-1">
                          Service: {inq.service}
                        </div>
                      )}
                    </div>

                    {inq.message && (
                      <p className="mt-3 text-xs text-espresso-800 dark:text-cream-200 bg-cream-50 dark:bg-darkbg-base p-3 rounded-2xl border border-cream-200/60 dark:border-darkbg-border leading-relaxed">
                        "{inq.message}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-cream-200 dark:border-darkbg-border">
                    <div className="flex items-center gap-2">
                      {inq.phone && (
                        <a
                          href={`tel:${inq.phone}`}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold flex items-center gap-1 hover:bg-emerald-100"
                        >
                          <Phone className="w-3 h-3" /> Call
                        </a>
                      )}
                      {inq.email && (
                        <a
                          href={`mailto:${inq.email}`}
                          className="px-2.5 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 text-[11px] font-bold flex items-center gap-1 hover:bg-cyan-100"
                        >
                          <Mail className="w-3 h-3" /> Email
                        </a>
                      )}
                    </div>
                    <button
                      onClick={async () => {
                        if (window.confirm('Delete this inquiry?')) {
                          await deleteInquiry(inq._id);
                          const updated = await fetchSiteInquiries(inquiryFilter);
                          setInquiries(updated);
                        }
                      }}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 6: E-COMMERCE & SERVICE OPERATIONS HUB
         ======================================================== */}
      {activeTab === 'operations' && (
        <div className="space-y-6 animate-fade-in">
          {/* Header */}
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-terracotta-500" />
                E-Commerce Deliverables & Operations Board
              </h3>
              <p className="text-xs text-espresso-500 dark:text-cream-400">
                Oversight for Amazon, Flipkart & Meesho listing batches, 3D web sprints, and dispatch sync
              </p>
            </div>
            <button
              onClick={() => setIsNewTaskModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              New Operations Task
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {['all', 'Amazon India', 'Flipkart', 'Meesho', 'Web & Mobile', 'Screen & Print'].map((plat) => (
              <button
                key={plat}
                onClick={() => setOpsFilter(plat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  opsFilter === plat
                    ? 'bg-terracotta-500 text-white shadow-2xs'
                    : 'bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border text-espresso-700 dark:text-cream-300 hover:bg-cream-100'
                }`}
              >
                {plat === 'all' ? 'All Channels' : plat}
              </button>
            ))}
          </div>

          {/* Operations Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {operations
              .filter((op) => opsFilter === 'all' || op.platform === opsFilter)
              .map((op) => (
                <div
                  key={op.id}
                  className="p-5 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs flex flex-col justify-between gap-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg bg-cream-100 dark:bg-darkbg-base text-espresso-600 dark:text-cream-300 border border-cream-200 dark:border-darkbg-border">
                        {op.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        op.priority === 'urgent'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                          : op.priority === 'high'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-cream-200 text-espresso-700 dark:bg-darkbg-elevated dark:text-cream-300'
                      }`}>
                        {op.priority.toUpperCase()}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-espresso-900 dark:text-cream-100 leading-snug">
                      {op.title}
                    </h4>

                    <div className="text-xs text-espresso-600 dark:text-cream-300 space-y-0.5">
                      <div><strong>Client:</strong> {op.client}</div>
                      <div><strong>Platform:</strong> {op.platform}</div>
                      <div><strong>Assigned:</strong> {op.assignedTo}</div>
                      <div><strong>Deadline:</strong> {op.deadline}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-cream-200 dark:border-darkbg-border flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-espresso-500">Status:</span>
                    <select
                      value={op.status}
                      onChange={(e) => handleUpdateOpsStatus(op.id, e.target.value)}
                      className="text-xs font-bold px-2.5 py-1 rounded-lg border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-espresso-900 dark:text-cream-100 focus:outline-none"
                    >
                      <option value="in_progress">In Progress</option>
                      <option value="under_review">Under Review / QC</option>
                      <option value="completed">Live / Dispatched</option>
                    </select>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB: STRATEGIC EQUITY OFFER LETTER (15%)
         ======================================================== */}
      {activeTab === 'equity' && (
        <EquityOfferLetterTab />
      )}

      {/* ========================================================
          TAB 7: COMPANY BROADCASTS & NOTICE BOARD
         ======================================================== */}
      {activeTab === 'announcements' && (
        <div className="space-y-6 animate-fade-in">
          {/* Header */}
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-terracotta-500" />
                Staff Broadcasts & Internal Notice Board
              </h3>
              <p className="text-xs text-espresso-500 dark:text-cream-400">
                Post official agency notices, festival holidays, and operational directives
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              {announcements.length} Active Broadcasts
            </span>
          </div>

          {/* Create Announcement Form */}
          <form
            onSubmit={handleCreateAnnouncement}
            className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs space-y-4"
          >
            <h4 className="font-bold text-sm text-espresso-900 dark:text-cream-100">
              Create New Company Broadcast
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Notice Title (e.g. Diwali Holiday Schedule & Marketplace Deadlines)"
                  value={newAnnouncementForm.title}
                  onChange={(e) => setNewAnnouncementForm({ ...newAnnouncementForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
                  required
                />
              </div>

              <div>
                <select
                  value={newAnnouncementForm.target}
                  onChange={(e) => setNewAnnouncementForm({ ...newAnnouncementForm, target: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs font-semibold text-espresso-900 dark:text-cream-100 focus:outline-none"
                >
                  <option value="All Personnel">All Personnel</option>
                  <option value="Developers">Developers</option>
                  <option value="E-Commerce Operations">E-Commerce Operations</option>
                  <option value="Designers">Designers</option>
                  <option value="Telecallers">Telecallers</option>
                </select>
              </div>
            </div>

            <div>
              <textarea
                rows={3}
                placeholder="Enter the official directive or announcement body..."
                value={newAnnouncementForm.content}
                onChange={(e) => setNewAnnouncementForm({ ...newAnnouncementForm, content: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-espresso-700 dark:text-cream-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newAnnouncementForm.isPinned}
                  onChange={(e) => setNewAnnouncementForm({ ...newAnnouncementForm, isPinned: e.target.checked })}
                  className="rounded text-terracotta-600"
                />
                <span>Pin this notice at the top of the Employee Portal</span>
              </label>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" /> Broadcast Notice
              </button>
            </div>
          </form>

          {/* Active Announcements List */}
          <div className="space-y-3">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-5 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    {ann.isPinned && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-[10px] font-bold">
                        PINNED
                      </span>
                    )}
                    <span className="font-bold text-sm text-espresso-900 dark:text-cream-100">
                      {ann.title}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cream-100 dark:bg-darkbg-elevated text-espresso-600 dark:text-cream-400">
                      Target: {ann.target}
                    </span>
                  </div>
                  <p className="text-xs text-espresso-700 dark:text-cream-300 leading-relaxed">
                    {ann.content}
                  </p>
                  <div className="text-[10px] text-espresso-400">
                    Posted on: {ann.date}
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteAnnouncement(ann.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                  title="Remove Broadcast"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 8: PAYROLL & ATTENDANCE CALCULATOR
         ======================================================== */}
      {activeTab === 'payroll' && (
        <div className="space-y-6 animate-fade-in">
          {/* Header */}
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-terracotta-500" />
                Staff Working Days & Payroll Calculator
              </h3>
              <p className="text-xs text-espresso-500 dark:text-cream-400">
                Monthly verified billable days derived from daily work logs & approved leaves
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  alert('Payroll export generated in CSV format!');
                }}
                className="px-4 py-2 rounded-xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border text-xs font-bold text-espresso-800 dark:text-cream-200 flex items-center gap-1.5 hover:bg-cream-100"
              >
                <Download className="w-3.5 h-3.5" /> Export Report
              </button>
            </div>
          </div>

          {/* Payroll Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs">
              <span className="text-[11px] uppercase font-bold text-espresso-500 block mb-1">
                Active Staff On Roster
              </span>
              <span className="text-2xl font-extrabold text-espresso-900 dark:text-cream-100 font-mono">
                {employees.length} Members
              </span>
            </div>
            <div className="p-5 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs">
              <span className="text-[11px] uppercase font-bold text-espresso-500 block mb-1">
                Month Elapsed Days
              </span>
              <span className="text-2xl font-extrabold text-terracotta-600 dark:text-terracotta-400 font-mono">
                {new Date().getDate()} Days
              </span>
            </div>
            <div className="p-5 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs">
              <span className="text-[11px] uppercase font-bold text-espresso-500 block mb-1">
                Agency Turnout Health
              </span>
              <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                {analytics?.todayAttendance?.turnoutPercentage || 92}%
              </span>
            </div>
          </div>

          {/* Payroll Table */}
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-cream-100 dark:bg-darkbg-elevated border-b border-cream-200 dark:border-darkbg-border text-espresso-600 dark:text-cream-300 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Staff Member</th>
                    <th className="p-4">Domain</th>
                    <th className="p-4">Present Days</th>
                    <th className="p-4">Paid Leaves</th>
                    <th className="p-4">Billable Working Days</th>
                    <th className="p-4">Disbursement Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-200 dark:divide-darkbg-border">
                  {employees.map((emp) => {
                    const present = emp.currentMonthStats?.presentDays || 0;
                    const leavesCount = emp.currentMonthStats?.leaveDays || 0;
                    const totalBillable = present + leavesCount;
                    return (
                      <tr key={emp._id} className="hover:bg-cream-50 dark:hover:bg-darkbg-base/40">
                        <td className="p-4 font-bold text-espresso-900 dark:text-cream-100">
                          {emp.name}
                          <div className="text-[10px] text-espresso-400 font-mono">{emp.employeeId}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-terracotta-50 dark:bg-terracotta-950/40 text-terracotta-700 dark:text-terracotta-300 border border-terracotta-200 dark:border-terracotta-800">
                            {emp.domain}
                          </span>
                        </td>
                        <td className="p-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {present} Days
                        </td>
                        <td className="p-4 font-mono text-amber-600 dark:text-amber-400">
                          {leavesCount} Days
                        </td>
                        <td className="p-4 font-mono font-extrabold text-terracotta-600 dark:text-terracotta-400">
                          {totalBillable} Days Verified
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                            ✓ Calculated
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 9: PORTAL SECURITY & SYSTEM STATUS
         ======================================================== */}
      {activeTab === 'settings' && (
        <div className="space-y-6 animate-fade-in">
          {/* Header */}
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 shadow-xs">
            <h3 className="text-lg font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2">
              <Settings className="w-5 h-5 text-terracotta-500" />
              Executive Organization Config & System Health
            </h3>
            <p className="text-xs text-espresso-500 dark:text-cream-400">
              Direct founder channels, cloud backend connectivity, and security configuration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Agency Info */}
            <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs space-y-4">
              <h4 className="font-bold text-sm text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-terracotta-500" />
                Pixelix Creative & Digital Systems
              </h4>
              <div className="space-y-2 text-xs text-espresso-700 dark:text-cream-300">
                <div><strong>Primary Brand:</strong> Pixelix (pixelix.co.in)</div>
                <div><strong>Co-Founders:</strong> Vikas Chauhan & Shubham Singh</div>
                <div><strong>Executive Hotline:</strong> +91 7056063863 / +91 95595 06650</div>
                <div><strong>Support & Communications:</strong> support@pixelix.co.in</div>
                <div><strong>Edition:</strong> Enterprise Agency Suite v2.4</div>
              </div>
            </div>

            {/* Cloud Infrastructure Health */}
            <div className="p-6 rounded-3xl bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border shadow-xs space-y-4">
              <h4 className="font-bold text-sm text-espresso-900 dark:text-cream-100 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-500" />
                Cloud Infrastructure Health
              </h4>
              <div className="space-y-2 text-xs text-espresso-700 dark:text-cream-300">
                <div className="flex items-center justify-between">
                  <span>Backend REST API:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">ONLINE (Render)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>MongoDB Atlas Cluster:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">CONNECTED</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Nodemailer Credential Dispatcher:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>CORS Gateway Security:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">DYNAMIC REFLECTION</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 1: ENROLL NEW EMPLOYEE
         ======================================================== */}
      {isEmployeeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2 font-serif">
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
            <p className="text-xs text-espresso-500 dark:text-cream-400 mb-4">
              Enter employee details and assign their domain. Nodemailer will automatically dispatch credentials to their email address.
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
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{createEmployeeResult.message}</span>
              </div>
            )}

            <form onSubmit={handleCreateEmployeeSubmit} className="space-y-3.5">
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
                  Email Address (for login credentials)
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
                    Assign Department / Domain
                  </label>
                  <select
                    value={newEmployeeForm.domain}
                    onChange={(e) =>
                      setNewEmployeeForm({ ...newEmployeeForm, domain: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs font-semibold text-espresso-900 dark:text-cream-100 focus:outline-none"
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
                    Temporary Password
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                    Contact Phone (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={newEmployeeForm.phone}
                    onChange={(e) => setNewEmployeeForm({ ...newEmployeeForm, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                    Employment Shift
                  </label>
                  <select
                    value={newEmployeeForm.employmentType}
                    onChange={(e) =>
                      setNewEmployeeForm({
                        ...newEmployeeForm,
                        employmentType: e.target.value,
                        shiftHours: e.target.value === 'part_time' ? 4 : 8
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs font-bold text-espresso-900 dark:text-cream-100 focus:outline-none"
                  >
                    <option value="full_time">Full-Time (8 Hours / Day)</option>
                    <option value="part_time">Part-Time (4 Hours / Day)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-cream-200 dark:border-darkbg-border">
                <button
                  type="button"
                  onClick={() => setIsEmployeeModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-cream-300 dark:border-darkbg-border text-xs font-semibold text-espresso-700 dark:text-cream-300 hover:bg-cream-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingEmployee}
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-terracotta-500 hover:bg-terracotta-600 text-xs flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
                >
                  {isCreatingEmployee ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating Account...
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

      {/* ========================================================
          MODAL 2: EDIT EMPLOYEE & RESET PASSWORD
         ======================================================== */}
      {editingEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2 font-serif">
                <Edit3 className="w-5 h-5 text-terracotta-500" />
                Edit Staff Profile & Credentials
              </h3>
              <button
                onClick={() => setEditingEmployee(null)}
                className="text-espresso-400 hover:text-espresso-700 dark:hover:text-cream-100 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-espresso-500 dark:text-cream-400 mb-4">
              Update {editingEmployee.name}'s department, contact details, status, or reset their account password.
            </p>

            <form onSubmit={handleSaveEditEmployee} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editEmployeeForm.name}
                  onChange={(e) => setEditEmployeeForm({ ...editEmployeeForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                    Department / Domain
                  </label>
                  <select
                    value={editEmployeeForm.domain}
                    onChange={(e) => setEditEmployeeForm({ ...editEmployeeForm, domain: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs font-semibold text-espresso-900 dark:text-cream-100 focus:outline-none"
                  >
                    {DOMAIN_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                    Personnel Status
                  </label>
                  <select
                    value={editEmployeeForm.status}
                    onChange={(e) => setEditEmployeeForm({ ...editEmployeeForm, status: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs font-semibold text-espresso-900 dark:text-cream-100 focus:outline-none"
                  >
                    <option value="active">Active Personnel</option>
                    <option value="inactive">Inactive / On Hold</option>
                    <option value="on_leave">Extended Leave</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={editEmployeeForm.phone}
                    onChange={(e) => setEditEmployeeForm({ ...editEmployeeForm, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                    Employment Shift
                  </label>
                  <select
                    value={editEmployeeForm.employmentType}
                    onChange={(e) =>
                      setEditEmployeeForm({
                        ...editEmployeeForm,
                        employmentType: e.target.value,
                        shiftHours: e.target.value === 'part_time' ? 4 : 8
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs font-bold text-espresso-900 dark:text-cream-100 focus:outline-none"
                  >
                    <option value="full_time">Full-Time (8 Hours / Day)</option>
                    <option value="part_time">Part-Time (4 Hours / Day)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1 flex items-center justify-between">
                  <span>Reset Account Password</span>
                  <span className="text-[10px] text-espresso-400 font-normal">Leave blank to keep unchanged</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter new password (optional)"
                  value={editEmployeeForm.newPassword}
                  onChange={(e) => setEditEmployeeForm({ ...editEmployeeForm, newPassword: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-cream-200 dark:border-darkbg-border">
                <button
                  type="button"
                  onClick={() => setEditingEmployee(null)}
                  className="px-4 py-2 rounded-xl border border-cream-300 dark:border-darkbg-border text-xs font-semibold text-espresso-700 dark:text-cream-300 hover:bg-cream-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-terracotta-500 hover:bg-terracotta-600 text-xs flex items-center gap-1.5 shadow-sm transition-all"
                >
                  {isSavingEdit ? 'Saving Updates...' : 'Save Profile Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 3: CREATE OPERATIONS TASK
         ======================================================== */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-darkbg-card border border-cream-200 dark:border-darkbg-border rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-espresso-900 dark:text-cream-100 flex items-center gap-2 font-serif">
                <ShoppingBag className="w-5 h-5 text-terracotta-500" />
                New Operations Task
              </h3>
              <button
                onClick={() => setIsNewTaskModalOpen(false)}
                className="text-espresso-400 hover:text-espresso-700 dark:hover:text-cream-100 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-espresso-500 dark:text-cream-400 mb-4">
              Add a new deliverable for Amazon, Flipkart, Meesho, Web development, or Branding.
            </p>

            <form onSubmit={handleCreateOperationsTask} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                  Deliverable Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Amazon A+ Enhanced Brand Content (10 ASINs)"
                  value={newTaskForm.title}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Himalayan Organics"
                    value={newTaskForm.client}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, client: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                    Marketplace / Platform
                  </label>
                  <select
                    value={newTaskForm.platform}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, platform: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs font-semibold text-espresso-900 dark:text-cream-100 focus:outline-none"
                  >
                    <option value="Amazon India">Amazon India</option>
                    <option value="Flipkart">Flipkart</option>
                    <option value="Meesho">Meesho</option>
                    <option value="Web & Mobile">Web & Mobile</option>
                    <option value="Screen & Print">Screen & Print</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                    Assign To Personnel
                  </label>
                  <select
                    value={newTaskForm.assignedTo}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, assignedTo: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs font-semibold text-espresso-900 dark:text-cream-100 focus:outline-none"
                  >
                    <option value="">Select Staff...</option>
                    {employees.map(e => (
                      <option key={e._id} value={e.name}>{e.name} ({e.domain})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={newTaskForm.priority}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, priority: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs font-semibold text-espresso-900 dark:text-cream-100 focus:outline-none"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso-700 dark:text-cream-300 mb-1">
                  Delivery Deadline
                </label>
                <input
                  type="date"
                  value={newTaskForm.deadline}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, deadline: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-cream-300 dark:border-darkbg-border bg-cream-50 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-cream-200 dark:border-darkbg-border">
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-cream-300 dark:border-darkbg-border text-xs font-semibold text-espresso-700 dark:text-cream-300 hover:bg-cream-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-terracotta-500 hover:bg-terracotta-600 text-xs flex items-center gap-1.5 shadow-sm transition-all"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
