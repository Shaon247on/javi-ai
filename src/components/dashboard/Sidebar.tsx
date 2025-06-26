'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useRouter } from 'next/navigation';

const menuItems = [
  { label: 'Manage Subscription', icon: '💳' },
  { label: 'Users', icon: '👥' },
  { label: 'Help & Support', icon: '🆘' },
  { label: 'FAQ', icon: '❓' },
];

export default function Sidebar({ activeMenu }: { activeMenu?: string }) {
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  // Initialize dark mode from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored === 'true') setDarkMode(true);
    else setDarkMode(false);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <aside className="w-64 h-screen flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex flex-col gap-4 p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-gray-900 dark:text-gray-100">Dashboard</span>
          <button
            onClick={() => setDarkMode((d) => !d)}
            className="ml-2 p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
            title="Toggle light/dark mode"
          >
            {darkMode ? '🌙' : '☀️'}
          </button>
        </div>
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full flex items-center gap-2 px-4 py-2 rounded cursor-pointer bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          <span>💬</span>
          <span>New Chat</span>
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition ${activeMenu === item.label ? 'bg-gray-100 dark:bg-gray-700 font-bold' : ''}`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 font-semibold"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
} 