import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminSidebar from './components/common/AdminSidebar';
import AdminTopBar from './components/common/AdminTopBar';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function AdminAppContent() {
  const { user, isOwner, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

  // Stats for badge counters in sidebar
  const [counts, setCounts] = useState({
    employees: 0,
    pendingLeaves: 0,
    inquiries: 0
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-100 dark:bg-darkbg-base">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-espresso-600 dark:text-cream-300">
            Initializing Owner Master Control...
          </p>
        </div>
      </div>
    );
  }

  // Not logged in as owner: show clean authentication view
  if (!user || !isOwner) {
    return (
      <div className="min-h-screen flex flex-col bg-cream-100 dark:bg-darkbg-base text-espresso-900 dark:text-cream-100 font-sans transition-colors duration-300">
        <main className="flex-1 flex items-center justify-center p-4">
          <AdminLoginPage />
        </main>
        <footer className="py-4 border-t border-cream-200 dark:border-darkbg-border text-center text-xs text-espresso-500 dark:text-cream-300/60">
          &copy; {new Date().getFullYear()} Pixelix Creative & Digital Systems • Owner Master Control
        </footer>
      </div>
    );
  }

  // Logged in: render Enterprise Executive Dashboard with Left Sidebar
  return (
    <div className="min-h-screen bg-cream-100 dark:bg-darkbg-base text-espresso-900 dark:text-cream-100 font-sans transition-colors duration-300 flex">
      {/* 1. Left-side Navigation Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
        employeesCount={counts.employees}
        pendingLeavesCount={counts.pendingLeaves}
        inquiriesCount={counts.inquiries}
        onOpenCreateEmployee={() => setIsEmployeeModalOpen(true)}
      />

      {/* 2. Main Content Canvas */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        <AdminTopBar
          activeTab={activeTab}
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <AdminDashboardPage
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchTerm={searchTerm}
            isEmployeeModalOpen={isEmployeeModalOpen}
            setIsEmployeeModalOpen={setIsEmployeeModalOpen}
            onCountsUpdate={(newCounts) => setCounts(prev => ({ ...prev, ...newCounts }))}
          />
        </main>

        <footer className="py-4 border-t border-cream-200 dark:border-darkbg-border text-center text-xs text-espresso-500 dark:text-cream-300/60 bg-white/40 dark:bg-darkbg-surface/40">
          &copy; {new Date().getFullYear()} Pixelix Creative & Digital Systems • Owner Master Control Console
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AdminAppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
