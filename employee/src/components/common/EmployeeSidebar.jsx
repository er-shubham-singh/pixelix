import React from 'react';
import PixelixLogo from './PixelixLogo';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Clock,
  CalendarCheck2,
  Calendar,
  CheckSquare,
  Megaphone,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Send,
  PlusCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { ENV } from '../../config/env';

export default function EmployeeSidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
  todayStatus = 'pending',
  pendingLeavesCount = 0,
  onOpenApplyLeave
}) {
  const { user, logout } = useAuth();

  const navGroups = [
    {
      title: 'MY WORKSPACE',
      items: [
        {
          id: 'dashboard',
          label: 'My Overview',
          icon: LayoutDashboard,
          badge: null
        }
      ]
    },
    {
      title: 'TIME & ATTENDANCE',
      items: [
        {
          id: 'work-log',
          label: 'Daily Work Log',
          icon: Clock,
          badge: todayStatus === 'present' ? 'Done' : todayStatus === 'clocked_in' ? 'Working' : 'Pending',
          badgeColor: todayStatus === 'present'
            ? 'bg-emerald-500 text-white'
            : todayStatus === 'clocked_in'
            ? 'bg-cyan-500 text-white animate-pulse'
            : 'bg-amber-500 text-white animate-pulse'
        },
        {
          id: 'attendance',
          label: 'Timesheets & Calendar',
          icon: Calendar,
          badge: null
        },
        {
          id: 'leaves',
          label: 'Leave Applications',
          icon: CalendarCheck2,
          badge: pendingLeavesCount > 0 ? `${pendingLeavesCount} Pending` : null,
          badgeColor: 'bg-amber-500 text-white'
        }
      ]
    },
    {
      title: 'OPERATIONS',
      items: [
        {
          id: 'tasks',
          label: 'My Deliverables & Tasks',
          icon: CheckSquare,
          badge: 'Daily'
        }
      ]
    },
    {
      title: 'COMPANY & INFO',
      items: [
        {
          id: 'notice-board',
          label: 'Notice Board & Holidays',
          icon: Megaphone,
          badge: 'New'
        },
        {
          id: 'profile',
          label: 'My Profile & Account',
          icon: User,
          badge: null
        }
      ]
    }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-espresso-950/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white dark:bg-darkbg-surface border-r border-cream-200 dark:border-darkbg-border transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-cream-200 dark:border-darkbg-border shrink-0">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <PixelixLogo size="sm" />
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-xs uppercase tracking-wider text-espresso-900 dark:text-cream-100 font-serif leading-tight">
                  Pixelix Team
                </span>
                <span className="text-[10px] font-semibold text-terracotta-600 dark:text-terracotta-400">
                  Staff Workspace
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-7 h-7 rounded-lg items-center justify-center text-espresso-500 hover:text-espresso-800 dark:text-cream-400 dark:hover:text-cream-100 hover:bg-cream-100 dark:hover:bg-darkbg-elevated transition-colors"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Quick Action Button: Check-in / Work Log */}
        <div className="p-3 shrink-0">
          <button
            onClick={() => handleNavClick('work-log')}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-terracotta-600 to-amber-500 hover:from-terracotta-700 hover:to-amber-600 text-white font-bold text-xs shadow-sm shadow-terracotta-500/20 active:scale-98 transition-all ${
              isCollapsed ? 'px-0' : ''
            }`}
            title="Submit Daily Work Log"
          >
            <Clock className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Log Today's Work</span>}
          </button>
        </div>

        {/* Navigation Items (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-5 custom-scrollbar">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-espresso-400 dark:text-cream-400/60">
                  {group.title}
                </div>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-terracotta-500 text-white shadow-sm shadow-terracotta-500/30'
                        : 'text-espresso-700 dark:text-cream-300 hover:bg-cream-100 dark:hover:bg-darkbg-elevated hover:text-espresso-900 dark:hover:text-cream-100'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-espresso-500 dark:text-cream-400 group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400'}`} />
                    {!isCollapsed && (
                      <span className="flex-1 text-left truncate">{item.label}</span>
                    )}
                    {!isCollapsed && item.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                        isActive ? 'bg-white/20 text-white' : (item.badgeColor || 'bg-cream-200 dark:bg-darkbg-border text-espresso-700 dark:text-cream-300')
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Public Site Link */}
        {!isCollapsed && (
          <div className="p-3 border-t border-cream-200 dark:border-darkbg-border text-[11px] shrink-0">
            <a
              href={ENV.MAIN_SITE_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-espresso-600 dark:text-cream-400 hover:bg-cream-100 dark:hover:bg-darkbg-elevated transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Pixelix Public Site
              </span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* User Profile & Logout Bottom Strip */}
        <div className="p-3 border-t border-cream-200 dark:border-darkbg-border bg-cream-50/50 dark:bg-darkbg-elevated/30 shrink-0">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} gap-2`}>
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-terracotta-600 to-amber-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                {user?.name?.charAt(0) || 'E'}
              </div>
              {!isCollapsed && (
                <div className="flex flex-col truncate">
                  <span className="text-xs font-bold text-espresso-900 dark:text-cream-100 truncate">
                    {user?.name || 'Staff Member'}
                  </span>
                  <span className="text-[10px] text-terracotta-600 dark:text-terracotta-400 font-semibold truncate">
                    {user?.domain || 'General Staff'}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={logout}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-espresso-500 hover:text-red-600 dark:text-cream-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

