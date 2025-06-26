"use client"
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar onNewChat={() => {}} activeMenu={'New Chat'} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 text-gray-900 dark:text-gray-100 p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 