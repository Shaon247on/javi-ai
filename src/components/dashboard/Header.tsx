"use client";
import React from "react";
import { useGetUserProfileQuery } from "../../store/apiSlice";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { MessageCircle } from "lucide-react";
import { setOpenChatDrawer } from "@/store/uiSlice";

export default function Header() {
  const { data, isLoading } = useGetUserProfileQuery();
  const dispatch = useDispatch();
  const router = useRouter();
  const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);
  const pathname = usePathname();
  const user = data || {};
  return (
    <>
      <div
        className={`flex  ${
          sidebarOpen ? "ml-0" : "ml-16"
        } transition-all duration-300 w-full ease-in-out items-center gap-4 p-6 bg-white dark:bg-gray-700 rounded-2xl shadow cursor-pointer hover:bg-blue-50`}
        onClick={() => router.push("/dashboard/profile")}
        title="Edit profile"
      >
        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-blue-600 bg-gray-200 flex items-center justify-center">
          {user.profile_picture ? (
            <img
              src={
                user.profile_picture.startsWith("/")
                  ? user.profile_picture
                  : `/${user.profile_picture}`
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl text-gray-400">👤</span>
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
            {user.name || "Your Name"}
          </span>
          <span className="text-gray-500 text-sm mt-1">Welcome Back</span>
        </div>
      </div>
      {pathname === "/dashboard" && (
        <button
          className="absolute top-4 right-4 z-30 p-2 rounded hover:bg-blue-100 focus:outline-none"
          onClick={() => dispatch(setOpenChatDrawer(true))}
          title="Open chat history"
        >
          <svg
            width="28"
            height="28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-blue-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
    </>
  );
}
