"use client";
import Sidebar from "../../components/dashboard/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Chat from "../../components/dashboard/Chat";

export default function DashboardPage() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        You must be logged in to view the dashboard.
      </div>
    );
  }

  return (
    <main className="flex-1 text-gray-900 dark:text-gray-100">
      {/* <Header/> */}
      <Chat onClose={() => {}} />
    </main>
  );
}
