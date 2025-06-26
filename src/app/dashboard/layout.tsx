"use client";
import { useSelector } from "react-redux";
import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";
import { RootState } from "../../store/store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-300 ${
        sidebarOpen ? "ml-[10%]" : "ml-0"
      }`}>
      <div 
      className={`transition-all duration-300 ${
        sidebarOpen ? "ml-[10%]" : "ml-10"
      } flex flex-col justify-center`}
      >
        <Sidebar activeMenu={"New Chat"} />
      </div>
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-[10%]" : "ml-0"
        } flex flex-col`}
      >
        <Header />
        <main className="flex-1 text-gray-900 dark:text-gray-100 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
