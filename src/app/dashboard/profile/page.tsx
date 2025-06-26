'use client';
import React, { useState } from 'react';
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '../../../store/apiSlice';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { data, isLoading } = useGetUserProfileQuery();
  const [updateUserProfile, { isLoading: isSaving }] = useUpdateUserProfileMutation();
  const [name, setName] = useState(data?.name || '');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (data) setName(data.name || '');
  }, [data]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile({ name, profile_picture: profilePicture || undefined }).unwrap();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      // handle error
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-600 bg-gray-200 flex items-center justify-center">
            {profilePicture ? (
              <img src={URL.createObjectURL(profilePicture)} alt="Profile Preview" className="w-full h-full object-cover" />
            ) : data?.profile_picture ? (
              <img src={data.profile_picture.startsWith('/') ? data.profile_picture : `/${data.profile_picture}`} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl text-gray-400">👤</span>
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleImageChange} className="block" />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded border dark:bg-gray-900 dark:text-gray-100"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
        {success && <div className="text-green-600 font-semibold">Profile updated successfully!</div>}
      </form>
    </div>
  );
} 