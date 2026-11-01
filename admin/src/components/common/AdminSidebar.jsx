import React from 'react';
import PixelixLogo from './PixelixLogo';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Clock,
  CalendarCheck2,
  Inbox,
  ShoppingBag,
  Megaphone,
  Calculator,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ShieldCheck,
  PlusCircle,
  ExternalLink,
  FileText,
  Hammer,
  Compass,
  MessageCircle,
  Building2
} from 'lucide-react';
import { ENV } from '../../config/env';

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
  pendingLeavesCount = 0,
  inquiriesCount = 0,
  employeesCount = 0,
  onOpenCreateEmployee
}) {
  const { user, logout } = useAuth();

  const navGroups = [
    {
      title: 'CORE INTELLIGENCE',
      items: [
        {
          id: 'overview',
          label: 'Executive Overview',
          icon: LayoutDashboard,
          badge: null
        }
      ]
    },
    {
      title: 'PEOPLE & WORKFORCE',
      items: [
        {
          id: 'employees',
          label: 'Staff Directory',
          icon: Users,
          badge: employeesCount > 0 ? employeesCount : null,
          badgeColor: 'bg-cream-200 dark:bg-darkbg-border text-espresso-800 dark:text-cream-200'
        },
        {
          id: 'attendance',
          label: 'Daily Work Logs',
          icon: Clock,
          badge: null
        },
        {
          id: 'leaves',
          label: 'Leave Approvals',
          icon: CalendarCheck2,
          badge: pendingLeavesCount > 0 ? `${pendingLeavesCount} Pending` : null,
          badgeColor: 'bg-amber-500 text-white animate-pulse'
        }
      ]
    },
    {
      title: 'REAL ESTATE & SERVICES',
      items: [
        {
          id: 'leads',
          label: 'Service Leads CRM',
          icon: Inbox,
          badge: 'New',
          badgeColor: 'bg-emerald-500 text-white'
        },
        {
          id: 'construction-config',
          label: 'Construction Calculator',
          icon: Hammer,
          badge: 'Rates'
        },
        {
          id: 'showcases',
          label: '3D Property Tours',
          icon: Compass,
          badge: null
        },
        {
          id: 'ad-services',
          label: 'Digital Ad Services',
          icon: Megaphone,
          badge: null
        },
        {
          id: 'chatbot-config',
          label: 'Chatbot & WhatsApp',
          icon: MessageCircle,
          badge: null
        }
      ]
    },
    {
      title: 'OPERATIONS & CRM',
      items: [
        {
          id: 'inquiries',
          label: 'Website Inquiries',
          icon: Inbox,
          badge: inquiriesCount > 0 ? `${inquiriesCount}` : null,
          badgeColor: 'bg-terracotta-500 text-white'
        },
        {
          id: 'operations',
          label: 'E-Commerce Ops',
          icon: ShoppingBag,
          badge: 'Active'
        },
        {
          id: 'equity',
          label: 'Equity Offer (15%)',
          icon: FileText,
          badge: '15%',
          badgeColor: 'bg-gradient-to-r from-terracotta-500 to-amber-500 text-white'
        }
      ]
    },
    {
      title: 'SYSTEM & MANAGEMENT',
      items: [
        {
          id: 'announcements',
          label: 'Staff Broadcasts',
          icon: Megaphone,
          badge: null
        },
        {
          id: 'payroll',
          label: 'Payroll Calculator',
          icon: Calculator,
          badge: null
        },
        {
          id: 'settings',
          label: 'Portal Settings',
          icon: Settings,
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

      {/* Main Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white dark:bg-darkbg-surface border-r border-cream-200 dark:border-darkbg-border transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-cream-200 dark:border-darkbg-border shrink-0">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <PixelixLogo size="sm" />
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-xs uppercase tracking-wider text-espresso-900 dark:text-cream-100 font-serif leading-tight">
                  Pixelix HQ
                </span>
                <span className="text-[10px] font-semibold text-terracotta-600 dark:text-terracotta-400">
                  Admin Console
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

        {/* Quick Action Button */}
        <div className="p-3 shrink-0">
          <button
            onClick={() => {
              if (onOpenCreateEmployee) onOpenCreateEmployee();
              if (isMobileOpen) setIsMobileOpen(false);
            }}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-terracotta-600 to-amber-500 hover:from-terracotta-700 hover:to-amber-600 text-white font-bold text-xs shadow-sm shadow-terracotta-500/20 active:scale-98 transition-all ${
              isCollapsed ? 'px-0' : ''
            }`}
            title="Create New Employee"
          >
            <PlusCircle className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Add Employee</span>}
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

        {/* External Subdomains Links */}
        {!isCollapsed && (
          <div className="p-3 border-t border-cream-200 dark:border-darkbg-border space-y-1 text-[11px] shrink-0">
            <a
              href={ENV.MAIN_SITE_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-espresso-600 dark:text-cream-400 hover:bg-cream-100 dark:hover:bg-darkbg-elevated transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live Website
              </span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={ENV.EMPLOYEE_SITE_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-espresso-600 dark:text-cream-400 hover:bg-cream-100 dark:hover:bg-darkbg-elevated transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Staff Portal
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
                {user?.name?.charAt(0) || 'A'}
              </div>
              {!isCollapsed && (
                <div className="flex flex-col truncate">
                  <span className="text-xs font-bold text-espresso-900 dark:text-cream-100 truncate">
                    {user?.name || 'Administrator'}
                  </span>
                  <span className="text-[10px] text-terracotta-600 dark:text-terracotta-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Owner Master
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

