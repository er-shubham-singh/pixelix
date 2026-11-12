import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import EmployeeSidebar from './components/common/EmployeeSidebar';
import EmployeeTopBar from './components/common/EmployeeTopBar';
import EmployeeLoginPage from './pages/EmployeeLoginPage';
import EmployeeDashboardPage from './pages/EmployeeDashboardPage';
import PixelixLoader from './components/common/PixelixLoader';

function EmployeeAppContent() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [todayStatus, setTodayStatus] = useState('pending');
  const [pendingLeavesCount, setPendingLeavesCount] = useState(0);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-100 dark:bg-darkbg-base">
        <PixelixLoader
          size="lg"
          text="Pixelix Employee Portal"
          subtext="Loading your personal workforce workspace..."
        />
      </div>
    );
  }

  // Not logged in: show clean authentication view
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-cream-100 dark:bg-darkbg-base text-espresso-900 dark:text-cream-100 font-sans transition-colors duration-300">
        <main className="flex-1 flex items-center justify-center p-4">
          <EmployeeLoginPage />
        </main>
        <footer className="py-4 border-t border-cream-200 dark:border-darkbg-border text-center text-xs text-espresso-500 dark:text-cream-300/60">
          &copy; {new Date().getFullYear()} Pixelix Creative & Digital Systems • Internal Staff Operations
        </footer>
      </div>
    );
  }

  // Logged in: render Enterprise Workspace with Left Sidebar
  return (
    <div className="min-h-screen bg-cream-100 dark:bg-darkbg-base text-espresso-900 dark:text-cream-100 font-sans transition-colors duration-300 flex">
      {/* 1. Left-side Navigation Sidebar */}
      <EmployeeSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
        todayStatus={todayStatus}
        pendingLeavesCount={pendingLeavesCount}
        onOpenApplyLeave={() => setIsLeaveModalOpen(true)}
      />

      {/* 2. Main Content Canvas */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        <EmployeeTopBar
          activeTab={activeTab}
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          todayStatus={todayStatus}
          onOpenApplyLeave={() => setIsLeaveModalOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <EmployeeDashboardPage
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isLeaveModalOpen={isLeaveModalOpen}
            setIsLeaveModalOpen={setIsLeaveModalOpen}
            onStatusChange={(status) => setTodayStatus(status)}
            onLeavesCountChange={(count) => setPendingLeavesCount(count)}
          />
        </main>

        <footer className="py-4 border-t border-cream-200 dark:border-darkbg-border text-center text-xs text-espresso-500 dark:text-cream-300/60 bg-white/40 dark:bg-darkbg-surface/40">
          &copy; {new Date().getFullYear()} Pixelix Creative & Digital Systems • Staff Workspace
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EmployeeAppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
