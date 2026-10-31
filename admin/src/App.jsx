import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminNavbar from './components/common/AdminNavbar';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function AdminAppContent() {
  const { user, isOwner, loading } = useAuth();

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

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 dark:bg-darkbg-base text-espresso-900 dark:text-cream-100 font-sans transition-colors duration-300">
      <AdminNavbar />
      <main className="flex-1">
        {(!user || !isOwner) ? <AdminLoginPage /> : <AdminDashboardPage />}
      </main>
      <footer className="py-6 border-t border-cream-200 dark:border-darkbg-border text-center text-xs text-espresso-500 dark:text-cream-300/60">
        &copy; {new Date().getFullYear()} Pixelix Creative & Digital Systems • Owner Master Control Center
      </footer>
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

