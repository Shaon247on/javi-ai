"use client"
import React from 'react'
import { useGetUserProfileQuery } from '../../store/apiSlice';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { data, isLoading } = useGetUserProfileQuery();
  const router = useRouter();
  const user = data || {};
  return (
    <div
      className='flex items-center gap-4 p-6 bg-white dark:bg-gray-700 rounded-2xl shadow cursor-pointer w-fit hover:bg-blue-50 transition'
      onClick={() => router.push('/dashboard/profile')}
      title="Edit profile"
    >
      <div className='w-16 h-16 rounded-full overflow-hidden border-4 border-blue-600 bg-gray-200 flex items-center justify-center'>
        {user.profile_picture ? (
          <img src={user.profile_picture.startsWith('/') ? user.profile_picture : `/${user.profile_picture}`} alt="Profile" className='w-full h-full object-cover' />
        ) : (
          <span className='text-3xl text-gray-400'>👤</span>
        )}
      </div>
      <div className='flex flex-col'>
        <span className='font-bold text-lg text-gray-900 dark:text-gray-100'>{user.name || 'Your Name'}</span>
        <span className='text-gray-500 text-sm mt-1'>Welcome Back</span>
      </div>
    </div>
  )
}
