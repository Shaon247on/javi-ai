'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useRouter } from 'next/navigation';
import { MessageCircle, X, Plus, Sun, Zap, Users, HelpCircle, LogOut } from 'lucide-react';
import { RootState } from '../../store/store';
import { setOpenSidebar } from '../../store/uiSlice';

const menuItems = [
  { label: 'Manage Subscription', icon: <Zap className="w-5 h-5 text-gray-700" /> },
  { label: 'Users', icon: <Users className="w-5 h-5 text-gray-700" /> },
  { label: 'Help & Support', icon: <HelpCircle className="w-5 h-5 text-gray-700" /> },
  { label: 'FAQ', icon: <MessageCircle className="w-5 h-5 text-gray-700" /> },
];

export default function Sidebar({ activeMenu }: { activeMenu?: string }) {
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);

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
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="bg-transparent z-40 transition-opacity duration-300"
          onClick={() => dispatch(setOpenSidebar(true))}
        />
      )}
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-gray-50 shadow-lg z-50 transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">New Messages</span>
          </div>
          <button 
            onClick={() => dispatch(setOpenSidebar(false))}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        {/* New Chat Button */}
        <div className="p-4">
          <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
            onClick={() => router.push('/dashboard')}
          >
            <Plus className="w-5 h-5" />
            <span>New Chat</span>
          </button>
        </div>
        {/* Menu Items */}
        <div className="px-4 space-y-1">
          {/* Light Mode Toggle */}
          <div 
            className="flex items-center justify-between py-3 px-3 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors duration-200"
            onClick={() => setDarkMode((d) => !d)}
          >
            <div className="flex items-center space-x-3">
              <Sun className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700 font-medium">Light</span>
            </div>
            <div className="relative">
              <div className={`w-12 h-6 ${darkMode ? 'bg-blue-600' : 'bg-blue-400'} rounded-full p-1 cursor-pointer`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${darkMode ? 'translate-x-6' : ''}`}></div>
              </div>
            </div>
          </div>
          {/* Other Menu Items */}
          {menuItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center space-x-3 py-3 px-3 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors duration-200 ${activeMenu === item.label ? 'bg-gray-200 font-bold' : ''}`}
            >
              {item.icon}
              <span className="text-gray-700 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
        {/* Logout at bottom */}
        <div className="absolute bottom-4 left-4 right-4">
          <div 
            className="flex items-center space-x-3 py-3 px-3 hover:bg-red-50 rounded-lg cursor-pointer transition-colors duration-200 group"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 text-red-600" />
            <span className="text-red-600 font-medium">Logout</span>
          </div>
        </div>
      </div>
      {/* Hamburger Button to open sidebar */}
      {!sidebarOpen && (
        <button
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow hover:bg-blue-100 transition"
          onClick={() => dispatch(setOpenSidebar(true))}
        >
          <MessageCircle className="w-6 h-6 text-blue-600" />
        </button>
      )}
    </>
  );
} 