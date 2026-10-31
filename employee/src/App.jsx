import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import EmployeeNavbar from './components/common/EmployeeNavbar';
import EmployeeLoginPage from './pages/EmployeeLoginPage';
import EmployeeDashboardPage from './pages/EmployeeDashboardPage';

function EmployeeAppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-100 dark:bg-darkbg-base">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-terracotta-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-espresso-600 dark:text-cream-300">
            Initializing Employee Workspace...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 dark:bg-darkbg-base text-espresso-900 dark:text-cream-100 font-sans transition-colors duration-300">
      <EmployeeNavbar />
      <main className="flex-1">
        {!user ? <EmployeeLoginPage /> : <EmployeeDashboardPage />}
      </main>
      <footer className="py-6 border-t border-cream-200 dark:border-darkbg-border text-center text-xs text-espresso-500 dark:text-cream-300/60">
        &copy; {new Date().getFullYear()} Pixelix Creative & Digital Systems • Internal Employee Operations
      </footer>
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

